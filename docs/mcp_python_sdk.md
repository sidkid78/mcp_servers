This file is a merged representation of the entire codebase, combined into a single document by Repomix.
The content has been processed where content has been compressed (code blocks are separated by ⋮---- delimiter), security check has been disabled.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Content has been compressed - code blocks are separated by ⋮---- delimiter
- Security check has been disabled - content may contain sensitive information
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.github/
  ISSUE_TEMPLATE/
    bug.yaml
    config.yaml
    feature-request.yaml
    question.yaml
  workflows/
    main-checks.yml
    publish-docs-manually.yml
    publish-pypi.yml
    pull-request-checks.yml
    shared.yml
docs/
  api.md
  index.md
examples/
  clients/
    simple-auth-client/
      mcp_simple_auth_client/
        __init__.py
        main.py
      pyproject.toml
      README.md
    simple-chatbot/
      mcp_simple_chatbot/
        .env.example
        main.py
        requirements.txt
        servers_config.json
      .python-version
      pyproject.toml
      README.MD
  fastmcp/
    complex_inputs.py
    desktop.py
    echo.py
    memory.py
    parameter_descriptions.py
    readme-quickstart.py
    screenshot.py
    simple_echo.py
    text_me.py
    unicode_example.py
    weather_structured.py
  servers/
    simple-auth/
      mcp_simple_auth/
        __init__.py
        __main__.py
        auth_server.py
        legacy_as_server.py
        server.py
        simple_auth_provider.py
        token_verifier.py
      pyproject.toml
      README.md
    simple-prompt/
      mcp_simple_prompt/
        __init__.py
        __main__.py
        server.py
      .python-version
      pyproject.toml
      README.md
    simple-resource/
      mcp_simple_resource/
        __init__.py
        __main__.py
        server.py
      .python-version
      pyproject.toml
      README.md
    simple-streamablehttp/
      mcp_simple_streamablehttp/
        __main__.py
        event_store.py
        server.py
      pyproject.toml
      README.md
    simple-streamablehttp-stateless/
      mcp_simple_streamablehttp_stateless/
        __main__.py
        server.py
      pyproject.toml
      README.md
    simple-tool/
      mcp_simple_tool/
        __init__.py
        __main__.py
        server.py
      .python-version
      pyproject.toml
      README.md
    structured_output_lowlevel.py
  README.md
src/
  mcp/
    cli/
      __init__.py
      claude.py
      cli.py
    client/
      stdio/
        __init__.py
        win32.py
      __main__.py
      auth.py
      session_group.py
      session.py
      sse.py
      streamable_http.py
      websocket.py
    server/
      auth/
        handlers/
          __init__.py
          authorize.py
          metadata.py
          register.py
          revoke.py
          token.py
        middleware/
          __init__.py
          auth_context.py
          bearer_auth.py
          client_auth.py
        __init__.py
        errors.py
        json_response.py
        provider.py
        routes.py
        settings.py
      fastmcp/
        prompts/
          __init__.py
          base.py
          manager.py
          prompt_manager.py
        resources/
          __init__.py
          base.py
          resource_manager.py
          templates.py
          types.py
        tools/
          __init__.py
          base.py
          tool_manager.py
        utilities/
          __init__.py
          func_metadata.py
          logging.py
          types.py
        __init__.py
        exceptions.py
        server.py
      lowlevel/
        __init__.py
        helper_types.py
        server.py
      __init__.py
      __main__.py
      elicitation.py
      models.py
      session.py
      sse.py
      stdio.py
      streamable_http_manager.py
      streamable_http.py
      streaming_asgi_transport.py
      transport_security.py
      websocket.py
    shared/
      _httpx_utils.py
      auth_utils.py
      auth.py
      context.py
      exceptions.py
      memory.py
      message.py
      metadata_utils.py
      progress.py
      session.py
      version.py
    __init__.py
    types.py
tests/
  client/
    conftest.py
    test_auth.py
    test_config.py
    test_list_methods_cursor.py
    test_list_roots_callback.py
    test_logging_callback.py
    test_output_schema_validation.py
    test_resource_cleanup.py
    test_sampling_callback.py
    test_session_group.py
    test_session.py
    test_stdio.py
  issues/
    test_100_tool_listing.py
    test_129_resource_templates.py
    test_141_resource_templates.py
    test_152_resource_mime_type.py
    test_176_progress_token.py
    test_188_concurrency.py
    test_192_request_id.py
    test_342_base64_encoding.py
    test_355_type_error.py
    test_88_random_error.py
    test_malformed_input.py
  server/
    auth/
      middleware/
        test_auth_context.py
        test_bearer_auth.py
      test_error_handling.py
    fastmcp/
      auth/
        __init__.py
        test_auth_integration.py
      prompts/
        test_base.py
        test_manager.py
      resources/
        test_file_resources.py
        test_function_resources.py
        test_resource_manager.py
        test_resource_template.py
        test_resources.py
      servers/
        test_file_server.py
      test_elicitation.py
      test_func_metadata.py
      test_integration.py
      test_parameter_descriptions.py
      test_server.py
      test_title.py
      test_tool_manager.py
    test_completion_with_context.py
    test_lifespan.py
    test_lowlevel_input_validation.py
    test_lowlevel_output_validation.py
    test_lowlevel_tool_annotations.py
    test_read_resource.py
    test_session.py
    test_sse_security.py
    test_stdio.py
    test_streamable_http_manager.py
    test_streamable_http_security.py
  shared/
    test_auth_utils.py
    test_httpx_utils.py
    test_memory.py
    test_progress_notifications.py
    test_session.py
    test_sse.py
    test_streamable_http.py
    test_ws.py
  conftest.py
  test_examples.py
  test_types.py
.git-blame-ignore-revs
.gitignore
.pre-commit-config.yaml
CLAUDE.md
CODE_OF_CONDUCT.md
CONTRIBUTING.md
LICENSE
mkdocs.yml
pyproject.toml
README.md
RELEASE.md
SECURITY.md
```

# Files

## File: .github/ISSUE_TEMPLATE/bug.yaml
````yaml
name: 🐛 MCP Python SDK Bug
description: Report a bug or unexpected behavior in the MCP Python SDK
labels: ["need confirmation"]

body:
  - type: markdown
    attributes:
      value: Thank you for contributing to the MCP Python SDK! ✊

  - type: checkboxes
    id: checks
    attributes:
      label: Initial Checks
      description: Just making sure you're using the latest version of MCP Python SDK.
      options:
        - label: I confirm that I'm using the latest version of MCP Python SDK
          required: true
        - label: I confirm that I searched for my issue in https://github.com/modelcontextprotocol/python-sdk/issues before opening this issue
          required: true

  - type: textarea
    id: description
    attributes:
      label: Description
      description: |
        Please explain what you're seeing and what you would expect to see.

        Please provide as much detail as possible to make understanding and solving your problem as quick as possible. 🙏
    validations:
      required: true

  - type: textarea
    id: example
    attributes:
      label: Example Code
      description: >
        If applicable, please add a self-contained,
        [minimal, reproducible, example](https://stackoverflow.com/help/minimal-reproducible-example)
        demonstrating the bug.

      placeholder: |
        from mcp.server.fastmcp import FastMCP

        ...
      render: Python

  - type: textarea
    id: version
    attributes:
      label: Python & MCP Python SDK
      description: |
        Which version of Python and MCP Python SDK are you using?
      render: Text
    validations:
      required: true
````

## File: .github/ISSUE_TEMPLATE/config.yaml
````yaml
blank_issues_enabled: true
````

## File: .github/ISSUE_TEMPLATE/feature-request.yaml
````yaml
name: 🚀 MCP Python SDK Feature Request
description: "Suggest a new feature for the MCP Python SDK"
labels: ["feature request"]

body:
  - type: markdown
    attributes:
      value: Thank you for contributing to the MCP Python SDK! ✊

  - type: textarea
    id: description
    attributes:
      label: Description
      description: |
        Please give as much detail as possible about the feature you would like to suggest. 🙏

        You might like to add:
        * A demo of how code might look when using the feature
        * Your use case(s) for the feature
        * Reference to other projects that have a similar feature
    validations:
      required: true

  - type: textarea
    id: references
    attributes:
      label: References
      description: |
        Please add any links or references that might help us understand your feature request better. 📚
````

## File: .github/ISSUE_TEMPLATE/question.yaml
````yaml
name: ❓ MCP Python SDK Question
description: "Ask a question about the MCP Python SDK"
labels: ["question"]

body:
  - type: markdown
    attributes:
      value: Thank you for reaching out to the MCP Python SDK community! We're here to help! 🤝

  - type: textarea
    id: question
    attributes:
      label: Question
      description: |
        Please provide as much detail as possible about your question. 🙏

        You might like to include:
        * Code snippets showing what you've tried
        * Error messages you're encountering (if any)
        * Expected vs actual behavior
        * Your use case and what you're trying to achieve
    validations:
      required: true

  - type: textarea
    id: context
    attributes:
      label: Additional Context
      description: |
        Please provide any additional context that might help us better understand your question, such as:
        * Your MCP Python SDK version
        * Your Python version
        * Relevant configuration or environment details 📝
````

## File: .github/workflows/main-checks.yml
````yaml
name: Main branch checks

on:
  push:
    branches:
      - main
      - "v*.*.*"
    tags:
      - "v*.*.*"

jobs:
  checks:
    uses: ./.github/workflows/shared.yml
````

## File: .github/workflows/publish-docs-manually.yml
````yaml
name: Publish Docs manually

on:
  workflow_dispatch:

jobs:
  docs-publish:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - name: Configure Git Credentials
        run: |
          git config user.name github-actions[bot]
          git config user.email 41898282+github-actions[bot]@users.noreply.github.com

      - name: Install uv
        uses: astral-sh/setup-uv@v3
        with:
          enable-cache: true
          version: 0.7.2

      - run: echo "cache_id=$(date --utc '+%V')" >> $GITHUB_ENV
      - uses: actions/cache@v4
        with:
          key: mkdocs-material-${{ env.cache_id }}
          path: .cache
          restore-keys: |
            mkdocs-material-

      - run: uv sync --frozen --group docs
      - run: uv run --frozen --no-sync mkdocs gh-deploy --force
````

## File: .github/workflows/publish-pypi.yml
````yaml
name: Publishing

on:
  release:
    types: [published]

jobs:
  release-build:
    name: Build distribution
    runs-on: ubuntu-latest
    needs: [checks]
    steps:
      - uses: actions/checkout@v4

      - name: Install uv
        uses: astral-sh/setup-uv@v3
        with:
          enable-cache: true
          version: 0.7.2

      - name: Set up Python 3.12
        run: uv python install 3.12

      - name: Build
        run: uv build

      - name: Upload artifacts
        uses: actions/upload-artifact@v4
        with:
          name: release-dists
          path: dist/

  checks:
    uses: ./.github/workflows/shared.yml

  pypi-publish:
    name: Upload release to PyPI
    runs-on: ubuntu-latest
    environment: release
    needs:
      - release-build
    permissions:
      id-token: write # IMPORTANT: this permission is mandatory for trusted publishing

    steps:
      - name: Retrieve release distributions
        uses: actions/download-artifact@v4
        with:
          name: release-dists
          path: dist/

      - name: Publish package distributions to PyPI
        uses: pypa/gh-action-pypi-publish@release/v1

  docs-publish:
    runs-on: ubuntu-latest
    needs: ["pypi-publish"]
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - name: Configure Git Credentials
        run: |
          git config user.name github-actions[bot]
          git config user.email 41898282+github-actions[bot]@users.noreply.github.com

      - name: Install uv
        uses: astral-sh/setup-uv@v3
        with:
          enable-cache: true
          version: 0.7.2

      - run: echo "cache_id=$(date --utc '+%V')" >> $GITHUB_ENV
      - uses: actions/cache@v4
        with:
          key: mkdocs-material-${{ env.cache_id }}
          path: .cache
          restore-keys: |
            mkdocs-material-

      - run: uv sync --frozen --group docs
      - run: uv run --frozen --no-sync mkdocs gh-deploy --force
````

## File: .github/workflows/pull-request-checks.yml
````yaml
name: Pull request checks

on:
  pull_request:

jobs:
  checks:
    uses: ./.github/workflows/shared.yml
````

## File: .github/workflows/shared.yml
````yaml
name: Shared Checks

on:
  workflow_call:

jobs:
  pre-commit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: astral-sh/setup-uv@v5
        with:
          enable-cache: true
          version: 0.7.2

      - name: Install dependencies
        run: uv sync --frozen --all-extras --python 3.10

      - uses: pre-commit/action@v3.0.0
        with:
          extra_args: --all-files --verbose
        env:
          SKIP: no-commit-to-branch

  test:
    runs-on: ${{ matrix.os }}
    timeout-minutes: 10
    strategy:
      matrix:
        python-version: ["3.10", "3.11", "3.12", "3.13"]
        os: [ubuntu-latest, windows-latest]

    steps:
      - uses: actions/checkout@v4

      - name: Install uv
        uses: astral-sh/setup-uv@v3
        with:
          enable-cache: true
          version: 0.7.2

      - name: Install the project
        run: uv sync --frozen --all-extras --python ${{ matrix.python-version }}

      - name: Run pytest
        run: uv run --frozen --no-sync pytest
    continue-on-error: true
````

## File: docs/api.md
````markdown
::: mcp
````

## File: docs/index.md
````markdown
# MCP Server

This is the MCP Server implementation in Python.

It only contains the [API Reference](api.md) for the time being.
````

## File: examples/clients/simple-auth-client/mcp_simple_auth_client/__init__.py
````python
"""Simple OAuth client for MCP simple-auth server."""
````

## File: examples/clients/simple-auth-client/mcp_simple_auth_client/main.py
````python
#!/usr/bin/env python3
"""
Simple MCP client example with OAuth authentication support.

This client connects to an MCP server using streamable HTTP transport with OAuth.

"""
⋮----
class InMemoryTokenStorage(TokenStorage)
⋮----
"""Simple in-memory token storage implementation."""
⋮----
def __init__(self)
⋮----
async def get_tokens(self) -> OAuthToken | None
⋮----
async def set_tokens(self, tokens: OAuthToken) -> None
⋮----
async def get_client_info(self) -> OAuthClientInformationFull | None
⋮----
async def set_client_info(self, client_info: OAuthClientInformationFull) -> None
⋮----
class CallbackHandler(BaseHTTPRequestHandler)
⋮----
"""Simple HTTP handler to capture OAuth callback."""
⋮----
def __init__(self, request, client_address, server, callback_data)
⋮----
"""Initialize with callback data storage."""
⋮----
def do_GET(self)
⋮----
"""Handle GET request from OAuth redirect."""
parsed = urlparse(self.path)
query_params = parse_qs(parsed.query)
⋮----
def log_message(self, format, *args)
⋮----
"""Suppress default logging."""
⋮----
class CallbackServer
⋮----
"""Simple server to handle OAuth callbacks."""
⋮----
def __init__(self, port=3000)
⋮----
def _create_handler_with_data(self)
⋮----
"""Create a handler class with access to callback data."""
callback_data = self.callback_data
⋮----
class DataCallbackHandler(CallbackHandler)
⋮----
def __init__(self, request, client_address, server)
⋮----
def start(self)
⋮----
"""Start the callback server in a background thread."""
handler_class = self._create_handler_with_data()
⋮----
def stop(self)
⋮----
"""Stop the callback server."""
⋮----
def wait_for_callback(self, timeout=300)
⋮----
"""Wait for OAuth callback with timeout."""
start_time = time.time()
⋮----
def get_state(self)
⋮----
"""Get the received state parameter."""
⋮----
class SimpleAuthClient
⋮----
"""Simple MCP client with auth support."""
⋮----
def __init__(self, server_url: str, transport_type: str = "streamable_http")
⋮----
async def connect(self)
⋮----
"""Connect to the MCP server."""
⋮----
callback_server = CallbackServer(port=3030)
⋮----
async def callback_handler() -> tuple[str, str | None]
⋮----
"""Wait for OAuth callback and return auth code and state."""
⋮----
auth_code = callback_server.wait_for_callback(timeout=300)
⋮----
client_metadata_dict = {
⋮----
async def _default_redirect_handler(authorization_url: str) -> None
⋮----
"""Default redirect handler that opens the URL in a browser."""
⋮----
# Create OAuth authentication handler using the new interface
oauth_auth = OAuthClientProvider(
⋮----
# Create transport with auth handler based on transport type
⋮----
async def _run_session(self, read_stream, write_stream, get_session_id)
⋮----
"""Run the MCP session with the given streams."""
⋮----
session_id = get_session_id()
⋮----
# Run interactive loop
⋮----
async def list_tools(self)
⋮----
"""List available tools from the server."""
⋮----
result = await self.session.list_tools()
⋮----
async def call_tool(self, tool_name: str, arguments: dict[str, Any] | None = None)
⋮----
"""Call a specific tool."""
⋮----
result = await self.session.call_tool(tool_name, arguments or {})
⋮----
async def interactive_loop(self)
⋮----
"""Run interactive command loop."""
⋮----
command = input("mcp> ").strip()
⋮----
parts = command.split(maxsplit=2)
tool_name = parts[1] if len(parts) > 1 else ""
⋮----
# Parse arguments (simple JSON-like format)
arguments = {}
⋮----
arguments = json.loads(parts[2])
⋮----
async def main()
⋮----
"""Main entry point."""
# Default server URL - can be overridden with environment variable
# Most MCP streamable HTTP servers use /mcp as the endpoint
server_url = os.getenv("MCP_SERVER_PORT", 8000)
transport_type = os.getenv("MCP_TRANSPORT_TYPE", "streamable_http")
server_url = (
⋮----
# Start connection flow - OAuth will be handled automatically
client = SimpleAuthClient(server_url, transport_type)
⋮----
def cli()
⋮----
"""CLI entry point for uv script."""
````

## File: examples/clients/simple-auth-client/pyproject.toml
````toml
[project]
name = "mcp-simple-auth-client"
version = "0.1.0"
description = "A simple OAuth client for the MCP simple-auth server"
readme = "README.md"
requires-python = ">=3.10"
authors = [{ name = "Anthropic" }]
keywords = ["mcp", "oauth", "client", "auth"]
license = { text = "MIT" }
classifiers = [
    "Development Status :: 4 - Beta",
    "Intended Audience :: Developers",
    "License :: OSI Approved :: MIT License",
    "Programming Language :: Python :: 3",
    "Programming Language :: Python :: 3.10",
]
dependencies = [
    "click>=8.0.0",
    "mcp>=1.0.0",
]

[project.scripts]
mcp-simple-auth-client = "mcp_simple_auth_client.main:cli"

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[tool.hatch.build.targets.wheel]
packages = ["mcp_simple_auth_client"]

[tool.pyright]
include = ["mcp_simple_auth_client"]
venvPath = "."
venv = ".venv"

[tool.ruff.lint]
select = ["E", "F", "I"]
ignore = []

[tool.ruff]
line-length = 88
target-version = "py310"

[tool.uv]
dev-dependencies = ["pyright>=1.1.379", "pytest>=8.3.3", "ruff>=0.6.9"]

[tool.uv.sources]
mcp = { path = "../../../" }

[[tool.uv.index]]
url = "https://pypi.org/simple"
````

## File: examples/clients/simple-auth-client/README.md
````markdown
# Simple Auth Client Example

A demonstration of how to use the MCP Python SDK with OAuth authentication over streamable HTTP or SSE transport.

## Features

- OAuth 2.0 authentication with PKCE
- Support for both StreamableHTTP and SSE transports
- Interactive command-line interface

## Installation

```bash
cd examples/clients/simple-auth-client
uv sync --reinstall 
```

## Usage

### 1. Start an MCP server with OAuth support

```bash
# Example with mcp-simple-auth
cd path/to/mcp-simple-auth
uv run mcp-simple-auth --transport streamable-http --port 3001
```

### 2. Run the client

```bash
uv run mcp-simple-auth-client

# Or with custom server URL
MCP_SERVER_PORT=3001 uv run mcp-simple-auth-client

# Use SSE transport
MCP_TRANSPORT_TYPE=sse uv run mcp-simple-auth-client
```

### 3. Complete OAuth flow

The client will open your browser for authentication. After completing OAuth, you can use commands:

- `list` - List available tools
- `call <tool_name> [args]` - Call a tool with optional JSON arguments  
- `quit` - Exit

## Example

```
🔐 Simple MCP Auth Client
Connecting to: http://localhost:3001

Please visit the following URL to authorize the application:
http://localhost:3001/authorize?response_type=code&client_id=...

✅ Connected to MCP server at http://localhost:3001

mcp> list
📋 Available tools:
1. echo - Echo back the input text

mcp> call echo {"text": "Hello, world!"}
🔧 Tool 'echo' result:
Hello, world!

mcp> quit
👋 Goodbye!
```

## Configuration

- `MCP_SERVER_PORT` - Server URL (default: 8000)
- `MCP_TRANSPORT_TYPE` - Transport type: `streamable_http` (default) or `sse`
````

## File: examples/clients/simple-chatbot/mcp_simple_chatbot/.env.example
````
LLM_API_KEY=gsk_1234567890
````

## File: examples/clients/simple-chatbot/mcp_simple_chatbot/main.py
````python
# Configure logging
⋮----
class Configuration
⋮----
"""Manages configuration and environment variables for the MCP client."""
⋮----
def __init__(self) -> None
⋮----
"""Initialize configuration with environment variables."""
⋮----
@staticmethod
    def load_env() -> None
⋮----
"""Load environment variables from .env file."""
⋮----
@staticmethod
    def load_config(file_path: str) -> dict[str, Any]
⋮----
"""Load server configuration from JSON file.

        Args:
            file_path: Path to the JSON configuration file.

        Returns:
            Dict containing server configuration.

        Raises:
            FileNotFoundError: If configuration file doesn't exist.
            JSONDecodeError: If configuration file is invalid JSON.
        """
⋮----
@property
    def llm_api_key(self) -> str
⋮----
"""Get the LLM API key.

        Returns:
            The API key as a string.

        Raises:
            ValueError: If the API key is not found in environment variables.
        """
⋮----
class Server
⋮----
"""Manages MCP server connections and tool execution."""
⋮----
def __init__(self, name: str, config: dict[str, Any]) -> None
⋮----
async def initialize(self) -> None
⋮----
"""Initialize the server connection."""
command = (
⋮----
server_params = StdioServerParameters(
⋮----
stdio_transport = await self.exit_stack.enter_async_context(
⋮----
session = await self.exit_stack.enter_async_context(
⋮----
async def list_tools(self) -> list[Any]
⋮----
"""List available tools from the server.

        Returns:
            A list of available tools.

        Raises:
            RuntimeError: If the server is not initialized.
        """
⋮----
tools_response = await self.session.list_tools()
tools = []
⋮----
"""Execute a tool with retry mechanism.

        Args:
            tool_name: Name of the tool to execute.
            arguments: Tool arguments.
            retries: Number of retry attempts.
            delay: Delay between retries in seconds.

        Returns:
            Tool execution result.

        Raises:
            RuntimeError: If server is not initialized.
            Exception: If tool execution fails after all retries.
        """
⋮----
attempt = 0
⋮----
result = await self.session.call_tool(tool_name, arguments)
⋮----
async def cleanup(self) -> None
⋮----
"""Clean up server resources."""
⋮----
class Tool
⋮----
"""Represents a tool with its properties and formatting."""
⋮----
def format_for_llm(self) -> str
⋮----
"""Format tool information for LLM.

        Returns:
            A formatted string describing the tool.
        """
args_desc = []
⋮----
arg_desc = (
⋮----
# Build the formatted output with title as a separate field
output = f"Tool: {self.name}\n"
⋮----
# Add human-readable title if available
⋮----
class LLMClient
⋮----
"""Manages communication with the LLM provider."""
⋮----
def __init__(self, api_key: str) -> None
⋮----
def get_response(self, messages: list[dict[str, str]]) -> str
⋮----
"""Get a response from the LLM.

        Args:
            messages: A list of message dictionaries.

        Returns:
            The LLM's response as a string.

        Raises:
            httpx.RequestError: If the request to the LLM fails.
        """
url = "https://api.groq.com/openai/v1/chat/completions"
⋮----
headers = {
payload = {
⋮----
response = client.post(url, headers=headers, json=payload)
⋮----
data = response.json()
⋮----
error_message = f"Error getting LLM response: {str(e)}"
⋮----
status_code = e.response.status_code
⋮----
class ChatSession
⋮----
"""Orchestrates the interaction between user, LLM, and tools."""
⋮----
def __init__(self, servers: list[Server], llm_client: LLMClient) -> None
⋮----
async def cleanup_servers(self) -> None
⋮----
"""Clean up all servers properly."""
⋮----
async def process_llm_response(self, llm_response: str) -> str
⋮----
"""Process the LLM response and execute tools if needed.

        Args:
            llm_response: The response from the LLM.

        Returns:
            The result of tool execution or the original response.
        """
⋮----
tool_call = json.loads(llm_response)
⋮----
tools = await server.list_tools()
⋮----
result = await server.execute_tool(
⋮----
progress = result["progress"]
total = result["total"]
percentage = (progress / total) * 100
⋮----
error_msg = f"Error executing tool: {str(e)}"
⋮----
async def start(self) -> None
⋮----
"""Main chat session handler."""
⋮----
all_tools = []
⋮----
tools_description = "\n".join([tool.format_for_llm() for tool in all_tools])
⋮----
system_message = (
⋮----
messages = [{"role": "system", "content": system_message}]
⋮----
user_input = input("You: ").strip().lower()
⋮----
llm_response = self.llm_client.get_response(messages)
⋮----
result = await self.process_llm_response(llm_response)
⋮----
final_response = self.llm_client.get_response(messages)
⋮----
async def main() -> None
⋮----
"""Initialize and run the chat session."""
config = Configuration()
server_config = config.load_config("servers_config.json")
servers = [
llm_client = LLMClient(config.llm_api_key)
chat_session = ChatSession(servers, llm_client)
````

## File: examples/clients/simple-chatbot/mcp_simple_chatbot/requirements.txt
````
python-dotenv>=1.0.0
requests>=2.31.0
mcp>=1.0.0
uvicorn>=0.32.1
````

## File: examples/clients/simple-chatbot/mcp_simple_chatbot/servers_config.json
````json
{
  "mcpServers": {
    "sqlite": {
      "command": "uvx",
      "args": ["mcp-server-sqlite", "--db-path", "./test.db"]
    },
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
````

## File: examples/clients/simple-chatbot/.python-version
````
3.10
````

## File: examples/clients/simple-chatbot/pyproject.toml
````toml
[project]
name = "mcp-simple-chatbot"
version = "0.1.0"
description = "A simple CLI chatbot using the Model Context Protocol (MCP)"
readme = "README.md"
requires-python = ">=3.10"
authors = [{ name = "Edoardo Cilia" }]
keywords = ["mcp", "llm", "chatbot", "cli"]
license = { text = "MIT" }
classifiers = [
    "Development Status :: 4 - Beta",
    "Intended Audience :: Developers",
    "License :: OSI Approved :: MIT License",
    "Programming Language :: Python :: 3",
    "Programming Language :: Python :: 3.10",
]
dependencies = [
    "python-dotenv>=1.0.0",
    "requests>=2.31.0",
    "mcp>=1.0.0",
    "uvicorn>=0.32.1"
]

[project.scripts]
mcp-simple-chatbot = "mcp_simple_chatbot.client:main"

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[tool.hatch.build.targets.wheel]
packages = ["mcp_simple_chatbot"]

[tool.pyright]
include = ["mcp_simple_chatbot"]
venvPath = "."
venv = ".venv"

[tool.ruff.lint]
select = ["E", "F", "I"]
ignore = []

[tool.ruff]
line-length = 88
target-version = "py310"

[tool.uv]
dev-dependencies = ["pyright>=1.1.379", "pytest>=8.3.3", "ruff>=0.6.9"]
````

## File: examples/clients/simple-chatbot/README.MD
````markdown
# MCP Simple Chatbot

This example demonstrates how to integrate the Model Context Protocol (MCP) into a simple CLI chatbot. The implementation showcases MCP's flexibility by supporting multiple tools through MCP servers and is compatible with any LLM provider that follows OpenAI API standards.

## Requirements

- Python 3.10
- `python-dotenv`
- `requests`
- `mcp`
- `uvicorn`

## Installation

1. **Install the dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

2. **Set up environment variables:**

   Create a `.env` file in the root directory and add your API key:

   ```plaintext
   LLM_API_KEY=your_api_key_here
   ```
   **Note:** The current implementation is configured to use the Groq API endpoint (`https://api.groq.com/openai/v1/chat/completions`) with the `llama-3.2-90b-vision-preview` model. If you plan to use a different LLM provider, you'll need to modify the `LLMClient` class in `main.py` to use the appropriate endpoint URL and model parameters.

3. **Configure servers:**

   The `servers_config.json` follows the same structure as Claude Desktop, allowing for easy integration of multiple servers. 
   Here's an example:

   ```json
   {
     "mcpServers": {
       "sqlite": {
         "command": "uvx",
         "args": ["mcp-server-sqlite", "--db-path", "./test.db"]
       },
       "puppeteer": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
       }
     }
   }
   ```
   Environment variables are supported as well. Pass them as you would with the Claude Desktop App.

   Example:
   ```json
   {
     "mcpServers": {
       "server_name": {
         "command": "uvx",
         "args": ["mcp-server-name", "--additional-args"],
         "env": {
           "API_KEY": "your_api_key_here"
         }
       }
     }
   }
   ```

## Usage

1. **Run the client:**

   ```bash
   python main.py
   ```

2. **Interact with the assistant:**
   
   The assistant will automatically detect available tools and can respond to queries based on the tools provided by the configured servers.

3. **Exit the session:**

   Type `quit` or `exit` to end the session.

## Architecture

- **Tool Discovery**: Tools are automatically discovered from configured servers.
- **System Prompt**: Tools are dynamically included in the system prompt, allowing the LLM to understand available capabilities.
- **Server Integration**: Supports any MCP-compatible server, tested with various server implementations including Uvicorn and Node.js.

### Class Structure
- **Configuration**: Manages environment variables and server configurations
- **Server**: Handles MCP server initialization, tool discovery, and execution
- **Tool**: Represents individual tools with their properties and formatting
- **LLMClient**: Manages communication with the LLM provider
- **ChatSession**: Orchestrates the interaction between user, LLM, and tools

### Logic Flow

1. **Tool Integration**:
   - Tools are dynamically discovered from MCP servers
   - Tool descriptions are automatically included in system prompt
   - Tool execution is handled through standardized MCP protocol

2. **Runtime Flow**:
   - User input is received
   - Input is sent to LLM with context of available tools
   - LLM response is parsed:
     - If it's a tool call → execute tool and return result
     - If it's a direct response → return to user
   - Tool results are sent back to LLM for interpretation
   - Final response is presented to user
````

## File: examples/fastmcp/complex_inputs.py
````python
"""
FastMCP Complex inputs Example

Demonstrates validation via pydantic with complex models.
"""
⋮----
mcp = FastMCP("Shrimp Tank")
⋮----
class ShrimpTank(BaseModel)
⋮----
class Shrimp(BaseModel)
⋮----
name: Annotated[str, Field(max_length=10)]
⋮----
shrimp: list[Shrimp]
⋮----
# You can use pydantic Field in function signatures for validation.
⋮----
"""List all shrimp names in the tank"""
````

## File: examples/fastmcp/desktop.py
````python
"""
FastMCP Desktop Example

A simple example that exposes the desktop directory as a resource.
"""
⋮----
# Create server
mcp = FastMCP("Demo")
⋮----
@mcp.resource("dir://desktop")
def desktop() -> list[str]
⋮----
"""List the files in the user's desktop"""
desktop = Path.home() / "Desktop"
⋮----
@mcp.tool()
def add(a: int, b: int) -> int
⋮----
"""Add two numbers"""
````

## File: examples/fastmcp/echo.py
````python
"""
FastMCP Echo Server
"""
⋮----
# Create server
mcp = FastMCP("Echo Server")
⋮----
@mcp.tool()
def echo_tool(text: str) -> str
⋮----
"""Echo the input text"""
⋮----
@mcp.resource("echo://static")
def echo_resource() -> str
⋮----
@mcp.resource("echo://{text}")
def echo_template(text: str) -> str
⋮----
@mcp.prompt("echo")
def echo_prompt(text: str) -> str
````

## File: examples/fastmcp/memory.py
````python
# /// script
# dependencies = ["pydantic-ai-slim[openai]", "asyncpg", "numpy", "pgvector"]
# ///
⋮----
# uv pip install 'pydantic-ai-slim[openai]' asyncpg numpy pgvector
⋮----
"""
Recursive memory system inspired by the human brain's clustering of memories.
Uses OpenAI's 'text-embedding-3-small' model and pgvector for efficient
similarity search.
"""
⋮----
from pgvector.asyncpg import register_vector  # Import register_vector
⋮----
MAX_DEPTH = 5
SIMILARITY_THRESHOLD = 0.7
DECAY_FACTOR = 0.99
REINFORCEMENT_FACTOR = 1.1
⋮----
DEFAULT_LLM_MODEL = "openai:gpt-4o"
DEFAULT_EMBEDDING_MODEL = "text-embedding-3-small"
⋮----
mcp = FastMCP(
⋮----
DB_DSN = "postgresql://postgres:postgres@localhost:54320/memory_db"
# reset memory with rm ~/.fastmcp/{USER}/memory/*
PROFILE_DIR = (Path.home() / ".fastmcp" / os.environ.get("USER", "anon") / "memory").resolve()
⋮----
def cosine_similarity(a: list[float], b: list[float]) -> float
⋮----
a_array = np.array(a, dtype=np.float64)
b_array = np.array(b, dtype=np.float64)
⋮----
agent = Agent(
result = await agent.run(user_prompt, deps=deps)
⋮----
@dataclass
class Deps
⋮----
openai: AsyncOpenAI
pool: asyncpg.Pool
⋮----
async def get_db_pool() -> asyncpg.Pool
⋮----
async def init(conn)
⋮----
pool = await asyncpg.create_pool(DB_DSN, init=init)
⋮----
class MemoryNode(BaseModel)
⋮----
id: int | None = None
content: str
summary: str = ""
importance: float = 1.0
access_count: int = 0
timestamp: float = Field(default_factory=lambda: datetime.now(timezone.utc).timestamp())
embedding: list[float]
⋮----
@classmethod
    async def from_content(cls, content: str, deps: Deps)
⋮----
embedding = await get_embedding(content, deps)
⋮----
async def save(self, deps: Deps)
⋮----
result = await conn.fetchrow(
⋮----
async def merge_with(self, other: Self, deps: Deps)
⋮----
# Delete the merged node from the database
⋮----
def get_effective_importance(self)
⋮----
async def get_embedding(text: str, deps: Deps) -> list[float]
⋮----
embedding_response = await deps.openai.embeddings.create(
⋮----
async def delete_memory(memory_id: int, deps: Deps)
⋮----
async def add_memory(content: str, deps: Deps)
⋮----
new_memory = await MemoryNode.from_content(content, deps)
⋮----
similar_memories = await find_similar_memories(new_memory.embedding, deps)
⋮----
async def find_similar_memories(embedding: list[float], deps: Deps) -> list[MemoryNode]
⋮----
rows = await conn.fetch(
memories = [
⋮----
async def update_importance(user_embedding: list[float], deps: Deps)
⋮----
rows = await conn.fetch("SELECT id, importance, access_count, embedding FROM memories")
⋮----
memory_embedding = row["embedding"]
similarity = cosine_similarity(user_embedding, memory_embedding)
⋮----
new_importance = row["importance"] * REINFORCEMENT_FACTOR
new_access_count = row["access_count"] + 1
⋮----
new_importance = row["importance"] * DECAY_FACTOR
new_access_count = row["access_count"]
⋮----
async def prune_memories(deps: Deps)
⋮----
async def display_memory_tree(deps: Deps) -> str
⋮----
result = ""
⋮----
effective_importance = row["importance"] * (1 + math.log(row["access_count"] + 1))
summary = row["summary"] or row["content"]
⋮----
deps = Deps(openai=AsyncOpenAI(), pool=await get_db_pool())
⋮----
@mcp.tool()
async def read_profile() -> str
⋮----
profile = await display_memory_tree(deps)
⋮----
async def initialize_database()
⋮----
pool = await asyncpg.create_pool("postgresql://postgres:postgres@localhost:54320/postgres")
⋮----
pool = await asyncpg.create_pool(DB_DSN)
````

## File: examples/fastmcp/parameter_descriptions.py
````python
"""
FastMCP Example showing parameter descriptions
"""
⋮----
# Create server
mcp = FastMCP("Parameter Descriptions Server")
⋮----
"""Greet a user with optional title and repetition"""
greeting = f"Hello {title + ' ' if title else ''}{name}!"
````

## File: examples/fastmcp/readme-quickstart.py
````python
# Create an MCP server
mcp = FastMCP("Demo")
⋮----
# Add an addition tool
⋮----
@mcp.tool()
def add(a: int, b: int) -> int
⋮----
"""Add two numbers"""
⋮----
# Add a dynamic greeting resource
⋮----
@mcp.resource("greeting://{name}")
def get_greeting(name: str) -> str
⋮----
"""Get a personalized greeting"""
````

## File: examples/fastmcp/screenshot.py
````python
"""
FastMCP Screenshot Example

Give Claude a tool to capture and view screenshots.
"""
⋮----
# Create server
mcp = FastMCP("Screenshot Demo", dependencies=["pyautogui", "Pillow"])
⋮----
@mcp.tool()
def take_screenshot() -> Image
⋮----
"""
    Take a screenshot of the user's screen and return it as an image. Use
    this tool anytime the user wants you to look at something they're doing.
    """
⋮----
buffer = io.BytesIO()
⋮----
# if the file exceeds ~1MB, it will be rejected by Claude
screenshot = pyautogui.screenshot()
````

## File: examples/fastmcp/simple_echo.py
````python
"""
FastMCP Echo Server
"""
⋮----
# Create server
mcp = FastMCP("Echo Server")
⋮----
@mcp.tool()
def echo(text: str) -> str
⋮----
"""Echo the input text"""
````

## File: examples/fastmcp/text_me.py
````python
# /// script
# dependencies = []
# ///
⋮----
"""
FastMCP Text Me Server
--------------------------------
This defines a simple FastMCP server that sends a text message to a phone number via https://surgemsg.com/.

To run this example, create a `.env` file with the following values:

SURGE_API_KEY=...
SURGE_ACCOUNT_ID=...
SURGE_MY_PHONE_NUMBER=...
SURGE_MY_FIRST_NAME=...
SURGE_MY_LAST_NAME=...

Visit https://surgemsg.com/ and click "Get Started" to obtain these values.
"""
⋮----
class SurgeSettings(BaseSettings)
⋮----
model_config: SettingsConfigDict = SettingsConfigDict(env_prefix="SURGE_", env_file=".env")
⋮----
api_key: str
account_id: str
my_phone_number: Annotated[str, BeforeValidator(lambda v: "+" + v if not v.startswith("+") else v)]
my_first_name: str
my_last_name: str
⋮----
# Create server
mcp = FastMCP("Text me")
surge_settings = SurgeSettings()  # type: ignore
⋮----
@mcp.tool(name="textme", description="Send a text message to me")
def text_me(text_content: str) -> str
⋮----
"""Send a text message to a phone number via https://surgemsg.com/"""
⋮----
response = client.post(
````

## File: examples/fastmcp/unicode_example.py
````python
"""
Example FastMCP server that uses Unicode characters in various places to help test
Unicode handling in tools and inspectors.
"""
⋮----
mcp = FastMCP()
⋮----
@mcp.tool(description="🌟 A tool that uses various Unicode characters in its description: " "á é í ó ú ñ 漢字 🎉")
def hello_unicode(name: str = "世界", greeting: str = "¡Hola") -> str
⋮----
"""
    A simple tool that demonstrates Unicode handling in:
    - Tool description (emojis, accents, CJK characters)
    - Parameter defaults (CJK characters)
    - Return values (Spanish punctuation, emojis)
    """
⋮----
@mcp.tool(description="🎨 Tool that returns a list of emoji categories")
def list_emoji_categories() -> list[str]
⋮----
"""Returns a list of emoji categories with emoji examples."""
⋮----
@mcp.tool(description="🔤 Tool that returns text in different scripts")
def multilingual_hello() -> str
⋮----
"""Returns hello in different scripts and writing systems."""
````

## File: examples/fastmcp/weather_structured.py
````python
"""
FastMCP Weather Example with Structured Output

Demonstrates how to use structured output with tools to return
well-typed, validated data that clients can easily process.
"""
⋮----
# Create server
mcp = FastMCP("Weather Service")
⋮----
# Example 1: Using a Pydantic model for structured output
class WeatherData(BaseModel)
⋮----
"""Structured weather data response"""
⋮----
temperature: float = Field(description="Temperature in Celsius")
humidity: float = Field(description="Humidity percentage (0-100)")
condition: str = Field(description="Weather condition (sunny, cloudy, rainy, etc.)")
wind_speed: float = Field(description="Wind speed in km/h")
location: str = Field(description="Location name")
timestamp: datetime = Field(default_factory=datetime.now, description="Observation time")
⋮----
@mcp.tool()
def get_weather(city: str) -> WeatherData
⋮----
"""Get current weather for a city with full structured data"""
# In a real implementation, this would fetch from a weather API
⋮----
# Example 2: Using TypedDict for a simpler structure
class WeatherSummary(TypedDict)
⋮----
"""Simple weather summary"""
⋮----
city: str
temp_c: float
description: str
⋮----
@mcp.tool()
def get_weather_summary(city: str) -> WeatherSummary
⋮----
"""Get a brief weather summary for a city"""
⋮----
# Example 3: Using dict[str, Any] for flexible schemas
⋮----
@mcp.tool()
def get_weather_metrics(cities: list[str]) -> dict[str, dict[str, float]]
⋮----
"""Get weather metrics for multiple cities

    Returns a dictionary mapping city names to their metrics
    """
# Returns nested dictionaries with weather metrics
⋮----
# Example 4: Using dataclass for weather alerts
⋮----
@dataclass
class WeatherAlert
⋮----
"""Weather alert information"""
⋮----
severity: str  # "low", "medium", "high"
title: str
⋮----
affected_areas: list[str]
valid_until: datetime
⋮----
@mcp.tool()
def get_weather_alerts(region: str) -> list[WeatherAlert]
⋮----
"""Get active weather alerts for a region"""
# In production, this would fetch real alerts
⋮----
# Example 5: Returning primitives with structured output
⋮----
@mcp.tool()
def get_temperature(city: str, unit: str = "celsius") -> float
⋮----
"""Get just the temperature for a city

    When returning primitives as structured output,
    the result is wrapped in {"result": value}
    """
base_temp = 22.5
⋮----
# Example 6: Weather statistics with nested models
class DailyStats(BaseModel)
⋮----
"""Statistics for a single day"""
⋮----
high: float
low: float
mean: float
⋮----
class WeatherStats(BaseModel)
⋮----
"""Weather statistics over a period"""
⋮----
location: str
period_days: int
temperature: DailyStats
humidity: DailyStats
precipitation_mm: float = Field(description="Total precipitation in millimeters")
⋮----
@mcp.tool()
def get_weather_stats(city: str, days: int = 7) -> WeatherStats
⋮----
"""Get weather statistics for the past N days"""
⋮----
async def test() -> None
⋮----
"""Test the tools by calling them through the server as a client would"""
⋮----
# Test get_weather
result = await client.call_tool("get_weather", {"city": "London"})
⋮----
# Test get_weather_summary
result = await client.call_tool("get_weather_summary", {"city": "Paris"})
⋮----
# Test get_weather_metrics
result = await client.call_tool("get_weather_metrics", {"cities": ["Tokyo", "Sydney", "Mumbai"]})
⋮----
# Test get_weather_alerts
result = await client.call_tool("get_weather_alerts", {"region": "California"})
⋮----
# Test get_temperature
result = await client.call_tool("get_temperature", {"city": "Berlin", "unit": "fahrenheit"})
⋮----
# Test get_weather_stats
result = await client.call_tool("get_weather_stats", {"city": "Seattle", "days": 30})
⋮----
# Also show the text content for comparison
⋮----
async def print_schemas() -> None
⋮----
"""Print all tool schemas"""
⋮----
tools = await mcp.list_tools()
⋮----
# Check command line arguments
````

## File: examples/servers/simple-auth/mcp_simple_auth/__init__.py
````python
"""Simple MCP server with GitHub OAuth authentication."""
````

## File: examples/servers/simple-auth/mcp_simple_auth/__main__.py
````python
"""Main entry point for simple MCP server with GitHub OAuth authentication."""
⋮----
sys.exit(main())  # type: ignore[call-arg]
````

## File: examples/servers/simple-auth/mcp_simple_auth/auth_server.py
````python
"""
Authorization Server for MCP Split Demo.

This server handles OAuth flows, client registration, and token issuance.
Can be replaced with enterprise authorization servers like Auth0, Entra ID, etc.

NOTE: this is a simplified example for demonstration purposes.
This is not a production-ready implementation.

"""
⋮----
logger = logging.getLogger(__name__)
⋮----
class AuthServerSettings(BaseModel)
⋮----
"""Settings for the Authorization Server."""
⋮----
# Server settings
host: str = "localhost"
port: int = 9000
server_url: AnyHttpUrl = AnyHttpUrl("http://localhost:9000")
auth_callback_path: str = "http://localhost:9000/login/callback"
⋮----
class SimpleAuthProvider(SimpleOAuthProvider)
⋮----
"""
    Authorization Server provider with simple demo authentication.

    This provider:
    1. Issues MCP tokens after simple credential authentication
    2. Stores token state for introspection by Resource Servers
    """
⋮----
def __init__(self, auth_settings: SimpleAuthSettings, auth_callback_path: str, server_url: str)
⋮----
def create_authorization_server(server_settings: AuthServerSettings, auth_settings: SimpleAuthSettings) -> Starlette
⋮----
"""Create the Authorization Server application."""
oauth_provider = SimpleAuthProvider(
⋮----
mcp_auth_settings = AuthSettings(
⋮----
# Create OAuth routes
routes = create_auth_routes(
⋮----
# Add login page route (GET)
async def login_page_handler(request: Request) -> Response
⋮----
"""Show login form."""
state = request.query_params.get("state")
⋮----
# Add login callback route (POST)
async def login_callback_handler(request: Request) -> Response
⋮----
"""Handle simple authentication callback."""
⋮----
# Add token introspection endpoint (RFC 7662) for Resource Servers
async def introspect_handler(request: Request) -> Response
⋮----
"""
        Token introspection endpoint for Resource Servers.

        Resource Servers call this endpoint to validate tokens without
        needing direct access to token storage.
        """
form = await request.form()
token = form.get("token")
⋮----
# Look up token in provider
access_token = await oauth_provider.load_access_token(token)
⋮----
"aud": access_token.resource,  # RFC 8707 audience claim
⋮----
async def run_server(server_settings: AuthServerSettings, auth_settings: SimpleAuthSettings)
⋮----
"""Run the Authorization Server."""
auth_server = create_authorization_server(server_settings, auth_settings)
⋮----
config = Config(
server = Server(config)
⋮----
@click.command()
@click.option("--port", default=9000, help="Port to listen on")
def main(port: int) -> int
⋮----
"""
    Run the MCP Authorization Server.

    This server handles OAuth flows and can be used by multiple Resource Servers.

    Uses simple hardcoded credentials for demo purposes.
    """
⋮----
# Load simple auth settings
auth_settings = SimpleAuthSettings()
⋮----
# Create server settings
host = "localhost"
server_url = f"http://{host}:{port}"
server_settings = AuthServerSettings(
⋮----
main()  # type: ignore[call-arg]
````

## File: examples/servers/simple-auth/mcp_simple_auth/legacy_as_server.py
````python
"""
Legacy Combined Authorization Server + Resource Server for MCP.

This server implements the old spec where MCP servers could act as both AS and RS.
Used for backwards compatibility testing with the new split AS/RS architecture.

NOTE: this is a simplified example for demonstration purposes.
This is not a production-ready implementation.

"""
⋮----
logger = logging.getLogger(__name__)
⋮----
class ServerSettings(BaseModel)
⋮----
"""Settings for the simple auth MCP server."""
⋮----
# Server settings
host: str = "localhost"
port: int = 8000
server_url: AnyHttpUrl = AnyHttpUrl("http://localhost:8000")
auth_callback_path: str = "http://localhost:8000/login/callback"
⋮----
class LegacySimpleOAuthProvider(SimpleOAuthProvider)
⋮----
"""Simple OAuth provider for legacy MCP server."""
⋮----
def __init__(self, auth_settings: SimpleAuthSettings, auth_callback_path: str, server_url: str)
⋮----
def create_simple_mcp_server(server_settings: ServerSettings, auth_settings: SimpleAuthSettings) -> FastMCP
⋮----
"""Create a simple FastMCP server with simple authentication."""
oauth_provider = LegacySimpleOAuthProvider(
⋮----
mcp_auth_settings = AuthSettings(
⋮----
# No resource_server_url parameter in legacy mode
⋮----
app = FastMCP(
⋮----
@app.custom_route("/login", methods=["GET"])
    async def login_page_handler(request: Request) -> Response
⋮----
"""Show login form."""
state = request.query_params.get("state")
⋮----
@app.custom_route("/login/callback", methods=["POST"])
    async def login_callback_handler(request: Request) -> Response
⋮----
"""Handle simple authentication callback."""
⋮----
@app.tool()
    async def get_time() -> dict[str, Any]
⋮----
"""
        Get the current server time.

        This tool demonstrates that system information can be protected
        by OAuth authentication. User must be authenticated to access it.
        """
⋮----
now = datetime.datetime.now()
⋮----
"timezone": "UTC",  # Simplified for demo
⋮----
def main(port: int, transport: Literal["sse", "streamable-http"]) -> int
⋮----
"""Run the simple auth MCP server."""
⋮----
auth_settings = SimpleAuthSettings()
# Create server settings
host = "localhost"
server_url = f"http://{host}:{port}"
server_settings = ServerSettings(
⋮----
mcp_server = create_simple_mcp_server(server_settings, auth_settings)
⋮----
main()  # type: ignore[call-arg]
````

## File: examples/servers/simple-auth/mcp_simple_auth/server.py
````python
"""
MCP Resource Server with Token Introspection.

This server validates tokens via Authorization Server introspection and serves MCP resources.
Demonstrates RFC 9728 Protected Resource Metadata for AS/RS separation.

NOTE: this is a simplified example for demonstration purposes.
This is not a production-ready implementation.
"""
⋮----
logger = logging.getLogger(__name__)
⋮----
class ResourceServerSettings(BaseSettings)
⋮----
"""Settings for the MCP Resource Server."""
⋮----
model_config = SettingsConfigDict(env_prefix="MCP_RESOURCE_")
⋮----
# Server settings
host: str = "localhost"
port: int = 8001
server_url: AnyHttpUrl = AnyHttpUrl("http://localhost:8001")
⋮----
# Authorization Server settings
auth_server_url: AnyHttpUrl = AnyHttpUrl("http://localhost:9000")
auth_server_introspection_endpoint: str = "http://localhost:9000/introspect"
# No user endpoint needed - we get user data from token introspection
⋮----
# MCP settings
mcp_scope: str = "user"
⋮----
# RFC 8707 resource validation
oauth_strict: bool = False
⋮----
def __init__(self, **data)
⋮----
"""Initialize settings with values from environment variables."""
⋮----
def create_resource_server(settings: ResourceServerSettings) -> FastMCP
⋮----
"""
    Create MCP Resource Server with token introspection.

    This server:
    1. Provides protected resource metadata (RFC 9728)
    2. Validates tokens via Authorization Server introspection
    3. Serves MCP tools and resources
    """
# Create token verifier for introspection with RFC 8707 resource validation
token_verifier = IntrospectionTokenVerifier(
⋮----
validate_resource=settings.oauth_strict,  # Only validate when --oauth-strict is set
⋮----
# Create FastMCP server as a Resource Server
app = FastMCP(
⋮----
# Auth configuration for RS mode
⋮----
@app.tool()
    async def get_time() -> dict[str, Any]
⋮----
"""
        Get the current server time.

        This tool demonstrates that system information can be protected
        by OAuth authentication. User must be authenticated to access it.
        """
⋮----
now = datetime.datetime.now()
⋮----
"timezone": "UTC",  # Simplified for demo
⋮----
def main(port: int, auth_server: str, transport: Literal["sse", "streamable-http"], oauth_strict: bool) -> int
⋮----
"""
    Run the MCP Resource Server.

    This server:
    - Provides RFC 9728 Protected Resource Metadata
    - Validates tokens via Authorization Server introspection
    - Serves MCP tools requiring authentication

    Must be used with a running Authorization Server.
    """
⋮----
# Parse auth server URL
auth_server_url = AnyHttpUrl(auth_server)
⋮----
# Create settings
host = "localhost"
server_url = f"http://{host}:{port}"
settings = ResourceServerSettings(
⋮----
mcp_server = create_resource_server(settings)
⋮----
# Run the server - this should block and keep running
⋮----
main()  # type: ignore[call-arg]
````

## File: examples/servers/simple-auth/mcp_simple_auth/simple_auth_provider.py
````python
"""
Simple OAuth provider for MCP servers.

This module contains a basic OAuth implementation using hardcoded user credentials
for demonstration purposes. No external authentication provider is required.

NOTE: this is a simplified example for demonstration purposes.
This is not a production-ready implementation.

"""
⋮----
logger = logging.getLogger(__name__)
⋮----
class SimpleAuthSettings(BaseSettings)
⋮----
"""Simple OAuth settings for demo purposes."""
⋮----
model_config = SettingsConfigDict(env_prefix="MCP_")
⋮----
# Demo user credentials
demo_username: str = "demo_user"
demo_password: str = "demo_password"
⋮----
# MCP OAuth scope
mcp_scope: str = "user"
⋮----
class SimpleOAuthProvider(OAuthAuthorizationServerProvider)
⋮----
"""
    Simple OAuth provider for demo purposes.

    This provider handles the OAuth flow by:
    1. Providing a simple login form for demo credentials
    2. Issuing MCP tokens after successful authentication
    3. Maintaining token state for introspection
    """
⋮----
def __init__(self, settings: SimpleAuthSettings, auth_callback_url: str, server_url: str)
⋮----
# Store authenticated user information
⋮----
async def get_client(self, client_id: str) -> OAuthClientInformationFull | None
⋮----
"""Get OAuth client information."""
⋮----
async def register_client(self, client_info: OAuthClientInformationFull)
⋮----
"""Register a new OAuth client."""
⋮----
async def authorize(self, client: OAuthClientInformationFull, params: AuthorizationParams) -> str
⋮----
"""Generate an authorization URL for simple login flow."""
state = params.state or secrets.token_hex(16)
⋮----
# Store state mapping for callback
⋮----
"resource": params.resource,  # RFC 8707
⋮----
# Build simple login URL that points to login page
auth_url = f"{self.auth_callback_url}" f"?state={state}" f"&client_id={client.client_id}"
⋮----
async def get_login_page(self, state: str) -> HTMLResponse
⋮----
"""Generate login page HTML for the given state."""
⋮----
# Create simple login form HTML
html_content = f"""
⋮----
async def handle_login_callback(self, request: Request) -> Response
⋮----
"""Handle login form submission callback."""
form = await request.form()
username = form.get("username")
password = form.get("password")
state = form.get("state")
⋮----
# Ensure we have strings, not UploadFile objects
⋮----
redirect_uri = await self.handle_simple_callback(username, password, state)
⋮----
async def handle_simple_callback(self, username: str, password: str, state: str) -> str
⋮----
"""Handle simple authentication callback and return redirect URI."""
state_data = self.state_mapping.get(state)
⋮----
redirect_uri = state_data["redirect_uri"]
code_challenge = state_data["code_challenge"]
redirect_uri_provided_explicitly = state_data["redirect_uri_provided_explicitly"] == "True"
client_id = state_data["client_id"]
resource = state_data.get("resource")  # RFC 8707
⋮----
# These are required values from our own state mapping
⋮----
# Validate demo credentials
⋮----
# Create MCP authorization code
new_code = f"mcp_{secrets.token_hex(16)}"
auth_code = AuthorizationCode(
⋮----
resource=resource,  # RFC 8707
⋮----
# Store user data
⋮----
"""Load an authorization code."""
⋮----
"""Exchange authorization code for tokens."""
⋮----
# Generate MCP access token
mcp_token = f"mcp_{secrets.token_hex(32)}"
⋮----
# Store MCP token
⋮----
resource=authorization_code.resource,  # RFC 8707
⋮----
# Store user data mapping for this token
⋮----
async def load_access_token(self, token: str) -> AccessToken | None
⋮----
"""Load and validate an access token."""
access_token = self.tokens.get(token)
⋮----
# Check if expired
⋮----
async def load_refresh_token(self, client: OAuthClientInformationFull, refresh_token: str) -> RefreshToken | None
⋮----
"""Load a refresh token - not supported in this example."""
⋮----
"""Exchange refresh token - not supported in this example."""
⋮----
async def revoke_token(self, token: str, token_type_hint: str | None = None) -> None
⋮----
"""Revoke a token."""
````

## File: examples/servers/simple-auth/mcp_simple_auth/token_verifier.py
````python
"""Example token verifier implementation using OAuth 2.0 Token Introspection (RFC 7662)."""
⋮----
logger = logging.getLogger(__name__)
⋮----
class IntrospectionTokenVerifier(TokenVerifier)
⋮----
"""Example token verifier that uses OAuth 2.0 Token Introspection (RFC 7662).

    This is a simple example implementation for demonstration purposes.
    Production implementations should consider:
    - Connection pooling and reuse
    - More sophisticated error handling
    - Rate limiting and retry logic
    - Comprehensive configuration options
    """
⋮----
async def verify_token(self, token: str) -> AccessToken | None
⋮----
"""Verify token via introspection endpoint."""
⋮----
# Validate URL to prevent SSRF attacks
⋮----
# Configure secure HTTP client
timeout = httpx.Timeout(10.0, connect=5.0)
limits = httpx.Limits(max_connections=10, max_keepalive_connections=5)
⋮----
verify=True,  # Enforce SSL verification
⋮----
response = await client.post(
⋮----
data = response.json()
⋮----
# RFC 8707 resource validation (only when --oauth-strict is set)
⋮----
resource=data.get("aud"),  # Include resource in token
⋮----
def _validate_resource(self, token_data: dict) -> bool
⋮----
"""Validate token was issued for this resource server."""
⋮----
return False  # Fail if strict validation requested but URLs missing
⋮----
# Check 'aud' claim first (standard JWT audience)
aud = token_data.get("aud")
⋮----
# No resource binding - invalid per RFC 8707
⋮----
def _is_valid_resource(self, resource: str) -> bool
⋮----
"""Check if resource matches this server using hierarchical matching."""
````

## File: examples/servers/simple-auth/pyproject.toml
````toml
[project]
name = "mcp-simple-auth"
version = "0.1.0"
description = "A simple MCP server demonstrating OAuth authentication"
readme = "README.md"
requires-python = ">=3.10"
authors = [{ name = "Anthropic, PBC." }]
license = { text = "MIT" }
dependencies = [
    "anyio>=4.5",
    "click>=8.1.0",
    "httpx>=0.27",
    "mcp",
    "pydantic>=2.0",
    "pydantic-settings>=2.5.2",
    "sse-starlette>=1.6.1",
    "uvicorn>=0.23.1; sys_platform != 'emscripten'",
]

[project.scripts]
mcp-simple-auth-rs = "mcp_simple_auth.server:main"
mcp-simple-auth-as = "mcp_simple_auth.auth_server:main"
mcp-simple-auth-legacy = "mcp_simple_auth.legacy_as_server:main"

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[tool.hatch.build.targets.wheel]
packages = ["mcp_simple_auth"]

[tool.uv]
dev-dependencies = ["pyright>=1.1.391", "pytest>=8.3.4", "ruff>=0.8.5"]
````

## File: examples/servers/simple-auth/README.md
````markdown
# MCP OAuth Authentication Demo

This example demonstrates OAuth 2.0 authentication with the Model Context Protocol using **separate Authorization Server (AS) and Resource Server (RS)** to comply with the new RFC 9728 specification.

---


## Running the Servers

### Step 1: Start Authorization Server

```bash
# Navigate to the simple-auth directory
cd examples/servers/simple-auth

# Start Authorization Server on port 9000
uv run mcp-simple-auth-as --port=9000
```

**What it provides:**
- OAuth 2.0 flows (registration, authorization, token exchange)
- Simple credential-based authentication (no external provider needed)  
- Token introspection endpoint for Resource Servers (`/introspect`)

---

### Step 2: Start Resource Server (MCP Server)

```bash
# In another terminal, navigate to the simple-auth directory
cd examples/servers/simple-auth

# Start Resource Server on port 8001, connected to Authorization Server
uv run mcp-simple-auth-rs --port=8001 --auth-server=http://localhost:9000  --transport=streamable-http

# With RFC 8707 strict resource validation (recommended for production)
uv run mcp-simple-auth-rs --port=8001 --auth-server=http://localhost:9000  --transport=streamable-http --oauth-strict

```


### Step 3: Test with Client

```bash
cd examples/clients/simple-auth-client
# Start client with streamable HTTP
MCP_SERVER_PORT=8001 MCP_TRANSPORT_TYPE=streamable_http uv run mcp-simple-auth-client
```


## How It Works

### RFC 9728 Discovery

**Client → Resource Server:**
```bash
curl http://localhost:8001/.well-known/oauth-protected-resource
```
```json
{
  "resource": "http://localhost:8001",
  "authorization_servers": ["http://localhost:9000"]
}
```

**Client → Authorization Server:**
```bash
curl http://localhost:9000/.well-known/oauth-authorization-server
```
```json
{
  "issuer": "http://localhost:9000",
  "authorization_endpoint": "http://localhost:9000/authorize",
  "token_endpoint": "http://localhost:9000/token"
}
```


## Legacy MCP Server as Authorization Server (Backwards Compatibility)

For backwards compatibility with older MCP implementations, a legacy server is provided that acts as an Authorization Server (following the old spec where MCP servers could optionally provide OAuth):

### Running the Legacy Server

```bash
# Start legacy authorization server on port 8002
uv run mcp-simple-auth-legacy --port=8002
```

**Differences from the new architecture:**
- **MCP server acts as AS:** The MCP server itself provides OAuth endpoints (old spec behavior)
- **No separate RS:** The server handles both authentication and MCP tools
- **Local token validation:** Tokens are validated internally without introspection
- **No RFC 9728 support:** Does not provide `/.well-known/oauth-protected-resource`
- **Direct OAuth discovery:** OAuth metadata is at the MCP server's URL

### Testing with Legacy Server

```bash
# Test with client (will automatically fall back to legacy discovery)
cd examples/clients/simple-auth-client
MCP_SERVER_PORT=8002 MCP_TRANSPORT_TYPE=streamable_http uv run mcp-simple-auth-client
```

The client will:
1. Try RFC 9728 discovery at `/.well-known/oauth-protected-resource` (404 on legacy server)
2. Fall back to direct OAuth discovery at `/.well-known/oauth-authorization-server`
3. Complete authentication with the MCP server acting as its own AS

This ensures existing MCP servers (which could optionally act as Authorization Servers under the old spec) continue to work while the ecosystem transitions to the new architecture where MCP servers are Resource Servers only.

## Manual Testing

### Test Discovery
```bash
# Test Resource Server discovery endpoint (new architecture)
curl -v http://localhost:8001/.well-known/oauth-protected-resource

# Test Authorization Server metadata
curl -v http://localhost:9000/.well-known/oauth-authorization-server
```

### Test Token Introspection
```bash
# After getting a token through OAuth flow:
curl -X POST http://localhost:9000/introspect \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "token=your_access_token"
```
````

## File: examples/servers/simple-prompt/mcp_simple_prompt/__init__.py
````python

````

## File: examples/servers/simple-prompt/mcp_simple_prompt/__main__.py
````python
sys.exit(main())  # type: ignore[call-arg]
````

## File: examples/servers/simple-prompt/mcp_simple_prompt/server.py
````python
"""Create the messages for the prompt."""
messages = []
⋮----
# Add context if provided
⋮----
# Add the main prompt
prompt = "Please help me with "
⋮----
def main(port: int, transport: str) -> int
⋮----
app = Server("mcp-simple-prompt")
⋮----
@app.list_prompts()
    async def list_prompts() -> list[types.Prompt]
⋮----
arguments = {}
⋮----
sse = SseServerTransport("/messages/")
⋮----
async def handle_sse(request)
⋮----
starlette_app = Starlette(
⋮----
async def arun()
````

## File: examples/servers/simple-prompt/.python-version
````
3.10
````

## File: examples/servers/simple-prompt/pyproject.toml
````toml
[project]
name = "mcp-simple-prompt"
version = "0.1.0"
description = "A simple MCP server exposing a customizable prompt"
readme = "README.md"
requires-python = ">=3.10"
authors = [{ name = "Anthropic, PBC." }]
maintainers = [
    { name = "David Soria Parra", email = "davidsp@anthropic.com" },
    { name = "Justin Spahr-Summers", email = "justin@anthropic.com" },
]
keywords = ["mcp", "llm", "automation", "web", "fetch"]
license = { text = "MIT" }
classifiers = [
    "Development Status :: 4 - Beta",
    "Intended Audience :: Developers",
    "License :: OSI Approved :: MIT License",
    "Programming Language :: Python :: 3",
    "Programming Language :: Python :: 3.10",
]
dependencies = ["anyio>=4.5", "click>=8.1.0", "httpx>=0.27", "mcp"]

[project.scripts]
mcp-simple-prompt = "mcp_simple_prompt.server:main"

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[tool.hatch.build.targets.wheel]
packages = ["mcp_simple_prompt"]

[tool.pyright]
include = ["mcp_simple_prompt"]
venvPath = "."
venv = ".venv"

[tool.ruff.lint]
select = ["E", "F", "I"]
ignore = []

[tool.ruff]
line-length = 88
target-version = "py310"

[tool.uv]
dev-dependencies = ["pyright>=1.1.378", "pytest>=8.3.3", "ruff>=0.6.9"]
````

## File: examples/servers/simple-prompt/README.md
````markdown
# MCP Simple Prompt

A simple MCP server that exposes a customizable prompt template with optional context and topic parameters.

## Usage

Start the server using either stdio (default) or SSE transport:

```bash
# Using stdio transport (default)
uv run mcp-simple-prompt

# Using SSE transport on custom port
uv run mcp-simple-prompt --transport sse --port 8000
```

The server exposes a prompt named "simple" that accepts two optional arguments:

- `context`: Additional context to consider
- `topic`: Specific topic to focus on

## Example

Using the MCP client, you can retrieve the prompt like this using the STDIO transport:

```python
import asyncio
from mcp.client.session import ClientSession
from mcp.client.stdio import StdioServerParameters, stdio_client


async def main():
    async with stdio_client(
        StdioServerParameters(command="uv", args=["run", "mcp-simple-prompt"])
    ) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()

            # List available prompts
            prompts = await session.list_prompts()
            print(prompts)

            # Get the prompt with arguments
            prompt = await session.get_prompt(
                "simple",
                {
                    "context": "User is a software developer",
                    "topic": "Python async programming",
                },
            )
            print(prompt)


asyncio.run(main())
```
````

## File: examples/servers/simple-resource/mcp_simple_resource/__init__.py
````python

````

## File: examples/servers/simple-resource/mcp_simple_resource/__main__.py
````python
sys.exit(main())  # type: ignore[call-arg]
````

## File: examples/servers/simple-resource/mcp_simple_resource/server.py
````python
SAMPLE_RESOURCES = {
⋮----
def main(port: int, transport: str) -> int
⋮----
app = Server("mcp-simple-resource")
⋮----
@app.list_resources()
    async def list_resources() -> list[types.Resource]
⋮----
@app.read_resource()
    async def read_resource(uri: AnyUrl) -> str | bytes
⋮----
name = uri.path.replace(".txt", "").lstrip("/")
⋮----
sse = SseServerTransport("/messages/")
⋮----
async def handle_sse(request)
⋮----
starlette_app = Starlette(
⋮----
async def arun()
````

## File: examples/servers/simple-resource/.python-version
````
3.10
````

## File: examples/servers/simple-resource/pyproject.toml
````toml
[project]
name = "mcp-simple-resource"
version = "0.1.0"
description = "A simple MCP server exposing sample text resources"
readme = "README.md"
requires-python = ">=3.10"
authors = [{ name = "Anthropic, PBC." }]
maintainers = [
    { name = "David Soria Parra", email = "davidsp@anthropic.com" },
    { name = "Justin Spahr-Summers", email = "justin@anthropic.com" },
]
keywords = ["mcp", "llm", "automation", "web", "fetch"]
license = { text = "MIT" }
classifiers = [
    "Development Status :: 4 - Beta",
    "Intended Audience :: Developers",
    "License :: OSI Approved :: MIT License",
    "Programming Language :: Python :: 3",
    "Programming Language :: Python :: 3.10",
]
dependencies = ["anyio>=4.5", "click>=8.1.0", "httpx>=0.27", "mcp"]

[project.scripts]
mcp-simple-resource = "mcp_simple_resource.server:main"

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[tool.hatch.build.targets.wheel]
packages = ["mcp_simple_resource"]

[tool.pyright]
include = ["mcp_simple_resource"]
venvPath = "."
venv = ".venv"

[tool.ruff.lint]
select = ["E", "F", "I"]
ignore = []

[tool.ruff]
line-length = 88
target-version = "py310"

[tool.uv]
dev-dependencies = ["pyright>=1.1.378", "pytest>=8.3.3", "ruff>=0.6.9"]
````

## File: examples/servers/simple-resource/README.md
````markdown
# MCP Simple Resource

A simple MCP server that exposes sample text files as resources.

## Usage

Start the server using either stdio (default) or SSE transport:

```bash
# Using stdio transport (default)
uv run mcp-simple-resource

# Using SSE transport on custom port
uv run mcp-simple-resource --transport sse --port 8000
```

The server exposes some basic text file resources that can be read by clients.

## Example

Using the MCP client, you can retrieve resources like this using the STDIO transport:

```python
import asyncio
from mcp.types import AnyUrl
from mcp.client.session import ClientSession
from mcp.client.stdio import StdioServerParameters, stdio_client


async def main():
    async with stdio_client(
        StdioServerParameters(command="uv", args=["run", "mcp-simple-resource"])
    ) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()

            # List available resources
            resources = await session.list_resources()
            print(resources)

            # Get a specific resource
            resource = await session.read_resource(AnyUrl("file:///greeting.txt"))
            print(resource)


asyncio.run(main())

```
````

## File: examples/servers/simple-streamablehttp/mcp_simple_streamablehttp/__main__.py
````python
main()  # type: ignore[call-arg]
````

## File: examples/servers/simple-streamablehttp/mcp_simple_streamablehttp/event_store.py
````python
"""
In-memory event store for demonstrating resumability functionality.

This is a simple implementation intended for examples and testing,
not for production use where a persistent storage solution would be more appropriate.
"""
⋮----
logger = logging.getLogger(__name__)
⋮----
@dataclass
class EventEntry
⋮----
"""
    Represents an event entry in the event store.
    """
⋮----
event_id: EventId
stream_id: StreamId
message: JSONRPCMessage
⋮----
class InMemoryEventStore(EventStore)
⋮----
"""
    Simple in-memory implementation of the EventStore interface for resumability.
    This is primarily intended for examples and testing, not for production use
    where a persistent storage solution would be more appropriate.

    This implementation keeps only the last N events per stream for memory efficiency.
    """
⋮----
def __init__(self, max_events_per_stream: int = 100)
⋮----
"""Initialize the event store.

        Args:
            max_events_per_stream: Maximum number of events to keep per stream
        """
⋮----
# for maintaining last N events per stream
⋮----
# event_id -> EventEntry for quick lookup
⋮----
"""Stores an event with a generated event ID."""
event_id = str(uuid4())
event_entry = EventEntry(
⋮----
# Get or create deque for this stream
⋮----
# If deque is full, the oldest event will be automatically removed
# We need to remove it from the event_index as well
⋮----
oldest_event = self.streams[stream_id][0]
⋮----
# Add new event
⋮----
"""Replays events that occurred after the specified event ID."""
⋮----
# Get the stream and find events after the last one
last_event = self.event_index[last_event_id]
stream_id = last_event.stream_id
stream_events = self.streams.get(last_event.stream_id, deque())
⋮----
# Events in deque are already in chronological order
found_last = False
⋮----
found_last = True
````

## File: examples/servers/simple-streamablehttp/mcp_simple_streamablehttp/server.py
````python
# Configure logging
logger = logging.getLogger(__name__)
⋮----
# Configure logging
⋮----
app = Server("mcp-streamable-http-demo")
⋮----
@app.call_tool()
    async def call_tool(name: str, arguments: dict) -> list[types.ContentBlock]
⋮----
ctx = app.request_context
interval = arguments.get("interval", 1.0)
count = arguments.get("count", 5)
caller = arguments.get("caller", "unknown")
⋮----
# Send the specified number of notifications with the given interval
⋮----
# Include more detailed message for resumability demonstration
notification_msg = (
⋮----
# Associates this notification with the original request
# Ensures notifications are sent to the correct response stream
# Without this, notifications will either go to:
# - a standalone SSE stream (if GET request is supported)
# - nowhere (if GET request isn't supported)
⋮----
if i < count - 1:  # Don't wait after the last notification
⋮----
# This will send a resource notificaiton though standalone SSE
# established by GET request
⋮----
@app.list_tools()
    async def list_tools() -> list[types.Tool]
⋮----
# Create event store for resumability
# The InMemoryEventStore enables resumability support for StreamableHTTP transport.
# It stores SSE events with unique IDs, allowing clients to:
#   1. Receive event IDs for each SSE message
#   2. Resume streams by sending Last-Event-ID in GET requests
#   3. Replay missed events after reconnection
# Note: This in-memory implementation is for demonstration ONLY.
# For production, use a persistent storage solution.
event_store = InMemoryEventStore()
⋮----
# Create the session manager with our app and event store
session_manager = StreamableHTTPSessionManager(
⋮----
event_store=event_store,  # Enable resumability
⋮----
# ASGI handler for streamable HTTP connections
⋮----
@contextlib.asynccontextmanager
    async def lifespan(app: Starlette) -> AsyncIterator[None]
⋮----
"""Context manager for managing session manager lifecycle."""
⋮----
# Create an ASGI application using the transport
starlette_app = Starlette(
````

## File: examples/servers/simple-streamablehttp/pyproject.toml
````toml
[project]
name = "mcp-simple-streamablehttp"
version = "0.1.0"
description = "A simple MCP server exposing a StreamableHttp transport for testing"
readme = "README.md"
requires-python = ">=3.10"
authors = [{ name = "Anthropic, PBC." }]
keywords = ["mcp", "llm", "automation", "web", "fetch", "http", "streamable"]
license = { text = "MIT" }
dependencies = ["anyio>=4.5", "click>=8.1.0", "httpx>=0.27", "mcp", "starlette", "uvicorn"]

[project.scripts]
mcp-simple-streamablehttp = "mcp_simple_streamablehttp.server:main"

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[tool.hatch.build.targets.wheel]
packages = ["mcp_simple_streamablehttp"]

[tool.pyright]
include = ["mcp_simple_streamablehttp"]
venvPath = "."
venv = ".venv"

[tool.ruff.lint]
select = ["E", "F", "I"]
ignore = []

[tool.ruff]
line-length = 88
target-version = "py310"

[tool.uv]
dev-dependencies = ["pyright>=1.1.378", "pytest>=8.3.3", "ruff>=0.6.9"]
````

## File: examples/servers/simple-streamablehttp/README.md
````markdown
# MCP Simple StreamableHttp Server Example

A simple MCP server example demonstrating the StreamableHttp transport, which enables HTTP-based communication with MCP servers using streaming.

## Features

- Uses the StreamableHTTP transport for server-client communication
- Supports REST API operations (POST, GET, DELETE) for `/mcp` endpoint
- Task management with anyio task groups
- Ability to send multiple notifications over time to the client
- Proper resource cleanup and lifespan management
- Resumability support via InMemoryEventStore

## Usage

Start the server on the default or custom port:

```bash

# Using custom port
uv run mcp-simple-streamablehttp --port 3000

# Custom logging level
uv run mcp-simple-streamablehttp --log-level DEBUG

# Enable JSON responses instead of SSE streams
uv run mcp-simple-streamablehttp --json-response
```

The server exposes a tool named "start-notification-stream" that accepts three arguments:

- `interval`: Time between notifications in seconds (e.g., 1.0)
- `count`: Number of notifications to send (e.g., 5)
- `caller`: Identifier string for the caller

## Resumability Support

This server includes resumability support through the InMemoryEventStore. This enables clients to:

- Reconnect to the server after a disconnection
- Resume event streaming from where they left off using the Last-Event-ID header


The server will:
- Generate unique event IDs for each SSE message
- Store events in memory for later replay
- Replay missed events when a client reconnects with a Last-Event-ID header

Note: The InMemoryEventStore is designed for demonstration purposes only. For production use, consider implementing a persistent storage solution.



## Client

You can connect to this server using an HTTP client, for now only Typescript SDK has streamable HTTP client examples or you can use [Inspector](https://github.com/modelcontextprotocol/inspector)
````

## File: examples/servers/simple-streamablehttp-stateless/mcp_simple_streamablehttp_stateless/__main__.py
````python
# Click will handle CLI arguments
⋮----
sys.exit(main())  # type: ignore[call-arg]
````

## File: examples/servers/simple-streamablehttp-stateless/mcp_simple_streamablehttp_stateless/server.py
````python
logger = logging.getLogger(__name__)
⋮----
# Configure logging
⋮----
app = Server("mcp-streamable-http-stateless-demo")
⋮----
@app.call_tool()
    async def call_tool(name: str, arguments: dict) -> list[types.ContentBlock]
⋮----
ctx = app.request_context
interval = arguments.get("interval", 1.0)
count = arguments.get("count", 5)
caller = arguments.get("caller", "unknown")
⋮----
# Send the specified number of notifications with the given interval
⋮----
if i < count - 1:  # Don't wait after the last notification
⋮----
@app.list_tools()
    async def list_tools() -> list[types.Tool]
⋮----
# Create the session manager with true stateless mode
session_manager = StreamableHTTPSessionManager(
⋮----
@contextlib.asynccontextmanager
    async def lifespan(app: Starlette) -> AsyncIterator[None]
⋮----
"""Context manager for session manager."""
⋮----
# Create an ASGI application using the transport
starlette_app = Starlette(
````

## File: examples/servers/simple-streamablehttp-stateless/pyproject.toml
````toml
[project]
name = "mcp-simple-streamablehttp-stateless"
version = "0.1.0"
description = "A simple MCP server exposing a StreamableHttp transport in stateless mode"
readme = "README.md"
requires-python = ">=3.10"
authors = [{ name = "Anthropic, PBC." }]
keywords = ["mcp", "llm", "automation", "web", "fetch", "http", "streamable", "stateless"]
license = { text = "MIT" }
dependencies = ["anyio>=4.5", "click>=8.1.0", "httpx>=0.27", "mcp", "starlette", "uvicorn"]

[project.scripts]
mcp-simple-streamablehttp-stateless = "mcp_simple_streamablehttp_stateless.server:main"

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[tool.hatch.build.targets.wheel]
packages = ["mcp_simple_streamablehttp_stateless"]

[tool.pyright]
include = ["mcp_simple_streamablehttp_stateless"]
venvPath = "."
venv = ".venv"

[tool.ruff.lint]
select = ["E", "F", "I"]
ignore = []

[tool.ruff]
line-length = 88
target-version = "py310"

[tool.uv]
dev-dependencies = ["pyright>=1.1.378", "pytest>=8.3.3", "ruff>=0.6.9"]
````

## File: examples/servers/simple-streamablehttp-stateless/README.md
````markdown
# MCP Simple StreamableHttp Stateless Server Example

A stateless MCP server example demonstrating the StreamableHttp transport without maintaining session state. This example is ideal for understanding how to deploy MCP servers in multi-node environments where requests can be routed to any instance.

## Features

- Uses the StreamableHTTP transport in stateless mode (mcp_session_id=None)
- Each request creates a new ephemeral connection
- No session state maintained between requests
- Task lifecycle scoped to individual requests
- Suitable for deployment in multi-node environments


## Usage

Start the server:

```bash
# Using default port 3000
uv run mcp-simple-streamablehttp-stateless

# Using custom port
uv run mcp-simple-streamablehttp-stateless --port 3000

# Custom logging level
uv run mcp-simple-streamablehttp-stateless --log-level DEBUG

# Enable JSON responses instead of SSE streams
uv run mcp-simple-streamablehttp-stateless --json-response
```

The server exposes a tool named "start-notification-stream" that accepts three arguments:

- `interval`: Time between notifications in seconds (e.g., 1.0)
- `count`: Number of notifications to send (e.g., 5)
- `caller`: Identifier string for the caller


## Client

You can connect to this server using an HTTP client. For now, only the TypeScript SDK has streamable HTTP client examples, or you can use [Inspector](https://github.com/modelcontextprotocol/inspector) for testing.
````

## File: examples/servers/simple-tool/mcp_simple_tool/__init__.py
````python

````

## File: examples/servers/simple-tool/mcp_simple_tool/__main__.py
````python
sys.exit(main())  # type: ignore[call-arg]
````

## File: examples/servers/simple-tool/mcp_simple_tool/server.py
````python
headers = {
⋮----
response = await client.get(url)
⋮----
def main(port: int, transport: str) -> int
⋮----
app = Server("mcp-website-fetcher")
⋮----
@app.call_tool()
    async def fetch_tool(name: str, arguments: dict) -> list[types.ContentBlock]
⋮----
@app.list_tools()
    async def list_tools() -> list[types.Tool]
⋮----
sse = SseServerTransport("/messages/")
⋮----
async def handle_sse(request)
⋮----
starlette_app = Starlette(
⋮----
async def arun()
````

## File: examples/servers/simple-tool/.python-version
````
3.10
````

## File: examples/servers/simple-tool/pyproject.toml
````toml
[project]
name = "mcp-simple-tool"
version = "0.1.0"
description = "A simple MCP server exposing a website fetching tool"
readme = "README.md"
requires-python = ">=3.10"
authors = [{ name = "Anthropic, PBC." }]
maintainers = [
    { name = "David Soria Parra", email = "davidsp@anthropic.com" },
    { name = "Justin Spahr-Summers", email = "justin@anthropic.com" },
]
keywords = ["mcp", "llm", "automation", "web", "fetch"]
license = { text = "MIT" }
classifiers = [
    "Development Status :: 4 - Beta",
    "Intended Audience :: Developers",
    "License :: OSI Approved :: MIT License",
    "Programming Language :: Python :: 3",
    "Programming Language :: Python :: 3.10",
]
dependencies = ["anyio>=4.5", "click>=8.1.0", "httpx>=0.27", "mcp"]

[project.scripts]
mcp-simple-tool = "mcp_simple_tool.server:main"

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[tool.hatch.build.targets.wheel]
packages = ["mcp_simple_tool"]

[tool.pyright]
include = ["mcp_simple_tool"]
venvPath = "."
venv = ".venv"

[tool.ruff.lint]
select = ["E", "F", "I"]
ignore = []

[tool.ruff]
line-length = 88
target-version = "py310"

[tool.uv]
dev-dependencies = ["pyright>=1.1.378", "pytest>=8.3.3", "ruff>=0.6.9"]
````

## File: examples/servers/simple-tool/README.md
````markdown
A simple MCP server that exposes a website fetching tool.

## Usage

Start the server using either stdio (default) or SSE transport:

```bash
# Using stdio transport (default)
uv run mcp-simple-tool

# Using SSE transport on custom port
uv run mcp-simple-tool --transport sse --port 8000
```

The server exposes a tool named "fetch" that accepts one required argument:

- `url`: The URL of the website to fetch

## Example

Using the MCP client, you can use the tool like this using the STDIO transport:

```python
import asyncio
from mcp.client.session import ClientSession
from mcp.client.stdio import StdioServerParameters, stdio_client


async def main():
    async with stdio_client(
        StdioServerParameters(command="uv", args=["run", "mcp-simple-tool"])
    ) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()

            # List available tools
            tools = await session.list_tools()
            print(tools)

            # Call the fetch tool
            result = await session.call_tool("fetch", {"url": "https://example.com"})
            print(result)


asyncio.run(main())

```
````

## File: examples/servers/structured_output_lowlevel.py
````python
#!/usr/bin/env python3
"""
Example low-level MCP server demonstrating structured output support.

This example shows how to use the low-level server API to return
structured data from tools, with automatic validation against output
schemas.
"""
⋮----
# Create low-level server instance
server = Server("structured-output-lowlevel-example")
⋮----
@server.list_tools()
async def list_tools() -> list[types.Tool]
⋮----
"""List available tools with their schemas."""
⋮----
@server.call_tool()
async def call_tool(name: str, arguments: dict[str, Any]) -> Any
⋮----
"""
    Handle tool call with structured output.
    """
⋮----
# city = arguments["city"]  # Would be used with real weather API
⋮----
# Simulate weather data (in production, call a real weather API)
⋮----
weather_conditions = ["sunny", "cloudy", "rainy", "partly cloudy", "foggy"]
⋮----
weather_data = {
⋮----
# Return structured data only
# The low-level server will serialize this to JSON content automatically
⋮----
async def run()
⋮----
"""Run the low-level server using stdio transport."""
````

## File: examples/README.md
````markdown
# Python SDK Examples

This folders aims to provide simple examples of using the Python SDK. Please refer to the
[servers repository](https://github.com/modelcontextprotocol/servers)
for real-world servers.
````

## File: src/mcp/cli/__init__.py
````python
"""FastMCP CLI package."""
````

## File: src/mcp/cli/claude.py
````python
"""Claude app integration utilities."""
⋮----
logger = get_logger(__name__)
⋮----
MCP_PACKAGE = "mcp[cli]"
⋮----
def get_claude_config_path() -> Path | None
⋮----
"""Get the Claude config directory based on platform."""
⋮----
path = Path(Path.home(), "AppData", "Roaming", "Claude")
⋮----
path = Path(Path.home(), "Library", "Application Support", "Claude")
⋮----
path = Path(os.environ.get("XDG_CONFIG_HOME", Path.home() / ".config"), "Claude")
⋮----
def get_uv_path() -> str
⋮----
"""Get the full path to the uv executable."""
uv_path = shutil.which("uv")
⋮----
return "uv"  # Fall back to just "uv" if not found
⋮----
"""Add or update a FastMCP server in Claude's configuration.

    Args:
        file_spec: Path to the server file, optionally with :object suffix
        server_name: Name for the server in Claude's config
        with_editable: Optional directory to install in editable mode
        with_packages: Optional list of additional packages to install
        env_vars: Optional dictionary of environment variables. These are merged with
            any existing variables, with new values taking precedence.

    Raises:
        RuntimeError: If Claude Desktop's config directory is not found, indicating
            Claude Desktop may not be installed or properly set up.
    """
config_dir = get_claude_config_path()
uv_path = get_uv_path()
⋮----
config_file = config_dir / "claude_desktop_config.json"
⋮----
config = json.loads(config_file.read_text())
⋮----
# Always preserve existing env vars and merge with new ones
⋮----
existing_env = config["mcpServers"][server_name]["env"]
⋮----
# New vars take precedence over existing ones
env_vars = {**existing_env, **env_vars}
⋮----
env_vars = existing_env
⋮----
# Build uv run command
args = ["run"]
⋮----
# Collect all packages in a set to deduplicate
packages = {MCP_PACKAGE}
⋮----
# Add all packages with --with
⋮----
# Convert file path to absolute before adding to command
# Split off any :object suffix first
⋮----
file_spec = f"{Path(file_path).resolve()}:{server_object}"
⋮----
file_spec = str(Path(file_spec).resolve())
⋮----
# Add fastmcp run command
⋮----
server_config: dict[str, Any] = {"command": uv_path, "args": args}
⋮----
# Add environment variables if specified
````

## File: src/mcp/cli/cli.py
````python
"""MCP CLI tools."""
⋮----
dotenv = None
⋮----
logger = get_logger("cli")
⋮----
app = typer.Typer(
⋮----
no_args_is_help=True,  # Show help if no args provided
⋮----
def _get_npx_command()
⋮----
"""Get the correct npx command for the current platform."""
⋮----
# Try both npx.cmd and npx.exe on Windows
⋮----
return "npx"  # On Unix-like systems, just use npx
⋮----
def _parse_env_var(env_var: str) -> tuple[str, str]
⋮----
"""Parse environment variable string in format KEY=VALUE."""
⋮----
"""Build the uv run command that runs a MCP server through mcp run."""
cmd = ["uv"]
⋮----
# Add mcp run command
⋮----
def _parse_file_path(file_spec: str) -> tuple[Path, str | None]
⋮----
"""Parse a file path that may include a server object specification.

    Args:
        file_spec: Path to file, optionally with :object suffix

    Returns:
        Tuple of (file_path, server_object)
    """
# First check if we have a Windows path (e.g., C:\...)
has_windows_drive = len(file_spec) > 1 and file_spec[1] == ":"
⋮----
# Split on the last colon, but only if it's not part of the Windows drive letter
# and there's actually another colon in the string after the drive letter
⋮----
# Resolve the file path
file_path = Path(file_str).expanduser().resolve()
⋮----
def _import_server(file: Path, server_object: str | None = None)
⋮----
"""Import a MCP server from a file.

    Args:
        file: Path to the file
        server_object: Optional object name in format "module:object" or just "object"

    Returns:
        The server object
    """
# Add parent directory to Python path so imports can be resolved
file_dir = str(file.parent)
⋮----
# Import the module
spec = importlib.util.spec_from_file_location("server_module", file)
⋮----
module = importlib.util.module_from_spec(spec)
⋮----
def _check_server_object(server_object: Any, object_name: str)
⋮----
"""Helper function to check that the server object is supported

        Args:
            server_object: The server object to check.

        Returns:
            True if it's supported.
        """
⋮----
# If no object specified, try common server names
⋮----
# Look for the most common server object names
⋮----
# Handle module:object syntax
⋮----
server_module = importlib.import_module(module_name)
server = getattr(server_module, object_name, None)
⋮----
# Just object name
server = getattr(module, server_object, None)
⋮----
@app.command()
def version() -> None
⋮----
"""Show the MCP version."""
⋮----
version = importlib.metadata.version("mcp")
⋮----
"""Run a MCP server with the MCP Inspector."""
⋮----
# Import server to get dependencies
server = _import_server(file, server_object)
⋮----
with_packages = list(set(with_packages + server.dependencies))
⋮----
uv_cmd = _build_uv_command(file_spec, with_editable, with_packages)
⋮----
# Get the correct npx command
npx_cmd = _get_npx_command()
⋮----
# Run the MCP Inspector command with shell=True on Windows
shell = sys.platform == "win32"
process = subprocess.run(
⋮----
env=dict(os.environ.items()),  # Convert to list of tuples for env update
⋮----
"""Run a MCP server.

    The server can be specified in two ways:\n
    1. Module approach: server.py - runs the module directly, expecting a server.run() call.\n
    2. Import approach: server.py:app - imports and runs the specified server object.\n\n

    Note: This command runs the server directly. You are responsible for ensuring
    all dependencies are available.\n
    For dependency management, use `mcp install` or `mcp dev` instead.
    """  # noqa: E501
⋮----
"""  # noqa: E501
⋮----
# Import and get server object
⋮----
# Run the server
kwargs = {}
⋮----
"""Install a MCP server in the Claude desktop app.

    Environment variables are preserved once added and only updated if new values
    are explicitly provided.
    """
⋮----
# Try to import server to get its name, but fall back to file name if dependencies
# missing
name = server_name
server = None
⋮----
name = server.name
⋮----
name = file.stem
⋮----
# Get server dependencies if available
server_dependencies = getattr(server, "dependencies", []) if server else []
⋮----
with_packages = list(set(with_packages + server_dependencies))
⋮----
# Process environment variables if provided
env_dict: dict[str, str] | None = None
⋮----
env_dict = {}
# Load from .env file if specified
⋮----
# Add command line environment variables
````

## File: src/mcp/client/stdio/__init__.py
````python
# Environment variables to inherit by default
DEFAULT_INHERITED_ENV_VARS = (
⋮----
def get_default_environment() -> dict[str, str]
⋮----
"""
    Returns a default environment object including only environment variables deemed
    safe to inherit.
    """
env: dict[str, str] = {}
⋮----
value = os.environ.get(key)
⋮----
# Skip functions, which are a security risk
⋮----
class StdioServerParameters(BaseModel)
⋮----
command: str
"""The executable to run to start the server."""
⋮----
args: list[str] = Field(default_factory=list)
"""Command line arguments to pass to the executable."""
⋮----
env: dict[str, str] | None = None
"""
    The environment to use when spawning the process.

    If not specified, the result of get_default_environment() will be used.
    """
⋮----
cwd: str | Path | None = None
"""The working directory to use when spawning the process."""
⋮----
encoding: str = "utf-8"
"""
    The text encoding used when sending/receiving messages to the server

    defaults to utf-8
    """
⋮----
encoding_error_handler: Literal["strict", "ignore", "replace"] = "strict"
"""
    The text encoding error handler.

    See https://docs.python.org/3/library/codecs.html#codec-base-classes for
    explanations of possible values
    """
⋮----
@asynccontextmanager
async def stdio_client(server: StdioServerParameters, errlog: TextIO = sys.stderr)
⋮----
"""
    Client transport for stdio: this will connect to a server by spawning a
    process and communicating with it over stdin/stdout.
    """
read_stream: MemoryObjectReceiveStream[SessionMessage | Exception]
read_stream_writer: MemoryObjectSendStream[SessionMessage | Exception]
⋮----
write_stream: MemoryObjectSendStream[SessionMessage]
write_stream_reader: MemoryObjectReceiveStream[SessionMessage]
⋮----
command = _get_executable_command(server.command)
⋮----
# Open process with stderr piped for capture
process = await _create_platform_compatible_process(
⋮----
# Clean up streams if process creation fails
⋮----
async def stdout_reader()
⋮----
buffer = ""
⋮----
lines = (buffer + chunk).split("\n")
buffer = lines.pop()
⋮----
message = types.JSONRPCMessage.model_validate_json(line)
⋮----
session_message = SessionMessage(message)
⋮----
async def stdin_writer()
⋮----
json = session_message.message.model_dump_json(by_alias=True, exclude_none=True)
⋮----
# Clean up process to prevent any dangling orphaned processes
⋮----
# Process already exited, which is fine
⋮----
def _get_executable_command(command: str) -> str
⋮----
"""
    Get the correct executable command normalized for the current platform.

    Args:
        command: Base command (e.g., 'uvx', 'npx')

    Returns:
        str: Platform-appropriate command
    """
⋮----
"""
    Creates a subprocess in a platform-compatible way.
    Returns a process handle.
    """
⋮----
process = await create_windows_process(command, args, env, errlog, cwd)
⋮----
process = await anyio.open_process([command, *args], env=env, stderr=errlog, cwd=cwd)
````

## File: src/mcp/client/stdio/win32.py
````python
"""
Windows-specific functionality for stdio client operations.
"""
⋮----
def get_windows_executable_command(command: str) -> str
⋮----
"""
    Get the correct executable command normalized for Windows.

    On Windows, commands might exist with specific extensions (.exe, .cmd, etc.)
    that need to be located for proper execution.

    Args:
        command: Base command (e.g., 'uvx', 'npx')

    Returns:
        str: Windows-appropriate command path
    """
⋮----
# First check if command exists in PATH as-is
⋮----
# Check for Windows-specific extensions
⋮----
ext_version = f"{command}{ext}"
⋮----
# For regular commands or if we couldn't find special versions
⋮----
# Handle file system errors during path resolution
# (permissions, broken symlinks, etc.)
⋮----
class FallbackProcess
⋮----
"""
    A fallback process wrapper for Windows to handle async I/O
    when using subprocess.Popen, which provides sync-only FileIO objects.

    This wraps stdin and stdout into async-compatible
    streams (FileReadStream, FileWriteStream),
    so that MCP clients expecting async streams can work properly.
    """
⋮----
def __init__(self, popen_obj: subprocess.Popen[bytes])
⋮----
self.stdin_raw = popen_obj.stdin  # type: ignore[assignment]
self.stdout_raw = popen_obj.stdout  # type: ignore[assignment]
self.stderr = popen_obj.stderr  # type: ignore[assignment]
⋮----
async def __aenter__(self)
⋮----
"""Support async context manager entry."""
⋮----
"""Terminate and wait on process exit inside a thread."""
⋮----
# Close the file handles to prevent ResourceWarning
⋮----
async def wait(self)
⋮----
"""Async wait for process completion."""
⋮----
def terminate(self)
⋮----
"""Terminate the subprocess immediately."""
⋮----
def kill(self) -> None
⋮----
"""Kill the subprocess immediately (alias for terminate)."""
⋮----
# ------------------------
# Updated function
⋮----
"""
    Creates a subprocess in a Windows-compatible way.

    On Windows, asyncio.create_subprocess_exec has incomplete support
    (NotImplementedError when trying to open subprocesses).
    Therefore, we fallback to subprocess.Popen and wrap it for async usage.

    Args:
        command (str): The executable to run
        args (list[str]): List of command line arguments
        env (dict[str, str] | None): Environment variables
        errlog (TextIO | None): Where to send stderr output (defaults to sys.stderr)
        cwd (Path | str | None): Working directory for the subprocess

    Returns:
        FallbackProcess: Async-compatible subprocess with stdin and stdout streams
    """
⋮----
# Try launching with creationflags to avoid opening a new console window
popen_obj = subprocess.Popen(
⋮----
bufsize=0,  # Unbuffered output
⋮----
# If creationflags failed, fallback without them
⋮----
async def terminate_windows_process(process: Process | FallbackProcess)
⋮----
"""
    Terminate a Windows process.

    Note: On Windows, terminating a process with process.terminate() doesn't
    always guarantee immediate process termination.
    So we give it 2s to exit, or we call process.kill()
    which sends a SIGKILL equivalent signal.

    Args:
        process: The process to terminate
    """
⋮----
# Force kill if it doesn't terminate
````

## File: src/mcp/client/__main__.py
````python
logger = logging.getLogger("client")
⋮----
async def main(command_or_url: str, args: list[str], env: list[tuple[str, str]])
⋮----
env_dict = dict(env)
⋮----
# Use SSE client for HTTP(S) URLs
⋮----
# Use stdio client for commands
server_parameters = StdioServerParameters(command=command_or_url, args=args, env=env_dict)
⋮----
def cli()
⋮----
parser = argparse.ArgumentParser()
⋮----
args = parser.parse_args()
````

## File: src/mcp/client/auth.py
````python
"""
OAuth2 Authentication implementation for HTTPX.

Implements authorization code flow with PKCE and automatic token refresh.
"""
⋮----
logger = logging.getLogger(__name__)
⋮----
class OAuthFlowError(Exception)
⋮----
"""Base exception for OAuth flow errors."""
⋮----
class OAuthTokenError(OAuthFlowError)
⋮----
"""Raised when token operations fail."""
⋮----
class OAuthRegistrationError(OAuthFlowError)
⋮----
"""Raised when client registration fails."""
⋮----
class PKCEParameters(BaseModel)
⋮----
"""PKCE (Proof Key for Code Exchange) parameters."""
⋮----
code_verifier: str = Field(..., min_length=43, max_length=128)
code_challenge: str = Field(..., min_length=43, max_length=128)
⋮----
@classmethod
    def generate(cls) -> "PKCEParameters"
⋮----
"""Generate new PKCE parameters."""
code_verifier = "".join(secrets.choice(string.ascii_letters + string.digits + "-._~") for _ in range(128))
digest = hashlib.sha256(code_verifier.encode()).digest()
code_challenge = base64.urlsafe_b64encode(digest).decode().rstrip("=")
⋮----
class TokenStorage(Protocol)
⋮----
"""Protocol for token storage implementations."""
⋮----
async def get_tokens(self) -> OAuthToken | None
⋮----
"""Get stored tokens."""
⋮----
async def set_tokens(self, tokens: OAuthToken) -> None
⋮----
"""Store tokens."""
⋮----
async def get_client_info(self) -> OAuthClientInformationFull | None
⋮----
"""Get stored client information."""
⋮----
async def set_client_info(self, client_info: OAuthClientInformationFull) -> None
⋮----
"""Store client information."""
⋮----
@dataclass
class OAuthContext
⋮----
"""OAuth flow context."""
⋮----
server_url: str
client_metadata: OAuthClientMetadata
storage: TokenStorage
redirect_handler: Callable[[str], Awaitable[None]]
callback_handler: Callable[[], Awaitable[tuple[str, str | None]]]
timeout: float = 300.0
⋮----
# Discovered metadata
protected_resource_metadata: ProtectedResourceMetadata | None = None
oauth_metadata: OAuthMetadata | None = None
auth_server_url: str | None = None
protocol_version: str | None = None
⋮----
# Client registration
client_info: OAuthClientInformationFull | None = None
⋮----
# Token management
current_tokens: OAuthToken | None = None
token_expiry_time: float | None = None
⋮----
# State
lock: anyio.Lock = field(default_factory=anyio.Lock)
⋮----
# Discovery state for fallback support
discovery_base_url: str | None = None
discovery_pathname: str | None = None
⋮----
def get_authorization_base_url(self, server_url: str) -> str
⋮----
"""Extract base URL by removing path component."""
parsed = urlparse(server_url)
⋮----
def update_token_expiry(self, token: OAuthToken) -> None
⋮----
"""Update token expiry time."""
⋮----
def is_token_valid(self) -> bool
⋮----
"""Check if current token is valid."""
⋮----
def can_refresh_token(self) -> bool
⋮----
"""Check if token can be refreshed."""
⋮----
def clear_tokens(self) -> None
⋮----
"""Clear current tokens."""
⋮----
def get_resource_url(self) -> str
⋮----
"""Get resource URL for RFC 8707.

        Uses PRM resource if it's a valid parent, otherwise uses canonical server URL.
        """
resource = resource_url_from_server_url(self.server_url)
⋮----
# If PRM provides a resource that's a valid parent, use it
⋮----
prm_resource = str(self.protected_resource_metadata.resource)
⋮----
resource = prm_resource
⋮----
def should_include_resource_param(self, protocol_version: str | None = None) -> bool
⋮----
"""Determine if the resource parameter should be included in OAuth requests.

        Returns True if:
        - Protected resource metadata is available, OR
        - MCP-Protocol-Version header is 2025-06-18 or later
        """
# If we have protected resource metadata, include the resource param
⋮----
# If no protocol version provided, don't include resource param
⋮----
# Check if protocol version is 2025-06-18 or later
# Version format is YYYY-MM-DD, so string comparison works
⋮----
class OAuthClientProvider(httpx.Auth)
⋮----
"""
    OAuth2 authentication for httpx.
    Handles OAuth flow with automatic client registration and token storage.
    """
⋮----
requires_response_body = True
⋮----
"""Initialize OAuth2 authentication."""
⋮----
async def _discover_protected_resource(self) -> httpx.Request
⋮----
"""Build discovery request for protected resource metadata."""
auth_base_url = self.context.get_authorization_base_url(self.context.server_url)
url = urljoin(auth_base_url, "/.well-known/oauth-protected-resource")
⋮----
async def _handle_protected_resource_response(self, response: httpx.Response) -> None
⋮----
"""Handle discovery response."""
⋮----
content = await response.aread()
metadata = ProtectedResourceMetadata.model_validate_json(content)
⋮----
def _build_well_known_path(self, pathname: str) -> str
⋮----
"""Construct well-known path for OAuth metadata discovery."""
well_known_path = f"/.well-known/oauth-authorization-server{pathname}"
⋮----
# Strip trailing slash from pathname to avoid double slashes
well_known_path = well_known_path[:-1]
⋮----
def _should_attempt_fallback(self, response_status: int, pathname: str) -> bool
⋮----
"""Determine if fallback to root discovery should be attempted."""
⋮----
async def _try_metadata_discovery(self, url: str) -> httpx.Request
⋮----
"""Build metadata discovery request for a specific URL."""
⋮----
async def _discover_oauth_metadata(self) -> httpx.Request
⋮----
"""Build OAuth metadata discovery request with fallback support."""
⋮----
auth_server_url = self.context.auth_server_url
⋮----
auth_server_url = self.context.server_url
⋮----
# Per RFC 8414, try path-aware discovery first
parsed = urlparse(auth_server_url)
well_known_path = self._build_well_known_path(parsed.path)
base_url = f"{parsed.scheme}://{parsed.netloc}"
url = urljoin(base_url, well_known_path)
⋮----
# Store fallback info for use in response handler
⋮----
async def _discover_oauth_metadata_fallback(self) -> httpx.Request
⋮----
"""Build fallback OAuth metadata discovery request for legacy servers."""
base_url = getattr(self.context, "discovery_base_url", "")
⋮----
# Fallback to root discovery for legacy servers
url = urljoin(base_url, "/.well-known/oauth-authorization-server")
⋮----
async def _handle_oauth_metadata_response(self, response: httpx.Response, is_fallback: bool = False) -> bool
⋮----
"""Handle OAuth metadata response. Returns True if handled successfully."""
⋮----
metadata = OAuthMetadata.model_validate_json(content)
⋮----
# Apply default scope if none specified
⋮----
# Check if we should attempt fallback (404 on path-aware discovery)
⋮----
return False  # Signal that fallback should be attempted
⋮----
return True  # Signal no fallback needed (either success or non-404 error)
⋮----
async def _register_client(self) -> httpx.Request | None
⋮----
"""Build registration request or skip if already registered."""
⋮----
registration_url = str(self.context.oauth_metadata.registration_endpoint)
⋮----
registration_url = urljoin(auth_base_url, "/register")
⋮----
registration_data = self.context.client_metadata.model_dump(by_alias=True, mode="json", exclude_none=True)
⋮----
async def _handle_registration_response(self, response: httpx.Response) -> None
⋮----
"""Handle registration response."""
⋮----
client_info = OAuthClientInformationFull.model_validate_json(content)
⋮----
async def _perform_authorization(self) -> tuple[str, str]
⋮----
"""Perform the authorization redirect and get auth code."""
⋮----
auth_endpoint = str(self.context.oauth_metadata.authorization_endpoint)
⋮----
auth_endpoint = urljoin(auth_base_url, "/authorize")
⋮----
# Generate PKCE parameters
pkce_params = PKCEParameters.generate()
state = secrets.token_urlsafe(32)
⋮----
auth_params = {
⋮----
# Only include resource param if conditions are met
⋮----
auth_params["resource"] = self.context.get_resource_url()  # RFC 8707
⋮----
authorization_url = f"{auth_endpoint}?{urlencode(auth_params)}"
⋮----
# Wait for callback
⋮----
# Return auth code and code verifier for token exchange
⋮----
async def _exchange_token(self, auth_code: str, code_verifier: str) -> httpx.Request
⋮----
"""Build token exchange request."""
⋮----
token_url = str(self.context.oauth_metadata.token_endpoint)
⋮----
token_url = urljoin(auth_base_url, "/token")
⋮----
token_data = {
⋮----
token_data["resource"] = self.context.get_resource_url()  # RFC 8707
⋮----
async def _handle_token_response(self, response: httpx.Response) -> None
⋮----
"""Handle token exchange response."""
⋮----
token_response = OAuthToken.model_validate_json(content)
⋮----
# Validate scopes
⋮----
requested_scopes = set(self.context.client_metadata.scope.split())
returned_scopes = set(token_response.scope.split())
unauthorized_scopes = returned_scopes - requested_scopes
⋮----
async def _refresh_token(self) -> httpx.Request
⋮----
"""Build token refresh request."""
⋮----
refresh_data = {
⋮----
refresh_data["resource"] = self.context.get_resource_url()  # RFC 8707
⋮----
async def _handle_refresh_response(self, response: httpx.Response) -> bool
⋮----
"""Handle token refresh response. Returns True if successful."""
⋮----
async def _initialize(self) -> None
⋮----
"""Load stored tokens and client info."""
⋮----
def _add_auth_header(self, request: httpx.Request) -> None
⋮----
"""Add authorization header to request if we have valid tokens."""
⋮----
async def async_auth_flow(self, request: httpx.Request) -> AsyncGenerator[httpx.Request, httpx.Response]
⋮----
"""HTTPX auth flow integration."""
⋮----
# Capture protocol version from request headers
⋮----
# Perform OAuth flow if not authenticated
⋮----
# OAuth flow must be inline due to generator constraints
# Step 1: Discover protected resource metadata (spec revision 2025-06-18)
discovery_request = await self._discover_protected_resource()
discovery_response = yield discovery_request
⋮----
# Step 2: Discover OAuth metadata (with fallback for legacy servers)
oauth_request = await self._discover_oauth_metadata()
oauth_response = yield oauth_request
handled = await self._handle_oauth_metadata_response(oauth_response, is_fallback=False)
⋮----
# If path-aware discovery failed with 404, try fallback to root
⋮----
fallback_request = await self._discover_oauth_metadata_fallback()
fallback_response = yield fallback_request
⋮----
# Step 3: Register client if needed
registration_request = await self._register_client()
⋮----
registration_response = yield registration_request
⋮----
# Step 4: Perform authorization
⋮----
# Step 5: Exchange authorization code for tokens
token_request = await self._exchange_token(auth_code, code_verifier)
token_response = yield token_request
⋮----
# Add authorization header and make request
⋮----
response = yield request
⋮----
# Handle 401 responses
⋮----
# Try to refresh token
refresh_request = await self._refresh_token()
refresh_response = yield refresh_request
⋮----
# Retry original request with new token
⋮----
# Refresh failed, need full re-authentication
⋮----
# Retry with new tokens
````

## File: src/mcp/client/session_group.py
````python
"""
SessionGroup concurrently manages multiple MCP session connections.

Tools, resources, and prompts are aggregated across servers. Servers may
be connected to or disconnected from at any point after initialization.

This abstractions can handle naming collisions using a custom user-provided
hook.
"""
⋮----
class SseServerParameters(BaseModel)
⋮----
"""Parameters for intializing a sse_client."""
⋮----
# The endpoint URL.
url: str
⋮----
# Optional headers to include in requests.
headers: dict[str, Any] | None = None
⋮----
# HTTP timeout for regular operations.
timeout: float = 5
⋮----
# Timeout for SSE read operations.
sse_read_timeout: float = 60 * 5
⋮----
class StreamableHttpParameters(BaseModel)
⋮----
"""Parameters for intializing a streamablehttp_client."""
⋮----
timeout: timedelta = timedelta(seconds=30)
⋮----
sse_read_timeout: timedelta = timedelta(seconds=60 * 5)
⋮----
# Close the client session when the transport closes.
terminate_on_close: bool = True
⋮----
ServerParameters: TypeAlias = StdioServerParameters | SseServerParameters | StreamableHttpParameters
⋮----
class ClientSessionGroup
⋮----
"""Client for managing connections to multiple MCP servers.

    This class is responsible for encapsulating management of server connections.
    It aggregates tools, resources, and prompts from all connected servers.

    For auxiliary handlers, such as resource subscription, this is delegated to
    the client and can be accessed via the session.

    Example Usage:
        name_fn = lambda name, server_info: f"{(server_info.name)}_{name}"
        async with ClientSessionGroup(component_name_hook=name_fn) as group:
            for server_params in server_params:
                await group.connect_to_server(server_param)
            ...

    """
⋮----
class _ComponentNames(BaseModel)
⋮----
"""Used for reverse index to find components."""
⋮----
prompts: set[str] = set()
resources: set[str] = set()
tools: set[str] = set()
⋮----
# Standard MCP components.
_prompts: dict[str, types.Prompt]
_resources: dict[str, types.Resource]
_tools: dict[str, types.Tool]
⋮----
# Client-server connection management.
_sessions: dict[mcp.ClientSession, _ComponentNames]
_tool_to_session: dict[str, mcp.ClientSession]
_exit_stack: contextlib.AsyncExitStack
_session_exit_stacks: dict[mcp.ClientSession, contextlib.AsyncExitStack]
⋮----
# Optional fn consuming (component_name, serverInfo) for custom names.
# This is provide a means to mitigate naming conflicts across servers.
# Example: (tool_name, serverInfo) => "{result.serverInfo.name}.{tool_name}"
_ComponentNameHook: TypeAlias = Callable[[str, types.Implementation], str]
_component_name_hook: _ComponentNameHook | None
⋮----
"""Initializes the MCP client."""
⋮----
async def __aenter__(self) -> Self
⋮----
# Enter the exit stack only if we created it ourselves
⋮----
"""Closes session exit stacks and main exit stack upon completion."""
⋮----
# Only close the main exit stack if we created it
⋮----
# Concurrently close session stacks.
⋮----
@property
    def sessions(self) -> list[mcp.ClientSession]
⋮----
"""Returns the list of sessions being managed."""
⋮----
@property
    def prompts(self) -> dict[str, types.Prompt]
⋮----
"""Returns the prompts as a dictionary of names to prompts."""
⋮----
@property
    def resources(self) -> dict[str, types.Resource]
⋮----
"""Returns the resources as a dictionary of names to resources."""
⋮----
@property
    def tools(self) -> dict[str, types.Tool]
⋮----
"""Returns the tools as a dictionary of names to tools."""
⋮----
async def call_tool(self, name: str, args: dict[str, Any]) -> types.CallToolResult
⋮----
"""Executes a tool given its name and arguments."""
session = self._tool_to_session[name]
session_tool_name = self.tools[name].name
⋮----
async def disconnect_from_server(self, session: mcp.ClientSession) -> None
⋮----
"""Disconnects from a single MCP server."""
⋮----
session_known_for_components = session in self._sessions
session_known_for_stack = session in self._session_exit_stacks
⋮----
component_names = self._sessions.pop(session)  # Pop from _sessions tracking
⋮----
# Remove prompts associated with the session.
⋮----
# Remove resources associated with the session.
⋮----
# Remove tools associated with the session.
⋮----
# Clean up the session's resources via its dedicated exit stack
⋮----
session_stack_to_close = self._session_exit_stacks.pop(session)
⋮----
"""Connects to a single MCP server."""
⋮----
"""Establish a client session to an MCP server."""
⋮----
session_stack = contextlib.AsyncExitStack()
⋮----
# Create read and write streams that facilitate io with the server.
⋮----
client = mcp.stdio_client(server_params)
⋮----
client = sse_client(
⋮----
client = streamablehttp_client(
⋮----
session = await session_stack.enter_async_context(mcp.ClientSession(read, write))
result = await session.initialize()
⋮----
# Session successfully initialized.
# Store its stack and register the stack with the main group stack.
⋮----
# session_stack itself becomes a resource managed by the
# main _exit_stack.
⋮----
# If anything during this setup fails, ensure the session-specific
# stack is closed.
⋮----
async def _aggregate_components(self, server_info: types.Implementation, session: mcp.ClientSession) -> None
⋮----
"""Aggregates prompts, resources, and tools from a given session."""
⋮----
# Create a reverse index so we can find all prompts, resources, and
# tools belonging to this session. Used for removing components from
# the session group via self.disconnect_from_server.
component_names = self._ComponentNames()
⋮----
# Temporary components dicts. We do not want to modify the aggregate
# lists in case of an intermediate failure.
prompts_temp: dict[str, types.Prompt] = {}
resources_temp: dict[str, types.Resource] = {}
tools_temp: dict[str, types.Tool] = {}
tool_to_session_temp: dict[str, mcp.ClientSession] = {}
⋮----
# Query the server for its prompts and aggregate to list.
⋮----
prompts = (await session.list_prompts()).prompts
⋮----
name = self._component_name(prompt.name, server_info)
⋮----
# Query the server for its resources and aggregate to list.
⋮----
resources = (await session.list_resources()).resources
⋮----
name = self._component_name(resource.name, server_info)
⋮----
# Query the server for its tools and aggregate to list.
⋮----
tools = (await session.list_tools()).tools
⋮----
name = self._component_name(tool.name, server_info)
⋮----
# Clean up exit stack for session if we couldn't retrieve anything
# from the server.
⋮----
# Check for duplicates.
matching_prompts = prompts_temp.keys() & self._prompts.keys()
⋮----
matching_resources = resources_temp.keys() & self._resources.keys()
⋮----
matching_tools = tools_temp.keys() & self._tools.keys()
⋮----
# Aggregate components.
⋮----
def _component_name(self, name: str, server_info: types.Implementation) -> str
````

## File: src/mcp/client/session.py
````python
DEFAULT_CLIENT_INFO = types.Implementation(name="mcp", version="0.1.0")
⋮----
logger = logging.getLogger("client")
⋮----
class SamplingFnT(Protocol)
⋮----
class ElicitationFnT(Protocol)
⋮----
class ListRootsFnT(Protocol)
⋮----
class LoggingFnT(Protocol)
⋮----
class MessageHandlerFnT(Protocol)
⋮----
ClientResponse: TypeAdapter[types.ClientResult | types.ErrorData] = TypeAdapter(types.ClientResult | types.ErrorData)
⋮----
class ClientSession(
⋮----
async def initialize(self) -> types.InitializeResult
⋮----
sampling = types.SamplingCapability() if self._sampling_callback is not _default_sampling_callback else None
elicitation = (
roots = (
⋮----
# TODO: Should this be based on whether we
# _will_ send notifications, or only whether
# they're supported?
⋮----
result = await self.send_request(
⋮----
async def send_ping(self) -> types.EmptyResult
⋮----
"""Send a ping request."""
⋮----
"""Send a progress notification."""
⋮----
async def set_logging_level(self, level: types.LoggingLevel) -> types.EmptyResult
⋮----
"""Send a logging/setLevel request."""
⋮----
async def list_resources(self, cursor: str | None = None) -> types.ListResourcesResult
⋮----
"""Send a resources/list request."""
⋮----
async def list_resource_templates(self, cursor: str | None = None) -> types.ListResourceTemplatesResult
⋮----
"""Send a resources/templates/list request."""
⋮----
async def read_resource(self, uri: AnyUrl) -> types.ReadResourceResult
⋮----
"""Send a resources/read request."""
⋮----
async def subscribe_resource(self, uri: AnyUrl) -> types.EmptyResult
⋮----
"""Send a resources/subscribe request."""
⋮----
async def unsubscribe_resource(self, uri: AnyUrl) -> types.EmptyResult
⋮----
"""Send a resources/unsubscribe request."""
⋮----
"""Send a tools/call request with optional progress callback support."""
⋮----
async def _validate_tool_result(self, name: str, result: types.CallToolResult) -> None
⋮----
"""Validate the structured content of a tool result against its output schema."""
⋮----
# refresh output schema cache
⋮----
output_schema = None
⋮----
output_schema = self._tool_output_schemas.get(name)
⋮----
async def list_prompts(self, cursor: str | None = None) -> types.ListPromptsResult
⋮----
"""Send a prompts/list request."""
⋮----
async def get_prompt(self, name: str, arguments: dict[str, str] | None = None) -> types.GetPromptResult
⋮----
"""Send a prompts/get request."""
⋮----
"""Send a completion/complete request."""
context = None
⋮----
context = types.CompletionContext(arguments=context_arguments)
⋮----
async def list_tools(self, cursor: str | None = None) -> types.ListToolsResult
⋮----
"""Send a tools/list request."""
⋮----
# Cache tool output schemas for future validation
# Note: don't clear the cache, as we may be using a cursor
⋮----
async def send_roots_list_changed(self) -> None
⋮----
"""Send a roots/list_changed notification."""
⋮----
async def _received_request(self, responder: RequestResponder[types.ServerRequest, types.ClientResult]) -> None
⋮----
ctx = RequestContext[ClientSession, Any](
⋮----
response = await self._sampling_callback(ctx, params)
client_response = ClientResponse.validate_python(response)
⋮----
response = await self._elicitation_callback(ctx, params)
⋮----
response = await self._list_roots_callback(ctx)
⋮----
"""Handle incoming messages by forwarding to the message handler."""
⋮----
async def _received_notification(self, notification: types.ServerNotification) -> None
⋮----
"""Handle notifications from the server."""
# Process specific notification types
````

## File: src/mcp/client/sse.py
````python
logger = logging.getLogger(__name__)
⋮----
def remove_request_params(url: str) -> str
⋮----
"""
    Client transport for SSE.

    `sse_read_timeout` determines how long (in seconds) the client will wait for a new
    event before disconnecting. All other HTTP operations are controlled by `timeout`.

    Args:
        url: The SSE endpoint URL.
        headers: Optional headers to include in requests.
        timeout: HTTP timeout for regular operations.
        sse_read_timeout: Timeout for SSE read operations.
        auth: Optional HTTPX authentication handler.
    """
read_stream: MemoryObjectReceiveStream[SessionMessage | Exception]
read_stream_writer: MemoryObjectSendStream[SessionMessage | Exception]
⋮----
write_stream: MemoryObjectSendStream[SessionMessage]
write_stream_reader: MemoryObjectReceiveStream[SessionMessage]
⋮----
endpoint_url = urljoin(url, sse.data)
⋮----
url_parsed = urlparse(url)
endpoint_parsed = urlparse(endpoint_url)
⋮----
error_msg = (
⋮----
message = types.JSONRPCMessage.model_validate_json(  # noqa: E501
⋮----
session_message = SessionMessage(message)
⋮----
async def post_writer(endpoint_url: str)
⋮----
response = await client.post(
⋮----
endpoint_url = await tg.start(sse_reader)
````

## File: src/mcp/client/streamable_http.py
````python
"""
StreamableHTTP Client Transport Module

This module implements the StreamableHTTP transport for MCP clients,
providing support for HTTP POST requests with optional SSE streaming responses
and session management.
"""
⋮----
logger = logging.getLogger(__name__)
⋮----
SessionMessageOrError = SessionMessage | Exception
StreamWriter = MemoryObjectSendStream[SessionMessageOrError]
StreamReader = MemoryObjectReceiveStream[SessionMessage]
GetSessionIdCallback = Callable[[], str | None]
⋮----
MCP_SESSION_ID = "mcp-session-id"
MCP_PROTOCOL_VERSION = "mcp-protocol-version"
LAST_EVENT_ID = "last-event-id"
CONTENT_TYPE = "content-type"
ACCEPT = "Accept"
⋮----
JSON = "application/json"
SSE = "text/event-stream"
⋮----
class StreamableHTTPError(Exception)
⋮----
"""Base exception for StreamableHTTP transport errors."""
⋮----
class ResumptionError(StreamableHTTPError)
⋮----
"""Raised when resumption request is invalid."""
⋮----
@dataclass
class RequestContext
⋮----
"""Context for a request operation."""
⋮----
client: httpx.AsyncClient
headers: dict[str, str]
session_id: str | None
session_message: SessionMessage
metadata: ClientMessageMetadata | None
read_stream_writer: StreamWriter
sse_read_timeout: float
⋮----
class StreamableHTTPTransport
⋮----
"""StreamableHTTP client transport implementation."""
⋮----
"""Initialize the StreamableHTTP transport.

        Args:
            url: The endpoint URL.
            headers: Optional headers to include in requests.
            timeout: HTTP timeout for regular operations.
            sse_read_timeout: Timeout for SSE read operations.
            auth: Optional HTTPX authentication handler.
        """
⋮----
def _prepare_request_headers(self, base_headers: dict[str, str]) -> dict[str, str]
⋮----
"""Update headers with session ID and protocol version if available."""
headers = base_headers.copy()
⋮----
def _is_initialization_request(self, message: JSONRPCMessage) -> bool
⋮----
"""Check if the message is an initialization request."""
⋮----
def _is_initialized_notification(self, message: JSONRPCMessage) -> bool
⋮----
"""Check if the message is an initialized notification."""
⋮----
"""Extract and store session ID from response headers."""
new_session_id = response.headers.get(MCP_SESSION_ID)
⋮----
"""Extract protocol version from initialization response message."""
⋮----
# Parse the result as InitializeResult for type safety
init_result = InitializeResult.model_validate(message.root.result)
⋮----
"""Handle an SSE event, returning True if the response is complete."""
⋮----
message = JSONRPCMessage.model_validate_json(sse.data)
⋮----
# Extract protocol version from initialization response
⋮----
# If this is a response and we have original_request_id, replace it
⋮----
session_message = SessionMessage(message)
⋮----
# Call resumption token callback if we have an ID
⋮----
# If this is a response or error return True indicating completion
# Otherwise, return False to continue listening
⋮----
"""Handle GET stream for server-initiated messages."""
⋮----
headers = self._prepare_request_headers(self.request_headers)
⋮----
async def _handle_resumption_request(self, ctx: RequestContext) -> None
⋮----
"""Handle a resumption request using GET with SSE."""
headers = self._prepare_request_headers(ctx.headers)
⋮----
# Extract original request ID to map responses
original_request_id = None
⋮----
original_request_id = ctx.session_message.message.root.id
⋮----
is_complete = await self._handle_sse_event(
⋮----
async def _handle_post_request(self, ctx: RequestContext) -> None
⋮----
"""Handle a POST request with response processing."""
⋮----
message = ctx.session_message.message
is_initialization = self._is_initialization_request(message)
⋮----
content_type = response.headers.get(CONTENT_TYPE, "").lower()
⋮----
"""Handle JSON response from the server."""
⋮----
content = await response.aread()
message = JSONRPCMessage.model_validate_json(content)
⋮----
# Extract protocol version from initialization response
⋮----
"""Handle SSE response from the server."""
⋮----
event_source = EventSource(response)
⋮----
# If the SSE event indicates completion, like returning respose/error
# break the loop
⋮----
"""Handle unexpected content type in response."""
error_msg = f"Unexpected content type: {content_type}"
⋮----
"""Send a session terminated error response."""
jsonrpc_error = JSONRPCError(
session_message = SessionMessage(JSONRPCMessage(jsonrpc_error))
⋮----
"""Handle writing requests to the server."""
⋮----
message = session_message.message
metadata = (
⋮----
# Check if this is a resumption request
is_resumption = bool(metadata and metadata.resumption_token)
⋮----
# Handle initialized notification
⋮----
ctx = RequestContext(
⋮----
async def handle_request_async()
⋮----
# If this is a request, start a new task to handle it
⋮----
async def terminate_session(self, client: httpx.AsyncClient) -> None
⋮----
"""Terminate the session by sending a DELETE request."""
⋮----
response = await client.delete(self.url, headers=headers)
⋮----
def get_session_id(self) -> str | None
⋮----
"""Get the current session ID."""
⋮----
"""
    Client transport for StreamableHTTP.

    `sse_read_timeout` determines how long (in seconds) the client will wait for a new
    event before disconnecting. All other HTTP operations are controlled by `timeout`.

    Yields:
        Tuple containing:
            - read_stream: Stream for reading messages from the server
            - write_stream: Stream for sending messages to the server
            - get_session_id_callback: Function to retrieve the current session ID
    """
transport = StreamableHTTPTransport(url, headers, timeout, sse_read_timeout, auth)
⋮----
# Define callbacks that need access to tg
def start_get_stream() -> None
````

## File: src/mcp/client/websocket.py
````python
logger = logging.getLogger(__name__)
⋮----
"""
    WebSocket client transport for MCP, symmetrical to the server version.

    Connects to 'url' using the 'mcp' subprotocol, then yields:
        (read_stream, write_stream)

    - read_stream: As you read from this stream, you'll receive either valid
      JSONRPCMessage objects or Exception objects (when validation fails).
    - write_stream: Write JSONRPCMessage objects to this stream to send them
      over the WebSocket to the server.
    """
⋮----
# Create two in-memory streams:
# - One for incoming messages (read_stream, written by ws_reader)
# - One for outgoing messages (write_stream, read by ws_writer)
read_stream: MemoryObjectReceiveStream[SessionMessage | Exception]
read_stream_writer: MemoryObjectSendStream[SessionMessage | Exception]
write_stream: MemoryObjectSendStream[SessionMessage]
write_stream_reader: MemoryObjectReceiveStream[SessionMessage]
⋮----
# Connect using websockets, requesting the "mcp" subprotocol
⋮----
async def ws_reader()
⋮----
"""
            Reads text messages from the WebSocket, parses them as JSON-RPC messages,
            and sends them into read_stream_writer.
            """
⋮----
message = types.JSONRPCMessage.model_validate_json(raw_text)
session_message = SessionMessage(message)
⋮----
# If JSON parse or model validation fails, send the exception
⋮----
async def ws_writer()
⋮----
"""
            Reads JSON-RPC messages from write_stream_reader and
            sends them to the server.
            """
⋮----
# Convert to a dict, then to JSON
msg_dict = session_message.message.model_dump(by_alias=True, mode="json", exclude_none=True)
⋮----
# Start reader and writer tasks
⋮----
# Yield the receive/send streams
⋮----
# Once the caller's 'async with' block exits, we shut down
````

## File: src/mcp/server/auth/handlers/__init__.py
````python
"""
Request handlers for MCP authorization endpoints.
"""
````

## File: src/mcp/server/auth/handlers/authorize.py
````python
logger = logging.getLogger(__name__)
⋮----
class AuthorizationRequest(BaseModel)
⋮----
# See https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.1
client_id: str = Field(..., description="The client ID")
redirect_uri: AnyUrl | None = Field(None, description="URL to redirect to after authorization")
⋮----
# see OAuthClientMetadata; we only support `code`
response_type: Literal["code"] = Field(..., description="Must be 'code' for authorization code flow")
code_challenge: str = Field(..., description="PKCE code challenge")
code_challenge_method: Literal["S256"] = Field("S256", description="PKCE code challenge method, must be S256")
state: str | None = Field(None, description="Optional state parameter")
scope: str | None = Field(
resource: str | None = Field(
⋮----
class AuthorizationErrorResponse(BaseModel)
⋮----
error: AuthorizationErrorCode
error_description: str | None
error_uri: AnyUrl | None = None
# must be set if provided in the request
state: str | None = None
⋮----
def best_effort_extract_string(key: str, params: None | FormData | QueryParams) -> str | None
⋮----
value = params.get(key)
⋮----
class AnyUrlModel(RootModel[AnyUrl])
⋮----
root: AnyUrl
⋮----
@dataclass
class AuthorizationHandler
⋮----
provider: OAuthAuthorizationServerProvider[Any, Any, Any]
⋮----
async def handle(self, request: Request) -> Response
⋮----
# implements authorization requests for grant_type=code;
# see https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.1
⋮----
state = None
redirect_uri = None
client = None
params = None
⋮----
# Error responses take two different formats:
# 1. The request has a valid client ID & redirect_uri: we issue a redirect
#    back to the redirect_uri with the error response fields as query
#    parameters. This allows the client to be notified of the error.
# 2. Otherwise, we return an error response directly to the end user;
#     we choose to do so in JSON, but this is left undefined in the
#     specification.
# See https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2.1
#
# This logic is a bit awkward to handle, because the error might be thrown
# very early in request validation, before we've done the usual Pydantic
# validation, loaded the client, etc. To handle this, error_response()
# contains fallback logic which attempts to load the parameters directly
# from the request.
⋮----
# make last-ditch attempt to load the client
client_id = best_effort_extract_string("client_id", params)
client = client_id and await self.provider.get_client(client_id)
⋮----
# make last-ditch effort to load the redirect uri
⋮----
raw_redirect_uri = None
⋮----
raw_redirect_uri = AnyUrlModel.model_validate(
redirect_uri = client.validate_redirect_uri(raw_redirect_uri)
⋮----
# if the redirect URI is invalid, ignore it & just return the
# initial error
⋮----
# the error response MUST contain the state specified by the client, if any
⋮----
# make last-ditch effort to load state
state = best_effort_extract_string("state", params)
⋮----
error_resp = AuthorizationErrorResponse(
⋮----
# Parse request parameters
⋮----
# Convert query_params to dict for pydantic validation
params = request.query_params
⋮----
# Parse form data for POST requests
params = await request.form()
⋮----
# Save state if it exists, even before validation
⋮----
auth_request = AuthorizationRequest.model_validate(params)
state = auth_request.state  # Update with validated state
⋮----
error: AuthorizationErrorCode = "invalid_request"
⋮----
error = "unsupported_response_type"
⋮----
# Get client information
client = await self.provider.get_client(
⋮----
# For client_id validation errors, return direct error (no redirect)
⋮----
# Validate redirect_uri against client's registered URIs
⋮----
redirect_uri = client.validate_redirect_uri(auth_request.redirect_uri)
⋮----
# For redirect_uri validation errors, return direct error (no redirect)
⋮----
# Validate scope - for scope errors, we can redirect
⋮----
scopes = client.validate_scope(auth_request.scope)
⋮----
# For scope errors, redirect with error parameters
⋮----
# Setup authorization parameters
auth_params = AuthorizationParams(
⋮----
resource=auth_request.resource,  # RFC 8707
⋮----
# Let the provider pick the next URI to redirect to
⋮----
# Handle authorization errors as defined in RFC 6749 Section 4.1.2.1
⋮----
# Catch-all for unexpected errors
````

## File: src/mcp/server/auth/handlers/metadata.py
````python
@dataclass
class MetadataHandler
⋮----
metadata: OAuthMetadata
⋮----
async def handle(self, request: Request) -> Response
⋮----
headers={"Cache-Control": "public, max-age=3600"},  # Cache for 1 hour
⋮----
@dataclass
class ProtectedResourceMetadataHandler
⋮----
metadata: ProtectedResourceMetadata
````

## File: src/mcp/server/auth/handlers/register.py
````python
class RegistrationRequest(RootModel[OAuthClientMetadata])
⋮----
# this wrapper is a no-op; it's just to separate out the types exposed to the
# provider from what we use in the HTTP handler
root: OAuthClientMetadata
⋮----
class RegistrationErrorResponse(BaseModel)
⋮----
error: RegistrationErrorCode
error_description: str | None
⋮----
@dataclass
class RegistrationHandler
⋮----
provider: OAuthAuthorizationServerProvider[Any, Any, Any]
options: ClientRegistrationOptions
⋮----
async def handle(self, request: Request) -> Response
⋮----
# Implements dynamic client registration as defined in https://datatracker.ietf.org/doc/html/rfc7591#section-3.1
⋮----
# Parse request body as JSON
body = await request.json()
client_metadata = OAuthClientMetadata.model_validate(body)
⋮----
# Scope validation is handled below
⋮----
client_id = str(uuid4())
client_secret = None
⋮----
# cryptographically secure random 32-byte hex string
client_secret = secrets.token_hex(32)
⋮----
requested_scopes = set(client_metadata.scope.split())
valid_scopes = set(self.options.valid_scopes)
⋮----
client_id_issued_at = int(time.time())
client_secret_expires_at = (
⋮----
client_info = OAuthClientInformationFull(
⋮----
# passthrough information from the client request
⋮----
# Register client
⋮----
# Return client information
⋮----
# Handle registration errors as defined in RFC 7591 Section 3.2.2
````

## File: src/mcp/server/auth/handlers/revoke.py
````python
class RevocationRequest(BaseModel)
⋮----
"""
    # See https://datatracker.ietf.org/doc/html/rfc7009#section-2.1
    """
⋮----
token: str
token_type_hint: Literal["access_token", "refresh_token"] | None = None
client_id: str
client_secret: str | None
⋮----
class RevocationErrorResponse(BaseModel)
⋮----
error: Literal["invalid_request", "unauthorized_client"]
error_description: str | None = None
⋮----
@dataclass
class RevocationHandler
⋮----
provider: OAuthAuthorizationServerProvider[Any, Any, Any]
client_authenticator: ClientAuthenticator
⋮----
async def handle(self, request: Request) -> Response
⋮----
"""
        Handler for the OAuth 2.0 Token Revocation endpoint.
        """
⋮----
form_data = await request.form()
revocation_request = RevocationRequest.model_validate(dict(form_data))
⋮----
# Authenticate client
⋮----
client = await self.client_authenticator.authenticate(
⋮----
loaders = [
⋮----
loaders = reversed(loaders)
⋮----
token: None | AccessToken | RefreshToken = None
⋮----
token = await loader(revocation_request.token)
⋮----
# if token is not found, just return HTTP 200 per the RFC
⋮----
# Revoke token; provider is not meant to be able to do validation
# at this point that would result in an error
⋮----
# Return successful empty response
````

## File: src/mcp/server/auth/handlers/token.py
````python
class AuthorizationCodeRequest(BaseModel)
⋮----
# See https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.3
grant_type: Literal["authorization_code"]
code: str = Field(..., description="The authorization code")
redirect_uri: AnyUrl | None = Field(None, description="Must be the same as redirect URI provided in /authorize")
client_id: str
# we use the client_secret param, per https://datatracker.ietf.org/doc/html/rfc6749#section-2.3.1
client_secret: str | None = None
# See https://datatracker.ietf.org/doc/html/rfc7636#section-4.5
code_verifier: str = Field(..., description="PKCE code verifier")
# RFC 8707 resource indicator
resource: str | None = Field(None, description="Resource indicator for the token")
⋮----
class RefreshTokenRequest(BaseModel)
⋮----
# See https://datatracker.ietf.org/doc/html/rfc6749#section-6
grant_type: Literal["refresh_token"]
refresh_token: str = Field(..., description="The refresh token")
scope: str | None = Field(None, description="Optional scope parameter")
⋮----
class TokenRequest(
⋮----
root: Annotated[
⋮----
class TokenErrorResponse(BaseModel)
⋮----
"""
    See https://datatracker.ietf.org/doc/html/rfc6749#section-5.2
    """
⋮----
error: TokenErrorCode
error_description: str | None = None
error_uri: AnyHttpUrl | None = None
⋮----
class TokenSuccessResponse(RootModel[OAuthToken])
⋮----
# this is just a wrapper over OAuthToken; the only reason we do this
# is to have some separation between the HTTP response type, and the
# type returned by the provider
root: OAuthToken
⋮----
@dataclass
class TokenHandler
⋮----
provider: OAuthAuthorizationServerProvider[Any, Any, Any]
client_authenticator: ClientAuthenticator
⋮----
def response(self, obj: TokenSuccessResponse | TokenErrorResponse)
⋮----
status_code = 200
⋮----
status_code = 400
⋮----
async def handle(self, request: Request)
⋮----
form_data = await request.form()
token_request = TokenRequest.model_validate(dict(form_data)).root
⋮----
client_info = await self.client_authenticator.authenticate(
⋮----
tokens: OAuthToken
⋮----
auth_code = await self.provider.load_authorization_code(client_info, token_request.code)
⋮----
# if code belongs to different client, pretend it doesn't exist
⋮----
# make auth codes expire after a deadline
# see https://datatracker.ietf.org/doc/html/rfc6749#section-10.5
⋮----
# verify redirect_uri doesn't change between /authorize and /tokens
# see https://datatracker.ietf.org/doc/html/rfc6749#section-10.6
⋮----
authorize_request_redirect_uri = auth_code.redirect_uri
⋮----
authorize_request_redirect_uri = None
⋮----
# Convert both sides to strings for comparison to handle AnyUrl vs string issues
token_redirect_str = str(token_request.redirect_uri) if token_request.redirect_uri is not None else None
auth_redirect_str = (
⋮----
# Verify PKCE code verifier
sha256 = hashlib.sha256(token_request.code_verifier.encode()).digest()
hashed_code_verifier = base64.urlsafe_b64encode(sha256).decode().rstrip("=")
⋮----
# see https://datatracker.ietf.org/doc/html/rfc7636#section-4.6
⋮----
# Exchange authorization code for tokens
tokens = await self.provider.exchange_authorization_code(client_info, auth_code)
⋮----
refresh_token = await self.provider.load_refresh_token(client_info, token_request.refresh_token)
⋮----
# if token belongs to different client, pretend it doesn't exist
⋮----
# if the refresh token has expired, pretend it doesn't exist
⋮----
# Parse scopes if provided
scopes = token_request.scope.split(" ") if token_request.scope else refresh_token.scopes
⋮----
# Exchange refresh token for new tokens
tokens = await self.provider.exchange_refresh_token(client_info, refresh_token, scopes)
````

## File: src/mcp/server/auth/middleware/__init__.py
````python
"""
Middleware for MCP authorization.
"""
````

## File: src/mcp/server/auth/middleware/auth_context.py
````python
# Create a contextvar to store the authenticated user
# The default is None, indicating no authenticated user is present
auth_context_var = contextvars.ContextVar[AuthenticatedUser | None]("auth_context", default=None)
⋮----
def get_access_token() -> AccessToken | None
⋮----
"""
    Get the access token from the current context.

    Returns:
        The access token if an authenticated user is available, None otherwise.
    """
auth_user = auth_context_var.get()
⋮----
class AuthContextMiddleware
⋮----
"""
    Middleware that extracts the authenticated user from the request
    and sets it in a contextvar for easy access throughout the request lifecycle.

    This middleware should be added after the AuthenticationMiddleware in the
    middleware stack to ensure that the user is properly authenticated before
    being stored in the context.
    """
⋮----
def __init__(self, app: ASGIApp)
⋮----
async def __call__(self, scope: Scope, receive: Receive, send: Send)
⋮----
user = scope.get("user")
⋮----
# Set the authenticated user in the contextvar
token = auth_context_var.set(user)
⋮----
# No authenticated user, just process the request
````

## File: src/mcp/server/auth/middleware/bearer_auth.py
````python
class AuthenticatedUser(SimpleUser)
⋮----
"""User with authentication info."""
⋮----
def __init__(self, auth_info: AccessToken)
⋮----
class BearerAuthBackend(AuthenticationBackend)
⋮----
"""
    Authentication backend that validates Bearer tokens using a TokenVerifier.
    """
⋮----
def __init__(self, token_verifier: TokenVerifier)
⋮----
async def authenticate(self, conn: HTTPConnection)
⋮----
auth_header = next(
⋮----
token = auth_header[7:]  # Remove "Bearer " prefix
⋮----
# Validate the token with the verifier
auth_info = await self.token_verifier.verify_token(token)
⋮----
class RequireAuthMiddleware
⋮----
"""
    Middleware that requires a valid Bearer token in the Authorization header.

    This will validate the token with the auth provider and store the resulting
    auth info in the request state.
    """
⋮----
"""
        Initialize the middleware.

        Args:
            app: ASGI application
            required_scopes: List of scopes that the token must have
            resource_metadata_url: Optional protected resource metadata URL for WWW-Authenticate header
        """
⋮----
async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None
⋮----
auth_user = scope.get("user")
⋮----
auth_credentials = scope.get("auth")
⋮----
# auth_credentials should always be provided; this is just paranoia
⋮----
async def _send_auth_error(self, send: Send, status_code: int, error: str, description: str) -> None
⋮----
"""Send an authentication error response with WWW-Authenticate header."""
# Build WWW-Authenticate header value
www_auth_parts = [f'error="{error}"', f'error_description="{description}"']
⋮----
www_authenticate = f"Bearer {', '.join(www_auth_parts)}"
⋮----
# Send response
body = {"error": error, "error_description": description}
body_bytes = json.dumps(body).encode()
````

## File: src/mcp/server/auth/middleware/client_auth.py
````python
class AuthenticationError(Exception)
⋮----
def __init__(self, message: str)
⋮----
class ClientAuthenticator
⋮----
"""
    ClientAuthenticator is a callable which validates requests from a client
    application, used to verify /token calls.
    If, during registration, the client requested to be issued a secret, the
    authenticator asserts that /token calls must be authenticated with
    that same token.
    NOTE: clients can opt for no authentication during registration, in which case this
    logic is skipped.
    """
⋮----
def __init__(self, provider: OAuthAuthorizationServerProvider[Any, Any, Any])
⋮----
"""
        Initialize the dependency.

        Args:
            provider: Provider to look up client information
        """
⋮----
async def authenticate(self, client_id: str, client_secret: str | None) -> OAuthClientInformationFull
⋮----
# Look up client information
client = await self.provider.get_client(client_id)
⋮----
# If client from the store expects a secret, validate that the request provides
# that secret
````

## File: src/mcp/server/auth/__init__.py
````python
"""
MCP OAuth server authorization components.
"""
````

## File: src/mcp/server/auth/errors.py
````python
def stringify_pydantic_error(validation_error: ValidationError) -> str
````

## File: src/mcp/server/auth/json_response.py
````python
class PydanticJSONResponse(JSONResponse)
⋮----
# use pydantic json serialization instead of the stock `json.dumps`,
# so that we can handle serializing pydantic models like AnyHttpUrl
def render(self, content: Any) -> bytes
````

## File: src/mcp/server/auth/provider.py
````python
class AuthorizationParams(BaseModel)
⋮----
state: str | None
scopes: list[str] | None
code_challenge: str
redirect_uri: AnyUrl
redirect_uri_provided_explicitly: bool
resource: str | None = None  # RFC 8707 resource indicator
⋮----
class AuthorizationCode(BaseModel)
⋮----
code: str
scopes: list[str]
expires_at: float
client_id: str
⋮----
class RefreshToken(BaseModel)
⋮----
token: str
⋮----
expires_at: int | None = None
⋮----
class AccessToken(BaseModel)
⋮----
RegistrationErrorCode = Literal[
⋮----
@dataclass(frozen=True)
class RegistrationError(Exception)
⋮----
error: RegistrationErrorCode
error_description: str | None = None
⋮----
AuthorizationErrorCode = Literal[
⋮----
@dataclass(frozen=True)
class AuthorizeError(Exception)
⋮----
error: AuthorizationErrorCode
⋮----
TokenErrorCode = Literal[
⋮----
@dataclass(frozen=True)
class TokenError(Exception)
⋮----
error: TokenErrorCode
⋮----
class TokenVerifier(Protocol)
⋮----
"""Protocol for verifying bearer tokens."""
⋮----
async def verify_token(self, token: str) -> AccessToken | None
⋮----
"""Verify a bearer token and return access info if valid."""
⋮----
# NOTE: FastMCP doesn't render any of these types in the user response, so it's
# OK to add fields to subclasses which should not be exposed externally.
AuthorizationCodeT = TypeVar("AuthorizationCodeT", bound=AuthorizationCode)
RefreshTokenT = TypeVar("RefreshTokenT", bound=RefreshToken)
AccessTokenT = TypeVar("AccessTokenT", bound=AccessToken)
⋮----
class OAuthAuthorizationServerProvider(Protocol, Generic[AuthorizationCodeT, RefreshTokenT, AccessTokenT])
⋮----
async def get_client(self, client_id: str) -> OAuthClientInformationFull | None
⋮----
"""
        Retrieves client information by client ID.

        Implementors MAY raise NotImplementedError if dynamic client registration is
        disabled in ClientRegistrationOptions.

        Args:
            client_id: The ID of the client to retrieve.

        Returns:
            The client information, or None if the client does not exist.
        """
⋮----
async def register_client(self, client_info: OAuthClientInformationFull) -> None
⋮----
"""
        Saves client information as part of registering it.

        Implementors MAY raise NotImplementedError if dynamic client registration is
        disabled in ClientRegistrationOptions.

        Args:
            client_info: The client metadata to register.

        Raises:
            RegistrationError: If the client metadata is invalid.
        """
⋮----
async def authorize(self, client: OAuthClientInformationFull, params: AuthorizationParams) -> str
⋮----
"""
        Called as part of the /authorize endpoint, and returns a URL that the client
        will be redirected to.
        Many MCP implementations will redirect to a third-party provider to perform
        a second OAuth exchange with that provider. In this sort of setup, the client
        has an OAuth connection with the MCP server, and the MCP server has an OAuth
        connection with the 3rd-party provider. At the end of this flow, the client
        should be redirected to the redirect_uri from params.redirect_uri.

        +--------+     +------------+     +-------------------+
        |        |     |            |     |                   |
        | Client | --> | MCP Server | --> | 3rd Party OAuth   |
        |        |     |            |     | Server            |
        +--------+     +------------+     +-------------------+
                            |   ^                  |
        +------------+      |   |                  |
        |            |      |   |    Redirect      |
        |redirect_uri|<-----+   +------------------+
        |            |
        +------------+

        Implementations will need to define another handler on the MCP server return
        flow to perform the second redirect, and generate and store an authorization
        code as part of completing the OAuth authorization step.

        Implementations SHOULD generate an authorization code with at least 160 bits of
        entropy,
        and MUST generate an authorization code with at least 128 bits of entropy.
        See https://datatracker.ietf.org/doc/html/rfc6749#section-10.10.

        Args:
            client: The client requesting authorization.
            params: The parameters of the authorization request.

        Returns:
            A URL to redirect the client to for authorization.

        Raises:
            AuthorizeError: If the authorization request is invalid.
        """
⋮----
"""
        Loads an AuthorizationCode by its code.

        Args:
            client: The client that requested the authorization code.
            authorization_code: The authorization code to get the challenge for.

        Returns:
            The AuthorizationCode, or None if not found
        """
⋮----
"""
        Exchanges an authorization code for an access token and refresh token.

        Args:
            client: The client exchanging the authorization code.
            authorization_code: The authorization code to exchange.

        Returns:
            The OAuth token, containing access and refresh tokens.

        Raises:
            TokenError: If the request is invalid
        """
⋮----
async def load_refresh_token(self, client: OAuthClientInformationFull, refresh_token: str) -> RefreshTokenT | None
⋮----
"""
        Loads a RefreshToken by its token string.

        Args:
            client: The client that is requesting to load the refresh token.
            refresh_token: The refresh token string to load.

        Returns:
            The RefreshToken object if found, or None if not found.
        """
⋮----
"""
        Exchanges a refresh token for an access token and refresh token.

        Implementations SHOULD rotate both the access token and refresh token.

        Args:
            client: The client exchanging the refresh token.
            refresh_token: The refresh token to exchange.
            scopes: Optional scopes to request with the new access token.

        Returns:
            The OAuth token, containing access and refresh tokens.

        Raises:
            TokenError: If the request is invalid
        """
⋮----
async def load_access_token(self, token: str) -> AccessTokenT | None
⋮----
"""
        Loads an access token by its token.

        Args:
            token: The access token to verify.

        Returns:
            The AuthInfo, or None if the token is invalid.
        """
⋮----
"""
        Revokes an access or refresh token.

        If the given token is invalid or already revoked, this method should do nothing.

        Implementations SHOULD revoke both the access token and its corresponding
        refresh token, regardless of which of the access token or refresh token is
        provided.

        Args:
            token: the token to revoke
        """
⋮----
def construct_redirect_uri(redirect_uri_base: str, **params: str | None) -> str
⋮----
parsed_uri = urlparse(redirect_uri_base)
query_params = [(k, v) for k, vs in parse_qs(parsed_uri.query) for v in vs]
⋮----
redirect_uri = urlunparse(parsed_uri._replace(query=urlencode(query_params)))
⋮----
class ProviderTokenVerifier(TokenVerifier)
⋮----
"""Token verifier that uses an OAuthAuthorizationServerProvider.

    This is provided for backwards compatibility with existing auth_server_provider
    configurations. For new implementations using AS/RS separation, consider using
    the TokenVerifier protocol with a dedicated implementation like IntrospectionTokenVerifier.
    """
⋮----
def __init__(self, provider: "OAuthAuthorizationServerProvider[AuthorizationCode, RefreshToken, AccessToken]")
⋮----
"""Verify token using the provider's load_access_token method."""
````

## File: src/mcp/server/auth/routes.py
````python
from starlette.routing import Route, request_response  # type: ignore
⋮----
def validate_issuer_url(url: AnyHttpUrl)
⋮----
"""
    Validate that the issuer URL meets OAuth 2.0 requirements.

    Args:
        url: The issuer URL to validate

    Raises:
        ValueError: If the issuer URL is invalid
    """
⋮----
# RFC 8414 requires HTTPS, but we allow localhost HTTP for testing
⋮----
# No fragments or query parameters allowed
⋮----
AUTHORIZATION_PATH = "/authorize"
TOKEN_PATH = "/token"
REGISTRATION_PATH = "/register"
REVOCATION_PATH = "/revoke"
⋮----
cors_app = CORSMiddleware(
⋮----
client_registration_options = client_registration_options or ClientRegistrationOptions()
revocation_options = revocation_options or RevocationOptions()
metadata = build_metadata(
client_authenticator = ClientAuthenticator(provider)
⋮----
# Create routes
# Allow CORS requests for endpoints meant to be hit by the OAuth client
# (with the client secret). This is intended to support things like MCP Inspector,
# where the client runs in a web browser.
routes = [
⋮----
# do not allow CORS for authorization endpoint;
# clients should just redirect to this
⋮----
registration_handler = RegistrationHandler(
⋮----
revocation_handler = RevocationHandler(provider, client_authenticator)
⋮----
authorization_url = AnyHttpUrl(str(issuer_url).rstrip("/") + AUTHORIZATION_PATH)
token_url = AnyHttpUrl(str(issuer_url).rstrip("/") + TOKEN_PATH)
⋮----
# Create metadata
metadata = OAuthMetadata(
⋮----
# Add registration endpoint if supported
⋮----
# Add revocation endpoint if supported
⋮----
"""
    Create routes for OAuth 2.0 Protected Resource Metadata (RFC 9728).

    Args:
        resource_url: The URL of this resource server
        authorization_servers: List of authorization servers that can issue tokens
        scopes_supported: Optional list of scopes supported by this resource

    Returns:
        List of Starlette routes for protected resource metadata
    """
⋮----
metadata = ProtectedResourceMetadata(
⋮----
# bearer_methods_supported defaults to ["header"] in the model
⋮----
handler = ProtectedResourceMetadataHandler(metadata)
````

## File: src/mcp/server/auth/settings.py
````python
class ClientRegistrationOptions(BaseModel)
⋮----
enabled: bool = False
client_secret_expiry_seconds: int | None = None
valid_scopes: list[str] | None = None
default_scopes: list[str] | None = None
⋮----
class RevocationOptions(BaseModel)
⋮----
class AuthSettings(BaseModel)
⋮----
issuer_url: AnyHttpUrl = Field(
service_documentation_url: AnyHttpUrl | None = None
client_registration_options: ClientRegistrationOptions | None = None
revocation_options: RevocationOptions | None = None
required_scopes: list[str] | None = None
⋮----
# Resource Server settings (when operating as RS only)
resource_server_url: AnyHttpUrl | None = Field(
````

## File: src/mcp/server/fastmcp/prompts/__init__.py
````python
__all__ = ["Prompt", "PromptManager"]
````

## File: src/mcp/server/fastmcp/prompts/base.py
````python
"""Base classes for FastMCP prompts."""
⋮----
class Message(BaseModel)
⋮----
"""Base class for all prompt messages."""
⋮----
role: Literal["user", "assistant"]
content: ContentBlock
⋮----
def __init__(self, content: str | ContentBlock, **kwargs: Any)
⋮----
content = TextContent(type="text", text=content)
⋮----
class UserMessage(Message)
⋮----
"""A message from the user."""
⋮----
role: Literal["user", "assistant"] = "user"
⋮----
class AssistantMessage(Message)
⋮----
"""A message from the assistant."""
⋮----
role: Literal["user", "assistant"] = "assistant"
⋮----
message_validator = TypeAdapter[UserMessage | AssistantMessage](UserMessage | AssistantMessage)
⋮----
SyncPromptResult = str | Message | dict[str, Any] | Sequence[str | Message | dict[str, Any]]
PromptResult = SyncPromptResult | Awaitable[SyncPromptResult]
⋮----
class PromptArgument(BaseModel)
⋮----
"""An argument that can be passed to a prompt."""
⋮----
name: str = Field(description="Name of the argument")
description: str | None = Field(None, description="Description of what the argument does")
required: bool = Field(default=False, description="Whether the argument is required")
⋮----
class Prompt(BaseModel)
⋮----
"""A prompt template that can be rendered with parameters."""
⋮----
name: str = Field(description="Name of the prompt")
title: str | None = Field(None, description="Human-readable title of the prompt")
description: str | None = Field(None, description="Description of what the prompt does")
arguments: list[PromptArgument] | None = Field(None, description="Arguments that can be passed to the prompt")
fn: Callable[..., PromptResult | Awaitable[PromptResult]] = Field(exclude=True)
⋮----
"""Create a Prompt from a function.

        The function can return:
        - A string (converted to a message)
        - A Message object
        - A dict (converted to a message)
        - A sequence of any of the above
        """
func_name = name or fn.__name__
⋮----
# Get schema from TypeAdapter - will fail if function isn't properly typed
parameters = TypeAdapter(fn).json_schema()
⋮----
# Convert parameters to PromptArguments
arguments: list[PromptArgument] = []
⋮----
required = param_name in parameters.get("required", [])
⋮----
# ensure the arguments are properly cast
fn = validate_call(fn)
⋮----
async def render(self, arguments: dict[str, Any] | None = None) -> list[Message]
⋮----
"""Render the prompt with arguments."""
# Validate required arguments
⋮----
required = {arg.name for arg in self.arguments if arg.required}
provided = set(arguments or {})
missing = required - provided
⋮----
# Call function and check if result is a coroutine
result = self.fn(**(arguments or {}))
⋮----
result = await result
⋮----
# Validate messages
⋮----
result = [result]
⋮----
# Convert result to messages
messages: list[Message] = []
for msg in result:  # type: ignore[reportUnknownVariableType]
⋮----
content = TextContent(type="text", text=msg)
⋮----
content = pydantic_core.to_json(msg, fallback=str, indent=2).decode()
````

## File: src/mcp/server/fastmcp/prompts/manager.py
````python
"""Prompt management functionality."""
⋮----
logger = get_logger(__name__)
⋮----
class PromptManager
⋮----
"""Manages FastMCP prompts."""
⋮----
def __init__(self, warn_on_duplicate_prompts: bool = True)
⋮----
def get_prompt(self, name: str) -> Prompt | None
⋮----
"""Get prompt by name."""
⋮----
def list_prompts(self) -> list[Prompt]
⋮----
"""List all registered prompts."""
⋮----
"""Add a prompt to the manager."""
⋮----
# Check for duplicates
existing = self._prompts.get(prompt.name)
⋮----
async def render_prompt(self, name: str, arguments: dict[str, Any] | None = None) -> list[Message]
⋮----
"""Render a prompt by name with arguments."""
prompt = self.get_prompt(name)
````

## File: src/mcp/server/fastmcp/prompts/prompt_manager.py
````python
"""Prompt management functionality."""
⋮----
logger = get_logger(__name__)
⋮----
class PromptManager
⋮----
"""Manages FastMCP prompts."""
⋮----
def __init__(self, warn_on_duplicate_prompts: bool = True)
⋮----
def add_prompt(self, prompt: Prompt) -> Prompt
⋮----
"""Add a prompt to the manager."""
⋮----
existing = self._prompts.get(prompt.name)
⋮----
def get_prompt(self, name: str) -> Prompt | None
⋮----
"""Get prompt by name."""
⋮----
def list_prompts(self) -> list[Prompt]
⋮----
"""List all registered prompts."""
````

## File: src/mcp/server/fastmcp/resources/__init__.py
````python
__all__ = [
````

## File: src/mcp/server/fastmcp/resources/base.py
````python
"""Base classes and interfaces for FastMCP resources."""
⋮----
class Resource(BaseModel, abc.ABC)
⋮----
"""Base class for all resources."""
⋮----
model_config = ConfigDict(validate_default=True)
⋮----
uri: Annotated[AnyUrl, UrlConstraints(host_required=False)] = Field(default=..., description="URI of the resource")
name: str | None = Field(description="Name of the resource", default=None)
title: str | None = Field(description="Human-readable title of the resource", default=None)
description: str | None = Field(description="Description of the resource", default=None)
mime_type: str = Field(
⋮----
@field_validator("name", mode="before")
@classmethod
    def set_default_name(cls, name: str | None, info: ValidationInfo) -> str
⋮----
"""Set default name from URI if not provided."""
⋮----
@abc.abstractmethod
    async def read(self) -> str | bytes
⋮----
"""Read the resource content."""
````

## File: src/mcp/server/fastmcp/resources/resource_manager.py
````python
"""Resource manager functionality."""
⋮----
logger = get_logger(__name__)
⋮----
class ResourceManager
⋮----
"""Manages FastMCP resources."""
⋮----
def __init__(self, warn_on_duplicate_resources: bool = True)
⋮----
def add_resource(self, resource: Resource) -> Resource
⋮----
"""Add a resource to the manager.

        Args:
            resource: A Resource instance to add

        Returns:
            The added resource. If a resource with the same URI already exists,
            returns the existing resource.
        """
⋮----
existing = self._resources.get(str(resource.uri))
⋮----
"""Add a template from a function."""
template = ResourceTemplate.from_function(
⋮----
async def get_resource(self, uri: AnyUrl | str) -> Resource | None
⋮----
"""Get resource by URI, checking concrete resources first, then templates."""
uri_str = str(uri)
⋮----
# First check concrete resources
⋮----
# Then check templates
⋮----
def list_resources(self) -> list[Resource]
⋮----
"""List all registered resources."""
⋮----
def list_templates(self) -> list[ResourceTemplate]
⋮----
"""List all registered templates."""
````

## File: src/mcp/server/fastmcp/resources/templates.py
````python
"""Resource template functionality."""
⋮----
class ResourceTemplate(BaseModel)
⋮----
"""A template for dynamically creating resources."""
⋮----
uri_template: str = Field(description="URI template with parameters (e.g. weather://{city}/current)")
name: str = Field(description="Name of the resource")
title: str | None = Field(description="Human-readable title of the resource", default=None)
description: str | None = Field(description="Description of what the resource does")
mime_type: str = Field(default="text/plain", description="MIME type of the resource content")
fn: Callable[..., Any] = Field(exclude=True)
parameters: dict[str, Any] = Field(description="JSON schema for function parameters")
⋮----
"""Create a template from a function."""
func_name = name or fn.__name__
⋮----
# Get schema from TypeAdapter - will fail if function isn't properly typed
parameters = TypeAdapter(fn).json_schema()
⋮----
# ensure the arguments are properly cast
fn = validate_call(fn)
⋮----
def matches(self, uri: str) -> dict[str, Any] | None
⋮----
"""Check if URI matches template and extract parameters."""
# Convert template to regex pattern
pattern = self.uri_template.replace("{", "(?P<").replace("}", ">[^/]+)")
match = re.match(f"^{pattern}$", uri)
⋮----
async def create_resource(self, uri: str, params: dict[str, Any]) -> Resource
⋮----
"""Create a resource from the template with the given parameters."""
⋮----
# Call function and check if result is a coroutine
result = self.fn(**params)
⋮----
result = await result
⋮----
uri=uri,  # type: ignore
⋮----
fn=lambda: result,  # Capture result in closure
````

## File: src/mcp/server/fastmcp/resources/types.py
````python
"""Concrete resource implementations."""
⋮----
class TextResource(Resource)
⋮----
"""A resource that reads from a string."""
⋮----
text: str = Field(description="Text content of the resource")
⋮----
async def read(self) -> str
⋮----
"""Read the text content."""
⋮----
class BinaryResource(Resource)
⋮----
"""A resource that reads from bytes."""
⋮----
data: bytes = Field(description="Binary content of the resource")
⋮----
async def read(self) -> bytes
⋮----
"""Read the binary content."""
⋮----
class FunctionResource(Resource)
⋮----
"""A resource that defers data loading by wrapping a function.

    The function is only called when the resource is read, allowing for lazy loading
    of potentially expensive data. This is particularly useful when listing resources,
    as the function won't be called until the resource is actually accessed.

    The function can return:
    - str for text content (default)
    - bytes for binary content
    - other types will be converted to JSON
    """
⋮----
fn: Callable[[], Any] = Field(exclude=True)
⋮----
async def read(self) -> str | bytes
⋮----
"""Read the resource by calling the wrapped function."""
⋮----
result = await self.fn() if inspect.iscoroutinefunction(self.fn) else self.fn()
⋮----
"""Create a FunctionResource from a function."""
func_name = name or fn.__name__
⋮----
# ensure the arguments are properly cast
fn = validate_call(fn)
⋮----
class FileResource(Resource)
⋮----
"""A resource that reads from a file.

    Set is_binary=True to read file as binary data instead of text.
    """
⋮----
path: Path = Field(description="Path to the file")
is_binary: bool = Field(
mime_type: str = Field(
⋮----
@pydantic.field_validator("path")
@classmethod
    def validate_absolute_path(cls, path: Path) -> Path
⋮----
"""Ensure path is absolute."""
⋮----
@pydantic.field_validator("is_binary")
@classmethod
    def set_binary_from_mime_type(cls, is_binary: bool, info: ValidationInfo) -> bool
⋮----
"""Set is_binary based on mime_type if not explicitly set."""
⋮----
mime_type = info.data.get("mime_type", "text/plain")
⋮----
"""Read the file content."""
⋮----
class HttpResource(Resource)
⋮----
"""A resource that reads from an HTTP endpoint."""
⋮----
url: str = Field(description="URL to fetch content from")
mime_type: str = Field(default="application/json", description="MIME type of the resource content")
⋮----
"""Read the HTTP content."""
⋮----
response = await client.get(self.url)
⋮----
class DirectoryResource(Resource)
⋮----
"""A resource that lists files in a directory."""
⋮----
path: Path = Field(description="Path to the directory")
recursive: bool = Field(default=False, description="Whether to list files recursively")
pattern: str | None = Field(default=None, description="Optional glob pattern to filter files")
⋮----
def list_files(self) -> list[Path]
⋮----
"""List files in the directory."""
⋮----
async def read(self) -> str:  # Always returns JSON string
⋮----
"""Read the directory listing."""
⋮----
files = await anyio.to_thread.run_sync(self.list_files)
file_list = [str(f.relative_to(self.path)) for f in files if f.is_file()]
````

## File: src/mcp/server/fastmcp/tools/__init__.py
````python
__all__ = ["Tool", "ToolManager"]
````

## File: src/mcp/server/fastmcp/tools/base.py
````python
class Tool(BaseModel)
⋮----
"""Internal tool registration info."""
⋮----
fn: Callable[..., Any] = Field(exclude=True)
name: str = Field(description="Name of the tool")
title: str | None = Field(None, description="Human-readable title of the tool")
description: str = Field(description="Description of what the tool does")
parameters: dict[str, Any] = Field(description="JSON schema for tool parameters")
fn_metadata: FuncMetadata = Field(
is_async: bool = Field(description="Whether the tool is async")
context_kwarg: str | None = Field(None, description="Name of the kwarg that should receive context")
annotations: ToolAnnotations | None = Field(None, description="Optional annotations for the tool")
⋮----
@cached_property
    def output_schema(self) -> dict[str, Any] | None
⋮----
"""Create a Tool from a function."""
⋮----
func_name = name or fn.__name__
⋮----
func_doc = description or fn.__doc__ or ""
is_async = _is_async_callable(fn)
⋮----
sig = inspect.signature(fn)
⋮----
context_kwarg = param_name
⋮----
func_arg_metadata = func_metadata(
parameters = func_arg_metadata.arg_model.model_json_schema()
⋮----
"""Run the tool with arguments."""
⋮----
result = await self.fn_metadata.call_fn_with_arg_validation(
⋮----
result = self.fn_metadata.convert_result(result)
⋮----
def _is_async_callable(obj: Any) -> bool
⋮----
obj = obj.func
````

## File: src/mcp/server/fastmcp/tools/tool_manager.py
````python
logger = get_logger(__name__)
⋮----
class ToolManager
⋮----
"""Manages FastMCP tools."""
⋮----
def get_tool(self, name: str) -> Tool | None
⋮----
"""Get tool by name."""
⋮----
def list_tools(self) -> list[Tool]
⋮----
"""List all registered tools."""
⋮----
"""Add a tool to the server."""
tool = Tool.from_function(
existing = self._tools.get(tool.name)
⋮----
"""Call a tool by name with arguments."""
tool = self.get_tool(name)
````

## File: src/mcp/server/fastmcp/utilities/__init__.py
````python
"""FastMCP utility modules."""
````

## File: src/mcp/server/fastmcp/utilities/func_metadata.py
````python
logger = get_logger(__name__)
⋮----
class StrictJsonSchema(GenerateJsonSchema)
⋮----
"""A JSON schema generator that raises exceptions instead of emitting warnings.

    This is used to detect non-serializable types during schema generation.
    """
⋮----
def emit_warning(self, kind: JsonSchemaWarningKind, detail: str) -> None
⋮----
# Raise an exception instead of emitting a warning
⋮----
class ArgModelBase(BaseModel)
⋮----
"""A model representing the arguments to a function."""
⋮----
def model_dump_one_level(self) -> dict[str, Any]
⋮----
"""Return a dict of the model's fields, one level deep.

        That is, sub-models etc are not dumped - they are kept as pydantic models.
        """
kwargs: dict[str, Any] = {}
⋮----
model_config = ConfigDict(
⋮----
class FuncMetadata(BaseModel)
⋮----
arg_model: Annotated[type[ArgModelBase], WithJsonSchema(None)]
output_schema: dict[str, Any] | None = None
output_model: Annotated[type[BaseModel], WithJsonSchema(None)] | None = None
wrap_output: bool = False
⋮----
"""Call the given function with arguments validated and injected.

        Arguments are first attempted to be parsed from JSON, then validated against
        the argument model, before being passed to the function.
        """
arguments_pre_parsed = self.pre_parse_json(arguments_to_validate)
arguments_parsed_model = self.arg_model.model_validate(arguments_pre_parsed)
arguments_parsed_dict = arguments_parsed_model.model_dump_one_level()
⋮----
def convert_result(self, result: Any) -> Any
⋮----
"""
        Convert the result of a function call to the appropriate format for
         the lowlevel server tool call handler:

        - If output_model is None, return the unstructured content directly.
        - If output_model is not None, convert the result to structured output format
            (dict[str, Any]) and return both unstructured and structured content.

        Note: we return unstructured content here **even though the lowlevel server
        tool call handler provides generic backwards compatibility serialization of
        structured content**. This is for FastMCP backwards compatibility: we need to
        retain FastMCP's ad hoc conversion logic for constructing unstructured output
        from function return values, whereas the lowlevel server simply serializes
        the structured output.
        """
unstructured_content = _convert_to_content(result)
⋮----
result = {"result": result}
⋮----
validated = self.output_model.model_validate(result)
structured_content = validated.model_dump(mode="json")
⋮----
def pre_parse_json(self, data: dict[str, Any]) -> dict[str, Any]
⋮----
"""Pre-parse data from JSON.

        Return a dict with same keys as input but with values parsed from JSON
        if appropriate.

        This is to handle cases like `["a", "b", "c"]` being passed in as JSON inside
        a string rather than an actual list. Claude desktop is prone to this - in fact
        it seems incapable of NOT doing this. For sub-models, it tends to pass
        dicts (JSON objects) as JSON strings, which can be pre-parsed here.
        """
new_data = data.copy()  # Shallow copy
⋮----
pre_parsed = json.loads(data[field_name])
⋮----
continue  # Not JSON - skip
⋮----
# This is likely that the raw value is e.g. `"hello"` which we
# Should really be parsed as '"hello"' in Python - but if we parse
# it as JSON it'll turn into just 'hello'. So we skip it.
⋮----
"""Given a function, return metadata including a pydantic model representing its
    signature.

    The use case for this is
    ```
    meta = func_metadata(func)
    validated_args = meta.arg_model.model_validate(some_raw_data_dict)
    return func(**validated_args.model_dump_one_level())
    ```

    **critically** it also provides pre-parse helper to attempt to parse things from
    JSON.

    Args:
        func: The function to convert to a pydantic model
        skip_names: A list of parameter names to skip. These will not be included in
            the model.
        structured_output: Controls whether the tool's output is structured or unstructured
            - If None, auto-detects based on the function's return type annotation
            - If True, unconditionally creates a structured tool (return type annotation permitting)
            - If False, unconditionally creates an unstructured tool

        If structured, creates a Pydantic model for the function's result based on its annotation.
        Supports various return types:
            - BaseModel subclasses (used directly)
            - Primitive types (str, int, float, bool, bytes, None) - wrapped in a
                model with a 'result' field
            - TypedDict - converted to a Pydantic model with same fields
            - Dataclasses and other annotated classes - converted to Pydantic models
            - Generic types (list, dict, Union, etc.) - wrapped in a model with a 'result' field

    Returns:
        A FuncMetadata object containing:
        - arg_model: A pydantic model representing the function's arguments
        - output_model: A pydantic model for the return type if output is structured
        - output_conversion: Records how function output should be converted before returning.
    """
sig = _get_typed_signature(func)
params = sig.parameters
dynamic_pydantic_model_params: dict[str, Any] = {}
globalns = getattr(func, "__globals__", {})
⋮----
annotation = param.annotation
⋮----
# `x: None` / `x: None = None`
⋮----
annotation = Annotated[
⋮----
# Untyped field
⋮----
# 🤷
⋮----
field_info = FieldInfo.from_annotated_attribute(
⋮----
arguments_model = create_model(
⋮----
# set up structured output support based on return type annotation
⋮----
output_info = FieldInfo.from_annotation(_get_typed_annotation(sig.return_annotation, globalns))
annotation = output_info.annotation
⋮----
# Model creation failed or produced warnings - no structured output
⋮----
"""Try to create a model and schema for the given annotation without warnings.

    Returns:
        tuple of (model or None, schema or None, wrap_output)
        Model and schema are None if warnings occur or creation fails.
        wrap_output is True if the result needs to be wrapped in {"result": ...}
    """
model = None
wrap_output = False
⋮----
# First handle special case: None
⋮----
model = _create_wrapped_model(func_name, annotation, field_info)
wrap_output = True
⋮----
# Handle GenericAlias types (list[str], dict[str, int], Union[str, int], etc.)
⋮----
origin = get_origin(annotation)
⋮----
# Special case: dict with string keys can use RootModel
⋮----
args = get_args(annotation)
⋮----
model = _create_dict_model(func_name, annotation)
⋮----
# dict with non-str keys needs wrapping
⋮----
# All other generic types need wrapping (list, tuple, Union, Optional, etc.)
⋮----
# Handle regular type objects
⋮----
type_annotation: type[Any] = cast(type[Any], annotation)
⋮----
# Case 1: BaseModel subclasses (can be used directly)
⋮----
model = annotation
⋮----
# Case 2: TypedDict (special dict subclass with __annotations__)
⋮----
model = _create_model_from_typeddict(type_annotation)
⋮----
# Case 3: Primitive types that need wrapping
⋮----
# Case 4: Other class types (dataclasses, regular classes with annotations)
⋮----
type_hints = get_type_hints(type_annotation)
⋮----
# Classes with type hints can be converted to Pydantic models
model = _create_model_from_class(type_annotation)
# Classes without type hints are not serializable - model remains None
⋮----
# Handle any other types not covered above
⋮----
# This includes typing constructs that aren't GenericAlias in Python 3.10
# (e.g., Union, Optional in some Python versions)
⋮----
# If we successfully created a model, try to get its schema
# Use StrictJsonSchema to raise exceptions instead of warnings
⋮----
schema = model.model_json_schema(schema_generator=StrictJsonSchema)
⋮----
# These are expected errors when a type can't be converted to a Pydantic schema
# TypeError: When Pydantic can't handle the type
# ValueError: When there are issues with the type definition (including our custom warnings)
# SchemaError: When Pydantic can't build a schema
# ValidationError: When validation fails
⋮----
def _create_model_from_class(cls: type[Any]) -> type[BaseModel]
⋮----
"""Create a Pydantic model from an ordinary class.

    The created model will:
    - Have the same name as the class
    - Have fields with the same names and types as the class's fields
    - Include all fields whose type does not include None in the set of required fields

    Precondition: cls must have type hints (i.e., get_type_hints(cls) is non-empty)
    """
type_hints = get_type_hints(cls)
⋮----
model_fields: dict[str, Any] = {}
⋮----
default = getattr(cls, field_name, PydanticUndefined)
field_info = FieldInfo.from_annotated_attribute(field_type, default)
⋮----
# Create a base class with the config
class BaseWithConfig(BaseModel)
⋮----
model_config = ConfigDict(from_attributes=True)
⋮----
def _create_model_from_typeddict(td_type: type[Any]) -> type[BaseModel]
⋮----
"""Create a Pydantic model from a TypedDict.

    The created model will have the same name and fields as the TypedDict.
    """
type_hints = get_type_hints(td_type)
required_keys = getattr(td_type, "__required_keys__", set(type_hints.keys()))
⋮----
field_info = FieldInfo.from_annotation(field_type)
⋮----
# For optional TypedDict fields, set default=None
# This makes them not required in the Pydantic model
# The model should use exclude_unset=True when dumping to get TypedDict semantics
⋮----
def _create_wrapped_model(func_name: str, annotation: Any, field_info: FieldInfo) -> type[BaseModel]
⋮----
"""Create a model that wraps a type in a 'result' field.

    This is used for primitive types, generic types like list/dict, etc.
    """
model_name = f"{func_name}Output"
⋮----
# Pydantic needs type(None) instead of None for the type annotation
⋮----
annotation = type(None)
⋮----
def _create_dict_model(func_name: str, dict_annotation: Any) -> type[BaseModel]
⋮----
"""Create a RootModel for dict[str, T] types."""
⋮----
class DictModel(RootModel[dict_annotation])
⋮----
# Give it a meaningful name
⋮----
def _get_typed_annotation(annotation: Any, globalns: dict[str, Any]) -> Any
⋮----
def try_eval_type(value: Any, globalns: dict[str, Any], localns: dict[str, Any]) -> tuple[Any, bool]
⋮----
annotation = ForwardRef(annotation)
⋮----
# This check and raise could perhaps be skipped, and we (FastMCP) just call
# model_rebuild right before using it 🤷
⋮----
def _get_typed_signature(call: Callable[..., Any]) -> inspect.Signature
⋮----
"""Get function signature while evaluating forward references"""
signature = inspect.signature(call)
globalns = getattr(call, "__globals__", {})
typed_params = [
typed_return = _get_typed_annotation(signature.return_annotation, globalns)
typed_signature = inspect.Signature(typed_params, return_annotation=typed_return)
⋮----
"""
    Convert a result to a sequence of content objects.

    Note: This conversion logic comes from previous versions of FastMCP and is being
    retained for purposes of backwards compatibility. It produces different unstructured
    output than the lowlevel server tool call handler, which just serializes structured
    content verbatim.
    """
⋮----
for item in result  # type: ignore
⋮----
result = pydantic_core.to_json(result, fallback=str, indent=2).decode()
````

## File: src/mcp/server/fastmcp/utilities/logging.py
````python
"""Logging utilities for FastMCP."""
⋮----
def get_logger(name: str) -> logging.Logger
⋮----
"""Get a logger nested under MCPnamespace.

    Args:
        name: the name of the logger, which will be prefixed with 'FastMCP.'

    Returns:
        a configured logger instance
    """
⋮----
"""Configure logging for MCP.

    Args:
        level: the log level to use
    """
handlers: list[logging.Handler] = []
````

## File: src/mcp/server/fastmcp/utilities/types.py
````python
"""Common types used across FastMCP."""
⋮----
class Image
⋮----
"""Helper class for returning images from tools."""
⋮----
def _get_mime_type(self) -> str
⋮----
"""Get MIME type from format or guess from file extension."""
⋮----
suffix = self.path.suffix.lower()
⋮----
return "image/png"  # default for raw binary data
⋮----
def to_image_content(self) -> ImageContent
⋮----
"""Convert to MCP ImageContent."""
⋮----
data = base64.b64encode(f.read()).decode()
⋮----
data = base64.b64encode(self.data).decode()
````

## File: src/mcp/server/fastmcp/__init__.py
````python
"""FastMCP - A more ergonomic interface for MCP servers."""
⋮----
__version__ = version("mcp")
__all__ = ["FastMCP", "Context", "Image"]
````

## File: src/mcp/server/fastmcp/exceptions.py
````python
"""Custom exceptions for FastMCP."""
⋮----
class FastMCPError(Exception)
⋮----
"""Base error for FastMCP."""
⋮----
class ValidationError(FastMCPError)
⋮----
"""Error in validating parameters or return values."""
⋮----
class ResourceError(FastMCPError)
⋮----
"""Error in resource operations."""
⋮----
class ToolError(FastMCPError)
⋮----
"""Error in tool operations."""
⋮----
class InvalidSignature(Exception)
⋮----
"""Invalid signature for use with FastMCP."""
````

## File: src/mcp/server/fastmcp/server.py
````python
"""FastMCP - A more ergonomic interface for MCP servers."""
⋮----
logger = get_logger(__name__)
⋮----
class Settings(BaseSettings, Generic[LifespanResultT])
⋮----
"""FastMCP server settings.

    All settings can be configured via environment variables with the prefix FASTMCP_.
    For example, FASTMCP_DEBUG=true will set debug=True.
    """
⋮----
model_config = SettingsConfigDict(
⋮----
# Server settings
debug: bool = False
log_level: Literal["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"] = "INFO"
⋮----
# HTTP settings
host: str = "127.0.0.1"
port: int = 8000
mount_path: str = "/"  # Mount path (e.g. "/github", defaults to root path)
sse_path: str = "/sse"
message_path: str = "/messages/"
streamable_http_path: str = "/mcp"
⋮----
# StreamableHTTP settings
json_response: bool = False
stateless_http: bool = False  # If True, uses true stateless mode (new transport per request)
⋮----
# resource settings
warn_on_duplicate_resources: bool = True
⋮----
# tool settings
warn_on_duplicate_tools: bool = True
⋮----
# prompt settings
warn_on_duplicate_prompts: bool = True
⋮----
dependencies: list[str] = Field(
⋮----
lifespan: Callable[[FastMCP], AbstractAsyncContextManager[LifespanResultT]] | None = Field(
⋮----
auth: AuthSettings | None = None
⋮----
# Transport security settings (DNS rebinding protection)
transport_security: TransportSecuritySettings | None = None
⋮----
@asynccontextmanager
    async def wrap(s: MCPServer[LifespanResultT, Request]) -> AsyncIterator[object]
⋮----
class FastMCP
⋮----
# Validate auth configuration
⋮----
# Create token verifier from provider if needed (backwards compatibility)
⋮----
# Set up MCP protocol handlers
⋮----
# Configure logging
⋮----
@property
    def name(self) -> str
⋮----
@property
    def instructions(self) -> str | None
⋮----
@property
    def session_manager(self) -> StreamableHTTPSessionManager
⋮----
"""Get the StreamableHTTP session manager.

        This is exposed to enable advanced use cases like mounting multiple
        FastMCP servers in a single FastAPI application.

        Raises:
            RuntimeError: If called before streamable_http_app() has been called.
        """
⋮----
"""Run the FastMCP server. Note this is a synchronous function.

        Args:
            transport: Transport protocol to use ("stdio", "sse", or "streamable-http")
            mount_path: Optional mount path for SSE transport
        """
TRANSPORTS = Literal["stdio", "sse", "streamable-http"]
if transport not in TRANSPORTS.__args__:  # type: ignore
⋮----
def _setup_handlers(self) -> None
⋮----
"""Set up core MCP protocol handlers."""
⋮----
# Note: we disable the lowlevel server's input validation.
# FastMCP does ad hoc conversion of incoming data before validating -
# for now we preserve this for backwards compatibility.
⋮----
async def list_tools(self) -> list[MCPTool]
⋮----
"""List all available tools."""
tools = self._tool_manager.list_tools()
⋮----
def get_context(self) -> Context[ServerSession, object, Request]
⋮----
"""
        Returns a Context object. Note that the context will only be valid
        during a request; outside a request, most methods will error.
        """
⋮----
request_context = self._mcp_server.request_context
⋮----
request_context = None
⋮----
async def call_tool(self, name: str, arguments: dict[str, Any]) -> Sequence[ContentBlock] | dict[str, Any]
⋮----
"""Call a tool by name with arguments."""
context = self.get_context()
⋮----
async def list_resources(self) -> list[MCPResource]
⋮----
"""List all available resources."""
⋮----
resources = self._resource_manager.list_resources()
⋮----
async def list_resource_templates(self) -> list[MCPResourceTemplate]
⋮----
templates = self._resource_manager.list_templates()
⋮----
async def read_resource(self, uri: AnyUrl | str) -> Iterable[ReadResourceContents]
⋮----
"""Read a resource by URI."""
⋮----
resource = await self._resource_manager.get_resource(uri)
⋮----
content = await resource.read()
⋮----
"""Add a tool to the server.

        The tool function can optionally request a Context object by adding a parameter
        with the Context type annotation. See the @tool decorator for examples.

        Args:
            fn: The function to register as a tool
            name: Optional name for the tool (defaults to function name)
            title: Optional human-readable title for the tool
            description: Optional description of what the tool does
            annotations: Optional ToolAnnotations providing additional tool information
            structured_output: Controls whether the tool's output is structured or unstructured
                - If None, auto-detects based on the function's return type annotation
                - If True, unconditionally creates a structured tool (return type annotation permitting)
                - If False, unconditionally creates an unstructured tool
        """
⋮----
"""Decorator to register a tool.

        Tools can optionally request a Context object by adding a parameter with the
        Context type annotation. The context provides access to MCP capabilities like
        logging, progress reporting, and resource access.

        Args:
            name: Optional name for the tool (defaults to function name)
            title: Optional human-readable title for the tool
            description: Optional description of what the tool does
            annotations: Optional ToolAnnotations providing additional tool information
            structured_output: Controls whether the tool's output is structured or unstructured
                - If None, auto-detects based on the function's return type annotation
                - If True, unconditionally creates a structured tool (return type annotation permitting)
                - If False, unconditionally creates an unstructured tool

        Example:
            @server.tool()
            def my_tool(x: int) -> str:
                return str(x)

            @server.tool()
            def tool_with_context(x: int, ctx: Context) -> str:
                ctx.info(f"Processing {x}")
                return str(x)

            @server.tool()
            async def async_tool(x: int, context: Context) -> str:
                await context.report_progress(50, 100)
                return str(x)
        """
# Check if user passed function directly instead of calling decorator
⋮----
def decorator(fn: AnyFunction) -> AnyFunction
⋮----
def completion(self)
⋮----
"""Decorator to register a completion handler.

        The completion handler receives:
        - ref: PromptReference or ResourceTemplateReference
        - argument: CompletionArgument with name and partial value
        - context: Optional CompletionContext with previously resolved arguments

        Example:
            @mcp.completion()
            async def handle_completion(ref, argument, context):
                if isinstance(ref, ResourceTemplateReference):
                    # Return completions based on ref, argument, and context
                    return Completion(values=["option1", "option2"])
                return None
        """
⋮----
def add_resource(self, resource: Resource) -> None
⋮----
"""Add a resource to the server.

        Args:
            resource: A Resource instance to add
        """
⋮----
"""Decorator to register a function as a resource.

        The function will be called when the resource is read to generate its content.
        The function can return:
        - str for text content
        - bytes for binary content
        - other types will be converted to JSON

        If the URI contains parameters (e.g. "resource://{param}") or the function
        has parameters, it will be registered as a template resource.

        Args:
            uri: URI for the resource (e.g. "resource://my-resource" or "resource://{param}")
            name: Optional name for the resource
            title: Optional human-readable title for the resource
            description: Optional description of the resource
            mime_type: Optional MIME type for the resource

        Example:
            @server.resource("resource://my-resource")
            def get_data() -> str:
                return "Hello, world!"

            @server.resource("resource://my-resource")
            async get_data() -> str:
                data = await fetch_data()
                return f"Hello, world! {data}"

            @server.resource("resource://{city}/weather")
            def get_weather(city: str) -> str:
                return f"Weather for {city}"

            @server.resource("resource://{city}/weather")
            async def get_weather(city: str) -> str:
                data = await fetch_weather(city)
                return f"Weather for {city}: {data}"
        """
⋮----
# Check if this should be a template
has_uri_params = "{" in uri and "}" in uri
has_func_params = bool(inspect.signature(fn).parameters)
⋮----
# Validate that URI params match function params
uri_params = set(re.findall(r"{(\w+)}", uri))
func_params = set(inspect.signature(fn).parameters.keys())
⋮----
# Register as template
⋮----
# Register as regular resource
resource = FunctionResource.from_function(
⋮----
def add_prompt(self, prompt: Prompt) -> None
⋮----
"""Add a prompt to the server.

        Args:
            prompt: A Prompt instance to add
        """
⋮----
"""Decorator to register a prompt.

        Args:
            name: Optional name for the prompt (defaults to function name)
            title: Optional human-readable title for the prompt
            description: Optional description of what the prompt does

        Example:
            @server.prompt()
            def analyze_table(table_name: str) -> list[Message]:
                schema = read_table_schema(table_name)
                return [
                    {
                        "role": "user",
                        "content": f"Analyze this schema:\n{schema}"
                    }
                ]

            @server.prompt()
            async def analyze_file(path: str) -> list[Message]:
                content = await read_file(path)
                return [
                    {
                        "role": "user",
                        "content": {
                            "type": "resource",
                            "resource": {
                                "uri": f"file://{path}",
                                "text": content
                            }
                        }
                    }
                ]
        """
⋮----
def decorator(func: AnyFunction) -> AnyFunction
⋮----
prompt = Prompt.from_function(func, name=name, title=title, description=description)
⋮----
"""
        Decorator to register a custom HTTP route on the FastMCP server.

        Allows adding arbitrary HTTP endpoints outside the standard MCP protocol,
        which can be useful for OAuth callbacks, health checks, or admin APIs.
        The handler function must be an async function that accepts a Starlette
        Request and returns a Response.

        Args:
            path: URL path for the route (e.g., "/oauth/callback")
            methods: List of HTTP methods to support (e.g., ["GET", "POST"])
            name: Optional name for the route (to reference this route with
                  Starlette's reverse URL lookup feature)
            include_in_schema: Whether to include in OpenAPI schema, defaults to True

        Example:
            @server.custom_route("/health", methods=["GET"])
            async def health_check(request: Request) -> Response:
                return JSONResponse({"status": "ok"})
        """
⋮----
async def run_stdio_async(self) -> None
⋮----
"""Run the server using stdio transport."""
⋮----
async def run_sse_async(self, mount_path: str | None = None) -> None
⋮----
"""Run the server using SSE transport."""
⋮----
starlette_app = self.sse_app(mount_path)
⋮----
config = uvicorn.Config(
server = uvicorn.Server(config)
⋮----
async def run_streamable_http_async(self) -> None
⋮----
"""Run the server using StreamableHTTP transport."""
⋮----
starlette_app = self.streamable_http_app()
⋮----
def _normalize_path(self, mount_path: str, endpoint: str) -> str
⋮----
"""
        Combine mount path and endpoint to return a normalized path.

        Args:
            mount_path: The mount path (e.g. "/github" or "/")
            endpoint: The endpoint path (e.g. "/messages/")

        Returns:
            Normalized path (e.g. "/github/messages/")
        """
# Special case: root path
⋮----
# Remove trailing slash from mount path
⋮----
mount_path = mount_path[:-1]
⋮----
# Ensure endpoint starts with slash
⋮----
endpoint = "/" + endpoint
⋮----
# Combine paths
⋮----
def sse_app(self, mount_path: str | None = None) -> Starlette
⋮----
"""Return an instance of the SSE server app."""
⋮----
# Update mount_path in settings if provided
⋮----
# Create normalized endpoint considering the mount path
normalized_message_endpoint = self._normalize_path(self.settings.mount_path, self.settings.message_path)
⋮----
# Set up auth context and dependencies
⋮----
sse = SseServerTransport(
⋮----
async def handle_sse(scope: Scope, receive: Receive, send: Send)
⋮----
# Add client ID from auth context into request context if available
⋮----
# Create routes
routes: list[Route | Mount] = []
middleware: list[Middleware] = []
required_scopes = []
⋮----
# Set up auth if configured
⋮----
required_scopes = self.settings.auth.required_scopes or []
⋮----
# Add auth middleware if token verifier is available
⋮----
middleware = [
⋮----
# extract auth info from request (but do not require it)
⋮----
# Add the auth context middleware to store
# authenticated user in a contextvar
⋮----
# Add auth endpoints if auth server provider is configured
⋮----
# When auth is configured, require authentication
⋮----
# Determine resource metadata URL
resource_metadata_url = None
⋮----
resource_metadata_url = AnyHttpUrl(
⋮----
# Auth is enabled, wrap the endpoints with RequireAuthMiddleware
⋮----
# Auth is disabled, no need for RequireAuthMiddleware
# Since handle_sse is an ASGI app, we need to create a compatible endpoint
async def sse_endpoint(request: Request) -> Response
⋮----
# Convert the Starlette request to ASGI parameters
return await handle_sse(request.scope, request.receive, request._send)  # type: ignore[reportPrivateUsage]
⋮----
# Add protected resource metadata endpoint if configured as RS
⋮----
# mount these routes last, so they have the lowest route matching precedence
⋮----
# Create Starlette app with routes and middleware
⋮----
def streamable_http_app(self) -> Starlette
⋮----
"""Return an instance of the StreamableHTTP server app."""
⋮----
# Create session manager on first call (lazy initialization)
⋮----
stateless=self.settings.stateless_http,  # Use the stateless setting
⋮----
# Create the ASGI handler
async def handle_streamable_http(scope: Scope, receive: Receive, send: Send) -> None
⋮----
# Set up routes with or without auth
⋮----
# Auth is disabled, no wrapper needed
⋮----
protected_resource_metadata = ProtectedResourceMetadata(
⋮----
async def list_prompts(self) -> list[MCPPrompt]
⋮----
"""List all available prompts."""
prompts = self._prompt_manager.list_prompts()
⋮----
async def get_prompt(self, name: str, arguments: dict[str, Any] | None = None) -> GetPromptResult
⋮----
"""Get a prompt by name with arguments."""
⋮----
messages = await self._prompt_manager.render_prompt(name, arguments)
⋮----
class Context(BaseModel, Generic[ServerSessionT, LifespanContextT, RequestT])
⋮----
"""Context object providing access to MCP capabilities.

    This provides a cleaner interface to MCP's RequestContext functionality.
    It gets injected into tool and resource functions that request it via type hints.

    To use context in a tool function, add a parameter with the Context type annotation:

    ```python
    @server.tool()
    def my_tool(x: int, ctx: Context) -> str:
        # Log messages to the client
        ctx.info(f"Processing {x}")
        ctx.debug("Debug info")
        ctx.warning("Warning message")
        ctx.error("Error message")

        # Report progress
        ctx.report_progress(50, 100)

        # Access resources
        data = ctx.read_resource("resource://data")

        # Get request info
        request_id = ctx.request_id
        client_id = ctx.client_id

        return str(x)
    ```

    The context parameter name can be anything as long as it's annotated with Context.
    The context is optional - tools that don't need it can omit the parameter.
    """
⋮----
_request_context: RequestContext[ServerSessionT, LifespanContextT, RequestT] | None
_fastmcp: FastMCP | None
⋮----
@property
    def fastmcp(self) -> FastMCP
⋮----
"""Access to the FastMCP server."""
⋮----
"""Access to the underlying request context."""
⋮----
async def report_progress(self, progress: float, total: float | None = None, message: str | None = None) -> None
⋮----
"""Report progress for the current operation.

        Args:
            progress: Current progress value e.g. 24
            total: Optional total value e.g. 100
            message: Optional message e.g. Starting render...
        """
progress_token = self.request_context.meta.progressToken if self.request_context.meta else None
⋮----
async def read_resource(self, uri: str | AnyUrl) -> Iterable[ReadResourceContents]
⋮----
"""Read a resource by URI.

        Args:
            uri: Resource URI to read

        Returns:
            The resource content as either text or bytes
        """
⋮----
"""Elicit information from the client/user.

        This method can be used to interactively ask for additional information from the
        client within a tool's execution. The client might display the message to the
        user and collect a response according to the provided schema. Or in case a
        client is an agent, it might decide how to handle the elicitation -- either by asking
        the user or automatically generating a response.

        Args:
            schema: A Pydantic model class defining the expected response structure, according to the specification,
                    only primive types are allowed.
            message: Optional message to present to the user. If not provided, will use
                    a default message based on the schema

        Returns:
            An ElicitationResult containing the action taken and the data if accepted

        Note:
            Check the result.action to determine if the user accepted, declined, or cancelled.
            The result.data will only be populated if action is "accept" and validation succeeded.
        """
⋮----
"""Send a log message to the client.

        Args:
            level: Log level (debug, info, warning, error)
            message: Log message
            logger_name: Optional logger name
            **extra: Additional structured data to include
        """
⋮----
@property
    def client_id(self) -> str | None
⋮----
"""Get the client ID if available."""
⋮----
@property
    def request_id(self) -> str
⋮----
"""Get the unique ID for this request."""
⋮----
@property
    def session(self)
⋮----
"""Access to the underlying session for advanced usage."""
⋮----
# Convenience methods for common log levels
async def debug(self, message: str, **extra: Any) -> None
⋮----
"""Send a debug log message."""
⋮----
async def info(self, message: str, **extra: Any) -> None
⋮----
"""Send an info log message."""
⋮----
async def warning(self, message: str, **extra: Any) -> None
⋮----
"""Send a warning log message."""
⋮----
async def error(self, message: str, **extra: Any) -> None
⋮----
"""Send an error log message."""
````

## File: src/mcp/server/lowlevel/__init__.py
````python
__all__ = ["Server", "NotificationOptions"]
````

## File: src/mcp/server/lowlevel/helper_types.py
````python
@dataclass
class ReadResourceContents
⋮----
"""Contents returned from a read_resource call."""
⋮----
content: str | bytes
mime_type: str | None = None
````

## File: src/mcp/server/lowlevel/server.py
````python
"""
MCP Server Module

This module provides a framework for creating an MCP (Model Context Protocol) server.
It allows you to easily define and handle various types of requests and notifications
in an asynchronous manner.

Usage:
1. Create a Server instance:
   server = Server("your_server_name")

2. Define request handlers using decorators:
   @server.list_prompts()
   async def handle_list_prompts() -> list[types.Prompt]:
       # Implementation

   @server.get_prompt()
   async def handle_get_prompt(
       name: str, arguments: dict[str, str] | None
   ) -> types.GetPromptResult:
       # Implementation

   @server.list_tools()
   async def handle_list_tools() -> list[types.Tool]:
       # Implementation

   @server.call_tool()
   async def handle_call_tool(
       name: str, arguments: dict | None
   ) -> list[types.TextContent | types.ImageContent | types.EmbeddedResource]:
       # Implementation

   @server.list_resource_templates()
   async def handle_list_resource_templates() -> list[types.ResourceTemplate]:
       # Implementation

3. Define notification handlers if needed:
   @server.progress_notification()
   async def handle_progress(
       progress_token: str | int, progress: float, total: float | None,
       message: str | None
   ) -> None:
       # Implementation

4. Run the server:
   async def main():
       async with mcp.server.stdio.stdio_server() as (read_stream, write_stream):
           await server.run(
               read_stream,
               write_stream,
               InitializationOptions(
                   server_name="your_server_name",
                   server_version="your_version",
                   capabilities=server.get_capabilities(
                       notification_options=NotificationOptions(),
                       experimental_capabilities={},
                   ),
               ),
           )

   asyncio.run(main())

The Server class provides methods to register handlers for various MCP requests and
notifications. It automatically manages the request context and handles incoming
messages from the client.
"""
⋮----
logger = logging.getLogger(__name__)
⋮----
LifespanResultT = TypeVar("LifespanResultT")
RequestT = TypeVar("RequestT", default=Any)
⋮----
# type aliases for tool call results
StructuredContent: TypeAlias = dict[str, Any]
UnstructuredContent: TypeAlias = Iterable[types.ContentBlock]
CombinationContent: TypeAlias = tuple[UnstructuredContent, StructuredContent]
⋮----
# This will be properly typed in each Server instance's context
request_ctx: contextvars.ContextVar[RequestContext[ServerSession, Any, Any]] = contextvars.ContextVar("request_ctx")
⋮----
class NotificationOptions
⋮----
@asynccontextmanager
async def lifespan(server: Server[LifespanResultT, RequestT]) -> AsyncIterator[object]
⋮----
"""Default lifespan context manager that does nothing.

    Args:
        server: The server instance this lifespan is managing

    Returns:
        An empty context object
    """
⋮----
class Server(Generic[LifespanResultT, RequestT])
⋮----
"""Create initialization options from this server instance."""
⋮----
def pkg_version(package: str) -> str
⋮----
"""Convert existing handlers to a ServerCapabilities object."""
prompts_capability = None
resources_capability = None
tools_capability = None
logging_capability = None
⋮----
# Set prompt capabilities if handler exists
⋮----
prompts_capability = types.PromptsCapability(listChanged=notification_options.prompts_changed)
⋮----
# Set resource capabilities if handler exists
⋮----
resources_capability = types.ResourcesCapability(
⋮----
# Set tool capabilities if handler exists
⋮----
tools_capability = types.ToolsCapability(listChanged=notification_options.tools_changed)
⋮----
# Set logging capabilities if handler exists
⋮----
logging_capability = types.LoggingCapability()
⋮----
"""If called outside of a request context, this will raise a LookupError."""
⋮----
def list_prompts(self)
⋮----
def decorator(func: Callable[[], Awaitable[list[types.Prompt]]])
⋮----
async def handler(_: Any)
⋮----
prompts = await func()
⋮----
def get_prompt(self)
⋮----
async def handler(req: types.GetPromptRequest)
⋮----
prompt_get = await func(req.params.name, req.params.arguments)
⋮----
def list_resources(self)
⋮----
def decorator(func: Callable[[], Awaitable[list[types.Resource]]])
⋮----
resources = await func()
⋮----
def list_resource_templates(self)
⋮----
def decorator(func: Callable[[], Awaitable[list[types.ResourceTemplate]]])
⋮----
templates = await func()
⋮----
def read_resource(self)
⋮----
async def handler(req: types.ReadResourceRequest)
⋮----
result = await func(req.params.uri)
⋮----
def create_content(data: str | bytes, mime_type: str | None)
⋮----
content = create_content(data, None)
⋮----
contents_list = [
⋮----
def set_logging_level(self)
⋮----
def decorator(func: Callable[[types.LoggingLevel], Awaitable[None]])
⋮----
async def handler(req: types.SetLevelRequest)
⋮----
def subscribe_resource(self)
⋮----
def decorator(func: Callable[[AnyUrl], Awaitable[None]])
⋮----
async def handler(req: types.SubscribeRequest)
⋮----
def unsubscribe_resource(self)
⋮----
async def handler(req: types.UnsubscribeRequest)
⋮----
def list_tools(self)
⋮----
def decorator(func: Callable[[], Awaitable[list[types.Tool]]])
⋮----
tools = await func()
# Refresh the tool cache
⋮----
def _make_error_result(self, error_message: str) -> types.ServerResult
⋮----
"""Create a ServerResult with an error CallToolResult."""
⋮----
async def _get_cached_tool_definition(self, tool_name: str) -> types.Tool | None
⋮----
"""Get tool definition from cache, refreshing if necessary.

        Returns the Tool object if found, None otherwise.
        """
⋮----
tool = self._tool_cache.get(tool_name)
⋮----
def call_tool(self, *, validate_input: bool = True)
⋮----
"""Register a tool call handler.

        Args:
            validate_input: If True, validates input against inputSchema. Default is True.

        The handler validates input against inputSchema (if validate_input=True), calls the tool function,
        and builds a CallToolResult with the results:
        - Unstructured content (iterable of ContentBlock): returned in content
        - Structured content (dict): returned in structuredContent, serialized JSON text returned in content
        - Both: returned in content and structuredContent

        If outputSchema is defined, validates structuredContent or errors if missing.
        """
⋮----
async def handler(req: types.CallToolRequest)
⋮----
tool_name = req.params.name
arguments = req.params.arguments or {}
tool = await self._get_cached_tool_definition(tool_name)
⋮----
# input validation
⋮----
# tool call
results = await func(tool_name, arguments)
⋮----
# output normalization
unstructured_content: UnstructuredContent
maybe_structured_content: StructuredContent | None
⋮----
# tool returned both structured and unstructured content
⋮----
# tool returned structured content only
maybe_structured_content = cast(StructuredContent, results)
unstructured_content = [types.TextContent(type="text", text=json.dumps(results, indent=2))]
⋮----
# tool returned unstructured content only
unstructured_content = cast(UnstructuredContent, results)
maybe_structured_content = None
⋮----
# output validation
⋮----
# result
⋮----
def progress_notification(self)
⋮----
async def handler(req: types.ProgressNotification)
⋮----
def completion(self)
⋮----
"""Provides completions for prompts and resource templates"""
⋮----
async def handler(req: types.CompleteRequest)
⋮----
completion = await func(req.params.ref, req.params.argument, req.params.context)
⋮----
# When False, exceptions are returned as messages to the client.
# When True, exceptions are raised, which will cause the server to shut down
# but also make tracing exceptions much easier during testing and when using
# in-process servers.
⋮----
# When True, the server is stateless and
# clients can perform initialization with any node. The client must still follow
# the initialization lifecycle, but can do so with any available node
# rather than requiring initialization for each connection.
⋮----
lifespan_context = await stack.enter_async_context(self.lifespan(self))
session = await stack.enter_async_context(
⋮----
# TODO(Marcelo): We should be checking if message is Exception here.
match message:  # type: ignore[reportMatchNotExhaustive]
⋮----
if handler := self.request_handlers.get(type(req)):  # type: ignore
⋮----
token = None
⋮----
# Extract request context from message metadata
request_data = None
⋮----
request_data = message.message_metadata.request_context
⋮----
# Set our global state that can be retrieved via
# app.get_request_context()
token = request_ctx.set(
response = await handler(req)
⋮----
response = err.error
⋮----
response = types.ErrorData(code=0, message=str(err), data=None)
⋮----
# Reset the global state after we are done
⋮----
async def _handle_notification(self, notify: Any)
⋮----
if handler := self.notification_handlers.get(type(notify)):  # type: ignore
⋮----
async def _ping_handler(request: types.PingRequest) -> types.ServerResult
````

## File: src/mcp/server/__init__.py
````python
__all__ = ["Server", "FastMCP", "NotificationOptions", "InitializationOptions"]
````

## File: src/mcp/server/__main__.py
````python
logger = logging.getLogger("server")
⋮----
async def receive_loop(session: ServerSession)
⋮----
async def main()
⋮----
version = importlib.metadata.version("mcp")
````

## File: src/mcp/server/elicitation.py
````python
"""Elicitation utilities for MCP servers."""
⋮----
ElicitSchemaModelT = TypeVar("ElicitSchemaModelT", bound=BaseModel)
⋮----
class AcceptedElicitation(BaseModel, Generic[ElicitSchemaModelT])
⋮----
"""Result when user accepts the elicitation."""
⋮----
action: Literal["accept"] = "accept"
data: ElicitSchemaModelT
⋮----
class DeclinedElicitation(BaseModel)
⋮----
"""Result when user declines the elicitation."""
⋮----
action: Literal["decline"] = "decline"
⋮----
class CancelledElicitation(BaseModel)
⋮----
"""Result when user cancels the elicitation."""
⋮----
action: Literal["cancel"] = "cancel"
⋮----
ElicitationResult = AcceptedElicitation[ElicitSchemaModelT] | DeclinedElicitation | CancelledElicitation
⋮----
# Primitive types allowed in elicitation schemas
_ELICITATION_PRIMITIVE_TYPES = (str, int, float, bool)
⋮----
def _validate_elicitation_schema(schema: type[BaseModel]) -> None
⋮----
"""Validate that a Pydantic model only contains primitive field types."""
⋮----
def _is_primitive_field(field_info: FieldInfo) -> bool
⋮----
"""Check if a field is a primitive type allowed in elicitation schemas."""
annotation = field_info.annotation
⋮----
# Handle None type
⋮----
# Handle basic primitive types
⋮----
# Handle Union types
origin = get_origin(annotation)
⋮----
args = get_args(annotation)
# All args must be primitive types or None
⋮----
"""Elicit information from the client/user with schema validation.

    This method can be used to interactively ask for additional information from the
    client within a tool's execution. The client might display the message to the
    user and collect a response according to the provided schema. Or in case a
    client is an agent, it might decide how to handle the elicitation -- either by asking
    the user or automatically generating a response.
    """
# Validate that schema only contains primitive types and fail loudly if not
⋮----
json_schema = schema.model_json_schema()
⋮----
result = await session.elicit(
⋮----
# Validate and parse the content using the schema
validated_data = schema.model_validate(result.content)
⋮----
# This should never happen, but handle it just in case
````

## File: src/mcp/server/models.py
````python
"""
This module provides simpler types to use with the server for managing prompts
and tools.
"""
⋮----
class InitializationOptions(BaseModel)
⋮----
server_name: str
server_version: str
capabilities: ServerCapabilities
instructions: str | None = None
````

## File: src/mcp/server/session.py
````python
"""
ServerSession Module

This module provides the ServerSession class, which manages communication between the
server and client in the MCP (Model Context Protocol) framework. It is most commonly
used in MCP servers to interact with the client.

Common usage pattern:
```
    server = Server(name)

    @server.call_tool()
    async def handle_tool_call(ctx: RequestContext, arguments: dict[str, Any]) -> Any:
        # Check client capabilities before proceeding
        if ctx.session.check_client_capability(
            types.ClientCapabilities(experimental={"advanced_tools": dict()})
        ):
            # Perform advanced tool operations
            result = await perform_advanced_tool_operation(arguments)
        else:
            # Fall back to basic tool operations
            result = await perform_basic_tool_operation(arguments)

        return result

    @server.list_prompts()
    async def handle_list_prompts(ctx: RequestContext) -> list[types.Prompt]:
        # Access session for any necessary checks or operations
        if ctx.session.client_params:
            # Customize prompts based on client initialization parameters
            return generate_custom_prompts(ctx.session.client_params)
        else:
            return default_prompts
```

The ServerSession class is typically used internally by the Server class and should not
be instantiated directly by users of the MCP framework.
"""
⋮----
class InitializationState(Enum)
⋮----
NotInitialized = 1
Initializing = 2
Initialized = 3
⋮----
ServerSessionT = TypeVar("ServerSessionT", bound="ServerSession")
⋮----
ServerRequestResponder = (
⋮----
class ServerSession(
⋮----
_initialized: InitializationState = InitializationState.NotInitialized
_client_params: types.InitializeRequestParams | None = None
⋮----
@property
    def client_params(self) -> types.InitializeRequestParams | None
⋮----
def check_client_capability(self, capability: types.ClientCapabilities) -> bool
⋮----
"""Check if the client supports a specific capability."""
⋮----
# Get client capabilities from initialization params
client_caps = self._client_params.capabilities
⋮----
# Check each specified capability in the passed in capability object
⋮----
# Check each experimental capability
⋮----
async def _receive_loop(self) -> None
⋮----
async def _received_request(self, responder: RequestResponder[types.ClientRequest, types.ServerResult])
⋮----
requested_version = params.protocolVersion
⋮----
async def _received_notification(self, notification: types.ClientNotification) -> None
⋮----
# Need this to avoid ASYNC910
⋮----
"""Send a log message notification."""
⋮----
async def send_resource_updated(self, uri: AnyUrl) -> None
⋮----
"""Send a resource updated notification."""
⋮----
"""Send a sampling/create_message request."""
⋮----
async def list_roots(self) -> types.ListRootsResult
⋮----
"""Send a roots/list request."""
⋮----
"""Send an elicitation/create request.

        Args:
            message: The message to present to the user
            requestedSchema: Schema defining the expected response structure

        Returns:
            The client's response
        """
⋮----
async def send_ping(self) -> types.EmptyResult
⋮----
"""Send a ping request."""
⋮----
"""Send a progress notification."""
⋮----
async def send_resource_list_changed(self) -> None
⋮----
"""Send a resource list changed notification."""
⋮----
async def send_tool_list_changed(self) -> None
⋮----
"""Send a tool list changed notification."""
⋮----
async def send_prompt_list_changed(self) -> None
⋮----
"""Send a prompt list changed notification."""
⋮----
async def _handle_incoming(self, req: ServerRequestResponder) -> None
````

## File: src/mcp/server/sse.py
````python
"""
SSE Server Transport Module

This module implements a Server-Sent Events (SSE) transport layer for MCP servers.

Example usage:
```
    # Create an SSE transport at an endpoint
    sse = SseServerTransport("/messages/")

    # Create Starlette routes for SSE and message handling
    routes = [
        Route("/sse", endpoint=handle_sse, methods=["GET"]),
        Mount("/messages/", app=sse.handle_post_message),
    ]

    # Define handler functions
    async def handle_sse(request):
        async with sse.connect_sse(
            request.scope, request.receive, request._send
        ) as streams:
            await app.run(
                streams[0], streams[1], app.create_initialization_options()
            )
        # Return empty response to avoid NoneType error
        return Response()

    # Create and run Starlette app
    starlette_app = Starlette(routes=routes)
    uvicorn.run(starlette_app, host="127.0.0.1", port=port)
```

Note: The handle_sse function must return a Response to avoid a "TypeError: 'NoneType'
object is not callable" error when client disconnects. The example above returns
an empty Response() after the SSE connection ends to fix this.

See SseServerTransport class documentation for more details.
"""
⋮----
logger = logging.getLogger(__name__)
⋮----
class SseServerTransport
⋮----
"""
    SSE server transport for MCP. This class provides _two_ ASGI applications,
    suitable to be used with a framework like Starlette and a server like Hypercorn:

        1. connect_sse() is an ASGI application which receives incoming GET requests,
           and sets up a new SSE stream to send server messages to the client.
        2. handle_post_message() is an ASGI application which receives incoming POST
           requests, which should contain client messages that link to a
           previously-established SSE session.
    """
⋮----
_endpoint: str
_read_stream_writers: dict[UUID, MemoryObjectSendStream[SessionMessage | Exception]]
_security: TransportSecurityMiddleware
⋮----
def __init__(self, endpoint: str, security_settings: TransportSecuritySettings | None = None) -> None
⋮----
"""
        Creates a new SSE server transport, which will direct the client to POST
        messages to the relative or absolute URL given.

        Args:
            endpoint: The relative or absolute URL for POST messages.
            security_settings: Optional security settings for DNS rebinding protection.
        """
⋮----
@asynccontextmanager
    async def connect_sse(self, scope: Scope, receive: Receive, send: Send)
⋮----
# Validate request headers for DNS rebinding protection
request = Request(scope, receive)
error_response = await self._security.validate_request(request, is_post=False)
⋮----
read_stream: MemoryObjectReceiveStream[SessionMessage | Exception]
read_stream_writer: MemoryObjectSendStream[SessionMessage | Exception]
⋮----
write_stream: MemoryObjectSendStream[SessionMessage]
write_stream_reader: MemoryObjectReceiveStream[SessionMessage]
⋮----
session_id = uuid4()
⋮----
# Determine the full path for the message endpoint to be sent to the client.
# scope['root_path'] is the prefix where the current Starlette app
# instance is mounted.
# e.g., "" if top-level, or "/api_prefix" if mounted under "/api_prefix".
root_path = scope.get("root_path", "")
⋮----
# self._endpoint is the path *within* this app, e.g., "/messages".
# Concatenating them gives the full absolute path from the server root.
# e.g., "" + "/messages" -> "/messages"
# e.g., "/api_prefix" + "/messages" -> "/api_prefix/messages"
full_message_path_for_client = root_path.rstrip("/") + self._endpoint
⋮----
# This is the URI (path + query) the client will use to POST messages.
client_post_uri_data = f"{quote(full_message_path_for_client)}?session_id={session_id.hex}"
⋮----
async def sse_writer()
⋮----
async def response_wrapper(scope: Scope, receive: Receive, send: Send)
⋮----
"""
                The EventSourceResponse returning signals a client close / disconnect.
                In this case we close our side of the streams to signal the client that
                the connection has been closed.
                """
⋮----
async def handle_post_message(self, scope: Scope, receive: Receive, send: Send) -> None
⋮----
error_response = await self._security.validate_request(request, is_post=True)
⋮----
session_id_param = request.query_params.get("session_id")
⋮----
response = Response("session_id is required", status_code=400)
⋮----
session_id = UUID(hex=session_id_param)
⋮----
response = Response("Invalid session ID", status_code=400)
⋮----
writer = self._read_stream_writers.get(session_id)
⋮----
response = Response("Could not find session", status_code=404)
⋮----
body = await request.body()
⋮----
message = types.JSONRPCMessage.model_validate_json(body)
⋮----
response = Response("Could not parse message", status_code=400)
⋮----
# Pass the ASGI scope for framework-agnostic access to request data
metadata = ServerMessageMetadata(request_context=request)
session_message = SessionMessage(message, metadata=metadata)
⋮----
response = Response("Accepted", status_code=202)
````

## File: src/mcp/server/stdio.py
````python
"""
Stdio Server Transport Module

This module provides functionality for creating an stdio-based transport layer
that can be used to communicate with an MCP client through standard input/output
streams.

Example usage:
```
    async def run_server():
        async with stdio_server() as (read_stream, write_stream):
            # read_stream contains incoming JSONRPCMessages from stdin
            # write_stream allows sending JSONRPCMessages to stdout
            server = await create_my_server()
            await server.run(read_stream, write_stream, init_options)

    anyio.run(run_server)
```
"""
⋮----
"""
    Server transport for stdio: this communicates with an MCP client by reading
    from the current process' stdin and writing to stdout.
    """
# Purposely not using context managers for these, as we don't want to close
# standard process handles. Encoding of stdin/stdout as text streams on
# python is platform-dependent (Windows is particularly problematic), so we
# re-wrap the underlying binary stream to ensure UTF-8.
⋮----
stdin = anyio.wrap_file(TextIOWrapper(sys.stdin.buffer, encoding="utf-8"))
⋮----
stdout = anyio.wrap_file(TextIOWrapper(sys.stdout.buffer, encoding="utf-8"))
⋮----
read_stream: MemoryObjectReceiveStream[SessionMessage | Exception]
read_stream_writer: MemoryObjectSendStream[SessionMessage | Exception]
⋮----
write_stream: MemoryObjectSendStream[SessionMessage]
write_stream_reader: MemoryObjectReceiveStream[SessionMessage]
⋮----
async def stdin_reader()
⋮----
message = types.JSONRPCMessage.model_validate_json(line)
⋮----
session_message = SessionMessage(message)
⋮----
async def stdout_writer()
⋮----
json = session_message.message.model_dump_json(by_alias=True, exclude_none=True)
````

## File: src/mcp/server/streamable_http_manager.py
````python
"""StreamableHTTP Session Manager for MCP servers."""
⋮----
logger = logging.getLogger(__name__)
⋮----
class StreamableHTTPSessionManager
⋮----
"""
    Manages StreamableHTTP sessions with optional resumability via event store.

    This class abstracts away the complexity of session management, event storage,
    and request handling for StreamableHTTP transports. It handles:

    1. Session tracking for clients
    2. Resumability via an optional event store
    3. Connection management and lifecycle
    4. Request handling and transport setup

    Important: Only one StreamableHTTPSessionManager instance should be created
    per application. The instance cannot be reused after its run() context has
    completed. If you need to restart the manager, create a new instance.

    Args:
        app: The MCP server instance
        event_store: Optional event store for resumability support.
                     If provided, enables resumable connections where clients
                     can reconnect and receive missed events.
                     If None, sessions are still tracked but not resumable.
        json_response: Whether to use JSON responses instead of SSE streams
        stateless: If True, creates a completely fresh transport for each request
                   with no session tracking or state persistence between requests.

    """
⋮----
# Session tracking (only used if not stateless)
⋮----
# The task group will be set during lifespan
⋮----
# Thread-safe tracking of run() calls
⋮----
@contextlib.asynccontextmanager
    async def run(self) -> AsyncIterator[None]
⋮----
"""
        Run the session manager with proper lifecycle management.

        This creates and manages the task group for all session operations.

        Important: This method can only be called once per instance. The same
        StreamableHTTPSessionManager instance cannot be reused after this
        context manager exits. Create a new instance if you need to restart.

        Use this in the lifespan context manager of your Starlette app:

        @contextlib.asynccontextmanager
        async def lifespan(app: Starlette) -> AsyncIterator[None]:
            async with session_manager.run():
                yield
        """
# Thread-safe check to ensure run() is only called once
⋮----
# Store the task group for later use
⋮----
yield  # Let the application run
⋮----
# Cancel task group to stop all spawned tasks
⋮----
# Clear any remaining server instances
⋮----
"""
        Process ASGI request with proper session handling and transport setup.

        Dispatches to the appropriate handler based on stateless mode.

        Args:
            scope: ASGI scope
            receive: ASGI receive function
            send: ASGI send function
        """
⋮----
# Dispatch to the appropriate handler
⋮----
"""
        Process request in stateless mode - creating a new transport for each request.

        Args:
            scope: ASGI scope
            receive: ASGI receive function
            send: ASGI send function
        """
⋮----
# No session ID needed in stateless mode
http_transport = StreamableHTTPServerTransport(
⋮----
mcp_session_id=None,  # No session tracking in stateless mode
⋮----
event_store=None,  # No event store in stateless mode
⋮----
# Start server in a new task
async def run_stateless_server(*, task_status: TaskStatus[None] = anyio.TASK_STATUS_IGNORED)
⋮----
# Assert task group is not None for type checking
⋮----
# Start the server task
⋮----
# Handle the HTTP request and return the response
⋮----
"""
        Process request in stateful mode - maintaining session state between requests.

        Args:
            scope: ASGI scope
            receive: ASGI receive function
            send: ASGI send function
        """
request = Request(scope, receive)
request_mcp_session_id = request.headers.get(MCP_SESSION_ID_HEADER)
⋮----
# Existing session case
⋮----
transport = self._server_instances[request_mcp_session_id]
⋮----
# New session case
⋮----
new_session_id = uuid4().hex
⋮----
event_store=self.event_store,  # May be None (no resumability)
⋮----
# Define the server runner
async def run_server(*, task_status: TaskStatus[None] = anyio.TASK_STATUS_IGNORED) -> None
⋮----
stateless=False,  # Stateful mode
⋮----
# Assert task group is not None for type checking
⋮----
# Start the server task
⋮----
# Handle the HTTP request and return the response
⋮----
# Invalid session ID
response = Response(
````

## File: src/mcp/server/streamable_http.py
````python
"""
StreamableHTTP Server Transport Module

This module implements an HTTP transport layer with Streamable HTTP.

The transport handles bidirectional communication using HTTP requests and
responses, with streaming support for long-running operations.
"""
⋮----
logger = logging.getLogger(__name__)
⋮----
# Maximum size for incoming messages
MAXIMUM_MESSAGE_SIZE = 4 * 1024 * 1024  # 4MB
⋮----
# Header names
MCP_SESSION_ID_HEADER = "mcp-session-id"
MCP_PROTOCOL_VERSION_HEADER = "mcp-protocol-version"
LAST_EVENT_ID_HEADER = "last-event-id"
⋮----
# Content types
CONTENT_TYPE_JSON = "application/json"
CONTENT_TYPE_SSE = "text/event-stream"
⋮----
# Special key for the standalone GET stream
GET_STREAM_KEY = "_GET_stream"
⋮----
# Session ID validation pattern (visible ASCII characters ranging from 0x21 to 0x7E)
# Pattern ensures entire string contains only valid characters by using ^ and $ anchors
SESSION_ID_PATTERN = re.compile(r"^[\x21-\x7E]+$")
⋮----
# Type aliases
StreamId = str
EventId = str
⋮----
@dataclass
class EventMessage
⋮----
"""
    A JSONRPCMessage with an optional event ID for stream resumability.
    """
⋮----
message: JSONRPCMessage
event_id: str | None = None
⋮----
EventCallback = Callable[[EventMessage], Awaitable[None]]
⋮----
class EventStore(ABC)
⋮----
"""
    Interface for resumability support via event storage.
    """
⋮----
@abstractmethod
    async def store_event(self, stream_id: StreamId, message: JSONRPCMessage) -> EventId
⋮----
"""
        Stores an event for later retrieval.

        Args:
            stream_id: ID of the stream the event belongs to
            message: The JSON-RPC message to store

        Returns:
            The generated event ID for the stored event
        """
⋮----
"""
        Replays events that occurred after the specified event ID.

        Args:
            last_event_id: The ID of the last event the client received
            send_callback: A callback function to send events to the client

        Returns:
            The stream ID of the replayed events
        """
⋮----
class StreamableHTTPServerTransport
⋮----
"""
    HTTP server transport with event streaming support for MCP.

    Handles JSON-RPC messages in HTTP POST requests with SSE streaming.
    Supports optional JSON responses and session management.
    """
⋮----
# Server notification streams for POST requests as well as standalone SSE stream
_read_stream_writer: MemoryObjectSendStream[SessionMessage | Exception] | None = None
_read_stream: MemoryObjectReceiveStream[SessionMessage | Exception] | None = None
_write_stream: MemoryObjectSendStream[SessionMessage] | None = None
_write_stream_reader: MemoryObjectReceiveStream[SessionMessage] | None = None
_security: TransportSecurityMiddleware
⋮----
"""
        Initialize a new StreamableHTTP server transport.

        Args:
            mcp_session_id: Optional session identifier for this connection.
                            Must contain only visible ASCII characters (0x21-0x7E).
            is_json_response_enabled: If True, return JSON responses for requests
                                    instead of SSE streams. Default is False.
            event_store: Event store for resumability support. If provided,
                        resumability will be enabled, allowing clients to
                        reconnect and resume messages.
            security_settings: Optional security settings for DNS rebinding protection.

        Raises:
            ValueError: If the session ID contains invalid characters.
        """
⋮----
"""Create an error response with a simple string message."""
response_headers = {"Content-Type": CONTENT_TYPE_JSON}
⋮----
# Return a properly formatted JSON error response
error_response = JSONRPCError(
⋮----
id="server-error",  # We don't have a request ID for general errors
⋮----
"""Create a JSON response from a JSONRPCMessage"""
⋮----
def _get_session_id(self, request: Request) -> str | None
⋮----
"""Extract the session ID from request headers."""
⋮----
def _create_event_data(self, event_message: EventMessage) -> dict[str, str]
⋮----
"""Create event data dictionary from an EventMessage."""
event_data = {
⋮----
# If an event ID was provided, include it
⋮----
async def _clean_up_memory_streams(self, request_id: RequestId) -> None
⋮----
"""Clean up memory streams for a given request ID."""
⋮----
# Close the request stream
⋮----
# Remove the request stream from the mapping
⋮----
async def handle_request(self, scope: Scope, receive: Receive, send: Send) -> None
⋮----
"""Application entry point that handles all HTTP requests"""
request = Request(scope, receive)
⋮----
# Validate request headers for DNS rebinding protection
is_post = request.method == "POST"
error_response = await self._security.validate_request(request, is_post=is_post)
⋮----
# If the session has been terminated, return 404 Not Found
response = self._create_error_response(
⋮----
def _check_accept_headers(self, request: Request) -> tuple[bool, bool]
⋮----
"""Check if the request accepts the required media types."""
accept_header = request.headers.get("accept", "")
accept_types = [media_type.strip() for media_type in accept_header.split(",")]
⋮----
has_json = any(media_type.startswith(CONTENT_TYPE_JSON) for media_type in accept_types)
has_sse = any(media_type.startswith(CONTENT_TYPE_SSE) for media_type in accept_types)
⋮----
def _check_content_type(self, request: Request) -> bool
⋮----
"""Check if the request has the correct Content-Type."""
content_type = request.headers.get("content-type", "")
content_type_parts = [part.strip() for part in content_type.split(";")[0].split(",")]
⋮----
async def _handle_post_request(self, scope: Scope, request: Request, receive: Receive, send: Send) -> None
⋮----
"""Handle POST requests containing JSON-RPC messages."""
writer = self._read_stream_writer
⋮----
# Check Accept headers
⋮----
# Validate Content-Type
⋮----
# Parse the body - only read it once
body = await request.body()
⋮----
raw_message = json.loads(body)
⋮----
response = self._create_error_response(f"Parse error: {str(e)}", HTTPStatus.BAD_REQUEST, PARSE_ERROR)
⋮----
message = JSONRPCMessage.model_validate(raw_message)
⋮----
# Check if this is an initialization request
is_initialization_request = isinstance(message.root, JSONRPCRequest) and message.root.method == "initialize"
⋮----
# Check if the server already has an established session
⋮----
# Check if request has a session ID
request_session_id = self._get_session_id(request)
⋮----
# If request has a session ID but doesn't match, return 404
⋮----
# For notifications and responses only, return 202 Accepted
⋮----
# Create response object and send it
response = self._create_json_response(
⋮----
# Process the message after sending the response
metadata = ServerMessageMetadata(request_context=request)
session_message = SessionMessage(message, metadata=metadata)
⋮----
# Extract the request ID outside the try block for proper scope
request_id = str(message.root.id)
# Register this stream for the request ID
⋮----
request_stream_reader = self._request_streams[request_id][1]
⋮----
# Process the message
⋮----
# Process messages from the request-specific stream
# We need to collect all messages until we get a response
response_message = None
⋮----
# Use similar approach to SSE writer for consistency
⋮----
# If it's a response, this is what we're waiting for
⋮----
response_message = event_message.message
⋮----
# For notifications and request, keep waiting
⋮----
# At this point we should have a response
⋮----
# Create JSON response
response = self._create_json_response(response_message)
⋮----
# This shouldn't happen in normal operation
⋮----
# Create SSE stream
⋮----
async def sse_writer()
⋮----
# Get the request ID from the incoming request message
⋮----
# Process messages from the request-specific stream
⋮----
# Build the event data
event_data = self._create_event_data(event_message)
⋮----
# If response, remove from pending streams and close
⋮----
# Create and start EventSourceResponse
# SSE stream mode (original behavior)
# Set up headers
headers = {
response = EventSourceResponse(
⋮----
# Start the SSE response (this will send headers immediately)
⋮----
# First send the response to establish the SSE connection
⋮----
# Then send the message to be processed by the server
⋮----
async def _handle_get_request(self, request: Request, send: Send) -> None
⋮----
"""
        Handle GET request to establish SSE.

        This allows the server to communicate to the client without the client
        first sending data via HTTP POST. The server can send JSON-RPC requests
        and notifications on this stream.
        """
⋮----
# Validate Accept header - must include text/event-stream
⋮----
# Handle resumability: check for Last-Event-ID header
⋮----
# Check if we already have an active GET stream
⋮----
# Create SSE stream
⋮----
async def standalone_sse_writer()
⋮----
# Create a standalone message stream for server-initiated messages
⋮----
standalone_stream_reader = self._request_streams[GET_STREAM_KEY][1]
⋮----
# Process messages from the standalone stream
⋮----
# For the standalone stream, we handle:
# - JSONRPCNotification (server sends notifications to client)
# - JSONRPCRequest (server sends requests to client)
# We should NOT receive JSONRPCResponse
⋮----
# Send the message via SSE
⋮----
# Create and start EventSourceResponse
⋮----
# This will send headers immediately and establish the SSE connection
⋮----
async def _handle_delete_request(self, request: Request, send: Send) -> None
⋮----
"""Handle DELETE requests for explicit session termination."""
# Validate session ID
⋮----
# If no session ID set, return Method Not Allowed
⋮----
async def _terminate_session(self) -> None
⋮----
"""Terminate the current session, closing all streams.

        Once terminated, all requests with this session ID will receive 404 Not Found.
        """
⋮----
# We need a copy of the keys to avoid modification during iteration
request_stream_keys = list(self._request_streams.keys())
⋮----
# Close all request streams asynchronously
⋮----
# Clear the request streams dictionary immediately
⋮----
async def _handle_unsupported_request(self, request: Request, send: Send) -> None
⋮----
"""Handle unsupported HTTP methods."""
⋮----
async def _validate_request_headers(self, request: Request, send: Send) -> bool
⋮----
async def _validate_session(self, request: Request, send: Send) -> bool
⋮----
"""Validate the session ID in the request."""
⋮----
# If we're not using session IDs, return True
⋮----
# Get the session ID from the request headers
⋮----
# If no session ID provided but required, return error
⋮----
# If session ID doesn't match, return error
⋮----
async def _validate_protocol_version(self, request: Request, send: Send) -> bool
⋮----
"""Validate the protocol version header in the request."""
# Get the protocol version from the request headers
protocol_version = request.headers.get(MCP_PROTOCOL_VERSION_HEADER)
⋮----
# If no protocol version provided, assume default version
⋮----
protocol_version = DEFAULT_NEGOTIATED_VERSION
⋮----
# Check if the protocol version is supported
⋮----
supported_versions = ", ".join(SUPPORTED_PROTOCOL_VERSIONS)
⋮----
async def _replay_events(self, last_event_id: str, request: Request, send: Send) -> None
⋮----
"""
        Replays events that would have been sent after the specified event ID.
        Only used when resumability is enabled.
        """
event_store = self._event_store
⋮----
# Create SSE stream for replay
⋮----
async def replay_sender()
⋮----
# Define an async callback for sending events
async def send_event(event_message: EventMessage) -> None
⋮----
# Replay past events and get the stream ID
stream_id = await event_store.replay_events_after(last_event_id, send_event)
⋮----
# If stream ID not in mapping, create it
⋮----
msg_reader = self._request_streams[stream_id][1]
⋮----
# Forward messages to SSE
⋮----
# Create and start EventSourceResponse
⋮----
"""Context manager that provides read and write streams for a connection.

        Yields:
            Tuple of (read_stream, write_stream) for bidirectional communication
        """
⋮----
# Create the memory streams for this connection
⋮----
# Store the streams
⋮----
# Start a task group for message routing
⋮----
# Create a message router that distributes messages to request streams
async def message_router()
⋮----
# Determine which request stream(s) should receive this message
message = session_message.message
target_request_id = None
# Check if this is a response
⋮----
response_id = str(message.root.id)
# If this response is for an existing request stream,
# send it there
⋮----
target_request_id = response_id
⋮----
# Extract related_request_id from meta if it exists
⋮----
target_request_id = str(session_message.metadata.related_request_id)
⋮----
request_stream_id = target_request_id if target_request_id is not None else GET_STREAM_KEY
⋮----
# Store the event if we have an event store,
# regardless of whether a client is connected
# messages will be replayed on the re-connect
event_id = None
⋮----
event_id = await self._event_store.store_event(request_stream_id, message)
⋮----
# Send both the message and the event ID
⋮----
# Stream might be closed, remove from registry
⋮----
# Start the message router
⋮----
# Yield the streams for the caller to use
⋮----
# Clean up the read and write streams
````

## File: src/mcp/server/streaming_asgi_transport.py
````python
"""
A modified version of httpx.ASGITransport that supports streaming responses.

This transport runs the ASGI app as a separate anyio task, allowing it to
handle streaming responses like SSE where the app doesn't terminate until
the connection is closed.

This is only intended for writing tests for the SSE transport.
"""
⋮----
class StreamingASGITransport(AsyncBaseTransport)
⋮----
"""
    A custom AsyncTransport that handles sending requests directly to an ASGI app
    and supports streaming responses like SSE.

    Unlike the standard ASGITransport, this transport runs the ASGI app in a
    separate anyio task, allowing it to handle responses from apps that don't
    terminate immediately (like SSE endpoints).

    Arguments:

    * `app` - The ASGI application.
    * `raise_app_exceptions` - Boolean indicating if exceptions in the application
       should be raised. Default to `True`. Can be set to `False` for use cases
       such as testing the content of a client 500 response.
    * `root_path` - The root path on which the ASGI application should be mounted.
    * `client` - A two-tuple indicating the client IP and port of incoming requests.
    * `response_timeout` - Timeout in seconds to wait for the initial response.
       Default is 10 seconds.

    TODO: https://github.com/encode/httpx/pull/3059 is adding something similar to
    upstream httpx. When that merges, we should delete this & switch back to the
    upstream implementation.
    """
⋮----
# ASGI scope.
scope = {
⋮----
# Request body
request_body_chunks = request.stream.__aiter__()
request_complete = False
⋮----
# Response state
status_code = 499
response_headers = None
response_started = False
response_complete = anyio.Event()
initial_response_ready = anyio.Event()
⋮----
# Synchronization for streaming response
⋮----
# ASGI callables.
async def receive() -> dict[str, Any]
⋮----
body = await request_body_chunks.__anext__()
⋮----
request_complete = True
⋮----
async def send(message: dict[str, Any]) -> None
⋮----
# Start the ASGI application in a separate task
async def run_app() -> None
⋮----
# Cast the receive and send functions to the ASGI types
⋮----
# Process messages from the ASGI app
async def process_messages() -> None
⋮----
status_code = message["status"]
response_headers = message.get("headers", [])
response_started = True
⋮----
# As soon as we have headers, we can return a response
⋮----
body = message.get("body", b"")
more_body = message.get("more_body", False)
⋮----
# Ensure events are set even if there's an error
⋮----
# Create tasks for running the app and processing messages
⋮----
# Wait for the initial response or timeout
⋮----
# Create a streaming response
⋮----
class StreamingASGIResponseStream(AsyncByteStream)
⋮----
"""
    A modified ASGIResponseStream that supports streaming responses.

    This class extends the standard ASGIResponseStream to handle cases where
    the response body continues to be generated after the initial response
    is returned.
    """
⋮----
async def __aiter__(self) -> typing.AsyncIterator[bytes]
````

## File: src/mcp/server/transport_security.py
````python
"""DNS rebinding protection for MCP server transports."""
⋮----
logger = logging.getLogger(__name__)
⋮----
class TransportSecuritySettings(BaseModel)
⋮----
"""Settings for MCP transport security features.

    These settings help protect against DNS rebinding attacks by validating
    incoming request headers.
    """
⋮----
enable_dns_rebinding_protection: bool = Field(
⋮----
allowed_hosts: list[str] = Field(
⋮----
allowed_origins: list[str] = Field(
⋮----
class TransportSecurityMiddleware
⋮----
"""Middleware to enforce DNS rebinding protection for MCP transport endpoints."""
⋮----
def __init__(self, settings: TransportSecuritySettings | None = None)
⋮----
# If not specified, disable DNS rebinding protection by default
# for backwards compatibility
⋮----
def _validate_host(self, host: str | None) -> bool
⋮----
"""Validate the Host header against allowed values."""
⋮----
# Check exact match first
⋮----
# Check wildcard port patterns
⋮----
# Extract base host from pattern
base_host = allowed[:-2]
# Check if the actual host starts with base host and has a port
⋮----
def _validate_origin(self, origin: str | None) -> bool
⋮----
"""Validate the Origin header against allowed values."""
# Origin can be absent for same-origin requests
⋮----
# Extract base origin from pattern
base_origin = allowed[:-2]
# Check if the actual origin starts with base origin and has a port
⋮----
def _validate_content_type(self, content_type: str | None) -> bool
⋮----
"""Validate the Content-Type header for POST requests."""
⋮----
# Content-Type must start with application/json
⋮----
async def validate_request(self, request: Request, is_post: bool = False) -> Response | None
⋮----
"""Validate request headers for DNS rebinding protection.

        Returns None if validation passes, or an error Response if validation fails.
        """
# Always validate Content-Type for POST requests
⋮----
content_type = request.headers.get("content-type")
⋮----
# Skip remaining validation if DNS rebinding protection is disabled
⋮----
# Validate Host header
host = request.headers.get("host")
⋮----
# Validate Origin header
origin = request.headers.get("origin")
````

## File: src/mcp/server/websocket.py
````python
logger = logging.getLogger(__name__)
⋮----
@asynccontextmanager
async def websocket_server(scope: Scope, receive: Receive, send: Send)
⋮----
"""
    WebSocket server transport for MCP. This is an ASGI application, suitable to be
    used with a framework like Starlette and a server like Hypercorn.
    """
⋮----
websocket = WebSocket(scope, receive, send)
⋮----
read_stream: MemoryObjectReceiveStream[SessionMessage | Exception]
read_stream_writer: MemoryObjectSendStream[SessionMessage | Exception]
⋮----
write_stream: MemoryObjectSendStream[SessionMessage]
write_stream_reader: MemoryObjectReceiveStream[SessionMessage]
⋮----
async def ws_reader()
⋮----
client_message = types.JSONRPCMessage.model_validate_json(msg)
⋮----
session_message = SessionMessage(client_message)
⋮----
async def ws_writer()
⋮----
obj = session_message.message.model_dump_json(by_alias=True, exclude_none=True)
````

## File: src/mcp/shared/_httpx_utils.py
````python
"""Utilities for creating standardized httpx AsyncClient instances."""
⋮----
__all__ = ["create_mcp_http_client"]
⋮----
class McpHttpClientFactory(Protocol)
⋮----
"""Create a standardized httpx AsyncClient with MCP defaults.

    This function provides common defaults used throughout the MCP codebase:
    - follow_redirects=True (always enabled)
    - Default timeout of 30 seconds if not specified

    Args:
        headers: Optional headers to include with all requests.
        timeout: Request timeout as httpx.Timeout object.
            Defaults to 30 seconds if not specified.
        auth: Optional authentication handler.

    Returns:
        Configured httpx.AsyncClient instance with MCP defaults.

    Note:
        The returned AsyncClient must be used as a context manager to ensure
        proper cleanup of connections.

    Examples:
        # Basic usage with MCP defaults
        async with create_mcp_http_client() as client:
            response = await client.get("https://api.example.com")

        # With custom headers
        headers = {"Authorization": "Bearer token"}
        async with create_mcp_http_client(headers) as client:
            response = await client.get("/endpoint")

        # With both custom headers and timeout
        timeout = httpx.Timeout(60.0, read=300.0)
        async with create_mcp_http_client(headers, timeout) as client:
            response = await client.get("/long-request")

        # With authentication
        from httpx import BasicAuth
        auth = BasicAuth(username="user", password="pass")
        async with create_mcp_http_client(headers, timeout, auth) as client:
            response = await client.get("/protected-endpoint")
    """
# Set MCP defaults
kwargs: dict[str, Any] = {
⋮----
# Handle timeout
⋮----
# Handle headers
⋮----
# Handle authentication
````

## File: src/mcp/shared/auth_utils.py
````python
"""Utilities for OAuth 2.0 Resource Indicators (RFC 8707)."""
⋮----
def resource_url_from_server_url(url: str | HttpUrl | AnyUrl) -> str
⋮----
"""Convert server URL to canonical resource URL per RFC 8707.

    RFC 8707 section 2 states that resource URIs "MUST NOT include a fragment component".
    Returns absolute URI with lowercase scheme/host for canonical form.

    Args:
        url: Server URL to convert

    Returns:
        Canonical resource URL string
    """
# Convert to string if needed
url_str = str(url)
⋮----
# Parse the URL and remove fragment, create canonical form
parsed = urlsplit(url_str)
canonical = urlunsplit(parsed._replace(scheme=parsed.scheme.lower(), netloc=parsed.netloc.lower(), fragment=""))
⋮----
def check_resource_allowed(requested_resource: str, configured_resource: str) -> bool
⋮----
"""Check if a requested resource URL matches a configured resource URL.

    A requested resource matches if it has the same scheme, domain, port,
    and its path starts with the configured resource's path. This allows
    hierarchical matching where a token for a parent resource can be used
    for child resources.

    Args:
        requested_resource: The resource URL being requested
        configured_resource: The resource URL that has been configured

    Returns:
        True if the requested resource matches the configured resource
    """
# Parse both URLs
requested = urlparse(requested_resource)
configured = urlparse(configured_resource)
⋮----
# Compare scheme, host, and port (origin)
⋮----
# Handle cases like requested=/foo and configured=/foo/
requested_path = requested.path
configured_path = configured.path
⋮----
# If requested path is shorter, it cannot be a child
⋮----
# Check if the requested path starts with the configured path
# Ensure both paths end with / for proper comparison
# This ensures that paths like "/api123" don't incorrectly match "/api"
````

## File: src/mcp/shared/auth.py
````python
class OAuthToken(BaseModel)
⋮----
"""
    See https://datatracker.ietf.org/doc/html/rfc6749#section-5.1
    """
⋮----
access_token: str
token_type: Literal["Bearer"] = "Bearer"
expires_in: int | None = None
scope: str | None = None
refresh_token: str | None = None
⋮----
@field_validator("token_type", mode="before")
@classmethod
    def normalize_token_type(cls, v: str | None) -> str | None
⋮----
# Bearer is title-cased in the spec, so we normalize it
# https://datatracker.ietf.org/doc/html/rfc6750#section-4
⋮----
class InvalidScopeError(Exception)
⋮----
def __init__(self, message: str)
⋮----
class InvalidRedirectUriError(Exception)
⋮----
class OAuthClientMetadata(BaseModel)
⋮----
"""
    RFC 7591 OAuth 2.0 Dynamic Client Registration metadata.
    See https://datatracker.ietf.org/doc/html/rfc7591#section-2
    for the full specification.
    """
⋮----
redirect_uris: list[AnyUrl] = Field(..., min_length=1)
# token_endpoint_auth_method: this implementation only supports none &
# client_secret_post;
# ie: we do not support client_secret_basic
token_endpoint_auth_method: Literal["none", "client_secret_post"] = "client_secret_post"
# grant_types: this implementation only supports authorization_code & refresh_token
grant_types: list[Literal["authorization_code", "refresh_token"]] = [
# this implementation only supports code; ie: it does not support implicit grants
response_types: list[Literal["code"]] = ["code"]
⋮----
# these fields are currently unused, but we support & store them for potential
# future use
client_name: str | None = None
client_uri: AnyHttpUrl | None = None
logo_uri: AnyHttpUrl | None = None
contacts: list[str] | None = None
tos_uri: AnyHttpUrl | None = None
policy_uri: AnyHttpUrl | None = None
jwks_uri: AnyHttpUrl | None = None
jwks: Any | None = None
software_id: str | None = None
software_version: str | None = None
⋮----
def validate_scope(self, requested_scope: str | None) -> list[str] | None
⋮----
requested_scopes = requested_scope.split(" ")
allowed_scopes = [] if self.scope is None else self.scope.split(" ")
⋮----
def validate_redirect_uri(self, redirect_uri: AnyUrl | None) -> AnyUrl
⋮----
# Validate redirect_uri against client's registered redirect URIs
⋮----
class OAuthClientInformationFull(OAuthClientMetadata)
⋮----
"""
    RFC 7591 OAuth 2.0 Dynamic Client Registration full response
    (client information plus metadata).
    """
⋮----
client_id: str
client_secret: str | None = None
client_id_issued_at: int | None = None
client_secret_expires_at: int | None = None
⋮----
class OAuthMetadata(BaseModel)
⋮----
"""
    RFC 8414 OAuth 2.0 Authorization Server Metadata.
    See https://datatracker.ietf.org/doc/html/rfc8414#section-2
    """
⋮----
issuer: AnyHttpUrl
authorization_endpoint: AnyHttpUrl
token_endpoint: AnyHttpUrl
registration_endpoint: AnyHttpUrl | None = None
scopes_supported: list[str] | None = None
response_types_supported: list[str] = ["code"]
response_modes_supported: list[Literal["query", "fragment"]] | None = None
grant_types_supported: list[str] | None = None
token_endpoint_auth_methods_supported: list[str] | None = None
token_endpoint_auth_signing_alg_values_supported: None = None
service_documentation: AnyHttpUrl | None = None
ui_locales_supported: list[str] | None = None
op_policy_uri: AnyHttpUrl | None = None
op_tos_uri: AnyHttpUrl | None = None
revocation_endpoint: AnyHttpUrl | None = None
revocation_endpoint_auth_methods_supported: list[str] | None = None
revocation_endpoint_auth_signing_alg_values_supported: None = None
introspection_endpoint: AnyHttpUrl | None = None
introspection_endpoint_auth_methods_supported: list[str] | None = None
introspection_endpoint_auth_signing_alg_values_supported: None = None
code_challenge_methods_supported: list[str] | None = None
⋮----
class ProtectedResourceMetadata(BaseModel)
⋮----
"""
    RFC 9728 OAuth 2.0 Protected Resource Metadata.
    See https://datatracker.ietf.org/doc/html/rfc9728#section-2
    """
⋮----
resource: AnyHttpUrl
authorization_servers: list[AnyHttpUrl] = Field(..., min_length=1)
⋮----
bearer_methods_supported: list[str] | None = Field(default=["header"])  # MCP only supports header method
resource_documentation: AnyHttpUrl | None = None
````

## File: src/mcp/shared/context.py
````python
SessionT = TypeVar("SessionT", bound=BaseSession[Any, Any, Any, Any, Any])
LifespanContextT = TypeVar("LifespanContextT")
RequestT = TypeVar("RequestT", default=Any)
⋮----
@dataclass
class RequestContext(Generic[SessionT, LifespanContextT, RequestT])
⋮----
request_id: RequestId
meta: RequestParams.Meta | None
session: SessionT
lifespan_context: LifespanContextT
request: RequestT | None = None
````

## File: src/mcp/shared/exceptions.py
````python
class McpError(Exception)
⋮----
"""
    Exception type raised when an error arrives over an MCP connection.
    """
⋮----
error: ErrorData
⋮----
def __init__(self, error: ErrorData)
⋮----
"""Initialize McpError."""
````

## File: src/mcp/shared/memory.py
````python
"""
In-memory transports
"""
⋮----
MessageStream = tuple[MemoryObjectReceiveStream[SessionMessage | Exception], MemoryObjectSendStream[SessionMessage]]
⋮----
@asynccontextmanager
async def create_client_server_memory_streams() -> AsyncGenerator[tuple[MessageStream, MessageStream], None]
⋮----
"""
    Creates a pair of bidirectional memory streams for client-server communication.

    Returns:
        A tuple of (client_streams, server_streams) where each is a tuple of
        (read_stream, write_stream)
    """
# Create streams for both directions
⋮----
client_streams = (server_to_client_receive, client_to_server_send)
server_streams = (client_to_server_receive, server_to_client_send)
⋮----
"""Creates a ClientSession that is connected to a running MCP server."""
⋮----
# Create a cancel scope for the server task
````

## File: src/mcp/shared/message.py
````python
"""
Message wrapper with metadata support.

This module defines a wrapper type that combines JSONRPCMessage with metadata
to support transport-specific features like resumability.
"""
⋮----
ResumptionToken = str
⋮----
ResumptionTokenUpdateCallback = Callable[[ResumptionToken], Awaitable[None]]
⋮----
@dataclass
class ClientMessageMetadata
⋮----
"""Metadata specific to client messages."""
⋮----
resumption_token: ResumptionToken | None = None
on_resumption_token_update: Callable[[ResumptionToken], Awaitable[None]] | None = None
⋮----
@dataclass
class ServerMessageMetadata
⋮----
"""Metadata specific to server messages."""
⋮----
related_request_id: RequestId | None = None
# Request-specific context (e.g., headers, auth info)
request_context: object | None = None
⋮----
MessageMetadata = ClientMessageMetadata | ServerMessageMetadata | None
⋮----
@dataclass
class SessionMessage
⋮----
"""A message with specific metadata for transport-specific features."""
⋮----
message: JSONRPCMessage
metadata: MessageMetadata = None
````

## File: src/mcp/shared/metadata_utils.py
````python
"""Utility functions for working with metadata in MCP types.

These utilities are primarily intended for client-side usage to properly display
human-readable names in user interfaces in a spec compliant way.
"""
⋮----
def get_display_name(obj: Tool | Resource | Prompt | ResourceTemplate | Implementation) -> str
⋮----
"""
    Get the display name for an MCP object with proper precedence.

    This is a client-side utility function designed to help MCP clients display
    human-readable names in their user interfaces. When servers provide a 'title'
    field, it should be preferred over the programmatic 'name' field for display.

    For tools: title > annotations.title > name
    For other objects: title > name

    Example:
        # In a client displaying available tools
        tools = await session.list_tools()
        for tool in tools.tools:
            display_name = get_display_name(tool)
            print(f"Available tool: {display_name}")

    Args:
        obj: An MCP object with name and optional title fields

    Returns:
        The display name to use for UI presentation
    """
⋮----
# Tools have special precedence: title > annotations.title > name
⋮----
# All other objects: title > name
````

## File: src/mcp/shared/progress.py
````python
class Progress(BaseModel)
⋮----
progress: float
total: float | None
⋮----
@dataclass
class ProgressContext(Generic[SendRequestT, SendNotificationT, SendResultT, ReceiveRequestT, ReceiveNotificationT])
⋮----
session: BaseSession[SendRequestT, SendNotificationT, SendResultT, ReceiveRequestT, ReceiveNotificationT]
progress_token: ProgressToken
⋮----
current: float = field(default=0.0, init=False)
⋮----
async def progress(self, amount: float, message: str | None = None) -> None
⋮----
progress_ctx = ProgressContext(ctx.session, ctx.meta.progressToken, total)
````

## File: src/mcp/shared/session.py
````python
SendRequestT = TypeVar("SendRequestT", ClientRequest, ServerRequest)
SendResultT = TypeVar("SendResultT", ClientResult, ServerResult)
SendNotificationT = TypeVar("SendNotificationT", ClientNotification, ServerNotification)
ReceiveRequestT = TypeVar("ReceiveRequestT", ClientRequest, ServerRequest)
ReceiveResultT = TypeVar("ReceiveResultT", bound=BaseModel)
ReceiveNotificationT = TypeVar("ReceiveNotificationT", ClientNotification, ServerNotification)
⋮----
RequestId = str | int
⋮----
class ProgressFnT(Protocol)
⋮----
"""Protocol for progress notification callbacks."""
⋮----
async def __call__(self, progress: float, total: float | None, message: str | None) -> None: ...
⋮----
class RequestResponder(Generic[ReceiveRequestT, SendResultT])
⋮----
"""Handles responding to MCP requests and manages request lifecycle.

    This class MUST be used as a context manager to ensure proper cleanup and
    cancellation handling:

    Example:
        with request_responder as resp:
            await resp.respond(result)

    The context manager ensures:
    1. Proper cancellation scope setup and cleanup
    2. Request completion tracking
    3. Cleanup of in-flight requests
    """
⋮----
self._entered = False  # Track if we're in a context manager
⋮----
def __enter__(self) -> "RequestResponder[ReceiveRequestT, SendResultT]"
⋮----
"""Enter the context manager, enabling request cancellation tracking."""
⋮----
"""Exit the context manager, performing cleanup and notifying completion."""
⋮----
async def respond(self, response: SendResultT | ErrorData) -> None
⋮----
"""Send a response for this request.

        Must be called within a context manager block.
        Raises:
            RuntimeError: If not used within a context manager
            AssertionError: If request was already responded to
        """
⋮----
await self._session._send_response(  # type: ignore[reportPrivateUsage]
⋮----
async def cancel(self) -> None
⋮----
"""Cancel this request and mark it as completed."""
⋮----
self._completed = True  # Mark as completed so it's removed from in_flight
# Send an error response to indicate cancellation
await self._session._send_response(  # type: ignore[reportPrivateUsage]
⋮----
@property
    def in_flight(self) -> bool
⋮----
@property
    def cancelled(self) -> bool
⋮----
class BaseSession(
⋮----
"""
    Implements an MCP "session" on top of read/write streams, including features
    like request/response linking, notifications, and progress.

    This class is an async context manager that automatically starts processing
    messages when entered.
    """
⋮----
_response_streams: dict[RequestId, MemoryObjectSendStream[JSONRPCResponse | JSONRPCError]]
_request_id: int
_in_flight: dict[RequestId, RequestResponder[ReceiveRequestT, SendResultT]]
_progress_callbacks: dict[RequestId, ProgressFnT]
⋮----
# If none, reading will never time out
⋮----
async def __aenter__(self) -> Self
⋮----
# Using BaseSession as a context manager should not block on exit (this
# would be very surprising behavior), so make sure to cancel the tasks
# in the task group.
⋮----
"""
        Sends a request and wait for a response. Raises an McpError if the
        response contains an error. If a request read timeout is provided, it
        will take precedence over the session read timeout.

        Do not use this method to emit notifications! Use send_notification()
        instead.
        """
request_id = self._request_id
⋮----
# Set up progress token if progress callback is provided
request_data = request.model_dump(by_alias=True, mode="json", exclude_none=True)
⋮----
# Use request_id as progress token
⋮----
# Store the callback for this request
⋮----
jsonrpc_request = JSONRPCRequest(
⋮----
# request read timeout takes precedence over session read timeout
timeout = None
⋮----
timeout = request_read_timeout_seconds.total_seconds()
⋮----
timeout = self._session_read_timeout_seconds.total_seconds()
⋮----
response_or_error = await response_stream_reader.receive()
⋮----
"""
        Emits a notification, which is a one-way message that does not expect
        a response.
        """
# Some transport implementations may need to set the related_request_id
# to attribute to the notifications to the request that triggered them.
jsonrpc_notification = JSONRPCNotification(
session_message = SessionMessage(
⋮----
async def _send_response(self, request_id: RequestId, response: SendResultT | ErrorData) -> None
⋮----
jsonrpc_error = JSONRPCError(jsonrpc="2.0", id=request_id, error=response)
session_message = SessionMessage(message=JSONRPCMessage(jsonrpc_error))
⋮----
jsonrpc_response = JSONRPCResponse(
session_message = SessionMessage(message=JSONRPCMessage(jsonrpc_response))
⋮----
async def _receive_loop(self) -> None
⋮----
validated_request = self._receive_request_type.model_validate(
responder = RequestResponder(
⋮----
if not responder._completed:  # type: ignore[reportPrivateUsage]
⋮----
# For request validation errors, send a proper JSON-RPC error
# response instead of crashing the server
⋮----
error_response = JSONRPCError(
session_message = SessionMessage(message=JSONRPCMessage(error_response))
⋮----
notification = self._receive_notification_type.model_validate(
# Handle cancellation notifications
⋮----
cancelled_id = notification.root.params.requestId
⋮----
# Handle progress notifications callback
⋮----
progress_token = notification.root.params.progressToken
# If there is a progress callback for this token,
# call it with the progress information
⋮----
callback = self._progress_callbacks[progress_token]
⋮----
# For other validation errors, log and continue
⋮----
else:  # Response or error
stream = self._response_streams.pop(message.message.root.id, None)
⋮----
# This is expected when the client disconnects abruptly.
# Without this handler, the exception would propagate up and
# crash the server's task group.
⋮----
# Other exceptions are not expected and should be logged. We purposefully
# catch all exceptions here to avoid crashing the server.
⋮----
# after the read stream is closed, we need to send errors
# to any pending requests
⋮----
error = ErrorData(code=CONNECTION_CLOSED, message="Connection closed")
⋮----
# Stream might already be closed
⋮----
async def _received_request(self, responder: RequestResponder[ReceiveRequestT, SendResultT]) -> None
⋮----
"""
        Can be overridden by subclasses to handle a request without needing to
        listen on the message stream.

        If the request is responded to within this method, it will not be
        forwarded on to the message stream.
        """
⋮----
async def _received_notification(self, notification: ReceiveNotificationT) -> None
⋮----
"""
        Can be overridden by subclasses to handle a notification without needing
        to listen on the message stream.
        """
⋮----
"""
        Sends a progress notification for a request that is currently being
        processed.
        """
⋮----
"""A generic handler for incoming messages. Overwritten by subclasses."""
````

## File: src/mcp/shared/version.py
````python
SUPPORTED_PROTOCOL_VERSIONS: list[str] = ["2024-11-05", "2025-03-26", LATEST_PROTOCOL_VERSION]
````

## File: src/mcp/__init__.py
````python
__all__ = [
````

## File: src/mcp/types.py
````python
"""
Model Context Protocol bindings for Python

These bindings were generated from https://github.com/modelcontextprotocol/specification,
using Claude, with a prompt something like the following:

Generate idiomatic Python bindings for this schema for MCP, or the "Model Context
Protocol." The schema is defined in TypeScript, but there's also a JSON Schema version
for reference.

* For the bindings, let's use Pydantic V2 models.
* Each model should allow extra fields everywhere, by specifying `model_config =
  ConfigDict(extra='allow')`. Do this in every case, instead of a custom base class.
* Union types should be represented with a Pydantic `RootModel`.
* Define additional model classes instead of using dictionaries. Do this even if they're
  not separate types in the schema.
"""
⋮----
LATEST_PROTOCOL_VERSION = "2025-06-18"
⋮----
"""
The default negotiated version of the Model Context Protocol when no version is specified.
We need this to satisfy the MCP specification, which requires the server to assume a
specific version if none is provided by the client. See section "Protocol Version Header" at
https://modelcontextprotocol.io/specification
"""
DEFAULT_NEGOTIATED_VERSION = "2025-03-26"
⋮----
ProgressToken = str | int
Cursor = str
Role = Literal["user", "assistant"]
RequestId = Annotated[int | str, Field(union_mode="left_to_right")]
AnyFunction: TypeAlias = Callable[..., Any]
⋮----
class RequestParams(BaseModel)
⋮----
class Meta(BaseModel)
⋮----
progressToken: ProgressToken | None = None
"""
        If specified, the caller requests out-of-band progress notifications for
        this request (as represented by notifications/progress). The value of this
        parameter is an opaque token that will be attached to any subsequent
        notifications. The receiver is not obligated to provide these notifications.
        """
⋮----
model_config = ConfigDict(extra="allow")
⋮----
meta: Meta | None = Field(alias="_meta", default=None)
⋮----
class PaginatedRequestParams(RequestParams)
⋮----
cursor: Cursor | None = None
"""
    An opaque token representing the current pagination position.
    If provided, the server should return results starting after this cursor.
    """
⋮----
class NotificationParams(BaseModel)
⋮----
"""
    See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
    for notes on _meta usage.
    """
⋮----
RequestParamsT = TypeVar("RequestParamsT", bound=RequestParams | dict[str, Any] | None)
NotificationParamsT = TypeVar("NotificationParamsT", bound=NotificationParams | dict[str, Any] | None)
MethodT = TypeVar("MethodT", bound=str)
⋮----
class Request(BaseModel, Generic[RequestParamsT, MethodT])
⋮----
"""Base class for JSON-RPC requests."""
⋮----
method: MethodT
params: RequestParamsT
⋮----
class PaginatedRequest(Request[PaginatedRequestParams | None, MethodT], Generic[MethodT])
⋮----
"""Base class for paginated requests,
    matching the schema's PaginatedRequest interface."""
⋮----
params: PaginatedRequestParams | None = None
⋮----
class Notification(BaseModel, Generic[NotificationParamsT, MethodT])
⋮----
"""Base class for JSON-RPC notifications."""
⋮----
params: NotificationParamsT
⋮----
class Result(BaseModel)
⋮----
"""Base class for JSON-RPC results."""
⋮----
meta: dict[str, Any] | None = Field(alias="_meta", default=None)
⋮----
class PaginatedResult(Result)
⋮----
nextCursor: Cursor | None = None
"""
    An opaque token representing the pagination position after the last returned result.
    If present, there may be more results available.
    """
⋮----
class JSONRPCRequest(Request[dict[str, Any] | None, str])
⋮----
"""A request that expects a response."""
⋮----
jsonrpc: Literal["2.0"]
id: RequestId
method: str
params: dict[str, Any] | None = None
⋮----
class JSONRPCNotification(Notification[dict[str, Any] | None, str])
⋮----
"""A notification which does not expect a response."""
⋮----
class JSONRPCResponse(BaseModel)
⋮----
"""A successful (non-error) response to a request."""
⋮----
result: dict[str, Any]
⋮----
# SDK error codes
CONNECTION_CLOSED = -32000
# REQUEST_TIMEOUT = -32001  # the typescript sdk uses this
⋮----
# Standard JSON-RPC error codes
PARSE_ERROR = -32700
INVALID_REQUEST = -32600
METHOD_NOT_FOUND = -32601
INVALID_PARAMS = -32602
INTERNAL_ERROR = -32603
⋮----
class ErrorData(BaseModel)
⋮----
"""Error information for JSON-RPC error responses."""
⋮----
code: int
"""The error type that occurred."""
⋮----
message: str
"""
    A short description of the error. The message SHOULD be limited to a concise single
    sentence.
    """
⋮----
data: Any | None = None
"""
    Additional information about the error. The value of this member is defined by the
    sender (e.g. detailed error information, nested errors etc.).
    """
⋮----
class JSONRPCError(BaseModel)
⋮----
"""A response to a request that indicates an error occurred."""
⋮----
id: str | int
error: ErrorData
⋮----
class JSONRPCMessage(RootModel[JSONRPCRequest | JSONRPCNotification | JSONRPCResponse | JSONRPCError])
⋮----
class EmptyResult(Result)
⋮----
"""A response that indicates success but carries no data."""
⋮----
class BaseMetadata(BaseModel)
⋮----
"""Base class for entities with name and optional title fields."""
⋮----
name: str
"""The programmatic name of the entity."""
⋮----
title: str | None = None
"""
    Intended for UI and end-user contexts — optimized to be human-readable and easily understood,
    even by those unfamiliar with domain-specific terminology.

    If not provided, the name should be used for display (except for Tool,
    where `annotations.title` should be given precedence over using `name`,
    if present).
    """
⋮----
class Implementation(BaseMetadata)
⋮----
"""Describes the name and version of an MCP implementation."""
⋮----
version: str
⋮----
class RootsCapability(BaseModel)
⋮----
"""Capability for root operations."""
⋮----
listChanged: bool | None = None
"""Whether the client supports notifications for changes to the roots list."""
⋮----
class SamplingCapability(BaseModel)
⋮----
"""Capability for sampling operations."""
⋮----
class ElicitationCapability(BaseModel)
⋮----
"""Capability for elicitation operations."""
⋮----
class ClientCapabilities(BaseModel)
⋮----
"""Capabilities a client may support."""
⋮----
experimental: dict[str, dict[str, Any]] | None = None
"""Experimental, non-standard capabilities that the client supports."""
sampling: SamplingCapability | None = None
"""Present if the client supports sampling from an LLM."""
elicitation: ElicitationCapability | None = None
"""Present if the client supports elicitation from the user."""
roots: RootsCapability | None = None
"""Present if the client supports listing roots."""
⋮----
class PromptsCapability(BaseModel)
⋮----
"""Capability for prompts operations."""
⋮----
"""Whether this server supports notifications for changes to the prompt list."""
⋮----
class ResourcesCapability(BaseModel)
⋮----
"""Capability for resources operations."""
⋮----
subscribe: bool | None = None
"""Whether this server supports subscribing to resource updates."""
⋮----
"""Whether this server supports notifications for changes to the resource list."""
⋮----
class ToolsCapability(BaseModel)
⋮----
"""Capability for tools operations."""
⋮----
"""Whether this server supports notifications for changes to the tool list."""
⋮----
class LoggingCapability(BaseModel)
⋮----
"""Capability for logging operations."""
⋮----
class ServerCapabilities(BaseModel)
⋮----
"""Capabilities that a server may support."""
⋮----
"""Experimental, non-standard capabilities that the server supports."""
logging: LoggingCapability | None = None
"""Present if the server supports sending log messages to the client."""
prompts: PromptsCapability | None = None
"""Present if the server offers any prompt templates."""
resources: ResourcesCapability | None = None
"""Present if the server offers any resources to read."""
tools: ToolsCapability | None = None
"""Present if the server offers any tools to call."""
⋮----
class InitializeRequestParams(RequestParams)
⋮----
"""Parameters for the initialize request."""
⋮----
protocolVersion: str | int
"""The latest version of the Model Context Protocol that the client supports."""
capabilities: ClientCapabilities
clientInfo: Implementation
⋮----
class InitializeRequest(Request[InitializeRequestParams, Literal["initialize"]])
⋮----
"""
    This request is sent from the client to the server when it first connects, asking it
    to begin initialization.
    """
⋮----
method: Literal["initialize"]
params: InitializeRequestParams
⋮----
class InitializeResult(Result)
⋮----
"""After receiving an initialize request from the client, the server sends this."""
⋮----
"""The version of the Model Context Protocol that the server wants to use."""
capabilities: ServerCapabilities
serverInfo: Implementation
instructions: str | None = None
"""Instructions describing how to use the server and its features."""
⋮----
class InitializedNotification(Notification[NotificationParams | None, Literal["notifications/initialized"]])
⋮----
"""
    This notification is sent from the client to the server after initialization has
    finished.
    """
⋮----
method: Literal["notifications/initialized"]
params: NotificationParams | None = None
⋮----
class PingRequest(Request[RequestParams | None, Literal["ping"]])
⋮----
"""
    A ping, issued by either the server or the client, to check that the other party is
    still alive.
    """
⋮----
method: Literal["ping"]
params: RequestParams | None = None
⋮----
class ProgressNotificationParams(NotificationParams)
⋮----
"""Parameters for progress notifications."""
⋮----
progressToken: ProgressToken
"""
    The progress token which was given in the initial request, used to associate this
    notification with the request that is proceeding.
    """
progress: float
"""
    The progress thus far. This should increase every time progress is made, even if the
    total is unknown.
    """
total: float | None = None
"""Total number of items to process (or total progress required), if known."""
message: str | None = None
"""
    Message related to progress. This should provide relevant human readable
    progress information.
    """
⋮----
class ProgressNotification(Notification[ProgressNotificationParams, Literal["notifications/progress"]])
⋮----
"""
    An out-of-band notification used to inform the receiver of a progress update for a
    long-running request.
    """
⋮----
method: Literal["notifications/progress"]
params: ProgressNotificationParams
⋮----
class ListResourcesRequest(PaginatedRequest[Literal["resources/list"]])
⋮----
"""Sent from the client to request a list of resources the server has."""
⋮----
method: Literal["resources/list"]
⋮----
class Annotations(BaseModel)
⋮----
audience: list[Role] | None = None
priority: Annotated[float, Field(ge=0.0, le=1.0)] | None = None
⋮----
class Resource(BaseMetadata)
⋮----
"""A known resource that the server is capable of reading."""
⋮----
uri: Annotated[AnyUrl, UrlConstraints(host_required=False)]
"""The URI of this resource."""
description: str | None = None
"""A description of what this resource represents."""
mimeType: str | None = None
"""The MIME type of this resource, if known."""
size: int | None = None
"""
    The size of the raw resource content, in bytes (i.e., before base64 encoding
    or any tokenization), if known.

    This can be used by Hosts to display file sizes and estimate context window usage.
    """
annotations: Annotations | None = None
⋮----
class ResourceTemplate(BaseMetadata)
⋮----
"""A template description for resources available on the server."""
⋮----
uriTemplate: str
"""
    A URI template (according to RFC 6570) that can be used to construct resource
    URIs.
    """
⋮----
"""A human-readable description of what this template is for."""
⋮----
"""
    The MIME type for all resources that match this template. This should only be
    included if all resources matching this template have the same type.
    """
⋮----
class ListResourcesResult(PaginatedResult)
⋮----
"""The server's response to a resources/list request from the client."""
⋮----
resources: list[Resource]
⋮----
class ListResourceTemplatesRequest(PaginatedRequest[Literal["resources/templates/list"]])
⋮----
"""Sent from the client to request a list of resource templates the server has."""
⋮----
method: Literal["resources/templates/list"]
⋮----
class ListResourceTemplatesResult(PaginatedResult)
⋮----
"""The server's response to a resources/templates/list request from the client."""
⋮----
resourceTemplates: list[ResourceTemplate]
⋮----
class ReadResourceRequestParams(RequestParams)
⋮----
"""Parameters for reading a resource."""
⋮----
"""
    The URI of the resource to read. The URI can use any protocol; it is up to the
    server how to interpret it.
    """
⋮----
class ReadResourceRequest(Request[ReadResourceRequestParams, Literal["resources/read"]])
⋮----
"""Sent from the client to the server, to read a specific resource URI."""
⋮----
method: Literal["resources/read"]
params: ReadResourceRequestParams
⋮----
class ResourceContents(BaseModel)
⋮----
"""The contents of a specific resource or sub-resource."""
⋮----
class TextResourceContents(ResourceContents)
⋮----
"""Text contents of a resource."""
⋮----
text: str
"""
    The text of the item. This must only be set if the item can actually be represented
    as text (not binary data).
    """
⋮----
class BlobResourceContents(ResourceContents)
⋮----
"""Binary contents of a resource."""
⋮----
blob: str
"""A base64-encoded string representing the binary data of the item."""
⋮----
class ReadResourceResult(Result)
⋮----
"""The server's response to a resources/read request from the client."""
⋮----
contents: list[TextResourceContents | BlobResourceContents]
⋮----
class ResourceListChangedNotification(
⋮----
"""
    An optional notification from the server to the client, informing it that the list
    of resources it can read from has changed.
    """
⋮----
method: Literal["notifications/resources/list_changed"]
⋮----
class SubscribeRequestParams(RequestParams)
⋮----
"""Parameters for subscribing to a resource."""
⋮----
"""
    The URI of the resource to subscribe to. The URI can use any protocol; it is up to
    the server how to interpret it.
    """
⋮----
class SubscribeRequest(Request[SubscribeRequestParams, Literal["resources/subscribe"]])
⋮----
"""
    Sent from the client to request resources/updated notifications from the server
    whenever a particular resource changes.
    """
⋮----
method: Literal["resources/subscribe"]
params: SubscribeRequestParams
⋮----
class UnsubscribeRequestParams(RequestParams)
⋮----
"""Parameters for unsubscribing from a resource."""
⋮----
"""The URI of the resource to unsubscribe from."""
⋮----
class UnsubscribeRequest(Request[UnsubscribeRequestParams, Literal["resources/unsubscribe"]])
⋮----
"""
    Sent from the client to request cancellation of resources/updated notifications from
    the server.
    """
⋮----
method: Literal["resources/unsubscribe"]
params: UnsubscribeRequestParams
⋮----
class ResourceUpdatedNotificationParams(NotificationParams)
⋮----
"""Parameters for resource update notifications."""
⋮----
"""
    The URI of the resource that has been updated. This might be a sub-resource of the
    one that the client actually subscribed to.
    """
⋮----
class ResourceUpdatedNotification(
⋮----
"""
    A notification from the server to the client, informing it that a resource has
    changed and may need to be read again.
    """
⋮----
method: Literal["notifications/resources/updated"]
params: ResourceUpdatedNotificationParams
⋮----
class ListPromptsRequest(PaginatedRequest[Literal["prompts/list"]])
⋮----
"""Sent from the client to request a list of prompts and prompt templates."""
⋮----
method: Literal["prompts/list"]
⋮----
class PromptArgument(BaseModel)
⋮----
"""An argument for a prompt template."""
⋮----
"""The name of the argument."""
⋮----
"""A human-readable description of the argument."""
required: bool | None = None
"""Whether this argument must be provided."""
⋮----
class Prompt(BaseMetadata)
⋮----
"""A prompt or prompt template that the server offers."""
⋮----
"""An optional description of what this prompt provides."""
arguments: list[PromptArgument] | None = None
"""A list of arguments to use for templating the prompt."""
⋮----
class ListPromptsResult(PaginatedResult)
⋮----
"""The server's response to a prompts/list request from the client."""
⋮----
prompts: list[Prompt]
⋮----
class GetPromptRequestParams(RequestParams)
⋮----
"""Parameters for getting a prompt."""
⋮----
"""The name of the prompt or prompt template."""
arguments: dict[str, str] | None = None
"""Arguments to use for templating the prompt."""
⋮----
class GetPromptRequest(Request[GetPromptRequestParams, Literal["prompts/get"]])
⋮----
"""Used by the client to get a prompt provided by the server."""
⋮----
method: Literal["prompts/get"]
params: GetPromptRequestParams
⋮----
class TextContent(BaseModel)
⋮----
"""Text content for a message."""
⋮----
type: Literal["text"]
⋮----
"""The text content of the message."""
⋮----
class ImageContent(BaseModel)
⋮----
"""Image content for a message."""
⋮----
type: Literal["image"]
data: str
"""The base64-encoded image data."""
mimeType: str
"""
    The MIME type of the image. Different providers may support different
    image types.
    """
⋮----
class AudioContent(BaseModel)
⋮----
"""Audio content for a message."""
⋮----
type: Literal["audio"]
⋮----
"""The base64-encoded audio data."""
⋮----
"""
    The MIME type of the audio. Different providers may support different
    audio types.
    """
⋮----
class SamplingMessage(BaseModel)
⋮----
"""Describes a message issued to or received from an LLM API."""
⋮----
role: Role
content: TextContent | ImageContent | AudioContent
⋮----
class EmbeddedResource(BaseModel)
⋮----
"""
    The contents of a resource, embedded into a prompt or tool call result.

    It is up to the client how best to render embedded resources for the benefit
    of the LLM and/or the user.
    """
⋮----
type: Literal["resource"]
resource: TextResourceContents | BlobResourceContents
⋮----
class ResourceLink(Resource)
⋮----
"""
    A resource that the server is capable of reading, included in a prompt or tool call result.

    Note: resource links returned by tools are not guaranteed to appear in the results of `resources/list` requests.
    """
⋮----
type: Literal["resource_link"]
⋮----
ContentBlock = TextContent | ImageContent | AudioContent | ResourceLink | EmbeddedResource
"""A content block that can be used in prompts and tool results."""
⋮----
Content: TypeAlias = ContentBlock
# """DEPRECATED: Content is deprecated, you should use ContentBlock directly."""
⋮----
class PromptMessage(BaseModel)
⋮----
"""Describes a message returned as part of a prompt."""
⋮----
content: ContentBlock
⋮----
class GetPromptResult(Result)
⋮----
"""The server's response to a prompts/get request from the client."""
⋮----
"""An optional description for the prompt."""
messages: list[PromptMessage]
⋮----
class PromptListChangedNotification(
⋮----
"""
    An optional notification from the server to the client, informing it that the list
    of prompts it offers has changed.
    """
⋮----
method: Literal["notifications/prompts/list_changed"]
⋮----
class ListToolsRequest(PaginatedRequest[Literal["tools/list"]])
⋮----
"""Sent from the client to request a list of tools the server has."""
⋮----
method: Literal["tools/list"]
⋮----
class ToolAnnotations(BaseModel)
⋮----
"""
    Additional properties describing a Tool to clients.

    NOTE: all properties in ToolAnnotations are **hints**.
    They are not guaranteed to provide a faithful description of
    tool behavior (including descriptive properties like `title`).

    Clients should never make tool use decisions based on ToolAnnotations
    received from untrusted servers.
    """
⋮----
"""A human-readable title for the tool."""
⋮----
readOnlyHint: bool | None = None
"""
    If true, the tool does not modify its environment.
    Default: false
    """
⋮----
destructiveHint: bool | None = None
"""
    If true, the tool may perform destructive updates to its environment.
    If false, the tool performs only additive updates.
    (This property is meaningful only when `readOnlyHint == false`)
    Default: true
    """
⋮----
idempotentHint: bool | None = None
"""
    If true, calling the tool repeatedly with the same arguments
    will have no additional effect on the its environment.
    (This property is meaningful only when `readOnlyHint == false`)
    Default: false
    """
⋮----
openWorldHint: bool | None = None
"""
    If true, this tool may interact with an "open world" of external
    entities. If false, the tool's domain of interaction is closed.
    For example, the world of a web search tool is open, whereas that
    of a memory tool is not.
    Default: true
    """
⋮----
class Tool(BaseMetadata)
⋮----
"""Definition for a tool the client can call."""
⋮----
"""A human-readable description of the tool."""
inputSchema: dict[str, Any]
"""A JSON Schema object defining the expected parameters for the tool."""
outputSchema: dict[str, Any] | None = None
"""
    An optional JSON Schema object defining the structure of the tool's output 
    returned in the structuredContent field of a CallToolResult.
    """
annotations: ToolAnnotations | None = None
"""Optional additional tool information."""
⋮----
class ListToolsResult(PaginatedResult)
⋮----
"""The server's response to a tools/list request from the client."""
⋮----
tools: list[Tool]
⋮----
class CallToolRequestParams(RequestParams)
⋮----
"""Parameters for calling a tool."""
⋮----
arguments: dict[str, Any] | None = None
⋮----
class CallToolRequest(Request[CallToolRequestParams, Literal["tools/call"]])
⋮----
"""Used by the client to invoke a tool provided by the server."""
⋮----
method: Literal["tools/call"]
params: CallToolRequestParams
⋮----
class CallToolResult(Result)
⋮----
"""The server's response to a tool call."""
⋮----
content: list[ContentBlock]
structuredContent: dict[str, Any] | None = None
"""An optional JSON object that represents the structured result of the tool call."""
isError: bool = False
⋮----
class ToolListChangedNotification(Notification[NotificationParams | None, Literal["notifications/tools/list_changed"]])
⋮----
"""
    An optional notification from the server to the client, informing it that the list
    of tools it offers has changed.
    """
⋮----
method: Literal["notifications/tools/list_changed"]
⋮----
LoggingLevel = Literal["debug", "info", "notice", "warning", "error", "critical", "alert", "emergency"]
⋮----
class SetLevelRequestParams(RequestParams)
⋮----
"""Parameters for setting the logging level."""
⋮----
level: LoggingLevel
"""The level of logging that the client wants to receive from the server."""
⋮----
class SetLevelRequest(Request[SetLevelRequestParams, Literal["logging/setLevel"]])
⋮----
"""A request from the client to the server, to enable or adjust logging."""
⋮----
method: Literal["logging/setLevel"]
params: SetLevelRequestParams
⋮----
class LoggingMessageNotificationParams(NotificationParams)
⋮----
"""Parameters for logging message notifications."""
⋮----
"""The severity of this log message."""
logger: str | None = None
"""An optional name of the logger issuing this message."""
data: Any
"""
    The data to be logged, such as a string message or an object. Any JSON serializable
    type is allowed here.
    """
⋮----
class LoggingMessageNotification(Notification[LoggingMessageNotificationParams, Literal["notifications/message"]])
⋮----
"""Notification of a log message passed from server to client."""
⋮----
method: Literal["notifications/message"]
params: LoggingMessageNotificationParams
⋮----
IncludeContext = Literal["none", "thisServer", "allServers"]
⋮----
class ModelHint(BaseModel)
⋮----
"""Hints to use for model selection."""
⋮----
name: str | None = None
"""A hint for a model name."""
⋮----
class ModelPreferences(BaseModel)
⋮----
"""
    The server's preferences for model selection, requested by the client during
    sampling.

    Because LLMs can vary along multiple dimensions, choosing the "best" model is
    rarely straightforward.  Different models excel in different areas—some are
    faster but less capable, others are more capable but more expensive, and so
    on. This interface allows servers to express their priorities across multiple
    dimensions to help clients make an appropriate selection for their use case.

    These preferences are always advisory. The client MAY ignore them. It is also
    up to the client to decide how to interpret these preferences and how to
    balance them against other considerations.
    """
⋮----
hints: list[ModelHint] | None = None
"""
    Optional hints to use for model selection.

    If multiple hints are specified, the client MUST evaluate them in order
    (such that the first match is taken).

    The client SHOULD prioritize these hints over the numeric priorities, but
    MAY still use the priorities to select from ambiguous matches.
    """
⋮----
costPriority: float | None = None
"""
    How much to prioritize cost when selecting a model. A value of 0 means cost
    is not important, while a value of 1 means cost is the most important
    factor.
    """
⋮----
speedPriority: float | None = None
"""
    How much to prioritize sampling speed (latency) when selecting a model. A
    value of 0 means speed is not important, while a value of 1 means speed is
    the most important factor.
    """
⋮----
intelligencePriority: float | None = None
"""
    How much to prioritize intelligence and capabilities when selecting a
    model. A value of 0 means intelligence is not important, while a value of 1
    means intelligence is the most important factor.
    """
⋮----
class CreateMessageRequestParams(RequestParams)
⋮----
"""Parameters for creating a message."""
⋮----
messages: list[SamplingMessage]
modelPreferences: ModelPreferences | None = None
"""
    The server's preferences for which model to select. The client MAY ignore
    these preferences.
    """
systemPrompt: str | None = None
"""An optional system prompt the server wants to use for sampling."""
includeContext: IncludeContext | None = None
"""
    A request to include context from one or more MCP servers (including the caller), to
    be attached to the prompt.
    """
temperature: float | None = None
maxTokens: int
"""The maximum number of tokens to sample, as requested by the server."""
stopSequences: list[str] | None = None
metadata: dict[str, Any] | None = None
"""Optional metadata to pass through to the LLM provider."""
⋮----
class CreateMessageRequest(Request[CreateMessageRequestParams, Literal["sampling/createMessage"]])
⋮----
"""A request from the server to sample an LLM via the client."""
⋮----
method: Literal["sampling/createMessage"]
params: CreateMessageRequestParams
⋮----
StopReason = Literal["endTurn", "stopSequence", "maxTokens"] | str
⋮----
class CreateMessageResult(Result)
⋮----
"""The client's response to a sampling/create_message request from the server."""
⋮----
model: str
"""The name of the model that generated the message."""
stopReason: StopReason | None = None
"""The reason why sampling stopped, if known."""
⋮----
class ResourceTemplateReference(BaseModel)
⋮----
"""A reference to a resource or resource template definition."""
⋮----
type: Literal["ref/resource"]
uri: str
"""The URI or URI template of the resource."""
⋮----
@deprecated("`ResourceReference` is deprecated, you should use `ResourceTemplateReference`.")
class ResourceReference(ResourceTemplateReference)
⋮----
class PromptReference(BaseModel)
⋮----
"""Identifies a prompt."""
⋮----
type: Literal["ref/prompt"]
⋮----
"""The name of the prompt or prompt template"""
⋮----
class CompletionArgument(BaseModel)
⋮----
"""The argument's information for completion requests."""
⋮----
"""The name of the argument"""
value: str
"""The value of the argument to use for completion matching."""
⋮----
class CompletionContext(BaseModel)
⋮----
"""Additional, optional context for completions."""
⋮----
"""Previously-resolved variables in a URI template or prompt."""
⋮----
class CompleteRequestParams(RequestParams)
⋮----
"""Parameters for completion requests."""
⋮----
ref: ResourceTemplateReference | PromptReference
argument: CompletionArgument
context: CompletionContext | None = None
"""Additional, optional context for completions"""
⋮----
class CompleteRequest(Request[CompleteRequestParams, Literal["completion/complete"]])
⋮----
"""A request from the client to the server, to ask for completion options."""
⋮----
method: Literal["completion/complete"]
params: CompleteRequestParams
⋮----
class Completion(BaseModel)
⋮----
"""Completion information."""
⋮----
values: list[str]
"""An array of completion values. Must not exceed 100 items."""
total: int | None = None
"""
    The total number of completion options available. This can exceed the number of
    values actually sent in the response.
    """
hasMore: bool | None = None
"""
    Indicates whether there are additional completion options beyond those provided in
    the current response, even if the exact total is unknown.
    """
⋮----
class CompleteResult(Result)
⋮----
"""The server's response to a completion/complete request"""
⋮----
completion: Completion
⋮----
class ListRootsRequest(Request[RequestParams | None, Literal["roots/list"]])
⋮----
"""
    Sent from the server to request a list of root URIs from the client. Roots allow
    servers to ask for specific directories or files to operate on. A common example
    for roots is providing a set of repositories or directories a server should operate
    on.

    This request is typically used when the server needs to understand the file system
    structure or access specific locations that the client has permission to read from.
    """
⋮----
method: Literal["roots/list"]
⋮----
class Root(BaseModel)
⋮----
"""Represents a root directory or file that the server can operate on."""
⋮----
uri: FileUrl
"""
    The URI identifying the root. This *must* start with file:// for now.
    This restriction may be relaxed in future versions of the protocol to allow
    other URI schemes.
    """
⋮----
"""
    An optional name for the root. This can be used to provide a human-readable
    identifier for the root, which may be useful for display purposes or for
    referencing the root in other parts of the application.
    """
⋮----
class ListRootsResult(Result)
⋮----
"""
    The client's response to a roots/list request from the server.
    This result contains an array of Root objects, each representing a root directory
    or file that the server can operate on.
    """
⋮----
roots: list[Root]
⋮----
class RootsListChangedNotification(
⋮----
"""
    A notification from the client to the server, informing it that the list of
    roots has changed.

    This notification should be sent whenever the client adds, removes, or
    modifies any root. The server should then request an updated list of roots
    using the ListRootsRequest.
    """
⋮----
method: Literal["notifications/roots/list_changed"]
⋮----
class CancelledNotificationParams(NotificationParams)
⋮----
"""Parameters for cancellation notifications."""
⋮----
requestId: RequestId
"""The ID of the request to cancel."""
reason: str | None = None
"""An optional string describing the reason for the cancellation."""
⋮----
class CancelledNotification(Notification[CancelledNotificationParams, Literal["notifications/cancelled"]])
⋮----
"""
    This notification can be sent by either side to indicate that it is canceling a
    previously-issued request.
    """
⋮----
method: Literal["notifications/cancelled"]
params: CancelledNotificationParams
⋮----
class ClientRequest(
⋮----
class ClientNotification(
⋮----
# Type for elicitation schema - a JSON Schema dict
ElicitRequestedSchema: TypeAlias = dict[str, Any]
"""Schema for elicitation requests."""
⋮----
class ElicitRequestParams(RequestParams)
⋮----
"""Parameters for elicitation requests."""
⋮----
requestedSchema: ElicitRequestedSchema
⋮----
class ElicitRequest(Request[ElicitRequestParams, Literal["elicitation/create"]])
⋮----
"""A request from the server to elicit information from the client."""
⋮----
method: Literal["elicitation/create"]
params: ElicitRequestParams
⋮----
class ElicitResult(Result)
⋮----
"""The client's response to an elicitation request."""
⋮----
action: Literal["accept", "decline", "cancel"]
"""
    The user action in response to the elicitation.
    - "accept": User submitted the form/confirmed the action
    - "decline": User explicitly declined the action
    - "cancel": User dismissed without making an explicit choice
    """
⋮----
content: dict[str, str | int | float | bool | None] | None = None
"""
    The submitted form data, only present when action is "accept".
    Contains values matching the requested schema.
    """
⋮----
class ClientResult(RootModel[EmptyResult | CreateMessageResult | ListRootsResult | ElicitResult])
⋮----
class ServerRequest(RootModel[PingRequest | CreateMessageRequest | ListRootsRequest | ElicitRequest])
⋮----
class ServerNotification(
⋮----
class ServerResult(
````

## File: tests/client/conftest.py
````python
class SpyMemoryObjectSendStream
⋮----
def __init__(self, original_stream)
⋮----
async def send(self, message)
⋮----
async def aclose(self)
⋮----
async def __aenter__(self)
⋮----
async def __aexit__(self, *args)
⋮----
class StreamSpyCollection
⋮----
def clear(self) -> None
⋮----
"""Clear all captured messages."""
⋮----
def get_client_requests(self, method: str | None = None) -> list[JSONRPCRequest]
⋮----
"""Get client-sent requests, optionally filtered by method."""
⋮----
def get_server_requests(self, method: str | None = None) -> list[JSONRPCRequest]
⋮----
"""Get server-sent requests, optionally filtered by method."""
⋮----
def get_client_notifications(self, method: str | None = None) -> list[JSONRPCNotification]
⋮----
"""Get client-sent notifications, optionally filtered by method."""
⋮----
def get_server_notifications(self, method: str | None = None) -> list[JSONRPCNotification]
⋮----
"""Get server-sent notifications, optionally filtered by method."""
⋮----
@pytest.fixture
def stream_spy()
⋮----
"""Fixture that provides spies for both client and server write streams.

    Example usage:
        async def test_something(stream_spy):
            # ... set up server and client ...

            spies = stream_spy()

            # Run some operation that sends messages
            await client.some_operation()

            # Check the messages
            requests = spies.get_client_requests(method="some/method")
            assert len(requests) == 1

            # Clear for the next operation
            spies.clear()
    """
client_spy = None
server_spy = None
⋮----
# Store references to our spy objects
def capture_spies(c_spy, s_spy)
⋮----
client_spy = c_spy
server_spy = s_spy
⋮----
# Create patched version of stream creation
original_create_streams = mcp.shared.memory.create_client_server_memory_streams
⋮----
@asynccontextmanager
    async def patched_create_streams()
⋮----
# Create spy wrappers
spy_client_write = SpyMemoryObjectSendStream(client_write)
spy_server_write = SpyMemoryObjectSendStream(server_write)
⋮----
# Capture references for the test to use
⋮----
# Apply the patch for the duration of the test
⋮----
# Return a collection with helper methods
def get_spy_collection() -> StreamSpyCollection
````

## File: tests/client/test_auth.py
````python
"""
Tests for refactored OAuth client authentication implementation.
"""
⋮----
class MockTokenStorage
⋮----
"""Mock token storage for testing."""
⋮----
def __init__(self)
⋮----
async def get_tokens(self) -> OAuthToken | None
⋮----
async def set_tokens(self, tokens: OAuthToken) -> None
⋮----
async def get_client_info(self) -> OAuthClientInformationFull | None
⋮----
async def set_client_info(self, client_info: OAuthClientInformationFull) -> None
⋮----
@pytest.fixture
def mock_storage()
⋮----
@pytest.fixture
def client_metadata()
⋮----
@pytest.fixture
def valid_tokens()
⋮----
@pytest.fixture
def oauth_provider(client_metadata, mock_storage)
⋮----
async def redirect_handler(url: str) -> None
⋮----
"""Mock redirect handler."""
⋮----
async def callback_handler() -> tuple[str, str | None]
⋮----
"""Mock callback handler."""
⋮----
class TestPKCEParameters
⋮----
"""Test PKCE parameter generation."""
⋮----
def test_pkce_generation(self)
⋮----
"""Test PKCE parameter generation creates valid values."""
pkce = PKCEParameters.generate()
⋮----
# Verify lengths
⋮----
# Verify characters used in verifier
allowed_chars = set("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~")
⋮----
# Verify base64url encoding in challenge (no padding)
⋮----
def test_pkce_uniqueness(self)
⋮----
"""Test PKCE generates unique values each time."""
pkce1 = PKCEParameters.generate()
pkce2 = PKCEParameters.generate()
⋮----
class TestOAuthContext
⋮----
"""Test OAuth context functionality."""
⋮----
@pytest.mark.anyio
    async def test_oauth_provider_initialization(self, oauth_provider, client_metadata, mock_storage)
⋮----
"""Test OAuthClientProvider basic setup."""
⋮----
def test_context_url_parsing(self, oauth_provider)
⋮----
"""Test get_authorization_base_url() extracts base URLs correctly."""
context = oauth_provider.context
⋮----
# Test with path
⋮----
# Test with no path
⋮----
# Test with port
⋮----
# Test with query params
⋮----
@pytest.mark.anyio
    async def test_token_validity_checking(self, oauth_provider, mock_storage, valid_tokens)
⋮----
"""Test is_token_valid() and can_refresh_token() logic."""
⋮----
# No tokens - should be invalid
⋮----
# Set valid tokens and client info
⋮----
context.token_expiry_time = time.time() + 1800  # 30 minutes from now
⋮----
# Should be valid
⋮----
assert context.can_refresh_token()  # Has refresh token and client info
⋮----
# Expire the token
context.token_expiry_time = time.time() - 100  # Expired 100 seconds ago
⋮----
assert context.can_refresh_token()  # Can still refresh
⋮----
# Remove refresh token
⋮----
# Remove client info
⋮----
def test_clear_tokens(self, oauth_provider, valid_tokens)
⋮----
"""Test clear_tokens() removes token data."""
⋮----
# Clear tokens
⋮----
# Verify cleared
⋮----
class TestOAuthFlow
⋮----
"""Test OAuth flow methods."""
⋮----
@pytest.mark.anyio
    async def test_discover_protected_resource_request(self, oauth_provider)
⋮----
"""Test protected resource discovery request building."""
request = await oauth_provider._discover_protected_resource()
⋮----
@pytest.mark.anyio
    async def test_discover_oauth_metadata_request(self, oauth_provider)
⋮----
"""Test OAuth metadata discovery request building."""
request = await oauth_provider._discover_oauth_metadata()
⋮----
@pytest.mark.anyio
    async def test_discover_oauth_metadata_request_no_path(self, client_metadata, mock_storage)
⋮----
"""Test OAuth metadata discovery request building when server has no path."""
⋮----
async def redirect_handler(url: str) -> None
⋮----
async def callback_handler() -> tuple[str, str | None]
⋮----
provider = OAuthClientProvider(
⋮----
request = await provider._discover_oauth_metadata()
⋮----
@pytest.mark.anyio
    async def test_discover_oauth_metadata_request_trailing_slash(self, client_metadata, mock_storage)
⋮----
"""Test OAuth metadata discovery request building when server path has trailing slash."""
⋮----
class TestOAuthFallback
⋮----
"""Test OAuth discovery fallback behavior for legacy (act as AS not RS) servers."""
⋮----
@pytest.mark.anyio
    async def test_fallback_discovery_request(self, client_metadata, mock_storage)
⋮----
"""Test fallback discovery request building."""
⋮----
# Set up discovery state manually as if path-aware discovery was attempted
⋮----
# Test fallback request building
request = await provider._discover_oauth_metadata_fallback()
⋮----
@pytest.mark.anyio
    async def test_should_attempt_fallback(self, oauth_provider)
⋮----
"""Test fallback decision logic."""
# Should attempt fallback on 404 with non-root path
⋮----
# Should NOT attempt fallback on 404 with root path
⋮----
# Should NOT attempt fallback on other status codes
⋮----
@pytest.mark.anyio
    async def test_handle_metadata_response_success(self, oauth_provider)
⋮----
"""Test successful metadata response handling."""
# Create minimal valid OAuth metadata
content = b"""{
response = httpx.Response(200, content=content)
⋮----
# Should return True (success) and set metadata
result = await oauth_provider._handle_oauth_metadata_response(response, is_fallback=False)
⋮----
@pytest.mark.anyio
    async def test_handle_metadata_response_404_needs_fallback(self, oauth_provider)
⋮----
"""Test 404 response handling that should trigger fallback."""
# Set up discovery state for non-root path
⋮----
# Mock 404 response
response = httpx.Response(404)
⋮----
# Should return False (needs fallback)
⋮----
@pytest.mark.anyio
    async def test_handle_metadata_response_404_no_fallback_needed(self, oauth_provider)
⋮----
"""Test 404 response handling when no fallback is needed."""
# Set up discovery state for root path
⋮----
# Should return True (no fallback needed)
⋮----
@pytest.mark.anyio
    async def test_handle_metadata_response_404_fallback_attempt(self, oauth_provider)
⋮----
"""Test 404 response handling during fallback attempt."""
# Mock 404 response during fallback
⋮----
# Should return True (fallback attempt complete, no further action needed)
result = await oauth_provider._handle_oauth_metadata_response(response, is_fallback=True)
⋮----
@pytest.mark.anyio
    async def test_register_client_request(self, oauth_provider)
⋮----
"""Test client registration request building."""
request = await oauth_provider._register_client()
⋮----
@pytest.mark.anyio
    async def test_register_client_skip_if_registered(self, oauth_provider, mock_storage)
⋮----
"""Test client registration is skipped if already registered."""
# Set existing client info
client_info = OAuthClientInformationFull(
⋮----
# Should return None (skip registration)
⋮----
@pytest.mark.anyio
    async def test_token_exchange_request(self, oauth_provider)
⋮----
"""Test token exchange request building."""
# Set up required context
⋮----
request = await oauth_provider._exchange_token("test_auth_code", "test_verifier")
⋮----
# Check form data
content = request.content.decode()
⋮----
@pytest.mark.anyio
    async def test_refresh_token_request(self, oauth_provider, valid_tokens)
⋮----
"""Test refresh token request building."""
⋮----
request = await oauth_provider._refresh_token()
⋮----
class TestProtectedResourceMetadata
⋮----
"""Test protected resource handling."""
⋮----
@pytest.mark.anyio
    async def test_resource_param_included_with_recent_protocol_version(self, oauth_provider: OAuthClientProvider)
⋮----
"""Test resource parameter is included for protocol version >= 2025-06-18."""
# Set protocol version to 2025-06-18
⋮----
# Test in token exchange
request = await oauth_provider._exchange_token("test_code", "test_verifier")
⋮----
# Check URL-encoded resource parameter
⋮----
expected_resource = quote(oauth_provider.context.get_resource_url(), safe="")
⋮----
# Test in refresh token
⋮----
refresh_request = await oauth_provider._refresh_token()
refresh_content = refresh_request.content.decode()
⋮----
@pytest.mark.anyio
    async def test_resource_param_excluded_with_old_protocol_version(self, oauth_provider: OAuthClientProvider)
⋮----
"""Test resource parameter is excluded for protocol version < 2025-06-18."""
# Set protocol version to older version
⋮----
@pytest.mark.anyio
    async def test_resource_param_included_with_protected_resource_metadata(self, oauth_provider: OAuthClientProvider)
⋮----
"""Test resource parameter is always included when protected resource metadata exists."""
# Set old protocol version but with protected resource metadata
⋮----
class TestAuthFlow
⋮----
"""Test the auth flow in httpx."""
⋮----
@pytest.mark.anyio
    async def test_auth_flow_with_valid_tokens(self, oauth_provider, mock_storage, valid_tokens)
⋮----
"""Test auth flow when tokens are already valid."""
# Pre-store valid tokens
⋮----
# Create a test request
test_request = httpx.Request("GET", "https://api.example.com/test")
⋮----
# Mock the auth flow
auth_flow = oauth_provider.async_auth_flow(test_request)
⋮----
# Should get the request with auth header added
request = await auth_flow.__anext__()
⋮----
# Send a successful response
response = httpx.Response(200)
⋮----
pass  # Expected
````

## File: tests/client/test_config.py
````python
@pytest.fixture
def temp_config_dir(tmp_path: Path)
⋮----
"""Create a temporary Claude config directory."""
config_dir = tmp_path / "Claude"
⋮----
@pytest.fixture
def mock_config_path(temp_config_dir: Path)
⋮----
"""Mock get_claude_config_path to return our temporary directory."""
⋮----
def test_command_execution(mock_config_path: Path)
⋮----
"""Test that the generated command can actually be executed."""
# Setup
server_name = "test_server"
file_spec = "test_server.py:app"
⋮----
# Update config
success = update_claude_config(file_spec=file_spec, server_name=server_name)
⋮----
# Read the generated config
config_file = mock_config_path / "claude_desktop_config.json"
config = json.loads(config_file.read_text())
⋮----
# Get the command and args
server_config = config["mcpServers"][server_name]
command = server_config["command"]
args = server_config["args"]
⋮----
test_args = [command] + args + ["--help"]
⋮----
result = subprocess.run(test_args, capture_output=True, text=True, timeout=5, check=False)
⋮----
def test_absolute_uv_path(mock_config_path: Path)
⋮----
"""Test that the absolute path to uv is used when available."""
# Mock the shutil.which function to return a fake path
mock_uv_path = "/usr/local/bin/uv"
⋮----
# Setup
⋮----
# Update config
⋮----
# Read the generated config
⋮----
# Verify the command is the absolute path
````

## File: tests/client/test_list_methods_cursor.py
````python
# Mark the whole module for async tests
pytestmark = pytest.mark.anyio
⋮----
async def test_list_tools_cursor_parameter(stream_spy)
⋮----
"""Test that the cursor parameter is accepted for list_tools
    and that it is correctly passed to the server.

    See: https://modelcontextprotocol.io/specification/2025-03-26/server/utilities/pagination#request-format
    """
server = FastMCP("test")
⋮----
# Create a couple of test tools
⋮----
@server.tool(name="test_tool_1")
    async def test_tool_1() -> str
⋮----
"""First test tool"""
⋮----
@server.tool(name="test_tool_2")
    async def test_tool_2() -> str
⋮----
"""Second test tool"""
⋮----
spies = stream_spy()
⋮----
# Test without cursor parameter (omitted)
_ = await client_session.list_tools()
list_tools_requests = spies.get_client_requests(method="tools/list")
⋮----
# Test with cursor=None
_ = await client_session.list_tools(cursor=None)
⋮----
# Test with cursor as string
_ = await client_session.list_tools(cursor="some_cursor_value")
⋮----
# Test with empty string cursor
_ = await client_session.list_tools(cursor="")
⋮----
async def test_list_resources_cursor_parameter(stream_spy)
⋮----
"""Test that the cursor parameter is accepted for list_resources
    and that it is correctly passed to the server.

    See: https://modelcontextprotocol.io/specification/2025-03-26/server/utilities/pagination#request-format
    """
⋮----
# Create a test resource
⋮----
@server.resource("resource://test/data")
    async def test_resource() -> str
⋮----
"""Test resource"""
⋮----
_ = await client_session.list_resources()
list_resources_requests = spies.get_client_requests(method="resources/list")
⋮----
_ = await client_session.list_resources(cursor=None)
⋮----
_ = await client_session.list_resources(cursor="some_cursor")
⋮----
_ = await client_session.list_resources(cursor="")
⋮----
async def test_list_prompts_cursor_parameter(stream_spy)
⋮----
"""Test that the cursor parameter is accepted for list_prompts
    and that it is correctly passed to the server.
    See: https://modelcontextprotocol.io/specification/2025-03-26/server/utilities/pagination#request-format
    """
⋮----
# Create a test prompt
⋮----
@server.prompt()
    async def test_prompt(name: str) -> str
⋮----
"""Test prompt"""
⋮----
_ = await client_session.list_prompts()
list_prompts_requests = spies.get_client_requests(method="prompts/list")
⋮----
_ = await client_session.list_prompts(cursor=None)
⋮----
_ = await client_session.list_prompts(cursor="some_cursor")
⋮----
_ = await client_session.list_prompts(cursor="")
⋮----
async def test_list_resource_templates_cursor_parameter(stream_spy)
⋮----
"""Test that the cursor parameter is accepted for list_resource_templates
    and that it is correctly passed to the server.

    See: https://modelcontextprotocol.io/specification/2025-03-26/server/utilities/pagination#request-format
    """
⋮----
# Create a test resource template
⋮----
@server.resource("resource://test/{name}")
    async def test_template(name: str) -> str
⋮----
"""Test resource template"""
⋮----
_ = await client_session.list_resource_templates()
list_templates_requests = spies.get_client_requests(method="resources/templates/list")
⋮----
_ = await client_session.list_resource_templates(cursor=None)
⋮----
_ = await client_session.list_resource_templates(cursor="some_cursor")
⋮----
_ = await client_session.list_resource_templates(cursor="")
````

## File: tests/client/test_list_roots_callback.py
````python
@pytest.mark.anyio
async def test_list_roots_callback()
⋮----
server = FastMCP("test")
⋮----
callback_return = ListRootsResult(
⋮----
@server.tool("test_list_roots")
    async def test_list_roots(context: Context, message: str):  # type: ignore[reportUnknownMemberType]
⋮----
roots = await context.session.list_roots()
⋮----
# Test with list_roots callback
⋮----
# Make a request to trigger sampling callback
result = await client_session.call_tool("test_list_roots", {"message": "test message"})
⋮----
# Test without list_roots callback
````

## File: tests/client/test_logging_callback.py
````python
class LoggingCollector
⋮----
def __init__(self)
⋮----
async def __call__(self, params: LoggingMessageNotificationParams) -> None
⋮----
@pytest.mark.anyio
async def test_logging_callback()
⋮----
server = FastMCP("test")
logging_collector = LoggingCollector()
⋮----
# Create a simple test tool
⋮----
@server.tool("test_tool")
    async def test_tool() -> bool
⋮----
# The actual tool is very simple and just returns True
⋮----
# Create a function that can send a log notification
⋮----
"""Send a log notification to the client."""
⋮----
# Create a message handler to catch exceptions
⋮----
# First verify our test tool works
result = await client_session.call_tool("test_tool", {})
⋮----
# Now send a log message via our tool
log_result = await client_session.call_tool(
⋮----
# Create meta object with related_request_id added dynamically
log = logging_collector.log_messages[0]
````

## File: tests/client/test_output_schema_validation.py
````python
@contextmanager
def bypass_server_output_validation()
⋮----
"""
    Context manager that bypasses server-side output validation.
    This simulates a malicious or non-compliant server that doesn't validate
    its outputs, allowing us to test client-side validation.
    """
# Patch jsonschema.validate in the server module to disable all validation
⋮----
# The mock will simply return None (do nothing) for all validation calls
⋮----
class TestClientOutputSchemaValidation
⋮----
"""Test client-side validation of structured output from tools"""
⋮----
@pytest.mark.anyio
    async def test_tool_structured_output_client_side_validation_basemodel(self)
⋮----
"""Test that client validates structured content against schema for BaseModel outputs"""
# Create a malicious low-level server that returns invalid structured content
server = Server("test-server")
⋮----
# Define the expected schema for our tool
output_schema = {
⋮----
@server.list_tools()
        async def list_tools()
⋮----
@server.call_tool()
        async def call_tool(name: str, arguments: dict)
⋮----
# Return invalid structured content - age is string instead of integer
# The low-level server will wrap this in CallToolResult
return {"name": "John", "age": "invalid"}  # Invalid: age should be int
⋮----
# Test that client validates the structured content
⋮----
# The client validates structured content and should raise an error
⋮----
# Verify it's a validation error
⋮----
@pytest.mark.anyio
    async def test_tool_structured_output_client_side_validation_primitive(self)
⋮----
"""Test that client validates structured content for primitive outputs"""
⋮----
# Primitive types are wrapped in {"result": value}
⋮----
# Return invalid structured content - result is string instead of integer
return {"result": "not_a_number"}  # Invalid: should be int
⋮----
@pytest.mark.anyio
    async def test_tool_structured_output_client_side_validation_dict_typed(self)
⋮----
"""Test that client validates dict[str, T] structured content"""
⋮----
# dict[str, int] schema
output_schema = {"type": "object", "additionalProperties": {"type": "integer"}, "title": "get_scores_Output"}
⋮----
# Return invalid structured content - values should be integers
return {"alice": "100", "bob": "85"}  # Invalid: values should be int
⋮----
@pytest.mark.anyio
    async def test_tool_structured_output_client_side_validation_missing_required(self)
⋮----
"""Test that client validates missing required fields"""
⋮----
"required": ["name", "age", "email"],  # All fields required
⋮----
# Return structured content missing required field 'email'
return {"name": "John", "age": 30}  # Missing required 'email'
⋮----
@pytest.mark.anyio
    async def test_tool_not_listed_warning(self, caplog)
⋮----
"""Test that client logs warning when tool is not in list_tools but has outputSchema"""
⋮----
# Return empty list - tool is not listed
⋮----
# Server still responds to the tool call with structured content
⋮----
# Set logging level to capture warnings
⋮----
# Call a tool that wasn't listed
result = await client.call_tool("mystery_tool", {})
⋮----
# Check that warning was logged
````

## File: tests/client/test_resource_cleanup.py
````python
@pytest.mark.anyio
async def test_send_request_stream_cleanup()
⋮----
"""
    Test that send_request properly cleans up streams when an exception occurs.

    This test mocks out most of the session functionality to focus on stream cleanup.
    """
⋮----
# Create a mock session with the minimal required functionality
class TestSession(BaseSession)
⋮----
async def _send_response(self, request_id, response)
⋮----
# Create streams
⋮----
# Create the session
session = TestSession(
⋮----
object,  # Request type doesn't matter for this test
object,  # Notification type doesn't matter for this test
⋮----
# Create a test request
request = ClientRequest(
⋮----
# Patch the _write_stream.send method to raise an exception
async def mock_send(*args, **kwargs)
⋮----
# Record the response streams before the test
initial_stream_count = len(session._response_streams)
⋮----
# Run the test with the patched method
⋮----
# Verify that no response streams were leaked
⋮----
# Clean up
````

## File: tests/client/test_sampling_callback.py
````python
@pytest.mark.anyio
async def test_sampling_callback()
⋮----
server = FastMCP("test")
⋮----
callback_return = CreateMessageResult(
⋮----
@server.tool("test_sampling")
    async def test_sampling_tool(message: str)
⋮----
value = await server.get_context().session.create_message(
⋮----
# Test with sampling callback
⋮----
# Make a request to trigger sampling callback
result = await client_session.call_tool("test_sampling", {"message": "Test message for sampling"})
⋮----
# Test without sampling callback
````

## File: tests/client/test_session_group.py
````python
@pytest.fixture
def mock_exit_stack()
⋮----
"""Fixture for a mocked AsyncExitStack."""
# Use unittest.mock.Mock directly if needed, or just a plain object
# if only attribute access/existence is needed.
# For AsyncExitStack, Mock or MagicMock is usually fine.
⋮----
@pytest.mark.anyio
class TestClientSessionGroup
⋮----
def test_init(self)
⋮----
mcp_session_group = ClientSessionGroup()
⋮----
def test_component_properties(self)
⋮----
# --- Mock Dependencies ---
mock_prompt = mock.Mock()
mock_resource = mock.Mock()
mock_tool = mock.Mock()
⋮----
# --- Prepare Session Group ---
⋮----
# --- Assertions ---
⋮----
async def test_call_tool(self)
⋮----
mock_session = mock.AsyncMock()
⋮----
def hook(name, server_info)
⋮----
mcp_session_group = ClientSessionGroup(component_name_hook=hook)
⋮----
text_content = types.TextContent(type="text", text="OK")
⋮----
# --- Test Execution ---
result = await mcp_session_group.call_tool(
⋮----
async def test_connect_to_server(self, mock_exit_stack)
⋮----
"""Test connecting to a server and aggregating components."""
⋮----
mock_server_info = mock.Mock(spec=types.Implementation)
⋮----
mock_session = mock.AsyncMock(spec=mcp.ClientSession)
mock_tool1 = mock.Mock(spec=types.Tool)
⋮----
mock_resource1 = mock.Mock(spec=types.Resource)
⋮----
mock_prompt1 = mock.Mock(spec=types.Prompt)
⋮----
group = ClientSessionGroup(exit_stack=mock_exit_stack)
⋮----
async def test_connect_to_server_with_name_hook(self, mock_exit_stack)
⋮----
"""Test connecting with a component name hook."""
⋮----
mock_tool = mock.Mock(spec=types.Tool)
⋮----
# --- Test Setup ---
def name_hook(name: str, server_info: types.Implementation) -> str
⋮----
group = ClientSessionGroup(exit_stack=mock_exit_stack, component_name_hook=name_hook)
⋮----
expected_tool_name = "HookServer.base_tool"
⋮----
async def test_disconnect_from_server(self):  # No mock arguments needed
⋮----
"""Test disconnecting from a server."""
⋮----
group = ClientSessionGroup()
server_name = "ServerToDisconnect"
⋮----
# Manually populate state using standard mocks
mock_session1 = mock.MagicMock(spec=mcp.ClientSession)
mock_session2 = mock.MagicMock(spec=mcp.ClientSession)
⋮----
mock_tool2 = mock.Mock(spec=types.Tool)
⋮----
mock_component_named_like_server = mock.Mock()
mock_session = mock.Mock(spec=mcp.ClientSession)
⋮----
async def test_connect_to_server_duplicate_tool_raises_error(self, mock_exit_stack)
⋮----
"""Test McpError raised when connecting a server with a dup name."""
# --- Setup Pre-existing State ---
⋮----
existing_tool_name = "shared_tool"
# Manually add a tool to simulate a previous connection
⋮----
# Need a dummy session associated with the existing tool
mock_session = mock.MagicMock(spec=mcp.ClientSession)
⋮----
# --- Mock New Connection Attempt ---
mock_server_info_new = mock.Mock(spec=types.Implementation)
⋮----
mock_session_new = mock.AsyncMock(spec=mcp.ClientSession)
⋮----
# Configure the new session to return a tool with the *same name*
duplicate_tool = mock.Mock(spec=types.Tool)
⋮----
# Keep other lists empty for simplicity
⋮----
# --- Test Execution and Assertion ---
⋮----
# Assert details about the raised error
⋮----
# Verify the duplicate tool was *not* added again (state should be unchanged)
assert len(group._tools) == 1  # Should still only have the original
assert group._tools[existing_tool_name] is not duplicate_tool  # Ensure it's the original mock
⋮----
# No patching needed here
async def test_disconnect_non_existent_server(self)
⋮----
"""Test disconnecting a server that isn't connected."""
session = mock.Mock(spec=mcp.ClientSession)
⋮----
),  # url, headers, timeout, sse_read_timeout
⋮----
),  # url, headers, timeout, sse_read_timeout, terminate_on_close
⋮----
client_type_name,  # Just for clarity or conditional logic if needed
⋮----
mock_client_cm_instance = mock.AsyncMock(name=f"{client_type_name}ClientCM")
mock_read_stream = mock.AsyncMock(name=f"{client_type_name}Read")
mock_write_stream = mock.AsyncMock(name=f"{client_type_name}Write")
⋮----
# streamablehttp_client's __aenter__ returns three values
⋮----
mock_extra_stream_val = mock.AsyncMock(name="StreamableExtra")
⋮----
# --- Mock mcp.ClientSession (class) ---
# mock_ClientSession_class is already provided by the outer patch
mock_raw_session_cm = mock.AsyncMock(name="RawSessionCM")
⋮----
mock_entered_session = mock.AsyncMock(name="EnteredSessionInstance")
⋮----
# Mock session.initialize()
mock_initialize_result = mock.AsyncMock(name="InitializeResult")
⋮----
# --- Test Execution ---
⋮----
returned_server_info = None
returned_session = None
⋮----
# --- Assertions ---
# 1. Assert the correct specific client function was called
⋮----
# 2. Assert ClientSession was called correctly
⋮----
# 3. Assert returned values
````

## File: tests/client/test_session.py
````python
@pytest.mark.anyio
async def test_client_session_initialize()
⋮----
initialized_notification = None
⋮----
async def mock_server()
⋮----
session_message = await client_to_server_receive.receive()
jsonrpc_request = session_message.message
⋮----
request = ClientRequest.model_validate(
⋮----
result = ServerResult(
⋮----
session_notification = await client_to_server_receive.receive()
jsonrpc_notification = session_notification.message
⋮----
initialized_notification = ClientNotification.model_validate(
⋮----
# Create a message handler to catch exceptions
⋮----
result = await session.initialize()
⋮----
# Assert the result
⋮----
# Check that the client sent the initialized notification
⋮----
@pytest.mark.anyio
async def test_client_session_custom_client_info()
⋮----
custom_client_info = Implementation(name="test-client", version="1.2.3")
received_client_info = None
⋮----
received_client_info = request.root.params.clientInfo
⋮----
# Receive initialized notification
⋮----
# Assert that the custom client info was sent
⋮----
@pytest.mark.anyio
async def test_client_session_default_client_info()
⋮----
# Assert that the default client info was sent
⋮----
@pytest.mark.anyio
async def test_client_session_version_negotiation_success()
⋮----
"""Test successful version negotiation with supported version"""
⋮----
# Verify client sent the latest protocol version
⋮----
# Server responds with a supported older version
⋮----
# Assert the result with negotiated version
⋮----
@pytest.mark.anyio
async def test_client_session_version_negotiation_failure()
⋮----
"""Test version negotiation failure with unsupported version"""
⋮----
# Server responds with an unsupported version
⋮----
protocolVersion="2020-01-01",  # Unsupported old version
⋮----
# Should raise RuntimeError for unsupported version
⋮----
@pytest.mark.anyio
async def test_client_capabilities_default()
⋮----
"""Test that client capabilities are properly set with default callbacks"""
⋮----
received_capabilities = None
⋮----
received_capabilities = request.root.params.capabilities
⋮----
# Assert that capabilities are properly set with defaults
⋮----
assert received_capabilities.sampling is None  # No custom sampling callback
assert received_capabilities.roots is None  # No custom list_roots callback
⋮----
@pytest.mark.anyio
async def test_client_capabilities_with_custom_callbacks()
⋮----
"""Test that client capabilities are properly set with custom callbacks"""
⋮----
# Assert that capabilities are properly set with custom callbacks
⋮----
assert received_capabilities.sampling is not None  # Custom sampling callback provided
⋮----
assert received_capabilities.roots is not None  # Custom list_roots callback provided
⋮----
assert received_capabilities.roots.listChanged is True  # Should be True for custom callback
````

## File: tests/client/test_stdio.py
````python
tee: str = shutil.which("tee")  # type: ignore
python: str = shutil.which("python")  # type: ignore
⋮----
@pytest.mark.anyio
@pytest.mark.skipif(tee is None, reason="could not find tee command")
async def test_stdio_context_manager_exiting()
⋮----
@pytest.mark.anyio
@pytest.mark.skipif(tee is None, reason="could not find tee command")
async def test_stdio_client()
⋮----
server_parameters = StdioServerParameters(command=tee)
⋮----
# Test sending and receiving messages
messages = [
⋮----
session_message = SessionMessage(message)
⋮----
read_messages = []
⋮----
@pytest.mark.anyio
async def test_stdio_client_bad_path()
⋮----
"""Check that the connection doesn't hang if process errors."""
server_params = StdioServerParameters(command="python", args=["-c", "non-existent-file.py"])
⋮----
# The session should raise an error when the connection closes
⋮----
# Check that we got a connection closed error
⋮----
@pytest.mark.anyio
async def test_stdio_client_nonexistent_command()
⋮----
"""Test that stdio_client raises an error for non-existent commands."""
# Create a server with a non-existent command
server_params = StdioServerParameters(
⋮----
# Should raise an error when trying to start the process
⋮----
# The error should indicate the command was not found
error_message = str(exc_info.value)
⋮----
or "cannot find the file" in error_message.lower()  # Windows error message
````

## File: tests/issues/test_100_tool_listing.py
````python
pytestmark = pytest.mark.anyio
⋮----
async def test_list_tools_returns_all_tools()
⋮----
mcp = FastMCP("TestTools")
⋮----
# Create 100 tools with unique names
num_tools = 100
⋮----
@mcp.tool(name=f"tool_{i}")
        def dummy_tool_func()
⋮----
f"""Tool number {i}"""
⋮----
globals()[f"dummy_tool_{i}"] = dummy_tool_func  # Keep reference to avoid garbage collection
⋮----
# Get all tools
tools = await mcp.list_tools()
⋮----
# Verify we get all tools
⋮----
# Verify each tool is unique and has the correct name
tool_names = [tool.name for tool in tools]
expected_names = [f"tool_{i}" for i in range(num_tools)]
````

## File: tests/issues/test_129_resource_templates.py
````python
@pytest.mark.anyio
async def test_resource_templates()
⋮----
# Create an MCP server
mcp = FastMCP("Demo")
⋮----
# Add a dynamic greeting resource
⋮----
@mcp.resource("greeting://{name}")
    def get_greeting(name: str) -> str
⋮----
"""Get a personalized greeting"""
⋮----
@mcp.resource("users://{user_id}/profile")
    def get_user_profile(user_id: str) -> str
⋮----
"""Dynamic user data"""
⋮----
# Get the list of resource templates using the underlying server
# Note: list_resource_templates() returns a decorator that wraps the handler
# The handler returns a ServerResult with a ListResourceTemplatesResult inside
result = await mcp._mcp_server.request_handlers[types.ListResourceTemplatesRequest](
⋮----
templates = result.root.resourceTemplates
⋮----
# Verify we get both templates back
⋮----
# Verify template details
greeting_template = next(t for t in templates if t.name == "get_greeting")
⋮----
profile_template = next(t for t in templates if t.name == "get_user_profile")
````

## File: tests/issues/test_141_resource_templates.py
````python
@pytest.mark.anyio
async def test_resource_template_edge_cases()
⋮----
"""Test server-side resource template validation"""
mcp = FastMCP("Demo")
⋮----
# Test case 1: Template with multiple parameters
⋮----
@mcp.resource("resource://users/{user_id}/posts/{post_id}")
    def get_user_post(user_id: str, post_id: str) -> str
⋮----
# Test case 2: Template with optional parameter (should fail)
⋮----
@mcp.resource("resource://users/{user_id}/profile")
        def get_user_profile(user_id: str, optional_param: str | None = None) -> str
⋮----
# Test case 3: Template with mismatched parameters
⋮----
@mcp.resource("resource://users/{user_id}/profile")
        def get_user_profile_mismatch(different_param: str) -> str
⋮----
# Test case 4: Template with extra function parameters
⋮----
@mcp.resource("resource://users/{user_id}/profile")
        def get_user_profile_extra(user_id: str, extra_param: str) -> str
⋮----
# Test case 5: Template with missing function parameters
⋮----
@mcp.resource("resource://users/{user_id}/profile/{section}")
        def get_user_profile_missing(user_id: str) -> str
⋮----
# Verify valid template works
result = await mcp.read_resource("resource://users/123/posts/456")
result_list = list(result)
⋮----
# Verify invalid parameters raise error
⋮----
await mcp.read_resource("resource://users/123/posts")  # Missing post_id
⋮----
await mcp.read_resource("resource://users/123/posts/456/extra")  # Extra path component
⋮----
@pytest.mark.anyio
async def test_resource_template_client_interaction()
⋮----
"""Test client-side resource template interaction"""
⋮----
# Register some templated resources
⋮----
@mcp.resource("resource://users/{user_id}/profile")
    def get_user_profile(user_id: str) -> str
⋮----
# Initialize the session
⋮----
# List available resources
resources = await session.list_resource_templates()
⋮----
# Verify resource templates are listed correctly
templates = [r.uriTemplate for r in resources.resourceTemplates]
⋮----
# Read a resource with valid parameters
result = await session.read_resource(AnyUrl("resource://users/123/posts/456"))
contents = result.contents[0]
⋮----
# Read another resource with valid parameters
result = await session.read_resource(AnyUrl("resource://users/789/profile"))
⋮----
# Verify invalid resource URIs raise appropriate errors
with pytest.raises(Exception):  # Specific exception type may vary
await session.read_resource(AnyUrl("resource://users/123/posts"))  # Missing post_id
⋮----
await session.read_resource(AnyUrl("resource://users/123/invalid"))  # Invalid template
````

## File: tests/issues/test_152_resource_mime_type.py
````python
pytestmark = pytest.mark.anyio
⋮----
async def test_fastmcp_resource_mime_type()
⋮----
"""Test that mime_type parameter is respected for resources."""
mcp = FastMCP("test")
⋮----
# Create a small test image as bytes
image_bytes = b"fake_image_data"
base64_string = base64.b64encode(image_bytes).decode("utf-8")
⋮----
@mcp.resource("test://image", mime_type="image/png")
    def get_image_as_string() -> str
⋮----
"""Return a test image as base64 string."""
⋮----
@mcp.resource("test://image_bytes", mime_type="image/png")
    def get_image_as_bytes() -> bytes
⋮----
"""Return a test image as bytes."""
⋮----
# Test that resources are listed with correct mime type
⋮----
# List resources and verify mime types
resources = await client.list_resources()
⋮----
mapping = {str(r.uri): r for r in resources.resources}
⋮----
# Find our resources
string_resource = mapping["test://image"]
bytes_resource = mapping["test://image_bytes"]
⋮----
# Verify mime types
⋮----
# Also verify the content can be read correctly
string_result = await client.read_resource(AnyUrl("test://image"))
⋮----
bytes_result = await client.read_resource(AnyUrl("test://image_bytes"))
⋮----
async def test_lowlevel_resource_mime_type()
⋮----
server = Server("test")
⋮----
# Create test resources with specific mime types
test_resources = [
⋮----
@server.list_resources()
    async def handle_list_resources()
⋮----
@server.read_resource()
    async def handle_read_resource(uri: AnyUrl)
````

## File: tests/issues/test_176_progress_token.py
````python
pytestmark = pytest.mark.anyio
⋮----
async def test_progress_token_zero_first_call()
⋮----
"""Test that progress notifications work when progress_token is 0 on first call."""
⋮----
# Create mock session with progress notification tracking
mock_session = AsyncMock()
⋮----
# Create request context with progress token 0
mock_meta = MagicMock()
mock_meta.progressToken = 0  # This is the key test case - token is 0
⋮----
request_context = RequestContext(
⋮----
# Create context with our mocks
ctx = Context(request_context=request_context, fastmcp=MagicMock())
⋮----
# Test progress reporting
await ctx.report_progress(0, 10)  # First call with 0
await ctx.report_progress(5, 10)  # Middle progress
await ctx.report_progress(10, 10)  # Complete
⋮----
# Verify progress notifications
````

## File: tests/issues/test_188_concurrency.py
````python
_sleep_time_seconds = 0.01
_resource_name = "slow://slow_resource"
⋮----
@pytest.mark.anyio
async def test_messages_are_executed_concurrently()
⋮----
server = FastMCP("test")
⋮----
@server.tool("sleep")
    async def sleep_tool()
⋮----
@server.resource(_resource_name)
    async def slow_resource()
⋮----
start_time = anyio.current_time()
⋮----
end_time = anyio.current_time()
⋮----
duration = end_time - start_time
⋮----
def main()
````

## File: tests/issues/test_192_request_id.py
````python
@pytest.mark.anyio
async def test_request_id_match() -> None
⋮----
"""Test that the server preserves request IDs in responses."""
server = Server("test")
custom_request_id = "test-123"
⋮----
# Create memory streams for communication
⋮----
# Server task to process the request
async def run_server()
⋮----
# Start server task
⋮----
# Send initialize request
init_req = JSONRPCRequest(
⋮----
response = await server_reader.receive()  # Get init response but don't need to check it
⋮----
# Send initialized notification
initialized_notification = JSONRPCNotification(
⋮----
# Send ping request with custom ID
ping_request = JSONRPCRequest(id=custom_request_id, method="ping", params={}, jsonrpc="2.0")
⋮----
# Read response
response = await server_reader.receive()
⋮----
# Verify response ID matches request ID
⋮----
# Cancel server task
````

## File: tests/issues/test_342_base64_encoding.py
````python
"""Test for base64 encoding issue in MCP server.

This test demonstrates the issue in server.py where the server uses
urlsafe_b64encode but the BlobResourceContents validator expects standard
base64 encoding.

The test should FAIL before fixing server.py to use b64encode instead of
urlsafe_b64encode.
After the fix, the test should PASS.
"""
⋮----
@pytest.mark.anyio
async def test_server_base64_encoding_issue()
⋮----
"""Tests that server response can be validated by BlobResourceContents.

    This test will:
    1. Set up a server that returns binary data
    2. Extract the base64-encoded blob from the server's response
    3. Verify the encoded data can be properly validated by BlobResourceContents

    BEFORE FIX: The test will fail because server uses urlsafe_b64encode
    AFTER FIX: The test will pass because server uses standard b64encode
    """
server = Server("test")
⋮----
# Create binary data that will definitely result in + and / characters
# when encoded with standard base64
binary_data = bytes(list(range(255)) * 4)
⋮----
# Register a resource handler that returns our test data
⋮----
@server.read_resource()
    async def read_resource(uri: AnyUrl) -> list[ReadResourceContents]
⋮----
# Get the handler directly from the server
handler = server.request_handlers[ReadResourceRequest]
⋮----
# Create a request
request = ReadResourceRequest(
⋮----
# Call the handler to get the response
result: ServerResult = await handler(request)
⋮----
# After (fixed code):
read_result: ReadResourceResult = cast(ReadResourceResult, result.root)
blob_content = read_result.contents[0]
⋮----
# First verify our test data actually produces different encodings
urlsafe_b64 = base64.urlsafe_b64encode(binary_data).decode()
standard_b64 = base64.b64encode(binary_data).decode()
⋮----
" encoding difference"
⋮----
# Now validate the server's output with BlobResourceContents.model_validate
# Before the fix: This should fail with "Invalid base64" because server
# uses urlsafe_b64encode
# After the fix: This should pass because server will use standard b64encode
model_dict = blob_content.model_dump()
⋮----
# Direct validation - this will fail before fix, pass after fix
blob_model = BlobResourceContents.model_validate(model_dict)
⋮----
# Verify we can decode the data back correctly
decoded = base64.b64decode(blob_model.blob)
````

## File: tests/issues/test_355_type_error.py
````python
class Database:  # Replace with your actual DB type
⋮----
@classmethod
    async def connect(cls)
⋮----
async def disconnect(self)
⋮----
def query(self)
⋮----
# Create a named server
mcp = FastMCP("My App")
⋮----
@dataclass
class AppContext
⋮----
db: Database
⋮----
@asynccontextmanager
async def app_lifespan(server: FastMCP) -> AsyncIterator[AppContext]
⋮----
"""Manage application lifecycle with type-safe context"""
# Initialize on startup
db = await Database.connect()
⋮----
# Cleanup on shutdown
⋮----
# Pass lifespan to server
mcp = FastMCP("My App", lifespan=app_lifespan)
⋮----
# Access type-safe lifespan context in tools
⋮----
@mcp.tool()
def query_db(ctx: Context) -> str
⋮----
"""Tool that uses initialized resources"""
db = ctx.request_context.lifespan_context.db
````

## File: tests/issues/test_88_random_error.py
````python
"""Test to reproduce issue #88: Random error thrown on response."""
⋮----
@pytest.mark.anyio
async def test_notification_validation_error(tmp_path: Path)
⋮----
"""Test that timeouts are handled gracefully and don't break the server.

    This test verifies that when a client request times out:
    1. The server task stays alive
    2. The server can still handle new requests
    3. The client can make new requests
    4. No resources are leaked
    """
⋮----
server = Server(name="test")
request_count = 0
slow_request_started = anyio.Event()
slow_request_complete = anyio.Event()
⋮----
@server.list_tools()
    async def list_tools() -> list[types.Tool]
⋮----
@server.call_tool()
    async def slow_tool(name: str, arg) -> Sequence[ContentBlock]
⋮----
# Signal that slow request has started
⋮----
# Long enough to ensure timeout
⋮----
# Signal completion
⋮----
# Fast enough to complete before timeout
⋮----
task_status.started(scope)  # type: ignore
⋮----
async def client(read_stream, write_stream, scope)
⋮----
# Use a timeout that's:
# - Long enough for fast operations (>10ms)
# - Short enough for slow operations (<200ms)
# - Not too short to avoid flakiness
⋮----
# First call should work (fast operation)
result = await session.call_tool("fast")
⋮----
# Second call should timeout (slow operation)
⋮----
# Wait for slow request to complete in the background
with anyio.fail_after(1):  # Timeout after 1 second
⋮----
# Third call should work (fast operation),
# proving server is still responsive
⋮----
# Run server and client in separate task groups to avoid cancellation
⋮----
scope = await tg.start(server_handler, server_reader, client_writer)
# Run client in a separate task to avoid cancellation
````

## File: tests/issues/test_malformed_input.py
````python
# Claude Debug
"""Test for HackerOne vulnerability report #3156202 - malformed input DOS."""
⋮----
@pytest.mark.anyio
async def test_malformed_initialize_request_does_not_crash_server()
⋮----
"""
    Test that malformed initialize requests return proper error responses
    instead of crashing the server (HackerOne #3156202).
    """
# Create in-memory streams for testing
⋮----
# Create a malformed initialize request (missing required params field)
malformed_request = JSONRPCRequest(
⋮----
# params=None  # Missing required params field
⋮----
# Wrap in session message
request_message = SessionMessage(message=JSONRPCMessage(malformed_request))
⋮----
# Start a server session
⋮----
# Send the malformed request
⋮----
# Give the session time to process the request
⋮----
# Check that we received an error response instead of a crash
⋮----
response_message = write_receive_stream.receive_nowait()
response = response_message.message.root
⋮----
# Verify it's a proper JSON-RPC error response
⋮----
# Verify the session is still alive and can handle more requests
# Send another malformed request to confirm server stability
another_malformed_request = JSONRPCRequest(
⋮----
# params=None  # Missing required params
⋮----
another_request_message = SessionMessage(message=JSONRPCMessage(another_malformed_request))
⋮----
# Should get another error response, not a crash
second_response_message = write_receive_stream.receive_nowait()
second_response = second_response_message.message.root
⋮----
# Close all streams to ensure proper cleanup
⋮----
@pytest.mark.anyio
async def test_multiple_concurrent_malformed_requests()
⋮----
"""
    Test that multiple concurrent malformed requests don't crash the server.
    """
⋮----
# Send multiple malformed requests concurrently
malformed_requests = []
⋮----
# Send all requests
⋮----
# Give time to process
⋮----
# Verify we get error responses for all requests
error_responses = []
⋮----
pass  # No more messages
⋮----
# Should have received 10 error responses
````

## File: tests/server/auth/middleware/test_auth_context.py
````python
"""
Tests for the AuthContext middleware components.
"""
⋮----
class MockApp
⋮----
"""Mock ASGI app for testing."""
⋮----
def __init__(self)
⋮----
async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None
⋮----
# Check the context during the call
⋮----
@pytest.fixture
def valid_access_token() -> AccessToken
⋮----
"""Create a valid access token."""
⋮----
expires_at=int(time.time()) + 3600,  # 1 hour from now
⋮----
@pytest.mark.anyio
class TestAuthContextMiddleware
⋮----
"""Tests for the AuthContextMiddleware class."""
⋮----
async def test_with_authenticated_user(self, valid_access_token: AccessToken)
⋮----
"""Test middleware with an authenticated user in scope."""
app = MockApp()
middleware = AuthContextMiddleware(app)
⋮----
# Create an authenticated user
user = AuthenticatedUser(valid_access_token)
⋮----
scope: Scope = {"type": "http", "user": user}
⋮----
# Create dummy async functions for receive and send
async def receive() -> Message
⋮----
async def send(message: Message) -> None
⋮----
# Verify context is empty before middleware
⋮----
# Run the middleware
⋮----
# Verify the app was called
⋮----
# Verify the access token was available during the call
⋮----
# Verify context is reset after middleware
⋮----
async def test_with_no_user(self)
⋮----
"""Test middleware with no user in scope."""
⋮----
scope: Scope = {"type": "http"}  # No user
⋮----
# Verify the access token was not available during the call
⋮----
# Verify context is still empty after middleware
````

## File: tests/server/auth/middleware/test_bearer_auth.py
````python
"""
Tests for the BearerAuth middleware components.
"""
⋮----
class MockOAuthProvider
⋮----
"""Mock OAuth provider for testing.

    This is a simplified version that only implements the methods needed for testing
    the BearerAuthMiddleware components.
    """
⋮----
def __init__(self)
⋮----
self.tokens = {}  # token -> AccessToken
⋮----
def add_token(self, token: str, access_token: AccessToken) -> None
⋮----
"""Add a token to the provider."""
⋮----
async def load_access_token(self, token: str) -> AccessToken | None
⋮----
"""Load an access token."""
⋮----
"""Helper function to add a token to a provider.

    This is used to work around type checking issues with our mock provider.
    """
# We know this is actually a MockOAuthProvider
mock_provider = cast(MockOAuthProvider, provider)
⋮----
class MockApp
⋮----
"""Mock ASGI app for testing."""
⋮----
async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None
⋮----
@pytest.fixture
def mock_oauth_provider() -> OAuthAuthorizationServerProvider[Any, Any, Any]
⋮----
"""Create a mock OAuth provider."""
# Use type casting to satisfy the type checker
⋮----
@pytest.fixture
def valid_access_token() -> AccessToken
⋮----
"""Create a valid access token."""
⋮----
expires_at=int(time.time()) + 3600,  # 1 hour from now
⋮----
@pytest.fixture
def expired_access_token() -> AccessToken
⋮----
"""Create an expired access token."""
⋮----
expires_at=int(time.time()) - 3600,  # 1 hour ago
⋮----
@pytest.fixture
def no_expiry_access_token() -> AccessToken
⋮----
"""Create an access token with no expiry."""
⋮----
@pytest.mark.anyio
class TestBearerAuthBackend
⋮----
"""Tests for the BearerAuthBackend class."""
⋮----
async def test_no_auth_header(self, mock_oauth_provider: OAuthAuthorizationServerProvider[Any, Any, Any])
⋮----
"""Test authentication with no Authorization header."""
backend = BearerAuthBackend(token_verifier=ProviderTokenVerifier(mock_oauth_provider))
request = Request({"type": "http", "headers": []})
result = await backend.authenticate(request)
⋮----
async def test_non_bearer_auth_header(self, mock_oauth_provider: OAuthAuthorizationServerProvider[Any, Any, Any])
⋮----
"""Test authentication with non-Bearer Authorization header."""
⋮----
request = Request(
⋮----
async def test_invalid_token(self, mock_oauth_provider: OAuthAuthorizationServerProvider[Any, Any, Any])
⋮----
"""Test authentication with invalid token."""
⋮----
"""Test authentication with expired token."""
⋮----
"""Test authentication with valid token."""
⋮----
"""Test authentication with token that has no expiry."""
⋮----
"""Test with lowercase 'bearer' prefix in Authorization header"""
⋮----
headers = Headers({"Authorization": "bearer valid_token"})
scope = {"type": "http", "headers": headers.raw}
request = Request(scope)
⋮----
"""Test with mixed 'BeArEr' prefix in Authorization header"""
⋮----
headers = Headers({"authorization": "BeArEr valid_token"})
⋮----
"""Test authentication with mixed 'Authorization' header."""
⋮----
headers = Headers({"AuThOrIzAtIoN": "BeArEr valid_token"})
⋮----
@pytest.mark.anyio
class TestRequireAuthMiddleware
⋮----
"""Tests for the RequireAuthMiddleware class."""
⋮----
async def test_no_user(self)
⋮----
"""Test middleware with no user in scope."""
app = MockApp()
middleware = RequireAuthMiddleware(app, required_scopes=["read"])
scope: Scope = {"type": "http"}
⋮----
# Create dummy async functions for receive and send
async def receive() -> Message
⋮----
sent_messages = []
⋮----
async def send(message: Message) -> None
⋮----
# Check that a 401 response was sent
⋮----
async def test_non_authenticated_user(self)
⋮----
"""Test middleware with non-authenticated user in scope."""
⋮----
scope: Scope = {"type": "http", "user": object()}
⋮----
async def test_missing_required_scope(self, valid_access_token: AccessToken)
⋮----
"""Test middleware with user missing required scope."""
⋮----
middleware = RequireAuthMiddleware(app, required_scopes=["admin"])
⋮----
# Create a user with read/write scopes but not admin
user = AuthenticatedUser(valid_access_token)
auth = AuthCredentials(["read", "write"])
⋮----
scope: Scope = {"type": "http", "user": user, "auth": auth}
⋮----
# Check that a 403 response was sent
⋮----
async def test_no_auth_credentials(self, valid_access_token: AccessToken)
⋮----
"""Test middleware with no auth credentials in scope."""
⋮----
# Create a user with read/write scopes
⋮----
scope: Scope = {"type": "http", "user": user}  # No auth credentials
⋮----
async def test_has_required_scopes(self, valid_access_token: AccessToken)
⋮----
"""Test middleware with user having all required scopes."""
⋮----
async def test_multiple_required_scopes(self, valid_access_token: AccessToken)
⋮----
"""Test middleware with multiple required scopes."""
⋮----
middleware = RequireAuthMiddleware(app, required_scopes=["read", "write"])
⋮----
async def test_no_required_scopes(self, valid_access_token: AccessToken)
⋮----
"""Test middleware with no required scopes."""
⋮----
middleware = RequireAuthMiddleware(app, required_scopes=[])
````

## File: tests/server/auth/test_error_handling.py
````python
"""
Tests for OAuth error handling in the auth handlers.
"""
⋮----
@pytest.fixture
def oauth_provider()
⋮----
"""Return a MockOAuthProvider instance that can be configured to raise errors."""
⋮----
@pytest.fixture
def app(oauth_provider)
⋮----
# Enable client registration
client_registration_options = ClientRegistrationOptions(enabled=True)
revocation_options = RevocationOptions(enabled=True)
⋮----
# Create auth routes
auth_routes = create_auth_routes(
⋮----
# Create Starlette app with routes directly
⋮----
@pytest.fixture
def client(app)
⋮----
transport = ASGITransport(app=app)
# Use base_url without a path since routes are directly on the app
⋮----
@pytest.fixture
def pkce_challenge()
⋮----
"""Create a PKCE challenge with code_verifier and code_challenge."""
⋮----
# Generate a code verifier
code_verifier = secrets.token_urlsafe(64)[:128]
⋮----
# Create code challenge using S256 method
code_verifier_bytes = code_verifier.encode("ascii")
sha256 = hashlib.sha256(code_verifier_bytes).digest()
code_challenge = base64.urlsafe_b64encode(sha256).decode().rstrip("=")
⋮----
@pytest.fixture
async def registered_client(client)
⋮----
"""Create and register a test client."""
# Default client metadata
client_metadata = {
⋮----
response = await client.post("/register", json=client_metadata)
⋮----
client_info = response.json()
⋮----
class TestRegistrationErrorHandling
⋮----
@pytest.mark.anyio
    async def test_registration_error_handling(self, client, oauth_provider)
⋮----
# Mock the register_client method to raise a registration error
⋮----
# Prepare a client registration request
client_data = {
⋮----
# Send the registration request
response = await client.post(
⋮----
# Verify the response
⋮----
data = response.json()
⋮----
class TestAuthorizeErrorHandling
⋮----
@pytest.mark.anyio
    async def test_authorize_error_handling(self, client, oauth_provider, registered_client, pkce_challenge)
⋮----
# Mock the authorize method to raise an authorize error
⋮----
# Register the client
client_id = registered_client["client_id"]
redirect_uri = registered_client["redirect_uris"][0]
⋮----
# Prepare an authorization request
params = {
⋮----
# Send the authorization request
response = await client.get("/authorize", params=params)
⋮----
# Verify the response is a redirect with error parameters
⋮----
redirect_url = response.headers["location"]
parsed_url = urlparse(redirect_url)
query_params = parse_qs(parsed_url.query)
⋮----
class TestTokenErrorHandling
⋮----
@pytest.mark.anyio
    async def test_token_error_handling_auth_code(self, client, oauth_provider, registered_client, pkce_challenge)
⋮----
# Register the client and get an auth code
⋮----
client_secret = registered_client["client_secret"]
⋮----
# First get an authorization code
auth_response = await client.get(
⋮----
redirect_url = auth_response.headers["location"]
⋮----
code = query_params["code"][0]
⋮----
# Mock the exchange_authorization_code method to raise a token error
⋮----
# Try to exchange the code for tokens
token_response = await client.post(
⋮----
data = token_response.json()
⋮----
@pytest.mark.anyio
    async def test_token_error_handling_refresh_token(self, client, oauth_provider, registered_client, pkce_challenge)
⋮----
# Register the client and get tokens
⋮----
# Exchange the code for tokens
⋮----
tokens = token_response.json()
refresh_token = tokens["refresh_token"]
⋮----
# Mock the exchange_refresh_token method to raise a token error
⋮----
# Try to use the refresh token
refresh_response = await client.post(
⋮----
data = refresh_response.json()
````

## File: tests/server/fastmcp/auth/__init__.py
````python
"""
Tests for the MCP server auth components.
"""
````

## File: tests/server/fastmcp/auth/test_auth_integration.py
````python
"""
Integration tests for MCP authorization components.
"""
⋮----
# Mock OAuth provider for testing
class MockOAuthProvider(OAuthAuthorizationServerProvider)
⋮----
def __init__(self)
⋮----
self.auth_codes = {}  # code -> {client_id, code_challenge, redirect_uri}
self.tokens = {}  # token -> {client_id, scopes, expires_at}
self.refresh_tokens = {}  # refresh_token -> access_token
⋮----
async def get_client(self, client_id: str) -> OAuthClientInformationFull | None
⋮----
async def register_client(self, client_info: OAuthClientInformationFull)
⋮----
async def authorize(self, client: OAuthClientInformationFull, params: AuthorizationParams) -> str
⋮----
# toy authorize implementation which just immediately generates an authorization
# code and completes the redirect
code = AuthorizationCode(
⋮----
# Generate an access token and refresh token
access_token = f"access_{secrets.token_hex(32)}"
refresh_token = f"refresh_{secrets.token_hex(32)}"
⋮----
# Store the tokens
⋮----
# Remove the used code
⋮----
async def load_refresh_token(self, client: OAuthClientInformationFull, refresh_token: str) -> RefreshToken | None
⋮----
old_access_token = self.refresh_tokens.get(refresh_token)
⋮----
token_info = self.tokens.get(old_access_token)
⋮----
# Create a RefreshToken object that matches what is expected in later code
refresh_obj = RefreshToken(
⋮----
# Check if refresh token exists
⋮----
old_access_token = self.refresh_tokens[refresh_token.token]
⋮----
# Check if the access token exists
⋮----
# Check if the token was issued to this client
token_info = self.tokens[old_access_token]
⋮----
# Generate a new access token and refresh token
new_access_token = f"access_{secrets.token_hex(32)}"
new_refresh_token = f"refresh_{secrets.token_hex(32)}"
⋮----
# Store the new tokens
⋮----
# Remove the old tokens
⋮----
async def load_access_token(self, token: str) -> AccessToken | None
⋮----
token_info = self.tokens.get(token)
⋮----
# Check if token is expired
# if token_info.expires_at < int(time.time()):
#     raise InvalidTokenError("Access token has expired")
⋮----
async def revoke_token(self, token: AccessToken | RefreshToken) -> None
⋮----
# Remove the refresh token
⋮----
# Remove the access token
⋮----
# Also remove any refresh tokens that point to this access token
⋮----
@pytest.fixture
def mock_oauth_provider()
⋮----
@pytest.fixture
def auth_app(mock_oauth_provider)
⋮----
# Create auth router
auth_routes = create_auth_routes(
⋮----
# Create Starlette app
app = Starlette(routes=auth_routes)
⋮----
@pytest.fixture
async def test_client(auth_app)
⋮----
@pytest.fixture
async def registered_client(test_client: httpx.AsyncClient, request)
⋮----
"""Create and register a test client.

    Parameters can be customized via indirect parameterization:
    @pytest.mark.parametrize("registered_client",
                            [{"grant_types": ["authorization_code"]}],
                            indirect=True)
    """
# Default client metadata
client_metadata = {
⋮----
# Override with any parameters from the test
⋮----
response = await test_client.post("/register", json=client_metadata)
⋮----
client_info = response.json()
⋮----
@pytest.fixture
def pkce_challenge()
⋮----
"""Create a PKCE challenge with code_verifier and code_challenge."""
code_verifier = "some_random_verifier_string"
code_challenge = base64.urlsafe_b64encode(hashlib.sha256(code_verifier.encode()).digest()).decode().rstrip("=")
⋮----
@pytest.fixture
async def auth_code(test_client, registered_client, pkce_challenge, request)
⋮----
"""Get an authorization code.

    Parameters can be customized via indirect parameterization:
    @pytest.mark.parametrize("auth_code",
                            [{"redirect_uri": "https://client.example.com/other-callback"}],
                            indirect=True)
    """
# Default authorize params
auth_params = {
⋮----
response = await test_client.get("/authorize", params=auth_params)
⋮----
# Extract the authorization code
redirect_url = response.headers["location"]
parsed_url = urlparse(redirect_url)
query_params = parse_qs(parsed_url.query)
⋮----
auth_code = query_params["code"][0]
⋮----
@pytest.fixture
async def tokens(test_client, registered_client, auth_code, pkce_challenge, request)
⋮----
"""Exchange authorization code for tokens.

    Parameters can be customized via indirect parameterization:
    @pytest.mark.parametrize("tokens",
                            [{"code_verifier": "wrong_verifier"}],
                            indirect=True)
    """
# Default token request params
token_params = {
⋮----
response = await test_client.post("/token", data=token_params)
⋮----
# Don't assert success here since some tests will intentionally cause errors
⋮----
class TestAuthEndpoints
⋮----
@pytest.mark.anyio
    async def test_metadata_endpoint(self, test_client: httpx.AsyncClient)
⋮----
"""Test the OAuth 2.0 metadata endpoint."""
⋮----
response = await test_client.get("/.well-known/oauth-authorization-server")
⋮----
metadata = response.json()
⋮----
@pytest.mark.anyio
    async def test_token_validation_error(self, test_client: httpx.AsyncClient)
⋮----
"""Test token endpoint error - validation error."""
# Missing required fields
response = await test_client.post(
⋮----
# Missing code, code_verifier, client_id, etc.
⋮----
error_response = response.json()
⋮----
assert "error_description" in error_response  # Contains validation error messages
⋮----
@pytest.mark.anyio
    async def test_token_invalid_auth_code(self, test_client, registered_client, pkce_challenge)
⋮----
"""Test token endpoint error - authorization code does not exist."""
# Try to use a non-existent authorization code
⋮----
"""Test token endpoint error - authorization code has expired."""
# Get the current time for our time mocking
current_time = time.time()
⋮----
# Find the auth code object
code_value = auth_code["code"]
found_code = None
⋮----
found_code = code_obj
⋮----
# Authorization codes are typically short-lived (5 minutes = 300 seconds)
# So we'll mock time to be 10 minutes (600 seconds) in the future
⋮----
# Try to use the expired authorization code
⋮----
async def test_token_redirect_uri_mismatch(self, test_client, registered_client, auth_code, pkce_challenge)
⋮----
"""Test token endpoint error - redirect URI mismatch."""
# Try to use the code with a different redirect URI
⋮----
# Different from the one used in /authorize
⋮----
@pytest.mark.anyio
    async def test_token_code_verifier_mismatch(self, test_client, registered_client, auth_code)
⋮----
"""Test token endpoint error - PKCE code verifier mismatch."""
# Try to use the code with an incorrect code verifier
⋮----
# Different from the one used to create challenge
⋮----
@pytest.mark.anyio
    async def test_token_invalid_refresh_token(self, test_client, registered_client)
⋮----
"""Test token endpoint error - refresh token does not exist."""
# Try to use a non-existent refresh token
⋮----
"""Test token endpoint error - refresh token has expired."""
# Step 1: First, let's create a token and refresh token at the current time
⋮----
# Exchange authorization code for tokens normally
token_response = await test_client.post(
⋮----
tokens = token_response.json()
refresh_token = tokens["refresh_token"]
⋮----
# Step 2: Time travel forward 4 hours (tokens expire in 1 hour by default)
# Mock the time.time() function to return a value 4 hours in the future
with unittest.mock.patch("time.time", return_value=current_time + 14400):  # 4 hours = 14400 seconds
# Try to use the refresh token which should now be considered expired
⋮----
# In the "future", the token should be considered expired
⋮----
@pytest.mark.anyio
    async def test_token_invalid_scope(self, test_client, registered_client, auth_code, pkce_challenge)
⋮----
"""Test token endpoint error - invalid scope in refresh token request."""
# Exchange authorization code for tokens
⋮----
# Try to use refresh token with an invalid scope
⋮----
"scope": "read write invalid_scope",  # Adding an invalid scope
⋮----
@pytest.mark.anyio
    async def test_client_registration(self, test_client: httpx.AsyncClient, mock_oauth_provider: MockOAuthProvider)
⋮----
"""Test client registration."""
⋮----
# Verify that the client was registered
# assert await mock_oauth_provider.clients_store.get_client(
#     client_info["client_id"]
# ) is not None
⋮----
@pytest.mark.anyio
    async def test_client_registration_missing_required_fields(self, test_client: httpx.AsyncClient)
⋮----
"""Test client registration with missing required fields."""
# Missing redirect_uris which is a required field
⋮----
error_data = response.json()
⋮----
@pytest.mark.anyio
    async def test_client_registration_invalid_uri(self, test_client: httpx.AsyncClient)
⋮----
"""Test client registration with invalid URIs."""
# Invalid redirect_uri format
⋮----
@pytest.mark.anyio
    async def test_client_registration_empty_redirect_uris(self, test_client: httpx.AsyncClient)
⋮----
"""Test client registration with empty redirect_uris array."""
⋮----
"redirect_uris": [],  # Empty array
⋮----
"""Test the authorization endpoint using POST with form-encoded data."""
# Register a client
⋮----
# Use POST with form-encoded data for authorization
⋮----
# Extract the authorization code from the redirect URL
⋮----
"""Test the full authorization flow."""
# 1. Register a client
⋮----
# 2. Request authorization using GET with query params
response = await test_client.get(
⋮----
# 3. Extract the authorization code from the redirect URL
⋮----
# 4. Exchange the authorization code for tokens
⋮----
token_response = response.json()
⋮----
# 5. Verify the access token
access_token = token_response["access_token"]
refresh_token = token_response["refresh_token"]
⋮----
# Create a test client with the token
auth_info = await mock_oauth_provider.load_access_token(access_token)
⋮----
# 6. Refresh the token
⋮----
new_token_response = response.json()
⋮----
# 7. Revoke the token
⋮----
# Verify that the token was revoked
⋮----
@pytest.mark.anyio
    async def test_revoke_invalid_token(self, test_client, registered_client)
⋮----
"""Test revoking an invalid token."""
⋮----
# per RFC, this should return 200 even if the token is invalid
⋮----
@pytest.mark.anyio
    async def test_revoke_with_malformed_token(self, test_client, registered_client)
⋮----
@pytest.mark.anyio
    async def test_client_registration_disallowed_scopes(self, test_client: httpx.AsyncClient)
⋮----
"""Test client registration with scopes that are not allowed."""
⋮----
"scope": "read write profile admin",  # 'admin' is not in valid_scopes
⋮----
# No scope specified
⋮----
# Verify client was registered successfully
⋮----
# Retrieve the client from the store to verify default scopes
registered_client = await mock_oauth_provider.get_client(client_info["client_id"])
⋮----
# Check that default scopes were applied
⋮----
@pytest.mark.anyio
    async def test_client_registration_invalid_grant_type(self, test_client: httpx.AsyncClient)
⋮----
class TestAuthorizeEndpointErrors
⋮----
"""Test error handling in the OAuth authorization endpoint."""
⋮----
@pytest.mark.anyio
    async def test_authorize_missing_client_id(self, test_client: httpx.AsyncClient, pkce_challenge)
⋮----
"""Test authorization endpoint with missing client_id.

        According to the OAuth2.0 spec, if client_id is missing, the server should
        inform the resource owner and NOT redirect.
        """
⋮----
# Missing client_id
⋮----
# Should NOT redirect, should show an error page
⋮----
# The response should include an error message about missing client_id
⋮----
@pytest.mark.anyio
    async def test_authorize_invalid_client_id(self, test_client: httpx.AsyncClient, pkce_challenge)
⋮----
"""Test authorization endpoint with invalid client_id.

        According to the OAuth2.0 spec, if client_id is invalid, the server should
        inform the resource owner and NOT redirect.
        """
⋮----
# The response should include an error message about invalid client_id
⋮----
"""Test authorization endpoint with missing redirect_uri.

        If client has only one registered redirect_uri, it can be omitted.
        """
⋮----
# Missing redirect_uri
⋮----
# Should redirect to the registered redirect_uri
⋮----
"""Test authorization endpoint with invalid redirect_uri.

        According to the OAuth2.0 spec, if redirect_uri is invalid or doesn't match,
        the server should inform the resource owner and NOT redirect.
        """
⋮----
# Non-matching URI
⋮----
# The response should include an error message about redirect_uri mismatch
⋮----
"""Test endpoint with missing redirect_uri with multiple registered URIs.

        If client has multiple registered redirect_uris, redirect_uri must be provided.
        """
⋮----
# Should NOT redirect, should return a 400 error
⋮----
# The response should include an error message about missing redirect_uri
⋮----
"""Test authorization endpoint with unsupported response_type.

        According to the OAuth2.0 spec, for other errors like unsupported_response_type,
        the server should redirect with error parameters.
        """
⋮----
"response_type": "token",  # Unsupported (we only support "code")
⋮----
# Should redirect with error parameters
⋮----
# State should be preserved
⋮----
"""Test authorization endpoint with missing response_type.

        Missing required parameter should result in invalid_request error.
        """
⋮----
# Missing response_type
⋮----
@pytest.mark.anyio
    async def test_authorize_missing_pkce_challenge(self, test_client: httpx.AsyncClient, registered_client)
⋮----
"""Test authorization endpoint with missing PKCE code_challenge.

        Missing PKCE parameters should result in invalid_request error.
        """
⋮----
# Missing code_challenge
⋮----
# using default URL
⋮----
@pytest.mark.anyio
    async def test_authorize_invalid_scope(self, test_client: httpx.AsyncClient, registered_client, pkce_challenge)
⋮----
"""Test authorization endpoint with invalid scope.

        Invalid scope should redirect with invalid_scope error.
        """
````

## File: tests/server/fastmcp/prompts/test_base.py
````python
class TestRenderPrompt
⋮----
@pytest.mark.anyio
    async def test_basic_fn(self)
⋮----
def fn() -> str
⋮----
prompt = Prompt.from_function(fn)
⋮----
@pytest.mark.anyio
    async def test_async_fn(self)
⋮----
async def fn() -> str
⋮----
@pytest.mark.anyio
    async def test_fn_with_args(self)
⋮----
async def fn(name: str, age: int = 30) -> str
⋮----
@pytest.mark.anyio
    async def test_fn_with_invalid_kwargs(self)
⋮----
@pytest.mark.anyio
    async def test_fn_returns_message(self)
⋮----
async def fn() -> UserMessage
⋮----
@pytest.mark.anyio
    async def test_fn_returns_assistant_message(self)
⋮----
async def fn() -> AssistantMessage
⋮----
@pytest.mark.anyio
    async def test_fn_returns_multiple_messages(self)
⋮----
expected = [
⋮----
async def fn() -> list[Message]
⋮----
@pytest.mark.anyio
    async def test_fn_returns_list_of_strings(self)
⋮----
async def fn() -> list[str]
⋮----
@pytest.mark.anyio
    async def test_fn_returns_resource_content(self)
⋮----
"""Test returning a message with resource content."""
⋮----
@pytest.mark.anyio
    async def test_fn_returns_mixed_content(self)
⋮----
"""Test returning messages with mixed content types."""
⋮----
@pytest.mark.anyio
    async def test_fn_returns_dict_with_resource(self)
⋮----
"""Test returning a dict with resource content."""
⋮----
async def fn() -> dict
````

## File: tests/server/fastmcp/prompts/test_manager.py
````python
class TestPromptManager
⋮----
def test_add_prompt(self)
⋮----
"""Test adding a prompt to the manager."""
⋮----
def fn() -> str
⋮----
manager = PromptManager()
prompt = Prompt.from_function(fn)
added = manager.add_prompt(prompt)
⋮----
def test_add_duplicate_prompt(self, caplog)
⋮----
"""Test adding the same prompt twice."""
⋮----
first = manager.add_prompt(prompt)
second = manager.add_prompt(prompt)
⋮----
def test_disable_warn_on_duplicate_prompts(self, caplog)
⋮----
"""Test disabling warning on duplicate prompts."""
⋮----
manager = PromptManager(warn_on_duplicate_prompts=False)
⋮----
def test_list_prompts(self)
⋮----
"""Test listing all prompts."""
⋮----
def fn1() -> str
⋮----
def fn2() -> str
⋮----
prompt1 = Prompt.from_function(fn1)
prompt2 = Prompt.from_function(fn2)
⋮----
prompts = manager.list_prompts()
⋮----
@pytest.mark.anyio
    async def test_render_prompt(self)
⋮----
"""Test rendering a prompt."""
⋮----
messages = await manager.render_prompt("fn")
⋮----
@pytest.mark.anyio
    async def test_render_prompt_with_args(self)
⋮----
"""Test rendering a prompt with arguments."""
⋮----
def fn(name: str) -> str
⋮----
messages = await manager.render_prompt("fn", arguments={"name": "World"})
⋮----
@pytest.mark.anyio
    async def test_render_unknown_prompt(self)
⋮----
"""Test rendering a non-existent prompt."""
⋮----
@pytest.mark.anyio
    async def test_render_prompt_with_missing_args(self)
⋮----
"""Test rendering a prompt with missing required arguments."""
````

## File: tests/server/fastmcp/resources/test_file_resources.py
````python
@pytest.fixture
def temp_file()
⋮----
"""Create a temporary file for testing.

    File is automatically cleaned up after the test if it still exists.
    """
content = "test content"
⋮----
path = Path(f.name).resolve()
⋮----
pass  # File was already deleted by the test
⋮----
class TestFileResource
⋮----
"""Test FileResource functionality."""
⋮----
def test_file_resource_creation(self, temp_file: Path)
⋮----
"""Test creating a FileResource."""
resource = FileResource(
⋮----
assert resource.mime_type == "text/plain"  # default
⋮----
assert resource.is_binary is False  # default
⋮----
def test_file_resource_str_path_conversion(self, temp_file: Path)
⋮----
"""Test FileResource handles string paths."""
⋮----
@pytest.mark.anyio
    async def test_read_text_file(self, temp_file: Path)
⋮----
"""Test reading a text file."""
⋮----
content = await resource.read()
⋮----
@pytest.mark.anyio
    async def test_read_binary_file(self, temp_file: Path)
⋮----
"""Test reading a file as binary."""
⋮----
def test_relative_path_error(self)
⋮----
"""Test error on relative path."""
⋮----
@pytest.mark.anyio
    async def test_missing_file_error(self, temp_file: Path)
⋮----
"""Test error when file doesn't exist."""
# Create path to non-existent file
missing = temp_file.parent / "missing.txt"
⋮----
@pytest.mark.skipif(os.name == "nt", reason="File permissions behave differently on Windows")
@pytest.mark.anyio
    async def test_permission_error(self, temp_file: Path)
⋮----
"""Test reading a file without permissions."""
temp_file.chmod(0o000)  # Remove all permissions
⋮----
temp_file.chmod(0o644)  # Restore permissions
````

## File: tests/server/fastmcp/resources/test_function_resources.py
````python
class TestFunctionResource
⋮----
"""Test FunctionResource functionality."""
⋮----
def test_function_resource_creation(self)
⋮----
"""Test creating a FunctionResource."""
⋮----
def my_func() -> str
⋮----
resource = FunctionResource(
⋮----
assert resource.mime_type == "text/plain"  # default
⋮----
@pytest.mark.anyio
    async def test_read_text(self)
⋮----
"""Test reading text from a FunctionResource."""
⋮----
def get_data() -> str
⋮----
content = await resource.read()
⋮----
@pytest.mark.anyio
    async def test_read_binary(self)
⋮----
"""Test reading binary data from a FunctionResource."""
⋮----
def get_data() -> bytes
⋮----
@pytest.mark.anyio
    async def test_json_conversion(self)
⋮----
"""Test automatic JSON conversion of non-string results."""
⋮----
def get_data() -> dict
⋮----
@pytest.mark.anyio
    async def test_error_handling(self)
⋮----
"""Test error handling in FunctionResource."""
⋮----
def failing_func() -> str
⋮----
@pytest.mark.anyio
    async def test_basemodel_conversion(self)
⋮----
"""Test handling of BaseModel types."""
⋮----
class MyModel(BaseModel)
⋮----
name: str
⋮----
@pytest.mark.anyio
    async def test_custom_type_conversion(self)
⋮----
"""Test handling of custom types."""
⋮----
class CustomData
⋮----
def __str__(self) -> str
⋮----
def get_data() -> CustomData
⋮----
@pytest.mark.anyio
    async def test_async_read_text(self)
⋮----
"""Test reading text from async FunctionResource."""
⋮----
async def get_data() -> str
⋮----
@pytest.mark.anyio
    async def test_from_function(self)
⋮----
"""Test creating a FunctionResource from a function."""
⋮----
"""get_data returns a string"""
⋮----
resource = FunctionResource.from_function(
````

## File: tests/server/fastmcp/resources/test_resource_manager.py
````python
@pytest.fixture
def temp_file()
⋮----
"""Create a temporary file for testing.

    File is automatically cleaned up after the test if it still exists.
    """
content = "test content"
⋮----
path = Path(f.name).resolve()
⋮----
pass  # File was already deleted by the test
⋮----
class TestResourceManager
⋮----
"""Test ResourceManager functionality."""
⋮----
def test_add_resource(self, temp_file: Path)
⋮----
"""Test adding a resource."""
manager = ResourceManager()
resource = FileResource(
added = manager.add_resource(resource)
⋮----
def test_add_duplicate_resource(self, temp_file: Path)
⋮----
"""Test adding the same resource twice."""
⋮----
first = manager.add_resource(resource)
second = manager.add_resource(resource)
⋮----
def test_warn_on_duplicate_resources(self, temp_file: Path, caplog)
⋮----
"""Test warning on duplicate resources."""
⋮----
def test_disable_warn_on_duplicate_resources(self, temp_file: Path, caplog)
⋮----
"""Test disabling warning on duplicate resources."""
manager = ResourceManager(warn_on_duplicate_resources=False)
⋮----
@pytest.mark.anyio
    async def test_get_resource(self, temp_file: Path)
⋮----
"""Test getting a resource by URI."""
⋮----
retrieved = await manager.get_resource(resource.uri)
⋮----
@pytest.mark.anyio
    async def test_get_resource_from_template(self)
⋮----
"""Test getting a resource through a template."""
⋮----
def greet(name: str) -> str
⋮----
template = ResourceTemplate.from_function(
⋮----
resource = await manager.get_resource(AnyUrl("greet://world"))
⋮----
content = await resource.read()
⋮----
@pytest.mark.anyio
    async def test_get_unknown_resource(self)
⋮----
"""Test getting a non-existent resource."""
⋮----
def test_list_resources(self, temp_file: Path)
⋮----
"""Test listing all resources."""
⋮----
resource1 = FileResource(
resource2 = FileResource(
⋮----
resources = manager.list_resources()
````

## File: tests/server/fastmcp/resources/test_resource_template.py
````python
class TestResourceTemplate
⋮----
"""Test ResourceTemplate functionality."""
⋮----
def test_template_creation(self)
⋮----
"""Test creating a template from a function."""
⋮----
def my_func(key: str, value: int) -> dict
⋮----
template = ResourceTemplate.from_function(
⋮----
assert template.mime_type == "text/plain"  # default
test_input = {"key": "test", "value": 42}
⋮----
def test_template_matches(self)
⋮----
"""Test matching URIs against a template."""
⋮----
# Valid match
params = template.matches("test://foo/123")
⋮----
# No match
⋮----
@pytest.mark.anyio
    async def test_create_resource(self)
⋮----
"""Test creating a resource from a template."""
⋮----
resource = await template.create_resource(
⋮----
content = await resource.read()
⋮----
data = json.loads(content)
⋮----
@pytest.mark.anyio
    async def test_template_error(self)
⋮----
"""Test error handling in template resource creation."""
⋮----
def failing_func(x: str) -> str
⋮----
@pytest.mark.anyio
    async def test_async_text_resource(self)
⋮----
"""Test creating a text resource from async function."""
⋮----
async def greet(name: str) -> str
⋮----
@pytest.mark.anyio
    async def test_async_binary_resource(self)
⋮----
"""Test creating a binary resource from async function."""
⋮----
async def get_bytes(value: str) -> bytes
⋮----
@pytest.mark.anyio
    async def test_basemodel_conversion(self)
⋮----
"""Test handling of BaseModel types."""
⋮----
class MyModel(BaseModel)
⋮----
key: str
value: int
⋮----
def get_data(key: str, value: int) -> MyModel
⋮----
@pytest.mark.anyio
    async def test_custom_type_conversion(self)
⋮----
"""Test handling of custom types."""
⋮----
class CustomData
⋮----
def __init__(self, value: str)
⋮----
def __str__(self) -> str
⋮----
def get_data(value: str) -> CustomData
````

## File: tests/server/fastmcp/resources/test_resources.py
````python
class TestResourceValidation
⋮----
"""Test base Resource validation."""
⋮----
def test_resource_uri_validation(self)
⋮----
"""Test URI validation."""
⋮----
def dummy_func() -> str
⋮----
# Valid URI
resource = FunctionResource(
⋮----
# Missing protocol
⋮----
# Missing host
⋮----
def test_resource_name_from_uri(self)
⋮----
"""Test name is extracted from URI if not provided."""
⋮----
def test_resource_name_validation(self)
⋮----
"""Test name validation."""
⋮----
# Must provide either name or URI
⋮----
# Explicit name takes precedence over URI
⋮----
def test_resource_mime_type(self)
⋮----
"""Test mime type handling."""
⋮----
# Default mime type
⋮----
# Custom mime type
⋮----
@pytest.mark.anyio
    async def test_resource_read_abstract(self)
⋮----
"""Test that Resource.read() is abstract."""
⋮----
class ConcreteResource(Resource)
⋮----
ConcreteResource(uri=AnyUrl("test://test"), name="test")  # type: ignore
````

## File: tests/server/fastmcp/servers/test_file_server.py
````python
@pytest.fixture()
def test_dir(tmp_path_factory) -> Path
⋮----
"""Create a temporary directory with test files."""
tmp = tmp_path_factory.mktemp("test_files")
⋮----
# Create test files
⋮----
@pytest.fixture
def mcp() -> FastMCP
⋮----
mcp = FastMCP()
⋮----
@pytest.fixture(autouse=True)
def resources(mcp: FastMCP, test_dir: Path) -> FastMCP
⋮----
@mcp.resource("dir://test_dir")
    def list_test_dir() -> list[str]
⋮----
"""List the files in the test directory"""
⋮----
@mcp.resource("file://test_dir/example.py")
    def read_example_py() -> str
⋮----
"""Read the example.py file"""
⋮----
@mcp.resource("file://test_dir/readme.md")
    def read_readme_md() -> str
⋮----
"""Read the readme.md file"""
⋮----
@mcp.resource("file://test_dir/config.json")
    def read_config_json() -> str
⋮----
"""Read the config.json file"""
⋮----
@pytest.fixture(autouse=True)
def tools(mcp: FastMCP, test_dir: Path) -> FastMCP
⋮----
@mcp.tool()
    def delete_file(path: str) -> bool
⋮----
# ensure path is in test_dir
⋮----
@pytest.mark.anyio
async def test_list_resources(mcp: FastMCP)
⋮----
resources = await mcp.list_resources()
⋮----
@pytest.mark.anyio
async def test_read_resource_dir(mcp: FastMCP)
⋮----
res_iter = await mcp.read_resource("dir://test_dir")
res_list = list(res_iter)
⋮----
res = res_list[0]
⋮----
files = json.loads(res.content)
⋮----
@pytest.mark.anyio
async def test_read_resource_file(mcp: FastMCP)
⋮----
res_iter = await mcp.read_resource("file://test_dir/example.py")
⋮----
@pytest.mark.anyio
async def test_delete_file(mcp: FastMCP, test_dir: Path)
⋮----
@pytest.mark.anyio
async def test_delete_file_and_check_resources(mcp: FastMCP, test_dir: Path)
````

## File: tests/server/fastmcp/test_elicitation.py
````python
"""
Test the elicitation feature using stdio transport.
"""
⋮----
# Shared schema for basic tests
class AnswerSchema(BaseModel)
⋮----
answer: str = Field(description="The user's answer to the question")
⋮----
def create_ask_user_tool(mcp: FastMCP)
⋮----
"""Create a standard ask_user tool that handles all elicitation responses."""
⋮----
@mcp.tool(description="A tool that uses elicitation")
    async def ask_user(prompt: str, ctx: Context) -> str
⋮----
result = await ctx.elicit(
⋮----
"""Helper to create session, call tool, and assert result."""
⋮----
result = await client_session.call_tool(tool_name, args)
⋮----
@pytest.mark.anyio
async def test_stdio_elicitation()
⋮----
"""Test the elicitation feature using stdio transport."""
mcp = FastMCP(name="StdioElicitationServer")
⋮----
# Create a custom handler for elicitation requests
async def elicitation_callback(context, params)
⋮----
@pytest.mark.anyio
async def test_stdio_elicitation_decline()
⋮----
"""Test elicitation with user declining."""
mcp = FastMCP(name="StdioElicitationDeclineServer")
⋮----
@pytest.mark.anyio
async def test_elicitation_schema_validation()
⋮----
"""Test that elicitation schemas must only contain primitive types."""
mcp = FastMCP(name="ValidationTestServer")
⋮----
def create_validation_tool(name: str, schema_class: type[BaseModel])
⋮----
@mcp.tool(name=name, description=f"Tool testing {name}")
        async def tool(ctx: Context) -> str
⋮----
# Test cases for invalid schemas
class InvalidListSchema(BaseModel)
⋮----
names: list[str] = Field(description="List of names")
⋮----
class NestedModel(BaseModel)
⋮----
value: str
⋮----
class InvalidNestedSchema(BaseModel)
⋮----
nested: NestedModel = Field(description="Nested model")
⋮----
# Dummy callback (won't be called due to validation failure)
⋮----
# Test both invalid schemas
⋮----
result = await client_session.call_tool(tool_name, {})
⋮----
@pytest.mark.anyio
async def test_elicitation_with_optional_fields()
⋮----
"""Test that Optional fields work correctly in elicitation schemas."""
mcp = FastMCP(name="OptionalFieldServer")
⋮----
class OptionalSchema(BaseModel)
⋮----
required_name: str = Field(description="Your name (required)")
optional_age: int | None = Field(default=None, description="Your age (optional)")
optional_email: str | None = Field(default=None, description="Your email (optional)")
subscribe: bool | None = Field(default=False, description="Subscribe to newsletter?")
⋮----
@mcp.tool(description="Tool with optional fields")
    async def optional_tool(ctx: Context) -> str
⋮----
result = await ctx.elicit(message="Please provide your information", schema=OptionalSchema)
⋮----
info = [f"Name: {result.data.required_name}"]
⋮----
# Test cases with different field combinations
test_cases = [
⋮----
# All fields provided
⋮----
# Only required fields
⋮----
async def callback(context, params)
⋮----
# Test invalid optional field
class InvalidOptionalSchema(BaseModel)
⋮----
name: str = Field(description="Name")
optional_list: list[str] | None = Field(default=None, description="Invalid optional list")
⋮----
@mcp.tool(description="Tool with invalid optional field")
    async def invalid_optional_tool(ctx: Context) -> str
````

## File: tests/server/fastmcp/test_func_metadata.py
````python
class SomeInputModelA(BaseModel)
⋮----
class SomeInputModelB(BaseModel)
⋮----
class InnerModel(BaseModel)
⋮----
x: int
⋮----
how_many_shrimp: Annotated[int, Field(description="How many shrimp in the tank???")]
ok: InnerModel
y: None
⋮----
# list[str] | str is an interesting case because if it comes in as JSON like
# "[\"a\", \"b\"]" then it will be naively parsed as a string.
⋮----
str,  # Should be ignored, really
⋮----
my_model_a_with_default: SomeInputModelA = SomeInputModelA(),  # noqa: B008
⋮----
_ = (
⋮----
@pytest.mark.anyio
async def test_complex_function_runtime_arg_validation_non_json()
⋮----
"""Test that basic non-JSON arguments are validated correctly"""
meta = func_metadata(complex_arguments_fn)
⋮----
# Test with minimum required arguments
result = await meta.call_fn_with_arg_validation(
⋮----
# Test with invalid types
⋮----
@pytest.mark.anyio
async def test_complex_function_runtime_arg_validation_with_json()
⋮----
"""Test that JSON string arguments are parsed and validated correctly"""
⋮----
"list_of_ints": "[1, 2, 3]",  # JSON string
"list_str_or_str": '["a", "b", "c"]',  # JSON string
⋮----
"an_int_annotated_with_field_and_others": "5",  # JSON string
⋮----
"my_model_a": "{}",  # JSON string
"my_model_a_forward_ref": "{}",  # JSON string
⋮----
def test_str_vs_list_str()
⋮----
"""Test handling of string vs list[str] type annotations.

    This is tricky as '"hello"' can be parsed as a JSON string or a Python string.
    We want to make sure it's kept as a python string.
    """
⋮----
def func_with_str_types(str_or_list: str | list[str])
⋮----
meta = func_metadata(func_with_str_types)
⋮----
# Test string input for union type
result = meta.pre_parse_json({"str_or_list": "hello"})
⋮----
# Test string input that contains valid JSON for union type
# We want to see here that the JSON-vali string is NOT parsed as JSON, but rather
# kept as a raw string
result = meta.pre_parse_json({"str_or_list": '"hello"'})
⋮----
# Test list input for union type
result = meta.pre_parse_json({"str_or_list": '["hello", "world"]'})
⋮----
def test_skip_names()
⋮----
"""Test that skipped parameters are not included in the model"""
⋮----
def func_with_many_params(keep_this: int, skip_this: str, also_keep: float, also_skip: bool)
⋮----
# Skip some parameters
meta = func_metadata(func_with_many_params, skip_names=["skip_this", "also_skip"])
⋮----
# Check model fields
⋮----
# Validate that we can call with only non-skipped parameters
model: BaseModel = meta.arg_model.model_validate({"keep_this": 1, "also_keep": 2.5})  # type: ignore
assert model.keep_this == 1  # type: ignore
assert model.also_keep == 2.5  # type: ignore
⋮----
def test_structured_output_dict_str_types()
⋮----
"""Test that dict[str, T] types are handled without wrapping."""
⋮----
# Test dict[str, Any]
def func_dict_any() -> dict[str, Any]
⋮----
meta = func_metadata(func_dict_any)
⋮----
# Test dict[str, str]
def func_dict_str() -> dict[str, str]
⋮----
meta = func_metadata(func_dict_str)
⋮----
# Test dict[str, list[int]]
def func_dict_list() -> dict[str, list[int]]
⋮----
meta = func_metadata(func_dict_list)
⋮----
# Test dict[int, str] - should be wrapped since key is not str
def func_dict_int_key() -> dict[int, str]
⋮----
meta = func_metadata(func_dict_int_key)
⋮----
@pytest.mark.anyio
async def test_lambda_function()
⋮----
"""Test lambda function schema and validation"""
fn = lambda x, y=5: x  # noqa: E731
meta = func_metadata(lambda x, y=5: x)
⋮----
# Test schema
⋮----
async def check_call(args)
⋮----
# Basic calls
⋮----
# Missing required arg
⋮----
def test_complex_function_json_schema()
⋮----
"""Test JSON schema generation for complex function arguments.

    Note: Different versions of pydantic output slightly different
    JSON Schema formats for model fields with defaults. The format changed in 2.9.0:

    1. Before 2.9.0:
       {
         "allOf": [{"$ref": "#/$defs/Model"}],
         "default": {}
       }

    2. Since 2.9.0:
       {
         "$ref": "#/$defs/Model",
         "default": {}
       }

    Both formats are valid and functionally equivalent. This test accepts either format
    to ensure compatibility across our supported pydantic versions.

    This change in format does not affect runtime behavior since:
    1. Both schemas validate the same way
    2. The actual model classes and validation logic are unchanged
    3. func_metadata uses model_validate/model_dump, not the schema directly
    """
⋮----
actual_schema = meta.arg_model.model_json_schema()
⋮----
# Create a copy of the actual schema to normalize
normalized_schema = actual_schema.copy()
⋮----
# Normalize the my_model_a_with_default field to handle both pydantic formats
⋮----
def test_str_vs_int()
⋮----
"""
    Test that string values are kept as strings even when they contain numbers,
    while numbers are parsed correctly.
    """
⋮----
def func_with_str_and_int(a: str, b: int)
⋮----
meta = func_metadata(func_with_str_and_int)
result = meta.pre_parse_json({"a": "123", "b": 123})
⋮----
# Tests for structured output functionality
⋮----
def test_structured_output_requires_return_annotation()
⋮----
"""Test that structured_output=True requires a return annotation"""
⋮----
def func_no_annotation()
⋮----
def func_none_annotation() -> None
⋮----
# None annotation should work
meta = func_metadata(func_none_annotation)
⋮----
def test_structured_output_basemodel()
⋮----
"""Test structured output with BaseModel return types"""
⋮----
class PersonModel(BaseModel)
⋮----
name: str
age: int
email: str | None = None
⋮----
def func_returning_person() -> PersonModel
⋮----
meta = func_metadata(func_returning_person)
⋮----
def test_structured_output_primitives()
⋮----
"""Test structured output with primitive return types"""
⋮----
def func_str() -> str
⋮----
def func_int() -> int
⋮----
def func_float() -> float
⋮----
def func_bool() -> bool
⋮----
def func_bytes() -> bytes
⋮----
# Test string
meta = func_metadata(func_str)
⋮----
# Test int
meta = func_metadata(func_int)
⋮----
# Test float
meta = func_metadata(func_float)
⋮----
# Test bool
meta = func_metadata(func_bool)
⋮----
# Test bytes
meta = func_metadata(func_bytes)
⋮----
def test_structured_output_generic_types()
⋮----
"""Test structured output with generic types (list, dict, Union, etc.)"""
⋮----
def func_list_str() -> list[str]
⋮----
def func_dict_str_int() -> dict[str, int]
⋮----
def func_union() -> str | int
⋮----
def func_optional() -> str | None
⋮----
# Test list
meta = func_metadata(func_list_str)
⋮----
# Test dict[str, int] - should NOT be wrapped
meta = func_metadata(func_dict_str_int)
⋮----
# Test Union
meta = func_metadata(func_union)
⋮----
# Test Optional
meta = func_metadata(func_optional)
⋮----
def test_structured_output_dataclass()
⋮----
"""Test structured output with dataclass return types"""
⋮----
@dataclass
    class PersonDataClass
⋮----
tags: list[str] | None = None
⋮----
def func_returning_dataclass() -> PersonDataClass
⋮----
meta = func_metadata(func_returning_dataclass)
⋮----
def test_structured_output_typeddict()
⋮----
"""Test structured output with TypedDict return types"""
⋮----
class PersonTypedDictOptional(TypedDict, total=False)
⋮----
def func_returning_typeddict_optional() -> PersonTypedDictOptional
⋮----
return {"name": "Dave"}  # Only returning one field to test partial dict
⋮----
meta = func_metadata(func_returning_typeddict_optional)
⋮----
# Test with total=True (all required)
class PersonTypedDictRequired(TypedDict)
⋮----
email: str | None
⋮----
def func_returning_typeddict_required() -> PersonTypedDictRequired
⋮----
return {"name": "Eve", "age": 40, "email": None}  # Testing None value
⋮----
meta = func_metadata(func_returning_typeddict_required)
⋮----
def test_structured_output_ordinary_class()
⋮----
"""Test structured output with ordinary annotated classes"""
⋮----
class PersonClass
⋮----
def __init__(self, name: str, age: int, email: str | None = None)
⋮----
def func_returning_class() -> PersonClass
⋮----
meta = func_metadata(func_returning_class)
⋮----
def test_unstructured_output_unannotated_class()
⋮----
# Test with class that has no annotations
class UnannotatedClass
⋮----
def __init__(self, x, y)
⋮----
def func_returning_unannotated() -> UnannotatedClass
⋮----
meta = func_metadata(func_returning_unannotated)
⋮----
def test_structured_output_with_field_descriptions()
⋮----
"""Test that Field descriptions are preserved in structured output"""
⋮----
class ModelWithDescriptions(BaseModel)
⋮----
name: Annotated[str, Field(description="The person's full name")]
age: Annotated[int, Field(description="Age in years", ge=0, le=150)]
⋮----
def func_with_descriptions() -> ModelWithDescriptions
⋮----
meta = func_metadata(func_with_descriptions)
⋮----
def test_structured_output_nested_models()
⋮----
"""Test structured output with nested models"""
⋮----
class Address(BaseModel)
⋮----
street: str
city: str
zipcode: str
⋮----
class PersonWithAddress(BaseModel)
⋮----
address: Address
⋮----
def func_nested() -> PersonWithAddress
⋮----
meta = func_metadata(func_nested)
⋮----
def test_structured_output_unserializable_type_error()
⋮----
"""Test error when structured_output=True is used with unserializable types"""
⋮----
# Test with a class that has non-serializable default values
class ConfigWithCallable
⋮----
# Callable defaults are not JSON serializable and will trigger Pydantic warnings
callback: Any = lambda x: x * 2
⋮----
def func_returning_config_with_callable() -> ConfigWithCallable
⋮----
# Should work without structured_output=True (returns None for output_schema)
meta = func_metadata(func_returning_config_with_callable)
⋮----
# Should raise error with structured_output=True
⋮----
# Also test with NamedTuple for good measure
class Point(NamedTuple)
⋮----
y: int
⋮----
def func_returning_namedtuple() -> Point
⋮----
meta = func_metadata(func_returning_namedtuple)
````

## File: tests/server/fastmcp/test_integration.py
````python
"""
Integration tests for FastMCP server functionality.

These tests validate the proper functioning of FastMCP in various configurations,
including with and without authentication.
"""
⋮----
@pytest.fixture
def server_port() -> int
⋮----
"""Get a free port for testing."""
⋮----
@pytest.fixture
def server_url(server_port: int) -> str
⋮----
"""Get the server URL for testing."""
⋮----
@pytest.fixture
def http_server_port() -> int
⋮----
"""Get a free port for testing the StreamableHTTP server."""
⋮----
@pytest.fixture
def http_server_url(http_server_port: int) -> str
⋮----
"""Get the StreamableHTTP server URL for testing."""
⋮----
@pytest.fixture
def stateless_http_server_port() -> int
⋮----
"""Get a free port for testing the stateless StreamableHTTP server."""
⋮----
@pytest.fixture
def stateless_http_server_url(stateless_http_server_port: int) -> str
⋮----
"""Get the stateless StreamableHTTP server URL for testing."""
⋮----
# Create a function to make the FastMCP server app
def make_fastmcp_app()
⋮----
"""Create a FastMCP server without auth settings."""
transport_security = TransportSecuritySettings(
mcp = FastMCP(name="NoAuthServer", transport_security=transport_security)
⋮----
# Add a simple tool
⋮----
@mcp.tool(description="A simple echo tool")
    def echo(message: str) -> str
⋮----
# Add a tool that uses elicitation
⋮----
@mcp.tool(description="A tool that uses elicitation")
    async def ask_user(prompt: str, ctx: Context) -> str
⋮----
class AnswerSchema(BaseModel)
⋮----
answer: str = Field(description="The user's answer to the question")
⋮----
result = await ctx.elicit(message=f"Tool wants to ask: {prompt}", schema=AnswerSchema)
⋮----
# Handle cancellation or decline
⋮----
# Create the SSE app
app = mcp.sse_app()
⋮----
def make_everything_fastmcp() -> FastMCP
⋮----
"""Create a FastMCP server with all features enabled for testing."""
⋮----
mcp = FastMCP(name="EverythingServer", transport_security=transport_security)
⋮----
# Tool with context for logging and progress
⋮----
@mcp.tool(description="A tool that demonstrates logging and progress", title="Progress Tool")
    async def tool_with_progress(message: str, ctx: Context, steps: int = 3) -> str
⋮----
# Send progress notifications
⋮----
progress_value = (i + 1) / steps
⋮----
# Simple tool for basic functionality
⋮----
@mcp.tool(description="A simple echo tool", title="Echo Tool")
    def echo(message: str) -> str
⋮----
# Tool that returns ResourceLinks
⋮----
@mcp.tool(description="Lists files and returns resource links", title="List Files Tool")
    def list_files() -> list[ResourceLink]
⋮----
"""Returns a list of resource links for files matching the pattern."""
⋮----
# Mock some file resources for testing
file_resources = [
⋮----
result: list[ResourceLink] = [ResourceLink.model_validate(file_json) for file_json in file_resources]
⋮----
# Tool with sampling capability
⋮----
@mcp.tool(description="A tool that uses sampling to generate content", title="Sampling Tool")
    async def sampling_tool(prompt: str, ctx: Context) -> str
⋮----
# Request sampling from the client
result = await ctx.session.create_message(
⋮----
# Handle different content types
⋮----
# Tool that sends notifications and logging
⋮----
@mcp.tool(description="A tool that demonstrates notifications and logging", title="Notification Tool")
    async def notification_tool(message: str, ctx: Context) -> str
⋮----
# Send different log levels
⋮----
# Send resource change notifications
⋮----
# Resource - static
def get_static_info() -> str
⋮----
static_resource = FunctionResource(
⋮----
# Resource - dynamic function
⋮----
@mcp.resource("resource://dynamic/{category}", title="Dynamic Resource")
    def dynamic_resource(category: str) -> str
⋮----
# Resource template
⋮----
@mcp.resource("resource://template/{id}/data", title="Template Resource")
    def template_resource(id: str) -> str
⋮----
# Prompt - simple
⋮----
@mcp.prompt(description="A simple prompt", title="Simple Prompt")
    def simple_prompt(topic: str) -> str
⋮----
# Prompt - complex with multiple messages
⋮----
@mcp.prompt(description="Complex prompt with context", title="Complex Prompt")
    def complex_prompt(user_query: str, context: str = "general") -> str
⋮----
# For simplicity, return a single string that incorporates the context
# Since FastMCP doesn't support system messages in the same way
⋮----
# Resource template with completion support
⋮----
@mcp.resource("github://repos/{owner}/{repo}", title="GitHub Repository")
    def github_repo_resource(owner: str, repo: str) -> str
⋮----
# Add completion handler for the server
⋮----
# Handle GitHub repository completion
⋮----
# Return repos for modelcontextprotocol org
⋮----
# Return repos for test-org
⋮----
# Handle prompt completions
⋮----
# Complete context values
contexts = ["general", "technical", "business", "academic"]
⋮----
# Default: no completion available
⋮----
# Tool that echoes request headers from context
⋮----
@mcp.tool(description="Echo request headers from context", title="Echo Headers")
    def echo_headers(ctx: Context[Any, Any, Request]) -> str
⋮----
"""Returns the request headers as JSON."""
headers_info = {}
⋮----
# Now the type system knows request is a Starlette Request object
headers_info = dict(ctx.request_context.request.headers)
⋮----
# Tool that returns full request context
⋮----
@mcp.tool(description="Echo request context with custom data", title="Echo Context")
    def echo_context(custom_request_id: str, ctx: Context[Any, Any, Request]) -> str
⋮----
"""Returns request context including headers and custom data."""
context_data = {
⋮----
request = ctx.request_context.request
⋮----
# Restaurant booking tool with elicitation
⋮----
"""Book a table - uses elicitation if requested date is unavailable."""
⋮----
class AlternativeDateSchema(BaseModel)
⋮----
checkAlternative: bool = Field(description="Would you like to try another date?")
alternativeDate: str = Field(
⋮----
# For testing: assume dates starting with "2024-12-25" are unavailable
⋮----
# Use elicitation to ask about alternatives
result = await ctx.elicit(
⋮----
alt_date = result.data.alternativeDate
⋮----
# Handle case where action is "accept" but data is None
⋮----
# Available - book directly
⋮----
def make_everything_fastmcp_app()
⋮----
"""Create a comprehensive FastMCP server with SSE transport."""
mcp = make_everything_fastmcp()
⋮----
def make_fastmcp_streamable_http_app()
⋮----
"""Create a FastMCP server with StreamableHTTP transport."""
⋮----
# Create the StreamableHTTP app
app: Starlette = mcp.streamable_http_app()
⋮----
def make_everything_fastmcp_streamable_http_app()
⋮----
"""Create a comprehensive FastMCP server with StreamableHTTP transport."""
# Create a new instance with different name for HTTP transport
⋮----
# We can't change the name after creation, so we'll use the same name
⋮----
def make_fastmcp_stateless_http_app()
⋮----
"""Create a FastMCP server with stateless StreamableHTTP transport."""
⋮----
mcp = FastMCP(name="StatelessServer", stateless_http=True, transport_security=transport_security)
⋮----
def run_server(server_port: int) -> None
⋮----
"""Run the server."""
⋮----
server = uvicorn.Server(config=uvicorn.Config(app=app, host="127.0.0.1", port=server_port, log_level="error"))
⋮----
def run_everything_legacy_sse_http_server(server_port: int) -> None
⋮----
"""Run the comprehensive server with all features."""
⋮----
def run_streamable_http_server(server_port: int) -> None
⋮----
"""Run the StreamableHTTP server."""
⋮----
def run_everything_server(server_port: int) -> None
⋮----
"""Run the comprehensive StreamableHTTP server with all features."""
⋮----
def run_stateless_http_server(server_port: int) -> None
⋮----
"""Run the stateless StreamableHTTP server."""
⋮----
@pytest.fixture()
def server(server_port: int) -> Generator[None, None, None]
⋮----
"""Start the server in a separate process and clean up after the test."""
proc = multiprocessing.Process(target=run_server, args=(server_port,), daemon=True)
⋮----
# Wait for server to be running
max_attempts = 20
attempt = 0
⋮----
@pytest.fixture()
def streamable_http_server(http_server_port: int) -> Generator[None, None, None]
⋮----
"""Start the StreamableHTTP server in a separate process."""
proc = multiprocessing.Process(target=run_streamable_http_server, args=(http_server_port,), daemon=True)
⋮----
"""Start the stateless StreamableHTTP server in a separate process."""
proc = multiprocessing.Process(
⋮----
@pytest.mark.anyio
async def test_fastmcp_without_auth(server: None, server_url: str) -> None
⋮----
"""Test that FastMCP works when auth settings are not provided."""
# Connect to the server
⋮----
# Test initialization
result = await session.initialize()
⋮----
# Test that we can call tools without authentication
tool_result = await session.call_tool("echo", {"message": "hello"})
⋮----
@pytest.mark.anyio
async def test_fastmcp_streamable_http(streamable_http_server: None, http_server_url: str) -> None
⋮----
"""Test that FastMCP works with StreamableHTTP transport."""
# Connect to the server using StreamableHTTP
⋮----
# Create a session using the client streams
⋮----
@pytest.mark.anyio
async def test_fastmcp_stateless_streamable_http(stateless_http_server: None, stateless_http_server_url: str) -> None
⋮----
"""Test that FastMCP works with stateless StreamableHTTP transport."""
⋮----
tool_result = await session.call_tool("echo", {"message": f"test_{i}"})
⋮----
@pytest.fixture
def everything_server_port() -> int
⋮----
"""Get a free port for testing the comprehensive server."""
⋮----
@pytest.fixture
def everything_server_url(everything_server_port: int) -> str
⋮----
"""Get the comprehensive server URL for testing."""
⋮----
@pytest.fixture
def everything_http_server_port() -> int
⋮----
"""Get a free port for testing the comprehensive StreamableHTTP server."""
⋮----
@pytest.fixture
def everything_http_server_url(everything_http_server_port: int) -> str
⋮----
"""Get the comprehensive StreamableHTTP server URL for testing."""
⋮----
@pytest.fixture()
def everything_server(everything_server_port: int) -> Generator[None, None, None]
⋮----
"""Start the comprehensive server in a separate process and clean up after."""
⋮----
"""Start the comprehensive StreamableHTTP server in a separate process."""
⋮----
class NotificationCollector
⋮----
def __init__(self)
⋮----
async def handle_progress(self, params) -> None
⋮----
async def handle_log(self, params) -> None
⋮----
async def handle_resource_list_changed(self, params) -> None
⋮----
async def handle_tool_list_changed(self, params) -> None
⋮----
async def handle_generic_notification(self, message) -> None
⋮----
# Check if this is a ServerNotification
⋮----
# Check the specific notification type
⋮----
async def create_test_elicitation_callback(context, params)
⋮----
"""Shared elicitation callback for tests.

    Handles elicitation requests for restaurant booking tests.
    """
# For restaurant booking test
⋮----
# Default response
⋮----
async def call_all_mcp_features(session: ClientSession, collector: NotificationCollector) -> None
⋮----
"""
    Test all MCP features using the provided session.

    Args:
        session: The MCP client session to test with
        collector: Notification collector for capturing server notifications
    """
# Test initialization
⋮----
# Check server features are reported
⋮----
# Note: logging capability may be None if no tools use context logging
⋮----
# Test tools
# 1. Simple echo tool
⋮----
# 2. Test tool that returns ResourceLinks
list_files_result = await session.call_tool("list_files")
⋮----
# Rest should be ResourceLinks
content = list_files_result.content[0]
⋮----
# Test progress callback functionality
progress_updates = []
⋮----
async def progress_callback(progress: float, total: float | None, message: str | None) -> None
⋮----
"""Collect progress updates for testing (async version)."""
⋮----
test_message = "test"
steps = 3
params = {
tool_result = await session.call_tool(
⋮----
# Verify progress callback was called
⋮----
expected_progress = (i + 1) / steps
⋮----
# Verify we received log messages from the tool
# Note: Progress notifications require special handling in the MCP client
# that's not implemented by default, so we focus on testing logging
⋮----
# 3. Test sampling tool
prompt = "What is the meaning of life?"
sampling_result = await session.call_tool("sampling_tool", {"prompt": prompt})
⋮----
# Verify we received log messages from the sampling tool
⋮----
# 4. Test notification tool
notification_message = "test_notifications"
notification_result = await session.call_tool("notification_tool", {"message": notification_message})
⋮----
# Verify we received various notification types
assert len(collector.log_messages) > 3  # Should have logs from both tools
⋮----
# Check that we got different log levels
log_levels = [msg.level for msg in collector.log_messages]
⋮----
# 5. Test elicitation tool
# Test restaurant booking with unavailable date (triggers elicitation)
booking_result = await session.call_tool(
⋮----
"date": "2024-12-25",  # Unavailable date to trigger elicitation
⋮----
# Should have booked the alternative date from elicitation callback
⋮----
# Test resources
# 1. Static resource
resources = await session.list_resources()
# Try using string comparison since AnyUrl might not match directly
static_resource = next(
⋮----
static_content = await session.read_resource(AnyUrl("resource://static/info"))
⋮----
# 2. Dynamic resource
resource_category = "test"
dynamic_content = await session.read_resource(AnyUrl(f"resource://dynamic/{resource_category}"))
⋮----
# 3. Template resource
resource_id = "456"
template_content = await session.read_resource(AnyUrl(f"resource://template/{resource_id}/data"))
⋮----
# Test prompts
# 1. Simple prompt
prompts = await session.list_prompts()
simple_prompt = next((p for p in prompts.prompts if p.name == "simple_prompt"), None)
⋮----
prompt_topic = "AI"
prompt_result = await session.get_prompt("simple_prompt", {"topic": prompt_topic})
⋮----
# The actual message structure depends on the prompt implementation
⋮----
# 2. Complex prompt
complex_prompt = next((p for p in prompts.prompts if p.name == "complex_prompt"), None)
⋮----
query = "What is AI?"
context = "technical"
complex_result = await session.get_prompt("complex_prompt", {"user_query": query, "context": context})
⋮----
# Test request context propagation (only works when headers are available)
⋮----
headers_result = await session.call_tool("echo_headers", {})
⋮----
# If we got headers, verify they exist
headers_data = json.loads(headers_result.content[0].text)
# The headers depend on the transport and test setup
⋮----
# Test 6: Call tool that returns full context
context_result = await session.call_tool("echo_context", {"custom_request_id": "test-123"})
⋮----
context_data = json.loads(context_result.content[0].text)
⋮----
# The method should be POST for most transports
⋮----
# Test completion functionality
# 1. Test resource template completion with context
repo_result = await session.complete(
⋮----
# 2. Test with different context
repo_result2 = await session.complete(
⋮----
# 3. Test prompt argument completion
context_result = await session.complete(
⋮----
# 4. Test completion without context (should return empty)
no_context_result = await session.complete(
⋮----
# Simulate LLM response based on the input
⋮----
input_text = params.messages[0].content.text
⋮----
input_text = "No input"
response_text = f"This is a simulated LLM response to: {input_text}"
⋮----
model_name = "test-llm-model"
⋮----
@pytest.mark.anyio
async def test_fastmcp_all_features_sse(everything_server: None, everything_server_url: str) -> None
⋮----
"""Test all MCP features work correctly with SSE transport."""
⋮----
# Create notification collector
collector = NotificationCollector()
⋮----
# Connect to the server with callbacks
⋮----
# Set up message handler to capture notifications
async def message_handler(message)
⋮----
# Run the common test suite
⋮----
"""Test all MCP features work correctly with StreamableHTTP transport."""
⋮----
# Run the common test suite with HTTP-specific test suffix
⋮----
@pytest.mark.anyio
async def test_elicitation_feature(server: None, server_url: str) -> None
⋮----
"""Test the elicitation feature."""
⋮----
# Create a custom handler for elicitation requests
async def elicitation_callback(context, params)
⋮----
# Verify the elicitation parameters
⋮----
# Connect to the server with our custom elicitation handler
⋮----
# First initialize the session
⋮----
# Call the tool that uses elicitation
tool_result = await session.call_tool("ask_user", {"prompt": "What is your name?"})
# Verify the result
⋮----
# # The test should only succeed with the successful elicitation response
⋮----
@pytest.mark.anyio
async def test_title_precedence(everything_server: None, everything_server_url: str) -> None
⋮----
"""Test that titles are properly returned for tools, resources, and prompts."""
⋮----
# Initialize the session
⋮----
# Test tools have titles
tools_result = await session.list_tools()
⋮----
# Check specific tools have titles
tool_names_to_titles = {
⋮----
# Test get_display_name utility
⋮----
# Test resources have titles
resources_result = await session.list_resources()
⋮----
# Check specific resources have titles
static_resource = next((r for r in resources_result.resources if r.name == "Static Info"), None)
⋮----
# Test resource templates have titles
resource_templates = await session.list_resource_templates()
⋮----
# Check specific resource templates have titles
template_uris_to_titles = {
⋮----
# Test prompts have titles
prompts_result = await session.list_prompts()
⋮----
# Check specific prompts have titles
prompt_names_to_titles = {
````

## File: tests/server/fastmcp/test_parameter_descriptions.py
````python
"""Test that parameter descriptions are properly exposed through list_tools"""
⋮----
@pytest.mark.anyio
async def test_parameter_descriptions()
⋮----
mcp = FastMCP("Test Server")
⋮----
"""A greeting tool"""
⋮----
tools = await mcp.list_tools()
⋮----
tool = tools[0]
⋮----
# Check that parameter descriptions are present in the schema
properties = tool.inputSchema["properties"]
````

## File: tests/server/fastmcp/test_server.py
````python
class TestServer
⋮----
@pytest.mark.anyio
    async def test_create_server(self)
⋮----
mcp = FastMCP(instructions="Server instructions")
⋮----
@pytest.mark.anyio
    async def test_normalize_path(self)
⋮----
"""Test path normalization for mount paths."""
mcp = FastMCP()
⋮----
# Test root path
⋮----
# Test path with trailing slash
⋮----
# Test path without trailing slash
⋮----
# Test endpoint without leading slash
⋮----
# Test both with trailing/leading slashes
⋮----
@pytest.mark.anyio
    async def test_sse_app_with_mount_path(self)
⋮----
"""Test SSE app creation with different mount paths."""
# Test with default mount path
⋮----
# Verify _normalize_path was called with correct args
⋮----
# Test with custom mount path in settings
⋮----
# Test with mount_path parameter
⋮----
@pytest.mark.anyio
    async def test_starlette_routes_with_mount_path(self)
⋮----
"""Test that Starlette routes are correctly configured with mount path."""
# Test with mount path in settings
⋮----
app = mcp.sse_app()
⋮----
# Find routes by type
sse_routes = [r for r in app.routes if isinstance(r, Route)]
mount_routes = [r for r in app.routes if isinstance(r, Mount)]
⋮----
# Verify routes exist
⋮----
# Verify path values
⋮----
# Test with mount path as parameter
⋮----
app = mcp.sse_app(mount_path="/param")
⋮----
@pytest.mark.anyio
    async def test_non_ascii_description(self)
⋮----
"""Test that FastMCP handles non-ASCII characters in descriptions correctly"""
⋮----
@mcp.tool(description=("🌟 This tool uses emojis and UTF-8 characters: á é í ó ú ñ 漢字 🎉"))
        def hello_world(name: str = "世界") -> str
⋮----
tools = await client.list_tools()
⋮----
tool = tools.tools[0]
⋮----
result = await client.call_tool("hello_world", {})
⋮----
content = result.content[0]
⋮----
@pytest.mark.anyio
    async def test_add_tool_decorator(self)
⋮----
@mcp.tool()
        def add(x: int, y: int) -> int
⋮----
@pytest.mark.anyio
    async def test_add_tool_decorator_incorrect_usage(self)
⋮----
@mcp.tool  # Missing parentheses #type: ignore
@mcp.tool  # Missing parentheses #type: ignore
            def add(x: int, y: int) -> int
⋮----
@pytest.mark.anyio
    async def test_add_resource_decorator(self)
⋮----
@mcp.resource("r://{x}")
        def get_data(x: str) -> str
⋮----
@pytest.mark.anyio
    async def test_add_resource_decorator_incorrect_usage(self)
⋮----
@mcp.resource  # Missing parentheses #type: ignore
@mcp.resource  # Missing parentheses #type: ignore
            def get_data(x: str) -> str
⋮----
def tool_fn(x: int, y: int) -> int
⋮----
def error_tool_fn() -> None
⋮----
def image_tool_fn(path: str) -> Image
⋮----
def mixed_content_tool_fn() -> list[ContentBlock]
⋮----
class TestServerTools
⋮----
@pytest.mark.anyio
    async def test_add_tool(self)
⋮----
@pytest.mark.anyio
    async def test_list_tools(self)
⋮----
@pytest.mark.anyio
    async def test_call_tool(self)
⋮----
result = await client.call_tool("my_tool", {"arg1": "value"})
⋮----
@pytest.mark.anyio
    async def test_tool_exception_handling(self)
⋮----
result = await client.call_tool("error_tool_fn", {})
⋮----
@pytest.mark.anyio
    async def test_tool_error_handling(self)
⋮----
@pytest.mark.anyio
    async def test_tool_error_details(self)
⋮----
"""Test that exception details are properly formatted in the response"""
⋮----
@pytest.mark.anyio
    async def test_tool_return_value_conversion(self)
⋮----
result = await client.call_tool("tool_fn", {"x": 1, "y": 2})
⋮----
# Check structured content - int return type should have structured output
⋮----
@pytest.mark.anyio
    async def test_tool_image_helper(self, tmp_path: Path)
⋮----
# Create a test image
image_path = tmp_path / "test.png"
⋮----
result = await client.call_tool("image_tool_fn", {"path": str(image_path)})
⋮----
# Verify base64 encoding
decoded = base64.b64decode(content.data)
⋮----
# Check structured content - Image return type should NOT have structured output
⋮----
@pytest.mark.anyio
    async def test_tool_mixed_content(self)
⋮----
result = await client.call_tool("mixed_content_tool_fn", {})
⋮----
structured_result = result.structuredContent["result"]
⋮----
expected_content = [
⋮----
@pytest.mark.anyio
    async def test_tool_mixed_list_with_image(self, tmp_path: Path)
⋮----
"""Test that lists containing Image objects and other types are handled
        correctly"""
⋮----
def mixed_list_fn() -> list
⋮----
result = await client.call_tool("mixed_list_fn", {})
⋮----
# Check text conversion
content1 = result.content[0]
⋮----
# Check image conversion
content2 = result.content[1]
⋮----
# Check dict conversion
content3 = result.content[2]
⋮----
# Check direct TextContent
content4 = result.content[3]
⋮----
# Check structured content - untyped list with Image objects should NOT have structured output
⋮----
@pytest.mark.anyio
    async def test_tool_structured_output_basemodel(self)
⋮----
"""Test tool with structured output returning BaseModel"""
⋮----
class UserOutput(BaseModel)
⋮----
name: str
age: int
active: bool = True
⋮----
def get_user(user_id: int) -> UserOutput
⋮----
"""Get user by ID"""
⋮----
# Check that the tool has outputSchema
⋮----
tool = next(t for t in tools.tools if t.name == "get_user")
⋮----
# Call the tool and check structured output
result = await client.call_tool("get_user", {"user_id": 123})
⋮----
# Content should be JSON serialized version
⋮----
@pytest.mark.anyio
    async def test_tool_structured_output_primitive(self)
⋮----
"""Test tool with structured output returning primitive type"""
⋮----
def calculate_sum(a: int, b: int) -> int
⋮----
"""Add two numbers"""
⋮----
tool = next(t for t in tools.tools if t.name == "calculate_sum")
⋮----
# Primitive types are wrapped
⋮----
# Call the tool
result = await client.call_tool("calculate_sum", {"a": 5, "b": 7})
⋮----
@pytest.mark.anyio
    async def test_tool_structured_output_list(self)
⋮----
"""Test tool with structured output returning list"""
⋮----
def get_numbers() -> list[int]
⋮----
"""Get a list of numbers"""
⋮----
result = await client.call_tool("get_numbers", {})
⋮----
@pytest.mark.anyio
    async def test_tool_structured_output_server_side_validation_error(self)
⋮----
"""Test that server-side validation errors are handled properly"""
⋮----
return [1, 2, 3, 4, [5]]  # type: ignore
⋮----
@pytest.mark.anyio
    async def test_tool_structured_output_dict_str_any(self)
⋮----
"""Test tool with dict[str, Any] structured output"""
⋮----
def get_metadata() -> dict[str, Any]
⋮----
"""Get metadata dictionary"""
⋮----
# Check schema
⋮----
tool = next(t for t in tools.tools if t.name == "get_metadata")
⋮----
# dict[str, Any] should have minimal schema
⋮----
# Call tool
result = await client.call_tool("get_metadata", {})
⋮----
expected = {
⋮----
@pytest.mark.anyio
    async def test_tool_structured_output_dict_str_typed(self)
⋮----
"""Test tool with dict[str, T] structured output for specific T"""
⋮----
def get_settings() -> dict[str, str]
⋮----
"""Get settings as string dictionary"""
⋮----
tool = next(t for t in tools.tools if t.name == "get_settings")
⋮----
result = await client.call_tool("get_settings", {})
⋮----
class TestServerResources
⋮----
@pytest.mark.anyio
    async def test_text_resource(self)
⋮----
def get_text()
⋮----
resource = FunctionResource(uri=AnyUrl("resource://test"), name="test", fn=get_text)
⋮----
result = await client.read_resource(AnyUrl("resource://test"))
⋮----
@pytest.mark.anyio
    async def test_binary_resource(self)
⋮----
def get_binary()
⋮----
resource = FunctionResource(
⋮----
result = await client.read_resource(AnyUrl("resource://binary"))
⋮----
@pytest.mark.anyio
    async def test_file_resource_text(self, tmp_path: Path)
⋮----
# Create a text file
text_file = tmp_path / "test.txt"
⋮----
resource = FileResource(uri=AnyUrl("file://test.txt"), name="test.txt", path=text_file)
⋮----
result = await client.read_resource(AnyUrl("file://test.txt"))
⋮----
@pytest.mark.anyio
    async def test_file_resource_binary(self, tmp_path: Path)
⋮----
# Create a binary file
binary_file = tmp_path / "test.bin"
⋮----
resource = FileResource(
⋮----
result = await client.read_resource(AnyUrl("file://test.bin"))
⋮----
@pytest.mark.anyio
    async def test_function_resource(self)
⋮----
@mcp.resource("function://test", name="test_get_data")
        def get_data() -> str
⋮----
"""get_data returns a string"""
⋮----
resources = await client.list_resources()
⋮----
resource = resources.resources[0]
⋮----
class TestServerResourceTemplates
⋮----
@pytest.mark.anyio
    async def test_resource_with_params(self)
⋮----
"""Test that a resource with function parameters raises an error if the URI
        parameters don't match"""
⋮----
@mcp.resource("resource://data")
            def get_data_fn(param: str) -> str
⋮----
@pytest.mark.anyio
    async def test_resource_with_uri_params(self)
⋮----
"""Test that a resource with URI parameters is automatically a template"""
⋮----
@mcp.resource("resource://{param}")
            def get_data() -> str
⋮----
@pytest.mark.anyio
    async def test_resource_with_untyped_params(self)
⋮----
"""Test that a resource with untyped parameters raises an error"""
⋮----
@mcp.resource("resource://{param}")
        def get_data(param) -> str
⋮----
@pytest.mark.anyio
    async def test_resource_matching_params(self)
⋮----
"""Test that a resource with matching URI and function parameters works"""
⋮----
@mcp.resource("resource://{name}/data")
        def get_data(name: str) -> str
⋮----
result = await client.read_resource(AnyUrl("resource://test/data"))
⋮----
@pytest.mark.anyio
    async def test_resource_mismatched_params(self)
⋮----
"""Test that mismatched parameters raise an error"""
⋮----
@mcp.resource("resource://{name}/data")
            def get_data(user: str) -> str
⋮----
@pytest.mark.anyio
    async def test_resource_multiple_params(self)
⋮----
"""Test that multiple parameters work correctly"""
⋮----
@mcp.resource("resource://{org}/{repo}/data")
        def get_data(org: str, repo: str) -> str
⋮----
result = await client.read_resource(AnyUrl("resource://cursor/fastmcp/data"))
⋮----
@pytest.mark.anyio
    async def test_resource_multiple_mismatched_params(self)
⋮----
@mcp.resource("resource://{org}/{repo}/data")
            def get_data_mismatched(org: str, repo_2: str) -> str
⋮----
"""Test that a resource with no parameters works as a regular resource"""
⋮----
@mcp.resource("resource://static")
        def get_static_data() -> str
⋮----
result = await client.read_resource(AnyUrl("resource://static"))
⋮----
@pytest.mark.anyio
    async def test_template_to_resource_conversion(self)
⋮----
"""Test that templates are properly converted to resources when accessed"""
⋮----
# Should be registered as a template
⋮----
# When accessed, should create a concrete resource
resource = await mcp._resource_manager.get_resource("resource://test/data")
⋮----
result = await resource.read()
⋮----
class TestContextInjection
⋮----
"""Test context injection in tools."""
⋮----
@pytest.mark.anyio
    async def test_context_detection(self)
⋮----
"""Test that context parameters are properly detected."""
⋮----
def tool_with_context(x: int, ctx: Context) -> str
⋮----
tool = mcp._tool_manager.add_tool(tool_with_context)
⋮----
@pytest.mark.anyio
    async def test_context_injection(self)
⋮----
"""Test that context is properly injected into tool calls."""
⋮----
result = await client.call_tool("tool_with_context", {"x": 42})
⋮----
@pytest.mark.anyio
    async def test_async_context(self)
⋮----
"""Test that context works in async functions."""
⋮----
async def async_tool(x: int, ctx: Context) -> str
⋮----
result = await client.call_tool("async_tool", {"x": 42})
⋮----
@pytest.mark.anyio
    async def test_context_logging(self)
⋮----
"""Test that context logging methods work."""
⋮----
async def logging_tool(msg: str, ctx: Context) -> str
⋮----
result = await client.call_tool("logging_tool", {"msg": "test"})
⋮----
@pytest.mark.anyio
    async def test_optional_context(self)
⋮----
"""Test that context is optional."""
⋮----
def no_context(x: int) -> int
⋮----
result = await client.call_tool("no_context", {"x": 21})
⋮----
@pytest.mark.anyio
    async def test_context_resource_access(self)
⋮----
"""Test that context can access resources."""
⋮----
@mcp.resource("test://data")
        def test_resource() -> str
⋮----
@mcp.tool()
        async def tool_with_resource(ctx: Context) -> str
⋮----
r_iter = await ctx.read_resource("test://data")
r_list = list(r_iter)
⋮----
r = r_list[0]
⋮----
result = await client.call_tool("tool_with_resource", {})
⋮----
class TestServerPrompts
⋮----
"""Test prompt functionality in FastMCP server."""
⋮----
@pytest.mark.anyio
    async def test_prompt_decorator(self)
⋮----
"""Test that the prompt decorator registers prompts correctly."""
⋮----
@mcp.prompt()
        def fn() -> str
⋮----
prompts = mcp._prompt_manager.list_prompts()
⋮----
# Don't compare functions directly since validate_call wraps them
content = await prompts[0].render()
⋮----
@pytest.mark.anyio
    async def test_prompt_decorator_with_name(self)
⋮----
"""Test prompt decorator with custom name."""
⋮----
@mcp.prompt(name="custom_name")
        def fn() -> str
⋮----
@pytest.mark.anyio
    async def test_prompt_decorator_with_description(self)
⋮----
"""Test prompt decorator with custom description."""
⋮----
@mcp.prompt(description="A custom description")
        def fn() -> str
⋮----
def test_prompt_decorator_error(self)
⋮----
"""Test error when decorator is used incorrectly."""
⋮----
@mcp.prompt  # type: ignore
@mcp.prompt  # type: ignore
            def fn() -> str
⋮----
@pytest.mark.anyio
    async def test_list_prompts(self)
⋮----
"""Test listing prompts through MCP protocol."""
⋮----
@mcp.prompt()
        def fn(name: str, optional: str = "default") -> str
⋮----
result = await client.list_prompts()
⋮----
prompt = result.prompts[0]
⋮----
@pytest.mark.anyio
    async def test_get_prompt(self)
⋮----
"""Test getting a prompt through MCP protocol."""
⋮----
@mcp.prompt()
        def fn(name: str) -> str
⋮----
result = await client.get_prompt("fn", {"name": "World"})
⋮----
message = result.messages[0]
⋮----
content = message.content
⋮----
@pytest.mark.anyio
    async def test_get_prompt_with_resource(self)
⋮----
"""Test getting a prompt that returns resource content."""
⋮----
@mcp.prompt()
        def fn() -> Message
⋮----
result = await client.get_prompt("fn")
⋮----
resource = content.resource
⋮----
@pytest.mark.anyio
    async def test_get_unknown_prompt(self)
⋮----
"""Test error when getting unknown prompt."""
⋮----
@pytest.mark.anyio
    async def test_get_prompt_missing_args(self)
⋮----
"""Test error when required arguments are missing."""
⋮----
@mcp.prompt()
        def prompt_fn(name: str) -> str
````

## File: tests/server/fastmcp/test_title.py
````python
"""Integration tests for title field functionality."""
⋮----
@pytest.mark.anyio
async def test_tool_title_precedence()
⋮----
"""Test that tool title precedence works correctly: title > annotations.title > name."""
# Create server with various tool configurations
mcp = FastMCP(name="TitleTestServer")
⋮----
# Tool with only name
⋮----
@mcp.tool(description="Basic tool")
    def basic_tool(message: str) -> str
⋮----
# Tool with title
⋮----
@mcp.tool(description="Tool with title", title="User-Friendly Tool")
    def tool_with_title(message: str) -> str
⋮----
# Tool with annotations.title (when title is not supported on decorator)
# We'll need to add this manually after registration
⋮----
@mcp.tool(description="Tool with annotations")
    def tool_with_annotations(message: str) -> str
⋮----
# Tool with both title and annotations.title
⋮----
@mcp.tool(description="Tool with both", title="Primary Title")
    def tool_with_both(message: str) -> str
⋮----
# Start server and connect client
⋮----
# List tools
tools_result = await client.list_tools()
tools = {tool.name: tool for tool in tools_result.tools}
⋮----
# Verify basic tool uses name
⋮----
basic = tools["basic_tool"]
# Since we haven't implemented get_display_name yet, we'll check the raw fields
⋮----
# Verify tool with title
⋮----
titled = tools["tool_with_title"]
⋮----
# For now, we'll skip the annotations.title test as it requires modifying
# the tool after registration, which we'll implement later
⋮----
# Verify tool with both uses title over annotations.title
⋮----
both = tools["tool_with_both"]
⋮----
@pytest.mark.anyio
async def test_prompt_title()
⋮----
"""Test that prompt titles work correctly."""
mcp = FastMCP(name="PromptTitleServer")
⋮----
# Prompt with only name
⋮----
@mcp.prompt(description="Basic prompt")
    def basic_prompt(topic: str) -> str
⋮----
# Prompt with title
⋮----
@mcp.prompt(description="Titled prompt", title="Ask About Topic")
    def titled_prompt(topic: str) -> str
⋮----
# List prompts
prompts_result = await client.list_prompts()
prompts = {prompt.name: prompt for prompt in prompts_result.prompts}
⋮----
# Verify basic prompt uses name
⋮----
basic = prompts["basic_prompt"]
⋮----
# Verify prompt with title
⋮----
titled = prompts["titled_prompt"]
⋮----
@pytest.mark.anyio
async def test_resource_title()
⋮----
"""Test that resource titles work correctly."""
mcp = FastMCP(name="ResourceTitleServer")
⋮----
# Static resource without title
def get_basic_data() -> str
⋮----
basic_resource = FunctionResource(
⋮----
# Static resource with title
def get_titled_data() -> str
⋮----
titled_resource = FunctionResource(
⋮----
# Dynamic resource without title
⋮----
@mcp.resource("resource://dynamic/{id}")
    def dynamic_resource(id: str) -> str
⋮----
# Dynamic resource with title (when supported)
⋮----
@mcp.resource("resource://titled-dynamic/{id}", title="Dynamic Data")
    def titled_dynamic_resource(id: str) -> str
⋮----
# List resources
resources_result = await client.list_resources()
resources = {str(res.uri): res for res in resources_result.resources}
⋮----
# Verify basic resource uses name
⋮----
basic = resources["resource://basic"]
⋮----
# Verify resource with title
⋮----
titled = resources["resource://titled"]
⋮----
# List resource templates
templates_result = await client.list_resource_templates()
templates = {tpl.uriTemplate: tpl for tpl in templates_result.resourceTemplates}
⋮----
# Verify dynamic resource template
⋮----
dynamic = templates["resource://dynamic/{id}"]
⋮----
# Verify titled dynamic resource template (when supported)
⋮----
titled_dynamic = templates["resource://titled-dynamic/{id}"]
⋮----
@pytest.mark.anyio
async def test_get_display_name_utility()
⋮----
"""Test the get_display_name utility function."""
⋮----
# Test tool precedence: title > annotations.title > name
tool_name_only = Tool(name="test_tool", inputSchema={})
⋮----
tool_with_title = Tool(name="test_tool", title="Test Tool", inputSchema={})
⋮----
tool_with_annotations = Tool(name="test_tool", inputSchema={}, annotations=ToolAnnotations(title="Annotated Tool"))
⋮----
tool_with_both = Tool(
⋮----
# Test other types: title > name
resource = Resource(uri=AnyUrl("file://test"), name="test_res")
⋮----
resource_with_title = Resource(uri=AnyUrl("file://test"), name="test_res", title="Test Resource")
⋮----
prompt = Prompt(name="test_prompt")
⋮----
prompt_with_title = Prompt(name="test_prompt", title="Test Prompt")
⋮----
template = ResourceTemplate(uriTemplate="file://{id}", name="test_template")
⋮----
template_with_title = ResourceTemplate(uriTemplate="file://{id}", name="test_template", title="Test Template")
````

## File: tests/server/fastmcp/test_tool_manager.py
````python
class TestAddTools
⋮----
def test_basic_function(self)
⋮----
"""Test registering and running a basic function."""
⋮----
def add(a: int, b: int) -> int
⋮----
"""Add two numbers."""
⋮----
manager = ToolManager()
⋮----
tool = manager.get_tool("add")
⋮----
def test_init_with_tools(self, caplog)
⋮----
class AddArguments(ArgModelBase)
⋮----
a: int
b: int
⋮----
fn_metadata = FuncMetadata(arg_model=AddArguments)
⋮----
original_tool = Tool(
manager = ToolManager(tools=[original_tool])
saved_tool = manager.get_tool("add")
⋮----
# warn on duplicate tools
⋮----
manager = ToolManager(True, tools=[original_tool, original_tool])
⋮----
@pytest.mark.anyio
    async def test_async_function(self)
⋮----
"""Test registering and running an async function."""
⋮----
async def fetch_data(url: str) -> str
⋮----
"""Fetch data from URL."""
⋮----
tool = manager.get_tool("fetch_data")
⋮----
def test_pydantic_model_function(self)
⋮----
"""Test registering a function that takes a Pydantic model."""
⋮----
class UserInput(BaseModel)
⋮----
name: str
age: int
⋮----
def create_user(user: UserInput, flag: bool) -> dict
⋮----
"""Create a new user."""
⋮----
tool = manager.get_tool("create_user")
⋮----
def test_add_callable_object(self)
⋮----
"""Test registering a callable object."""
⋮----
class MyTool
⋮----
def __init__(self)
⋮----
def __call__(self, x: int) -> int
⋮----
tool = manager.add_tool(MyTool())
⋮----
@pytest.mark.anyio
    async def test_add_async_callable_object(self)
⋮----
"""Test registering an async callable object."""
⋮----
class MyAsyncTool
⋮----
async def __call__(self, x: int) -> int
⋮----
tool = manager.add_tool(MyAsyncTool())
⋮----
def test_add_invalid_tool(self)
⋮----
manager.add_tool(1)  # type: ignore
⋮----
def test_add_lambda(self)
⋮----
tool = manager.add_tool(lambda x: x, name="my_tool")
⋮----
def test_add_lambda_with_no_name(self)
⋮----
def test_warn_on_duplicate_tools(self, caplog)
⋮----
"""Test warning on duplicate tools."""
⋮----
def f(x: int) -> int
⋮----
def test_disable_warn_on_duplicate_tools(self, caplog)
⋮----
"""Test disabling warning on duplicate tools."""
⋮----
class TestCallTools
⋮----
@pytest.mark.anyio
    async def test_call_tool(self)
⋮----
result = await manager.call_tool("add", {"a": 1, "b": 2})
⋮----
@pytest.mark.anyio
    async def test_call_async_tool(self)
⋮----
async def double(n: int) -> int
⋮----
"""Double a number."""
⋮----
result = await manager.call_tool("double", {"n": 5})
⋮----
@pytest.mark.anyio
    async def test_call_object_tool(self)
⋮----
result = await tool.run({"x": 5})
⋮----
@pytest.mark.anyio
    async def test_call_async_object_tool(self)
⋮----
@pytest.mark.anyio
    async def test_call_tool_with_default_args(self)
⋮----
def add(a: int, b: int = 1) -> int
⋮----
result = await manager.call_tool("add", {"a": 1})
⋮----
@pytest.mark.anyio
    async def test_call_tool_with_missing_args(self)
⋮----
@pytest.mark.anyio
    async def test_call_unknown_tool(self)
⋮----
@pytest.mark.anyio
    async def test_call_tool_with_list_int_input(self)
⋮----
def sum_vals(vals: list[int]) -> int
⋮----
# Try both with plain list and with JSON list
result = await manager.call_tool("sum_vals", {"vals": "[1, 2, 3]"})
⋮----
result = await manager.call_tool("sum_vals", {"vals": [1, 2, 3]})
⋮----
@pytest.mark.anyio
    async def test_call_tool_with_list_str_or_str_input(self)
⋮----
def concat_strs(vals: list[str] | str) -> str
⋮----
# Try both with plain python object and with JSON list
result = await manager.call_tool("concat_strs", {"vals": ["a", "b", "c"]})
⋮----
result = await manager.call_tool("concat_strs", {"vals": '["a", "b", "c"]'})
⋮----
result = await manager.call_tool("concat_strs", {"vals": "a"})
⋮----
result = await manager.call_tool("concat_strs", {"vals": '"a"'})
⋮----
@pytest.mark.anyio
    async def test_call_tool_with_complex_model(self)
⋮----
class MyShrimpTank(BaseModel)
⋮----
class Shrimp(BaseModel)
⋮----
shrimp: list[Shrimp]
x: None
⋮----
def name_shrimp(tank: MyShrimpTank, ctx: Context) -> list[str]
⋮----
result = await manager.call_tool(
⋮----
class TestToolSchema
⋮----
@pytest.mark.anyio
    async def test_context_arg_excluded_from_schema(self)
⋮----
def something(a: int, ctx: Context) -> int
⋮----
tool = manager.add_tool(something)
⋮----
class TestContextHandling
⋮----
"""Test context handling in the tool manager."""
⋮----
def test_context_parameter_detection(self)
⋮----
"""Test that context parameters are properly detected in
        Tool.from_function()."""
⋮----
def tool_with_context(x: int, ctx: Context) -> str
⋮----
tool = manager.add_tool(tool_with_context)
⋮----
def tool_without_context(x: int) -> str
⋮----
tool = manager.add_tool(tool_without_context)
⋮----
def tool_with_parametrized_context(x: int, ctx: Context[ServerSessionT, LifespanContextT, RequestT]) -> str
⋮----
tool = manager.add_tool(tool_with_parametrized_context)
⋮----
@pytest.mark.anyio
    async def test_context_injection(self)
⋮----
"""Test that context is properly injected during tool execution."""
⋮----
mcp = FastMCP()
ctx = mcp.get_context()
result = await manager.call_tool("tool_with_context", {"x": 42}, context=ctx)
⋮----
@pytest.mark.anyio
    async def test_context_injection_async(self)
⋮----
"""Test that context is properly injected in async tools."""
⋮----
async def async_tool(x: int, ctx: Context) -> str
⋮----
result = await manager.call_tool("async_tool", {"x": 42}, context=ctx)
⋮----
@pytest.mark.anyio
    async def test_context_optional(self)
⋮----
"""Test that context is optional when calling tools."""
⋮----
def tool_with_context(x: int, ctx: Context | None = None) -> str
⋮----
# Should not raise an error when context is not provided
result = await manager.call_tool("tool_with_context", {"x": 42})
⋮----
@pytest.mark.anyio
    async def test_context_error_handling(self)
⋮----
"""Test error handling when context injection fails."""
⋮----
class TestToolAnnotations
⋮----
def test_tool_annotations(self)
⋮----
"""Test that tool annotations are correctly added to tools."""
⋮----
def read_data(path: str) -> str
⋮----
"""Read data from a file."""
⋮----
annotations = ToolAnnotations(
⋮----
tool = manager.add_tool(read_data, annotations=annotations)
⋮----
@pytest.mark.anyio
    async def test_tool_annotations_in_fastmcp(self)
⋮----
"""Test that tool annotations are included in MCPTool conversion."""
⋮----
app = FastMCP()
⋮----
@app.tool(annotations=ToolAnnotations(title="Echo Tool", readOnlyHint=True))
        def echo(message: str) -> str
⋮----
"""Echo a message back."""
⋮----
tools = await app.list_tools()
⋮----
class TestStructuredOutput
⋮----
"""Test structured output functionality in tools."""
⋮----
@pytest.mark.anyio
    async def test_tool_with_basemodel_output(self)
⋮----
"""Test tool with BaseModel return type."""
⋮----
class UserOutput(BaseModel)
⋮----
def get_user(user_id: int) -> UserOutput
⋮----
"""Get user by ID."""
⋮----
result = await manager.call_tool("get_user", {"user_id": 1}, convert_result=True)
# don't test unstructured output here, just the structured conversion
⋮----
@pytest.mark.anyio
    async def test_tool_with_primitive_output(self)
⋮----
"""Test tool with primitive return type."""
⋮----
def double_number(n: int) -> int
⋮----
result = await manager.call_tool("double_number", {"n": 5})
⋮----
result = await manager.call_tool("double_number", {"n": 5}, convert_result=True)
⋮----
@pytest.mark.anyio
    async def test_tool_with_typeddict_output(self)
⋮----
"""Test tool with TypedDict return type."""
⋮----
class UserDict(TypedDict)
⋮----
expected_output = {"name": "Alice", "age": 25}
⋮----
def get_user_dict(user_id: int) -> UserDict
⋮----
"""Get user as dict."""
⋮----
result = await manager.call_tool("get_user_dict", {"user_id": 1})
⋮----
@pytest.mark.anyio
    async def test_tool_with_dataclass_output(self)
⋮----
"""Test tool with dataclass return type."""
⋮----
@dataclass
        class Person
⋮----
expected_output = {"name": "Bob", "age": 40}
⋮----
def get_person() -> Person
⋮----
"""Get a person."""
⋮----
result = await manager.call_tool("get_person", {}, convert_result=True)
⋮----
@pytest.mark.anyio
    async def test_tool_with_list_output(self)
⋮----
"""Test tool with list return type."""
⋮----
expected_list = [1, 2, 3, 4, 5]
expected_output = {"result": expected_list}
⋮----
def get_numbers() -> list[int]
⋮----
"""Get a list of numbers."""
⋮----
result = await manager.call_tool("get_numbers", {})
⋮----
result = await manager.call_tool("get_numbers", {}, convert_result=True)
⋮----
@pytest.mark.anyio
    async def test_tool_without_structured_output(self)
⋮----
"""Test that tools work normally when structured_output=False."""
⋮----
def get_dict() -> dict
⋮----
"""Get a dict."""
⋮----
result = await manager.call_tool("get_dict", {})
⋮----
def test_tool_output_schema_property(self)
⋮----
"""Test that Tool.output_schema property works correctly."""
⋮----
def get_user() -> UserOutput
⋮----
tool = manager.add_tool(get_user)
⋮----
# Test that output_schema is populated
expected_schema = {
⋮----
@pytest.mark.anyio
    async def test_tool_with_dict_str_any_output(self)
⋮----
"""Test tool with dict[str, Any] return type."""
⋮----
def get_config() -> dict[str, Any]
⋮----
"""Get configuration"""
⋮----
tool = manager.add_tool(get_config)
⋮----
# Check output schema
⋮----
assert "properties" not in tool.output_schema  # dict[str, Any] has no constraints
⋮----
# Test raw result
result = await manager.call_tool("get_config", {})
expected = {"debug": True, "port": 8080, "features": ["auth", "logging"]}
⋮----
# Test converted result
⋮----
@pytest.mark.anyio
    async def test_tool_with_dict_str_typed_output(self)
⋮----
"""Test tool with dict[str, T] return type for specific T."""
⋮----
def get_scores() -> dict[str, int]
⋮----
"""Get player scores"""
⋮----
tool = manager.add_tool(get_scores)
⋮----
result = await manager.call_tool("get_scores", {})
expected = {"alice": 100, "bob": 85, "charlie": 92}
````

## File: tests/server/test_completion_with_context.py
````python
"""
Tests for completion handler with context functionality.
"""
⋮----
@pytest.mark.anyio
async def test_completion_handler_receives_context()
⋮----
"""Test that the completion handler receives context correctly."""
server = Server("test-server")
⋮----
# Track what the handler receives
received_args = {}
⋮----
# Return test completion
⋮----
# Test with context
result = await client.complete(
⋮----
# Verify handler received the context
⋮----
@pytest.mark.anyio
async def test_completion_backward_compatibility()
⋮----
"""Test that completion works without context (backward compatibility)."""
⋮----
context_was_none = False
⋮----
context_was_none = context is None
⋮----
# Test without context
⋮----
# Verify context was None
⋮----
@pytest.mark.anyio
async def test_dependent_completion_scenario()
⋮----
"""Test a real-world scenario with dependent completions."""
⋮----
# Simulate database/table completion scenario
⋮----
# Complete database names
⋮----
# Complete table names based on selected database
⋮----
db = context.arguments.get("database")
⋮----
# First, complete database
db_result = await client.complete(
⋮----
# Then complete table with database context
table_result = await client.complete(
⋮----
# Different database gives different tables
table_result2 = await client.complete(
⋮----
@pytest.mark.anyio
async def test_completion_error_on_missing_context()
⋮----
"""Test that server can raise error when required context is missing."""
⋮----
# Check if database context is provided
⋮----
# Raise an error instead of returning error as completion
⋮----
# Normal completion if context is provided
⋮----
# Try to complete table without database context - should raise error
⋮----
# Verify error message
⋮----
# Now complete with proper context - should work normally
result_with_context = await client.complete(
⋮----
# Should get normal completions
````

## File: tests/server/test_lifespan.py
````python
"""Tests for lifespan functionality in both low-level and FastMCP servers."""
⋮----
@pytest.mark.anyio
async def test_lowlevel_server_lifespan()
⋮----
"""Test that lifespan works in low-level server."""
⋮----
@asynccontextmanager
    async def test_lifespan(server: Server) -> AsyncIterator[dict[str, bool]]
⋮----
"""Test lifespan context that tracks startup/shutdown."""
context = {"started": False, "shutdown": False}
⋮----
server = Server("test", lifespan=test_lifespan)
⋮----
# Create memory streams for testing
⋮----
# Create a tool that accesses lifespan context
⋮----
@server.call_tool()
    async def check_lifespan(name: str, arguments: dict) -> list
⋮----
ctx = server.request_context
⋮----
# Run server in background task
⋮----
async def run_server()
⋮----
# Initialize the server
params = InitializeRequestParams(
⋮----
response = await receive_stream2.receive()
response = response.message
⋮----
# Send initialized notification
⋮----
# Call the tool to verify lifespan context
⋮----
# Get response and verify
⋮----
# Cancel server task
⋮----
@pytest.mark.anyio
async def test_fastmcp_server_lifespan()
⋮----
"""Test that lifespan works in FastMCP server."""
⋮----
@asynccontextmanager
    async def test_lifespan(server: FastMCP) -> AsyncIterator[dict]
⋮----
server = FastMCP("test", lifespan=test_lifespan)
⋮----
# Add a tool that checks lifespan context
⋮----
@server.tool()
    def check_lifespan(ctx: Context) -> bool
⋮----
"""Tool that checks lifespan context."""
````

## File: tests/server/test_lowlevel_input_validation.py
````python
"""Test input schema validation for lowlevel server."""
⋮----
"""Helper to run a tool test with minimal boilerplate.

    Args:
        tools: List of tools to register
        call_tool_handler: Handler function for tool calls
        test_callback: Async function that performs the test using the client session

    Returns:
        The result of the tool call
    """
server = Server("test")
⋮----
@server.list_tools()
    async def list_tools()
⋮----
@server.call_tool()
    async def call_tool(name: str, arguments: dict[str, Any]) -> list[TextContent]
⋮----
# Message handler for client
⋮----
# Server task
async def run_server()
⋮----
async def handle_messages()
⋮----
# Run the test
⋮----
# Initialize the session
⋮----
# Run the test callback
result = await test_callback(client_session)
⋮----
# Cancel the server task
⋮----
def create_add_tool() -> Tool
⋮----
"""Create a standard 'add' tool for testing."""
⋮----
@pytest.mark.anyio
async def test_valid_tool_call()
⋮----
"""Test that valid arguments pass validation."""
⋮----
async def call_tool_handler(name: str, arguments: dict[str, Any]) -> list[TextContent]
⋮----
result = arguments["a"] + arguments["b"]
⋮----
async def test_callback(client_session: ClientSession) -> CallToolResult
⋮----
result = await run_tool_test([create_add_tool()], call_tool_handler, test_callback)
⋮----
# Verify results
⋮----
@pytest.mark.anyio
async def test_invalid_tool_call_missing_required()
⋮----
"""Test that missing required arguments fail validation."""
⋮----
# This should not be reached due to validation
⋮----
return await client_session.call_tool("add", {"a": 5})  # missing 'b'
⋮----
@pytest.mark.anyio
async def test_invalid_tool_call_wrong_type()
⋮----
"""Test that wrong argument types fail validation."""
⋮----
return await client_session.call_tool("add", {"a": "five", "b": 3})  # 'a' should be number
⋮----
@pytest.mark.anyio
async def test_cache_refresh_on_missing_tool()
⋮----
"""Test that tool cache is refreshed when tool is not found."""
tools = [
⋮----
result = arguments["x"] * arguments["y"]
⋮----
# Call tool without first listing tools (cache should be empty)
# The cache should be refreshed automatically
⋮----
result = await run_tool_test(tools, call_tool_handler, test_callback)
⋮----
# Verify results - should work because cache will be refreshed
⋮----
@pytest.mark.anyio
async def test_enum_constraint_validation()
⋮----
"""Test that enum constraints are validated."""
⋮----
# This should not be reached due to validation failure
⋮----
return await client_session.call_tool("greet", {"name": "Smith", "title": "Prof"})  # Invalid title
⋮----
@pytest.mark.anyio
async def test_tool_not_in_list_logs_warning(caplog)
⋮----
"""Test that calling a tool not in list_tools logs a warning and skips validation."""
⋮----
# This should be reached since validation is skipped for unknown tools
⋮----
# Even with invalid arguments, this should execute since validation is skipped
⋮----
# Call a tool that's not in the list with invalid arguments
# This should trigger the warning about validation not being performed
⋮----
# Verify results - should succeed because validation is skipped for unknown tools
⋮----
# Verify warning was logged
````

## File: tests/server/test_lowlevel_output_validation.py
````python
"""Test output schema validation for lowlevel server."""
⋮----
"""Helper to run a tool test with minimal boilerplate.

    Args:
        tools: List of tools to register
        call_tool_handler: Handler function for tool calls
        test_callback: Async function that performs the test using the client session

    Returns:
        The result of the tool call
    """
server = Server("test")
⋮----
@server.list_tools()
    async def list_tools()
⋮----
@server.call_tool()
    async def call_tool(name: str, arguments: dict[str, Any])
⋮----
# Message handler for client
⋮----
# Server task
async def run_server()
⋮----
async def handle_messages()
⋮----
# Run the test
⋮----
# Initialize the session
⋮----
# Run the test callback
result = await test_callback(client_session)
⋮----
# Cancel the server task
⋮----
@pytest.mark.anyio
async def test_content_only_without_output_schema()
⋮----
"""Test returning content only when no outputSchema is defined."""
tools = [
⋮----
# No outputSchema defined
⋮----
async def call_tool_handler(name: str, arguments: dict[str, Any]) -> list[TextContent]
⋮----
async def test_callback(client_session: ClientSession) -> CallToolResult
⋮----
result = await run_tool_test(tools, call_tool_handler, test_callback)
⋮----
# Verify results
⋮----
@pytest.mark.anyio
async def test_dict_only_without_output_schema()
⋮----
"""Test returning dict only when no outputSchema is defined."""
⋮----
async def call_tool_handler(name: str, arguments: dict[str, Any]) -> dict[str, Any]
⋮----
# Check that the content is the JSON serialization
⋮----
@pytest.mark.anyio
async def test_both_content_and_dict_without_output_schema()
⋮----
"""Test returning both content and dict when no outputSchema is defined."""
⋮----
async def call_tool_handler(name: str, arguments: dict[str, Any]) -> tuple[list[TextContent], dict[str, Any]]
⋮----
content = [TextContent(type="text", text="Processing complete")]
data = {"result": "success", "count": 10}
⋮----
@pytest.mark.anyio
async def test_content_only_with_output_schema_error()
⋮----
"""Test error when outputSchema is defined but only content is returned."""
⋮----
# This returns only content, but outputSchema expects structured data
⋮----
# Verify error
⋮----
@pytest.mark.anyio
async def test_valid_dict_with_output_schema()
⋮----
"""Test valid dict output matching outputSchema."""
⋮----
x = arguments["x"]
y = arguments["y"]
⋮----
# Check JSON serialization
⋮----
@pytest.mark.anyio
async def test_invalid_dict_with_output_schema()
⋮----
"""Test dict output that doesn't match outputSchema."""
⋮----
# Missing required 'age' field
⋮----
@pytest.mark.anyio
async def test_both_content_and_valid_dict_with_output_schema()
⋮----
"""Test returning both content and valid dict with outputSchema."""
⋮----
content = [TextContent(type="text", text=f"Analysis of: {arguments['text']}")]
data = {"sentiment": "positive", "confidence": 0.95}
⋮----
@pytest.mark.anyio
async def test_output_schema_type_validation()
⋮----
"""Test outputSchema validates types correctly."""
⋮----
# Wrong type for 'count' - should be integer
````

## File: tests/server/test_lowlevel_tool_annotations.py
````python
"""Tests for tool annotations in low-level server."""
⋮----
@pytest.mark.anyio
async def test_lowlevel_server_tool_annotations()
⋮----
"""Test that tool annotations work in low-level server."""
server = Server("test")
⋮----
# Create a tool with annotations
⋮----
@server.list_tools()
    async def list_tools()
⋮----
# Message handler for client
⋮----
# Server task
async def run_server()
⋮----
async def handle_messages()
⋮----
# Run the test
⋮----
# Initialize the session
⋮----
# List tools
tools_result = await client_session.list_tools()
⋮----
# Cancel the server task
⋮----
# Verify results
````

## File: tests/server/test_read_resource.py
````python
@pytest.fixture
def temp_file()
⋮----
"""Create a temporary file for testing."""
⋮----
path = Path(f.name).resolve()
⋮----
@pytest.mark.anyio
async def test_read_resource_text(temp_file: Path)
⋮----
server = Server("test")
⋮----
@server.read_resource()
    async def read_resource(uri: AnyUrl) -> Iterable[ReadResourceContents]
⋮----
# Get the handler directly from the server
handler = server.request_handlers[types.ReadResourceRequest]
⋮----
# Create a request
request = types.ReadResourceRequest(
⋮----
# Call the handler
result = await handler(request)
⋮----
content = result.root.contents[0]
⋮----
@pytest.mark.anyio
async def test_read_resource_binary(temp_file: Path)
⋮----
@pytest.mark.anyio
async def test_read_resource_default_mime(temp_file: Path)
⋮----
# No mime_type specified, should default to text/plain
````

## File: tests/server/test_session.py
````python
@pytest.mark.anyio
async def test_server_session_initialize()
⋮----
# Create a message handler to catch exceptions
⋮----
received_initialized = False
⋮----
async def run_server()
⋮----
received_initialized = True
⋮----
@pytest.mark.anyio
async def test_server_capabilities()
⋮----
server = Server("test")
notification_options = NotificationOptions()
experimental_capabilities = {}
⋮----
# Initially no capabilities
caps = server.get_capabilities(notification_options, experimental_capabilities)
⋮----
# Add a prompts handler
⋮----
@server.list_prompts()
    async def list_prompts()
⋮----
# Add a resources handler
⋮----
@server.list_resources()
    async def list_resources()
⋮----
@pytest.mark.anyio
async def test_server_session_initialize_with_older_protocol_version()
⋮----
"""Test that server accepts and responds with older protocol (2024-11-05)."""
⋮----
received_protocol_version = None
⋮----
async def mock_client()
⋮----
# Send initialization request with older protocol version (2024-11-05)
⋮----
# Wait for the initialize response
init_response_message = await server_to_client_receive.receive()
⋮----
result_data = init_response_message.message.root.result
init_result = types.InitializeResult.model_validate(result_data)
⋮----
# Check that the server responded with the requested protocol version
received_protocol_version = init_result.protocolVersion
⋮----
# Send initialized notification
````

## File: tests/server/test_sse_security.py
````python
"""Tests for SSE server DNS rebinding protection."""
⋮----
logger = logging.getLogger(__name__)
SERVER_NAME = "test_sse_security_server"
⋮----
@pytest.fixture
def server_port() -> int
⋮----
@pytest.fixture
def server_url(server_port: int) -> str
⋮----
class SecurityTestServer(Server)
⋮----
def __init__(self)
⋮----
async def on_list_tools(self) -> list[Tool]
⋮----
def run_server_with_settings(port: int, security_settings: TransportSecuritySettings | None = None)
⋮----
"""Run the SSE server with specified security settings."""
app = SecurityTestServer()
sse_transport = SseServerTransport("/messages/", security_settings)
⋮----
async def handle_sse(request: Request)
⋮----
# Validation error was already handled inside connect_sse
⋮----
routes = [
⋮----
starlette_app = Starlette(routes=routes)
⋮----
def start_server_process(port: int, security_settings: TransportSecuritySettings | None = None)
⋮----
"""Start server in a separate process."""
process = multiprocessing.Process(target=run_server_with_settings, args=(port, security_settings))
⋮----
# Give server time to start
⋮----
@pytest.mark.anyio
async def test_sse_security_default_settings(server_port: int)
⋮----
"""Test SSE with default security settings (protection disabled)."""
process = start_server_process(server_port)
⋮----
headers = {"Host": "evil.com", "Origin": "http://evil.com"}
⋮----
@pytest.mark.anyio
async def test_sse_security_invalid_host_header(server_port: int)
⋮----
"""Test SSE with invalid Host header."""
# Enable security by providing settings with an empty allowed_hosts list
security_settings = TransportSecuritySettings(enable_dns_rebinding_protection=True, allowed_hosts=["example.com"])
process = start_server_process(server_port, security_settings)
⋮----
# Test with invalid host header
headers = {"Host": "evil.com"}
⋮----
response = await client.get(f"http://127.0.0.1:{server_port}/sse", headers=headers)
⋮----
@pytest.mark.anyio
async def test_sse_security_invalid_origin_header(server_port: int)
⋮----
"""Test SSE with invalid Origin header."""
# Configure security to allow the host but restrict origins
security_settings = TransportSecuritySettings(
⋮----
# Test with invalid origin header
headers = {"Origin": "http://evil.com"}
⋮----
@pytest.mark.anyio
async def test_sse_security_post_invalid_content_type(server_port: int)
⋮----
"""Test POST endpoint with invalid Content-Type header."""
# Configure security to allow the host
⋮----
# Test POST with invalid content type
fake_session_id = "12345678123456781234567812345678"
response = await client.post(
⋮----
# Test POST with missing content type
⋮----
@pytest.mark.anyio
async def test_sse_security_disabled(server_port: int)
⋮----
"""Test SSE with security disabled."""
settings = TransportSecuritySettings(enable_dns_rebinding_protection=False)
process = start_server_process(server_port, settings)
⋮----
# Test with invalid host header - should still work
⋮----
# For SSE endpoints, we need to use stream to avoid timeout
⋮----
# Should connect successfully even with invalid host
⋮----
@pytest.mark.anyio
async def test_sse_security_custom_allowed_hosts(server_port: int)
⋮----
"""Test SSE with custom allowed hosts."""
settings = TransportSecuritySettings(
⋮----
# Test with custom allowed host
headers = {"Host": "custom.host"}
⋮----
# Should connect successfully with custom host
⋮----
# Test with non-allowed host
⋮----
@pytest.mark.anyio
async def test_sse_security_wildcard_ports(server_port: int)
⋮----
"""Test SSE with wildcard port patterns."""
⋮----
# Test with various port numbers
⋮----
headers = {"Host": f"localhost:{test_port}"}
⋮----
# For SSE endpoints, we need to use stream to avoid timeout
⋮----
# Should connect successfully with any port
⋮----
headers = {"Origin": f"http://localhost:{test_port}"}
⋮----
@pytest.mark.anyio
async def test_sse_security_post_valid_content_type(server_port: int)
⋮----
"""Test POST endpoint with valid Content-Type headers."""
⋮----
# Test with various valid content types
valid_content_types = [
⋮----
"APPLICATION/JSON",  # Case insensitive
⋮----
# Use a valid UUID format (even though session won't exist)
⋮----
# Will get 404 because session doesn't exist, but that's OK
# We're testing that it passes the content-type check
````

## File: tests/server/test_stdio.py
````python
@pytest.mark.anyio
async def test_stdio_server()
⋮----
stdin = io.StringIO()
stdout = io.StringIO()
⋮----
messages = [
⋮----
received_messages = []
⋮----
# Verify received messages
⋮----
# Test sending responses from the server
responses = [
⋮----
session_message = SessionMessage(response)
⋮----
output_lines = stdout.readlines()
⋮----
received_responses = [JSONRPCMessage.model_validate_json(line.strip()) for line in output_lines]
````

## File: tests/server/test_streamable_http_manager.py
````python
"""Tests for StreamableHTTPSessionManager."""
⋮----
@pytest.mark.anyio
async def test_run_can_only_be_called_once()
⋮----
"""Test that run() can only be called once per instance."""
app = Server("test-server")
manager = StreamableHTTPSessionManager(app=app)
⋮----
# First call should succeed
⋮----
# Second call should raise RuntimeError
⋮----
@pytest.mark.anyio
async def test_run_prevents_concurrent_calls()
⋮----
"""Test that concurrent calls to run() are prevented."""
⋮----
errors = []
⋮----
async def try_run()
⋮----
# Simulate some work
⋮----
# Try to run concurrently
⋮----
# One should succeed, one should fail
⋮----
@pytest.mark.anyio
async def test_handle_request_without_run_raises_error()
⋮----
"""Test that handle_request raises error if run() hasn't been called."""
⋮----
# Mock ASGI parameters
scope = {"type": "http", "method": "POST", "path": "/test"}
⋮----
async def receive()
⋮----
async def send(message)
⋮----
# Should raise error because run() hasn't been called
````

## File: tests/server/test_streamable_http_security.py
````python
"""Tests for StreamableHTTP server DNS rebinding protection."""
⋮----
logger = logging.getLogger(__name__)
SERVER_NAME = "test_streamable_http_security_server"
⋮----
@pytest.fixture
def server_port() -> int
⋮----
@pytest.fixture
def server_url(server_port: int) -> str
⋮----
class SecurityTestServer(Server)
⋮----
def __init__(self)
⋮----
async def on_list_tools(self) -> list[Tool]
⋮----
def run_server_with_settings(port: int, security_settings: TransportSecuritySettings | None = None)
⋮----
"""Run the StreamableHTTP server with specified security settings."""
app = SecurityTestServer()
⋮----
# Create session manager with security settings
session_manager = StreamableHTTPSessionManager(
⋮----
# Create the ASGI handler
async def handle_streamable_http(scope: Scope, receive: Receive, send: Send) -> None
⋮----
# Create Starlette app with lifespan
⋮----
@asynccontextmanager
    async def lifespan(app: Starlette) -> AsyncGenerator[None, None]
⋮----
routes = [
⋮----
starlette_app = Starlette(routes=routes, lifespan=lifespan)
⋮----
def start_server_process(port: int, security_settings: TransportSecuritySettings | None = None)
⋮----
"""Start server in a separate process."""
process = multiprocessing.Process(target=run_server_with_settings, args=(port, security_settings))
⋮----
# Give server time to start
⋮----
@pytest.mark.anyio
async def test_streamable_http_security_default_settings(server_port: int)
⋮----
"""Test StreamableHTTP with default security settings (protection enabled)."""
process = start_server_process(server_port)
⋮----
# Test with valid localhost headers
⋮----
# POST request to initialize session
response = await client.post(
⋮----
@pytest.mark.anyio
async def test_streamable_http_security_invalid_host_header(server_port: int)
⋮----
"""Test StreamableHTTP with invalid Host header."""
security_settings = TransportSecuritySettings(enable_dns_rebinding_protection=True)
process = start_server_process(server_port, security_settings)
⋮----
# Test with invalid host header
headers = {
⋮----
@pytest.mark.anyio
async def test_streamable_http_security_invalid_origin_header(server_port: int)
⋮----
"""Test StreamableHTTP with invalid Origin header."""
security_settings = TransportSecuritySettings(enable_dns_rebinding_protection=True, allowed_hosts=["127.0.0.1:*"])
⋮----
# Test with invalid origin header
⋮----
@pytest.mark.anyio
async def test_streamable_http_security_invalid_content_type(server_port: int)
⋮----
"""Test StreamableHTTP POST with invalid Content-Type header."""
⋮----
# Test POST with invalid content type
⋮----
# Test POST with missing content type
⋮----
@pytest.mark.anyio
async def test_streamable_http_security_disabled(server_port: int)
⋮----
"""Test StreamableHTTP with security disabled."""
settings = TransportSecuritySettings(enable_dns_rebinding_protection=False)
process = start_server_process(server_port, settings)
⋮----
# Test with invalid host header - should still work
⋮----
# Should connect successfully even with invalid host
⋮----
@pytest.mark.anyio
async def test_streamable_http_security_custom_allowed_hosts(server_port: int)
⋮----
"""Test StreamableHTTP with custom allowed hosts."""
settings = TransportSecuritySettings(
⋮----
# Test with custom allowed host
⋮----
# Should connect successfully with custom host
⋮----
@pytest.mark.anyio
async def test_streamable_http_security_get_request(server_port: int)
⋮----
"""Test StreamableHTTP GET request with security."""
security_settings = TransportSecuritySettings(enable_dns_rebinding_protection=True, allowed_hosts=["127.0.0.1"])
⋮----
# Test GET request with invalid host header
⋮----
response = await client.get(f"http://127.0.0.1:{server_port}/", headers=headers)
⋮----
# Test GET request with valid host header
⋮----
# GET requests need a session ID in StreamableHTTP
# So it will fail with "Missing session ID" not security error
⋮----
# This should pass security but fail on session validation
⋮----
body = response.json()
````

## File: tests/shared/test_auth_utils.py
````python
"""Tests for OAuth 2.0 Resource Indicators utilities."""
⋮----
class TestResourceUrlFromServerUrl
⋮----
"""Tests for resource_url_from_server_url function."""
⋮----
def test_removes_fragment(self)
⋮----
"""Fragment should be removed per RFC 8707."""
⋮----
def test_preserves_path(self)
⋮----
"""Path should be preserved."""
⋮----
def test_preserves_query(self)
⋮----
"""Query parameters should be preserved."""
⋮----
def test_preserves_port(self)
⋮----
"""Non-default ports should be preserved."""
⋮----
def test_lowercase_scheme_and_host(self)
⋮----
"""Scheme and host should be lowercase for canonical form."""
⋮----
def test_handles_pydantic_urls(self)
⋮----
"""Should handle Pydantic URL types."""
⋮----
url = HttpUrl("https://example.com/path")
⋮----
class TestCheckResourceAllowed
⋮----
"""Tests for check_resource_allowed function."""
⋮----
def test_identical_urls(self)
⋮----
"""Identical URLs should match."""
⋮----
def test_different_schemes(self)
⋮----
"""Different schemes should not match."""
⋮----
def test_different_domains(self)
⋮----
"""Different domains should not match."""
⋮----
def test_different_ports(self)
⋮----
"""Different ports should not match."""
⋮----
def test_hierarchical_matching(self)
⋮----
"""Child paths should match parent paths."""
# Parent resource allows child resources
⋮----
# Exact match
⋮----
# Parent cannot use child's token
⋮----
def test_path_boundary_matching(self)
⋮----
"""Path matching should respect boundaries."""
# Should not match partial path segments
⋮----
# Should match with trailing slash
⋮----
def test_trailing_slash_handling(self)
⋮----
"""Trailing slashes should be handled correctly."""
# With and without trailing slashes
⋮----
def test_case_insensitive_origin(self)
⋮----
"""Origin comparison should be case-insensitive."""
⋮----
def test_empty_paths(self)
⋮----
"""Empty paths should be handled correctly."""
````

## File: tests/shared/test_httpx_utils.py
````python
"""Tests for httpx utility functions."""
⋮----
def test_default_settings()
⋮----
"""Test that default settings are applied correctly."""
client = create_mcp_http_client()
⋮----
def test_custom_parameters()
⋮----
"""Test custom headers and timeout are set correctly."""
headers = {"Authorization": "Bearer token"}
timeout = httpx.Timeout(60.0)
⋮----
client = create_mcp_http_client(headers, timeout)
````

## File: tests/shared/test_memory.py
````python
@pytest.fixture
def mcp_server() -> Server
⋮----
server = Server(name="test_server")
⋮----
@server.list_resources()
    async def handle_list_resources()
⋮----
"""Shows how a client and server can communicate over memory streams."""
response = await client_connected_to_server.send_ping()
````

## File: tests/shared/test_progress_notifications.py
````python
@pytest.mark.anyio
async def test_bidirectional_progress_notifications()
⋮----
"""Test that both client and server can send progress notifications."""
# Create memory streams for client/server
⋮----
# Run a server session so we can send progress updates in tool
async def run_server()
⋮----
# Create a server session
⋮----
serv_sesh = server_session
⋮----
# Track progress updates
server_progress_updates = []
client_progress_updates = []
⋮----
# Progress tokens
server_progress_token = "server_token_123"
client_progress_token = "client_token_456"
⋮----
# Create a server with progress capability
server = Server(name="ProgressTestServer")
⋮----
# Register progress handler
⋮----
# Register list tool handler
⋮----
@server.list_tools()
    async def handle_list_tools() -> list[types.Tool]
⋮----
# Register tool handler
⋮----
@server.call_tool()
    async def handle_call_tool(name: str, arguments: dict | None) -> list
⋮----
# Make sure we received a progress token
⋮----
progressToken = arguments["_meta"]["progressToken"]
⋮----
# Send progress notifications
⋮----
# Client message handler to store progress notifications
⋮----
params = message.root.params
⋮----
# Test using client
⋮----
# Start the server in a background task
⋮----
# Initialize the client connection
⋮----
# Call list_tools with progress token
⋮----
# Call test_tool with progress token
⋮----
# Send progress notifications from client to server
⋮----
# Wait and exit
⋮----
# Verify client received progress updates from server
⋮----
# Verify server received progress updates from client
⋮----
@pytest.mark.anyio
async def test_progress_context_manager()
⋮----
"""Test client using progress context manager for sending progress notifications."""
⋮----
server = Server(name="ProgressContextTestServer")
⋮----
# Run server session to receive progress updates
⋮----
# Client message handler
⋮----
# run client session
⋮----
progress_token = "client_token_456"
⋮----
# Create request context
meta = types.RequestParams.Meta(progressToken=progress_token)
request_context = RequestContext(
⋮----
# cast for type checker
typed_context = cast(
⋮----
# Utilize progress context manager
⋮----
# Wait for all messages to be processed
⋮----
# Verify progress updates were received by server
⋮----
# first update
⋮----
# second update
⋮----
# third update
⋮----
# final update
````

## File: tests/shared/test_session.py
````python
@pytest.fixture
def mcp_server() -> Server
⋮----
"""Verify that _in_flight is empty after all requests complete."""
# Send a request and wait for response
response = await client_connected_to_server.send_ping()
⋮----
# Verify _in_flight is empty
⋮----
@pytest.mark.anyio
async def test_request_cancellation()
⋮----
"""Test that requests can be cancelled while in-flight."""
# The tool is already registered in the fixture
⋮----
ev_tool_called = anyio.Event()
ev_cancelled = anyio.Event()
request_id = None
⋮----
# Start the request in a separate task so we can cancel it
def make_server() -> Server
⋮----
server = Server(name="TestSessionServer")
⋮----
# Register the tool handler
⋮----
@server.call_tool()
        async def handle_call_tool(name: str, arguments: dict | None) -> list
⋮----
request_id = server.request_context.request_id
⋮----
await anyio.sleep(10)  # Long enough to ensure we can cancel
⋮----
# Register the tool so it shows up in list_tools
⋮----
@server.list_tools()
        async def handle_list_tools() -> list[types.Tool]
⋮----
async def make_request(client_session)
⋮----
# Expected - request was cancelled
⋮----
# Wait for the request to be in-flight
with anyio.fail_after(1):  # Timeout after 1 second
⋮----
# Send cancellation notification
⋮----
# Give cancellation time to process
⋮----
@pytest.mark.anyio
async def test_connection_closed()
⋮----
"""
    Test that pending requests are cancelled when the connection is closed remotely.
    """
⋮----
ev_closed = anyio.Event()
ev_response = anyio.Event()
⋮----
async def make_request(client_session)
⋮----
"""Send a request in a separate task"""
⋮----
# any request will do
⋮----
# Expected - request errored
⋮----
async def mock_server()
⋮----
"""Wait for a request, then close the connection"""
⋮----
# Wait for a request
⋮----
# Close the connection, as if the server exited
````

## File: tests/shared/test_sse.py
````python
SERVER_NAME = "test_server_for_SSE"
⋮----
@pytest.fixture
def server_port() -> int
⋮----
@pytest.fixture
def server_url(server_port: int) -> str
⋮----
# Test server implementation
class ServerTest(Server)
⋮----
def __init__(self)
⋮----
@self.read_resource()
        async def handle_read_resource(uri: AnyUrl) -> str | bytes
⋮----
# Simulate a slow resource
⋮----
@self.list_tools()
        async def handle_list_tools() -> list[Tool]
⋮----
@self.call_tool()
        async def handle_call_tool(name: str, args: dict) -> list[TextContent]
⋮----
# Test fixtures
def make_server_app() -> Starlette
⋮----
"""Create test Starlette app with SSE transport"""
# Configure security with allowed hosts/origins for testing
security_settings = TransportSecuritySettings(
sse = SseServerTransport("/messages/", security_settings=security_settings)
server = ServerTest()
⋮----
async def handle_sse(request: Request) -> Response
⋮----
app = Starlette(
⋮----
def run_server(server_port: int) -> None
⋮----
app = make_server_app()
server = uvicorn.Server(config=uvicorn.Config(app=app, host="127.0.0.1", port=server_port, log_level="error"))
⋮----
# Give server time to start
⋮----
@pytest.fixture()
def server(server_port: int) -> Generator[None, None, None]
⋮----
proc = multiprocessing.Process(target=run_server, kwargs={"server_port": server_port}, daemon=True)
⋮----
# Wait for server to be running
max_attempts = 20
attempt = 0
⋮----
# Signal the server to stop
⋮----
@pytest.fixture()
async def http_client(server, server_url) -> AsyncGenerator[httpx.AsyncClient, None]
⋮----
"""Create test client"""
⋮----
# Tests
⋮----
@pytest.mark.anyio
async def test_raw_sse_connection(http_client: httpx.AsyncClient) -> None
⋮----
"""Test the SSE connection establishment simply with an HTTP client."""
⋮----
async def connection_test() -> None
⋮----
line_number = 0
⋮----
# Add timeout to prevent test from hanging if it fails
⋮----
@pytest.mark.anyio
async def test_sse_client_basic_connection(server: None, server_url: str) -> None
⋮----
# Test initialization
result = await session.initialize()
⋮----
# Test ping
ping_result = await session.send_ping()
⋮----
@pytest.fixture
async def initialized_sse_client_session(server, server_url: str) -> AsyncGenerator[ClientSession, None]
⋮----
session = initialized_sse_client_session
response = await session.read_resource(uri=AnyUrl("foobar://should-work"))
⋮----
# sanity check that normal, fast responses are working
response = await session.read_resource(uri=AnyUrl("foobar://1"))
⋮----
response = await session.read_resource(uri=AnyUrl("slow://2"))
# we should receive an error here
⋮----
def run_mounted_server(server_port: int) -> None
⋮----
main_app = Starlette(routes=[Mount("/mounted_app", app=app)])
server = uvicorn.Server(config=uvicorn.Config(app=main_app, host="127.0.0.1", port=server_port, log_level="error"))
⋮----
@pytest.fixture()
def mounted_server(server_port: int) -> Generator[None, None, None]
⋮----
proc = multiprocessing.Process(target=run_mounted_server, kwargs={"server_port": server_port}, daemon=True)
⋮----
@pytest.mark.anyio
async def test_sse_client_basic_connection_mounted_app(mounted_server: None, server_url: str) -> None
⋮----
# Test server with request context that returns headers in the response
class RequestContextServer(Server[object, Request])
⋮----
headers_info = {}
context = self.request_context
⋮----
headers_info = dict(context.request.headers)
⋮----
context_data = {
⋮----
def run_context_server(server_port: int) -> None
⋮----
"""Run a server that captures request context"""
⋮----
context_server = RequestContextServer()
⋮----
@pytest.fixture()
def context_server(server_port: int) -> Generator[None, None, None]
⋮----
"""Fixture that provides a server with request context capture"""
proc = multiprocessing.Process(target=run_context_server, kwargs={"server_port": server_port}, daemon=True)
⋮----
@pytest.mark.anyio
async def test_request_context_propagation(context_server: None, server_url: str) -> None
⋮----
"""Test that request context is properly propagated through SSE transport."""
# Test with custom headers
custom_headers = {
⋮----
# Initialize the session
⋮----
# Call the tool that echoes headers back
tool_result = await session.call_tool("echo_headers", {})
⋮----
# Parse the JSON response
⋮----
headers_data = json.loads(tool_result.content[0].text if tool_result.content[0].type == "text" else "{}")
⋮----
# Verify headers were propagated
⋮----
@pytest.mark.anyio
async def test_request_context_isolation(context_server: None, server_url: str) -> None
⋮----
"""Test that request contexts are isolated between different SSE clients."""
contexts = []
⋮----
# Create multiple clients with different headers
⋮----
headers = {"X-Request-Id": f"request-{i}", "X-Custom-Value": f"value-{i}"}
⋮----
# Call the tool that echoes context
tool_result = await session.call_tool("echo_context", {"request_id": f"request-{i}"})
⋮----
context_data = json.loads(
⋮----
# Verify each request had its own context
⋮----
def test_sse_message_id_coercion()
⋮----
"""Test that string message IDs that look like integers are parsed as integers.

    See <https://github.com/modelcontextprotocol/python-sdk/pull/851> for more details.
    """
json_message = '{"jsonrpc": "2.0", "id": "123", "method": "ping", "params": null}'
msg = types.JSONRPCMessage.model_validate_json(json_message)
````

## File: tests/shared/test_streamable_http.py
````python
"""
Tests for the StreamableHTTP server and client transport.

Contains tests for both server and client sides of the StreamableHTTP transport.
"""
⋮----
# Test constants
SERVER_NAME = "test_streamable_http_server"
TEST_SESSION_ID = "test-session-id-12345"
INIT_REQUEST = {
⋮----
# Helper functions
def extract_protocol_version_from_sse(response: requests.Response) -> str
⋮----
"""Extract the negotiated protocol version from an SSE initialization response."""
⋮----
init_data = json.loads(line[6:])
⋮----
# Simple in-memory event store for testing
class SimpleEventStore(EventStore)
⋮----
"""Simple in-memory event store for testing."""
⋮----
def __init__(self)
⋮----
async def store_event(self, stream_id: StreamId, message: types.JSONRPCMessage) -> EventId
⋮----
"""Store an event and return its ID."""
⋮----
event_id = str(self._event_id_counter)
⋮----
"""Replay events after the specified ID."""
# Find the index of the last event ID
start_index = None
⋮----
start_index = i + 1
⋮----
# If event ID not found, start from beginning
start_index = 0
⋮----
stream_id = None
# Replay events
⋮----
# Capture the stream ID from the first replayed event
⋮----
stream_id = self._events[start_index][0]
⋮----
# Test server implementation that follows MCP protocol
class ServerTest(Server)
⋮----
@self.read_resource()
        async def handle_read_resource(uri: AnyUrl) -> str | bytes
⋮----
# Simulate a slow resource
⋮----
@self.list_tools()
        async def handle_list_tools() -> list[Tool]
⋮----
@self.call_tool()
        async def handle_call_tool(name: str, args: dict) -> list[TextContent]
⋮----
ctx = self.request_context
⋮----
# When the tool is called, send a notification to test GET stream
⋮----
# Send notifications that are part of the response stream
# This simulates a long-running tool that sends logs
⋮----
related_request_id=ctx.request_id,  # need for stream association
⋮----
# Test sampling by requesting the client to sample a message
sampling_result = await ctx.session.create_message(
⋮----
# Return the sampling result in the tool response
response = sampling_result.content.text if sampling_result.content.type == "text" else None
⋮----
def create_app(is_json_response_enabled=False, event_store: EventStore | None = None) -> Starlette
⋮----
"""Create a Starlette application for testing using the session manager.

    Args:
        is_json_response_enabled: If True, use JSON responses instead of SSE streams.
        event_store: Optional event store for testing resumability.
    """
# Create server instance
server = ServerTest()
⋮----
# Create the session manager
security_settings = TransportSecuritySettings(
session_manager = StreamableHTTPSessionManager(
⋮----
# Create an ASGI application that uses the session manager
app = Starlette(
⋮----
def run_server(port: int, is_json_response_enabled=False, event_store: EventStore | None = None) -> None
⋮----
"""Run the test server.

    Args:
        port: Port to listen on.
        is_json_response_enabled: If True, use JSON responses instead of SSE streams.
        event_store: Optional event store for testing resumability.
    """
⋮----
app = create_app(is_json_response_enabled, event_store)
# Configure server
config = uvicorn.Config(
⋮----
# Start the server
server = uvicorn.Server(config=config)
⋮----
# This is important to catch exceptions and prevent test hangs
⋮----
# Test fixtures - using same approach as SSE tests
⋮----
@pytest.fixture
def basic_server_port() -> int
⋮----
"""Find an available port for the basic server."""
⋮----
@pytest.fixture
def json_server_port() -> int
⋮----
"""Find an available port for the JSON response server."""
⋮----
@pytest.fixture
def basic_server(basic_server_port: int) -> Generator[None, None, None]
⋮----
"""Start a basic server."""
proc = multiprocessing.Process(target=run_server, kwargs={"port": basic_server_port}, daemon=True)
⋮----
# Wait for server to be running
max_attempts = 20
attempt = 0
⋮----
# Clean up
⋮----
@pytest.fixture
def event_store() -> SimpleEventStore
⋮----
"""Create a test event store."""
⋮----
@pytest.fixture
def event_server_port() -> int
⋮----
"""Find an available port for the event store server."""
⋮----
"""Start a server with event store enabled."""
proc = multiprocessing.Process(
⋮----
@pytest.fixture
def json_response_server(json_server_port: int) -> Generator[None, None, None]
⋮----
"""Start a server with JSON response enabled."""
⋮----
@pytest.fixture
def basic_server_url(basic_server_port: int) -> str
⋮----
"""Get the URL for the basic test server."""
⋮----
@pytest.fixture
def json_server_url(json_server_port: int) -> str
⋮----
"""Get the URL for the JSON response test server."""
⋮----
# Basic request validation tests
def test_accept_header_validation(basic_server, basic_server_url)
⋮----
"""Test that Accept header is properly validated."""
# Test without Accept header
response = requests.post(
⋮----
def test_content_type_validation(basic_server, basic_server_url)
⋮----
"""Test that Content-Type header is properly validated."""
# Test with incorrect Content-Type
⋮----
def test_json_validation(basic_server, basic_server_url)
⋮----
"""Test that JSON content is properly validated."""
# Test with invalid JSON
⋮----
def test_json_parsing(basic_server, basic_server_url)
⋮----
"""Test that JSON content is properly parse."""
# Test with valid JSON but invalid JSON-RPC
⋮----
def test_method_not_allowed(basic_server, basic_server_url)
⋮----
"""Test that unsupported HTTP methods are rejected."""
# Test with unsupported method (PUT)
response = requests.put(
⋮----
def test_session_validation(basic_server, basic_server_url)
⋮----
"""Test session ID validation."""
# session_id not used directly in this test
⋮----
# Test without session ID
⋮----
def test_session_id_pattern()
⋮----
"""Test that SESSION_ID_PATTERN correctly validates session IDs."""
# Valid session IDs (visible ASCII characters from 0x21 to 0x7E)
valid_session_ids = [
⋮----
# Ensure fullmatch matches too (whole string)
⋮----
# Invalid session IDs
invalid_session_ids = [
⋮----
"",  # Empty string
" test",  # Space (0x20)
"test\t",  # Tab
"test\n",  # Newline
"test\r",  # Carriage return
"test" + chr(0x7F),  # DEL character
"test" + chr(0x80),  # Extended ASCII
"test" + chr(0x00),  # Null character
"test" + chr(0x20),  # Space (0x20)
⋮----
# For invalid IDs, either match will fail or fullmatch will fail
⋮----
# If match succeeds, fullmatch should fail (partial match case)
⋮----
def test_streamable_http_transport_init_validation()
⋮----
"""Test that StreamableHTTPServerTransport validates session ID on init."""
# Valid session ID should initialize without errors
valid_transport = StreamableHTTPServerTransport(mcp_session_id="valid-id")
⋮----
# None should be accepted
none_transport = StreamableHTTPServerTransport(mcp_session_id=None)
⋮----
# Invalid session ID should raise ValueError
⋮----
# Test with control characters
⋮----
def test_session_termination(basic_server, basic_server_url)
⋮----
"""Test session termination via DELETE and subsequent request handling."""
⋮----
# Extract negotiated protocol version from SSE response
negotiated_version = extract_protocol_version_from_sse(response)
⋮----
# Now terminate the session
session_id = response.headers.get(MCP_SESSION_ID_HEADER)
response = requests.delete(
⋮----
# Try to use the terminated session
⋮----
def test_response(basic_server, basic_server_url)
⋮----
"""Test response handling for a valid request."""
mcp_url = f"{basic_server_url}/mcp"
⋮----
# Now get the session ID
⋮----
# Try to use the session with proper headers
tools_response = requests.post(
⋮----
MCP_SESSION_ID_HEADER: session_id,  # Use the session ID we got earlier
⋮----
def test_json_response(json_response_server, json_server_url)
⋮----
"""Test response handling when is_json_response_enabled is True."""
mcp_url = f"{json_server_url}/mcp"
⋮----
def test_get_sse_stream(basic_server, basic_server_url)
⋮----
"""Test establishing an SSE stream via GET request."""
# First, we need to initialize a session
⋮----
init_response = requests.post(
⋮----
# Get the session ID
session_id = init_response.headers.get(MCP_SESSION_ID_HEADER)
⋮----
init_data = None
⋮----
negotiated_version = init_data["result"]["protocolVersion"]
⋮----
# Now attempt to establish an SSE stream via GET
get_response = requests.get(
⋮----
# Verify we got a successful response with the right content type
⋮----
# Test that a second GET request gets rejected (only one stream allowed)
second_get = requests.get(
⋮----
# Should get CONFLICT (409) since there's already a stream
# Note: This might fail if the first stream fully closed before this runs,
# but generally it should work in the test environment where it runs quickly
⋮----
def test_get_validation(basic_server, basic_server_url)
⋮----
"""Test validation for GET requests."""
⋮----
response = requests.get(
⋮----
# Test with wrong Accept header
⋮----
# Client-specific fixtures
⋮----
@pytest.fixture
async def http_client(basic_server, basic_server_url)
⋮----
"""Create test client matching the SSE test pattern."""
⋮----
@pytest.fixture
async def initialized_client_session(basic_server, basic_server_url)
⋮----
"""Create initialized StreamableHTTP client session."""
⋮----
@pytest.mark.anyio
async def test_streamablehttp_client_basic_connection(basic_server, basic_server_url)
⋮----
"""Test basic client connection with initialization."""
⋮----
# Test initialization
result = await session.initialize()
⋮----
@pytest.mark.anyio
async def test_streamablehttp_client_resource_read(initialized_client_session)
⋮----
"""Test client resource read functionality."""
response = await initialized_client_session.read_resource(uri=AnyUrl("foobar://test-resource"))
⋮----
@pytest.mark.anyio
async def test_streamablehttp_client_tool_invocation(initialized_client_session)
⋮----
"""Test client tool invocation."""
# First list tools
tools = await initialized_client_session.list_tools()
⋮----
# Call the tool
result = await initialized_client_session.call_tool("test_tool", {})
⋮----
@pytest.mark.anyio
async def test_streamablehttp_client_error_handling(initialized_client_session)
⋮----
"""Test error handling in client."""
⋮----
@pytest.mark.anyio
async def test_streamablehttp_client_session_persistence(basic_server, basic_server_url)
⋮----
"""Test that session ID persists across requests."""
⋮----
# Initialize the session
⋮----
# Make multiple requests to verify session persistence
tools = await session.list_tools()
⋮----
# Read a resource
resource = await session.read_resource(uri=AnyUrl("foobar://test-persist"))
⋮----
content = resource.contents[0]
⋮----
@pytest.mark.anyio
async def test_streamablehttp_client_json_response(json_response_server, json_server_url)
⋮----
"""Test client with JSON response mode."""
⋮----
# Check tool listing
⋮----
# Call a tool and verify JSON response handling
result = await session.call_tool("test_tool", {})
⋮----
@pytest.mark.anyio
async def test_streamablehttp_client_get_stream(basic_server, basic_server_url)
⋮----
"""Test GET stream functionality for server-initiated messages."""
⋮----
notifications_received = []
⋮----
# Define message handler to capture notifications
⋮----
# Initialize the session - this triggers the GET stream setup
⋮----
# Call the special tool that sends a notification
⋮----
# Verify we received the notification
⋮----
# Verify the notification is a ResourceUpdatedNotification
resource_update_found = False
⋮----
resource_update_found = True
⋮----
@pytest.mark.anyio
async def test_streamablehttp_client_session_termination(basic_server, basic_server_url)
⋮----
"""Test client session termination functionality."""
⋮----
captured_session_id = None
⋮----
# Create the streamablehttp_client with a custom httpx client to capture headers
⋮----
captured_session_id = get_session_id()
⋮----
# Make a request to confirm session is working
⋮----
headers = {}
⋮----
# Attempt to make a request after termination
⋮----
@pytest.mark.anyio
async def test_streamablehttp_client_session_termination_204(basic_server, basic_server_url, monkeypatch)
⋮----
"""Test client session termination functionality with a 204 response.

    This test patches the httpx client to return a 204 response for DELETEs.
    """
⋮----
# Save the original delete method to restore later
original_delete = httpx.AsyncClient.delete
⋮----
# Mock the client's delete method to return a 204
async def mock_delete(self, *args, **kwargs)
⋮----
# Call the original method to get the real response
response = await original_delete(self, *args, **kwargs)
⋮----
# Create a new response with 204 status code but same headers
mocked_response = httpx.Response(
⋮----
# Apply the patch to the httpx client
⋮----
@pytest.mark.anyio
async def test_streamablehttp_client_resumption(event_server)
⋮----
"""Test client session to resume a long running tool."""
⋮----
# Variables to track the state
⋮----
captured_resumption_token = None
captured_notifications = []
tool_started = False
captured_protocol_version = None
⋮----
# Look for our special notification that indicates the tool is running
⋮----
tool_started = True
⋮----
async def on_resumption_token_update(token: str) -> None
⋮----
captured_resumption_token = token
⋮----
# First, start the client session and begin the long-running tool
⋮----
# Capture the negotiated protocol version
captured_protocol_version = result.protocolVersion
⋮----
# Start a long-running tool in a task
⋮----
async def run_tool()
⋮----
metadata = ClientMessageMetadata(
⋮----
# Wait for the tool to start and at least one notification
# and then kill the task group
⋮----
# Store pre notifications and clear the captured notifications
# for the post-resumption check
captured_notifications_pre = captured_notifications.copy()
⋮----
# Now resume the session with the same mcp-session-id and protocol version
⋮----
# Don't initialize - just use the existing session
⋮----
# Resume the tool with the resumption token
⋮----
result = await session.send_request(
⋮----
# We should get a complete result
⋮----
# We should have received the remaining notifications
⋮----
# Should not have the first notification
# Check that "Tool started" notification isn't repeated when resuming
⋮----
# there is no intersection between pre and post notifications
⋮----
@pytest.mark.anyio
async def test_streamablehttp_server_sampling(basic_server, basic_server_url)
⋮----
"""Test server-initiated sampling request through streamable HTTP transport."""
⋮----
# Variable to track if sampling callback was invoked
sampling_callback_invoked = False
captured_message_params = None
⋮----
# Define sampling callback that returns a mock response
⋮----
sampling_callback_invoked = True
captured_message_params = params
message_received = params.messages[0].content.text if params.messages[0].content.type == "text" else None
⋮----
# Create client with sampling callback
⋮----
# Call the tool that triggers server-side sampling
tool_result = await session.call_tool("test_sampling_tool", {})
⋮----
# Verify the tool result contains the expected content
⋮----
# Verify sampling callback was invoked
⋮----
# Context-aware server implementation for testing request context propagation
class ContextAwareServerTest(Server)
⋮----
# Access the request object from context
headers_info = {}
⋮----
headers_info = dict(ctx.request.headers)
⋮----
# Return full context information
context_data = {
⋮----
request = ctx.request
⋮----
# Server runner for context-aware testing
def run_context_aware_server(port: int)
⋮----
"""Run the context-aware test server."""
server = ContextAwareServerTest()
⋮----
server_instance = uvicorn.Server(
⋮----
@pytest.fixture
def context_aware_server(basic_server_port: int) -> Generator[None, None, None]
⋮----
"""Start the context-aware server in a separate process."""
proc = multiprocessing.Process(target=run_context_aware_server, args=(basic_server_port,), daemon=True)
⋮----
@pytest.mark.anyio
async def test_streamablehttp_request_context_propagation(context_aware_server: None, basic_server_url: str) -> None
⋮----
"""Test that request context is properly propagated through StreamableHTTP."""
custom_headers = {
⋮----
# Call the tool that echoes headers back
tool_result = await session.call_tool("echo_headers", {})
⋮----
# Parse the JSON response
⋮----
headers_data = json.loads(tool_result.content[0].text)
⋮----
# Verify headers were propagated
⋮----
@pytest.mark.anyio
async def test_streamablehttp_request_context_isolation(context_aware_server: None, basic_server_url: str) -> None
⋮----
"""Test that request contexts are isolated between StreamableHTTP clients."""
contexts = []
⋮----
# Create multiple clients with different headers
⋮----
headers = {
⋮----
# Call the tool that echoes context
tool_result = await session.call_tool("echo_context", {"request_id": f"request-{i}"})
⋮----
context_data = json.loads(tool_result.content[0].text)
⋮----
# Verify each request had its own context
⋮----
@pytest.mark.anyio
async def test_client_includes_protocol_version_header_after_init(context_aware_server, basic_server_url)
⋮----
"""Test that client includes mcp-protocol-version header after initialization."""
⋮----
# Initialize and get the negotiated version
init_result = await session.initialize()
negotiated_version = init_result.protocolVersion
⋮----
# Call a tool that echoes headers to verify the header is present
⋮----
# Verify protocol version header is present
⋮----
def test_server_validates_protocol_version_header(basic_server, basic_server_url)
⋮----
"""Test that server returns 400 Bad Request version if header unsupported or invalid."""
# First initialize a session to get a valid session ID
⋮----
# Test request with invalid protocol version (should fail)
⋮----
# Test request with unsupported protocol version (should fail)
⋮----
MCP_PROTOCOL_VERSION_HEADER: "1999-01-01",  # Very old unsupported version
⋮----
# Test request with valid protocol version (should succeed)
negotiated_version = extract_protocol_version_from_sse(init_response)
⋮----
def test_server_backwards_compatibility_no_protocol_version(basic_server, basic_server_url)
⋮----
"""Test server accepts requests without protocol version header."""
⋮----
# Test request without mcp-protocol-version header (backwards compatibility)
⋮----
assert response.status_code == 200  # Should succeed for backwards compatibility
⋮----
@pytest.mark.anyio
async def test_client_crash_handled(basic_server, basic_server_url)
⋮----
"""Test that cases where the client crashes are handled gracefully."""
⋮----
# Simulate bad client that crashes after init
async def bad_client()
⋮----
"""Client that triggers ClosedResourceError"""
⋮----
# Run bad client a few times to trigger the crash
⋮----
# Try a good client, it should still be able to connect and list tools
````

## File: tests/shared/test_ws.py
````python
SERVER_NAME = "test_server_for_WS"
⋮----
@pytest.fixture
def server_port() -> int
⋮----
@pytest.fixture
def server_url(server_port: int) -> str
⋮----
# Test server implementation
class ServerTest(Server)
⋮----
def __init__(self)
⋮----
@self.read_resource()
        async def handle_read_resource(uri: AnyUrl) -> str | bytes
⋮----
# Simulate a slow resource
⋮----
@self.list_tools()
        async def handle_list_tools() -> list[Tool]
⋮----
@self.call_tool()
        async def handle_call_tool(name: str, args: dict) -> list[TextContent]
⋮----
# Test fixtures
def make_server_app() -> Starlette
⋮----
"""Create test Starlette app with WebSocket transport"""
server = ServerTest()
⋮----
async def handle_ws(websocket)
⋮----
app = Starlette(
⋮----
def run_server(server_port: int) -> None
⋮----
app = make_server_app()
server = uvicorn.Server(config=uvicorn.Config(app=app, host="127.0.0.1", port=server_port, log_level="error"))
⋮----
# Give server time to start
⋮----
@pytest.fixture()
def server(server_port: int) -> Generator[None, None, None]
⋮----
proc = multiprocessing.Process(target=run_server, kwargs={"server_port": server_port}, daemon=True)
⋮----
# Wait for server to be running
max_attempts = 20
attempt = 0
⋮----
# Signal the server to stop
⋮----
@pytest.fixture()
async def initialized_ws_client_session(server, server_url: str) -> AsyncGenerator[ClientSession, None]
⋮----
"""Create and initialize a WebSocket client session"""
⋮----
# Test initialization
result = await session.initialize()
⋮----
# Test ping
ping_result = await session.send_ping()
⋮----
# Tests
⋮----
@pytest.mark.anyio
async def test_ws_client_basic_connection(server: None, server_url: str) -> None
⋮----
"""Test the WebSocket connection establishment"""
⋮----
"""Test a successful request and response via WebSocket"""
result = await initialized_ws_client_session.read_resource(AnyUrl("foobar://example"))
⋮----
"""Test exception handling in WebSocket communication"""
⋮----
"""Test timeout handling in WebSocket communication"""
# Set a very short timeout to trigger a timeout exception
⋮----
with anyio.fail_after(0.1):  # 100ms timeout
⋮----
# Now test that we can still use the session after a timeout
with anyio.fail_after(5):  # Longer timeout to allow completion
````

## File: tests/conftest.py
````python
@pytest.fixture
def anyio_backend()
````

## File: tests/test_examples.py
````python
"""Tests for example servers"""
⋮----
@pytest.mark.anyio
async def test_simple_echo()
⋮----
"""Test the simple echo server"""
⋮----
result = await client.call_tool("echo", {"text": "hello"})
⋮----
content = result.content[0]
⋮----
@pytest.mark.anyio
async def test_complex_inputs()
⋮----
"""Test the complex inputs server"""
⋮----
tank = {"shrimp": [{"name": "bob"}, {"name": "alice"}]}
result = await client.call_tool("name_shrimp", {"tank": tank, "extra_names": ["charlie"]})
⋮----
@pytest.mark.anyio
async def test_desktop(monkeypatch)
⋮----
"""Test the desktop server"""
⋮----
# Mock desktop directory listing
mock_files = [Path("/fake/path/file1.txt"), Path("/fake/path/file2.txt")]
⋮----
# Test the add function
result = await client.call_tool("add", {"a": 1, "b": 2})
⋮----
# Test the desktop resource
result = await client.read_resource(AnyUrl("dir://desktop"))
⋮----
content = result.contents[0]
⋮----
file_1 = "/fake/path/file1.txt".replace("/", "\\\\")  # might be a bug
file_2 = "/fake/path/file2.txt".replace("/", "\\\\")  # might be a bug
⋮----
# might be a bug, but the test is passing
⋮----
@pytest.mark.parametrize("example", find_examples("README.md"), ids=str)
def test_docs_examples(example: CodeExample, eval_example: EvalExample)
⋮----
ruff_ignore: list[str] = ["F841", "I001"]
⋮----
if eval_example.update_examples:  # pragma: no cover
````

## File: tests/test_types.py
````python
@pytest.mark.anyio
async def test_jsonrpc_request()
⋮----
json_data = {
⋮----
request = JSONRPCMessage.model_validate(json_data)
````

## File: .git-blame-ignore-revs
````
# Applied 120 line-length rule to all files: https://github.com/modelcontextprotocol/python-sdk/pull/856
543961968c0634e93d919d509cce23a1d6a56c21
````

## File: .gitignore
````
.DS_Store
scratch/

# Byte-compiled / optimized / DLL files
__pycache__/
*.py[cod]
*$py.class

# C extensions
*.so

# Distribution / packaging
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
share/python-wheels/
*.egg-info/
.installed.cfg
*.egg
MANIFEST

# PyInstaller
#  Usually these files are written by a python script from a template
#  before PyInstaller builds the exe, so as to inject date/other infos into it.
*.manifest
*.spec

# Installer logs
pip-log.txt
pip-delete-this-directory.txt

# Unit test / coverage reports
htmlcov/
.tox/
.nox/
.coverage
.coverage.*
.cache
nosetests.xml
coverage.xml
*.cover
*.py,cover
.hypothesis/
.pytest_cache/
cover/

# Translations
*.mo
*.pot

# Django stuff:
*.log
local_settings.py
db.sqlite3
db.sqlite3-journal

# Flask stuff:
instance/
.webassets-cache

# Scrapy stuff:
.scrapy

# Sphinx documentation
docs/_build/

# PyBuilder
.pybuilder/
target/

# Jupyter Notebook
.ipynb_checkpoints

# IPython
profile_default/
ipython_config.py

# pyenv
#   For a library or package, you might want to ignore these files since the code is
#   intended to run in multiple environments; otherwise, check them in:
# .python-version

# pipenv
#   According to pypa/pipenv#598, it is recommended to include Pipfile.lock in version control.
#   However, in case of collaboration, if having platform-specific dependencies or dependencies
#   having no cross-platform support, pipenv may install dependencies that don't work, or not
#   install all needed dependencies.
#Pipfile.lock

# poetry
#   Similar to Pipfile.lock, it is generally recommended to include poetry.lock in version control.
#   This is especially recommended for binary packages to ensure reproducibility, and is more
#   commonly ignored for libraries.
#   https://python-poetry.org/docs/basic-usage/#commit-your-poetrylock-file-to-version-control
#poetry.lock

# pdm
#   Similar to Pipfile.lock, it is generally recommended to include pdm.lock in version control.
#pdm.lock
#   pdm stores project-wide configurations in .pdm.toml, but it is recommended to not include it
#   in version control.
#   https://pdm.fming.dev/latest/usage/project/#working-with-version-control
.pdm.toml
.pdm-python
.pdm-build/

# PEP 582; used by e.g. github.com/David-OConnor/pyflow and github.com/pdm-project/pdm
__pypackages__/

# Celery stuff
celerybeat-schedule
celerybeat.pid

# SageMath parsed files
*.sage.py

# Environments
.env
.venv
env/
venv/
ENV/
env.bak/
venv.bak/

# Spyder project settings
.spyderproject
.spyproject

# Rope project settings
.ropeproject

# mkdocs documentation
/site

# mypy
.mypy_cache/
.dmypy.json
dmypy.json

# Pyre type checker
.pyre/

# pytype static type analyzer
.pytype/

# Cython debug symbols
cython_debug/

# PyCharm
#  JetBrains specific template is maintained in a separate JetBrains.gitignore that can
#  be found at https://github.com/github/gitignore/blob/main/Global/JetBrains.gitignore
#  and can be added to the global gitignore or merged into this file.  For a more nuclear
#  option (not recommended) you can uncomment the following to ignore the entire idea folder.
#.idea/

# vscode
.vscode/
.windsurfrules
**/CLAUDE.local.md
````

## File: .pre-commit-config.yaml
````yaml
fail_fast: true

repos:
  - repo: https://github.com/pre-commit/mirrors-prettier
    rev: v3.1.0
    hooks:
      - id: prettier
        types_or: [yaml, json5]

  - repo: local
    hooks:
      - id: ruff-format
        name: Ruff Format
        entry: uv run ruff
        args: [format]
        language: system
        types: [python]
        pass_filenames: false
      - id: ruff
        name: Ruff
        entry: uv run ruff
        args: ["check", "--fix", "--exit-non-zero-on-fix"]
        types: [python]
        language: system
        pass_filenames: false
      - id: pyright
        name: pyright
        entry: uv run pyright
        args: [src]
        language: system
        types: [python]
        pass_filenames: false
      - id: uv-lock-check
        name: Check uv.lock is up to date
        entry: uv lock --check
        language: system
        files: ^(pyproject\.toml|uv\.lock)$
        pass_filenames: false
````

## File: CLAUDE.md
````markdown
# Development Guidelines

This document contains critical information about working with this codebase. Follow these guidelines precisely.

## Core Development Rules

1. Package Management
   - ONLY use uv, NEVER pip
   - Installation: `uv add package`
   - Running tools: `uv run tool`
   - Upgrading: `uv add --dev package --upgrade-package package`
   - FORBIDDEN: `uv pip install`, `@latest` syntax

2. Code Quality
   - Type hints required for all code
   - Public APIs must have docstrings
   - Functions must be focused and small
   - Follow existing patterns exactly
   - Line length: 88 chars maximum

3. Testing Requirements
   - Framework: `uv run --frozen pytest`
   - Async testing: use anyio, not asyncio
   - Coverage: test edge cases and errors
   - New features require tests
   - Bug fixes require regression tests

- For commits fixing bugs or adding features based on user reports add:
  ```bash
  git commit --trailer "Reported-by:<name>"
  ```
  Where `<name>` is the name of the user.

- For commits related to a Github issue, add
  ```bash
  git commit --trailer "Github-Issue:#<number>"
  ```
- NEVER ever mention a `co-authored-by` or similar aspects. In particular, never
  mention the tool used to create the commit message or PR.

## Pull Requests

- Create a detailed message of what changed. Focus on the high level description of
  the problem it tries to solve, and how it is solved. Don't go into the specifics of the
  code unless it adds clarity.

- Always add `jerome3o-anthropic` and `jspahrsummers` as reviewer.

- NEVER ever mention a `co-authored-by` or similar aspects. In particular, never
  mention the tool used to create the commit message or PR.

## Python Tools

## Code Formatting

1. Ruff
   - Format: `uv run --frozen ruff format .`
   - Check: `uv run --frozen ruff check .`
   - Fix: `uv run --frozen ruff check . --fix`
   - Critical issues:
     - Line length (88 chars)
     - Import sorting (I001)
     - Unused imports
   - Line wrapping:
     - Strings: use parentheses
     - Function calls: multi-line with proper indent
     - Imports: split into multiple lines

2. Type Checking
   - Tool: `uv run --frozen pyright`
   - Requirements:
     - Explicit None checks for Optional
     - Type narrowing for strings
     - Version warnings can be ignored if checks pass

3. Pre-commit
   - Config: `.pre-commit-config.yaml`
   - Runs: on git commit
   - Tools: Prettier (YAML/JSON), Ruff (Python)
   - Ruff updates:
     - Check PyPI versions
     - Update config rev
     - Commit config first

## Error Resolution

1. CI Failures
   - Fix order:
     1. Formatting
     2. Type errors
     3. Linting
   - Type errors:
     - Get full line context
     - Check Optional types
     - Add type narrowing
     - Verify function signatures

2. Common Issues
   - Line length:
     - Break strings with parentheses
     - Multi-line function calls
     - Split imports
   - Types:
     - Add None checks
     - Narrow string types
     - Match existing patterns
   - Pytest:
     - If the tests aren't finding the anyio pytest mark, try adding PYTEST_DISABLE_PLUGIN_AUTOLOAD=""
       to the start of the pytest run command eg:
       `PYTEST_DISABLE_PLUGIN_AUTOLOAD="" uv run --frozen pytest`

3. Best Practices
   - Check git status before commits
   - Run formatters before type checks
   - Keep changes minimal
   - Follow existing patterns
   - Document public APIs
   - Test thoroughly
````

## File: CODE_OF_CONDUCT.md
````markdown
# Contributor Covenant Code of Conduct

## Our Pledge

We as members, contributors, and leaders pledge to make participation in our
community a harassment-free experience for everyone, regardless of age, body
size, visible or invisible disability, ethnicity, sex characteristics, gender
identity and expression, level of experience, education, socio-economic status,
nationality, personal appearance, race, religion, or sexual identity
and orientation.

We pledge to act and interact in ways that contribute to an open, welcoming,
diverse, inclusive, and healthy community.

## Our Standards

Examples of behavior that contributes to a positive environment for our
community include:

* Demonstrating empathy and kindness toward other people
* Being respectful of differing opinions, viewpoints, and experiences
* Giving and gracefully accepting constructive feedback
* Accepting responsibility and apologizing to those affected by our mistakes,
  and learning from the experience
* Focusing on what is best not just for us as individuals, but for the
  overall community

Examples of unacceptable behavior include:

* The use of sexualized language or imagery, and sexual attention or
  advances of any kind
* Trolling, insulting or derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or email
  address, without their explicit permission
* Other conduct which could reasonably be considered inappropriate in a
  professional setting

## Enforcement Responsibilities

Community leaders are responsible for clarifying and enforcing our standards of
acceptable behavior and will take appropriate and fair corrective action in
response to any behavior that they deem inappropriate, threatening, offensive,
or harmful.

Community leaders have the right and responsibility to remove, edit, or reject
comments, commits, code, wiki edits, issues, and other contributions that are
not aligned to this Code of Conduct, and will communicate reasons for moderation
decisions when appropriate.

## Scope

This Code of Conduct applies within all community spaces, and also applies when
an individual is officially representing the community in public spaces.
Examples of representing our community include using an official e-mail address,
posting via an official social media account, or acting as an appointed
representative at an online or offline event.

## Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported to the community leaders responsible for enforcement at
mcp-coc@anthropic.com.
All complaints will be reviewed and investigated promptly and fairly.

All community leaders are obligated to respect the privacy and security of the
reporter of any incident.

## Enforcement Guidelines

Community leaders will follow these Community Impact Guidelines in determining
the consequences for any action they deem in violation of this Code of Conduct:

### 1. Correction

**Community Impact**: Use of inappropriate language or other behavior deemed
unprofessional or unwelcome in the community.

**Consequence**: A private, written warning from community leaders, providing
clarity around the nature of the violation and an explanation of why the
behavior was inappropriate. A public apology may be requested.

### 2. Warning

**Community Impact**: A violation through a single incident or series
of actions.

**Consequence**: A warning with consequences for continued behavior. No
interaction with the people involved, including unsolicited interaction with
those enforcing the Code of Conduct, for a specified period of time. This
includes avoiding interactions in community spaces as well as external channels
like social media. Violating these terms may lead to a temporary or
permanent ban.

### 3. Temporary Ban

**Community Impact**: A serious violation of community standards, including
sustained inappropriate behavior.

**Consequence**: A temporary ban from any sort of interaction or public
communication with the community for a specified period of time. No public or
private interaction with the people involved, including unsolicited interaction
with those enforcing the Code of Conduct, is allowed during this period.
Violating these terms may lead to a permanent ban.

### 4. Permanent Ban

**Community Impact**: Demonstrating a pattern of violation of community
standards, including sustained inappropriate behavior,  harassment of an
individual, or aggression toward or disparagement of classes of individuals.

**Consequence**: A permanent ban from any sort of public interaction within
the community.

## Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage],
version 2.0, available at
https://www.contributor-covenant.org/version/2/0/code_of_conduct.html.

Community Impact Guidelines were inspired by [Mozilla's code of conduct
enforcement ladder](https://github.com/mozilla/diversity).

[homepage]: https://www.contributor-covenant.org

For answers to common questions about this code of conduct, see the FAQ at
https://www.contributor-covenant.org/faq. Translations are available at
https://www.contributor-covenant.org/translations.
````

## File: CONTRIBUTING.md
````markdown
# Contributing

Thank you for your interest in contributing to the MCP Python SDK! This document provides guidelines and instructions for contributing.

## Development Setup

1. Make sure you have Python 3.10+ installed
2. Install [uv](https://docs.astral.sh/uv/getting-started/installation/)
3. Fork the repository
4. Clone your fork: `git clone https://github.com/YOUR-USERNAME/python-sdk.git`
5. Install dependencies:
```bash
uv sync --frozen --all-extras --dev
```

## Development Workflow

1. Choose the correct branch for your changes:
   - For bug fixes to a released version: use the latest release branch (e.g. v1.1.x for 1.1.3)
   - For new features: use the main branch (which will become the next minor/major version)
   - If unsure, ask in an issue first

2. Create a new branch from your chosen base branch

3. Make your changes

4. Ensure tests pass:
```bash 
uv run pytest
```

5. Run type checking:
```bash
uv run pyright
```

6. Run linting:
```bash
uv run ruff check .
uv run ruff format .
```

7. Submit a pull request to the same branch you branched from

## Code Style

- We use `ruff` for linting and formatting
- Follow PEP 8 style guidelines
- Add type hints to all functions
- Include docstrings for public APIs

## Pull Request Process

1. Update documentation as needed
2. Add tests for new functionality
3. Ensure CI passes
4. Maintainers will review your code
5. Address review feedback

## Code of Conduct

Please note that this project is released with a [Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
````

## File: LICENSE
````
MIT License

Copyright (c) 2024 Anthropic, PBC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
````

## File: mkdocs.yml
````yaml
site_name: MCP Server
site_description: MCP Server
strict: true

repo_name: modelcontextprotocol/python-sdk
repo_url: https://github.com/modelcontextprotocol/python-sdk
edit_uri: edit/main/docs/
site_url: https://modelcontextprotocol.github.io/python-sdk

# TODO(Marcelo): Add Anthropic copyright?
# copyright: © Model Context Protocol 2025 to present

nav:
  - Home: index.md
  - API Reference: api.md

theme:
  name: "material"
  palette:
    - media: "(prefers-color-scheme)"
      scheme: default
      primary: black
      accent: black
      toggle:
        icon: material/lightbulb
        name: "Switch to light mode"
    - media: "(prefers-color-scheme: light)"
      scheme: default
      primary: black
      accent: black
      toggle:
        icon: material/lightbulb-outline
        name: "Switch to dark mode"
    - media: "(prefers-color-scheme: dark)"
      scheme: slate
      primary: white
      accent: white
      toggle:
        icon: material/lightbulb-auto-outline
        name: "Switch to system preference"
  features:
    - search.suggest
    - search.highlight
    - content.tabs.link
    - content.code.annotate
    - content.code.copy
    - content.code.select
    - navigation.path
    - navigation.indexes
    - navigation.sections
    - navigation.tracking
    - toc.follow
  # logo: "img/logo-white.svg"
  # TODO(Marcelo): Add a favicon.
  # favicon: "favicon.ico"

# https://www.mkdocs.org/user-guide/configuration/#validation
validation:
  omitted_files: warn
  absolute_links: warn
  unrecognized_links: warn
  anchors: warn

markdown_extensions:
  - tables
  - admonition
  - attr_list
  - md_in_html
  - pymdownx.details
  - pymdownx.caret
  - pymdownx.critic
  - pymdownx.mark
  - pymdownx.superfences
  - pymdownx.snippets
  - pymdownx.tilde
  - pymdownx.inlinehilite
  - pymdownx.highlight:
      pygments_lang_class: true
  - pymdownx.extra:
      pymdownx.superfences:
        custom_fences:
          - name: mermaid
            class: mermaid
            format: !!python/name:pymdownx.superfences.fence_code_format
  - pymdownx.emoji:
      emoji_index: !!python/name:material.extensions.emoji.twemoji
      emoji_generator: !!python/name:material.extensions.emoji.to_svg
      options:
        custom_icons:
          - docs/.overrides/.icons
  - pymdownx.tabbed:
      alternate_style: true
  - pymdownx.tasklist:
      custom_checkbox: true
  - sane_lists # this means you can start a list from any number

watch:
  - src/mcp

plugins:
  - search
  - social
  - glightbox
  - mkdocstrings:
      handlers:
        python:
          paths: [src/mcp]
          options:
            relative_crossrefs: true
            members_order: source
            separate_signature: true
            show_signature_annotations: true
            signature_crossrefs: true
            group_by_category: false
            # 3 because docs are in pages with an H2 just above them
            heading_level: 3
          import:
            - url: https://docs.python.org/3/objects.inv
            - url: https://docs.pydantic.dev/latest/objects.inv
            - url: https://typing-extensions.readthedocs.io/en/latest/objects.inv
````

## File: pyproject.toml
````toml
[project]
name = "mcp"
dynamic = ["version"]
description = "Model Context Protocol SDK"
readme = "README.md"
requires-python = ">=3.10"
authors = [{ name = "Anthropic, PBC." }]
maintainers = [
    { name = "David Soria Parra", email = "davidsp@anthropic.com" },
    { name = "Justin Spahr-Summers", email = "justin@anthropic.com" },
]
keywords = ["git", "mcp", "llm", "automation"]
license = { text = "MIT" }
classifiers = [
    "Development Status :: 4 - Beta",
    "Intended Audience :: Developers",
    "License :: OSI Approved :: MIT License",
    "Programming Language :: Python :: 3",
    "Programming Language :: Python :: 3.10",
    "Programming Language :: Python :: 3.11",
    "Programming Language :: Python :: 3.12",
    "Programming Language :: Python :: 3.13",
]
dependencies = [
    "anyio>=4.5",
    "httpx>=0.27",
    "httpx-sse>=0.4",
    "pydantic>=2.7.2,<3.0.0",
    "starlette>=0.27",
    "python-multipart>=0.0.9",
    "sse-starlette>=1.6.1",
    "pydantic-settings>=2.5.2",
    "uvicorn>=0.23.1; sys_platform != 'emscripten'",
    "jsonschema>=4.20.0",
]

[project.optional-dependencies]
rich = ["rich>=13.9.4"]
cli = ["typer>=0.12.4", "python-dotenv>=1.0.0"]
ws = ["websockets>=15.0.1"]

[project.scripts]
mcp = "mcp.cli:app [cli]"

[tool.uv]
resolution = "lowest-direct"
default-groups = ["dev", "docs"]
required-version = ">=0.7.2"

[dependency-groups]
dev = [
    "pyright>=1.1.391",
    "pytest>=8.3.4",
    "ruff>=0.8.5",
    "trio>=0.26.2",
    "pytest-flakefinder>=1.1.0",
    "pytest-xdist>=3.6.1",
    "pytest-examples>=0.0.14",
    "pytest-pretty>=1.2.0",
    "inline-snapshot>=0.23.0",
]
docs = [
    "mkdocs>=1.6.1",
    "mkdocs-glightbox>=0.4.0",
    "mkdocs-material[imaging]>=9.5.45",
    "mkdocstrings-python>=1.12.2",
]

[build-system]
requires = ["hatchling", "uv-dynamic-versioning"]
build-backend = "hatchling.build"

[tool.hatch.version]
source = "uv-dynamic-versioning"

[tool.uv-dynamic-versioning]
vcs = "git"
style = "pep440"
bump = true

[project.urls]
Homepage = "https://modelcontextprotocol.io"
Repository = "https://github.com/modelcontextprotocol/python-sdk"
Issues = "https://github.com/modelcontextprotocol/python-sdk/issues"

[tool.hatch.build.targets.wheel]
packages = ["src/mcp"]

[tool.pyright]
include = ["src/mcp", "tests", "examples/servers"]
venvPath = "."
venv = ".venv"
strict = ["src/mcp/**/*.py"]

[tool.ruff.lint]
select = ["C4", "E", "F", "I", "PERF", "UP"]
ignore = ["PERF203"]

[tool.ruff]
line-length = 120
target-version = "py310"

[tool.ruff.lint.per-file-ignores]
"__init__.py" = ["F401"]
"tests/server/fastmcp/test_func_metadata.py" = ["E501"]

[tool.uv.workspace]
members = ["examples/servers/*"]

[tool.uv.sources]
mcp = { workspace = true }

[tool.pytest.ini_options]
log_cli = true
xfail_strict = true
addopts = """
    --color=yes
    --capture=fd
    --numprocesses auto
"""
filterwarnings = [
    "error",
    # This should be fixed on Uvicorn's side.
    "ignore::DeprecationWarning:websockets",
    "ignore:websockets.server.WebSocketServerProtocol is deprecated:DeprecationWarning",
    "ignore:Returning str or bytes.*:DeprecationWarning:mcp.server.lowlevel"
]
````

## File: README.md
````markdown
# MCP Python SDK

<div align="center">

<strong>Python implementation of the Model Context Protocol (MCP)</strong>

[![PyPI][pypi-badge]][pypi-url]
[![MIT licensed][mit-badge]][mit-url]
[![Python Version][python-badge]][python-url]
[![Documentation][docs-badge]][docs-url]
[![Specification][spec-badge]][spec-url]
[![GitHub Discussions][discussions-badge]][discussions-url]

</div>

<!-- omit in toc -->
## Table of Contents

- [MCP Python SDK](#mcp-python-sdk)
  - [Overview](#overview)
  - [Installation](#installation)
    - [Adding MCP to your python project](#adding-mcp-to-your-python-project)
    - [Running the standalone MCP development tools](#running-the-standalone-mcp-development-tools)
  - [Quickstart](#quickstart)
  - [What is MCP?](#what-is-mcp)
  - [Core Concepts](#core-concepts)
    - [Server](#server)
    - [Resources](#resources)
    - [Tools](#tools)
      - [Structured Output](#structured-output)
    - [Prompts](#prompts)
    - [Images](#images)
    - [Context](#context)
    - [Completions](#completions)
    - [Elicitation](#elicitation)
    - [Authentication](#authentication)
  - [Running Your Server](#running-your-server)
    - [Development Mode](#development-mode)
    - [Claude Desktop Integration](#claude-desktop-integration)
    - [Direct Execution](#direct-execution)
    - [Mounting to an Existing ASGI Server](#mounting-to-an-existing-asgi-server)
  - [Examples](#examples)
    - [Echo Server](#echo-server)
    - [SQLite Explorer](#sqlite-explorer)
  - [Advanced Usage](#advanced-usage)
    - [Low-Level Server](#low-level-server)
    - [Writing MCP Clients](#writing-mcp-clients)
    - [MCP Primitives](#mcp-primitives)
    - [Server Capabilities](#server-capabilities)
  - [Documentation](#documentation)
  - [Contributing](#contributing)
  - [License](#license)

[pypi-badge]: https://img.shields.io/pypi/v/mcp.svg
[pypi-url]: https://pypi.org/project/mcp/
[mit-badge]: https://img.shields.io/pypi/l/mcp.svg
[mit-url]: https://github.com/modelcontextprotocol/python-sdk/blob/main/LICENSE
[python-badge]: https://img.shields.io/pypi/pyversions/mcp.svg
[python-url]: https://www.python.org/downloads/
[docs-badge]: https://img.shields.io/badge/docs-modelcontextprotocol.io-blue.svg
[docs-url]: https://modelcontextprotocol.io
[spec-badge]: https://img.shields.io/badge/spec-spec.modelcontextprotocol.io-blue.svg
[spec-url]: https://spec.modelcontextprotocol.io
[discussions-badge]: https://img.shields.io/github/discussions/modelcontextprotocol/python-sdk
[discussions-url]: https://github.com/modelcontextprotocol/python-sdk/discussions

## Overview

The Model Context Protocol allows applications to provide context for LLMs in a standardized way, separating the concerns of providing context from the actual LLM interaction. This Python SDK implements the full MCP specification, making it easy to:

- Build MCP clients that can connect to any MCP server
- Create MCP servers that expose resources, prompts and tools
- Use standard transports like stdio, SSE, and Streamable HTTP
- Handle all MCP protocol messages and lifecycle events

## Installation

### Adding MCP to your python project

We recommend using [uv](https://docs.astral.sh/uv/) to manage your Python projects.

If you haven't created a uv-managed project yet, create one:

   ```bash
   uv init mcp-server-demo
   cd mcp-server-demo
   ```

   Then add MCP to your project dependencies:

   ```bash
   uv add "mcp[cli]"
   ```

Alternatively, for projects using pip for dependencies:
```bash
pip install "mcp[cli]"
```

### Running the standalone MCP development tools

To run the mcp command with uv:

```bash
uv run mcp
```

## Quickstart

Let's create a simple MCP server that exposes a calculator tool and some data:

```python
# server.py
from mcp.server.fastmcp import FastMCP

# Create an MCP server
mcp = FastMCP("Demo")


# Add an addition tool
@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b


# Add a dynamic greeting resource
@mcp.resource("greeting://{name}")
def get_greeting(name: str) -> str:
    """Get a personalized greeting"""
    return f"Hello, {name}!"
```

You can install this server in [Claude Desktop](https://claude.ai/download) and interact with it right away by running:
```bash
mcp install server.py
```

Alternatively, you can test it with the MCP Inspector:
```bash
mcp dev server.py
```

## What is MCP?

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io) lets you build servers that expose data and functionality to LLM applications in a secure, standardized way. Think of it like a web API, but specifically designed for LLM interactions. MCP servers can:

- Expose data through **Resources** (think of these sort of like GET endpoints; they are used to load information into the LLM's context)
- Provide functionality through **Tools** (sort of like POST endpoints; they are used to execute code or otherwise produce a side effect)
- Define interaction patterns through **Prompts** (reusable templates for LLM interactions)
- And more!

## Core Concepts

### Server

The FastMCP server is your core interface to the MCP protocol. It handles connection management, protocol compliance, and message routing:

```python
# Add lifespan support for startup/shutdown with strong typing
from contextlib import asynccontextmanager
from collections.abc import AsyncIterator
from dataclasses import dataclass

from fake_database import Database  # Replace with your actual DB type

from mcp.server.fastmcp import FastMCP

# Create a named server
mcp = FastMCP("My App")

# Specify dependencies for deployment and development
mcp = FastMCP("My App", dependencies=["pandas", "numpy"])


@dataclass
class AppContext:
    db: Database


@asynccontextmanager
async def app_lifespan(server: FastMCP) -> AsyncIterator[AppContext]:
    """Manage application lifecycle with type-safe context"""
    # Initialize on startup
    db = await Database.connect()
    try:
        yield AppContext(db=db)
    finally:
        # Cleanup on shutdown
        await db.disconnect()


# Pass lifespan to server
mcp = FastMCP("My App", lifespan=app_lifespan)


# Access type-safe lifespan context in tools
@mcp.tool()
def query_db() -> str:
    """Tool that uses initialized resources"""
    ctx = mcp.get_context()
    db = ctx.request_context.lifespan_context["db"]
    return db.query()
```

### Resources

Resources are how you expose data to LLMs. They're similar to GET endpoints in a REST API - they provide data but shouldn't perform significant computation or have side effects:

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("My App")


@mcp.resource("config://app", title="Application Configuration")
def get_config() -> str:
    """Static configuration data"""
    return "App configuration here"


@mcp.resource("users://{user_id}/profile", title="User Profile")
def get_user_profile(user_id: str) -> str:
    """Dynamic user data"""
    return f"Profile data for user {user_id}"
```

### Tools

Tools let LLMs take actions through your server. Unlike resources, tools are expected to perform computation and have side effects:

```python
import httpx
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("My App")


@mcp.tool(title="BMI Calculator")
def calculate_bmi(weight_kg: float, height_m: float) -> float:
    """Calculate BMI given weight in kg and height in meters"""
    return weight_kg / (height_m**2)


@mcp.tool(title="Weather Fetcher")
async def fetch_weather(city: str) -> str:
    """Fetch current weather for a city"""
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://api.weather.com/{city}")
        return response.text
```

#### Structured Output

Tools will return structured results by default, if their return type
annotation is compatible. Otherwise, they will return unstructured results. 

Structured output supports these return types:
- Pydantic models (BaseModel subclasses)
- TypedDicts
- Dataclasses and other classes with type hints
- `dict[str, T]` (where T is any JSON-serializable type)
- Primitive types (str, int, float, bool, bytes, None) - wrapped in `{"result": value}`
- Generic types (list, tuple, Union, Optional, etc.) - wrapped in `{"result": value}`

Classes without type hints cannot be serialized for structured output. Only
classes with properly annotated attributes will be converted to Pydantic models
for schema generation and validation.

Structured results are automatically validated against the output schema 
generated from the annotation. This ensures the tool returns well-typed, 
validated data that clients can easily process.

**Note:** For backward compatibility, unstructured results are also
returned. Unstructured results are provided for backward compatibility 
with previous versions of the MCP specification, and are quirks-compatible
with previous versions of FastMCP in the current version of the SDK.

**Note:** In cases where a tool function's return type annotation 
causes the tool to be classified as structured _and this is undesirable_, 
the  classification can be suppressed by passing `structured_output=False`
to the `@tool` decorator.

```python
from mcp.server.fastmcp import FastMCP
from pydantic import BaseModel, Field
from typing import TypedDict

mcp = FastMCP("Weather Service")


# Using Pydantic models for rich structured data
class WeatherData(BaseModel):
    temperature: float = Field(description="Temperature in Celsius")
    humidity: float = Field(description="Humidity percentage")
    condition: str
    wind_speed: float


@mcp.tool()
def get_weather(city: str) -> WeatherData:
    """Get structured weather data"""
    return WeatherData(
        temperature=22.5, humidity=65.0, condition="partly cloudy", wind_speed=12.3
    )


# Using TypedDict for simpler structures
class LocationInfo(TypedDict):
    latitude: float
    longitude: float
    name: str


@mcp.tool()
def get_location(address: str) -> LocationInfo:
    """Get location coordinates"""
    return LocationInfo(latitude=51.5074, longitude=-0.1278, name="London, UK")


# Using dict[str, Any] for flexible schemas
@mcp.tool()
def get_statistics(data_type: str) -> dict[str, float]:
    """Get various statistics"""
    return {"mean": 42.5, "median": 40.0, "std_dev": 5.2}


# Ordinary classes with type hints work for structured output
class UserProfile:
    name: str
    age: int
    email: str | None = None

    def __init__(self, name: str, age: int, email: str | None = None):
        self.name = name
        self.age = age
        self.email = email


@mcp.tool()
def get_user(user_id: str) -> UserProfile:
    """Get user profile - returns structured data"""
    return UserProfile(name="Alice", age=30, email="alice@example.com")


# Classes WITHOUT type hints cannot be used for structured output
class UntypedConfig:
    def __init__(self, setting1, setting2):
        self.setting1 = setting1
        self.setting2 = setting2


@mcp.tool()
def get_config() -> UntypedConfig:
    """This returns unstructured output - no schema generated"""
    return UntypedConfig("value1", "value2")


# Lists and other types are wrapped automatically
@mcp.tool()
def list_cities() -> list[str]:
    """Get a list of cities"""
    return ["London", "Paris", "Tokyo"]
    # Returns: {"result": ["London", "Paris", "Tokyo"]}


@mcp.tool()
def get_temperature(city: str) -> float:
    """Get temperature as a simple float"""
    return 22.5
    # Returns: {"result": 22.5}
```

### Prompts

Prompts are reusable templates that help LLMs interact with your server effectively:

```python
from mcp.server.fastmcp import FastMCP
from mcp.server.fastmcp.prompts import base

mcp = FastMCP("My App")


@mcp.prompt(title="Code Review")
def review_code(code: str) -> str:
    return f"Please review this code:\n\n{code}"


@mcp.prompt(title="Debug Assistant")
def debug_error(error: str) -> list[base.Message]:
    return [
        base.UserMessage("I'm seeing this error:"),
        base.UserMessage(error),
        base.AssistantMessage("I'll help debug that. What have you tried so far?"),
    ]
```

### Images

FastMCP provides an `Image` class that automatically handles image data:

```python
from mcp.server.fastmcp import FastMCP, Image
from PIL import Image as PILImage

mcp = FastMCP("My App")


@mcp.tool()
def create_thumbnail(image_path: str) -> Image:
    """Create a thumbnail from an image"""
    img = PILImage.open(image_path)
    img.thumbnail((100, 100))
    return Image(data=img.tobytes(), format="png")
```

### Context

The Context object gives your tools and resources access to MCP capabilities:

```python
from mcp.server.fastmcp import FastMCP, Context

mcp = FastMCP("My App")


@mcp.tool()
async def long_task(files: list[str], ctx: Context) -> str:
    """Process multiple files with progress tracking"""
    for i, file in enumerate(files):
        ctx.info(f"Processing {file}")
        await ctx.report_progress(i, len(files))
        data, mime_type = await ctx.read_resource(f"file://{file}")
    return "Processing complete"
```

### Completions

MCP supports providing completion suggestions for prompt arguments and resource template parameters. With the context parameter, servers can provide completions based on previously resolved values:

Client usage:
```python
from mcp.client.session import ClientSession
from mcp.types import ResourceTemplateReference


async def use_completion(session: ClientSession):
    # Complete without context
    result = await session.complete(
        ref=ResourceTemplateReference(
            type="ref/resource", uri="github://repos/{owner}/{repo}"
        ),
        argument={"name": "owner", "value": "model"},
    )

    # Complete with context - repo suggestions based on owner
    result = await session.complete(
        ref=ResourceTemplateReference(
            type="ref/resource", uri="github://repos/{owner}/{repo}"
        ),
        argument={"name": "repo", "value": "test"},
        context_arguments={"owner": "modelcontextprotocol"},
    )
```

Server implementation:
```python
from mcp.server import Server
from mcp.types import (
    Completion,
    CompletionArgument,
    CompletionContext,
    PromptReference,
    ResourceTemplateReference,
)

server = Server("example-server")


@server.completion()
async def handle_completion(
    ref: PromptReference | ResourceTemplateReference,
    argument: CompletionArgument,
    context: CompletionContext | None,
) -> Completion | None:
    if isinstance(ref, ResourceTemplateReference):
        if ref.uri == "github://repos/{owner}/{repo}" and argument.name == "repo":
            # Use context to provide owner-specific repos
            if context and context.arguments:
                owner = context.arguments.get("owner")
                if owner == "modelcontextprotocol":
                    repos = ["python-sdk", "typescript-sdk", "specification"]
                    # Filter based on partial input
                    filtered = [r for r in repos if r.startswith(argument.value)]
                    return Completion(values=filtered)
    return None
```
### Elicitation

Request additional information from users during tool execution:

```python
from mcp.server.fastmcp import FastMCP, Context
from mcp.server.elicitation import (
    AcceptedElicitation,
    DeclinedElicitation,
    CancelledElicitation,
)
from pydantic import BaseModel, Field

mcp = FastMCP("Booking System")


@mcp.tool()
async def book_table(date: str, party_size: int, ctx: Context) -> str:
    """Book a table with confirmation"""

    # Schema must only contain primitive types (str, int, float, bool)
    class ConfirmBooking(BaseModel):
        confirm: bool = Field(description="Confirm booking?")
        notes: str = Field(default="", description="Special requests")

    result = await ctx.elicit(
        message=f"Confirm booking for {party_size} on {date}?", schema=ConfirmBooking
    )

    match result:
        case AcceptedElicitation(data=data):
            if data.confirm:
                return f"Booked! Notes: {data.notes or 'None'}"
            return "Booking cancelled"
        case DeclinedElicitation():
            return "Booking declined"
        case CancelledElicitation():
            return "Booking cancelled"
```

The `elicit()` method returns an `ElicitationResult` with:
- `action`: "accept", "decline", or "cancel"
- `data`: The validated response (only when accepted)
- `validation_error`: Any validation error message

### Authentication

Authentication can be used by servers that want to expose tools accessing protected resources.

`mcp.server.auth` implements OAuth 2.1 resource server functionality, where MCP servers act as Resource Servers (RS) that validate tokens issued by separate Authorization Servers (AS). This follows the [MCP authorization specification](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization) and implements RFC 9728 (Protected Resource Metadata) for AS discovery.

MCP servers can use authentication by providing an implementation of the `TokenVerifier` protocol:

```python
from mcp import FastMCP
from mcp.server.auth.provider import TokenVerifier, TokenInfo
from mcp.server.auth.settings import AuthSettings


class MyTokenVerifier(TokenVerifier):
    # Implement token validation logic (typically via token introspection)
    async def verify_token(self, token: str) -> TokenInfo:
        # Verify with your authorization server
        ...


mcp = FastMCP(
    "My App",
    token_verifier=MyTokenVerifier(),
    auth=AuthSettings(
        issuer_url="https://auth.example.com",
        resource_server_url="http://localhost:3001",
        required_scopes=["mcp:read", "mcp:write"],
    ),
)
```

For a complete example with separate Authorization Server and Resource Server implementations, see [`examples/servers/simple-auth/`](examples/servers/simple-auth/).

**Architecture:**
- **Authorization Server (AS)**: Handles OAuth flows, user authentication, and token issuance
- **Resource Server (RS)**: Your MCP server that validates tokens and serves protected resources
- **Client**: Discovers AS through RFC 9728, obtains tokens, and uses them with the MCP server

See [TokenVerifier](src/mcp/server/auth/provider.py) for more details on implementing token validation.

## Running Your Server

### Development Mode

The fastest way to test and debug your server is with the MCP Inspector:

```bash
mcp dev server.py

# Add dependencies
mcp dev server.py --with pandas --with numpy

# Mount local code
mcp dev server.py --with-editable .
```

### Claude Desktop Integration

Once your server is ready, install it in Claude Desktop:

```bash
mcp install server.py

# Custom name
mcp install server.py --name "My Analytics Server"

# Environment variables
mcp install server.py -v API_KEY=abc123 -v DB_URL=postgres://...
mcp install server.py -f .env
```

### Direct Execution

For advanced scenarios like custom deployments:

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("My App")

if __name__ == "__main__":
    mcp.run()
```

Run it with:
```bash
python server.py
# or
mcp run server.py
```

Note that `mcp run` or `mcp dev` only supports server using FastMCP and not the low-level server variant.

### Streamable HTTP Transport

> **Note**: Streamable HTTP transport is superseding SSE transport for production deployments.

```python
from mcp.server.fastmcp import FastMCP

# Stateful server (maintains session state)
mcp = FastMCP("StatefulServer")

# Stateless server (no session persistence)
mcp = FastMCP("StatelessServer", stateless_http=True)

# Stateless server (no session persistence, no sse stream with supported client)
mcp = FastMCP("StatelessServer", stateless_http=True, json_response=True)

# Run server with streamable_http transport
mcp.run(transport="streamable-http")
```

You can mount multiple FastMCP servers in a FastAPI application:

```python
# echo.py
from mcp.server.fastmcp import FastMCP

mcp = FastMCP(name="EchoServer", stateless_http=True)


@mcp.tool(description="A simple echo tool")
def echo(message: str) -> str:
    return f"Echo: {message}"
```

```python
# math.py
from mcp.server.fastmcp import FastMCP

mcp = FastMCP(name="MathServer", stateless_http=True)


@mcp.tool(description="A simple add tool")
def add_two(n: int) -> int:
    return n + 2
```

```python
# main.py
import contextlib
from fastapi import FastAPI
from mcp.echo import echo
from mcp.math import math


# Create a combined lifespan to manage both session managers
@contextlib.asynccontextmanager
async def lifespan(app: FastAPI):
    async with contextlib.AsyncExitStack() as stack:
        await stack.enter_async_context(echo.mcp.session_manager.run())
        await stack.enter_async_context(math.mcp.session_manager.run())
        yield


app = FastAPI(lifespan=lifespan)
app.mount("/echo", echo.mcp.streamable_http_app())
app.mount("/math", math.mcp.streamable_http_app())
```

For low level server with Streamable HTTP implementations, see:
- Stateful server: [`examples/servers/simple-streamablehttp/`](examples/servers/simple-streamablehttp/)
- Stateless server: [`examples/servers/simple-streamablehttp-stateless/`](examples/servers/simple-streamablehttp-stateless/)

The streamable HTTP transport supports:
- Stateful and stateless operation modes
- Resumability with event stores
- JSON or SSE response formats
- Better scalability for multi-node deployments

### Mounting to an Existing ASGI Server

> **Note**: SSE transport is being superseded by [Streamable HTTP transport](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http).

By default, SSE servers are mounted at `/sse` and Streamable HTTP servers are mounted at `/mcp`. You can customize these paths using the methods described below.

You can mount the SSE server to an existing ASGI server using the `sse_app` method. This allows you to integrate the SSE server with other ASGI applications.

```python
from starlette.applications import Starlette
from starlette.routing import Mount, Host
from mcp.server.fastmcp import FastMCP


mcp = FastMCP("My App")

# Mount the SSE server to the existing ASGI server
app = Starlette(
    routes=[
        Mount('/', app=mcp.sse_app()),
    ]
)

# or dynamically mount as host
app.router.routes.append(Host('mcp.acme.corp', app=mcp.sse_app()))
```

When mounting multiple MCP servers under different paths, you can configure the mount path in several ways:

```python
from starlette.applications import Starlette
from starlette.routing import Mount
from mcp.server.fastmcp import FastMCP

# Create multiple MCP servers
github_mcp = FastMCP("GitHub API")
browser_mcp = FastMCP("Browser")
curl_mcp = FastMCP("Curl")
search_mcp = FastMCP("Search")

# Method 1: Configure mount paths via settings (recommended for persistent configuration)
github_mcp.settings.mount_path = "/github"
browser_mcp.settings.mount_path = "/browser"

# Method 2: Pass mount path directly to sse_app (preferred for ad-hoc mounting)
# This approach doesn't modify the server's settings permanently

# Create Starlette app with multiple mounted servers
app = Starlette(
    routes=[
        # Using settings-based configuration
        Mount("/github", app=github_mcp.sse_app()),
        Mount("/browser", app=browser_mcp.sse_app()),
        # Using direct mount path parameter
        Mount("/curl", app=curl_mcp.sse_app("/curl")),
        Mount("/search", app=search_mcp.sse_app("/search")),
    ]
)

# Method 3: For direct execution, you can also pass the mount path to run()
if __name__ == "__main__":
    search_mcp.run(transport="sse", mount_path="/search")
```

For more information on mounting applications in Starlette, see the [Starlette documentation](https://www.starlette.io/routing/#submounting-routes).

## Examples

### Echo Server

A simple server demonstrating resources, tools, and prompts:

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("Echo")


@mcp.resource("echo://{message}")
def echo_resource(message: str) -> str:
    """Echo a message as a resource"""
    return f"Resource echo: {message}"


@mcp.tool()
def echo_tool(message: str) -> str:
    """Echo a message as a tool"""
    return f"Tool echo: {message}"


@mcp.prompt()
def echo_prompt(message: str) -> str:
    """Create an echo prompt"""
    return f"Please process this message: {message}"
```

### SQLite Explorer

A more complex example showing database integration:

```python
import sqlite3

from mcp.server.fastmcp import FastMCP

mcp = FastMCP("SQLite Explorer")


@mcp.resource("schema://main")
def get_schema() -> str:
    """Provide the database schema as a resource"""
    conn = sqlite3.connect("database.db")
    schema = conn.execute("SELECT sql FROM sqlite_master WHERE type='table'").fetchall()
    return "\n".join(sql[0] for sql in schema if sql[0])


@mcp.tool()
def query_data(sql: str) -> str:
    """Execute SQL queries safely"""
    conn = sqlite3.connect("database.db")
    try:
        result = conn.execute(sql).fetchall()
        return "\n".join(str(row) for row in result)
    except Exception as e:
        return f"Error: {str(e)}"
```

## Advanced Usage

### Low-Level Server

For more control, you can use the low-level server implementation directly. This gives you full access to the protocol and allows you to customize every aspect of your server, including lifecycle management through the lifespan API:

```python
from contextlib import asynccontextmanager
from collections.abc import AsyncIterator

from fake_database import Database  # Replace with your actual DB type

from mcp.server import Server


@asynccontextmanager
async def server_lifespan(server: Server) -> AsyncIterator[dict]:
    """Manage server startup and shutdown lifecycle."""
    # Initialize resources on startup
    db = await Database.connect()
    try:
        yield {"db": db}
    finally:
        # Clean up on shutdown
        await db.disconnect()


# Pass lifespan to server
server = Server("example-server", lifespan=server_lifespan)


# Access lifespan context in handlers
@server.call_tool()
async def query_db(name: str, arguments: dict) -> list:
    ctx = server.request_context
    db = ctx.lifespan_context["db"]
    return await db.query(arguments["query"])
```

The lifespan API provides:
- A way to initialize resources when the server starts and clean them up when it stops
- Access to initialized resources through the request context in handlers
- Type-safe context passing between lifespan and request handlers

```python
import mcp.server.stdio
import mcp.types as types
from mcp.server.lowlevel import NotificationOptions, Server
from mcp.server.models import InitializationOptions

# Create a server instance
server = Server("example-server")


@server.list_prompts()
async def handle_list_prompts() -> list[types.Prompt]:
    return [
        types.Prompt(
            name="example-prompt",
            description="An example prompt template",
            arguments=[
                types.PromptArgument(
                    name="arg1", description="Example argument", required=True
                )
            ],
        )
    ]


@server.get_prompt()
async def handle_get_prompt(
    name: str, arguments: dict[str, str] | None
) -> types.GetPromptResult:
    if name != "example-prompt":
        raise ValueError(f"Unknown prompt: {name}")

    return types.GetPromptResult(
        description="Example prompt",
        messages=[
            types.PromptMessage(
                role="user",
                content=types.TextContent(type="text", text="Example prompt text"),
            )
        ],
    )


async def run():
    async with mcp.server.stdio.stdio_server() as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            InitializationOptions(
                server_name="example",
                server_version="0.1.0",
                capabilities=server.get_capabilities(
                    notification_options=NotificationOptions(),
                    experimental_capabilities={},
                ),
            ),
        )


if __name__ == "__main__":
    import asyncio

    asyncio.run(run())
```

Caution: The `mcp run` and `mcp dev` tool doesn't support low-level server.

#### Structured Output Support

The low-level server supports structured output for tools, allowing you to return both human-readable content and machine-readable structured data. Tools can define an `outputSchema` to validate their structured output:

```python
from types import Any

import mcp.types as types
from mcp.server.lowlevel import Server

server = Server("example-server")


@server.list_tools()
async def list_tools() -> list[types.Tool]:
    return [
        types.Tool(
            name="calculate",
            description="Perform mathematical calculations",
            inputSchema={
                "type": "object",
                "properties": {
                    "expression": {"type": "string", "description": "Math expression"}
                },
                "required": ["expression"],
            },
            outputSchema={
                "type": "object",
                "properties": {
                    "result": {"type": "number"},
                    "expression": {"type": "string"},
                },
                "required": ["result", "expression"],
            },
        )
    ]


@server.call_tool()
async def call_tool(name: str, arguments: dict[str, Any]) -> dict[str, Any]:
    if name == "calculate":
        expression = arguments["expression"]
        try:
            result = eval(expression)  # Use a safe math parser
            structured = {"result": result, "expression": expression}

            # low-level server will validate structured output against the tool's
            # output schema, and automatically serialize it into a TextContent block
            # for backwards compatibility with pre-2025-06-18 clients.
            return structured
        except Exception as e:
            raise ValueError(f"Calculation error: {str(e)}")
```

Tools can return data in three ways:
1. **Content only**: Return a list of content blocks (default behavior before spec revision 2025-06-18)
2. **Structured data only**: Return a dictionary that will be serialized to JSON (Introduced in spec revision 2025-06-18)
3. **Both**: Return a tuple of (content, structured_data) preferred option to use for backwards compatibility

When an `outputSchema` is defined, the server automatically validates the structured output against the schema. This ensures type safety and helps catch errors early.

### Writing MCP Clients

The SDK provides a high-level client interface for connecting to MCP servers using various [transports](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports):

```python
from mcp import ClientSession, StdioServerParameters, types
from mcp.client.stdio import stdio_client

# Create server parameters for stdio connection
server_params = StdioServerParameters(
    command="python",  # Executable
    args=["example_server.py"],  # Optional command line arguments
    env=None,  # Optional environment variables
)


# Optional: create a sampling callback
async def handle_sampling_message(
    message: types.CreateMessageRequestParams,
) -> types.CreateMessageResult:
    return types.CreateMessageResult(
        role="assistant",
        content=types.TextContent(
            type="text",
            text="Hello, world! from model",
        ),
        model="gpt-3.5-turbo",
        stopReason="endTurn",
    )


async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(
            read, write, sampling_callback=handle_sampling_message
        ) as session:
            # Initialize the connection
            await session.initialize()

            # List available prompts
            prompts = await session.list_prompts()

            # Get a prompt
            prompt = await session.get_prompt(
                "example-prompt", arguments={"arg1": "value"}
            )

            # List available resources
            resources = await session.list_resources()

            # List available tools
            tools = await session.list_tools()

            # Read a resource
            content, mime_type = await session.read_resource("file://some/path")

            # Call a tool
            result = await session.call_tool("tool-name", arguments={"arg1": "value"})


if __name__ == "__main__":
    import asyncio

    asyncio.run(run())
```

Clients can also connect using [Streamable HTTP transport](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http):

```python
from mcp.client.streamable_http import streamablehttp_client
from mcp import ClientSession


async def main():
    # Connect to a streamable HTTP server
    async with streamablehttp_client("example/mcp") as (
        read_stream,
        write_stream,
        _,
    ):
        # Create a session using the client streams
        async with ClientSession(read_stream, write_stream) as session:
            # Initialize the connection
            await session.initialize()
            # Call a tool
            tool_result = await session.call_tool("echo", {"message": "hello"})
```

### Client Display Utilities

When building MCP clients, the SDK provides utilities to help display human-readable names for tools, resources, and prompts:

```python
from mcp.shared.metadata_utils import get_display_name
from mcp.client.session import ClientSession


async def display_tools(session: ClientSession):
    """Display available tools with human-readable names"""
    tools_response = await session.list_tools()

    for tool in tools_response.tools:
        # get_display_name() returns the title if available, otherwise the name
        display_name = get_display_name(tool)
        print(f"Tool: {display_name}")
        if tool.description:
            print(f"   {tool.description}")


async def display_resources(session: ClientSession):
    """Display available resources with human-readable names"""
    resources_response = await session.list_resources()

    for resource in resources_response.resources:
        display_name = get_display_name(resource)
        print(f"Resource: {display_name} ({resource.uri})")
```

The `get_display_name()` function implements the proper precedence rules for displaying names:
- For tools: `title` > `annotations.title` > `name`
- For other objects: `title` > `name`

This ensures your client UI shows the most user-friendly names that servers provide.

### OAuth Authentication for Clients

The SDK includes [authorization support](https://modelcontextprotocol.io/specification/2025-03-26/basic/authorization) for connecting to protected MCP servers:

```python
from mcp.client.auth import OAuthClientProvider, TokenStorage
from mcp.client.session import ClientSession
from mcp.client.streamable_http import streamablehttp_client
from mcp.shared.auth import OAuthClientInformationFull, OAuthClientMetadata, OAuthToken


class CustomTokenStorage(TokenStorage):
    """Simple in-memory token storage implementation."""

    async def get_tokens(self) -> OAuthToken | None:
        pass

    async def set_tokens(self, tokens: OAuthToken) -> None:
        pass

    async def get_client_info(self) -> OAuthClientInformationFull | None:
        pass

    async def set_client_info(self, client_info: OAuthClientInformationFull) -> None:
        pass


async def main():
    # Set up OAuth authentication
    oauth_auth = OAuthClientProvider(
        server_url="https://api.example.com",
        client_metadata=OAuthClientMetadata(
            client_name="My Client",
            redirect_uris=["http://localhost:3000/callback"],
            grant_types=["authorization_code", "refresh_token"],
            response_types=["code"],
        ),
        storage=CustomTokenStorage(),
        redirect_handler=lambda url: print(f"Visit: {url}"),
        callback_handler=lambda: ("auth_code", None),
    )

    # Use with streamable HTTP client
    async with streamablehttp_client(
        "https://api.example.com/mcp", auth=oauth_auth
    ) as (read, write, _):
        async with ClientSession(read, write) as session:
            await session.initialize()
            # Authenticated session ready
```

For a complete working example, see [`examples/clients/simple-auth-client/`](examples/clients/simple-auth-client/).


### MCP Primitives

The MCP protocol defines three core primitives that servers can implement:

| Primitive | Control               | Description                                         | Example Use                  |
|-----------|-----------------------|-----------------------------------------------------|------------------------------|
| Prompts   | User-controlled       | Interactive templates invoked by user choice        | Slash commands, menu options |
| Resources | Application-controlled| Contextual data managed by the client application   | File contents, API responses |
| Tools     | Model-controlled      | Functions exposed to the LLM to take actions        | API calls, data updates      |

### Server Capabilities

MCP servers declare capabilities during initialization:

| Capability  | Feature Flag                 | Description                        |
|-------------|------------------------------|------------------------------------|
| `prompts`   | `listChanged`                | Prompt template management         |
| `resources` | `subscribe`<br/>`listChanged`| Resource exposure and updates      |
| `tools`     | `listChanged`                | Tool discovery and execution       |
| `logging`   | -                            | Server logging configuration       |
| `completion`| -                            | Argument completion suggestions    |

## Documentation

- [Model Context Protocol documentation](https://modelcontextprotocol.io)
- [Model Context Protocol specification](https://spec.modelcontextprotocol.io)
- [Officially supported servers](https://github.com/modelcontextprotocol/servers)

## Contributing

We are passionate about supporting contributors of all levels of experience and would love to see you get involved in the project. See the [contributing guide](CONTRIBUTING.md) to get started.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
````

## File: RELEASE.md
````markdown
# Release Process

## Bumping Dependencies

1. Change dependency version in `pyproject.toml`
2. Upgrade lock with `uv lock --resolution lowest-direct`

## Major or Minor Release

Create a GitHub release via UI with the tag being `vX.Y.Z` where `X.Y.Z` is the version,
and the release title being the same. Then ask someone to review the release.

The package version will be set automatically from the tag.
````

## File: SECURITY.md
````markdown
# Security Policy
Thank you for helping us keep the SDKs and systems they interact with secure.

## Reporting Security Issues

This SDK is maintained by [Anthropic](https://www.anthropic.com/) as part of the Model Context Protocol project.

The security of our systems and user data is Anthropic’s top priority. We appreciate the work of security researchers acting in good faith in identifying and reporting potential vulnerabilities.

Our security program is managed on HackerOne and we ask that any validated vulnerability in this functionality be reported through their [submission form](https://hackerone.com/anthropic-vdp/reports/new?type=team&report_type=vulnerability).

## Vulnerability Disclosure Program

Our Vulnerability Program Guidelines are defined on our [HackerOne program page](https://hackerone.com/anthropic-vdp).
````
