#!/usr/bin/env python3
"""
Test script for the Smart Development Environment MCP Server.
"""

import asyncio
import sys
import json
from pathlib import Path

# Add the src directory to the path
sys.path.insert(0, str(Path(__file__).parent / "src"))

# Import the prompt and tool functions directly for testing
from src.prompts.dev_setup import dev_setup_prompt
from src.prompts.code_review import code_review_prompt
from src.prompts.architecture_analysis import architecture_analysis_prompt
from src.tools.analyze_codebase import analyze_codebase_tool
from src.tools.run_tests import run_tests_tool


async def test_dev_setup():
    """Test the dev-setup prompt."""
    print("🧪 Testing dev-setup prompt...")
    print("=" * 50)
    
    # Test with test-data directory
    test_dir = Path(__file__).parent / "test-data"
    result = await dev_setup_prompt(str(test_dir))
    
    print(result)
    print("\n" + "=" * 50 + "\n")
    
    return "dev-setup" in result and "Smart Development Environment Activated" in result


async def test_code_review():
    """Test the code-review prompt."""
    print("🧪 Testing code-review prompt...")
    print("=" * 50)
    
    # Test with test-data directory
    test_dir = Path(__file__).parent / "test-data"
    result = await code_review_prompt(str(test_dir), "thorough")
    
    print(result)
    print("\n" + "=" * 50 + "\n")
    
    return "Code Review Complete" in result


async def test_architecture_analysis():
    """Test the architecture-analysis prompt."""
    print("🧪 Testing architecture-analysis prompt...")
    print("=" * 50)
    
    # Test with test-data directory
    test_dir = Path(__file__).parent / "test-data"
    result = await architecture_analysis_prompt(str(test_dir), "maintainability")
    
    print(result)
    print("\n" + "=" * 50 + "\n")
    
    return "Architecture Analysis" in result


async def test_analyze_codebase():
    """Test the analyze-codebase tool."""
    print("🧪 Testing analyze-codebase tool...")
    print("=" * 50)
    
    # Test with test-data directory
    test_dir = Path(__file__).parent / "test-data"
    result = await analyze_codebase_tool(str(test_dir), "full")
    
    print(json.dumps(result, indent=2))
    print("\n" + "=" * 50 + "\n")
    
    return "summary" in result and "files" in result


async def test_run_tests():
    """Test the run-tests tool."""
    print("🧪 Testing run-tests tool...")
    print("=" * 50)
    
    # Test with test-data directory
    test_dir = Path(__file__).parent / "test-data"
    result = await run_tests_tool(str(test_dir), "all", False)
    
    print(json.dumps(result, indent=2))
    print("\n" + "=" * 50 + "\n")
    
    return "framework" in result


async def run_all_tests():
    """Run all tests."""
    print("🚀 Starting Smart Development Environment MCP Server Tests")
    print("=" * 60)
    print()
    
    tests = [
        ("Dev Setup Prompt", test_dev_setup),
        ("Code Review Prompt", test_code_review),
        ("Architecture Analysis Prompt", test_architecture_analysis),
        ("Analyze Codebase Tool", test_analyze_codebase),
        ("Run Tests Tool", test_run_tests),
    ]
    
    results = []
    
    for test_name, test_func in tests:
        try:
            success = await test_func()
            results.append((test_name, success, None))
            print(f"✅ {test_name}: {'PASSED' if success else 'FAILED'}")
        except Exception as e:
            results.append((test_name, False, str(e)))
            print(f"❌ {test_name}: ERROR - {e}")
        
        print()
    
    # Summary
    print("=" * 60)
    print("📊 TEST SUMMARY")
    print("=" * 60)
    
    passed = sum(1 for _, success, _ in results if success)
    total = len(results)
    
    print(f"Tests passed: {passed}/{total}")
    print()
    
    for test_name, success, error in results:
        status = "✅ PASS" if success else f"❌ FAIL{f' ({error})' if error else ''}"
        print(f"{test_name:.<40} {status}")
    
    print()
    if passed == total:
        print("🎉 All tests passed! The MCP server is working correctly.")
    else:
        print(f"⚠️  {total - passed} test(s) failed. Check the output above for details.")
    
    print()
    print("🔧 Next steps:")
    print("• Configure your MCP client to use this server")
    print("• Try the workflows with a real project")
    print("• Test with Claude Code or another MCP client")


if __name__ == "__main__":
    asyncio.run(run_all_tests())
