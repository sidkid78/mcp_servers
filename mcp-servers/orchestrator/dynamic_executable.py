"""
Gemini Orchestrator-Workers with Executable Tools

This system enables agents to actually implement and execute solutions using real tools,
rather than just providing advice. Agents can create files, run code, make API calls,
deploy applications, and perform other concrete actions.
"""

import asyncio
import json
import logging
import os
import subprocess
import time
from typing import Any, Dict, List, Optional, Tuple, Union, Callable
from dataclasses import dataclass, field
from enum import Enum
from abc import ABC, abstractmethod
import tempfile
import shutil
from pathlib import Path

from google import genai
from google.genai import types as gemini_types, errors

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ToolCategory(Enum):
    """Categories of tools available to agents"""
    FILE_SYSTEM = "file_system"
    CODE_EXECUTION = "code_execution"
    WEB_OPERATIONS = "web_operations"
    DATABASE = "database"
    API_INTEGRATION = "api_integration"
    DEPLOYMENT = "deployment"
    PROJECT_MANAGEMENT = "project_management"
    RESEARCH = "research"
    COMMUNICATION = "communication"

@dataclass
class ToolResult:
    """Result from tool execution"""
    success: bool
    output: str
    artifacts: Dict[str, Any] = field(default_factory=dict)
    metadata: Dict[str, Any] = field(default_factory=dict)

class ExecutableTool(ABC):
    """Base class for executable tools"""
    
    def __init__(self, name: str, description: str, category: ToolCategory):
        self.name = name
        self.description = description
        self.category = category
        
    @abstractmethod
    async def execute(self, **kwargs) -> ToolResult:
        """Execute the tool with given parameters"""
        pass
    
    def get_schema(self) -> Dict[str, Any]:
        """Get the parameter schema for this tool"""
        return {
            "name": self.name,
            "description": self.description,
            "parameters": self._get_parameters_schema()
        }
    
    @abstractmethod
    def _get_parameters_schema(self) -> Dict[str, Any]:
        """Define the parameters schema for this tool"""
        pass

# File System Tools
class CreateFileTool(ExecutableTool):
    def __init__(self):
        super().__init__(
            "create_file",
            "Create a new file with specified content",
            ToolCategory.FILE_SYSTEM
        )
    
    def _get_parameters_schema(self) -> Dict[str, Any]:
        return {
            "type": "object",
            "properties": {
                "file_path": {"type": "string", "description": "Path where to create the file"},
                "content": {"type": "string", "description": "Content to write to the file"},
                "create_dirs": {"type": "boolean", "description": "Create parent directories if they don't exist", "default": True}
            },
            "required": ["file_path", "content"]
        }
    
    async def execute(self, file_path: str, content: str, create_dirs: bool = True) -> ToolResult:
        try:
            path = Path(file_path)
            if create_dirs:
                path.parent.mkdir(parents=True, exist_ok=True)
            
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            return ToolResult(
                success=True,
                output=f"Successfully created file: {file_path}",
                artifacts={"file_path": str(path.absolute()), "file_size": len(content)},
                metadata={"tool": self.name, "action": "file_created"}
            )
        except Exception as e:
            return ToolResult(
                success=False,
                output=f"Error creating file: {str(e)}"
            )

class CreateDirectoryTool(ExecutableTool):
    def __init__(self):
        super().__init__(
            "create_directory",
            "Create a directory structure",
            ToolCategory.FILE_SYSTEM
        )
    
    def _get_parameters_schema(self) -> Dict[str, Any]:
        return {
            "type": "object",
            "properties": {
                "dir_path": {"type": "string", "description": "Directory path to create"},
                "parents": {"type": "boolean", "description": "Create parent directories", "default": True}
            },
            "required": ["dir_path"]
        }
    
    async def execute(self, dir_path: str, parents: bool = True) -> ToolResult:
        try:
            path = Path(dir_path)
            path.mkdir(parents=parents, exist_ok=True)
            
            return ToolResult(
                success=True,
                output=f"Successfully created directory: {dir_path}",
                artifacts={"directory_path": str(path.absolute())},
                metadata={"tool": self.name, "action": "directory_created"}
            )
        except Exception as e:
            return ToolResult(
                success=False,
                output=f"Error creating directory: {str(e)}"
            )

