This file is a merged representation of the entire codebase, combined into a single document by Repomix.
The content has been processed where comments have been removed, empty lines have been removed, line numbers have been added, content has been formatted for parsing in markdown style, content has been compressed (code blocks are separated by ⋮---- delimiter), security check has been disabled.

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
- Code comments have been removed from supported file types
- Empty lines have been removed from all files
- Line numbers have been added to the beginning of each line
- Content has been formatted for parsing in markdown style
- Content has been compressed - code blocks are separated by ⋮---- delimiter
- Security check has been disabled - content may contain sensitive information
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.github/
  ISSUE_TEMPLATE/
    bug_report.md
    feature_request.md
  workflows/
    check-lock.yml
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
  servers/
    simple-auth/
      mcp_simple_auth/
        __init__.py
        __main__.py
        server.py
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
      models.py
      session.py
      sse.py
      stdio.py
      streamable_http_manager.py
      streamable_http.py
      streaming_asgi_transport.py
      websocket.py
    shared/
      _httpx_utils.py
      auth.py
      context.py
      exceptions.py
      memory.py
      message.py
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
      test_func_metadata.py
      test_integration.py
      test_parameter_descriptions.py
      test_server.py
      test_tool_manager.py
    test_lifespan.py
    test_lowlevel_tool_annotations.py
    test_read_resource.py
    test_session.py
    test_stdio.py
    test_streamable_http_manager.py
  shared/
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

## File: .github/ISSUE_TEMPLATE/bug_report.md
````markdown
---
name: Bug report
about: Create a report to help us improve
title: ''
labels: ''
assignees: ''

---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Desktop (please complete the following information):**
 - OS: [e.g. iOS]
 - Browser [e.g. chrome, safari]
 - Version [e.g. 22]

**Smartphone (please complete the following information):**
 - Device: [e.g. iPhone6]
 - OS: [e.g. iOS8.1]
 - Browser [e.g. stock browser, safari]
 - Version [e.g. 22]

**Additional context**
Add any other context about the problem here.
````

## File: .github/ISSUE_TEMPLATE/feature_request.md
````markdown
---
name: Feature request
about: Suggest an idea for this project
title: ''
labels: ''
assignees: ''

---

**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
````

## File: .github/workflows/check-lock.yml
````yaml
name: Check uv.lock
on:
  pull_request:
    paths:
      - "pyproject.toml"
      - "uv.lock"
  push:
    paths:
      - "pyproject.toml"
      - "uv.lock"
jobs:
  check-lock:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install uv
        run: |
          curl -LsSf https://astral.sh/uv/install.sh | sh
          echo "$HOME/.cargo/bin" >> $GITHUB_PATH
      - name: Check uv.lock is up to date
        run: uv lock --check
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
      - run: uv run --no-sync mkdocs gh-deploy --force
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
      id-token: write
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
      - run: uv run --no-sync mkdocs gh-deploy --force
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
  format:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install uv
        uses: astral-sh/setup-uv@v3
        with:
          enable-cache: true
          version: 0.7.2
      - name: Install the project
        run: uv sync --frozen --all-extras --dev --python 3.12
      - name: Run ruff format check
        run: uv run --no-sync ruff check .
  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install uv
        uses: astral-sh/setup-uv@v3
        with:
          enable-cache: true
          version: 0.7.2
      - name: Install the project
        run: uv sync --frozen --all-extras --dev --python 3.12
      - name: Run pyright
        run: uv run --no-sync pyright
  test:
    runs-on: ${{ matrix.os }}
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
        run: uv sync --frozen --all-extras --dev --python ${{ matrix.python-version }}
      - name: Run pytest
        run: uv run --no-sync pytest
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

````

