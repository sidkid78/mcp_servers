from google import genai
from google.genai import types
import asyncio
from typing import List, Dict, Optional
import json
import os

class AdvancedMeetingAssistant:
    """
    Enhanced meeting assistant using the latest Google Gen AI SDK features
    """
    
    def __init__(self, api_key: str):
        self.client = genai.Client(api_key=api_key or os.getenv('GEMINI_API_KEY'))
        self.model = 'gemini-2.5-flash-preview-05-20'
        self.cached_content = None
        self.uploaded_files = []
        
    async def upload_meeting_document(self, file_path: str) -> str:
        """Upload meeting document for context (agenda, previous notes, etc.)"""
        try:
            file = self.client.files.upload(file=file_path)
            self.uploaded_files.append(file)
            print(f"✅ Uploaded: {file.name}")
            return file.uri
        except Exception as e:
            print(f"❌ Upload failed: {e}")
            return ""
    
    async def create_meeting_cache(self, documents: List[str], system_instruction: str):
        """Create cached content from meeting documents for faster processing"""
        try:
            file_parts = []
            for doc_uri in documents:
                file_parts.append(
                    types.Part.from_uri(file_uri=doc_uri, mime_type='application/pdf')
                )
            
            self.cached_content = self.client.caches.create(
                model=self.model,
                config=types.CreateCachedContentConfig(
                    contents=[
                        types.Content(role='user', parts=file_parts)
                    ],
                    system_instruction=system_instruction,
                    display_name='meeting_context',
                    ttl='7200s'  # 2 hours
                )
            )
            print("✅ Meeting context cached for faster processing")
            
        except Exception as e:
            print(f"❌ Caching failed: {e}")
    
    def get_contextual_suggestion(self, conversation: str, user_question: str) -> str:
        """Get suggestion with meeting document context"""
        try:
            config = types.GenerateContentConfig(
                temperature=0.7,
                max_output_tokens=150,
                response_mime_type='application/json',
                response_schema={
                    'type': 'OBJECT',
                    'properties': {
                        'suggestion': {'type': 'STRING'},
                        'confidence': {'type': 'NUMBER'},
                        'reasoning': {'type': 'STRING'},
                        'timing': {'type': 'STRING'}  # 'now', 'wait', 'later'
                    },
                    'required': ['suggestion', 'confidence', 'timing']
                }
            )
            
            # Add cached content if available
            if self.cached_content:
                config.cached_content = self.cached_content.name
            
            prompt = f"""
            Based on the conversation and meeting context, provide a suggestion:
            
            CONVERSATION: {conversation}
            QUESTION: {user_question}
            
            Consider:
            - Meeting agenda and documents
            - Conversation flow
            - User's role and expertise
            - Appropriate timing
            """
            
            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
                config=config
            )
            
            return json.loads(response.text)
            
        except Exception as e:
            return {"suggestion": f"Error: {e}", "confidence": 0, "timing": "wait"}
    
    async def stream_real_time_analysis(self, conversation_stream):
        """Analyze conversation in real-time with streaming"""
        try:
            async for chunk in await self.client.aio.models.generate_content_stream(
                model=self.model,
                contents=[
                    "Analyze this meeting conversation in real-time. "
                    "Focus on key decisions, action items, and discussion points.",
                    conversation_stream
                ],
                config=types.GenerateContentConfig(
                    temperature=0.3,
                    max_output_tokens=200
                )
            ):
                if chunk.text:
                    yield chunk.text
                    
        except Exception as e:
            yield f"Error in real-time analysis: {e}"
    
    def generate_meeting_summary_with_schema(self, conversation: str) -> Dict:
        """Generate structured meeting summary using Pydantic schema"""
        from pydantic import BaseModel
        from typing import List as PyList
        
        class MeetingSummary(BaseModel):
            title: str
            duration_minutes: int
            participants: PyList[str]
            key_topics: PyList[str]
            decisions_made: PyList[str]
            action_items: PyList[Dict[str, str]]  # {"task": "", "owner": "", "deadline": ""}
            next_steps: PyList[str]
            follow_up_needed: bool
        
        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=f"""
                Create a comprehensive meeting summary from this conversation:
                
                {conversation}
                
                Extract all key information and structure it properly.
                """,
                config=types.GenerateContentConfig(
                    response_mime_type='application/json',
                    response_schema=MeetingSummary,
                    temperature=0.3
                )
            )
            
            return json.loads(response.text)
            
        except Exception as e:
            return {"error": f"Summary generation failed: {e}"}
    
    def get_intelligent_questions(self, topic: str, conversation_context: str) -> List[str]:
        """Generate intelligent follow-up questions based on conversation"""
        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=f"""
                Given this meeting topic and conversation, suggest 3-5 intelligent questions 
                that would help clarify, deepen understanding, or move the discussion forward:
                
                TOPIC: {topic}
                CONTEXT: {conversation_context}
                
                Focus on:
                - Clarifying ambiguities
                - Identifying missing information
                - Exploring implications
                - Addressing potential risks
                
                Return as a JSON array of strings.
                """,
                config=types.GenerateContentConfig(
                    response_mime_type='application/json',
                    response_schema={
                        'type': 'ARRAY',
                        'items': {'type': 'STRING'}
                    }
                )
            )
            
            return json.loads(response.text)
            
        except Exception as e:
            return [f"Error generating questions: {e}"]
    
    async def auto_function_calling_demo(self, query: str):
        """Demo of automatic function calling for meeting assistance"""
        
        def schedule_follow_up(participants: str, topic: str, days_from_now: int) -> str:
            """Schedule a follow-up meeting.
            
            Args:
                participants: Comma-separated list of participant emails
                topic: Meeting topic/subject
                days_from_now: Number of days from today to schedule
            """
            return f"Follow-up scheduled: '{topic}' with {participants} in {days_from_now} days"
        
        def create_action_item(task: str, assignee: str, deadline: str) -> str:
            """Create an action item from meeting discussion.
            
            Args:
                task: Description of the task
                assignee: Person responsible for the task
                deadline: When the task should be completed
            """
            return f"Action item created: {task} (assigned to {assignee}, due {deadline})"
        
        def search_company_policy(topic: str) -> str:
            """Search company policies and procedures.
            
            Args:
                topic: The policy topic to search for
            """
            return f"Policy information for '{topic}': [Company policy details would go here]"
        
        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=query,
                config=types.GenerateContentConfig(
                    tools=[schedule_follow_up, create_action_item, search_company_policy],
                    automatic_function_calling=types.AutomaticFunctionCallingConfig(
                        maximum_remote_calls=3
                    )
                )
            )
            
            return response.text
            
        except Exception as e:
            return f"Function calling error: {e}"
    
    def cleanup(self):
        """Clean up resources"""
        # Delete uploaded files
        for file in self.uploaded_files:
            try:
                self.client.files.delete(name=file.name)
                print(f"🗑️ Deleted: {file.name}")
            except:
                pass
        
        # Clear cache if created
        if self.cached_content:
            try:
                self.client.caches.delete(name=self.cached_content.name)
                print("🗑️ Cleared meeting cache")
            except:
                pass