# Code Execution Tools
class RunPythonCodeTool(ExecutableTool):
    def __init__(self):
        super().__init__(
            "run_python_code",
            "Execute Python code and return the output",
            ToolCategory.CODE_EXECUTION
        )
    
    def _get_parameters_schema(self) -> Dict[str, Any]:
        return {
            "type": "object",
            "properties": {
                "code": {"type": "string", "description": "Python code to execute"},
                "working_directory": {"type": "string", "description": "Working directory for execution", "default": "."},
                "timeout": {"type": "integer", "description": "Timeout in seconds", "default": 30}
            },
            "required": ["code"]
        }
    
    async def execute(self, code: str, working_directory: str = ".", timeout: int = 30) -> ToolResult:
        try:
            # Create a temporary file for the code
            with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as f:
                f.write(code)
                temp_file = f.name
            
            try:
                # Execute the Python code
                result = subprocess.run(
                    ["python", temp_file],
                    cwd=working_directory,
                    capture_output=True,
                    text=True,
                    timeout=timeout
                )
                
                output = result.stdout
                error = result.stderr
                
                if result.returncode == 0:
                    return ToolResult(
                        success=True,
                        output=output,
                        artifacts={"stdout": output, "stderr": error, "return_code": result.returncode},
                        metadata={"tool": self.name, "action": "code_executed"}
                    )
                else:
                    return ToolResult(
                        success=False,
                        output=f"Code execution failed:\n{error}",
                        artifacts={"stdout": output, "stderr": error, "return_code": result.returncode}
                    )
            finally:
                os.unlink(temp_file)
                
        except subprocess.TimeoutExpired:
            return ToolResult(
                success=False,
                output=f"Code execution timed out after {timeout} seconds"
            )
        except Exception as e:
            return ToolResult(
                success=False,
                output=f"Error executing code: {str(e)}"
            )

class InstallPackageTool(ExecutableTool):
    def __init__(self):
        super().__init__(
            "install_package",
            "Install a Python package using pip",
            ToolCategory.CODE_EXECUTION
        )
    
    def _get_parameters_schema(self) -> Dict[str, Any]:
        return {
            "type": "object",
            "properties": {
                "package_name": {"type": "string", "description": "Name of the package to install"},
                "version": {"type": "string", "description": "Specific version to install (optional)"},
                "upgrade": {"type": "boolean", "description": "Upgrade if already installed", "default": False}
            },
            "required": ["package_name"]
        }
    
    async def execute(self, package_name: str, version: str = None, upgrade: bool = False) -> ToolResult:
        try:
            cmd = ["pip", "install"]
            
            if upgrade:
                cmd.append("--upgrade")
            
            if version:
                cmd.append(f"{package_name}=={version}")
            else:
                cmd.append(package_name)
            
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
            
            if result.returncode == 0:
                return ToolResult(
                    success=True,
                    output=f"Successfully installed {package_name}",
                    artifacts={"package": package_name, "version": version},
                    metadata={"tool": self.name, "action": "package_installed"}
                )
            else:
                return ToolResult(
                    success=False,
                    output=f"Failed to install {package_name}: {result.stderr}"
                )
                
        except Exception as e:
            return ToolResult(
                success=False,
                output=f"Error installing package: {str(e)}"
            )

# Web Operations Tools
class MakeHttpRequestTool(ExecutableTool):
    def __init__(self):
        super().__init__(
            "make_http_request",
            "Make HTTP requests to APIs or websites",
            ToolCategory.WEB_OPERATIONS
        )
    
    def _get_parameters_schema(self) -> Dict[str, Any]:
        return {
            "type": "object",
            "properties": {
                "url": {"type": "string", "description": "URL to make request to"},
                "method": {"type": "string", "description": "HTTP method", "enum": ["GET", "POST", "PUT", "DELETE"], "default": "GET"},
                "headers": {"type": "object", "description": "HTTP headers"},
                "data": {"type": "object", "description": "Request body data"},
                "timeout": {"type": "integer", "description": "Request timeout in seconds", "default": 30}
            },
            "required": ["url"]
        }
    
    async def execute(self, url: str, method: str = "GET", headers: Dict = None, data: Dict = None, timeout: int = 30) -> ToolResult:
        try:
            import requests
            
            response = requests.request(
                method=method,
                url=url,
                headers=headers or {},
                json=data,
                timeout=timeout
            )
            
            return ToolResult(
                success=True,
                output=f"HTTP {method} to {url} completed with status {response.status_code}",
                artifacts={
                    "status_code": response.status_code,
                    "response_text": response.text,
                    "headers": dict(response.headers)
                },
                metadata={"tool": self.name, "action": "http_request_completed"}
            )
            
        except Exception as e:
            return ToolResult(
                success=False,
                output=f"HTTP request failed: {str(e)}"
            )

