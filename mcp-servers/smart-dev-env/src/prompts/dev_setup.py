"""
Development Environment Setup Prompt
Prime agent with project context and development standards.
"""

import os
import json
from pathlib import Path
from typing import Dict


async def dev_setup_prompt(project_path: str) -> str:
    """
    Analyze project and set up development context.
    This is the discovery prompt that primes the agent with everything it needs to know.
    """

    project_path = Path(project_path).resolve()

    if not project_path.exists():
        return f"❌ Project path does not exist: {project_path}"

    # Analyze project structure
    project_info = await _analyze_project_structure(project_path)

    # Detect project type and technologies
    tech_stack = await _detect_tech_stack(project_path)

    # Check for development standards files
    standards = await _check_dev_standards(project_path)

    # Generate setup summary
    setup_summary = f"""
🚀 **Smart Development Environment Activated**

**Project Analysis:**
📁 Path: {project_path}
🏗️ Type: {tech_stack["type"]}
🛠️ Stack: {", ".join(tech_stack["technologies"])}
📊 Structure: {project_info["structure_summary"]}

**Development Standards Detected:**
{_format_standards(standards)}

**Available Workflows:**
🔍 `/smart-dev/code-review` - Multi-step code review with quality gates
🏛️ `/smart-dev/architecture-analysis` - Guided architecture decisions  
🐛 `/smart-dev/debug-investigation` - Systematic debugging methodology
♻️ `/smart-dev/refactor-planning` - Safe refactoring with rollback strategies
⚡ `/smart-dev/performance-audit` - End-to-end performance analysis

**Individual Tools Available:**
• `analyze-codebase` - Static analysis and metrics
• `run-tests` - Execute test suites with reporting  
• `check-dependencies` - Security and version auditing
• `generate-docs` - Auto-documentation from code
• `deploy-preview` - Staging environment deployment
• `rollback-changes` - Safe rollback mechanisms

**Quick Start Suggestions:**
{_generate_quick_start_suggestions(project_info, tech_stack, standards)}

**Context Loaded ✅**
Ready for senior-level development assistance. What would you like to work on?
"""

    return setup_summary


async def _analyze_project_structure(project_path: Path) -> Dict:
    """Analyze the overall project structure."""

    structure = {
        "total_files": 0,
        "directories": [],
        "key_files": [],
        "structure_summary": "",
    }

    try:
        # Count files and directories
        for root, dirs, files in os.walk(project_path):
            # Skip hidden directories and common ignore patterns
            dirs[:] = [
                d
                for d in dirs
                if not d.startswith(".")
                and d not in ["node_modules", "__pycache__", "venv", "env"]
            ]

            rel_root = Path(root).relative_to(project_path)
            if rel_root != Path("."):
                structure["directories"].append(str(rel_root))

            for file in files:
                if not file.startswith("."):
                    structure["total_files"] += 1
                    file_path = rel_root / file

                    # Identify key files
                    if file in [
                        "package.json",
                        "requirements.txt",
                        "Cargo.toml",
                        "go.mod",
                        "pom.xml",
                        "Dockerfile",
                        "docker-compose.yml",
                    ]:
                        structure["key_files"].append(str(file_path))

        # Generate structure summary
        if structure["total_files"] < 50:
            size = "Small"
        elif structure["total_files"] < 200:
            size = "Medium"
        else:
            size = "Large"

        structure["structure_summary"] = (
            f"{size} project ({structure['total_files']} files, {len(structure['directories'])} directories)"
        )

    except Exception as e:
        structure["structure_summary"] = f"Could not analyze structure: {e}"

    return structure