# Example usage
async def demo_advanced_features():
    assistant = AdvancedMeetingAssistant("your_api_key")
    
    print("🚀 Advanced Meeting Assistant Demo")
    print("=" * 50)
    
    # 1. Upload meeting document
    # doc_uri = await assistant.upload_meeting_document("meeting_agenda.pdf")
    
    # 2. Create cached context
    # await assistant.create_meeting_cache([doc_uri], "You are a meeting assistant with access to the agenda.")
    
    # 3. Get contextual suggestion
    suggestion = assistant.get_contextual_suggestion(
        "We've been discussing the new feature requirements for 10 minutes",
        "Should I ask about timeline?"
    )
    print(f"💡 Suggestion: {suggestion}")
    
    # 4. Generate intelligent questions
    questions = assistant.get_intelligent_questions(
        "Product roadmap planning",
        "We discussed Q1 priorities but timeline seems unclear"
    )
    print(f"❓ Suggested questions: {questions}")
    
    # 5. Auto function calling demo
    result = await assistant.auto_function_calling_demo(
        "We need to schedule a follow-up meeting about the API design with john@company.com and sarah@company.com for next week, and create an action item for John to review the security requirements by Friday."
    )
    print(f"🔧 Function calling result: {result}")
    
    # 6. Generate structured summary
    summary = assistant.generate_meeting_summary_with_schema(
        "Meeting discussion about Q1 planning, John will handle API design, Sarah takes UI mockups, follow-up needed on security review"
    )
    print(f"📋 Structured summary: {json.dumps(summary, indent=2)}")
    
    # Cleanup
    assistant.cleanup()

if __name__ == "__main__":
    asyncio.run(demo_advanced_features())