# Project Management Tools
class InitializeProjectTool(ExecutableTool):
    def __init__(self):
        super().__init__(
            "initialize_project",
            "Initialize a new project with standard structure",
            ToolCategory.PROJECT_MANAGEMENT
        )
    
    def _get_parameters_schema(self) -> Dict[str, Any]:
        return {
            "type": "object",
            "properties": {
                "project_name": {"type": "string", "description": "Name of the project"},
                "project_type": {"type": "string", "description": "Type of project", "enum": ["python", "web", "api", "ml", "general"], "default": "general"},
                "base_path": {"type": "string", "description": "Base path for project creation", "default": "."}
            },
            "required": ["project_name"]
        }
    
    async def execute(self, project_name: str, project_type: str = "general", base_path: str = ".") -> ToolResult:
        try:
            project_path = Path(base_path) / project_name
            project_path.mkdir(parents=True, exist_ok=True)
            
            # Create basic project structure based on type
            structure = self._get_project_structure(project_type)
            created_files = []
            
            for file_path, content in structure.items():
                full_path = project_path / file_path
                full_path.parent.mkdir(parents=True, exist_ok=True)
                
                with open(full_path, 'w', encoding='utf-8') as f:
                    f.write(content.format(project_name=project_name))
                
                created_files.append(str(full_path))
            
            return ToolResult(
                success=True,
                output=f"Successfully initialized {project_type} project: {project_name}",
                artifacts={"project_path": str(project_path), "created_files": created_files},
                metadata={"tool": self.name, "action": "project_initialized"}
            )
            
        except Exception as e:
            return ToolResult(
                success=False,
                output=f"Error initializing project: {str(e)}"
            )
    
    def _get_project_structure(self, project_type: str) -> Dict[str, str]:
        """Get project structure templates"""
        structures = {
            "python": {
                "README.md": "# {project_name}\n\nA Python project.\n\n## Installation\n\n```bash\npip install -r requirements.txt\n```\n",
                "requirements.txt": "# Add your dependencies here\n",
                "src/__init__.py": "",
                "src/main.py": "def main():\n    print('Hello from {project_name}!')\n\nif __name__ == '__main__':\n    main()\n",
                "tests/__init__.py": "",
                "tests/test_main.py": "import unittest\nfrom src.main import main\n\nclass TestMain(unittest.TestCase):\n    def test_main(self):\n        # Add your tests here\n        pass\n",
                ".gitignore": "__pycache__/\n*.pyc\n*.pyo\n*.pyd\n.Python\nbuild/\ndevelop-eggs/\ndist/\n.venv/\nvenv/\n"
            },
            "web": {
                "README.md": "# {project_name}\n\nA web application.\n",
                "index.html": "<!DOCTYPE html>\n<html>\n<head>\n    <title>{project_name}</title>\n    <link rel=\"stylesheet\" href=\"styles.css\">\n</head>\n<body>\n    <h1>Welcome to {project_name}</h1>\n    <script src=\"script.js\"></script>\n</body>\n</html>\n",
                "styles.css": "body {\n    font-family: Arial, sans-serif;\n    margin: 0;\n    padding: 20px;\n}\n\nh1 {\n    color: #333;\n}\n",
                "script.js": "// JavaScript for {project_name}\nconsole.log('Hello from {project_name}!');\n"
            },
            "api": {
                "README.md": "# {project_name} API\n\nA RESTful API project.\n",
                "app.py": "from flask import Flask, jsonify\n\napp = Flask(__name__)\n\n@app.route('/')\ndef hello():\n    return jsonify({{'message': 'Hello from {project_name} API!'}})\n\nif __name__ == '__main__':\n    app.run(debug=True)\n",
                "requirements.txt": "flask\nrequests\n",
                ".env.example": "# Environment variables\nAPP_ENV=development\nDEBUG=True\n"
            },
            "general": {
                "README.md": "# {project_name}\n\nProject description here.\n",
                "TODO.md": "# TODO\n\n- [ ] Add project tasks here\n"
            }
        }
        
        return structures.get(project_type, structures["general"])