## File: examples/clients/simple-auth-client/mcp_simple_auth_client/main.py
````python
class InMemoryTokenStorage(TokenStorage)
⋮----
def __init__(self)
async def get_tokens(self) -> OAuthToken | None
async def set_tokens(self, tokens: OAuthToken) -> None
async def get_client_info(self) -> OAuthClientInformationFull | None
async def set_client_info(self, client_info: OAuthClientInformationFull) -> None
class CallbackHandler(BaseHTTPRequestHandler)
⋮----
def __init__(self, request, client_address, server, callback_data)
def do_GET(self)
⋮----
parsed = urlparse(self.path)
query_params = parse_qs(parsed.query)
⋮----
def log_message(self, format, *args)
class CallbackServer
⋮----
def __init__(self, port=3000)
def _create_handler_with_data(self)
⋮----
callback_data = self.callback_data
class DataCallbackHandler(CallbackHandler)
⋮----
def __init__(self, request, client_address, server)
⋮----
def start(self)
⋮----
handler_class = self._create_handler_with_data()
⋮----
def stop(self)
def wait_for_callback(self, timeout=300)
⋮----
start_time = time.time()
⋮----
def get_state(self)
class SimpleAuthClient
⋮----
def __init__(self, server_url: str, transport_type: str = "streamable_http")
async def connect(self)
⋮----
callback_server = CallbackServer(port=3000)
⋮----
async def callback_handler() -> tuple[str, str | None]
⋮----
auth_code = callback_server.wait_for_callback(timeout=300)
⋮----
client_metadata_dict = {
async def _default_redirect_handler(authorization_url: str) -> None
oauth_auth = OAuthClientProvider(
⋮----
async def _run_session(self, read_stream, write_stream, get_session_id)
⋮----
session_id = get_session_id()
⋮----
async def list_tools(self)
⋮----
result = await self.session.list_tools()
⋮----
async def call_tool(self, tool_name: str, arguments: dict[str, Any] | None = None)
⋮----
result = await self.session.call_tool(tool_name, arguments or {})
⋮----
async def interactive_loop(self)
⋮----
command = input("mcp> ").strip()
⋮----
parts = command.split(maxsplit=2)
tool_name = parts[1] if len(parts) > 1 else ""
⋮----
arguments = {}
⋮----
arguments = json.loads(parts[2])
⋮----
async def main()
⋮----
server_url = os.getenv("MCP_SERVER_PORT", 8000)
transport_type = os.getenv("MCP_TRANSPORT_TYPE", "streamable_http")
server_url = (
⋮----
client = SimpleAuthClient(server_url, transport_type)
⋮----
def cli()
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
class Configuration
⋮----
def __init__(self) -> None
⋮----
@staticmethod
    def load_env() -> None
⋮----
@staticmethod
    def load_config(file_path: str) -> dict[str, Any]
⋮----
@property
    def llm_api_key(self) -> str
class Server
⋮----
def __init__(self, name: str, config: dict[str, Any]) -> None
async def initialize(self) -> None
⋮----
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
tools_response = await self.session.list_tools()
tools = []
⋮----
attempt = 0
⋮----
result = await self.session.call_tool(tool_name, arguments)
⋮----
async def cleanup(self) -> None
class Tool
⋮----
def format_for_llm(self) -> str
⋮----
args_desc = []
⋮----
arg_desc = (
⋮----
class LLMClient
⋮----
def __init__(self, api_key: str) -> None
def get_response(self, messages: list[dict[str, str]]) -> str
⋮----
url = "https://api.groq.com/openai/v1/chat/completions"
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
def __init__(self, servers: list[Server], llm_client: LLMClient) -> None
async def cleanup_servers(self) -> None
async def process_llm_response(self, llm_response: str) -> str
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
all_tools = []
⋮----
tools_description = "\n".join([tool.format_for_llm() for tool in all_tools])
system_message = (
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
mcp = FastMCP("Shrimp Tank")
class ShrimpTank(BaseModel)
⋮----
class Shrimp(BaseModel)
⋮----
name: Annotated[str, Field(max_length=10)]
shrimp: list[Shrimp]
````

## File: examples/fastmcp/desktop.py
````python
mcp = FastMCP("Demo")
⋮----
@mcp.resource("dir://desktop")
def desktop() -> list[str]
⋮----
desktop = Path.home() / "Desktop"
⋮----
@mcp.tool()
def add(a: int, b: int) -> int
````

## File: examples/fastmcp/echo.py
````python
mcp = FastMCP("Echo Server")
⋮----
@mcp.tool()
def echo_tool(text: str) -> str
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
MAX_DEPTH = 5
SIMILARITY_THRESHOLD = 0.7
DECAY_FACTOR = 0.99
REINFORCEMENT_FACTOR = 1.1
DEFAULT_LLM_MODEL = "openai:gpt-4o"
DEFAULT_EMBEDDING_MODEL = "text-embedding-3-small"
mcp = FastMCP(
DB_DSN = "postgresql://postgres:postgres@localhost:54320/memory_db"
PROFILE_DIR = (
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
async def get_db_pool() -> asyncpg.Pool
⋮----
async def init(conn)
pool = await asyncpg.create_pool(DB_DSN, init=init)
⋮----
class MemoryNode(BaseModel)
⋮----
id: int | None = None
content: str
summary: str = ""
importance: float = 1.0
access_count: int = 0
timestamp: float = Field(
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
def get_effective_importance(self)
async def get_embedding(text: str, deps: Deps) -> list[float]
⋮----
embedding_response = await deps.openai.embeddings.create(
⋮----
async def delete_memory(memory_id: int, deps: Deps)
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
async def display_memory_tree(deps: Deps) -> str
⋮----
result = ""
⋮----
effective_importance = row["importance"] * (
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
pool = await asyncpg.create_pool(
⋮----
pool = await asyncpg.create_pool(DB_DSN)
````

## File: examples/fastmcp/parameter_descriptions.py
````python
mcp = FastMCP("Parameter Descriptions Server")
⋮----
greeting = f"Hello {title + ' ' if title else ''}{name}!"
````

## File: examples/fastmcp/readme-quickstart.py
````python
mcp = FastMCP("Demo")
⋮----
@mcp.tool()
def add(a: int, b: int) -> int
⋮----
@mcp.resource("greeting://{name}")
def get_greeting(name: str) -> str
````

## File: examples/fastmcp/screenshot.py
````python
mcp = FastMCP("Screenshot Demo", dependencies=["pyautogui", "Pillow"])
⋮----
@mcp.tool()
def take_screenshot() -> Image
⋮----
buffer = io.BytesIO()
screenshot = pyautogui.screenshot()
````

## File: examples/fastmcp/simple_echo.py
````python
mcp = FastMCP("Echo Server")
⋮----
@mcp.tool()
def echo(text: str) -> str
````

## File: examples/fastmcp/text_me.py
````python
class SurgeSettings(BaseSettings)
⋮----
model_config: SettingsConfigDict = SettingsConfigDict(
api_key: str
account_id: str
my_phone_number: Annotated[
my_first_name: str
my_last_name: str
mcp = FastMCP("Text me")
surge_settings = SurgeSettings()
⋮----
@mcp.tool(name="textme", description="Send a text message to me")
def text_me(text_content: str) -> str
⋮----
response = client.post(
````

## File: examples/fastmcp/unicode_example.py
````python
mcp = FastMCP()
⋮----
def hello_unicode(name: str = "世界", greeting: str = "¡Hola") -> str
⋮----
@mcp.tool(description="🎨 Tool that returns a list of emoji categories")
def list_emoji_categories() -> list[str]
⋮----
@mcp.tool(description="🔤 Tool that returns text in different scripts")
def multilingual_hello() -> str
````

## File: examples/servers/simple-auth/mcp_simple_auth/__init__.py
````python

````

## File: examples/servers/simple-auth/mcp_simple_auth/__main__.py
````python

````

## File: examples/servers/simple-auth/mcp_simple_auth/server.py
````python
logger = logging.getLogger(__name__)
class ServerSettings(BaseSettings)
⋮----
model_config = SettingsConfigDict(env_prefix="MCP_GITHUB_")
host: str = "localhost"
port: int = 8000
server_url: AnyHttpUrl = AnyHttpUrl("http://localhost:8000")
github_client_id: str
github_client_secret: str
github_callback_path: str = "http://localhost:8000/github/callback"
github_auth_url: str = "https://github.com/login/oauth/authorize"
github_token_url: str = "https://github.com/login/oauth/access_token"
mcp_scope: str = "user"
github_scope: str = "read:user"
def __init__(self, **data)
class SimpleGitHubOAuthProvider(OAuthAuthorizationServerProvider)
⋮----
def __init__(self, settings: ServerSettings)
async def get_client(self, client_id: str) -> OAuthClientInformationFull | None
async def register_client(self, client_info: OAuthClientInformationFull)
⋮----
state = params.state or secrets.token_hex(16)
⋮----
auth_url = (
⋮----
async def handle_github_callback(self, code: str, state: str) -> str
⋮----
state_data = self.state_mapping.get(state)
⋮----
redirect_uri = state_data["redirect_uri"]
code_challenge = state_data["code_challenge"]
redirect_uri_provided_explicitly = (
client_id = state_data["client_id"]
⋮----
response = await client.post(
⋮----
data = response.json()
⋮----
github_token = data["access_token"]
new_code = f"mcp_{secrets.token_hex(16)}"
auth_code = AuthorizationCode(
⋮----
# Generate MCP access token
mcp_token = f"mcp_{secrets.token_hex(32)}"
# Store MCP token
⋮----
# Find GitHub token for this client
github_token = next(
⋮----
# see https://github.blog/engineering/platform-security/behind-githubs-new-authentication-token-formats/
# which you get depends on your GH app setup.
⋮----
# Store mapping between MCP token and GitHub token
⋮----
async def load_access_token(self, token: str) -> AccessToken | None
⋮----
access_token = self.tokens.get(token)
⋮----
# Check if expired
⋮----
def create_simple_mcp_server(settings: ServerSettings) -> FastMCP
⋮----
oauth_provider = SimpleGitHubOAuthProvider(settings)
auth_settings = AuthSettings(
app = FastMCP(
⋮----
@app.custom_route("/github/callback", methods=["GET"])
    async def github_callback_handler(request: Request) -> Response
⋮----
code = request.query_params.get("code")
state = request.query_params.get("state")
⋮----
redirect_uri = await oauth_provider.handle_github_callback(code, state)
⋮----
def get_github_token() -> str
⋮----
access_token = get_access_token()
⋮----
# Get GitHub token from mapping
github_token = oauth_provider.token_mapping.get(access_token.token)
⋮----
@app.tool()
    async def get_user_profile() -> dict[str, Any]
⋮----
github_token = get_github_token()
⋮----
response = await client.get(
⋮----
def main(port: int, host: str, transport: Literal["sse", "streamable-http"]) -> int
⋮----
settings = ServerSettings(host=host, port=port)
⋮----
mcp_server = create_simple_mcp_server(settings)
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
mcp-simple-auth = "mcp_simple_auth.server:main"

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
# Simple MCP Server with GitHub OAuth Authentication

This is a simple example of an MCP server with GitHub OAuth authentication. It demonstrates the essential components needed for OAuth integration with just a single tool.

This is just an example of a server that uses auth, an official GitHub mcp server is [here](https://github.com/github/github-mcp-server)

## Overview

This simple demo to show to set up a server with:
- GitHub OAuth2 authorization flow
- Single tool: `get_user_profile` to retrieve GitHub user information


## Prerequisites

1. Create a GitHub OAuth App:
   - Go to GitHub Settings > Developer settings > OAuth Apps > New OAuth App
   - Application name: Any name (e.g., "Simple MCP Auth Demo")
   - Homepage URL: `http://localhost:8000`
   - Authorization callback URL: `http://localhost:8000/github/callback`
   - Click "Register application"
   - Note down your Client ID and Client Secret

## Required Environment Variables

You MUST set these environment variables before running the server:

```bash
export MCP_GITHUB_GITHUB_CLIENT_ID="your_client_id_here"
export MCP_GITHUB_GITHUB_CLIENT_SECRET="your_client_secret_here"
```

The server will not start without these environment variables properly set.


## Running the Server

```bash
# Set environment variables first (see above)

# Run the server
uv run mcp-simple-auth
```

The server will start on `http://localhost:8000`.

### Transport Options

This server supports multiple transport protocols that can run on the same port:

#### SSE (Server-Sent Events) - Default
```bash
uv run mcp-simple-auth
# or explicitly:
uv run mcp-simple-auth --transport sse
```

SSE transport provides endpoint:
- `/sse`

#### Streamable HTTP
```bash
uv run mcp-simple-auth --transport streamable-http
```

Streamable HTTP transport provides endpoint:
- `/mcp`


This ensures backward compatibility without needing multiple server instances. When using SSE transport (`--transport sse`), only the `/sse` endpoint is available.

## Available Tool

### get_user_profile

The only tool in this simple example. Returns the authenticated user's GitHub profile information.

**Required scope**: `user`

**Returns**: GitHub user profile data including username, email, bio, etc.


## Troubleshooting

If the server fails to start, check:
1. Environment variables `MCP_GITHUB_GITHUB_CLIENT_ID` and `MCP_GITHUB_GITHUB_CLIENT_SECRET` are set
2. The GitHub OAuth app callback URL matches `http://localhost:8000/github/callback`
3. No other service is using port 8000
4. The transport specified is valid (`sse` or `streamable-http`)

You can use [Inspector](https://github.com/modelcontextprotocol/inspector) to test Auth
````

## File: examples/servers/simple-prompt/mcp_simple_prompt/__init__.py
````python

````

## File: examples/servers/simple-prompt/mcp_simple_prompt/__main__.py
````python

````

## File: examples/servers/simple-prompt/mcp_simple_prompt/server.py
````python
messages = []
⋮----
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
async def handle_sse(request)
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
async def handle_sse(request)
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

````

## File: examples/servers/simple-streamablehttp/mcp_simple_streamablehttp/event_store.py
````python
logger = logging.getLogger(__name__)
⋮----
@dataclass
class EventEntry
⋮----
event_id: EventId
stream_id: StreamId
message: JSONRPCMessage
class InMemoryEventStore(EventStore)
⋮----
def __init__(self, max_events_per_stream: int = 100)
⋮----
event_id = str(uuid4())
event_entry = EventEntry(
⋮----
oldest_event = self.streams[stream_id][0]
⋮----
last_event = self.event_index[last_event_id]
stream_id = last_event.stream_id
stream_events = self.streams.get(last_event.stream_id, deque())
found_last = False
⋮----
found_last = True
````

## File: examples/servers/simple-streamablehttp/mcp_simple_streamablehttp/server.py
````python
logger = logging.getLogger(__name__)
⋮----
app = Server("mcp-streamable-http-demo")
⋮----
ctx = app.request_context
interval = arguments.get("interval", 1.0)
count = arguments.get("count", 5)
caller = arguments.get("caller", "unknown")
⋮----
notification_msg = (
⋮----
if i < count - 1:  # Don't wait after the last notification
⋮----
@app.list_tools()
    async def list_tools() -> list[types.Tool]
event_store = InMemoryEventStore()
session_manager = StreamableHTTPSessionManager(
⋮----
@contextlib.asynccontextmanager
    async def lifespan(app: Starlette) -> AsyncIterator[None]
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

````

## File: examples/servers/simple-streamablehttp-stateless/mcp_simple_streamablehttp_stateless/server.py
````python
logger = logging.getLogger(__name__)
⋮----
app = Server("mcp-streamable-http-stateless-demo")
⋮----
ctx = app.request_context
interval = arguments.get("interval", 1.0)
count = arguments.get("count", 5)
caller = arguments.get("caller", "unknown")
⋮----
@app.list_tools()
    async def list_tools() -> list[types.Tool]
session_manager = StreamableHTTPSessionManager(
⋮----
@contextlib.asynccontextmanager
    async def lifespan(app: Starlette) -> AsyncIterator[None]
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
@app.list_tools()
    async def list_tools() -> list[types.Tool]
⋮----
sse = SseServerTransport("/messages/")
async def handle_sse(request)
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

## File: examples/README.md
````markdown
# Python SDK Examples

This folders aims to provide simple examples of using the Python SDK. Please refer to the
[servers repository](https://github.com/modelcontextprotocol/servers)
for real-world servers.
````

## File: src/mcp/cli/__init__.py
````python

````

## File: src/mcp/cli/claude.py
````python
logger = get_logger(__name__)
MCP_PACKAGE = "mcp[cli]"
def get_claude_config_path() -> Path | None
⋮----
path = Path(Path.home(), "AppData", "Roaming", "Claude")
⋮----
path = Path(Path.home(), "Library", "Application Support", "Claude")
⋮----
path = Path(
⋮----
def get_uv_path() -> str
⋮----
uv_path = shutil.which("uv")
⋮----
config_dir = get_claude_config_path()
uv_path = get_uv_path()
⋮----
config_file = config_dir / "claude_desktop_config.json"
⋮----
config = json.loads(config_file.read_text())
⋮----
existing_env = config["mcpServers"][server_name]["env"]
⋮----
env_vars = {**existing_env, **env_vars}
⋮----
env_vars = existing_env
args = ["run"]
packages = {MCP_PACKAGE}
⋮----
file_spec = f"{Path(file_path).resolve()}:{server_object}"
⋮----
file_spec = str(Path(file_spec).resolve())
⋮----
server_config: dict[str, Any] = {"command": uv_path, "args": args}
````

## File: src/mcp/cli/cli.py
````python
dotenv = None
logger = get_logger("cli")
app = typer.Typer(
def _get_npx_command()
def _parse_env_var(env_var: str) -> tuple[str, str]
⋮----
cmd = ["uv"]
⋮----
def _parse_file_path(file_spec: str) -> tuple[Path, str | None]
⋮----
has_windows_drive = len(file_spec) > 1 and file_spec[1] == ":"
# and there's actually another colon in the string after the drive letter
⋮----
file_path = Path(file_str).expanduser().resolve()
⋮----
def _import_server(file: Path, server_object: str | None = None)
⋮----
file_dir = str(file.parent)
⋮----
spec = importlib.util.spec_from_file_location("server_module", file)
⋮----
module = importlib.util.module_from_spec(spec)
⋮----
def _check_server_object(server_object: Any, object_name: str)
⋮----
server_module = importlib.import_module(module_name)
server = getattr(server_module, object_name, None)
⋮----
server = getattr(module, server_object, None)
⋮----
@app.command()
def version() -> None
⋮----
version = importlib.metadata.version("mcp")
⋮----
server = _import_server(file, server_object)
⋮----
with_packages = list(set(with_packages + server.dependencies))
uv_cmd = _build_uv_command(file_spec, with_editable, with_packages)
npx_cmd = _get_npx_command()
⋮----
shell = sys.platform == "win32"
process = subprocess.run(
⋮----
kwargs = {}
⋮----
name = server_name
server = None
⋮----
name = server.name
⋮----
name = file.stem
server_dependencies = getattr(server, "dependencies", []) if server else []
⋮----
with_packages = list(set(with_packages + server_dependencies))
env_dict: dict[str, str] | None = None
⋮----
env_dict = {}
````

## File: src/mcp/client/stdio/__init__.py
````python
DEFAULT_INHERITED_ENV_VARS = (
def get_default_environment() -> dict[str, str]
⋮----
env: dict[str, str] = {}
⋮----
value = os.environ.get(key)
⋮----
class StdioServerParameters(BaseModel)
⋮----
command: str
args: list[str] = Field(default_factory=list)
env: dict[str, str] | None = None
cwd: str | Path | None = None
encoding: str = "utf-8"
encoding_error_handler: Literal["strict", "ignore", "replace"] = "strict"
⋮----
@asynccontextmanager
async def stdio_client(server: StdioServerParameters, errlog: TextIO = sys.stderr)
⋮----
read_stream: MemoryObjectReceiveStream[SessionMessage | Exception]
read_stream_writer: MemoryObjectSendStream[SessionMessage | Exception]
write_stream: MemoryObjectSendStream[SessionMessage]
write_stream_reader: MemoryObjectReceiveStream[SessionMessage]
⋮----
command = _get_executable_command(server.command)
process = await _create_platform_compatible_process(
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
json = session_message.message.model_dump_json(
⋮----
def _get_executable_command(command: str) -> str
⋮----
process = await create_windows_process(command, args, env, errlog, cwd)
⋮----
process = await anyio.open_process(
````

## File: src/mcp/client/stdio/win32.py
````python
def get_windows_executable_command(command: str) -> str
⋮----
ext_version = f"{command}{ext}"
⋮----
# Handle file system errors during path resolution
# (permissions, broken symlinks, etc.)
⋮----
# Try with Windows-specific flags to hide console window
process = await anyio.open_process(
⋮----
# Ensure we don't create console windows for each process
⋮----
async def terminate_windows_process(process: Process)
````

## File: src/mcp/client/__main__.py
````python
logger = logging.getLogger("client")
⋮----
async def main(command_or_url: str, args: list[str], env: list[tuple[str, str]])
⋮----
env_dict = dict(env)
⋮----
server_parameters = StdioServerParameters(
⋮----
def cli()
⋮----
parser = argparse.ArgumentParser()
⋮----
args = parser.parse_args()
````

## File: src/mcp/client/auth.py
````python
logger = logging.getLogger(__name__)
class TokenStorage(Protocol)
⋮----
async def get_tokens(self) -> OAuthToken | None
async def set_tokens(self, tokens: OAuthToken) -> None
async def get_client_info(self) -> OAuthClientInformationFull | None
async def set_client_info(self, client_info: OAuthClientInformationFull) -> None
class OAuthClientProvider(httpx.Auth)
⋮----
def _generate_code_verifier(self) -> str
def _generate_code_challenge(self, code_verifier: str) -> str
⋮----
digest = hashlib.sha256(code_verifier.encode()).digest()
⋮----
def _get_authorization_base_url(self, server_url: str) -> str
⋮----
parsed = urlparse(server_url)
⋮----
async def _discover_oauth_metadata(self, server_url: str) -> OAuthMetadata | None
⋮----
auth_base_url = self._get_authorization_base_url(server_url)
url = urljoin(auth_base_url, "/.well-known/oauth-authorization-server")
headers = {"MCP-Protocol-Version": LATEST_PROTOCOL_VERSION}
⋮----
response = await client.get(url, headers=headers)
⋮----
metadata_json = response.json()
⋮----
response = await client.get(url)
⋮----
metadata = await self._discover_oauth_metadata(server_url)
⋮----
registration_url = str(metadata.registration_endpoint)
⋮----
registration_url = urljoin(auth_base_url, "/register")
⋮----
registration_data = client_metadata.model_dump(
⋮----
response = await client.post(
⋮----
response_data = response.json()
⋮----
response = yield request
⋮----
def _has_valid_token(self) -> bool
async def _validate_token_scopes(self, token_response: OAuthToken) -> None
⋮----
requested_scopes: set[str] = set()
⋮----
requested_scopes = set(self.client_metadata.scope.split())
returned_scopes = set(token_response.scope.split())
unauthorized_scopes = returned_scopes - requested_scopes
⋮----
async def initialize(self) -> None
async def _get_or_register_client(self) -> OAuthClientInformationFull
async def ensure_token(self) -> None
async def _perform_oauth_flow(self) -> None
⋮----
client_info = await self._get_or_register_client()
⋮----
auth_url_base = str(self._metadata.authorization_endpoint)
⋮----
auth_base_url = self._get_authorization_base_url(self.server_url)
auth_url_base = urljoin(auth_base_url, "/authorize")
⋮----
auth_params = {
⋮----
auth_url = f"{auth_url_base}?{urlencode(auth_params)}"
⋮----
token_url = str(self._metadata.token_endpoint)
⋮----
token_url = urljoin(auth_base_url, "/token")
token_data = {
⋮----
error_data = response.json()
error_msg = error_data.get(
⋮----
token_response = OAuthToken.model_validate(response.json())
⋮----
async def _refresh_access_token(self) -> bool
⋮----
refresh_data = {
````

## File: src/mcp/client/session_group.py
````python
class SseServerParameters(BaseModel)
⋮----
url: str
headers: dict[str, Any] | None = None
timeout: float = 5
sse_read_timeout: float = 60 * 5
class StreamableHttpParameters(BaseModel)
⋮----
timeout: timedelta = timedelta(seconds=30)
sse_read_timeout: timedelta = timedelta(seconds=60 * 5)
terminate_on_close: bool = True
ServerParameters: TypeAlias = (
class ClientSessionGroup
⋮----
class _ComponentNames(BaseModel)
⋮----
prompts: set[str] = set()
resources: set[str] = set()
tools: set[str] = set()
_prompts: dict[str, types.Prompt]
_resources: dict[str, types.Resource]
_tools: dict[str, types.Tool]
_sessions: dict[mcp.ClientSession, _ComponentNames]
_tool_to_session: dict[str, mcp.ClientSession]
_exit_stack: contextlib.AsyncExitStack
_session_exit_stacks: dict[mcp.ClientSession, contextlib.AsyncExitStack]
_ComponentNameHook: TypeAlias = Callable[[str, types.Implementation], str]
_component_name_hook: _ComponentNameHook | None
⋮----
async def __aenter__(self) -> Self
⋮----
@property
    def sessions(self) -> list[mcp.ClientSession]
⋮----
@property
    def prompts(self) -> dict[str, types.Prompt]
⋮----
@property
    def resources(self) -> dict[str, types.Resource]
⋮----
@property
    def tools(self) -> dict[str, types.Tool]
async def call_tool(self, name: str, args: dict[str, Any]) -> types.CallToolResult
⋮----
session = self._tool_to_session[name]
session_tool_name = self.tools[name].name
⋮----
async def disconnect_from_server(self, session: mcp.ClientSession) -> None
⋮----
session_known_for_components = session in self._sessions
session_known_for_stack = session in self._session_exit_stacks
⋮----
component_names = self._sessions.pop(session)
⋮----
session_stack_to_close = self._session_exit_stacks.pop(session)
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
session = await session_stack.enter_async_context(
result = await session.initialize()
# Session successfully initialized.
# Store its stack and register the stack with the main group stack.
⋮----
# session_stack itself becomes a resource managed by the
# main _exit_stack.
⋮----
# If anything during this setup fails, ensure the session-specific
# stack is closed.
⋮----
# Create a reverse index so we can find all prompts, resources, and
# tools belonging to this session. Used for removing components from
# the session group via self.disconnect_from_server.
component_names = self._ComponentNames()
# Temporary components dicts. We do not want to modify the aggregate
# lists in case of an intermediate failure.
prompts_temp: dict[str, types.Prompt] = {}
resources_temp: dict[str, types.Resource] = {}
tools_temp: dict[str, types.Tool] = {}
tool_to_session_temp: dict[str, mcp.ClientSession] = {}
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
⋮----
matching_prompts = prompts_temp.keys() & self._prompts.keys()
⋮----
matching_resources = resources_temp.keys() & self._resources.keys()
⋮----
matching_tools = tools_temp.keys() & self._tools.keys()
⋮----
def _component_name(self, name: str, server_info: types.Implementation) -> str
````

## File: src/mcp/client/session.py
````python
DEFAULT_CLIENT_INFO = types.Implementation(name="mcp", version="0.1.0")
class SamplingFnT(Protocol)
class ListRootsFnT(Protocol)
class LoggingFnT(Protocol)
class MessageHandlerFnT(Protocol)
⋮----
ClientResponse: TypeAdapter[types.ClientResult | types.ErrorData] = TypeAdapter(
class ClientSession(
⋮----
async def initialize(self) -> types.InitializeResult
⋮----
sampling = (
roots = (
result = await self.send_request(
⋮----
async def send_ping(self) -> types.EmptyResult
⋮----
async def set_logging_level(self, level: types.LoggingLevel) -> types.EmptyResult
⋮----
async def read_resource(self, uri: AnyUrl) -> types.ReadResourceResult
async def subscribe_resource(self, uri: AnyUrl) -> types.EmptyResult
async def unsubscribe_resource(self, uri: AnyUrl) -> types.EmptyResult
⋮----
async def list_prompts(self, cursor: str | None = None) -> types.ListPromptsResult
⋮----
async def list_tools(self, cursor: str | None = None) -> types.ListToolsResult
async def send_roots_list_changed(self) -> None
⋮----
ctx = RequestContext[ClientSession, Any](
⋮----
response = await self._sampling_callback(ctx, params)
client_response = ClientResponse.validate_python(response)
⋮----
response = await self._list_roots_callback(ctx)
````

## File: src/mcp/client/sse.py
````python
logger = logging.getLogger(__name__)
def remove_request_params(url: str) -> str
⋮----
read_stream: MemoryObjectReceiveStream[SessionMessage | Exception]
read_stream_writer: MemoryObjectSendStream[SessionMessage | Exception]
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
message = types.JSONRPCMessage.model_validate_json(
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
logger = logging.getLogger(__name__)
SessionMessageOrError = SessionMessage | Exception
StreamWriter = MemoryObjectSendStream[SessionMessageOrError]
StreamReader = MemoryObjectReceiveStream[SessionMessage]
GetSessionIdCallback = Callable[[], str | None]
MCP_SESSION_ID = "mcp-session-id"
LAST_EVENT_ID = "last-event-id"
CONTENT_TYPE = "content-type"
ACCEPT = "Accept"
JSON = "application/json"
SSE = "text/event-stream"
class StreamableHTTPError(Exception)
class ResumptionError(StreamableHTTPError)
⋮----
@dataclass
class RequestContext
⋮----
client: httpx.AsyncClient
headers: dict[str, str]
session_id: str | None
session_message: SessionMessage
metadata: ClientMessageMetadata | None
read_stream_writer: StreamWriter
sse_read_timeout: timedelta
class StreamableHTTPTransport
⋮----
headers = base_headers.copy()
⋮----
def _is_initialization_request(self, message: JSONRPCMessage) -> bool
def _is_initialized_notification(self, message: JSONRPCMessage) -> bool
⋮----
new_session_id = response.headers.get(MCP_SESSION_ID)
⋮----
message = JSONRPCMessage.model_validate_json(sse.data)
⋮----
session_message = SessionMessage(message)
⋮----
headers = self._update_headers_with_session(self.request_headers)
⋮----
async def _handle_resumption_request(self, ctx: RequestContext) -> None
⋮----
headers = self._update_headers_with_session(ctx.headers)
⋮----
original_request_id = None
⋮----
original_request_id = ctx.session_message.message.root.id
⋮----
is_complete = await self._handle_sse_event(
⋮----
async def _handle_post_request(self, ctx: RequestContext) -> None
⋮----
message = ctx.session_message.message
is_initialization = self._is_initialization_request(message)
⋮----
content_type = response.headers.get(CONTENT_TYPE, "").lower()
⋮----
content = await response.aread()
message = JSONRPCMessage.model_validate_json(content)
⋮----
event_source = EventSource(response)
⋮----
error_msg = f"Unexpected content type: {content_type}"
⋮----
jsonrpc_error = JSONRPCError(
session_message = SessionMessage(JSONRPCMessage(jsonrpc_error))
⋮----
message = session_message.message
metadata = (
is_resumption = bool(metadata and metadata.resumption_token)
⋮----
ctx = RequestContext(
async def handle_request_async()
⋮----
async def terminate_session(self, client: httpx.AsyncClient) -> None
⋮----
response = await client.delete(self.url, headers=headers)
⋮----
def get_session_id(self) -> str | None
⋮----
transport = StreamableHTTPTransport(url, headers, timeout, sse_read_timeout, auth)
⋮----
def start_get_stream() -> None
````

## File: src/mcp/client/websocket.py
````python
logger = logging.getLogger(__name__)
⋮----
read_stream: MemoryObjectReceiveStream[SessionMessage | Exception]
read_stream_writer: MemoryObjectSendStream[SessionMessage | Exception]
write_stream: MemoryObjectSendStream[SessionMessage]
write_stream_reader: MemoryObjectReceiveStream[SessionMessage]
⋮----
async def ws_reader()
⋮----
message = types.JSONRPCMessage.model_validate_json(raw_text)
session_message = SessionMessage(message)
⋮----
async def ws_writer()
⋮----
msg_dict = session_message.message.model_dump(
````

## File: src/mcp/server/auth/handlers/__init__.py
````python

````

## File: src/mcp/server/auth/handlers/authorize.py
````python
logger = logging.getLogger(__name__)
class AuthorizationRequest(BaseModel)
⋮----
client_id: str = Field(..., description="The client ID")
redirect_uri: AnyUrl | None = Field(
response_type: Literal["code"] = Field(
code_challenge: str = Field(..., description="PKCE code challenge")
code_challenge_method: Literal["S256"] = Field(
state: str | None = Field(None, description="Optional state parameter")
scope: str | None = Field(
class AuthorizationErrorResponse(BaseModel)
⋮----
error: AuthorizationErrorCode
error_description: str | None
error_uri: AnyUrl | None = None
state: str | None = None
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
async def handle(self, request: Request) -> Response
⋮----
state = None
redirect_uri = None
client = None
params = None
⋮----
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
error_resp = AuthorizationErrorResponse(
⋮----
# Parse request parameters
⋮----
# Convert query_params to dict for pydantic validation
params = request.query_params
⋮----
# Parse form data for POST requests
params = await request.form()
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
scopes = client.validate_scope(auth_request.scope)
⋮----
auth_params = AuthorizationParams(
````

## File: src/mcp/server/auth/handlers/metadata.py
````python
@dataclass
class MetadataHandler
⋮----
metadata: OAuthMetadata
async def handle(self, request: Request) -> Response
````

## File: src/mcp/server/auth/handlers/register.py
````python
class RegistrationRequest(RootModel[OAuthClientMetadata])
⋮----
# provider from what we use in the HTTP handler
root: OAuthClientMetadata
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
async def handle(self, request: Request) -> Response
⋮----
# Implements dynamic client registration as defined in https://datatracker.ietf.org/doc/html/rfc7591#section-3.1
⋮----
# Parse request body as JSON
body = await request.json()
client_metadata = OAuthClientMetadata.model_validate(body)
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
client_info = OAuthClientInformationFull(
````

## File: src/mcp/server/auth/handlers/revoke.py
````python
class RevocationRequest(BaseModel)
⋮----
token: str
token_type_hint: Literal["access_token", "refresh_token"] | None = None
client_id: str
client_secret: str | None
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
async def handle(self, request: Request) -> Response
⋮----
form_data = await request.form()
revocation_request = RevocationRequest.model_validate(dict(form_data))
⋮----
client = await self.client_authenticator.authenticate(
⋮----
loaders = [
⋮----
loaders = reversed(loaders)
token: None | AccessToken | RefreshToken = None
⋮----
token = await loader(revocation_request.token)
````

## File: src/mcp/server/auth/handlers/token.py
````python
class AuthorizationCodeRequest(BaseModel)
⋮----
grant_type: Literal["authorization_code"]
code: str = Field(..., description="The authorization code")
redirect_uri: AnyUrl | None = Field(
client_id: str
client_secret: str | None = None
code_verifier: str = Field(..., description="PKCE code verifier")
class RefreshTokenRequest(BaseModel)
⋮----
grant_type: Literal["refresh_token"]
refresh_token: str = Field(..., description="The refresh token")
scope: str | None = Field(None, description="Optional scope parameter")
⋮----
class TokenRequest(
⋮----
root: Annotated[
class TokenErrorResponse(BaseModel)
⋮----
error: TokenErrorCode
error_description: str | None = None
error_uri: AnyHttpUrl | None = None
class TokenSuccessResponse(RootModel[OAuthToken])
⋮----
root: OAuthToken
⋮----
@dataclass
class TokenHandler
⋮----
provider: OAuthAuthorizationServerProvider[Any, Any, Any]
client_authenticator: ClientAuthenticator
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
auth_code = await self.provider.load_authorization_code(
⋮----
# make auth codes expire after a deadline
# see https://datatracker.ietf.org/doc/html/rfc6749#section-10.5
⋮----
# verify redirect_uri doesn't change between /authorize and /tokens
⋮----
authorize_request_redirect_uri = auth_code.redirect_uri
⋮----
authorize_request_redirect_uri = None
⋮----
sha256 = hashlib.sha256(token_request.code_verifier.encode()).digest()
hashed_code_verifier = (
⋮----
tokens = await self.provider.exchange_authorization_code(
⋮----
refresh_token = await self.provider.load_refresh_token(
⋮----
# if the refresh token has expired, pretend it doesn't exist
⋮----
scopes = (
⋮----
tokens = await self.provider.exchange_refresh_token(
````

## File: src/mcp/server/auth/middleware/__init__.py
````python

````

## File: src/mcp/server/auth/middleware/auth_context.py
````python
auth_context_var = contextvars.ContextVar[AuthenticatedUser | None](
def get_access_token() -> AccessToken | None
⋮----
auth_user = auth_context_var.get()
⋮----
class AuthContextMiddleware
⋮----
def __init__(self, app: ASGIApp)
async def __call__(self, scope: Scope, receive: Receive, send: Send)
⋮----
user = scope.get("user")
⋮----
token = auth_context_var.set(user)
````

## File: src/mcp/server/auth/middleware/bearer_auth.py
````python
class AuthenticatedUser(SimpleUser)
⋮----
def __init__(self, auth_info: AccessToken)
class BearerAuthBackend(AuthenticationBackend)
⋮----
async def authenticate(self, conn: HTTPConnection)
⋮----
auth_header = next(
⋮----
token = auth_header[7:]
auth_info = await self.provider.load_access_token(token)
⋮----
class RequireAuthMiddleware
⋮----
def __init__(self, app: Any, required_scopes: list[str])
async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None
⋮----
auth_user = scope.get("user")
⋮----
auth_credentials = scope.get("auth")
````

## File: src/mcp/server/auth/middleware/client_auth.py
````python
class AuthenticationError(Exception)
⋮----
def __init__(self, message: str)
class ClientAuthenticator
⋮----
def __init__(self, provider: OAuthAuthorizationServerProvider[Any, Any, Any])
⋮----
client = await self.provider.get_client(client_id)
````

## File: src/mcp/server/auth/__init__.py
````python

````

## File: src/mcp/server/auth/errors.py
````python
def stringify_pydantic_error(validation_error: ValidationError) -> str
````

## File: src/mcp/server/auth/json_response.py
````python
class PydanticJSONResponse(JSONResponse)
⋮----
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
class AccessToken(BaseModel)
RegistrationErrorCode = Literal[
⋮----
@dataclass(frozen=True)
class RegistrationError(Exception)
⋮----
error: RegistrationErrorCode
error_description: str | None = None
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
AuthorizationCodeT = TypeVar("AuthorizationCodeT", bound=AuthorizationCode)
RefreshTokenT = TypeVar("RefreshTokenT", bound=RefreshToken)
AccessTokenT = TypeVar("AccessTokenT", bound=AccessToken)
class OAuthAuthorizationServerProvider(
⋮----
async def get_client(self, client_id: str) -> OAuthClientInformationFull | None
async def register_client(self, client_info: OAuthClientInformationFull) -> None
⋮----
async def load_access_token(self, token: str) -> AccessTokenT | None
⋮----
def construct_redirect_uri(redirect_uri_base: str, **params: str | None) -> str
⋮----
parsed_uri = urlparse(redirect_uri_base)
query_params = [(k, v) for k, vs in parse_qs(parsed_uri.query) for v in vs]
⋮----
redirect_uri = urlunparse(parsed_uri._replace(query=urlencode(query_params)))
````

## File: src/mcp/server/auth/routes.py
````python
def validate_issuer_url(url: AnyHttpUrl)
AUTHORIZATION_PATH = "/authorize"
TOKEN_PATH = "/token"
REGISTRATION_PATH = "/register"
REVOCATION_PATH = "/revoke"
⋮----
cors_app = CORSMiddleware(
⋮----
client_registration_options = (
revocation_options = revocation_options or RevocationOptions()
metadata = build_metadata(
client_authenticator = ClientAuthenticator(provider)
routes = [
⋮----
registration_handler = RegistrationHandler(
⋮----
revocation_handler = RevocationHandler(provider, client_authenticator)
⋮----
authorization_url = AnyHttpUrl(str(issuer_url).rstrip("/") + AUTHORIZATION_PATH)
token_url = AnyHttpUrl(str(issuer_url).rstrip("/") + TOKEN_PATH)
metadata = OAuthMetadata(
````

## File: src/mcp/server/auth/settings.py
````python
class ClientRegistrationOptions(BaseModel)
⋮----
enabled: bool = False
client_secret_expiry_seconds: int | None = None
valid_scopes: list[str] | None = None
default_scopes: list[str] | None = None
class RevocationOptions(BaseModel)
class AuthSettings(BaseModel)
⋮----
issuer_url: AnyHttpUrl = Field(
service_documentation_url: AnyHttpUrl | None = None
client_registration_options: ClientRegistrationOptions | None = None
revocation_options: RevocationOptions | None = None
required_scopes: list[str] | None = None
````

## File: src/mcp/server/fastmcp/prompts/__init__.py
````python
__all__ = ["Prompt", "PromptManager"]
````

## File: src/mcp/server/fastmcp/prompts/base.py
````python
CONTENT_TYPES = TextContent | ImageContent | AudioContent | EmbeddedResource
class Message(BaseModel)
⋮----
role: Literal["user", "assistant"]
content: CONTENT_TYPES
def __init__(self, content: str | CONTENT_TYPES, **kwargs: Any)
⋮----
content = TextContent(type="text", text=content)
⋮----
class UserMessage(Message)
⋮----
role: Literal["user", "assistant"] = "user"
⋮----
class AssistantMessage(Message)
⋮----
role: Literal["user", "assistant"] = "assistant"
⋮----
message_validator = TypeAdapter[UserMessage | AssistantMessage](
SyncPromptResult = (
PromptResult = SyncPromptResult | Awaitable[SyncPromptResult]
class PromptArgument(BaseModel)
⋮----
name: str = Field(description="Name of the argument")
description: str | None = Field(
required: bool = Field(
class Prompt(BaseModel)
⋮----
name: str = Field(description="Name of the prompt")
⋮----
arguments: list[PromptArgument] | None = Field(
fn: Callable[..., PromptResult | Awaitable[PromptResult]] = Field(exclude=True)
⋮----
func_name = name or fn.__name__
⋮----
parameters = TypeAdapter(fn).json_schema()
arguments: list[PromptArgument] = []
⋮----
required = param_name in parameters.get("required", [])
⋮----
fn = validate_call(fn)
⋮----
async def render(self, arguments: dict[str, Any] | None = None) -> list[Message]
⋮----
required = {arg.name for arg in self.arguments if arg.required}
provided = set(arguments or {})
missing = required - provided
⋮----
result = self.fn(**(arguments or {}))
⋮----
result = await result
⋮----
result = [result]
messages: list[Message] = []
⋮----
content = TextContent(type="text", text=msg)
⋮----
content = pydantic_core.to_json(
````

## File: src/mcp/server/fastmcp/prompts/manager.py
````python
logger = get_logger(__name__)
class PromptManager
⋮----
def __init__(self, warn_on_duplicate_prompts: bool = True)
def get_prompt(self, name: str) -> Prompt | None
def list_prompts(self) -> list[Prompt]
⋮----
existing = self._prompts.get(prompt.name)
⋮----
prompt = self.get_prompt(name)
````

## File: src/mcp/server/fastmcp/prompts/prompt_manager.py
````python
logger = get_logger(__name__)
class PromptManager
⋮----
def __init__(self, warn_on_duplicate_prompts: bool = True)
def add_prompt(self, prompt: Prompt) -> Prompt
⋮----
existing = self._prompts.get(prompt.name)
⋮----
def get_prompt(self, name: str) -> Prompt | None
def list_prompts(self) -> list[Prompt]
````

## File: src/mcp/server/fastmcp/resources/__init__.py
````python
__all__ = [
````

## File: src/mcp/server/fastmcp/resources/base.py
````python
class Resource(BaseModel, abc.ABC)
⋮----
model_config = ConfigDict(validate_default=True)
uri: Annotated[AnyUrl, UrlConstraints(host_required=False)] = Field(
name: str | None = Field(description="Name of the resource", default=None)
description: str | None = Field(
mime_type: str = Field(
⋮----
@field_validator("name", mode="before")
@classmethod
    def set_default_name(cls, name: str | None, info: ValidationInfo) -> str
⋮----
@abc.abstractmethod
    async def read(self) -> str | bytes
````

## File: src/mcp/server/fastmcp/resources/resource_manager.py
````python
logger = get_logger(__name__)
class ResourceManager
⋮----
def __init__(self, warn_on_duplicate_resources: bool = True)
def add_resource(self, resource: Resource) -> Resource
⋮----
existing = self._resources.get(str(resource.uri))
⋮----
template = ResourceTemplate.from_function(
⋮----
async def get_resource(self, uri: AnyUrl | str) -> Resource | None
⋮----
uri_str = str(uri)
⋮----
def list_resources(self) -> list[Resource]
def list_templates(self) -> list[ResourceTemplate]
````

## File: src/mcp/server/fastmcp/resources/templates.py
````python
class ResourceTemplate(BaseModel)
⋮----
uri_template: str = Field(
name: str = Field(description="Name of the resource")
description: str | None = Field(description="Description of what the resource does")
mime_type: str = Field(
fn: Callable[..., Any] = Field(exclude=True)
parameters: dict[str, Any] = Field(
⋮----
func_name = name or fn.__name__
⋮----
parameters = TypeAdapter(fn).json_schema()
fn = validate_call(fn)
⋮----
def matches(self, uri: str) -> dict[str, Any] | None
⋮----
pattern = self.uri_template.replace("{", "(?P<").replace("}", ">[^/]+)")
match = re.match(f"^{pattern}$", uri)
⋮----
async def create_resource(self, uri: str, params: dict[str, Any]) -> Resource
⋮----
result = self.fn(**params)
⋮----
result = await result
````

## File: src/mcp/server/fastmcp/resources/types.py
````python
class TextResource(Resource)
⋮----
text: str = Field(description="Text content of the resource")
async def read(self) -> str
class BinaryResource(Resource)
⋮----
data: bytes = Field(description="Binary content of the resource")
async def read(self) -> bytes
class FunctionResource(Resource)
⋮----
fn: Callable[[], Any] = Field(exclude=True)
async def read(self) -> str | bytes
⋮----
result = (
⋮----
func_name = name or fn.__name__
⋮----
fn = validate_call(fn)
⋮----
class FileResource(Resource)
⋮----
path: Path = Field(description="Path to the file")
is_binary: bool = Field(
mime_type: str = Field(
⋮----
@pydantic.field_validator("path")
@classmethod
    def validate_absolute_path(cls, path: Path) -> Path
⋮----
@pydantic.field_validator("is_binary")
@classmethod
    def set_binary_from_mime_type(cls, is_binary: bool, info: ValidationInfo) -> bool
⋮----
mime_type = info.data.get("mime_type", "text/plain")
⋮----
class HttpResource(Resource)
⋮----
url: str = Field(description="URL to fetch content from")
⋮----
response = await client.get(self.url)
⋮----
class DirectoryResource(Resource)
⋮----
path: Path = Field(description="Path to the directory")
recursive: bool = Field(
pattern: str | None = Field(
⋮----
def list_files(self) -> list[Path]
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
fn: Callable[..., Any] = Field(exclude=True)
name: str = Field(description="Name of the tool")
description: str = Field(description="Description of what the tool does")
parameters: dict[str, Any] = Field(description="JSON schema for tool parameters")
fn_metadata: FuncMetadata = Field(
is_async: bool = Field(description="Whether the tool is async")
context_kwarg: str | None = Field(
annotations: ToolAnnotations | None = Field(
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
def _is_async_callable(obj: Any) -> bool
⋮----
obj = obj.func
````

## File: src/mcp/server/fastmcp/tools/tool_manager.py
````python
logger = get_logger(__name__)
class ToolManager
⋮----
def get_tool(self, name: str) -> Tool | None
def list_tools(self) -> list[Tool]
⋮----
tool = Tool.from_function(
existing = self._tools.get(tool.name)
⋮----
tool = self.get_tool(name)
````

## File: src/mcp/server/fastmcp/utilities/__init__.py
````python

````

## File: src/mcp/server/fastmcp/utilities/func_metadata.py
````python
logger = get_logger(__name__)
class ArgModelBase(BaseModel)
⋮----
def model_dump_one_level(self) -> dict[str, Any]
⋮----
kwargs: dict[str, Any] = {}
⋮----
model_config = ConfigDict(
class FuncMetadata(BaseModel)
⋮----
arg_model: Annotated[type[ArgModelBase], WithJsonSchema(None)]
⋮----
arguments_pre_parsed = self.pre_parse_json(arguments_to_validate)
arguments_parsed_model = self.arg_model.model_validate(arguments_pre_parsed)
arguments_parsed_dict = arguments_parsed_model.model_dump_one_level()
⋮----
def pre_parse_json(self, data: dict[str, Any]) -> dict[str, Any]
⋮----
new_data = data.copy()
⋮----
pre_parsed = json.loads(data[field_name])
⋮----
sig = _get_typed_signature(func)
params = sig.parameters
dynamic_pydantic_model_params: dict[str, Any] = {}
globalns = getattr(func, "__globals__", {})
⋮----
annotation = param.annotation
⋮----
annotation = Annotated[
⋮----
field_info = FieldInfo.from_annotated_attribute(
⋮----
arguments_model = create_model(
resp = FuncMetadata(arg_model=arguments_model)
⋮----
def _get_typed_annotation(annotation: Any, globalns: dict[str, Any]) -> Any
⋮----
annotation = ForwardRef(annotation)
⋮----
def _get_typed_signature(call: Callable[..., Any]) -> inspect.Signature
⋮----
signature = inspect.signature(call)
globalns = getattr(call, "__globals__", {})
typed_params = [
typed_signature = inspect.Signature(typed_params)
````

## File: src/mcp/server/fastmcp/utilities/logging.py
````python
def get_logger(name: str) -> logging.Logger
⋮----
handlers: list[logging.Handler] = []
````

## File: src/mcp/server/fastmcp/utilities/types.py
````python
class Image
⋮----
def _get_mime_type(self) -> str
⋮----
suffix = self.path.suffix.lower()
⋮----
def to_image_content(self) -> ImageContent
⋮----
data = base64.b64encode(f.read()).decode()
⋮----
data = base64.b64encode(self.data).decode()
````

## File: src/mcp/server/fastmcp/__init__.py
````python
__version__ = version("mcp")
__all__ = ["FastMCP", "Context", "Image"]
````

## File: src/mcp/server/fastmcp/exceptions.py
````python
class FastMCPError(Exception)
class ValidationError(FastMCPError)
class ResourceError(FastMCPError)
class ToolError(FastMCPError)
class InvalidSignature(Exception)
````

## File: src/mcp/server/fastmcp/server.py
````python
logger = get_logger(__name__)
class Settings(BaseSettings, Generic[LifespanResultT])
⋮----
model_config = SettingsConfigDict(
debug: bool = False
log_level: Literal["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"] = "INFO"
host: str = "127.0.0.1"
port: int = 8000
mount_path: str = "/"
sse_path: str = "/sse"
message_path: str = "/messages/"
streamable_http_path: str = "/mcp"
json_response: bool = False
stateless_http: bool = (
warn_on_duplicate_resources: bool = True
warn_on_duplicate_tools: bool = True
warn_on_duplicate_prompts: bool = True
dependencies: list[str] = Field(
lifespan: (
auth: AuthSettings | None = None
⋮----
@asynccontextmanager
    async def wrap(s: MCPServer[LifespanResultT, Request]) -> AsyncIterator[object]
⋮----
class FastMCP
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
TRANSPORTS = Literal["stdio", "sse", "streamable-http"]
⋮----
def _setup_handlers(self) -> None
async def list_tools(self) -> list[MCPTool]
⋮----
tools = self._tool_manager.list_tools()
⋮----
def get_context(self) -> Context[ServerSession, object, Request]
⋮----
request_context = self._mcp_server.request_context
⋮----
request_context = None
⋮----
context = self.get_context()
result = await self._tool_manager.call_tool(name, arguments, context=context)
converted_result = _convert_to_content(result)
⋮----
async def list_resources(self) -> list[MCPResource]
⋮----
resources = self._resource_manager.list_resources()
⋮----
async def list_resource_templates(self) -> list[MCPResourceTemplate]
⋮----
templates = self._resource_manager.list_templates()
⋮----
async def read_resource(self, uri: AnyUrl | str) -> Iterable[ReadResourceContents]
⋮----
resource = await self._resource_manager.get_resource(uri)
⋮----
content = await resource.read()
⋮----
def decorator(fn: AnyFunction) -> AnyFunction
⋮----
def add_resource(self, resource: Resource) -> None
⋮----
has_uri_params = "{" in uri and "}" in uri
has_func_params = bool(inspect.signature(fn).parameters)
⋮----
uri_params = set(re.findall(r"{(\w+)}", uri))
func_params = set(inspect.signature(fn).parameters.keys())
⋮----
resource = FunctionResource.from_function(
⋮----
def add_prompt(self, prompt: Prompt) -> None
⋮----
def decorator(func: AnyFunction) -> AnyFunction
⋮----
prompt = Prompt.from_function(func, name=name, description=description)
⋮----
async def run_stdio_async(self) -> None
async def run_sse_async(self, mount_path: str | None = None) -> None
⋮----
starlette_app = self.sse_app(mount_path)
config = uvicorn.Config(
server = uvicorn.Server(config)
⋮----
async def run_streamable_http_async(self) -> None
⋮----
starlette_app = self.streamable_http_app()
⋮----
def _normalize_path(self, mount_path: str, endpoint: str) -> str
⋮----
mount_path = mount_path[:-1]
⋮----
endpoint = "/" + endpoint
⋮----
def sse_app(self, mount_path: str | None = None) -> Starlette
⋮----
normalized_message_endpoint = self._normalize_path(
sse = SseServerTransport(
async def handle_sse(scope: Scope, receive: Receive, send: Send)
routes: list[Route | Mount] = []
middleware: list[Middleware] = []
required_scopes = []
⋮----
required_scopes = self.settings.auth.required_scopes or []
middleware = [
⋮----
async def sse_endpoint(request: Request) -> Response
⋮----
def streamable_http_app(self) -> Starlette
async def list_prompts(self) -> list[MCPPrompt]
⋮----
prompts = self._prompt_manager.list_prompts()
⋮----
messages = await self._prompt_manager.render_prompt(name, arguments)
⋮----
result = pydantic_core.to_json(result, fallback=str, indent=2).decode()
⋮----
class Context(BaseModel, Generic[ServerSessionT, LifespanContextT, RequestT])
⋮----
_request_context: RequestContext[ServerSessionT, LifespanContextT, RequestT] | None
_fastmcp: FastMCP | None
⋮----
@property
    def fastmcp(self) -> FastMCP
⋮----
progress_token = (
⋮----
async def read_resource(self, uri: str | AnyUrl) -> Iterable[ReadResourceContents]
⋮----
@property
    def client_id(self) -> str | None
⋮----
@property
    def request_id(self) -> str
⋮----
@property
    def session(self)
async def debug(self, message: str, **extra: Any) -> None
async def info(self, message: str, **extra: Any) -> None
async def warning(self, message: str, **extra: Any) -> None
async def error(self, message: str, **extra: Any) -> None
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
content: str | bytes
mime_type: str | None = None
````

## File: src/mcp/server/lowlevel/server.py
````python
logger = logging.getLogger(__name__)
LifespanResultT = TypeVar("LifespanResultT")
RequestT = TypeVar("RequestT", default=Any)
request_ctx: contextvars.ContextVar[RequestContext[ServerSession, Any, Any]] = (
class NotificationOptions
⋮----
@asynccontextmanager
async def lifespan(server: Server[LifespanResultT, RequestT]) -> AsyncIterator[object]
class Server(Generic[LifespanResultT, RequestT])
⋮----
def pkg_version(package: str) -> str
⋮----
prompts_capability = None
resources_capability = None
tools_capability = None
logging_capability = None
⋮----
prompts_capability = types.PromptsCapability(
⋮----
resources_capability = types.ResourcesCapability(
⋮----
tools_capability = types.ToolsCapability(
⋮----
logging_capability = types.LoggingCapability()
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
⋮----
def call_tool(self)
⋮----
async def handler(req: types.CallToolRequest)
⋮----
results = await func(req.params.name, (req.params.arguments or {}))
⋮----
def progress_notification(self)
⋮----
async def handler(req: types.ProgressNotification)
⋮----
def completion(self)
⋮----
async def handler(req: types.CompleteRequest)
⋮----
completion = await func(req.params.ref, req.params.argument)
⋮----
lifespan_context = await stack.enter_async_context(self.lifespan(self))
session = await stack.enter_async_context(
⋮----
token = None
⋮----
request_data = None
⋮----
request_data = message.message_metadata.request_context
token = request_ctx.set(
response = await handler(req)
⋮----
response = err.error
⋮----
response = types.ErrorData(code=0, message=str(err), data=None)
⋮----
async def _handle_notification(self, notify: Any)
async def _ping_handler(request: types.PingRequest) -> types.ServerResult
````

## File: src/mcp/server/__init__.py
````python
__all__ = ["Server", "FastMCP", "NotificationOptions", "InitializationOptions"]
````

## File: src/mcp/server/__main__.py
````python
logger = logging.getLogger("server")
async def receive_loop(session: ServerSession)
async def main()
⋮----
version = importlib.metadata.version("mcp")
````

## File: src/mcp/server/models.py
````python
class InitializationOptions(BaseModel)
⋮----
server_name: str
server_version: str
capabilities: ServerCapabilities
instructions: str | None = None
````

## File: src/mcp/server/session.py
````python
class InitializationState(Enum)
⋮----
NotInitialized = 1
Initializing = 2
Initialized = 3
ServerSessionT = TypeVar("ServerSessionT", bound="ServerSession")
ServerRequestResponder = (
class ServerSession(
⋮----
_initialized: InitializationState = InitializationState.NotInitialized
_client_params: types.InitializeRequestParams | None = None
⋮----
@property
    def client_params(self) -> types.InitializeRequestParams | None
def check_client_capability(self, capability: types.ClientCapabilities) -> bool
⋮----
client_caps = self._client_params.capabilities
⋮----
async def _receive_loop(self) -> None
⋮----
requested_version = params.protocolVersion
⋮----
async def send_resource_updated(self, uri: AnyUrl) -> None
⋮----
async def list_roots(self) -> types.ListRootsResult
async def send_ping(self) -> types.EmptyResult
⋮----
async def send_resource_list_changed(self) -> None
async def send_tool_list_changed(self) -> None
async def send_prompt_list_changed(self) -> None
async def _handle_incoming(self, req: ServerRequestResponder) -> None
````

## File: src/mcp/server/sse.py
````python
logger = logging.getLogger(__name__)
class SseServerTransport
⋮----
_endpoint: str
_read_stream_writers: dict[UUID, MemoryObjectSendStream[SessionMessage | Exception]]
def __init__(self, endpoint: str) -> None
⋮----
@asynccontextmanager
    async def connect_sse(self, scope: Scope, receive: Receive, send: Send)
⋮----
read_stream: MemoryObjectReceiveStream[SessionMessage | Exception]
read_stream_writer: MemoryObjectSendStream[SessionMessage | Exception]
write_stream: MemoryObjectSendStream[SessionMessage]
write_stream_reader: MemoryObjectReceiveStream[SessionMessage]
⋮----
session_id = uuid4()
⋮----
root_path = scope.get("root_path", "")
full_message_path_for_client = root_path.rstrip("/") + self._endpoint
client_post_uri_data = (
⋮----
async def sse_writer()
⋮----
async def response_wrapper(scope: Scope, receive: Receive, send: Send)
⋮----
request = Request(scope, receive)
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
metadata = ServerMessageMetadata(request_context=request)
session_message = SessionMessage(message, metadata=metadata)
⋮----
response = Response("Accepted", status_code=202)
````

## File: src/mcp/server/stdio.py
````python
stdin = anyio.wrap_file(TextIOWrapper(sys.stdin.buffer, encoding="utf-8"))
⋮----
stdout = anyio.wrap_file(TextIOWrapper(sys.stdout.buffer, encoding="utf-8"))
read_stream: MemoryObjectReceiveStream[SessionMessage | Exception]
read_stream_writer: MemoryObjectSendStream[SessionMessage | Exception]
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
json = session_message.message.model_dump_json(
````

## File: src/mcp/server/streamable_http_manager.py
````python
logger = logging.getLogger(__name__)
class StreamableHTTPSessionManager
⋮----
@contextlib.asynccontextmanager
    async def run(self) -> AsyncIterator[None]
⋮----
http_transport = StreamableHTTPServerTransport(
⋮----
request = Request(scope, receive)
request_mcp_session_id = request.headers.get(MCP_SESSION_ID_HEADER)
⋮----
transport = self._server_instances[request_mcp_session_id]
⋮----
new_session_id = uuid4().hex
⋮----
response = Response(
````

## File: src/mcp/server/streamable_http.py
````python
logger = logging.getLogger(__name__)
MAXIMUM_MESSAGE_SIZE = 4 * 1024 * 1024
MCP_SESSION_ID_HEADER = "mcp-session-id"
LAST_EVENT_ID_HEADER = "last-event-id"
CONTENT_TYPE_JSON = "application/json"
CONTENT_TYPE_SSE = "text/event-stream"
GET_STREAM_KEY = "_GET_stream"
SESSION_ID_PATTERN = re.compile(r"^[\x21-\x7E]+$")
StreamId = str
EventId = str
⋮----
@dataclass
class EventMessage
⋮----
message: JSONRPCMessage
event_id: str | None = None
EventCallback = Callable[[EventMessage], Awaitable[None]]
class EventStore(ABC)
class StreamableHTTPServerTransport
⋮----
_read_stream_writer: MemoryObjectSendStream[SessionMessage | Exception] | None = (
_read_stream: MemoryObjectReceiveStream[SessionMessage | Exception] | None = None
_write_stream: MemoryObjectSendStream[SessionMessage] | None = None
_write_stream_reader: MemoryObjectReceiveStream[SessionMessage] | None = None
⋮----
response_headers = {"Content-Type": CONTENT_TYPE_JSON}
⋮----
error_response = JSONRPCError(
⋮----
def _get_session_id(self, request: Request) -> str | None
def _create_event_data(self, event_message: EventMessage) -> dict[str, str]
⋮----
event_data = {
# If an event ID was provided, include it
⋮----
async def _clean_up_memory_streams(self, request_id: RequestId) -> None
⋮----
# Close the request stream
⋮----
# Remove the request stream from the mapping
⋮----
async def handle_request(self, scope: Scope, receive: Receive, send: Send) -> None
⋮----
request = Request(scope, receive)
⋮----
# If the session has been terminated, return 404 Not Found
response = self._create_error_response(
⋮----
def _check_accept_headers(self, request: Request) -> tuple[bool, bool]
⋮----
accept_header = request.headers.get("accept", "")
accept_types = [media_type.strip() for media_type in accept_header.split(",")]
has_json = any(
has_sse = any(
⋮----
def _check_content_type(self, request: Request) -> bool
⋮----
content_type = request.headers.get("content-type", "")
content_type_parts = [
⋮----
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
message = JSONRPCMessage.model_validate(raw_message)
⋮----
# Check if this is an initialization request
is_initialization_request = (
⋮----
# Check if the server already has an established session
⋮----
# Check if request has a session ID
request_session_id = self._get_session_id(request)
# If request has a session ID but doesn't match, return 404
⋮----
response = self._create_json_response(
⋮----
metadata = ServerMessageMetadata(request_context=request)
session_message = SessionMessage(message, metadata=metadata)
⋮----
request_id = str(message.root.id)
⋮----
request_stream_reader = self._request_streams[request_id][1]
⋮----
response_message = None
⋮----
response_message = event_message.message
⋮----
response = self._create_json_response(response_message)
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
# Start the SSE response (this will send headers immediately)
⋮----
# First send the response to establish the SSE connection
⋮----
# Then send the message to be processed by the server
⋮----
async def _handle_get_request(self, request: Request, send: Send) -> None
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
# Send the message via SSE
⋮----
# Create and start EventSourceResponse
⋮----
# This will send headers immediately and establish the SSE connection
⋮----
async def _handle_delete_request(self, request: Request, send: Send) -> None
⋮----
# Validate session ID
⋮----
# If no session ID set, return Method Not Allowed
⋮----
async def _terminate_session(self) -> None
⋮----
# We need a copy of the keys to avoid modification during iteration
request_stream_keys = list(self._request_streams.keys())
# Close all request streams asynchronously
⋮----
# Clear the request streams dictionary immediately
⋮----
async def _handle_unsupported_request(self, request: Request, send: Send) -> None
async def _validate_session(self, request: Request, send: Send) -> bool
⋮----
# If we're not using session IDs, return True
⋮----
event_store = self._event_store
⋮----
async def replay_sender()
⋮----
async def send_event(event_message: EventMessage) -> None
stream_id = await event_store.replay_events_after(
⋮----
msg_reader = self._request_streams[stream_id][1]
⋮----
async def message_router()
⋮----
message = session_message.message
target_request_id = None
⋮----
response_id = str(message.root.id)
⋮----
target_request_id = response_id
⋮----
target_request_id = str(
request_stream_id = (
event_id = None
⋮----
event_id = await self._event_store.store_event(
````

## File: src/mcp/server/streaming_asgi_transport.py
````python
class StreamingASGITransport(AsyncBaseTransport)
⋮----
scope = {
request_body_chunks = request.stream.__aiter__()
request_complete = False
status_code = 499
response_headers = None
response_started = False
response_complete = anyio.Event()
initial_response_ready = anyio.Event()
⋮----
async def receive() -> dict[str, Any]
⋮----
body = await request_body_chunks.__anext__()
⋮----
request_complete = True
⋮----
async def send(message: dict[str, Any]) -> None
async def run_app() -> None
async def process_messages() -> None
⋮----
status_code = message["status"]
response_headers = message.get("headers", [])
response_started = True
⋮----
body = message.get("body", b"")
more_body = message.get("more_body", False)
⋮----
class StreamingASGIResponseStream(AsyncByteStream)
⋮----
async def __aiter__(self) -> typing.AsyncIterator[bytes]
````

## File: src/mcp/server/websocket.py
````python
logger = logging.getLogger(__name__)
⋮----
@asynccontextmanager
async def websocket_server(scope: Scope, receive: Receive, send: Send)
⋮----
websocket = WebSocket(scope, receive, send)
⋮----
read_stream: MemoryObjectReceiveStream[SessionMessage | Exception]
read_stream_writer: MemoryObjectSendStream[SessionMessage | Exception]
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
obj = session_message.message.model_dump_json(
````

## File: src/mcp/shared/_httpx_utils.py
````python
__all__ = ["create_mcp_http_client"]
class McpHttpClientFactory(Protocol)
⋮----
kwargs: dict[str, Any] = {
````

## File: src/mcp/shared/auth.py
````python
class OAuthToken(BaseModel)
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
class InvalidScopeError(Exception)
⋮----
def __init__(self, message: str)
class InvalidRedirectUriError(Exception)
class OAuthClientMetadata(BaseModel)
⋮----
redirect_uris: list[AnyUrl] = Field(..., min_length=1)
token_endpoint_auth_method: Literal["none", "client_secret_post"] = (
grant_types: list[Literal["authorization_code", "refresh_token"]] = [
response_types: list[Literal["code"]] = ["code"]
⋮----
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
def validate_scope(self, requested_scope: str | None) -> list[str] | None
⋮----
requested_scopes = requested_scope.split(" ")
allowed_scopes = [] if self.scope is None else self.scope.split(" ")
⋮----
def validate_redirect_uri(self, redirect_uri: AnyUrl | None) -> AnyUrl
class OAuthClientInformationFull(OAuthClientMetadata)
⋮----
client_id: str
client_secret: str | None = None
client_id_issued_at: int | None = None
client_secret_expires_at: int | None = None
class OAuthMetadata(BaseModel)
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
error: ErrorData
def __init__(self, error: ErrorData)
````

## File: src/mcp/shared/memory.py
````python
MessageStream = tuple[
⋮----
client_streams = (server_to_client_receive, client_to_server_send)
server_streams = (client_to_server_receive, server_to_client_send)
````

## File: src/mcp/shared/message.py
````python
ResumptionToken = str
ResumptionTokenUpdateCallback = Callable[[ResumptionToken], Awaitable[None]]
⋮----
@dataclass
class ClientMessageMetadata
⋮----
resumption_token: ResumptionToken | None = None
on_resumption_token_update: Callable[[ResumptionToken], Awaitable[None]] | None = (
⋮----
@dataclass
class ServerMessageMetadata
⋮----
related_request_id: RequestId | None = None
request_context: object | None = None
MessageMetadata = ClientMessageMetadata | ServerMessageMetadata | None
⋮----
@dataclass
class SessionMessage
⋮----
message: JSONRPCMessage
metadata: MessageMetadata = None
````

## File: src/mcp/shared/progress.py
````python
class Progress(BaseModel)
⋮----
progress: float
total: float | None
⋮----
@dataclass
class ProgressContext(
⋮----
session: BaseSession[
progress_token: ProgressToken
⋮----
current: float = field(default=0.0, init=False)
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
ReceiveNotificationT = TypeVar(
RequestId = str | int
class ProgressFnT(Protocol)
class RequestResponder(Generic[ReceiveRequestT, SendResultT])
⋮----
def __enter__(self) -> "RequestResponder[ReceiveRequestT, SendResultT]"
⋮----
async def respond(self, response: SendResultT | ErrorData) -> None
⋮----
await self._session._send_response(  # type: ignore[reportPrivateUsage]
⋮----
async def cancel(self) -> None
⋮----
self._completed = True  # Mark as completed so it's removed from in_flight
⋮----
@property
    def in_flight(self) -> bool
⋮----
@property
    def cancelled(self) -> bool
class BaseSession(
⋮----
_response_streams: dict[
_request_id: int
_in_flight: dict[RequestId, RequestResponder[ReceiveRequestT, SendResultT]]
_progress_callbacks: dict[RequestId, ProgressFnT]
⋮----
async def __aenter__(self) -> Self
⋮----
request_id = self._request_id
⋮----
request_data = request.model_dump(by_alias=True, mode="json", exclude_none=True)
⋮----
jsonrpc_request = JSONRPCRequest(
⋮----
timeout = None
⋮----
timeout = request_read_timeout_seconds.total_seconds()
⋮----
timeout = self._session_read_timeout_seconds.total_seconds()
⋮----
response_or_error = await response_stream_reader.receive()
⋮----
jsonrpc_notification = JSONRPCNotification(
session_message = SessionMessage(
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
error_response = JSONRPCError(
⋮----
notification = self._receive_notification_type.model_validate(
⋮----
cancelled_id = notification.root.params.requestId
⋮----
progress_token = notification.root.params.progressToken
⋮----
callback = self._progress_callbacks[progress_token]
⋮----
stream = self._response_streams.pop(message.message.root.id, None)
⋮----
error = ErrorData(code=CONNECTION_CLOSED, message="Connection closed")
⋮----
async def _received_notification(self, notification: ReceiveNotificationT) -> None
````

## File: src/mcp/shared/version.py
````python
SUPPORTED_PROTOCOL_VERSIONS: list[str] = ["2024-11-05", LATEST_PROTOCOL_VERSION]
````

## File: src/mcp/__init__.py
````python
__all__ = [
````

## File: src/mcp/types.py
````python
LATEST_PROTOCOL_VERSION = "2025-03-26"
ProgressToken = str | int
Cursor = str
Role = Literal["user", "assistant"]
RequestId = Annotated[int | str, Field(union_mode="left_to_right")]
AnyFunction: TypeAlias = Callable[..., Any]
class RequestParams(BaseModel)
⋮----
class Meta(BaseModel)
⋮----
progressToken: ProgressToken | None = None
model_config = ConfigDict(extra="allow")
meta: Meta | None = Field(alias="_meta", default=None)
class PaginatedRequestParams(RequestParams)
⋮----
cursor: Cursor | None = None
class NotificationParams(BaseModel)
RequestParamsT = TypeVar("RequestParamsT", bound=RequestParams | dict[str, Any] | None)
NotificationParamsT = TypeVar(
MethodT = TypeVar("MethodT", bound=str)
class Request(BaseModel, Generic[RequestParamsT, MethodT])
⋮----
method: MethodT
params: RequestParamsT
⋮----
class PaginatedRequest(
⋮----
params: PaginatedRequestParams | None = None
class Notification(BaseModel, Generic[NotificationParamsT, MethodT])
⋮----
params: NotificationParamsT
⋮----
class Result(BaseModel)
⋮----
meta: dict[str, Any] | None = Field(alias="_meta", default=None)
class PaginatedResult(Result)
⋮----
nextCursor: Cursor | None = None
class JSONRPCRequest(Request[dict[str, Any] | None, str])
⋮----
jsonrpc: Literal["2.0"]
id: RequestId
method: str
params: dict[str, Any] | None = None
class JSONRPCNotification(Notification[dict[str, Any] | None, str])
class JSONRPCResponse(BaseModel)
⋮----
result: dict[str, Any]
⋮----
CONNECTION_CLOSED = -32000
PARSE_ERROR = -32700
INVALID_REQUEST = -32600
METHOD_NOT_FOUND = -32601
INVALID_PARAMS = -32602
INTERNAL_ERROR = -32603
class ErrorData(BaseModel)
⋮----
code: int
message: str
data: Any | None = None
⋮----
class JSONRPCError(BaseModel)
⋮----
id: str | int
error: ErrorData
⋮----
class JSONRPCMessage(
class EmptyResult(Result)
class Implementation(BaseModel)
⋮----
name: str
version: str
⋮----
class RootsCapability(BaseModel)
⋮----
listChanged: bool | None = None
⋮----
class SamplingCapability(BaseModel)
class ClientCapabilities(BaseModel)
⋮----
experimental: dict[str, dict[str, Any]] | None = None
sampling: SamplingCapability | None = None
roots: RootsCapability | None = None
⋮----
class PromptsCapability(BaseModel)
class ResourcesCapability(BaseModel)
⋮----
subscribe: bool | None = None
⋮----
class ToolsCapability(BaseModel)
class LoggingCapability(BaseModel)
class ServerCapabilities(BaseModel)
⋮----
logging: LoggingCapability | None = None
prompts: PromptsCapability | None = None
resources: ResourcesCapability | None = None
tools: ToolsCapability | None = None
⋮----
class InitializeRequestParams(RequestParams)
⋮----
protocolVersion: str | int
capabilities: ClientCapabilities
clientInfo: Implementation
⋮----
class InitializeRequest(Request[InitializeRequestParams, Literal["initialize"]])
⋮----
method: Literal["initialize"]
params: InitializeRequestParams
class InitializeResult(Result)
⋮----
capabilities: ServerCapabilities
serverInfo: Implementation
instructions: str | None = None
class InitializedNotification(
⋮----
method: Literal["notifications/initialized"]
params: NotificationParams | None = None
class PingRequest(Request[RequestParams | None, Literal["ping"]])
⋮----
method: Literal["ping"]
params: RequestParams | None = None
class ProgressNotificationParams(NotificationParams)
⋮----
progressToken: ProgressToken
progress: float
total: float | None = None
message: str | None = None
⋮----
class ProgressNotification(
⋮----
method: Literal["notifications/progress"]
params: ProgressNotificationParams
class ListResourcesRequest(PaginatedRequest[Literal["resources/list"]])
⋮----
method: Literal["resources/list"]
class Annotations(BaseModel)
⋮----
audience: list[Role] | None = None
priority: Annotated[float, Field(ge=0.0, le=1.0)] | None = None
⋮----
class Resource(BaseModel)
⋮----
uri: Annotated[AnyUrl, UrlConstraints(host_required=False)]
⋮----
description: str | None = None
mimeType: str | None = None
size: int | None = None
annotations: Annotations | None = None
⋮----
class ResourceTemplate(BaseModel)
⋮----
uriTemplate: str
⋮----
class ListResourcesResult(PaginatedResult)
⋮----
resources: list[Resource]
class ListResourceTemplatesRequest(
⋮----
method: Literal["resources/templates/list"]
class ListResourceTemplatesResult(PaginatedResult)
⋮----
resourceTemplates: list[ResourceTemplate]
class ReadResourceRequestParams(RequestParams)
class ReadResourceRequest(
⋮----
method: Literal["resources/read"]
params: ReadResourceRequestParams
class ResourceContents(BaseModel)
class TextResourceContents(ResourceContents)
⋮----
text: str
class BlobResourceContents(ResourceContents)
⋮----
blob: str
class ReadResourceResult(Result)
⋮----
contents: list[TextResourceContents | BlobResourceContents]
class ResourceListChangedNotification(
⋮----
method: Literal["notifications/resources/list_changed"]
⋮----
class SubscribeRequestParams(RequestParams)
class SubscribeRequest(Request[SubscribeRequestParams, Literal["resources/subscribe"]])
⋮----
method: Literal["resources/subscribe"]
params: SubscribeRequestParams
class UnsubscribeRequestParams(RequestParams)
class UnsubscribeRequest(
⋮----
method: Literal["resources/unsubscribe"]
params: UnsubscribeRequestParams
class ResourceUpdatedNotificationParams(NotificationParams)
class ResourceUpdatedNotification(
⋮----
method: Literal["notifications/resources/updated"]
params: ResourceUpdatedNotificationParams
class ListPromptsRequest(PaginatedRequest[Literal["prompts/list"]])
⋮----
method: Literal["prompts/list"]
class PromptArgument(BaseModel)
⋮----
required: bool | None = None
⋮----
class Prompt(BaseModel)
⋮----
arguments: list[PromptArgument] | None = None
⋮----
class ListPromptsResult(PaginatedResult)
⋮----
prompts: list[Prompt]
class GetPromptRequestParams(RequestParams)
⋮----
arguments: dict[str, str] | None = None
⋮----
class GetPromptRequest(Request[GetPromptRequestParams, Literal["prompts/get"]])
⋮----
method: Literal["prompts/get"]
params: GetPromptRequestParams
class TextContent(BaseModel)
⋮----
type: Literal["text"]
⋮----
class ImageContent(BaseModel)
⋮----
type: Literal["image"]
data: str
mimeType: str
⋮----
class AudioContent(BaseModel)
⋮----
type: Literal["audio"]
⋮----
class SamplingMessage(BaseModel)
⋮----
role: Role
content: TextContent | ImageContent | AudioContent
⋮----
class EmbeddedResource(BaseModel)
⋮----
type: Literal["resource"]
resource: TextResourceContents | BlobResourceContents
⋮----
class PromptMessage(BaseModel)
⋮----
content: TextContent | ImageContent | AudioContent | EmbeddedResource
⋮----
class GetPromptResult(Result)
⋮----
messages: list[PromptMessage]
class PromptListChangedNotification(
⋮----
method: Literal["notifications/prompts/list_changed"]
⋮----
class ListToolsRequest(PaginatedRequest[Literal["tools/list"]])
⋮----
method: Literal["tools/list"]
class ToolAnnotations(BaseModel)
⋮----
title: str | None = None
readOnlyHint: bool | None = None
destructiveHint: bool | None = None
idempotentHint: bool | None = None
openWorldHint: bool | None = None
⋮----
class Tool(BaseModel)
⋮----
inputSchema: dict[str, Any]
annotations: ToolAnnotations | None = None
⋮----
class ListToolsResult(PaginatedResult)
⋮----
tools: list[Tool]
class CallToolRequestParams(RequestParams)
⋮----
arguments: dict[str, Any] | None = None
⋮----
class CallToolRequest(Request[CallToolRequestParams, Literal["tools/call"]])
⋮----
method: Literal["tools/call"]
params: CallToolRequestParams
class CallToolResult(Result)
⋮----
content: list[TextContent | ImageContent | AudioContent | EmbeddedResource]
isError: bool = False
class ToolListChangedNotification(
⋮----
method: Literal["notifications/tools/list_changed"]
⋮----
LoggingLevel = Literal[
class SetLevelRequestParams(RequestParams)
⋮----
level: LoggingLevel
⋮----
class SetLevelRequest(Request[SetLevelRequestParams, Literal["logging/setLevel"]])
⋮----
method: Literal["logging/setLevel"]
params: SetLevelRequestParams
class LoggingMessageNotificationParams(NotificationParams)
⋮----
logger: str | None = None
data: Any
⋮----
class LoggingMessageNotification(
⋮----
method: Literal["notifications/message"]
params: LoggingMessageNotificationParams
IncludeContext = Literal["none", "thisServer", "allServers"]
class ModelHint(BaseModel)
⋮----
name: str | None = None
⋮----
class ModelPreferences(BaseModel)
⋮----
hints: list[ModelHint] | None = None
costPriority: float | None = None
speedPriority: float | None = None
intelligencePriority: float | None = None
⋮----
class CreateMessageRequestParams(RequestParams)
⋮----
messages: list[SamplingMessage]
modelPreferences: ModelPreferences | None = None
systemPrompt: str | None = None
includeContext: IncludeContext | None = None
temperature: float | None = None
maxTokens: int
stopSequences: list[str] | None = None
metadata: dict[str, Any] | None = None
⋮----
class CreateMessageRequest(
⋮----
method: Literal["sampling/createMessage"]
params: CreateMessageRequestParams
StopReason = Literal["endTurn", "stopSequence", "maxTokens"] | str
class CreateMessageResult(Result)
⋮----
model: str
stopReason: StopReason | None = None
class ResourceReference(BaseModel)
⋮----
type: Literal["ref/resource"]
uri: str
⋮----
class PromptReference(BaseModel)
⋮----
type: Literal["ref/prompt"]
⋮----
class CompletionArgument(BaseModel)
⋮----
value: str
⋮----
class CompleteRequestParams(RequestParams)
⋮----
ref: ResourceReference | PromptReference
argument: CompletionArgument
⋮----
class CompleteRequest(Request[CompleteRequestParams, Literal["completion/complete"]])
⋮----
method: Literal["completion/complete"]
params: CompleteRequestParams
class Completion(BaseModel)
⋮----
values: list[str]
total: int | None = None
hasMore: bool | None = None
⋮----
class CompleteResult(Result)
⋮----
completion: Completion
class ListRootsRequest(Request[RequestParams | None, Literal["roots/list"]])
⋮----
method: Literal["roots/list"]
⋮----
class Root(BaseModel)
⋮----
uri: FileUrl
⋮----
class ListRootsResult(Result)
⋮----
roots: list[Root]
class RootsListChangedNotification(
⋮----
method: Literal["notifications/roots/list_changed"]
⋮----
class CancelledNotificationParams(NotificationParams)
⋮----
requestId: RequestId
reason: str | None = None
⋮----
class CancelledNotification(
⋮----
method: Literal["notifications/cancelled"]
params: CancelledNotificationParams
class ClientRequest(
class ClientNotification(
class ClientResult(RootModel[EmptyResult | CreateMessageResult | ListRootsResult])
class ServerRequest(RootModel[PingRequest | CreateMessageRequest | ListRootsRequest])
class ServerNotification(
class ServerResult(
````

## File: tests/client/conftest.py
````python
class SpyMemoryObjectSendStream
⋮----
def __init__(self, original_stream)
async def send(self, message)
async def aclose(self)
async def __aenter__(self)
async def __aexit__(self, *args)
class StreamSpyCollection
⋮----
def clear(self) -> None
def get_client_requests(self, method: str | None = None) -> list[JSONRPCRequest]
def get_server_requests(self, method: str | None = None) -> list[JSONRPCRequest]
⋮----
@pytest.fixture
def stream_spy()
⋮----
client_spy = None
server_spy = None
def capture_spies(c_spy, s_spy)
⋮----
client_spy = c_spy
server_spy = s_spy
original_create_streams = mcp.shared.memory.create_client_server_memory_streams
⋮----
@asynccontextmanager
    async def patched_create_streams()
⋮----
spy_client_write = SpyMemoryObjectSendStream(client_write)
spy_server_write = SpyMemoryObjectSendStream(server_write)
⋮----
def get_spy_collection() -> StreamSpyCollection
````

## File: tests/client/test_auth.py
````python
class MockTokenStorage
⋮----
def __init__(self)
async def get_tokens(self) -> OAuthToken | None
async def set_tokens(self, tokens: OAuthToken) -> None
async def get_client_info(self) -> OAuthClientInformationFull | None
async def set_client_info(self, client_info: OAuthClientInformationFull) -> None
⋮----
@pytest.fixture
def mock_storage()
⋮----
@pytest.fixture
def client_metadata()
⋮----
@pytest.fixture
def oauth_metadata()
⋮----
@pytest.fixture
def oauth_client_info()
⋮----
@pytest.fixture
def oauth_token()
⋮----
@pytest.fixture
async def oauth_provider(client_metadata, mock_storage)
⋮----
async def mock_redirect_handler(url: str) -> None
async def mock_callback_handler() -> tuple[str, str | None]
⋮----
class TestOAuthClientProvider
⋮----
@pytest.mark.anyio
    async def test_init(self, oauth_provider, client_metadata, mock_storage)
def test_generate_code_verifier(self, oauth_provider)
⋮----
verifier = oauth_provider._generate_code_verifier()
⋮----
allowed_chars = set(
⋮----
verifiers = {oauth_provider._generate_code_verifier() for _ in range(10)}
⋮----
@pytest.mark.anyio
    async def test_generate_code_challenge(self, oauth_provider)
⋮----
verifier = "test_code_verifier_123"
challenge = oauth_provider._generate_code_challenge(verifier)
# Manually calculate expected challenge
expected_digest = hashlib.sha256(verifier.encode()).digest()
expected_challenge = (
⋮----
# Verify it's base64url without padding
⋮----
@pytest.mark.anyio
    async def test_get_authorization_base_url(self, oauth_provider)
⋮----
metadata_response = oauth_metadata.model_dump(by_alias=True, mode="json")
⋮----
mock_client = AsyncMock()
⋮----
mock_response = Mock()
⋮----
result = await oauth_provider._discover_oauth_metadata(
⋮----
call_args = mock_client.get.call_args[0]
⋮----
@pytest.mark.anyio
    async def test_discover_oauth_metadata_not_found(self, oauth_provider)
⋮----
mock_response_success = Mock()
⋮----
registration_response = oauth_client_info.model_dump(by_alias=True, mode="json")
⋮----
result = await oauth_provider._register_oauth_client(
⋮----
call_args = mock_client.post.call_args
⋮----
@pytest.mark.anyio
    async def test_register_oauth_client_failure(self, oauth_provider)
⋮----
@pytest.mark.anyio
    async def test_has_valid_token_no_token(self, oauth_provider)
⋮----
@pytest.mark.anyio
    async def test_has_valid_token_valid(self, oauth_provider, oauth_token)
⋮----
@pytest.mark.anyio
    async def test_has_valid_token_expired(self, oauth_provider, oauth_token)
⋮----
@pytest.mark.anyio
    async def test_validate_token_scopes_no_scope(self, oauth_provider)
⋮----
token = OAuthToken(access_token="test", token_type="Bearer")
⋮----
@pytest.mark.anyio
    async def test_validate_token_scopes_valid(self, oauth_provider, client_metadata)
⋮----
token = OAuthToken(
⋮----
@pytest.mark.anyio
    async def test_validate_token_scopes_subset(self, oauth_provider, client_metadata)
⋮----
@pytest.mark.anyio
    async def test_validate_token_scopes_no_requested(self, oauth_provider)
⋮----
result = await oauth_provider._get_or_register_client()
⋮----
token_response = oauth_token.model_dump(by_alias=True, mode="json")
⋮----
new_token = OAuthToken(
token_response = new_token.model_dump(by_alias=True, mode="json")
⋮----
result = await oauth_provider._refresh_access_token()
⋮----
@pytest.mark.anyio
    async def test_refresh_access_token_no_refresh_token(self, oauth_provider)
⋮----
auth_url_captured = None
async def mock_redirect_handler(url: str) -> None
⋮----
auth_url_captured = url
⋮----
async def mock_callback_handler() -> tuple[str, str | None]
⋮----
parsed_url = urlparse(auth_url_captured)
query_params = parse_qs(parsed_url.query)
state = query_params.get("state", [None])[0]
⋮----
@pytest.mark.anyio
    async def test_ensure_token_existing_valid(self, oauth_provider, oauth_token)
⋮----
@pytest.mark.anyio
    async def test_ensure_token_refresh(self, oauth_provider, oauth_token)
⋮----
@pytest.mark.anyio
    async def test_ensure_token_full_flow(self, oauth_provider)
⋮----
@pytest.mark.anyio
    async def test_async_auth_flow_add_token(self, oauth_provider, oauth_token)
⋮----
request = httpx.Request("GET", "https://api.example.com/data")
⋮----
auth_flow = oauth_provider.async_auth_flow(request)
updated_request = await auth_flow.__anext__()
⋮----
@pytest.mark.anyio
    async def test_async_auth_flow_401_response(self, oauth_provider, oauth_token)
⋮----
@pytest.mark.anyio
    async def test_async_auth_flow_no_token(self, oauth_provider)
⋮----
auth_params = {
⋮----
@pytest.mark.anyio
    async def test_scope_priority_no_scope(self, oauth_provider, oauth_client_info)
⋮----
# Build auth params to test scope logic
⋮----
# Apply scope logic from _perform_oauth_flow
⋮----
# No scope should be set
⋮----
# Mock callback handler to return mismatched state
⋮----
# Patch secrets.compare_digest to verify it's being called
⋮----
@pytest.mark.anyio
    async def test_token_exchange_error_basic(self, oauth_provider, oauth_client_info)
⋮----
metadata = build_metadata(
````

## File: tests/client/test_config.py
````python
@pytest.fixture
def temp_config_dir(tmp_path: Path)
⋮----
config_dir = tmp_path / "Claude"
⋮----
@pytest.fixture
def mock_config_path(temp_config_dir: Path)
def test_command_execution(mock_config_path: Path)
⋮----
server_name = "test_server"
file_spec = "test_server.py:app"
success = update_claude_config(file_spec=file_spec, server_name=server_name)
⋮----
config_file = mock_config_path / "claude_desktop_config.json"
config = json.loads(config_file.read_text())
server_config = config["mcpServers"][server_name]
command = server_config["command"]
args = server_config["args"]
test_args = [command] + args + ["--help"]
result = subprocess.run(
⋮----
def test_absolute_uv_path(mock_config_path: Path)
⋮----
mock_uv_path = "/usr/local/bin/uv"
````

## File: tests/client/test_list_methods_cursor.py
````python
pytestmark = pytest.mark.anyio
async def test_list_tools_cursor_parameter(stream_spy)
⋮----
server = FastMCP("test")
⋮----
@server.tool(name="test_tool_1")
    async def test_tool_1() -> str
⋮----
@server.tool(name="test_tool_2")
    async def test_tool_2() -> str
⋮----
spies = stream_spy()
_ = await client_session.list_tools()
list_tools_requests = spies.get_client_requests(method="tools/list")
⋮----
_ = await client_session.list_tools(cursor=None)
⋮----
_ = await client_session.list_tools(cursor="some_cursor_value")
⋮----
_ = await client_session.list_tools(cursor="")
⋮----
async def test_list_resources_cursor_parameter(stream_spy)
⋮----
@server.resource("resource://test/data")
    async def test_resource() -> str
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
@server.prompt()
    async def test_prompt(name: str) -> str
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
@server.resource("resource://test/{name}")
    async def test_template(name: str) -> str
⋮----
_ = await client_session.list_resource_templates()
list_templates_requests = spies.get_client_requests(
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
callback_return = ListRootsResult(
⋮----
@server.tool("test_list_roots")
    async def test_list_roots(context: Context, message: str)
⋮----
roots = await context.session.list_roots()
⋮----
result = await client_session.call_tool(
````

## File: tests/client/test_logging_callback.py
````python
class LoggingCollector
⋮----
def __init__(self)
async def __call__(self, params: LoggingMessageNotificationParams) -> None
⋮----
@pytest.mark.anyio
async def test_logging_callback()
⋮----
server = FastMCP("test")
logging_collector = LoggingCollector()
⋮----
@server.tool("test_tool")
    async def test_tool() -> bool
⋮----
result = await client_session.call_tool("test_tool", {})
⋮----
log_result = await client_session.call_tool(
⋮----
log = logging_collector.log_messages[0]
````

## File: tests/client/test_resource_cleanup.py
````python
@pytest.mark.anyio
async def test_send_request_stream_cleanup()
⋮----
class TestSession(BaseSession)
⋮----
async def _send_response(self, request_id, response)
⋮----
session = TestSession(
⋮----
object,  # Notification type doesn't matter for this test
⋮----
request = ClientRequest(
async def mock_send(*args, **kwargs)
initial_stream_count = len(session._response_streams)
````

## File: tests/client/test_sampling_callback.py
````python
@pytest.mark.anyio
async def test_sampling_callback()
⋮----
server = FastMCP("test")
callback_return = CreateMessageResult(
⋮----
@server.tool("test_sampling")
    async def test_sampling_tool(message: str)
⋮----
value = await server.get_context().session.create_message(
⋮----
result = await client_session.call_tool(
````

## File: tests/client/test_session_group.py
````python
@pytest.fixture
def mock_exit_stack()
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
mock_prompt = mock.Mock()
mock_resource = mock.Mock()
mock_tool = mock.Mock()
⋮----
async def test_call_tool(self)
⋮----
mock_session = mock.AsyncMock()
def hook(name, server_info)
mcp_session_group = ClientSessionGroup(component_name_hook=hook)
⋮----
text_content = types.TextContent(type="text", text="OK")
⋮----
result = await mcp_session_group.call_tool(
⋮----
async def test_connect_to_server(self, mock_exit_stack)
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
mock_tool = mock.Mock(spec=types.Tool)
⋮----
def name_hook(name: str, server_info: types.Implementation) -> str
group = ClientSessionGroup(
⋮----
expected_tool_name = "HookServer.base_tool"
⋮----
async def test_disconnect_from_server(self)
⋮----
group = ClientSessionGroup()
server_name = "ServerToDisconnect"
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
existing_tool_name = "shared_tool"
⋮----
mock_session = mock.MagicMock(spec=mcp.ClientSession)
⋮----
mock_server_info_new = mock.Mock(spec=types.Implementation)
⋮----
mock_session_new = mock.AsyncMock(spec=mcp.ClientSession)
duplicate_tool = mock.Mock(spec=types.Tool)
⋮----
# No patching needed here
async def test_disconnect_non_existent_server(self)
⋮----
session = mock.Mock(spec=mcp.ClientSession)
⋮----
),  # url, headers, timeout, sse_read_timeout
⋮----
),  # url, headers, timeout, sse_read_timeout, terminate_on_close
⋮----
client_type_name,  # Just for clarity or conditional logic if needed
⋮----
mock_client_cm_instance = mock.AsyncMock(
mock_read_stream = mock.AsyncMock(name=f"{client_type_name}Read")
mock_write_stream = mock.AsyncMock(name=f"{client_type_name}Write")
# streamablehttp_client's __aenter__ returns three values
⋮----
mock_extra_stream_val = mock.AsyncMock(name="StreamableExtra")
⋮----
mock_raw_session_cm = mock.AsyncMock(name="RawSessionCM")
⋮----
mock_entered_session = mock.AsyncMock(name="EnteredSessionInstance")
⋮----
mock_initialize_result = mock.AsyncMock(name="InitializeResult")
⋮----
returned_server_info = None
returned_session = None
````

## File: tests/client/test_session.py
````python
@pytest.mark.anyio
async def test_client_session_initialize()
⋮----
initialized_notification = None
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
result = await session.initialize()
⋮----
@pytest.mark.anyio
async def test_client_session_custom_client_info()
⋮----
custom_client_info = Implementation(name="test-client", version="1.2.3")
received_client_info = None
⋮----
received_client_info = request.root.params.clientInfo
⋮----
@pytest.mark.anyio
async def test_client_session_default_client_info()
⋮----
@pytest.mark.anyio
async def test_client_session_version_negotiation_success()
⋮----
@pytest.mark.anyio
async def test_client_session_version_negotiation_failure()
⋮----
@pytest.mark.anyio
async def test_client_capabilities_default()
⋮----
received_capabilities = None
⋮----
received_capabilities = request.root.params.capabilities
⋮----
@pytest.mark.anyio
async def test_client_capabilities_with_custom_callbacks()
````

## File: tests/client/test_stdio.py
````python
tee: str = shutil.which("tee")
python: str = shutil.which("python")
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
messages = [
⋮----
session_message = SessionMessage(message)
⋮----
read_messages = []
⋮----
@pytest.mark.anyio
async def test_stdio_client_bad_path()
⋮----
server_params = StdioServerParameters(
⋮----
@pytest.mark.anyio
async def test_stdio_client_nonexistent_command()
⋮----
error_message = str(exc_info.value)
````

## File: tests/issues/test_100_tool_listing.py
````python
pytestmark = pytest.mark.anyio
async def test_list_tools_returns_all_tools()
⋮----
mcp = FastMCP("TestTools")
num_tools = 100
⋮----
@mcp.tool(name=f"tool_{i}")
        def dummy_tool_func()
⋮----
f"""Tool number {i}"""
⋮----
tools = await mcp.list_tools()
⋮----
tool_names = [tool.name for tool in tools]
expected_names = [f"tool_{i}" for i in range(num_tools)]
````

## File: tests/issues/test_129_resource_templates.py
````python
@pytest.mark.anyio
async def test_resource_templates()
⋮----
mcp = FastMCP("Demo")
⋮----
@mcp.resource("greeting://{name}")
    def get_greeting(name: str) -> str
⋮----
@mcp.resource("users://{user_id}/profile")
    def get_user_profile(user_id: str) -> str
result = await mcp._mcp_server.request_handlers[types.ListResourceTemplatesRequest](
⋮----
templates = result.root.resourceTemplates
⋮----
greeting_template = next(t for t in templates if t.name == "get_greeting")
⋮----
profile_template = next(t for t in templates if t.name == "get_user_profile")
````

## File: tests/issues/test_141_resource_templates.py
````python
@pytest.mark.anyio
async def test_resource_template_edge_cases()
⋮----
mcp = FastMCP("Demo")
⋮----
@mcp.resource("resource://users/{user_id}/posts/{post_id}")
    def get_user_post(user_id: str, post_id: str) -> str
⋮----
@mcp.resource("resource://users/{user_id}/profile")
        def get_user_profile(user_id: str, optional_param: str | None = None) -> str
⋮----
@mcp.resource("resource://users/{user_id}/profile")
        def get_user_profile_mismatch(different_param: str) -> str
⋮----
@mcp.resource("resource://users/{user_id}/profile")
        def get_user_profile_extra(user_id: str, extra_param: str) -> str
⋮----
@mcp.resource("resource://users/{user_id}/profile/{section}")
        def get_user_profile_missing(user_id: str) -> str
result = await mcp.read_resource("resource://users/123/posts/456")
result_list = list(result)
⋮----
@pytest.mark.anyio
async def test_resource_template_client_interaction()
⋮----
@mcp.resource("resource://users/{user_id}/profile")
    def get_user_profile(user_id: str) -> str
⋮----
resources = await session.list_resource_templates()
⋮----
templates = [r.uriTemplate for r in resources.resourceTemplates]
⋮----
result = await session.read_resource(AnyUrl("resource://users/123/posts/456"))
contents = result.contents[0]
⋮----
result = await session.read_resource(AnyUrl("resource://users/789/profile"))
````

## File: tests/issues/test_152_resource_mime_type.py
````python
pytestmark = pytest.mark.anyio
async def test_fastmcp_resource_mime_type()
⋮----
mcp = FastMCP("test")
image_bytes = b"fake_image_data"
base64_string = base64.b64encode(image_bytes).decode("utf-8")
⋮----
@mcp.resource("test://image", mime_type="image/png")
    def get_image_as_string() -> str
⋮----
@mcp.resource("test://image_bytes", mime_type="image/png")
    def get_image_as_bytes() -> bytes
⋮----
resources = await client.list_resources()
⋮----
mapping = {str(r.uri): r for r in resources.resources}
string_resource = mapping["test://image"]
bytes_resource = mapping["test://image_bytes"]
⋮----
string_result = await client.read_resource(AnyUrl("test://image"))
⋮----
bytes_result = await client.read_resource(AnyUrl("test://image_bytes"))
⋮----
async def test_lowlevel_resource_mime_type()
⋮----
server = Server("test")
⋮----
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
async def test_progress_token_zero_first_call()
⋮----
mock_session = AsyncMock()
⋮----
mock_meta = MagicMock()
⋮----
request_context = RequestContext(
ctx = Context(request_context=request_context, fastmcp=MagicMock())
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
duration = end_time - start_time
⋮----
def main()
````

## File: tests/issues/test_192_request_id.py
````python
@pytest.mark.anyio
async def test_request_id_match() -> None
⋮----
server = Server("test")
custom_request_id = "test-123"
⋮----
async def run_server()
⋮----
init_req = JSONRPCRequest(
⋮----
response = (
initialized_notification = JSONRPCNotification(
⋮----
ping_request = JSONRPCRequest(
⋮----
response = await server_reader.receive()
````

## File: tests/issues/test_342_base64_encoding.py
````python
@pytest.mark.anyio
async def test_server_base64_encoding_issue()
⋮----
server = Server("test")
binary_data = bytes(list(range(255)) * 4)
⋮----
@server.read_resource()
    async def read_resource(uri: AnyUrl) -> list[ReadResourceContents]
handler = server.request_handlers[ReadResourceRequest]
request = ReadResourceRequest(
result: ServerResult = await handler(request)
read_result: ReadResourceResult = cast(ReadResourceResult, result.root)
blob_content = read_result.contents[0]
urlsafe_b64 = base64.urlsafe_b64encode(binary_data).decode()
standard_b64 = base64.b64encode(binary_data).decode()
⋮----
" encoding difference"
model_dict = blob_content.model_dump()
blob_model = BlobResourceContents.model_validate(model_dict)
decoded = base64.b64decode(blob_model.blob)
````

## File: tests/issues/test_355_type_error.py
````python
class Database
⋮----
@classmethod
    async def connect(cls)
async def disconnect(self)
def query(self)
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
db = await Database.connect()
⋮----
mcp = FastMCP("My App", lifespan=app_lifespan)
⋮----
@mcp.tool()
def query_db(ctx: Context) -> str
⋮----
db = ctx.request_context.lifespan_context.db
````

## File: tests/issues/test_88_random_error.py
````python
@pytest.mark.anyio
async def test_notification_validation_error(tmp_path: Path)
⋮----
server = Server(name="test")
request_count = 0
slow_request_started = anyio.Event()
slow_request_complete = anyio.Event()
⋮----
async def client(read_stream, write_stream, scope)
⋮----
result = await session.call_tool("fast")
⋮----
scope = await tg.start(server_handler, server_reader, client_writer)
````

## File: tests/issues/test_malformed_input.py
````python
@pytest.mark.anyio
async def test_malformed_initialize_request_does_not_crash_server()
⋮----
malformed_request = JSONRPCRequest(
request_message = SessionMessage(message=JSONRPCMessage(malformed_request))
⋮----
response_message = write_receive_stream.receive_nowait()
response = response_message.message.root
⋮----
another_malformed_request = JSONRPCRequest(
another_request_message = SessionMessage(
⋮----
second_response_message = write_receive_stream.receive_nowait()
second_response = second_response_message.message.root
⋮----
@pytest.mark.anyio
async def test_multiple_concurrent_malformed_requests()
⋮----
malformed_requests = []
⋮----
request_message = SessionMessage(
⋮----
error_responses = []
````

## File: tests/server/auth/middleware/test_auth_context.py
````python
class MockApp
⋮----
def __init__(self)
async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None
⋮----
@pytest.fixture
def valid_access_token() -> AccessToken
⋮----
@pytest.mark.anyio
class TestAuthContextMiddleware
⋮----
async def test_with_authenticated_user(self, valid_access_token: AccessToken)
⋮----
app = MockApp()
middleware = AuthContextMiddleware(app)
user = AuthenticatedUser(valid_access_token)
scope: Scope = {"type": "http", "user": user}
async def receive() -> Message
async def send(message: Message) -> None
⋮----
async def test_with_no_user(self)
⋮----
scope: Scope = {"type": "http"}
````

## File: tests/server/auth/middleware/test_bearer_auth.py
````python
class MockOAuthProvider
⋮----
def __init__(self)
def add_token(self, token: str, access_token: AccessToken) -> None
async def load_access_token(self, token: str) -> AccessToken | None
⋮----
mock_provider = cast(MockOAuthProvider, provider)
⋮----
class MockApp
⋮----
async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None
⋮----
@pytest.fixture
def mock_oauth_provider() -> OAuthAuthorizationServerProvider[Any, Any, Any]
⋮----
@pytest.fixture
def valid_access_token() -> AccessToken
⋮----
@pytest.fixture
def expired_access_token() -> AccessToken
⋮----
@pytest.fixture
def no_expiry_access_token() -> AccessToken
⋮----
@pytest.mark.anyio
class TestBearerAuthBackend
⋮----
backend = BearerAuthBackend(provider=mock_oauth_provider)
request = Request({"type": "http", "headers": []})
result = await backend.authenticate(request)
⋮----
request = Request(
⋮----
headers = Headers({"Authorization": "bearer valid_token"})
scope = {"type": "http", "headers": headers.raw}
request = Request(scope)
⋮----
headers = Headers({"authorization": "BeArEr valid_token"})
⋮----
headers = Headers({"AuThOrIzAtIoN": "BeArEr valid_token"})
⋮----
@pytest.mark.anyio
class TestRequireAuthMiddleware
⋮----
async def test_no_user(self)
⋮----
app = MockApp()
middleware = RequireAuthMiddleware(app, required_scopes=["read"])
scope: Scope = {"type": "http"}
async def receive() -> Message
async def send(message: Message) -> None
⋮----
async def test_non_authenticated_user(self)
⋮----
scope: Scope = {"type": "http", "user": object()}
⋮----
async def test_missing_required_scope(self, valid_access_token: AccessToken)
⋮----
middleware = RequireAuthMiddleware(app, required_scopes=["admin"])
user = AuthenticatedUser(valid_access_token)
auth = AuthCredentials(["read", "write"])
scope: Scope = {"type": "http", "user": user, "auth": auth}
⋮----
async def test_no_auth_credentials(self, valid_access_token: AccessToken)
⋮----
scope: Scope = {"type": "http", "user": user}
⋮----
async def test_has_required_scopes(self, valid_access_token: AccessToken)
async def test_multiple_required_scopes(self, valid_access_token: AccessToken)
⋮----
middleware = RequireAuthMiddleware(app, required_scopes=["read", "write"])
⋮----
async def test_no_required_scopes(self, valid_access_token: AccessToken)
⋮----
middleware = RequireAuthMiddleware(app, required_scopes=[])
````

## File: tests/server/auth/test_error_handling.py
````python
@pytest.fixture
def oauth_provider()
⋮----
@pytest.fixture
def app(oauth_provider)
⋮----
client_registration_options = ClientRegistrationOptions(enabled=True)
revocation_options = RevocationOptions(enabled=True)
auth_routes = create_auth_routes(
⋮----
@pytest.fixture
def client(app)
⋮----
transport = ASGITransport(app=app)
⋮----
@pytest.fixture
def pkce_challenge()
⋮----
code_verifier = secrets.token_urlsafe(64)[:128]
code_verifier_bytes = code_verifier.encode("ascii")
sha256 = hashlib.sha256(code_verifier_bytes).digest()
code_challenge = base64.urlsafe_b64encode(sha256).decode().rstrip("=")
⋮----
@pytest.fixture
async def registered_client(client)
⋮----
client_metadata = {
response = await client.post("/register", json=client_metadata)
⋮----
client_info = response.json()
⋮----
class TestRegistrationErrorHandling
⋮----
@pytest.mark.anyio
    async def test_registration_error_handling(self, client, oauth_provider)
⋮----
client_data = {
response = await client.post(
⋮----
data = response.json()
⋮----
class TestAuthorizeErrorHandling
⋮----
client_id = registered_client["client_id"]
redirect_uri = registered_client["redirect_uris"][0]
params = {
response = await client.get("/authorize", params=params)
⋮----
redirect_url = response.headers["location"]
parsed_url = urlparse(redirect_url)
query_params = parse_qs(parsed_url.query)
⋮----
class TestTokenErrorHandling
⋮----
client_secret = registered_client["client_secret"]
⋮----
auth_response = await client.get(
redirect_url = auth_response.headers["location"]
⋮----
code = query_params["code"][0]
⋮----
token_response = await client.post(
⋮----
data = token_response.json()
⋮----
tokens = token_response.json()
refresh_token = tokens["refresh_token"]
⋮----
refresh_response = await client.post(
⋮----
data = refresh_response.json()
````

## File: tests/server/fastmcp/auth/__init__.py
````python

````

## File: tests/server/fastmcp/auth/test_auth_integration.py
````python
class MockOAuthProvider(OAuthAuthorizationServerProvider)
⋮----
def __init__(self)
async def get_client(self, client_id: str) -> OAuthClientInformationFull | None
async def register_client(self, client_info: OAuthClientInformationFull)
⋮----
code = AuthorizationCode(
⋮----
access_token = f"access_{secrets.token_hex(32)}"
refresh_token = f"refresh_{secrets.token_hex(32)}"
⋮----
old_access_token = self.refresh_tokens.get(refresh_token)
⋮----
token_info = self.tokens.get(old_access_token)
⋮----
refresh_obj = RefreshToken(
⋮----
old_access_token = self.refresh_tokens[refresh_token.token]
⋮----
token_info = self.tokens[old_access_token]
⋮----
new_access_token = f"access_{secrets.token_hex(32)}"
new_refresh_token = f"refresh_{secrets.token_hex(32)}"
⋮----
async def load_access_token(self, token: str) -> AccessToken | None
⋮----
token_info = self.tokens.get(token)
⋮----
async def revoke_token(self, token: AccessToken | RefreshToken) -> None
⋮----
@pytest.fixture
def mock_oauth_provider()
⋮----
@pytest.fixture
def auth_app(mock_oauth_provider)
⋮----
auth_routes = create_auth_routes(
app = Starlette(routes=auth_routes)
⋮----
@pytest.fixture
async def test_client(auth_app)
⋮----
@pytest.fixture
async def registered_client(test_client: httpx.AsyncClient, request)
⋮----
client_metadata = {
⋮----
response = await test_client.post("/register", json=client_metadata)
⋮----
client_info = response.json()
⋮----
@pytest.fixture
def pkce_challenge()
⋮----
code_verifier = "some_random_verifier_string"
code_challenge = (
⋮----
@pytest.fixture
async def auth_code(test_client, registered_client, pkce_challenge, request)
⋮----
auth_params = {
⋮----
response = await test_client.get("/authorize", params=auth_params)
⋮----
redirect_url = response.headers["location"]
parsed_url = urlparse(redirect_url)
query_params = parse_qs(parsed_url.query)
⋮----
auth_code = query_params["code"][0]
⋮----
@pytest.fixture
async def tokens(test_client, registered_client, auth_code, pkce_challenge, request)
⋮----
token_params = {
⋮----
response = await test_client.post("/token", data=token_params)
⋮----
class TestAuthEndpoints
⋮----
@pytest.mark.anyio
    async def test_metadata_endpoint(self, test_client: httpx.AsyncClient)
⋮----
response = await test_client.get("/.well-known/oauth-authorization-server")
⋮----
metadata = response.json()
⋮----
@pytest.mark.anyio
    async def test_token_validation_error(self, test_client: httpx.AsyncClient)
⋮----
# Missing required fields
response = await test_client.post(
⋮----
# Missing code, code_verifier, client_id, etc.
⋮----
error_response = response.json()
⋮----
)  # Contains validation error messages
⋮----
# Try to use a non-existent authorization code
⋮----
# Get the current time for our time mocking
current_time = time.time()
# Find the auth code object
code_value = auth_code["code"]
found_code = None
⋮----
found_code = code_obj
⋮----
# Authorization codes are typically short-lived (5 minutes = 300 seconds)
# So we'll mock time to be 10 minutes (600 seconds) in the future
⋮----
@pytest.mark.anyio
    async def test_token_invalid_refresh_token(self, test_client, registered_client)
⋮----
# Exchange authorization code for tokens normally
token_response = await test_client.post(
⋮----
tokens = token_response.json()
refresh_token = tokens["refresh_token"]
# Step 2: Time travel forward 4 hours (tokens expire in 1 hour by default)
# Mock the time.time() function to return a value 4 hours in the future
⋮----
):  # 4 hours = 14400 seconds
# Try to use the refresh token which should now be considered expired
⋮----
# In the "future", the token should be considered expired
⋮----
# Exchange authorization code for tokens
⋮----
# Try to use refresh token with an invalid scope
⋮----
"scope": "read write invalid_scope",  # Adding an invalid scope
⋮----
# Verify that the client was registered
# assert await mock_oauth_provider.clients_store.get_client(
#     client_info["client_id"]
# ) is not None
⋮----
# Missing redirect_uris which is a required field
⋮----
error_data = response.json()
⋮----
# Invalid redirect_uri format
⋮----
"redirect_uris": [],  # Empty array
⋮----
# Register a client
⋮----
# Use POST with form-encoded data for authorization
⋮----
# Extract the authorization code from the redirect URL
⋮----
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
# per RFC, this should return 200 even if the token is invalid
⋮----
@pytest.mark.anyio
    async def test_revoke_with_malformed_token(self, test_client, registered_client)
⋮----
"scope": "read write profile admin",  # 'admin' is not in valid_scopes
⋮----
registered_client = await mock_oauth_provider.get_client(
⋮----
class TestAuthorizeEndpointErrors
````

## File: tests/server/fastmcp/prompts/test_base.py
````python
class TestRenderPrompt
⋮----
@pytest.mark.anyio
    async def test_basic_fn(self)
⋮----
def fn() -> str
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
@pytest.mark.anyio
    async def test_fn_returns_mixed_content(self)
⋮----
@pytest.mark.anyio
    async def test_fn_returns_dict_with_resource(self)
⋮----
async def fn() -> dict
````

## File: tests/server/fastmcp/prompts/test_manager.py
````python
class TestPromptManager
⋮----
def test_add_prompt(self)
⋮----
def fn() -> str
manager = PromptManager()
prompt = Prompt.from_function(fn)
added = manager.add_prompt(prompt)
⋮----
def test_add_duplicate_prompt(self, caplog)
⋮----
first = manager.add_prompt(prompt)
second = manager.add_prompt(prompt)
⋮----
def test_disable_warn_on_duplicate_prompts(self, caplog)
⋮----
manager = PromptManager(warn_on_duplicate_prompts=False)
⋮----
def test_list_prompts(self)
⋮----
def fn1() -> str
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
messages = await manager.render_prompt("fn")
⋮----
@pytest.mark.anyio
    async def test_render_prompt_with_args(self)
⋮----
def fn(name: str) -> str
⋮----
messages = await manager.render_prompt("fn", arguments={"name": "World"})
⋮----
@pytest.mark.anyio
    async def test_render_unknown_prompt(self)
⋮----
@pytest.mark.anyio
    async def test_render_prompt_with_missing_args(self)
````

## File: tests/server/fastmcp/resources/test_file_resources.py
````python
@pytest.fixture
def temp_file()
⋮----
content = "test content"
⋮----
path = Path(f.name).resolve()
⋮----
class TestFileResource
⋮----
def test_file_resource_creation(self, temp_file: Path)
⋮----
resource = FileResource(
⋮----
def test_file_resource_str_path_conversion(self, temp_file: Path)
⋮----
@pytest.mark.anyio
    async def test_read_text_file(self, temp_file: Path)
⋮----
content = await resource.read()
⋮----
@pytest.mark.anyio
    async def test_read_binary_file(self, temp_file: Path)
def test_relative_path_error(self)
⋮----
@pytest.mark.anyio
    async def test_missing_file_error(self, temp_file: Path)
⋮----
missing = temp_file.parent / "missing.txt"
⋮----
@pytest.mark.anyio
    async def test_permission_error(self, temp_file: Path)
````

## File: tests/server/fastmcp/resources/test_function_resources.py
````python
class TestFunctionResource
⋮----
def test_function_resource_creation(self)
⋮----
def my_func() -> str
resource = FunctionResource(
⋮----
@pytest.mark.anyio
    async def test_read_text(self)
⋮----
def get_data() -> str
⋮----
content = await resource.read()
⋮----
@pytest.mark.anyio
    async def test_read_binary(self)
⋮----
def get_data() -> bytes
⋮----
@pytest.mark.anyio
    async def test_json_conversion(self)
⋮----
def get_data() -> dict
⋮----
@pytest.mark.anyio
    async def test_error_handling(self)
⋮----
def failing_func() -> str
⋮----
@pytest.mark.anyio
    async def test_basemodel_conversion(self)
⋮----
class MyModel(BaseModel)
⋮----
name: str
⋮----
@pytest.mark.anyio
    async def test_custom_type_conversion(self)
⋮----
class CustomData
⋮----
def __str__(self) -> str
def get_data() -> CustomData
⋮----
@pytest.mark.anyio
    async def test_async_read_text(self)
⋮----
async def get_data() -> str
⋮----
@pytest.mark.anyio
    async def test_from_function(self)
⋮----
resource = FunctionResource.from_function(
````

## File: tests/server/fastmcp/resources/test_resource_manager.py
````python
@pytest.fixture
def temp_file()
⋮----
content = "test content"
⋮----
path = Path(f.name).resolve()
⋮----
class TestResourceManager
⋮----
def test_add_resource(self, temp_file: Path)
⋮----
manager = ResourceManager()
resource = FileResource(
added = manager.add_resource(resource)
⋮----
def test_add_duplicate_resource(self, temp_file: Path)
⋮----
first = manager.add_resource(resource)
second = manager.add_resource(resource)
⋮----
def test_warn_on_duplicate_resources(self, temp_file: Path, caplog)
def test_disable_warn_on_duplicate_resources(self, temp_file: Path, caplog)
⋮----
manager = ResourceManager(warn_on_duplicate_resources=False)
⋮----
@pytest.mark.anyio
    async def test_get_resource(self, temp_file: Path)
⋮----
retrieved = await manager.get_resource(resource.uri)
⋮----
@pytest.mark.anyio
    async def test_get_resource_from_template(self)
⋮----
def greet(name: str) -> str
template = ResourceTemplate.from_function(
⋮----
resource = await manager.get_resource(AnyUrl("greet://world"))
⋮----
content = await resource.read()
⋮----
@pytest.mark.anyio
    async def test_get_unknown_resource(self)
def test_list_resources(self, temp_file: Path)
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
def test_template_creation(self)
⋮----
def my_func(key: str, value: int) -> dict
template = ResourceTemplate.from_function(
⋮----
test_input = {"key": "test", "value": 42}
⋮----
def test_template_matches(self)
⋮----
params = template.matches("test://foo/123")
⋮----
@pytest.mark.anyio
    async def test_create_resource(self)
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
def failing_func(x: str) -> str
⋮----
@pytest.mark.anyio
    async def test_async_text_resource(self)
⋮----
async def greet(name: str) -> str
⋮----
@pytest.mark.anyio
    async def test_async_binary_resource(self)
⋮----
async def get_bytes(value: str) -> bytes
⋮----
@pytest.mark.anyio
    async def test_basemodel_conversion(self)
⋮----
class MyModel(BaseModel)
⋮----
key: str
value: int
def get_data(key: str, value: int) -> MyModel
⋮----
@pytest.mark.anyio
    async def test_custom_type_conversion(self)
⋮----
class CustomData
⋮----
def __init__(self, value: str)
def __str__(self) -> str
def get_data(value: str) -> CustomData
````

## File: tests/server/fastmcp/resources/test_resources.py
````python
class TestResourceValidation
⋮----
def test_resource_uri_validation(self)
⋮----
def dummy_func() -> str
resource = FunctionResource(
⋮----
def test_resource_name_from_uri(self)
def test_resource_name_validation(self)
def test_resource_mime_type(self)
⋮----
@pytest.mark.anyio
    async def test_resource_read_abstract(self)
⋮----
class ConcreteResource(Resource)
````

## File: tests/server/fastmcp/servers/test_file_server.py
````python
@pytest.fixture()
def test_dir(tmp_path_factory) -> Path
⋮----
tmp = tmp_path_factory.mktemp("test_files")
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
@mcp.resource("file://test_dir/example.py")
    def read_example_py() -> str
⋮----
@mcp.resource("file://test_dir/readme.md")
    def read_readme_md() -> str
⋮----
@mcp.resource("file://test_dir/config.json")
    def read_config_json() -> str
⋮----
@pytest.fixture(autouse=True)
def tools(mcp: FastMCP, test_dir: Path) -> FastMCP
⋮----
@mcp.tool()
    def delete_file(path: str) -> bool
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

## File: tests/server/fastmcp/test_func_metadata.py
````python
class SomeInputModelA(BaseModel)
class SomeInputModelB(BaseModel)
⋮----
class InnerModel(BaseModel)
⋮----
x: int
how_many_shrimp: Annotated[int, Field(description="How many shrimp in the tank???")]
ok: InnerModel
y: None
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
meta = func_metadata(complex_arguments_fn)
# Test with minimum required arguments
result = await meta.call_fn_with_arg_validation(
⋮----
# Test with invalid types
⋮----
@pytest.mark.anyio
async def test_complex_function_runtime_arg_validation_with_json()
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
def func_with_str_types(str_or_list: str | list[str])
meta = func_metadata(func_with_str_types)
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
# Skip some parameters
meta = func_metadata(func_with_many_params, skip_names=["skip_this", "also_skip"])
# Check model fields
⋮----
# Validate that we can call with only non-skipped parameters
model: BaseModel = meta.arg_model.model_validate({"keep_this": 1, "also_keep": 2.5})  # type: ignore
assert model.keep_this == 1  # type: ignore
assert model.also_keep == 2.5  # type: ignore
⋮----
@pytest.mark.anyio
async def test_lambda_function()
⋮----
fn = lambda x, y=5: x  # noqa: E731
meta = func_metadata(lambda x, y=5: x)
# Test schema
⋮----
async def check_call(args)
# Basic calls
⋮----
# Missing required arg
⋮----
def test_complex_function_json_schema()
⋮----
actual_schema = meta.arg_model.model_json_schema()
# Create a copy of the actual schema to normalize
normalized_schema = actual_schema.copy()
# Normalize the my_model_a_with_default field to handle both pydantic formats
⋮----
meta = func_metadata(func_with_str_and_int)
result = meta.pre_parse_json({"a": "123", "b": 123})
````

## File: tests/server/fastmcp/test_integration.py
````python
@pytest.fixture
def server_port() -> int
⋮----
@pytest.fixture
def server_url(server_port: int) -> str
⋮----
@pytest.fixture
def http_server_port() -> int
⋮----
@pytest.fixture
def http_server_url(http_server_port: int) -> str
⋮----
@pytest.fixture
def stateless_http_server_port() -> int
⋮----
@pytest.fixture
def stateless_http_server_url(stateless_http_server_port: int) -> str
def make_fastmcp_app()
⋮----
mcp = FastMCP(name="NoAuthServer")
⋮----
@mcp.tool(description="A simple echo tool")
    def echo(message: str) -> str
app = mcp.sse_app()
⋮----
def make_everything_fastmcp() -> FastMCP
⋮----
mcp = FastMCP(name="EverythingServer")
⋮----
@mcp.tool(description="A tool that demonstrates logging and progress")
    async def tool_with_progress(message: str, ctx: Context, steps: int = 3) -> str
⋮----
progress_value = (i + 1) / steps
⋮----
@mcp.tool(description="A tool that uses sampling to generate content")
    async def sampling_tool(prompt: str, ctx: Context) -> str
⋮----
result = await ctx.session.create_message(
⋮----
@mcp.tool(description="A tool that demonstrates notifications and logging")
    async def notification_tool(message: str, ctx: Context) -> str
def get_static_info() -> str
static_resource = FunctionResource(
⋮----
@mcp.resource("resource://dynamic/{category}")
    def dynamic_resource(category: str) -> str
⋮----
@mcp.resource("resource://template/{id}/data")
    def template_resource(id: str) -> str
⋮----
@mcp.prompt(description="A simple prompt")
    def simple_prompt(topic: str) -> str
⋮----
@mcp.prompt(description="Complex prompt with context")
    def complex_prompt(user_query: str, context: str = "general") -> str
# Tool that echoes request headers from context
⋮----
@mcp.tool(description="Echo request headers from context")
    def echo_headers(ctx: Context[Any, Any, Request]) -> str
⋮----
headers_info = {}
⋮----
# Now the type system knows request is a Starlette Request object
headers_info = dict(ctx.request_context.request.headers)
⋮----
# Tool that returns full request context
⋮----
@mcp.tool(description="Echo request context with custom data")
    def echo_context(custom_request_id: str, ctx: Context[Any, Any, Request]) -> str
⋮----
context_data = {
⋮----
request = ctx.request_context.request
⋮----
def make_everything_fastmcp_app()
⋮----
mcp = make_everything_fastmcp()
# Create the SSE app
⋮----
def make_fastmcp_streamable_http_app()
⋮----
# Add a simple tool
⋮----
# Create the StreamableHTTP app
app: Starlette = mcp.streamable_http_app()
⋮----
def make_everything_fastmcp_streamable_http_app()
⋮----
# Create a new instance with different name for HTTP transport
⋮----
# We can't change the name after creation, so we'll use the same name
⋮----
def make_fastmcp_stateless_http_app()
⋮----
mcp = FastMCP(name="StatelessServer", stateless_http=True)
⋮----
def run_server(server_port: int) -> None
⋮----
server = uvicorn.Server(
⋮----
def run_everything_legacy_sse_http_server(server_port: int) -> None
def run_streamable_http_server(server_port: int) -> None
def run_everything_server(server_port: int) -> None
def run_stateless_http_server(server_port: int) -> None
⋮----
@pytest.fixture()
def server(server_port: int) -> Generator[None, None, None]
⋮----
proc = multiprocessing.Process(target=run_server, args=(server_port,), daemon=True)
⋮----
# Wait for server to be running
max_attempts = 20
attempt = 0
⋮----
@pytest.fixture()
def streamable_http_server(http_server_port: int) -> Generator[None, None, None]
⋮----
proc = multiprocessing.Process(
⋮----
@pytest.mark.anyio
async def test_fastmcp_without_auth(server: None, server_url: str) -> None
⋮----
# Connect to the server
⋮----
# Test initialization
result = await session.initialize()
⋮----
# Test that we can call tools without authentication
tool_result = await session.call_tool("echo", {"message": "hello"})
⋮----
# Connect to the server using StreamableHTTP
⋮----
# Create a session using the client streams
⋮----
tool_result = await session.call_tool("echo", {"message": f"test_{i}"})
⋮----
@pytest.fixture
def everything_server_port() -> int
⋮----
@pytest.fixture
def everything_server_url(everything_server_port: int) -> str
⋮----
@pytest.fixture
def everything_http_server_port() -> int
⋮----
@pytest.fixture
def everything_http_server_url(everything_http_server_port: int) -> str
⋮----
@pytest.fixture()
def everything_server(everything_server_port: int) -> Generator[None, None, None]
⋮----
class NotificationCollector
⋮----
def __init__(self)
async def handle_progress(self, params) -> None
async def handle_log(self, params) -> None
async def handle_resource_list_changed(self, params) -> None
async def handle_tool_list_changed(self, params) -> None
async def handle_generic_notification(self, message) -> None
⋮----
# Check if this is a ServerNotification
⋮----
# Check the specific notification type
⋮----
# Test initialization
⋮----
# Check server features are reported
⋮----
# Note: logging capability may be None if no tools use context logging
# Test tools
# 1. Simple echo tool
⋮----
# 2. Tool with context (logging and progress)
# Test progress callback functionality
progress_updates = []
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
prompt = "What is the meaning of life?"
sampling_result = await session.call_tool("sampling_tool", {"prompt": prompt})
⋮----
notification_message = "test_notifications"
notification_result = await session.call_tool(
⋮----
log_levels = [msg.level for msg in collector.log_messages]
⋮----
resources = await session.list_resources()
static_resource = next(
⋮----
static_content = await session.read_resource(AnyUrl("resource://static/info"))
⋮----
resource_category = "test"
dynamic_content = await session.read_resource(
⋮----
resource_id = "456"
template_content = await session.read_resource(
⋮----
prompts = await session.list_prompts()
simple_prompt = next(
⋮----
prompt_topic = "AI"
prompt_result = await session.get_prompt("simple_prompt", {"topic": prompt_topic})
⋮----
complex_prompt = next(
⋮----
query = "What is AI?"
context = "technical"
complex_result = await session.get_prompt(
⋮----
headers_result = await session.call_tool("echo_headers", {})
⋮----
headers_data = json.loads(headers_result.content[0].text)
⋮----
context_result = await session.call_tool(
⋮----
context_data = json.loads(context_result.content[0].text)
⋮----
input_text = params.messages[0].content.text
⋮----
input_text = "No input"
response_text = f"This is a simulated LLM response to: {input_text}"
model_name = "test-llm-model"
⋮----
collector = NotificationCollector()
⋮----
async def message_handler(message)
````

## File: tests/server/fastmcp/test_parameter_descriptions.py
````python
@pytest.mark.anyio
async def test_parameter_descriptions()
⋮----
mcp = FastMCP("Test Server")
⋮----
tools = await mcp.list_tools()
⋮----
tool = tools[0]
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
mcp = FastMCP()
⋮----
@pytest.mark.anyio
    async def test_sse_app_with_mount_path(self)
⋮----
@pytest.mark.anyio
    async def test_starlette_routes_with_mount_path(self)
⋮----
app = mcp.sse_app()
sse_routes = [r for r in app.routes if isinstance(r, Route)]
mount_routes = [r for r in app.routes if isinstance(r, Mount)]
⋮----
app = mcp.sse_app(mount_path="/param")
⋮----
@pytest.mark.anyio
    async def test_non_ascii_description(self)
⋮----
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
@mcp.tool
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
@mcp.resource
            def get_data(x: str) -> str
def tool_fn(x: int, y: int) -> int
def error_tool_fn() -> None
def image_tool_fn(path: str) -> Image
def mixed_content_tool_fn() -> list[TextContent | ImageContent | AudioContent]
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
@pytest.mark.anyio
    async def test_tool_return_value_conversion(self)
⋮----
result = await client.call_tool("tool_fn", {"x": 1, "y": 2})
⋮----
@pytest.mark.anyio
    async def test_tool_image_helper(self, tmp_path: Path)
⋮----
image_path = tmp_path / "test.png"
⋮----
result = await client.call_tool("image_tool_fn", {"path": str(image_path)})
⋮----
decoded = base64.b64decode(content.data)
⋮----
@pytest.mark.anyio
    async def test_tool_mixed_content(self)
⋮----
result = await client.call_tool("mixed_content_tool_fn", {})
⋮----
@pytest.mark.anyio
    async def test_tool_mixed_list_with_image(self, tmp_path: Path)
⋮----
def mixed_list_fn() -> list
⋮----
result = await client.call_tool("mixed_list_fn", {})
⋮----
content1 = result.content[0]
⋮----
content2 = result.content[1]
⋮----
content3 = result.content[2]
⋮----
content4 = result.content[3]
⋮----
class TestServerResources
⋮----
@pytest.mark.anyio
    async def test_text_resource(self)
⋮----
def get_text()
resource = FunctionResource(
⋮----
result = await client.read_resource(AnyUrl("resource://test"))
⋮----
@pytest.mark.anyio
    async def test_binary_resource(self)
⋮----
def get_binary()
⋮----
result = await client.read_resource(AnyUrl("resource://binary"))
⋮----
@pytest.mark.anyio
    async def test_file_resource_text(self, tmp_path: Path)
⋮----
text_file = tmp_path / "test.txt"
⋮----
resource = FileResource(
⋮----
result = await client.read_resource(AnyUrl("file://test.txt"))
⋮----
@pytest.mark.anyio
    async def test_file_resource_binary(self, tmp_path: Path)
⋮----
binary_file = tmp_path / "test.bin"
⋮----
result = await client.read_resource(AnyUrl("file://test.bin"))
⋮----
@pytest.mark.anyio
    async def test_function_resource(self)
⋮----
@mcp.resource("function://test", name="test_get_data")
        def get_data() -> str
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
@mcp.resource("resource://data")
            def get_data_fn(param: str) -> str
⋮----
@pytest.mark.anyio
    async def test_resource_with_uri_params(self)
⋮----
@mcp.resource("resource://{param}")
            def get_data() -> str
⋮----
@pytest.mark.anyio
    async def test_resource_with_untyped_params(self)
⋮----
@mcp.resource("resource://{param}")
        def get_data(param) -> str
⋮----
@pytest.mark.anyio
    async def test_resource_matching_params(self)
⋮----
@mcp.resource("resource://{name}/data")
        def get_data(name: str) -> str
⋮----
result = await client.read_resource(AnyUrl("resource://test/data"))
⋮----
@pytest.mark.anyio
    async def test_resource_mismatched_params(self)
⋮----
@mcp.resource("resource://{name}/data")
            def get_data(user: str) -> str
⋮----
@pytest.mark.anyio
    async def test_resource_multiple_params(self)
⋮----
@mcp.resource("resource://{org}/{repo}/data")
        def get_data(org: str, repo: str) -> str
⋮----
result = await client.read_resource(
⋮----
@pytest.mark.anyio
    async def test_resource_multiple_mismatched_params(self)
⋮----
@mcp.resource("resource://{org}/{repo}/data")
            def get_data_mismatched(org: str, repo_2: str) -> str
⋮----
@mcp.resource("resource://static")
        def get_static_data() -> str
⋮----
result = await client.read_resource(AnyUrl("resource://static"))
⋮----
@pytest.mark.anyio
    async def test_template_to_resource_conversion(self)
⋮----
resource = await mcp._resource_manager.get_resource("resource://test/data")
⋮----
result = await resource.read()
⋮----
class TestContextInjection
⋮----
@pytest.mark.anyio
    async def test_context_detection(self)
⋮----
def tool_with_context(x: int, ctx: Context) -> str
tool = mcp._tool_manager.add_tool(tool_with_context)
⋮----
@pytest.mark.anyio
    async def test_context_injection(self)
⋮----
result = await client.call_tool("tool_with_context", {"x": 42})
⋮----
@pytest.mark.anyio
    async def test_async_context(self)
⋮----
async def async_tool(x: int, ctx: Context) -> str
⋮----
result = await client.call_tool("async_tool", {"x": 42})
⋮----
@pytest.mark.anyio
    async def test_context_logging(self)
⋮----
async def logging_tool(msg: str, ctx: Context) -> str
⋮----
result = await client.call_tool("logging_tool", {"msg": "test"})
⋮----
@pytest.mark.anyio
    async def test_optional_context(self)
⋮----
def no_context(x: int) -> int
⋮----
result = await client.call_tool("no_context", {"x": 21})
⋮----
@pytest.mark.anyio
    async def test_context_resource_access(self)
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
@pytest.mark.anyio
    async def test_prompt_decorator(self)
⋮----
@mcp.prompt()
        def fn() -> str
prompts = mcp._prompt_manager.list_prompts()
⋮----
content = await prompts[0].render()
⋮----
@pytest.mark.anyio
    async def test_prompt_decorator_with_name(self)
⋮----
@mcp.prompt(name="custom_name")
        def fn() -> str
⋮----
@pytest.mark.anyio
    async def test_prompt_decorator_with_description(self)
⋮----
@mcp.prompt(description="A custom description")
        def fn() -> str
⋮----
def test_prompt_decorator_error(self)
⋮----
@mcp.prompt
            def fn() -> str
⋮----
@pytest.mark.anyio
    async def test_list_prompts(self)
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
@pytest.mark.anyio
    async def test_get_prompt_missing_args(self)
⋮----
@mcp.prompt()
        def prompt_fn(name: str) -> str
````

## File: tests/server/fastmcp/test_tool_manager.py
````python
class TestAddTools
⋮----
def test_basic_function(self)
⋮----
def add(a: int, b: int) -> int
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
fn_metadata = FuncMetadata(arg_model=AddArguments)
original_tool = Tool(
manager = ToolManager(tools=[original_tool])
saved_tool = manager.get_tool("add")
⋮----
manager = ToolManager(True, tools=[original_tool, original_tool])
⋮----
@pytest.mark.anyio
    async def test_async_function(self)
⋮----
async def fetch_data(url: str) -> str
⋮----
tool = manager.get_tool("fetch_data")
⋮----
def test_pydantic_model_function(self)
⋮----
class UserInput(BaseModel)
⋮----
name: str
age: int
def create_user(user: UserInput, flag: bool) -> dict
⋮----
tool = manager.get_tool("create_user")
⋮----
def test_add_callable_object(self)
⋮----
class MyTool
⋮----
def __init__(self)
def __call__(self, x: int) -> int
⋮----
tool = manager.add_tool(MyTool())
⋮----
@pytest.mark.anyio
    async def test_add_async_callable_object(self)
⋮----
class MyAsyncTool
⋮----
async def __call__(self, x: int) -> int
⋮----
tool = manager.add_tool(MyAsyncTool())
⋮----
def test_add_invalid_tool(self)
def test_add_lambda(self)
⋮----
tool = manager.add_tool(lambda x: x, name="my_tool")
⋮----
def test_add_lambda_with_no_name(self)
def test_warn_on_duplicate_tools(self, caplog)
⋮----
def f(x: int) -> int
⋮----
def test_disable_warn_on_duplicate_tools(self, caplog)
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
result = await manager.call_tool("sum_vals", {"vals": "[1, 2, 3]"})
⋮----
result = await manager.call_tool("sum_vals", {"vals": [1, 2, 3]})
⋮----
@pytest.mark.anyio
    async def test_call_tool_with_list_str_or_str_input(self)
⋮----
def concat_strs(vals: list[str] | str) -> str
⋮----
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
shrimp: list[Shrimp]
x: None
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
def test_context_parameter_detection(self)
⋮----
def tool_with_context(x: int, ctx: Context) -> str
⋮----
tool = manager.add_tool(tool_with_context)
⋮----
def tool_without_context(x: int) -> str
tool = manager.add_tool(tool_without_context)
⋮----
tool = manager.add_tool(tool_with_parametrized_context)
⋮----
@pytest.mark.anyio
    async def test_context_injection(self)
⋮----
mcp = FastMCP()
ctx = mcp.get_context()
result = await manager.call_tool("tool_with_context", {"x": 42}, context=ctx)
⋮----
@pytest.mark.anyio
    async def test_context_injection_async(self)
⋮----
async def async_tool(x: int, ctx: Context) -> str
⋮----
result = await manager.call_tool("async_tool", {"x": 42}, context=ctx)
⋮----
@pytest.mark.anyio
    async def test_context_optional(self)
⋮----
def tool_with_context(x: int, ctx: Context | None = None) -> str
⋮----
result = await manager.call_tool("tool_with_context", {"x": 42})
⋮----
@pytest.mark.anyio
    async def test_context_error_handling(self)
class TestToolAnnotations
⋮----
def test_tool_annotations(self)
⋮----
def read_data(path: str) -> str
annotations = ToolAnnotations(
⋮----
tool = manager.add_tool(read_data, annotations=annotations)
⋮----
@pytest.mark.anyio
    async def test_tool_annotations_in_fastmcp(self)
⋮----
app = FastMCP()
⋮----
@app.tool(annotations=ToolAnnotations(title="Echo Tool", readOnlyHint=True))
        def echo(message: str) -> str
tools = await app.list_tools()
````

## File: tests/server/test_lifespan.py
````python
@pytest.mark.anyio
async def test_lowlevel_server_lifespan()
⋮----
@asynccontextmanager
    async def test_lifespan(server: Server) -> AsyncIterator[dict[str, bool]]
⋮----
context = {"started": False, "shutdown": False}
⋮----
server = Server("test", lifespan=test_lifespan)
⋮----
@server.call_tool()
    async def check_lifespan(name: str, arguments: dict) -> list
⋮----
ctx = server.request_context
⋮----
async def run_server()
⋮----
params = InitializeRequestParams(
⋮----
response = await receive_stream2.receive()
response = response.message
⋮----
@pytest.mark.anyio
async def test_fastmcp_server_lifespan()
⋮----
@asynccontextmanager
    async def test_lifespan(server: FastMCP) -> AsyncIterator[dict]
server = FastMCP("test", lifespan=test_lifespan)
⋮----
@server.tool()
    def check_lifespan(ctx: Context) -> bool
````

## File: tests/server/test_lowlevel_tool_annotations.py
````python
@pytest.mark.anyio
async def test_lowlevel_server_tool_annotations()
⋮----
server = Server("test")
⋮----
@server.list_tools()
    async def list_tools()
⋮----
async def run_server()
⋮----
async def handle_messages()
⋮----
tools_result = await client_session.list_tools()
````

## File: tests/server/test_read_resource.py
````python
@pytest.fixture
def temp_file()
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
handler = server.request_handlers[types.ReadResourceRequest]
request = types.ReadResourceRequest(
result = await handler(request)
⋮----
content = result.root.contents[0]
⋮----
@pytest.mark.anyio
async def test_read_resource_binary(temp_file: Path)
⋮----
@pytest.mark.anyio
async def test_read_resource_default_mime(temp_file: Path)
````

## File: tests/server/test_session.py
````python
@pytest.mark.anyio
async def test_server_session_initialize()
⋮----
received_initialized = False
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
caps = server.get_capabilities(notification_options, experimental_capabilities)
⋮----
@server.list_prompts()
    async def list_prompts()
⋮----
@server.list_resources()
    async def list_resources()
⋮----
@pytest.mark.anyio
async def test_server_session_initialize_with_older_protocol_version()
⋮----
received_protocol_version = None
⋮----
async def mock_client()
⋮----
init_response_message = await server_to_client_receive.receive()
⋮----
result_data = init_response_message.message.root.result
init_result = types.InitializeResult.model_validate(result_data)
received_protocol_version = init_result.protocolVersion
````

## File: tests/server/test_stdio.py
````python
@pytest.mark.anyio
async def test_stdio_server()
⋮----
stdin = io.StringIO()
stdout = io.StringIO()
messages = [
⋮----
received_messages = []
⋮----
responses = [
⋮----
session_message = SessionMessage(response)
⋮----
output_lines = stdout.readlines()
⋮----
received_responses = [
````

## File: tests/server/test_streamable_http_manager.py
````python
@pytest.mark.anyio
async def test_run_can_only_be_called_once()
⋮----
app = Server("test-server")
manager = StreamableHTTPSessionManager(app=app)
⋮----
@pytest.mark.anyio
async def test_run_prevents_concurrent_calls()
⋮----
errors = []
async def try_run()
⋮----
@pytest.mark.anyio
async def test_handle_request_without_run_raises_error()
⋮----
scope = {"type": "http", "method": "POST", "path": "/test"}
async def receive()
async def send(message)
````

## File: tests/shared/test_httpx_utils.py
````python
def test_default_settings()
⋮----
client = create_mcp_http_client()
⋮----
def test_custom_parameters()
⋮----
headers = {"Authorization": "Bearer token"}
timeout = httpx.Timeout(60.0)
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
response = await client_connected_to_server.send_ping()
````

## File: tests/shared/test_progress_notifications.py
````python
@pytest.mark.anyio
async def test_bidirectional_progress_notifications()
⋮----
async def run_server()
⋮----
serv_sesh = server_session
⋮----
server_progress_updates = []
client_progress_updates = []
server_progress_token = "server_token_123"
client_progress_token = "client_token_456"
server = Server(name="ProgressTestServer")
⋮----
@server.list_tools()
    async def handle_list_tools() -> list[types.Tool]
⋮----
@server.call_tool()
    async def handle_call_tool(name: str, arguments: dict | None) -> list
⋮----
progressToken = arguments["_meta"]["progressToken"]
⋮----
params = message.root.params
⋮----
@pytest.mark.anyio
async def test_progress_context_manager()
⋮----
server = Server(name="ProgressContextTestServer")
⋮----
progress_token = "client_token_456"
meta = types.RequestParams.Meta(progressToken=progress_token)
request_context = RequestContext(
typed_context = cast(
````

## File: tests/shared/test_session.py
````python
@pytest.fixture
def mcp_server() -> Server
⋮----
response = await client_connected_to_server.send_ping()
⋮----
@pytest.mark.anyio
async def test_request_cancellation()
⋮----
ev_tool_called = anyio.Event()
ev_cancelled = anyio.Event()
request_id = None
def make_server() -> Server
⋮----
server = Server(name="TestSessionServer")
⋮----
@server.call_tool()
        async def handle_call_tool(name: str, arguments: dict | None) -> list
⋮----
request_id = server.request_context.request_id
⋮----
@server.list_tools()
        async def handle_list_tools() -> list[types.Tool]
⋮----
async def make_request(client_session)
⋮----
@pytest.mark.anyio
async def test_connection_closed()
⋮----
ev_closed = anyio.Event()
ev_response = anyio.Event()
⋮----
async def make_request(client_session)
async def mock_server()
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
class ServerTest(Server)
⋮----
def __init__(self)
⋮----
@self.read_resource()
        async def handle_read_resource(uri: AnyUrl) -> str | bytes
⋮----
@self.list_tools()
        async def handle_list_tools() -> list[Tool]
⋮----
@self.call_tool()
        async def handle_call_tool(name: str, args: dict) -> list[TextContent]
def make_server_app() -> Starlette
⋮----
sse = SseServerTransport("/messages/")
server = ServerTest()
async def handle_sse(request: Request) -> Response
app = Starlette(
⋮----
def run_server(server_port: int) -> None
⋮----
app = make_server_app()
server = uvicorn.Server(
⋮----
@pytest.fixture()
def server(server_port: int) -> Generator[None, None, None]
⋮----
proc = multiprocessing.Process(
⋮----
max_attempts = 20
attempt = 0
⋮----
@pytest.fixture()
async def http_client(server, server_url) -> AsyncGenerator[httpx.AsyncClient, None]
⋮----
@pytest.mark.anyio
async def test_raw_sse_connection(http_client: httpx.AsyncClient) -> None
⋮----
async def connection_test() -> None
⋮----
line_number = 0
⋮----
@pytest.mark.anyio
async def test_sse_client_basic_connection(server: None, server_url: str) -> None
⋮----
result = await session.initialize()
⋮----
ping_result = await session.send_ping()
⋮----
session = initialized_sse_client_session
response = await session.read_resource(uri=AnyUrl("foobar://should-work"))
⋮----
response = await session.read_resource(uri=AnyUrl("foobar://1"))
⋮----
response = await session.read_resource(uri=AnyUrl("slow://2"))
⋮----
def run_mounted_server(server_port: int) -> None
⋮----
main_app = Starlette(routes=[Mount("/mounted_app", app=app)])
⋮----
@pytest.fixture()
def mounted_server(server_port: int) -> Generator[None, None, None]
⋮----
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
context_server = RequestContextServer()
⋮----
@pytest.fixture()
def context_server(server_port: int) -> Generator[None, None, None]
⋮----
custom_headers = {
⋮----
tool_result = await session.call_tool("echo_headers", {})
⋮----
headers_data = json.loads(
⋮----
@pytest.mark.anyio
async def test_request_context_isolation(context_server: None, server_url: str) -> None
⋮----
contexts = []
⋮----
headers = {"X-Request-Id": f"request-{i}", "X-Custom-Value": f"value-{i}"}
⋮----
tool_result = await session.call_tool(
⋮----
context_data = json.loads(
⋮----
def test_sse_message_id_coercion()
⋮----
json_message = '{"jsonrpc": "2.0", "id": "123", "method": "ping", "params": null}'
msg = types.JSONRPCMessage.model_validate_json(json_message)
````

## File: tests/shared/test_streamable_http.py
````python
SERVER_NAME = "test_streamable_http_server"
TEST_SESSION_ID = "test-session-id-12345"
INIT_REQUEST = {
class SimpleEventStore(EventStore)
⋮----
def __init__(self)
⋮----
event_id = str(self._event_id_counter)
⋮----
start_index = None
⋮----
start_index = i + 1
⋮----
start_index = 0
stream_id = None
⋮----
stream_id = self._events[start_index][0]
⋮----
class ServerTest(Server)
⋮----
@self.read_resource()
        async def handle_read_resource(uri: AnyUrl) -> str | bytes
⋮----
@self.list_tools()
        async def handle_list_tools() -> list[Tool]
⋮----
@self.call_tool()
        async def handle_call_tool(name: str, args: dict) -> list[TextContent]
⋮----
ctx = self.request_context
⋮----
sampling_result = await ctx.session.create_message(
response = (
⋮----
server = ServerTest()
session_manager = StreamableHTTPSessionManager(
app = Starlette(
⋮----
app = create_app(is_json_response_enabled, event_store)
config = uvicorn.Config(
server = uvicorn.Server(config=config)
⋮----
@pytest.fixture
def basic_server_port() -> int
⋮----
@pytest.fixture
def json_server_port() -> int
⋮----
@pytest.fixture
def basic_server(basic_server_port: int) -> Generator[None, None, None]
⋮----
proc = multiprocessing.Process(
⋮----
max_attempts = 20
attempt = 0
⋮----
@pytest.fixture
def event_store() -> SimpleEventStore
⋮----
@pytest.fixture
def event_server_port() -> int
⋮----
@pytest.fixture
def json_response_server(json_server_port: int) -> Generator[None, None, None]
⋮----
@pytest.fixture
def basic_server_url(basic_server_port: int) -> str
⋮----
@pytest.fixture
def json_server_url(json_server_port: int) -> str
def test_accept_header_validation(basic_server, basic_server_url)
⋮----
response = requests.post(
⋮----
def test_content_type_validation(basic_server, basic_server_url)
def test_json_validation(basic_server, basic_server_url)
def test_json_parsing(basic_server, basic_server_url)
def test_method_not_allowed(basic_server, basic_server_url)
⋮----
response = requests.put(
⋮----
def test_session_validation(basic_server, basic_server_url)
def test_session_id_pattern()
⋮----
valid_session_ids = [
⋮----
invalid_session_ids = [
⋮----
def test_streamable_http_transport_init_validation()
⋮----
valid_transport = StreamableHTTPServerTransport(mcp_session_id="valid-id")
⋮----
none_transport = StreamableHTTPServerTransport(mcp_session_id=None)
⋮----
def test_session_termination(basic_server, basic_server_url)
⋮----
session_id = response.headers.get(MCP_SESSION_ID_HEADER)
response = requests.delete(
⋮----
def test_response(basic_server, basic_server_url)
⋮----
mcp_url = f"{basic_server_url}/mcp"
⋮----
tools_response = requests.post(
⋮----
def test_json_response(json_response_server, json_server_url)
⋮----
mcp_url = f"{json_server_url}/mcp"
⋮----
def test_get_sse_stream(basic_server, basic_server_url)
⋮----
init_response = requests.post(
⋮----
session_id = init_response.headers.get(MCP_SESSION_ID_HEADER)
⋮----
get_response = requests.get(
⋮----
second_get = requests.get(
# Note: This might fail if the first stream fully closed before this runs,
# but generally it should work in the test environment where it runs quickly
⋮----
def test_get_validation(basic_server, basic_server_url)
⋮----
# First, we need to initialize a session
⋮----
# Get the session ID
⋮----
# Test without Accept header
response = requests.get(
⋮----
# Test with wrong Accept header
⋮----
# Client-specific fixtures
⋮----
@pytest.fixture
async def http_client(basic_server, basic_server_url)
⋮----
@pytest.fixture
async def initialized_client_session(basic_server, basic_server_url)
⋮----
@pytest.mark.anyio
async def test_streamablehttp_client_basic_connection(basic_server, basic_server_url)
⋮----
# Test initialization
result = await session.initialize()
⋮----
@pytest.mark.anyio
async def test_streamablehttp_client_resource_read(initialized_client_session)
⋮----
response = await initialized_client_session.read_resource(
⋮----
@pytest.mark.anyio
async def test_streamablehttp_client_tool_invocation(initialized_client_session)
⋮----
# First list tools
tools = await initialized_client_session.list_tools()
⋮----
# Call the tool
result = await initialized_client_session.call_tool("test_tool", {})
⋮----
@pytest.mark.anyio
async def test_streamablehttp_client_error_handling(initialized_client_session)
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
# Check tool listing
⋮----
# Call a tool and verify JSON response handling
result = await session.call_tool("test_tool", {})
⋮----
@pytest.mark.anyio
async def test_streamablehttp_client_get_stream(basic_server, basic_server_url)
⋮----
notifications_received = []
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
captured_session_id = None
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
# Save the original delete method to restore later
original_delete = httpx.AsyncClient.delete
# Mock the client's delete method to return a 204
async def mock_delete(self, *args, **kwargs)
⋮----
response = await original_delete(self, *args, **kwargs)
mocked_response = httpx.Response(
⋮----
@pytest.mark.anyio
async def test_streamablehttp_client_resumption(event_server)
⋮----
captured_resumption_token = None
captured_notifications = []
tool_started = False
⋮----
tool_started = True
async def on_resumption_token_update(token: str) -> None
⋮----
captured_resumption_token = token
⋮----
async def run_tool()
⋮----
metadata = ClientMessageMetadata(
⋮----
captured_notifications_pre = captured_notifications.copy()
⋮----
# Resume the tool with the resumption token
⋮----
result = await session.send_request(
# We should get a complete result
⋮----
# We should have received the remaining notifications
⋮----
# Should not have the first notification
# Check that "Tool started" notification isn't repeated when resuming
⋮----
@pytest.mark.anyio
async def test_streamablehttp_server_sampling(basic_server, basic_server_url)
⋮----
sampling_callback_invoked = False
captured_message_params = None
⋮----
sampling_callback_invoked = True
captured_message_params = params
message_received = (
⋮----
tool_result = await session.call_tool("test_sampling_tool", {})
⋮----
class ContextAwareServerTest(Server)
⋮----
headers_info = {}
⋮----
headers_info = dict(ctx.request.headers)
⋮----
context_data = {
⋮----
request = ctx.request
⋮----
def run_context_aware_server(port: int)
⋮----
server = ContextAwareServerTest()
⋮----
server_instance = uvicorn.Server(
⋮----
@pytest.fixture
def context_aware_server(basic_server_port: int) -> Generator[None, None, None]
⋮----
custom_headers = {
⋮----
tool_result = await session.call_tool("echo_headers", {})
⋮----
headers_data = json.loads(tool_result.content[0].text)
⋮----
contexts = []
⋮----
headers = {
⋮----
tool_result = await session.call_tool(
⋮----
context_data = json.loads(tool_result.content[0].text)
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
class ServerTest(Server)
⋮----
def __init__(self)
⋮----
@self.read_resource()
        async def handle_read_resource(uri: AnyUrl) -> str | bytes
⋮----
@self.list_tools()
        async def handle_list_tools() -> list[Tool]
⋮----
@self.call_tool()
        async def handle_call_tool(name: str, args: dict) -> list[TextContent]
def make_server_app() -> Starlette
⋮----
server = ServerTest()
async def handle_ws(websocket)
app = Starlette(
⋮----
def run_server(server_port: int) -> None
⋮----
app = make_server_app()
server = uvicorn.Server(
⋮----
@pytest.fixture()
def server(server_port: int) -> Generator[None, None, None]
⋮----
proc = multiprocessing.Process(
⋮----
max_attempts = 20
attempt = 0
⋮----
result = await session.initialize()
⋮----
ping_result = await session.send_ping()
⋮----
@pytest.mark.anyio
async def test_ws_client_basic_connection(server: None, server_url: str) -> None
⋮----
result = await initialized_ws_client_session.read_resource(
````

## File: tests/conftest.py
````python
@pytest.fixture
def anyio_backend()
````

## File: tests/test_examples.py
````python
@pytest.mark.anyio
async def test_simple_echo()
⋮----
result = await client.call_tool("echo", {"text": "hello"})
⋮----
content = result.content[0]
⋮----
@pytest.mark.anyio
async def test_complex_inputs()
⋮----
tank = {"shrimp": [{"name": "bob"}, {"name": "alice"}]}
result = await client.call_tool(
⋮----
@pytest.mark.anyio
async def test_desktop(monkeypatch)
⋮----
mock_files = [Path("/fake/path/file1.txt"), Path("/fake/path/file2.txt")]
⋮----
result = await client.call_tool("add", {"a": 1, "b": 2})
⋮----
result = await client.read_resource(AnyUrl("dir://desktop"))
⋮----
content = result.contents[0]
⋮----
file_1 = "/fake/path/file1.txt".replace("/", "\\\\")
file_2 = "/fake/path/file2.txt".replace("/", "\\\\")
⋮----
@pytest.mark.parametrize("example", find_examples("README.md"), ids=str)
def test_docs_examples(example: CodeExample, eval_example: EvalExample)
⋮----
ruff_ignore: list[str] = ["F841", "I001"]
````

## File: tests/test_types.py
````python
@pytest.mark.anyio
async def test_jsonrpc_request()
⋮----
json_data = {
request = JSONRPCMessage.model_validate(json_data)
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
  - sane_lists
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
line-length = 88
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
    - [Prompts](#prompts)
    - [Images](#images)
    - [Context](#context)
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


@mcp.resource("config://app")
def get_config() -> str:
    """Static configuration data"""
    return "App configuration here"


@mcp.resource("users://{user_id}/profile")
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


@mcp.tool()
def calculate_bmi(weight_kg: float, height_m: float) -> float:
    """Calculate BMI given weight in kg and height in meters"""
    return weight_kg / (height_m**2)


@mcp.tool()
async def fetch_weather(city: str) -> str:
    """Fetch current weather for a city"""
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://api.weather.com/{city}")
        return response.text
```

### Prompts

Prompts are reusable templates that help LLMs interact with your server effectively:

```python
from mcp.server.fastmcp import FastMCP
from mcp.server.fastmcp.prompts import base

mcp = FastMCP("My App")


@mcp.prompt()
def review_code(code: str) -> str:
    return f"Please review this code:\n\n{code}"


@mcp.prompt()
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

### Authentication

Authentication can be used by servers that want to expose tools accessing protected resources.

`mcp.server.auth` implements an OAuth 2.0 server interface, which servers can use by
providing an implementation of the `OAuthAuthorizationServerProvider` protocol.

```python
from mcp import FastMCP
from mcp.server.auth.provider import OAuthAuthorizationServerProvider
from mcp.server.auth.settings import (
    AuthSettings,
    ClientRegistrationOptions,
    RevocationOptions,
)


class MyOAuthServerProvider(OAuthAuthorizationServerProvider):
    # See an example on how to implement at `examples/servers/simple-auth`
    ...


mcp = FastMCP(
    "My App",
    auth_server_provider=MyOAuthServerProvider(),
    auth=AuthSettings(
        issuer_url="https://myapp.com",
        revocation_options=RevocationOptions(
            enabled=True,
        ),
        client_registration_options=ClientRegistrationOptions(
            enabled=True,
            valid_scopes=["myscope", "myotherscope"],
            default_scopes=["myscope"],
        ),
        required_scopes=["myscope"],
    ),
)
```

See [OAuthAuthorizationServerProvider](src/mcp/server/auth/provider.py) for more details.

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