async def _detect_tech_stack(project_path: Path) -> Dict:
    """Detect technologies used in the project."""

    tech_stack = {
        "type": "Unknown",
        "technologies": [],
        "frameworks": [],
        "languages": [],
    }

    # Check for language/framework indicators
    indicators = {
        "package.json": {"type": "JavaScript/Node.js", "tech": ["Node.js", "npm"]},
        "requirements.txt": {"type": "Python", "tech": ["Python", "pip"]},
        "Cargo.toml": {"type": "Rust", "tech": ["Rust", "Cargo"]},
        "go.mod": {"type": "Go", "tech": ["Go"]},
        "pom.xml": {"type": "Java/Maven", "tech": ["Java", "Maven"]},
        "build.gradle": {"type": "Java/Gradle", "tech": ["Java", "Gradle"]},
        "Dockerfile": {"tech": ["Docker"]},
        "docker-compose.yml": {"tech": ["Docker Compose"]},
        ".github": {"tech": ["GitHub Actions"]},
        "tsconfig.json": {"tech": ["TypeScript"]},
        "tailwind.config.js": {"tech": ["Tailwind CSS"]},
        "next.config.js": {"type": "Next.js", "tech": ["Next.js", "React"]},
        "nuxt.config.js": {"type": "Nuxt.js", "tech": ["Nuxt.js", "Vue.js"]},
        "angular.json": {"type": "Angular", "tech": ["Angular", "TypeScript"]},
        "vue.config.js": {"type": "Vue.js", "tech": ["Vue.js"]},
    }

    detected_types = []
    all_tech = set()

    for indicator, info in indicators.items():
        if (project_path / indicator).exists():
            if "type" in info:
                detected_types.append(info["type"])
            all_tech.update(info["tech"])

    # Check for additional framework indicators in package.json
    package_json_path = project_path / "package.json"
    if package_json_path.exists():
        try:
            with open(package_json_path, "r") as f:
                package_data = json.load(f)
                dependencies = {
                    **package_data.get("dependencies", {}),
                    **package_data.get("devDependencies", {}),
                }

                framework_indicators = {
                    "react": "React",
                    "vue": "Vue.js",
                    "angular": "Angular",
                    "express": "Express.js",
                    "fastify": "Fastify",
                    "next": "Next.js",
                    "nuxt": "Nuxt.js",
                    "svelte": "Svelte",
                    "solid-js": "Solid.js",
                }

                for dep, framework in framework_indicators.items():
                    if any(dep in key for key in dependencies.keys()):
                        all_tech.add(framework)
        except:
            pass

    tech_stack["type"] = detected_types[0] if detected_types else "Mixed/Unknown"
    tech_stack["technologies"] = list(all_tech)

    return tech_stack


async def _check_dev_standards(project_path: Path) -> Dict:
    """Check for development standards and configuration files."""

    standards = {
        "linting": [],
        "formatting": [],
        "testing": [],
        "ci_cd": [],
        "documentation": [],
    }

    standard_files = {
        # Linting
        ".eslintrc.json": "linting",
        ".eslintrc.js": "linting",
        "pyproject.toml": "linting",
        "flake8": "linting",
        "pylint.rc": "linting",
        # Formatting
        ".prettierrc": "formatting",
        ".editorconfig": "formatting",
        "black.toml": "formatting",
        # Testing
        "jest.config.js": "testing",
        "pytest.ini": "testing",
        "karma.conf.js": "testing",
        "cypress.json": "testing",
        # CI/CD
        ".github/workflows": "ci_cd",
        ".gitlab-ci.yml": "ci_cd",
        "Jenkinsfile": "ci_cd",
        # Documentation
        "README.md": "documentation",
        "docs": "documentation",
        "CONTRIBUTING.md": "documentation",
    }

    for file_path, category in standard_files.items():
        if (project_path / file_path).exists():
            standards[category].append(file_path)

    return standards


def _format_standards(standards: Dict) -> str:
    """Format development standards for display."""

    if not any(standards.values()):
        return "⚠️ No development standards detected. Consider running `/smart-dev/refactor-planning` to establish standards."

    formatted = []

    icons = {
        "linting": "🔍",
        "formatting": "✨",
        "testing": "🧪",
        "ci_cd": "🚀",
        "documentation": "📚",
    }

    for category, files in standards.items():
        if files:
            formatted.append(
                f"{icons.get(category, '•')} {category.replace('_', ' ').title()}: {', '.join(files)}"
            )

    return "\n".join(formatted)


def _generate_quick_start_suggestions(
    project_info: Dict, tech_stack: Dict, standards: Dict
) -> str:
    """Generate contextual quick start suggestions."""

    suggestions = []

    # Suggest based on project characteristics
    if project_info["total_files"] > 100:
        suggestions.append(
            "📊 Large codebase detected → Try `/smart-dev/architecture-analysis` to understand structure"
        )

    if not standards["testing"]:
        suggestions.append(
            "🧪 No testing config found → Use `/smart-dev/refactor-planning` to establish testing"
        )

    if "React" in tech_stack["technologies"] or "Vue.js" in tech_stack["technologies"]:
        suggestions.append(
            "⚡ Frontend project → Consider `/smart-dev/performance-audit frontend` for optimization"
        )

    if "Docker" in tech_stack["technologies"]:
        suggestions.append(
            "🐳 Docker detected → Use `deploy-preview` tool for containerized deployments"
        )

    if not suggestions:
        suggestions.append(
            "🔍 Run `/smart-dev/code-review HEAD` to review recent changes"
        )
        suggestions.append(
            "🏛️ Try `/smart-dev/architecture-analysis` to explore system design"
        )

    return "\n".join(f"• {suggestion}" for suggestion in suggestions[:3])