# Git Tools
class GitInitTool(ExecutableTool):
    def __init__(self):
        super().__init__(
            "git_init",
            "Initialize a git repository",
            ToolCategory.PROJECT_MANAGEMENT
        )
    
    def _get_parameters_schema(self) -> Dict[str, Any]:
        return {
            "type": "object",
            "properties": {
                "path": {"type": "string", "description": "Path to initialize git repo", "default": "."},
                "initial_commit": {"type": "boolean", "description": "Create initial commit", "default": True}
            }
        }
    
    async def execute(self, path: str = ".", initial_commit: bool = True) -> ToolResult:
        try:
            # Initialize git repo
            result = subprocess.run(["git", "init"], cwd=path, capture_output=True, text=True)
            
            if result.returncode != 0:
                return ToolResult(
                    success=False,
                    output=f"Git init failed: {result.stderr}"
                )
            
            artifacts = {"git_initialized": True}
            
            if initial_commit:
                # Add all files and create initial commit
                subprocess.run(["git", "add", "."], cwd=path)
                commit_result = subprocess.run(
                    ["git", "commit", "-m", "Initial commit"],
                    cwd=path,
                    capture_output=True,
                    text=True
                )
                artifacts["initial_commit"] = commit_result.returncode == 0
            
            return ToolResult(
                success=True,
                output=f"Git repository initialized at {path}",
                artifacts=artifacts,
                metadata={"tool": self.name, "action": "git_repo_initialized"}
            )
            
        except Exception as e:
            return ToolResult(
                success=False,
                output=f"Error initializing git repo: {str(e)}"
            )

class ToolRegistry:
    """Registry for all available tools"""
    
    def __init__(self):
        self.tools: Dict[str, ExecutableTool] = {}
        self.categories: Dict[ToolCategory, List[ExecutableTool]] = {}
        self._register_default_tools()
    
    def _register_default_tools(self):
        """Register all default tools"""
        default_tools = [
            CreateFileTool(),
            CreateDirectoryTool(),
            RunPythonCodeTool(),
            InstallPackageTool(),
            MakeHttpRequestTool(),
            InitializeProjectTool(),
            GitInitTool()
        ]
        
        for tool in default_tools:
            self.register_tool(tool)
    
    def register_tool(self, tool: ExecutableTool):
        """Register a new tool"""
        self.tools[tool.name] = tool
        
        if tool.category not in self.categories:
            self.categories[tool.category] = []
        self.categories[tool.category].append(tool)
    
    def get_tool(self, name: str) -> Optional[ExecutableTool]:
        """Get a tool by name"""
        return self.tools.get(name)
    
    def get_tools_by_category(self, category: ToolCategory) -> List[ExecutableTool]:
        """Get all tools in a category"""
        return self.categories.get(category, [])
    
    def get_all_tools(self) -> List[ExecutableTool]:
        """Get all registered tools"""
        return list(self.tools.values())
    
    def get_tools_for_expertise(self, expertise_type: str) -> List[ExecutableTool]:
        """Get tools appropriate for a specific expertise type"""
        mapping = {
            "research": [ToolCategory.WEB_OPERATIONS, ToolCategory.RESEARCH],
            "analysis": [ToolCategory.CODE_EXECUTION, ToolCategory.DATABASE],
            "technical": [ToolCategory.CODE_EXECUTION, ToolCategory.FILE_SYSTEM, ToolCategory.DEPLOYMENT],
            "creative": [ToolCategory.FILE_SYSTEM, ToolCategory.WEB_OPERATIONS],
            "planning": [ToolCategory.PROJECT_MANAGEMENT, ToolCategory.FILE_SYSTEM],
            "synthesis": [ToolCategory.FILE_SYSTEM, ToolCategory.COMMUNICATION]
        }
        
        categories = mapping.get(expertise_type, [])
        tools = []
        for category in categories:
            tools.extend(self.get_tools_by_category(category))
        
        return tools

@dataclass
class ExecutableSubTask:
    """Subtask that can use tools to implement solutions"""
    id: str
    title: str
    description: str
    required_expertise: str
    priority: int
    dependencies: List[str]
    available_tools: List[str] = field(default_factory=list)

@dataclass
class ExecutionResult:
    """Result of executing a subtask with tools"""
    subtask_id: str
    success: bool
    output: str
    tools_used: List[str] = field(default_factory=list)
    artifacts_created: Dict[str, Any] = field(default_factory=dict)
    execution_log: List[str] = field(default_factory=list)

