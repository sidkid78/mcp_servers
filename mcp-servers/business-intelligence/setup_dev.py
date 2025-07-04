#!/usr/bin/env python3
"""
Development setup script for Business Intelligence MCP Server.
This script automates the development environment setup process.
"""

import subprocess
import sys
import os
import platform
from pathlib import Path


def run_command(command, description, check=True):
    """Run a command and handle errors."""
    print(f"\n{'='*60}")
    print(f"📋 {description}")
    print(f"{'='*60}")
    print(f"Running: {command}")
    
    try:
        if isinstance(command, str):
            result = subprocess.run(command, shell=True, check=check, capture_output=True, text=True)
        else:
            result = subprocess.run(command, check=check, capture_output=True, text=True)
        
        if result.stdout:
            print("✅ Output:")
            print(result.stdout)
        
        if result.stderr and not check:
            print("⚠️  Warnings:")
            print(result.stderr)
            
        return result.returncode == 0
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Error: {e}")
        if e.stdout:
            print("Output:", e.stdout)
        if e.stderr:
            print("Error output:", e.stderr)
        return False


def check_python_version():
    """Check if Python version is compatible."""
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 9):
        print(f"❌ Python {version.major}.{version.minor} is not supported. Please use Python 3.9 or higher.")
        return False
    print(f"✅ Python {version.major}.{version.minor}.{version.micro} is compatible.")
    return True


def setup_virtual_environment():
    """Set up Python virtual environment."""
    if not os.path.exists("venv"):
        success = run_command([sys.executable, "-m", "venv", "venv"], "Creating virtual environment")
        if not success:
            print("❌ Failed to create virtual environment")
            return False
    else:
        print("✅ Virtual environment already exists")
    
    # Determine activation script based on OS
    if platform.system() == "Windows":
        activate_script = "venv\\Scripts\\activate"
        pip_path = "venv\\Scripts\\pip"
    else:
        activate_script = "venv/bin/activate"
        pip_path = "venv/bin/pip"
    
    print(f"📝 To activate the virtual environment, run:")
    print(f"   {activate_script}")
    
    return True, pip_path


def install_dependencies(pip_path):
    """Install project dependencies."""
    commands = [
        ([pip_path, "install", "--upgrade", "pip"], "Upgrading pip"),
        ([pip_path, "install", "-r", "requirements.txt"], "Installing production dependencies"),
        ([pip_path, "install", "-e", ".[dev]"], "Installing development dependencies"),
    ]
    
    for command, description in commands:
        success = run_command(command, description, check=False)
        if not success:
            print(f"⚠️  Warning: {description} had issues, but continuing...")


def setup_pre_commit():
    """Set up pre-commit hooks."""
    if os.path.exists(".pre-commit-config.yaml"):
        success = run_command("pre-commit install", "Installing pre-commit hooks", check=False)
        if success:
            print("✅ Pre-commit hooks installed")
        else:
            print("⚠️  Pre-commit installation failed, but continuing...")
    else:
        print("⚠️  No pre-commit config found, skipping...")


def create_required_directories():
    """Create required project directories."""
    directories = ["exports", "temp", "data", "charts", "reports"]
    
    for directory in directories:
        path = Path(directory)
        if not path.exists():
            path.mkdir(parents=True, exist_ok=True)
            print(f"✅ Created directory: {directory}")
        else:
            print(f"📁 Directory already exists: {directory}")


def setup_environment_file():
    """Set up environment configuration."""
    if not os.path.exists(".env"):
        if os.path.exists(".env.example"):
            try:
                with open(".env.example", "r") as src, open(".env", "w") as dst:
                    dst.write(src.read())
                print("✅ Created .env file from .env.example")
            except Exception as e:
                print(f"⚠️  Failed to create .env file: {e}")
        else:
            print("⚠️  No .env.example found")
    else:
        print("📄 .env file already exists")


def run_initial_tests(pip_path):
    """Run initial tests to verify setup."""
    print("\n🧪 Running initial tests...")
    success = run_command([pip_path.replace("pip", "python"), "-m", "pytest", "tests/", "-v"], 
                         "Running test suite", check=False)
    if success:
        print("✅ All tests passed!")
    else:
        print("⚠️  Some tests failed, but setup is complete")


def display_next_steps():
    """Display next steps for the user."""
    activation_cmd = "venv\\Scripts\\activate" if platform.system() == "Windows" else "source venv/bin/activate"
    
    print(f"""
    
🎉 SETUP COMPLETE! 🎉

📋 Next Steps:
{'='*50}

1. Activate your virtual environment:
   {activation_cmd}

2. Start the MCP server:
   python server_fastmcp.py

3. Run tests:
   pytest

4. Format code:
   black .

5. Check code quality:
   flake8 .

6. Type checking:
   mypy .

📁 Project Structure:
{'='*20}
- server_fastmcp.py     : Main MCP server
- src/                  : Source code
- tests/                : Test files
- docs/                 : Documentation
- requirements.txt      : Dependencies
- pyproject.toml        : Project configuration

🛠️  Development Commands:
{'='*25}
- pytest                : Run tests
- black .               : Format code
- flake8 .              : Lint code
- mypy .                : Type checking
- pre-commit run --all-files : Run all checks

📖 For more information, see README.md

Happy coding! 🚀
""")


def main():
    """Main setup function."""
    print("🚀 Business Intelligence MCP Server - Development Setup")
    print("=" * 60)
    
    # Check Python version
    if not check_python_version():
        sys.exit(1)
    
    # Set up virtual environment
    success, pip_path = setup_virtual_environment()
    if not success:
        sys.exit(1)
    
    # Install dependencies
    install_dependencies(pip_path)
    
    # Set up pre-commit
    setup_pre_commit()
    
    # Create directories
    create_required_directories()
    
    # Set up environment file
    setup_environment_file()
    
    # Run initial tests
    run_initial_tests(pip_path)
    
    # Display next steps
    display_next_steps()


if __name__ == "__main__":
    main()
