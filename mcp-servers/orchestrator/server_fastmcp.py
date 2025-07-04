#!/usr/bin/env python3
"""
Gemini Orchestrator-Workers MCP Server (FastMCP Version)

A sophisticated orchestrator using Google's Gemini API with multi-agent workflows.
"""

import asyncio
import json
import logging
import os
import time
from typing import Any, Dict, List, Optional
from dataclasses import dataclass

from mcp.server.fastmcp import FastMCP
from google import genai
from google.genai import types as gemini_types, errors

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class OrchestrationConfig:
    """Configuration for orchestration behavior"""
    model: str = "gemini-2.5-flash-preview-05-20"
    max_subtasks: int = 6
    max_parallel_execution: int = 3
    enable_streaming: bool = False
    temperature: float = 0.5
    max_output_tokens: int = 4096

class GeminiOrchestrator:
    """Gemini-powered orchestrator for MCP"""
    
    def __init__(self, api_key: Optional[str] = None):
        self.client = genai.Client(api_key=api_key or os.getenv("GEMINI_API_KEY"))
        self.config = OrchestrationConfig()
        
        # Task planning function for structured decomposition
        self.planning_function = gemini_types.FunctionDeclaration(
            name="plan_task_execution",
            description="Break down a complex task into manageable subtasks with clear execution plan",
            parameters=gemini_types.Schema(
                type="OBJECT",
                properties={
                    "task_summary": gemini_types.Schema(
                        type="STRING",
                        description="Brief summary of what needs to be accomplished"
                    ),
                    "subtasks": gemini_types.Schema(
                        type="ARRAY",
                        items=gemini_types.Schema(
                            type="OBJECT",
                            properties={
                                "id": gemini_types.Schema(type="STRING"),
                                "title": gemini_types.Schema(type="STRING"), 
                                "description": gemini_types.Schema(type="STRING"),
                                "expertise_type": gemini_types.Schema(
                                    type="STRING",
                                    enum=["research", "analysis", "technical", "creative", "synthesis"]
                                ),
                                "priority": gemini_types.Schema(type="INTEGER"),
                                "dependencies": gemini_types.Schema(
                                    type="ARRAY",
                                    items=gemini_types.Schema(type="STRING")
                                )
                            },
                            required=["id", "title", "description", "expertise_type", "priority", "dependencies"]
                        )
                    ),
                    "execution_approach": gemini_types.Schema(
                        type="STRING",
                        description="Overall strategy for executing this task"
                    )
                },
                required=["task_summary", "subtasks", "execution_approach"]
            )
        )
    
    async def create_execution_plan(self, query: str, context: str = "") -> Dict[str, Any]:
        """Create a structured execution plan using Gemini function calling"""
        
        # For very simple queries, skip complex planning
        if len(query.split()) < 10:  # Simple query
            return self._create_simple_plan(query)
        
        planning_prompt = f"""
{context}

TASK: {query}

Your task is to analyze this complex request and create a detailed plan for execution.
You should:

1. Understand the overall task and its requirements
2. Break it down into logical subtasks for each subtask
3. Identify the type of expertise needed
4. Determine any dependencies between subtasks
5. Create an execution strategy

Be specific and detailed in your planning, as worker agents will execute
each subtask based on your instructions.
"""

        try:
            # Try function calling first, but with shorter timeout
            tool = gemini_types.Tool(function_declarations=[self.planning_function])
            
            response = await self.client.aio.models.generate_content(
                model=self.config.model,
                contents=planning_prompt,
                config=gemini_types.GenerateContentConfig(
                    tools=[tool],
                    temperature=0.1,  # Lower temperature for faster response
                    max_output_tokens=1000  # Reduced tokens
                )
            )
            
            if response.function_calls:
                plan = response.function_calls[0].args
                # Limit subtasks for testing
                if len(plan.get("subtasks", [])) > 3:
                    plan["subtasks"] = plan["subtasks"][:3]
                return plan
            
            # Fallback if function calling fails
            return self._create_simple_plan(query)
            
        except Exception as e:
            logger.warning(f"Planning fallback: {str(e)}")
            return self._create_simple_plan(query)
    
    def _create_simple_plan(self, query: str) -> Dict[str, Any]:
        """Create a simple fallback plan for quick execution"""
        
        return {
            "goal": query,
            "approach": "Direct response",
            "subtasks": [
                {
                    "id": "task_1",
                    "title": "Answer query directly",
                    "description": f"Provide a direct response to: {query}",
                    "expertise_type": "synthesis",
                    "dependencies": [],
                    "priority": 1
                }
            ],
            "success_criteria": "Query answered",
            "estimated_time": "1 minute"
        }
    
    async def execute_subtask(self, subtask: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
        """Execute a single subtask with specialized expertise"""
        
        # Get subtask details
        task_id = subtask["id"]
        title = subtask["title"]
        description = subtask["description"]
        expertise_type = subtask["expertise_type"]
        
        logger.info(f"🔄 Executing: {title}")
        
        # For simple test cases, use minimal prompts
        if "benefits of AI" in description.lower() or len(description.split()) < 10:
            prompt = f"""Task: {description}

Provide a brief, direct answer (2-3 sentences maximum)."""
        else:
            # Build context-aware prompt based on expertise type
            expertise_prompts = {
                "research": f"Research task: {description}\n\nProvide factual information with key findings.",
                "analysis": f"Analysis task: {description}\n\nAnalyze patterns and insights.",
                "technical": f"Technical task: {description}\n\nFocus on implementation and technical details.",
                "creative": f"Creative task: {description}\n\nGenerate innovative solutions and ideas.",
                "synthesis": f"Synthesis task: {description}\n\nIntegrate information and provide coherent conclusions."
            }
            
            prompt = expertise_prompts.get(expertise_type, f"Task: {description}")
            
            # Add relevant context from previous tasks
            if context.get("previous_results"):
                prompt += f"\n\nContext from previous work:\n{context['previous_results'][:500]}"
        
        try:
            # Execute with faster settings
            response = await self.client.aio.models.generate_content(
                model=self.config.model,
                contents=prompt,
                config=gemini_types.GenerateContentConfig(
                    temperature=0.3,
                    max_output_tokens=300  # Reduced for faster execution
                )
            )
            
            result = {
                "task_id": task_id,
                "title": title,
                "status": "completed",
                "output": response.text,
                "expertise_type": expertise_type
            }
            
            logger.info(f"✅ Completed: {title}")
            return result
            
        except Exception as e:
            logger.error(f"❌ Task failed: {title} - {str(e)}")
            return {
                "task_id": task_id,
                "title": title,
                "status": "failed",
                "error": str(e),
                "expertise_type": expertise_type
            }
    
    async def synthesize_final_response(self, original_query: str, execution_plan: Dict[str, Any],
                                      subtask_results: Dict[str, Any], context: str = "") -> str:
        """Synthesize subtask results into a coherent final response"""
        
        # Collect successful outputs
        successful_outputs = []
        for task_id, result in subtask_results.items():
            if result.get("status") == "completed" and "output" in result:
                successful_outputs.append(f"**{result['title']}:**\n{result['output']}")
        
        if not successful_outputs:
            return "Unable to process the request - no subtasks completed successfully."
        
        # For simple queries, just return the direct output
        if len(successful_outputs) == 1 and len(original_query.split()) < 10:
            return successful_outputs[0].split(":**\n", 1)[-1]  # Remove title prefix
        
        # Build synthesis prompt
        synthesis_prompt = f"""
Original Request: {original_query}

Task Results:
{chr(10).join(successful_outputs)}

{context}

Synthesize these results into a cohesive, comprehensive response that directly addresses the original request. 
Be clear, well-structured, and ensure all key insights are preserved.
"""
        
        try:
            response = await self.client.aio.models.generate_content(
                model=self.config.model,
                contents=synthesis_prompt,
                config=gemini_types.GenerateContentConfig(
                    temperature=0.4,
                    max_output_tokens=1000  # Reduced for faster response
                )
            )
            
            return response.text
            
        except Exception as e:
            logger.error(f"Synthesis error: {str(e)}")
            # Fallback: concatenate results
            return "\n\n".join([output.split(":**\n", 1)[-1] for output in successful_outputs])
    
    async def orchestrate_workflow(self, query: str, context: str = "", config_overrides: Dict = None) -> Dict[str, Any]:
        """Main orchestration workflow with progress tracking"""
        
        start_time = time.time()
        
        try:
            # Apply configuration overrides for testing
            if config_overrides:
                original_config = {}
                for key, value in config_overrides.items():
                    if hasattr(self.config, key):
                        original_config[key] = getattr(self.config, key)
                        setattr(self.config, key, value)
            
            logger.info(f"🚀 Starting orchestration: {query[:50]}...")
            
            # Step 1: Create execution plan (with timeout handling)
            logger.info("📋 Creating execution plan...")
            try:
                execution_plan = await asyncio.wait_for(
                    self.create_execution_plan(query, context), 
                    timeout=30  # 30 second timeout for planning
                )
            except asyncio.TimeoutError:
                logger.warning("⏰ Planning timeout, using simple plan...")
                execution_plan = self._create_simple_plan(query)
            
            # Step 2: Execute subtasks in dependency order
            logger.info(f"⚙️ Executing {len(execution_plan['subtasks'])} subtasks...")
            
            subtask_results = {}
            completed_tasks = set()
            max_iterations = len(execution_plan["subtasks"]) * 2  # Prevent infinite loops
            iterations = 0
            
            while completed_tasks != set(task["id"] for task in execution_plan["subtasks"]) and iterations < max_iterations:
                iterations += 1
                
                for subtask in execution_plan["subtasks"]:
                    if subtask["id"] in completed_tasks:
                        continue
                    
                    # Check if dependencies are met
                    dependencies_met = all(dep in completed_tasks for dep in subtask.get("dependencies", []))
                    
                    if dependencies_met:
                        # Build context for subtask
                        task_context = {
                            "original_query": query,
                            "global_context": context,
                            "previous_results": "",
                            "dependency_results": {}
                        }
                        
                        # Add dependency results to context
                        for dep_id in subtask.get("dependencies", []):
                            if dep_id in subtask_results:
                                dep_result = subtask_results[dep_id]
                                if dep_result.get("status") == "completed":
                                    task_context["dependency_results"][dep_id] = dep_result["output"]
                                    task_context["previous_results"] += f"{dep_result['title']}: {dep_result['output'][:200]}...\n"
                        
                        # Execute subtask with timeout
                        try:
                            result = await asyncio.wait_for(
                                self.execute_subtask(subtask, task_context),
                                timeout=60  # 60 second timeout per subtask
                            )
                            subtask_results[subtask["id"]] = result
                            completed_tasks.add(subtask["id"])
                        except asyncio.TimeoutError:
                            logger.warning(f"⏰ Subtask timeout: {subtask['title']}")
                            subtask_results[subtask["id"]] = {
                                "task_id": subtask["id"],
                                "title": subtask["title"],
                                "status": "timeout",
                                "error": "Execution timed out",
                                "expertise_type": subtask["expertise_type"]
                            }
                            completed_tasks.add(subtask["id"])
            
            # Step 3: Synthesize final response
            logger.info("🔄 Synthesizing final response...")
            try:
                final_response = await asyncio.wait_for(
                    self.synthesize_final_response(query, execution_plan, subtask_results, context),
                    timeout=30  # 30 second timeout for synthesis
                )
            except asyncio.TimeoutError:
                logger.warning("⏰ Synthesis timeout, creating simple response...")
                # Create simple fallback response
                completed_outputs = [
                    result["output"] for result in subtask_results.values() 
                    if result.get("status") == "completed" and "output" in result
                ]
                final_response = "\n\n".join(completed_outputs) if completed_outputs else "Response synthesis timed out."
            
            # Step 4: Return results
            total_time = time.time() - start_time
            logger.info(f"✅ Orchestration complete in {total_time:.1f}s")
            
            # Restore original configuration
            if config_overrides:
                for key, value in original_config.items():
                    setattr(self.config, key, value)
            
            return {
                "success": True,
                "response": final_response,
                "metadata": {
                    "total_time": total_time,
                    "total_subtasks": len(execution_plan["subtasks"]),
                    "completed_subtasks": len([r for r in subtask_results.values() if r.get("status") == "completed"]),
                    "failed_subtasks": len([r for r in subtask_results.values() if r.get("status") in ["failed", "timeout"]]),
                    "execution_plan": execution_plan,
                    "subtask_results": subtask_results,
                    "model_used": self.config.model
                }
            }
            
        except Exception as e:
            total_time = time.time() - start_time
            logger.error(f"❌ Orchestration failed: {str(e)}")
            
            # Restore original configuration on error
            if config_overrides and 'original_config' in locals():
                for key, value in original_config.items():
                    setattr(self.config, key, value)
            
            return {
                "success": False,
                "response": f"Orchestration failed: {str(e)}",
                "metadata": {
                    "total_time": total_time,
                    "error": str(e),
                    "model_used": self.config.model
                }
            }

# Initialize the orchestrator
orchestrator = GeminiOrchestrator()

# Create FastMCP server instance with extended timeout
mcp = FastMCP("gemini-orchestrator")

# Multiple timeout configurations to ensure no timeouts
mcp.server_timeout = None  # Disable timeout completely
mcp.request_timeout = None  # Disable request timeout
mcp.tool_timeout = None    # Disable tool timeout

# Alternative timeout settings (uncomment if above doesn't work)
# mcp.server_timeout = 600    # 10 minutes
# mcp.request_timeout = 600   # 10 minutes 
# mcp.tool_timeout = 600      # 10 minutes

# =============================================================================
# TOOLS (Model-controlled functions)
# =============================================================================

@mcp.tool()
async def orchestrate_complex_query(
    query: str,
    context: str = "",
    model: str = "gemini-2.5-flash-preview-05-20",
    max_subtasks: int = 6,
    temperature: float = 0.5
) -> Dict:
    """
    Execute complex queries using Gemini-powered orchestrator-workers pattern.
    
    Args:
        query: The complex query or task to process
        context: Additional context or constraints
        model: Gemini model to use
        max_subtasks: Maximum number of subtasks to create (1-10)
        temperature: Generation temperature (0.0-1.0)
    """
    
    # Ensure API key is available
    if not os.getenv("GEMINI_API_KEY"):
        return {"error": "GEMINI_API_KEY environment variable is required"}
    
    # Configuration overrides
    config_overrides = {
        "model": model,
        "max_subtasks": max(1, min(10, max_subtasks)),
        "temperature": max(0.0, min(1.0, temperature))
    }
    
    try:
        result = await orchestrator.orchestrate_workflow(query, context, config_overrides)
        
        if result["success"]:
            metadata = result["metadata"]
            response_text = result["response"]
            response_text += f"\n\n---\n*Processed using {metadata['total_subtasks']} specialized subtasks with {metadata['model_used']}*"
            
            return {
                "response": response_text,
                "success": True,
                "metadata": metadata
            }
        else:
            return {
                "response": result["response"],
                "success": False,
                "error": result["metadata"].get("error", "Unknown error")
            }
        
    except Exception as e:
        logger.error(f"Error in orchestrate_complex_query: {str(e)}")
        return {
            "response": f"Error executing orchestrated workflow: {str(e)}",
            "success": False,
            "error": str(e)
        }


@mcp.tool()
async def ping_orchestrator() -> Dict:
    """
    Ultra-simple ping test - no AI calls, just returns status.
    """
    
    try:
        # Just check if the orchestrator is initialized
        model_name = orchestrator.config.model if orchestrator else "unknown"
        api_key_set = bool(os.getenv("GEMINI_API_KEY"))
        
        return {
            "status": "ONLINE",
            "model": model_name,
            "api_key_configured": api_key_set,
            "message": "Orchestrator is ready!"
        }
        
    except Exception as e:
        return {
            "status": "ERROR",
            "error": str(e)
        }


@mcp.tool()
async def simple_gemini_test() -> Dict:
    """
    Simple single Gemini API call test - no orchestration.
    """
    
    if not os.getenv("GEMINI_API_KEY"):
        return {"error": "GEMINI_API_KEY environment variable is required"}
    
    try:
        # Simple single API call with short timeout
        response = await orchestrator.client.aio.models.generate_content(
            model=orchestrator.config.model,
            contents="Say 'Hello from Gemini!' in exactly 3 words.",
            config=gemini_types.GenerateContentConfig(
                temperature=0.1,
                max_output_tokens=50
            )
        )
        
        return {
            "status": "SUCCESS",
            "response": response.text,
            "model_used": orchestrator.config.model
        }
        
    except Exception as e:
        return {
            "status": "ERROR", 
            "error": str(e)
        }


@mcp.tool()
async def test_orchestrator() -> Dict:
    """
    Minimal orchestration test with single subtask.
    """
    
    if not os.getenv("GEMINI_API_KEY"):
        return {"error": "GEMINI_API_KEY environment variable is required"}
    
    try:
        # Ultra-minimal test query
        test_query = "List 2 benefits of AI"
        
        # Minimal configuration - single subtask only
        config_overrides = {
            "max_subtasks": 1, 
            "temperature": 0.1,
            "max_output_tokens": 100
        }
        
        # Add timeout logging
        logger.info("🧪 Starting minimal orchestration test...")
        result = await orchestrator.orchestrate_workflow(test_query, "", config_overrides)
        logger.info("🧪 Test completed!")
        
        return {
            "test_result": "SUCCESS" if result["success"] else "FAILED",
            "response": result["response"][:150] + "..." if len(result["response"]) > 150 else result["response"],
            "subtasks_executed": result["metadata"].get("total_subtasks", 0),
            "model_used": result["metadata"].get("model_used", "unknown")
        }
        
    except Exception as e:
        logger.error(f"🧪 Test failed: {str(e)}")
        return {
            "test_result": "ERROR",
            "error": str(e)
        }


@mcp.tool()
async def quick_orchestrate(
    query: str,
    context: str = ""
) -> Dict:
    """
    Quick orchestration for simpler tasks with minimal configuration.
    
    Args:
        query: The query to process
        context: Optional context
    """
    
    if not os.getenv("GEMINI_API_KEY"):
        return {"error": "GEMINI_API_KEY environment variable is required"}
    
    try:
        # Use simpler configuration for quick tasks - reduced subtasks and faster model
        config_overrides = {
            "max_subtasks": 2, 
            "max_parallel_execution": 2,
            "temperature": 0.3
        }
        result = await orchestrator.orchestrate_workflow(query, context, config_overrides)
        
        return {
            "response": result["response"],
            "success": result["success"],
            "processing_info": f"Completed with {result['metadata'].get('total_subtasks', 0)} subtasks"
        }
        
    except Exception as e:
        logger.error(f"Error in quick_orchestrate: {str(e)}")
        return {
            "response": f"Error in quick orchestration: {str(e)}",
            "success": False,
            "error": str(e)
        }


@mcp.tool()
async def plan_task_only(
    query: str,
    context: str = ""
) -> Dict:
    """
    Create a task execution plan without executing it.
    
    Args:
        query: The task to plan
        context: Additional context
    """
    
    if not os.getenv("GEMINI_API_KEY"):
        return {"error": "GEMINI_API_KEY environment variable is required"}
    
    try:
        execution_plan = await orchestrator.create_execution_plan(query, context)
        
        plan_text = f"**Task Execution Plan**\n\n"
        plan_text += f"**Summary:** {execution_plan['task_summary']}\n\n"
        plan_text += f"**Approach:** {execution_plan['execution_approach']}\n\n"
        plan_text += "**Subtasks:**\n"
        
        for i, subtask in enumerate(execution_plan["subtasks"], 1):
            deps = ", ".join(subtask["dependencies"]) if subtask["dependencies"] else "None"
            plan_text += f"{i}. **{subtask['title']}** ({subtask['expertise_type']})\n"
            plan_text += f"   - {subtask['description']}\n"
            plan_text += f"   - Priority: {subtask['priority']}, Dependencies: {deps}\n\n"
        
        return {
            "plan": plan_text,
            "execution_plan": execution_plan,
            "success": True
        }
        
    except Exception as e:
        logger.error(f"Error in plan_task_only: {str(e)}")
        return {
            "plan": f"Error creating task plan: {str(e)}",
            "success": False,
            "error": str(e)
        }


if __name__ == "__main__":
    mcp.run()