class ExecutableGeminiOrchestrator:
    """Gemini orchestrator that can actually execute and implement solutions"""
    
    def __init__(self, api_key: Optional[str] = None, model: str = "gemini-2.5-flash-preview-05-20"):
        self.client = genai.Client(api_key=api_key or os.getenv("GEMINI_API_KEY"))
        self.model = model
        self.tool_registry = ToolRegistry()
        
        # Define tool execution function
        self.tool_execution_function = gemini_types.FunctionDeclaration(
            name="execute_tools",
            description="Execute a sequence of tools to implement a solution",
            parameters=gemini_types.Schema(
                type="OBJECT",
                properties={
                    "reasoning": gemini_types.Schema(
                        type="STRING",
                        description="Explanation of why these tools are needed and how they solve the subtask"
                    ),
                    "tool_sequence": gemini_types.Schema(
                        type="ARRAY",
                        items=gemini_types.Schema(
                            type="OBJECT",
                            properties={
                                "tool_name": gemini_types.Schema(type="STRING"),
                                "parameters": gemini_types.Schema(type="OBJECT"),
                                "description": gemini_types.Schema(type="STRING")
                            },
                            required=["tool_name", "parameters", "description"]
                        ),
                        description="Sequence of tools to execute with their parameters"
                    )
                },
                required=["reasoning", "tool_sequence"]
            )
        )
    
    async def create_executable_plan(self, user_query: str, context: str = "") -> Dict[str, Any]:
        """Create a plan with executable subtasks"""
        
        available_tools = [
            f"- {tool.name}: {tool.description}" 
            for tool in self.tool_registry.get_all_tools()
        ]
        tools_list = "\n".join(available_tools)
        
        planning_prompt = f"""
{context}

IMPLEMENTATION REQUEST: {user_query}

You are a master implementation coordinator. Instead of just planning, you need to create a plan 
that can be EXECUTED using available tools. Each subtask should result in concrete artifacts, 
working code, deployed systems, or other tangible outcomes.

AVAILABLE TOOLS:
{tools_list}

Create an execution plan where each subtask:
1. Uses specific tools to implement real solutions
2. Creates tangible artifacts (files, deployments, systems)
3. Can be executed by specialized agents with tool access
4. Builds toward the complete implementation of the user's request

Focus on IMPLEMENTATION and EXECUTION, not just advice or planning.
"""

        try:
            response = await self.client.aio.models.generate_content(
                model=self.model,
                contents=planning_prompt,
                config=gemini_types.GenerateContentConfig(
                    temperature=0.3,
                    max_output_tokens=3072
                )
            )
            
            # Parse the response to extract executable plan
            # For now, create a structured plan based on the response
            return self._parse_implementation_plan(response.text, user_query)
            
        except Exception as e:
            logger.error(f"Planning error: {str(e)}")
            return self._create_fallback_implementation_plan(user_query)
    
    def _parse_implementation_plan(self, plan_text: str, user_query: str) -> Dict[str, Any]:
        """Parse the plan text into structured executable subtasks"""
        # This is a simplified parser - in production you might use more sophisticated NLP
        
        # Extract subtasks based on common patterns
        lines = plan_text.split('\n')
        subtasks = []
        
        current_subtask = None
        subtask_id = 1
        
        for line in lines:
            line = line.strip()
            if not line:
                continue
                
            # Look for subtask indicators
            if any(indicator in line.lower() for indicator in ['step', 'task', 'phase', 'implement', 'create', 'build']):
                if current_subtask:
                    subtasks.append(current_subtask)
                
                # Determine expertise type based on content
                expertise = self._determine_expertise_from_text(line)
                
                current_subtask = {
                    "id": f"task_{subtask_id}",
                    "title": line[:100],
                    "description": line,
                    "required_expertise": expertise,
                    "priority": subtask_id,
                    "dependencies": [] if subtask_id == 1 else [f"task_{subtask_id-1}"]
                }
                subtask_id += 1
        
        if current_subtask:
            subtasks.append(current_subtask)
        
        # If no subtasks found, create a default implementation task
        if not subtasks:
            subtasks = [{
                "id": "implementation",
                "title": "Implement Solution",
                "description": f"Implement the complete solution for: {user_query}",
                "required_expertise": "technical",
                "priority": 1,
                "dependencies": []
            }]
        
        return {
            "task_summary": f"Implementation plan for: {user_query}",
            "subtasks": subtasks,
            "execution_approach": "Tool-based implementation with concrete deliverables"
        }
    
    def _determine_expertise_from_text(self, text: str) -> str:
        """Determine expertise type from text content"""
        text_lower = text.lower()
        
        if any(word in text_lower for word in ['research', 'gather', 'find', 'investigate']):
            return "research"
        elif any(word in text_lower for word in ['analyze', 'examine', 'study', 'evaluate']):
            return "analysis"
        elif any(word in text_lower for word in ['code', 'develop', 'implement', 'build', 'create', 'deploy']):
            return "technical"
        elif any(word in text_lower for word in ['design', 'creative', 'ui', 'ux', 'visual']):
            return "creative"
        elif any(word in text_lower for word in ['plan', 'organize', 'structure', 'coordinate']):
            return "planning"
        else:
            return "synthesis"
    
    def _create_fallback_implementation_plan(self, user_query: str) -> Dict[str, Any]:
        """Create a simple fallback implementation plan"""
        return {
            "task_summary": f"Implementation of: {user_query}",
            "subtasks": [
                {
                    "id": "setup",
                    "title": "Project Setup",
                    "description": "Initialize project structure and environment",
                    "required_expertise": "technical",
                    "priority": 1,
                    "dependencies": []
                },
                {
                    "id": "implementation",
                    "title": "Core Implementation", 
                    "description": "Implement the main functionality",
                    "required_expertise": "technical",
                    "priority": 2,
                    "dependencies": ["setup"]
                },
                {
                    "id": "finalization",
                    "title": "Finalize and Document",
                    "description": "Complete implementation and create documentation",
                    "required_expertise": "synthesis",
                    "priority": 3,
                    "dependencies": ["implementation"]
                }
            ],
            "execution_approach": "Step-by-step implementation with tools"
        }
    
    async def execute_subtask_with_tools(self, subtask: Dict[str, Any], user_query: str, 
                                       dependency_results: Dict[str, ExecutionResult],
                                       context: str = "") -> ExecutionResult:
        """Execute a subtask using available tools"""
        
        expertise_type = subtask["required_expertise"]
        available_tools = self.tool_registry.get_tools_for_expertise(expertise_type)
        
        # Prepare tool information for the agent
        tools_info = "\n".join([
            f"- {tool.name}: {tool.description}\n  Parameters: {tool.get_schema()['parameters']}"
            for tool in available_tools
        ])
        
        # Prepare dependency context
        deps_context = ""
        if subtask["dependencies"]:
            deps_context = "\n\nPREVIOUS RESULTS:\n" + "\n".join([
                f"**{dep_id}**: {dependency_results.get(dep_id, ExecutionResult(dep_id, False, 'No result')).output}"
                for dep_id in subtask["dependencies"]
            ])
        
        execution_prompt = f"""
{context}

ROLE: Implementation Specialist ({expertise_type})
MISSION: Execute this subtask using available tools to create real, working solutions.

ORIGINAL REQUEST: {user_query}
CURRENT SUBTASK: {subtask['title']}
DESCRIPTION: {subtask['description']}

{deps_context}

AVAILABLE TOOLS:
{tools_info}

You must IMPLEMENT this subtask using the available tools. Do not just provide advice or suggestions.
Use the tools to:
1. Create actual files, code, or systems
2. Install necessary dependencies
3. Execute code or scripts
4. Set up project structures
5. Make API calls or web requests as needed

Plan and execute a sequence of tool calls that will complete this subtask with tangible results.
"""

        try:
            # Get tool execution plan from Gemini
            tool = gemini_types.Tool(function_declarations=[self.tool_execution_function])
            
            response = await self.client.aio.models.generate_content(
                model=self.model,
                contents=execution_prompt,
                config=gemini_types.GenerateContentConfig(
                    tools=[tool],
                    temperature=0.4,
                    max_output_tokens=4096
                )
            )
            
            # Execute the planned tools
            if response.function_calls:
                function_call = response.function_calls[0]
                if function_call.name == "execute_tools":
                    return await self._execute_tool_sequence(
                        function_call.args,
                        subtask["id"],
                        dependency_results
                    )
            
            # Fallback: try to parse response text for tool usage
            return await self._fallback_tool_execution(subtask, response.text)
            
        except Exception as e:
            logger.error(f"Error executing subtask {subtask['id']}: {str(e)}")
            return ExecutionResult(
                subtask_id=subtask["id"],
                success=False,
                output=f"Execution failed: {str(e)}",
                execution_log=[f"Error: {str(e)}"]
            )
    
    async def _execute_tool_sequence(self, tool_plan: Dict[str, Any], 
                                   subtask_id: str,
                                   dependency_results: Dict[str, ExecutionResult]) -> ExecutionResult:
        """Execute a planned sequence of tools"""
        
        reasoning = tool_plan.get("reasoning", "No reasoning provided")
        tool_sequence = tool_plan.get("tool_sequence", [])
        
        execution_log = [f"Starting execution: {reasoning}"]
        tools_used = []
        artifacts_created = {}
        success = True
        
        for step in tool_sequence:
            tool_name = step.get("tool_name")
            parameters = step.get("parameters", {})
            description = step.get("description", "")
            
            execution_log.append(f"Executing {tool_name}: {description}")
            
            # Get and execute the tool
            tool = self.tool_registry.get_tool(tool_name)
            if not tool:
                execution_log.append(f"Error: Tool {tool_name} not found")
                success = False
                continue
            
            try:
                result = await tool.execute(**parameters)
                tools_used.append(tool_name)
                
                if result.success:
                    execution_log.append(f"✅ {tool_name}: {result.output}")
                    artifacts_created.update(result.artifacts)
                else:
                    execution_log.append(f"❌ {tool_name}: {result.output}")
                    success = False
                    
            except Exception as e:
                execution_log.append(f"❌ {tool_name} error: {str(e)}")
                success = False
        
        # Generate summary output
        output = f"Subtask execution completed.\n\nReasoning: {reasoning}\n\n"
        output += "Execution Summary:\n" + "\n".join(execution_log[-len(tool_sequence):])
        
        if artifacts_created:
            output += f"\n\nArtifacts Created: {list(artifacts_created.keys())}"
        
        return ExecutionResult(
            subtask_id=subtask_id,
            success=success,
            output=output,
            tools_used=tools_used,
            artifacts_created=artifacts_created,
            execution_log=execution_log
        )
    
    async def _fallback_tool_execution(self, subtask: Dict[str, Any], response_text: str) -> ExecutionResult:
        """Fallback execution when function calling fails"""
        
        # For fallback, try to execute basic tools based on subtask type
        expertise = subtask["required_expertise"]
        execution_log = [f"Fallback execution for {subtask['title']}"]
        
        if expertise == "technical":
            # Create a basic project structure
            create_dir_tool = self.tool_registry.get_tool("create_directory")
            if create_dir_tool:
                result = await create_dir_tool.execute(
                    dir_path=f"project_{subtask['id']}",
                    parents=True
                )
                execution_log.append(f"Created project directory: {result.output}")
                
                return ExecutionResult(
                    subtask_id=subtask["id"],
                    success=result.success,
                    output=f"Basic project setup completed: {result.output}",
                    tools_used=["create_directory"],
                    artifacts_created=result.artifacts,
                    execution_log=execution_log
                )
        
        # Default fallback
        return ExecutionResult(
            subtask_id=subtask["id"],
            success=True,
            output=f"Fallback execution completed for: {subtask['title']}\n\nAgent Response:\n{response_text}",
            execution_log=execution_log
        )
    
    async def execute_implementation_workflow(self, user_query: str, 
                                            context: str = "",
                                            workspace_path: str = "./workspace") -> Dict[str, Any]:
        """Execute complete implementation workflow with tools"""
        
        start_time = time.time()
        
        # Create workspace
        workspace = Path(workspace_path)
        workspace.mkdir(exist_ok=True)
        
        logger.info(f"🚀 Starting implementation workflow for: {user_query[:100]}...")
        
        try:
            # Step 1: Create executable plan
            logger.info("📋 Creating implementation plan...")
            execution_plan = await self.create_executable_plan(user_query, context)
            
            # Step 2: Execute subtasks with tools
            logger.info("⚡ Executing implementation subtasks...")
            execution_results: Dict[str, ExecutionResult] = {}
            remaining_subtasks = execution_plan["subtasks"].copy()
            
            # Sort by priority
            remaining_subtasks.sort(key=lambda x: x["priority"])
            
            while remaining_subtasks:
                # Find executable subtasks (dependencies satisfied)
                executable = [
                    st for st in remaining_subtasks 
                    if all(dep in execution_results for dep in st["dependencies"])
                ]
                
                if not executable:
                    logger.warning("⚠️ Dependency issue, executing next task anyway")
                    executable = remaining_subtasks[:1]
                
                # Execute one at a time to maintain order and dependencies
                for subtask in executable[:1]:  # Process one at a time for better control
                    logger.info(f"🔄 Implementing: {subtask['title']}")
                    
                    result = await self.execute_subtask_with_tools(
                        subtask, user_query, execution_results, context
                    )
                    
                    execution_results[subtask["id"]] = result
                    
                    if result.success:
                        logger.info(f"✅ Completed: {subtask['title']}")
                    else:
                        logger.warning(f"⚠️ Issues with: {subtask['title']}")
                
                # Remove completed subtasks
                completed_ids = {st["id"] for st in executable[:1]}
                remaining_subtasks = [st for st in remaining_subtasks if st["id"] not in completed_ids]
            
            # Step 3: Generate implementation summary
            logger.info("📊 Generating implementation summary...")
            summary = self._generate_implementation_summary(
                user_query, execution_plan, execution_results
            )
            
            execution_time = time.time() - start_time
            logger.info(f"🎉 Implementation completed in {execution_time:.2f} seconds")
            
            return {
                "success": True,
                "summary": summary,
                "execution_plan": execution_plan,
                "execution_results": {k: {
                    "success": v.success,
                    "output": v.output,
                    "tools_used": v.tools_used,
                    "artifacts_created": v.artifacts_created
                } for k, v in execution_results.items()},
                "workspace_path": str(workspace.absolute()),
                "execution_time": execution_time,
                "metadata": {
                    "total_subtasks": len(execution_plan["subtasks"]),
                    "successful_subtasks": sum(1 for r in execution_results.values() if r.success),
                    "total_tools_used": sum(len(r.tools_used) for r in execution_results.values()),
                    "total_artifacts": sum(len(r.artifacts_created) for r in execution_results.values())
                }
            }
            
        except Exception as e:
            logger.error(f"❌ Workflow execution failed: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "summary": f"Implementation failed: {str(e)}"
            }
    
    def _generate_implementation_summary(self, user_query: str, 
                                       execution_plan: Dict[str, Any],
                                       execution_results: Dict[str, ExecutionResult]) -> str:
        """Generate a comprehensive summary of the implementation"""
        
        summary = f"# Implementation Summary\n\n**Original Request:** {user_query}\n\n"
        summary += f"**Execution Approach:** {execution_plan['execution_approach']}\n\n"
        
        summary += "## Implementation Results\n\n"
        
        successful_tasks = 0
        total_artifacts = 0
        all_tools_used = set()
        
        for subtask in execution_plan["subtasks"]:
            result = execution_results.get(subtask["id"])
            if not result:
                continue
                
            status = "✅ SUCCESS" if result.success else "❌ FAILED"
            summary += f"### {subtask['title']} - {status}\n"
            summary += f"**Description:** {subtask['description']}\n\n"
            
            if result.tools_used:
                summary += f"**Tools Used:** {', '.join(result.tools_used)}\n"
                all_tools_used.update(result.tools_used)
            
            if result.artifacts_created:
                summary += f"**Artifacts Created:** {', '.join(result.artifacts_created.keys())}\n"
                total_artifacts += len(result.artifacts_created)
            
            summary += f"**Output:** {result.output[:200]}{'...' if len(result.output) > 200 else ''}\n\n"
            
            if result.success:
                successful_tasks += 1
        
        summary += "## Summary Statistics\n\n"
        summary += f"- **Tasks Completed Successfully:** {successful_tasks}/{len(execution_plan['subtasks'])}\n"
        summary += f"- **Tools Used:** {len(all_tools_used)} ({', '.join(sorted(all_tools_used))})\n"
        summary += f"- **Artifacts Created:** {total_artifacts}\n"
        
        success_rate = (successful_tasks / len(execution_plan["subtasks"])) * 100
        summary += f"- **Success Rate:** {success_rate:.1f}%\n"
        
        return summary

