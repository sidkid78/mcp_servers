"""
Generate Documentation Tool
Auto-generate documentation from code.
"""

from pathlib import Path
from typing import Dict, List
import re

async def generate_docs_tool(source_path: str, doc_type: str = "full", output_path: str = "docs") -> Dict:
    """
    Auto-generate documentation from code.
    """
    
    try:
        source_dir = Path(source_path)
        if not source_dir.exists():
            return {"error": f"Source path does not exist: {source_path}"}
        
        output_dir = Path(output_path)
        output_dir.mkdir(exist_ok=True)
        
        if doc_type == "api":
            result = await _generate_api_docs(source_dir, output_dir)
        elif doc_type == "readme":
            result = await _generate_readme(source_dir, output_dir)
        else:  # full
            result = await _generate_full_docs(source_dir, output_dir)
        
        return result
    
    except Exception as e:
        return {"error": f"Documentation generation failed: {str(e)}"}


async def _generate_full_docs(source_dir: Path, output_dir: Path) -> Dict:
    """Generate comprehensive documentation."""
    
    docs_generated = []
    
    # Generate README
    readme_result = await _generate_readme(source_dir, output_dir)
    if "files_created" in readme_result:
        docs_generated.extend(readme_result["files_created"])
    
    # Generate API docs
    api_result = await _generate_api_docs(source_dir, output_dir)
    if "files_created" in api_result:
        docs_generated.extend(api_result["files_created"])
    
    return {
        "type": "full",
        "files_created": docs_generated,
        "output_directory": str(output_dir),
        "summary": f"Generated {len(docs_generated)} documentation files"
    }


async def _generate_readme(source_dir: Path, output_dir: Path) -> Dict:
    """Generate README.md file."""
    
    try:
        project_name = source_dir.name
        
        readme_content = f"""# {project_name}

## Overview
Auto-generated documentation for {project_name}.

## Getting Started

### Installation
```bash
# Add installation commands
```

### Usage
```bash
# Add usage examples
```

## Development

### Running Tests
```bash
# Add test commands
```

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---
*This README was auto-generated.*
"""
        
        readme_path = output_dir / "README.md"
        with open(readme_path, 'w') as f:
            f.write(readme_content)
        
        return {
            "type": "readme",
            "files_created": [str(readme_path)],
            "summary": "Generated project README.md"
        }
    
    except Exception as e:
        return {"error": f"README generation failed: {e}"}


async def _generate_api_docs(source_dir: Path, output_dir: Path) -> Dict:
    """Generate API documentation."""
    
    try:
        # Find source files
        source_files = []
        for ext in ['.py', '.js', '.ts']:
            source_files.extend(source_dir.rglob(f'*{ext}'))
        
        if not source_files:
            return {"error": "No source files found"}
        
        # Extract API information
        functions = []
        for file_path in source_files[:10]:
            try:
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                
                # Simple function extraction
                if file_path.suffix == '.py':
                    matches = re.finditer(r'def\s+(\w+)\s*\([^)]*\):', content)
                    for match in matches:
                        functions.append({
                            "name": match.group(1),
                            "file": str(file_path.relative_to(source_dir))
                        })
            except:
                continue
        
        # Generate API documentation
        api_content = f"""# API Documentation

## Functions

{_format_functions(functions)}

---
*Generated from source code analysis*
"""
        
        api_path = output_dir / "API.md"
        with open(api_path, 'w') as f:
            f.write(api_content)
        
        return {
            "type": "api",
            "files_created": [str(api_path)],
            "summary": f"Generated API docs for {len(functions)} functions"
        }
    
    except Exception as e:
        return {"error": f"API documentation generation failed: {e}"}


def _format_functions(functions: List[Dict]) -> str:
    """Format functions for documentation."""
    
    if not functions:
        return "No functions found."
    
    formatted = []
    for func in functions:
        formatted.append(f"### {func['name']}")
        formatted.append(f"**File:** `{func['file']}`")
        formatted.append("")
    
    return '\n'.join(formatted)