# Convenience functions
async def implement_with_gemini(query: str, api_key: Optional[str] = None, 
                              workspace: str = "./workspace") -> Dict[str, Any]:
    """Quick implementation using Gemini orchestrator"""
    orchestrator = ExecutableGeminiOrchestrator(api_key=api_key)
    return await orchestrator.execute_implementation_workflow(query, workspace_path=workspace)

# Example usage
async def main():
    """Example usage of the executable orchestrator"""
    
    # Example 1: Create a simple web application
    query1 = "Create a simple Flask web application with a REST API that manages a todo list. Include HTML frontend, database integration, and deployment configuration."
    
    result1 = await implement_with_gemini(query1, workspace="./todo_app_project")
    
    print("=== TODO APP IMPLEMENTATION ===")
    print(f"Success: {result1['success']}")
    print(f"Summary: {result1['summary'][:500]}...")
    print(f"Workspace: {result1['workspace_path']}")
    
    # Example 2: Create a data analysis project
    query2 = "Create a Python data analysis project that reads CSV data, performs statistical analysis, creates visualizations, and generates a report. Include all necessary dependencies and documentation."
    
    result2 = await implement_with_gemini(query2, workspace="./data_analysis_project")
    
    print("\n=== DATA ANALYSIS PROJECT ===")
    print(f"Success: {result2['success']}")
    print(f"Artifacts created: {result2['metadata']['total_artifacts']}")
    print(f"Tools used: {result2['metadata']['total_tools_used']}")

if __name__ == "__main__":
    asyncio.run(main())