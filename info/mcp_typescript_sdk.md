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
  workflows/
    main.yml
src/
  __mocks__/
    pkce-challenge.ts
  client/
    auth.test.ts
    auth.ts
    cross-spawn.test.ts
    index.test.ts
    index.ts
    sse.test.ts
    sse.ts
    stdio.test.ts
    stdio.ts
    streamableHttp.test.ts
    streamableHttp.ts
    websocket.ts
  examples/
    client/
      multipleClientsParallel.ts
      parallelToolCallsClient.ts
      simpleOAuthClient.ts
      simpleStreamableHttp.ts
      streamableHttpWithSseFallbackClient.ts
    server/
      demoInMemoryOAuthProvider.ts
      jsonResponseStreamableHttp.ts
      mcpServerOutputSchema.ts
      simpleSseServer.ts
      simpleStatelessStreamableHttp.ts
      simpleStreamableHttp.ts
      sseAndStreamableHttpCompatibleServer.ts
      standaloneSseWithGetStreamableHttp.ts
    shared/
      inMemoryEventStore.ts
    README.md
  integration-tests/
    process-cleanup.test.ts
    stateManagementStreamableHttp.test.ts
    taskResumability.test.ts
  server/
    auth/
      handlers/
        authorize.test.ts
        authorize.ts
        metadata.test.ts
        metadata.ts
        register.test.ts
        register.ts
        revoke.test.ts
        revoke.ts
        token.test.ts
        token.ts
      middleware/
        allowedMethods.test.ts
        allowedMethods.ts
        bearerAuth.test.ts
        bearerAuth.ts
        clientAuth.test.ts
        clientAuth.ts
      providers/
        proxyProvider.test.ts
        proxyProvider.ts
      clients.ts
      errors.ts
      provider.ts
      router.test.ts
      router.ts
      types.ts
    completable.test.ts
    completable.ts
    index.test.ts
    index.ts
    mcp.test.ts
    mcp.ts
    sse.test.ts
    sse.ts
    stdio.test.ts
    stdio.ts
    streamableHttp.test.ts
    streamableHttp.ts
  shared/
    auth.ts
    protocol.test.ts
    protocol.ts
    stdio.test.ts
    stdio.ts
    transport.ts
    uriTemplate.test.ts
    uriTemplate.ts
  cli.ts
  inMemory.test.ts
  inMemory.ts
  types.test.ts
  types.ts
.gitattributes
.gitignore
.npmrc
CLAUDE.md
CODE_OF_CONDUCT.md
CONTRIBUTING.md
eslint.config.mjs
jest.config.js
LICENSE
package.json
README.md
SECURITY.md
tsconfig.cjs.json
tsconfig.json
tsconfig.prod.json
```

# Files

## File: .github/workflows/main.yml
````yaml
on:
  push:
    branches:
      - main
  pull_request:
  release:
    types: [published]
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm
      - run: npm ci
      - run: npm run build
      - run: npm test
      - run: npm run lint
  publish:
    runs-on: ubuntu-latest
    if: github.event_name == 'release'
    environment: release
    needs: build
    permissions:
      contents: read
      id-token: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm publish --provenance --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
````

## File: src/__mocks__/pkce-challenge.ts
````typescript
export default function pkceChallenge()
````

## File: src/client/auth.test.ts
````typescript
import {
  discoverOAuthMetadata,
  startAuthorization,
  exchangeAuthorization,
  refreshAuthorization,
  registerClient,
  discoverOAuthProtectedResourceMetadata,
  extractResourceMetadataUrl,
  auth,
  type OAuthClientProvider,
} from "./auth.js";
⋮----
get redirectUrl()
get clientMetadata()
````

## File: src/client/auth.ts
````typescript
import pkceChallenge from "pkce-challenge";
import { LATEST_PROTOCOL_VERSION } from "../types.js";
import type { OAuthClientMetadata, OAuthClientInformation, OAuthTokens, OAuthMetadata, OAuthClientInformationFull, OAuthProtectedResourceMetadata } from "../shared/auth.js";
import { OAuthClientInformationFullSchema, OAuthMetadataSchema, OAuthProtectedResourceMetadataSchema, OAuthTokensSchema } from "../shared/auth.js";
export interface OAuthClientProvider {
  get redirectUrl(): string | URL;
  get clientMetadata(): OAuthClientMetadata;
  state?(): string | Promise<string>;
  clientInformation(): OAuthClientInformation | undefined | Promise<OAuthClientInformation | undefined>;
  saveClientInformation?(clientInformation: OAuthClientInformationFull): void | Promise<void>;
  tokens(): OAuthTokens | undefined | Promise<OAuthTokens | undefined>;
  saveTokens(tokens: OAuthTokens): void | Promise<void>;
  redirectToAuthorization(authorizationUrl: URL): void | Promise<void>;
  saveCodeVerifier(codeVerifier: string): void | Promise<void>;
  codeVerifier(): string | Promise<string>;
}
⋮----
get redirectUrl(): string | URL;
get clientMetadata(): OAuthClientMetadata;
state?(): string | Promise<string>;
clientInformation(): OAuthClientInformation | undefined | Promise<OAuthClientInformation | undefined>;
saveClientInformation?(clientInformation: OAuthClientInformationFull): void | Promise<void>;
tokens(): OAuthTokens | undefined | Promise<OAuthTokens | undefined>;
saveTokens(tokens: OAuthTokens): void | Promise<void>;
redirectToAuthorization(authorizationUrl: URL): void | Promise<void>;
saveCodeVerifier(codeVerifier: string): void | Promise<void>;
codeVerifier(): string | Promise<string>;
⋮----
export type AuthResult = "AUTHORIZED" | "REDIRECT";
export class UnauthorizedError extends Error
⋮----
constructor(message?: string)
⋮----
export async function auth(
  provider: OAuthClientProvider,
  { serverUrl,
    authorizationCode,
    scope,
    resourceMetadataUrl
  }: {
    serverUrl: string | URL;
    authorizationCode?: string;
    scope?: string;
resourceMetadataUrl?: URL }): Promise<AuthResult>
export function extractResourceMetadataUrl(res: Response): URL | undefined
/**
 * Looks up RFC 9728 OAuth 2.0 Protected Resource Metadata.
 *
 * If the server returns a 404 for the well-known endpoint, this function will
 * return `undefined`. Any other errors will be thrown as exceptions.
 */
export async function discoverOAuthProtectedResourceMetadata(
  serverUrl: string | URL,
  opts?: { protocolVersion?: string, resourceMetadataUrl?: string | URL },
): Promise<OAuthProtectedResourceMetadata>
export async function discoverOAuthMetadata(
  authorizationServerUrl: string | URL,
  opts?: { protocolVersion?: string },
): Promise<OAuthMetadata | undefined>
export async function startAuthorization(
  authorizationServerUrl: string | URL,
  {
    metadata,
    clientInformation,
    redirectUrl,
    scope,
    state,
  }: {
    metadata?: OAuthMetadata;
    clientInformation: OAuthClientInformation;
    redirectUrl: string | URL;
    scope?: string;
    state?: string;
  },
): Promise<
export async function exchangeAuthorization(
  authorizationServerUrl: string | URL,
  {
    metadata,
    clientInformation,
    authorizationCode,
    codeVerifier,
    redirectUri,
  }: {
    metadata?: OAuthMetadata;
    clientInformation: OAuthClientInformation;
    authorizationCode: string;
    codeVerifier: string;
    redirectUri: string | URL;
  },
): Promise<OAuthTokens>
export async function refreshAuthorization(
  authorizationServerUrl: string | URL,
  {
    metadata,
    clientInformation,
    refreshToken,
  }: {
    metadata?: OAuthMetadata;
    clientInformation: OAuthClientInformation;
    refreshToken: string;
  },
): Promise<OAuthTokens>
export async function registerClient(
  authorizationServerUrl: string | URL,
  {
    metadata,
    clientMetadata,
  }: {
    metadata?: OAuthMetadata;
    clientMetadata: OAuthClientMetadata;
  },
): Promise<OAuthClientInformationFull>
````

## File: src/client/cross-spawn.test.ts
````typescript
import { StdioClientTransport } from "./stdio.js";
import spawn from "cross-spawn";
import { JSONRPCMessage } from "../types.js";
import { ChildProcess } from "node:child_process";
````

## File: src/client/index.test.ts
````typescript
import { Client } from "./index.js";
import { z } from "zod";
import {
  RequestSchema,
  NotificationSchema,
  ResultSchema,
  LATEST_PROTOCOL_VERSION,
  SUPPORTED_PROTOCOL_VERSIONS,
  InitializeRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  CallToolRequestSchema,
  CreateMessageRequestSchema,
  ListRootsRequestSchema,
  ErrorCode,
} from "../types.js";
import { Transport } from "../shared/transport.js";
import { Server } from "../server/index.js";
import { InMemoryTransport } from "../inMemory.js";
⋮----
type WeatherRequest = z.infer<typeof WeatherRequestSchema>;
type WeatherNotification = z.infer<typeof WeatherNotificationSchema>;
type WeatherResult = z.infer<typeof WeatherResultSchema>;
````

## File: src/client/index.ts
````typescript
import {
  mergeCapabilities,
  Protocol,
  ProtocolOptions,
  RequestOptions,
} from "../shared/protocol.js";
import { Transport } from "../shared/transport.js";
import {
  CallToolRequest,
  CallToolResultSchema,
  ClientCapabilities,
  ClientNotification,
  ClientRequest,
  ClientResult,
  CompatibilityCallToolResultSchema,
  CompleteRequest,
  CompleteResultSchema,
  EmptyResultSchema,
  GetPromptRequest,
  GetPromptResultSchema,
  Implementation,
  InitializeResultSchema,
  LATEST_PROTOCOL_VERSION,
  ListPromptsRequest,
  ListPromptsResultSchema,
  ListResourcesRequest,
  ListResourcesResultSchema,
  ListResourceTemplatesRequest,
  ListResourceTemplatesResultSchema,
  ListToolsRequest,
  ListToolsResultSchema,
  LoggingLevel,
  Notification,
  ReadResourceRequest,
  ReadResourceResultSchema,
  Request,
  Result,
  ServerCapabilities,
  SubscribeRequest,
  SUPPORTED_PROTOCOL_VERSIONS,
  UnsubscribeRequest,
  Tool,
  ErrorCode,
  McpError,
} from "../types.js";
import Ajv from "ajv";
import type { ValidateFunction } from "ajv";
export type ClientOptions = ProtocolOptions & {
  capabilities?: ClientCapabilities;
};
export class Client<
RequestT extends Request = Request,
⋮----
constructor(
    private _clientInfo: Implementation,
    options?: ClientOptions,
)
public registerCapabilities(capabilities: ClientCapabilities): void
protected assertCapability(
    capability: keyof ServerCapabilities,
    method: string,
): void
override async connect(transport: Transport, options?: RequestOptions): Promise<void>
getServerCapabilities(): ServerCapabilities | undefined
getServerVersion(): Implementation | undefined
getInstructions(): string | undefined
protected assertCapabilityForMethod(method: RequestT["method"]): void
protected assertNotificationCapability(
    method: NotificationT["method"],
): void
protected assertRequestHandlerCapability(method: string): void
async ping(options?: RequestOptions)
async complete(params: CompleteRequest["params"], options?: RequestOptions)
async setLoggingLevel(level: LoggingLevel, options?: RequestOptions)
async getPrompt(
    params: GetPromptRequest["params"],
    options?: RequestOptions,
)
async listPrompts(
    params?: ListPromptsRequest["params"],
    options?: RequestOptions,
)
async listResources(
    params?: ListResourcesRequest["params"],
    options?: RequestOptions,
)
async listResourceTemplates(
    params?: ListResourceTemplatesRequest["params"],
    options?: RequestOptions,
)
async readResource(
    params: ReadResourceRequest["params"],
    options?: RequestOptions,
)
async subscribeResource(
    params: SubscribeRequest["params"],
    options?: RequestOptions,
)
async unsubscribeResource(
    params: UnsubscribeRequest["params"],
    options?: RequestOptions,
)
async callTool(
    params: CallToolRequest["params"],
    resultSchema:
      | typeof CallToolResultSchema
      | typeof CompatibilityCallToolResultSchema = CallToolResultSchema,
    options?: RequestOptions,
)
private cacheToolOutputSchemas(tools: Tool[])
private getToolOutputValidator(toolName: string): ValidateFunction | undefined
async listTools(
    params?: ListToolsRequest["params"],
    options?: RequestOptions,
)
async sendRootsListChanged()
````

## File: src/client/sse.test.ts
````typescript
import { createServer, type IncomingMessage, type Server } from "http";
import { AddressInfo } from "net";
import { JSONRPCMessage } from "../types.js";
import { SSEClientTransport } from "./sse.js";
import { OAuthClientProvider, UnauthorizedError } from "./auth.js";
import { OAuthTokens } from "../shared/auth.js";
⋮----
sendServerMessage = (message: string) =>
⋮----
const fetchWithAuth = (url: string | URL, init?: RequestInit) =>
⋮----
get redirectUrl()
get clientMetadata()
````

## File: src/client/sse.ts
````typescript
import { EventSource, type ErrorEvent, type EventSourceInit } from "eventsource";
import { Transport } from "../shared/transport.js";
import { JSONRPCMessage, JSONRPCMessageSchema } from "../types.js";
import { auth, AuthResult, extractResourceMetadataUrl, OAuthClientProvider, UnauthorizedError } from "./auth.js";
export class SseError extends Error
⋮----
constructor(
    public readonly code: number | undefined,
    message: string | undefined,
    public readonly event: ErrorEvent,
)
⋮----
export type SSEClientTransportOptions = {
  authProvider?: OAuthClientProvider;
  eventSourceInit?: EventSourceInit;
  requestInit?: RequestInit;
};
export class SSEClientTransport implements Transport
⋮----
constructor(
    url: URL,
    opts?: SSEClientTransportOptions,
)
private async _authThenStart(): Promise<void>
private async _commonHeaders(): Promise<HeadersInit>
private _startOrAuth(): Promise<void>
async start()
async finishAuth(authorizationCode: string): Promise<void>
async close(): Promise<void>
async send(message: JSONRPCMessage): Promise<void>
````

## File: src/client/stdio.test.ts
````typescript
import { JSONRPCMessage } from "../types.js";
import { StdioClientTransport, StdioServerParameters } from "./stdio.js";
````

## File: src/client/stdio.ts
````typescript
import { ChildProcess, IOType } from "node:child_process";
import spawn from "cross-spawn";
import process from "node:process";
import { Stream, PassThrough } from "node:stream";
import { ReadBuffer, serializeMessage } from "../shared/stdio.js";
import { Transport } from "../shared/transport.js";
import { JSONRPCMessage } from "../types.js";
export type StdioServerParameters = {
  command: string;
  args?: string[];
  env?: Record<string, string>;
  stderr?: IOType | Stream | number;
  cwd?: string;
};
⋮----
export function getDefaultEnvironment(): Record<string, string>
export class StdioClientTransport implements Transport
⋮----
constructor(server: StdioServerParameters)
async start(): Promise<void>
get stderr(): Stream | null
private processReadBuffer()
async close(): Promise<void>
send(message: JSONRPCMessage): Promise<void>
⋮----
function isElectron()
````

## File: src/client/streamableHttp.test.ts
````typescript
import { StreamableHTTPClientTransport, StreamableHTTPReconnectionOptions } from "./streamableHttp.js";
import { OAuthClientProvider, UnauthorizedError } from "./auth.js";
import { JSONRPCMessage } from "../types.js";
⋮----
get redirectUrl()
get clientMetadata()
⋮----
start(controller)
⋮----
const makeStream = (id: string) =>
````

## File: src/client/streamableHttp.ts
````typescript
import { Transport } from "../shared/transport.js";
import { isInitializedNotification, isJSONRPCRequest, isJSONRPCResponse, JSONRPCMessage, JSONRPCMessageSchema } from "../types.js";
import { auth, AuthResult, extractResourceMetadataUrl, OAuthClientProvider, UnauthorizedError } from "./auth.js";
import { EventSourceParserStream } from "eventsource-parser/stream";
⋮----
export class StreamableHTTPError extends Error
⋮----
constructor(
    public readonly code: number | undefined,
    message: string | undefined,
)
⋮----
interface StartSSEOptions {
  resumptionToken?: string;
  onresumptiontoken?: (token: string) => void;
  replayMessageId?: string | number;
}
export interface StreamableHTTPReconnectionOptions {
  maxReconnectionDelay: number;
  initialReconnectionDelay: number;
  reconnectionDelayGrowFactor: number;
  maxRetries: number;
}
export type StreamableHTTPClientTransportOptions = {
  authProvider?: OAuthClientProvider;
  requestInit?: RequestInit;
  reconnectionOptions?: StreamableHTTPReconnectionOptions;
  sessionId?: string;
};
export class StreamableHTTPClientTransport implements Transport
⋮----
constructor(
    url: URL,
    opts?: StreamableHTTPClientTransportOptions,
)
private async _authThenStart(): Promise<void>
private async _commonHeaders(): Promise<Headers>
private async _startOrAuthSse(options: StartSSEOptions): Promise<void>
private _getNextReconnectionDelay(attempt: number): number
private _scheduleReconnection(options: StartSSEOptions, attemptCount = 0): void
private _handleSseStream(stream: ReadableStream<Uint8Array> | null, options: StartSSEOptions): void
⋮----
const processStream = async () =>
⋮----
async start()
async finishAuth(authorizationCode: string): Promise<void>
async close(): Promise<void>
async send(message: JSONRPCMessage | JSONRPCMessage[], options?:
get sessionId(): string | undefined
async terminateSession(): Promise<void>
````

## File: src/client/websocket.ts
````typescript
import { Transport } from "../shared/transport.js";
import { JSONRPCMessage, JSONRPCMessageSchema } from "../types.js";
⋮----
export class WebSocketClientTransport implements Transport
⋮----
constructor(url: URL)
start(): Promise<void>
async close(): Promise<void>
send(message: JSONRPCMessage): Promise<void>
````

## File: src/examples/client/multipleClientsParallel.ts
````typescript
import { Client } from '../../client/index.js';
import { StreamableHTTPClientTransport } from '../../client/streamableHttp.js';
import {
  CallToolRequest,
  CallToolResultSchema,
  LoggingMessageNotificationSchema,
  CallToolResult,
} from '../../types.js';
⋮----
interface ClientConfig {
  id: string;
  name: string;
  toolName: string;
  toolArguments: Record<string, string | number | boolean>;
}
async function createAndRunClient(config: ClientConfig): Promise<
async function main(): Promise<void>
⋮----
// Define client configurations
⋮----
// Display results from all clients
````

## File: src/examples/client/parallelToolCallsClient.ts
````typescript
import { Client } from '../../client/index.js';
import { StreamableHTTPClientTransport } from '../../client/streamableHttp.js';
import {
  ListToolsRequest,
  ListToolsResultSchema,
  CallToolResultSchema,
  LoggingMessageNotificationSchema,
  CallToolResult,
} from '../../types.js';
⋮----
async function main(): Promise<void>
async function listTools(client: Client): Promise<void>
async function startParallelNotificationTools(client: Client): Promise<Record<string, CallToolResult>>
````

## File: src/examples/client/simpleOAuthClient.ts
````typescript
import { createServer } from 'node:http';
import { createInterface } from 'node:readline';
import { URL } from 'node:url';
import { exec } from 'node:child_process';
import { Client } from '../../client/index.js';
import { StreamableHTTPClientTransport } from '../../client/streamableHttp.js';
import { OAuthClientInformation, OAuthClientInformationFull, OAuthClientMetadata, OAuthTokens } from '../../shared/auth.js';
import {
  CallToolRequest,
  ListToolsRequest,
  CallToolResultSchema,
  ListToolsResultSchema
} from '../../types.js';
import { OAuthClientProvider, UnauthorizedError } from '../../client/auth.js';
⋮----
class InMemoryOAuthClientProvider implements OAuthClientProvider
⋮----
constructor(
    private readonly _redirectUrl: string | URL,
    private readonly _clientMetadata: OAuthClientMetadata,
    onRedirect?: (url: URL) => void
)
⋮----
get redirectUrl(): string | URL
get clientMetadata(): OAuthClientMetadata
clientInformation(): OAuthClientInformation | undefined
saveClientInformation(clientInformation: OAuthClientInformationFull): void
tokens(): OAuthTokens | undefined
saveTokens(tokens: OAuthTokens): void
redirectToAuthorization(authorizationUrl: URL): void
saveCodeVerifier(codeVerifier: string): void
codeVerifier(): string
⋮----
class InteractiveOAuthClient
⋮----
constructor(private serverUrl: string)
private async question(query: string): Promise<string>
private async openBrowser(url: string): Promise<void>
private async waitForOAuthCallback(): Promise<string>
private async attemptConnection(oauthProvider: InMemoryOAuthClientProvider): Promise<void>
async connect(): Promise<void>
async interactiveLoop(): Promise<void>
private async listTools(): Promise<void>
private async handleCallTool(command: string): Promise<void>
private async callTool(toolName: string, toolArgs: Record<string, unknown>): Promise<void>
close(): void
⋮----
async function main(): Promise<void>
````

## File: src/examples/client/simpleStreamableHttp.ts
````typescript
import { Client } from '../../client/index.js';
import { StreamableHTTPClientTransport } from '../../client/streamableHttp.js';
import { createInterface } from 'node:readline';
import {
  ListToolsRequest,
  ListToolsResultSchema,
  CallToolRequest,
  CallToolResultSchema,
  ListPromptsRequest,
  ListPromptsResultSchema,
  GetPromptRequest,
  GetPromptResultSchema,
  ListResourcesRequest,
  ListResourcesResultSchema,
  LoggingMessageNotificationSchema,
  ResourceListChangedNotificationSchema,
} from '../../types.js';
⋮----
async function main(): Promise<void>
function printHelp(): void
function commandLoop(): void
async function connect(url?: string): Promise<void>
async function disconnect(): Promise<void>
async function terminateSession(): Promise<void>
async function reconnect(): Promise<void>
async function listTools(): Promise<void>
async function callTool(name: string, args: Record<string, unknown>): Promise<void>
async function callGreetTool(name: string): Promise<void>
async function callMultiGreetTool(name: string): Promise<void>
async function startNotifications(interval: number, count: number): Promise<void>
async function runNotificationsToolWithResumability(interval: number, count: number): Promise<void>
⋮----
const onLastEventIdUpdate = (event: string) =>
⋮----
async function listPrompts(): Promise<void>
async function getPrompt(name: string, args: Record<string, unknown>): Promise<void>
async function listResources(): Promise<void>
async function cleanup(): Promise<void>
````

## File: src/examples/client/streamableHttpWithSseFallbackClient.ts
````typescript
import { Client } from '../../client/index.js';
import { StreamableHTTPClientTransport } from '../../client/streamableHttp.js';
import { SSEClientTransport } from '../../client/sse.js';
import {
  ListToolsRequest,
  ListToolsResultSchema,
  CallToolRequest,
  CallToolResultSchema,
  LoggingMessageNotificationSchema,
} from '../../types.js';
⋮----
async function main(): Promise<void>
async function connectWithBackwardsCompatibility(url: string): Promise<
async function listTools(client: Client): Promise<void>
async function startNotificationTool(client: Client): Promise<void>
````

## File: src/examples/server/demoInMemoryOAuthProvider.ts
````typescript
import { randomUUID } from 'node:crypto';
import { AuthorizationParams, OAuthServerProvider } from '../../server/auth/provider.js';
import { OAuthRegisteredClientsStore } from '../../server/auth/clients.js';
import { OAuthClientInformationFull, OAuthMetadata, OAuthTokens } from 'src/shared/auth.js';
import express, { Request, Response } from "express";
import { AuthInfo } from 'src/server/auth/types.js';
import { createOAuthMetadata, mcpAuthRouter } from 'src/server/auth/router.js';
export class DemoInMemoryClientsStore implements OAuthRegisteredClientsStore
⋮----
async getClient(clientId: string)
async registerClient(clientMetadata: OAuthClientInformationFull)
⋮----
export class DemoInMemoryAuthProvider implements OAuthServerProvider
⋮----
async authorize(
    client: OAuthClientInformationFull,
    params: AuthorizationParams,
    res: Response
): Promise<void>
async challengeForAuthorizationCode(
    client: OAuthClientInformationFull,
    authorizationCode: string
): Promise<string>
async exchangeAuthorizationCode(
    client: OAuthClientInformationFull,
    authorizationCode: string,
    _codeVerifier?: string
): Promise<OAuthTokens>
async exchangeRefreshToken(
    _client: OAuthClientInformationFull,
    _refreshToken: string,
    _scopes?: string[]
): Promise<OAuthTokens>
async verifyAccessToken(token: string): Promise<AuthInfo>
⋮----
export const setupAuthServer = (authServerUrl: URL): OAuthMetadata =>
````

## File: src/examples/server/jsonResponseStreamableHttp.ts
````typescript
import express, { Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import { McpServer } from '../../server/mcp.js';
import { StreamableHTTPServerTransport } from '../../server/streamableHttp.js';
import { z } from 'zod';
import { CallToolResult, isInitializeRequest } from '../../types.js';
const getServer = () =>
⋮----
const sleep = (ms: number)
````

## File: src/examples/server/mcpServerOutputSchema.ts
````typescript
import { McpServer } from "../../server/mcp.js";
import { StdioServerTransport } from "../../server/stdio.js";
import { z } from "zod";
⋮----
async function main()
````

## File: src/examples/server/simpleSseServer.ts
````typescript
import express, { Request, Response } from 'express';
import { McpServer } from '../../server/mcp.js';
import { SSEServerTransport } from '../../server/sse.js';
import { z } from 'zod';
import { CallToolResult } from '../../types.js';
const getServer = () =>
⋮----
const sleep = (ms: number)
````

## File: src/examples/server/simpleStatelessStreamableHttp.ts
````typescript
import express, { Request, Response } from 'express';
import { McpServer } from '../../server/mcp.js';
import { StreamableHTTPServerTransport } from '../../server/streamableHttp.js';
import { z } from 'zod';
import { CallToolResult, GetPromptResult, ReadResourceResult } from '../../types.js';
const getServer = () =>
⋮----
const sleep = (ms: number)
````

## File: src/examples/server/simpleStreamableHttp.ts
````typescript
import express, { Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { McpServer } from '../../server/mcp.js';
import { StreamableHTTPServerTransport } from '../../server/streamableHttp.js';
import { getOAuthProtectedResourceMetadataUrl, mcpAuthMetadataRouter } from '../../server/auth/router.js';
import { requireBearerAuth } from '../../server/auth/middleware/bearerAuth.js';
import { CallToolResult, GetPromptResult, isInitializeRequest, ReadResourceResult } from '../../types.js';
import { InMemoryEventStore } from '../shared/inMemoryEventStore.js';
import { setupAuthServer } from './demoInMemoryOAuthProvider.js';
import { OAuthMetadata } from 'src/shared/auth.js';
⋮----
const getServer = () =>
⋮----
const sleep = (ms: number)
⋮----
const mcpPostHandler = async (req: Request, res: Response) =>
⋮----
const mcpGetHandler = async (req: Request, res: Response) =>
⋮----
const mcpDeleteHandler = async (req: Request, res: Response) =>
````

## File: src/examples/server/sseAndStreamableHttpCompatibleServer.ts
````typescript
import express, { Request, Response } from 'express';
import { randomUUID } from "node:crypto";
import { McpServer } from '../../server/mcp.js';
import { StreamableHTTPServerTransport } from '../../server/streamableHttp.js';
import { SSEServerTransport } from '../../server/sse.js';
import { z } from 'zod';
import { CallToolResult, isInitializeRequest } from '../../types.js';
import { InMemoryEventStore } from '../shared/inMemoryEventStore.js';
const getServer = () =>
⋮----
const sleep = (ms: number)
````

## File: src/examples/server/standaloneSseWithGetStreamableHttp.ts
````typescript
import express, { Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import { McpServer } from '../../server/mcp.js';
import { StreamableHTTPServerTransport } from '../../server/streamableHttp.js';
import { isInitializeRequest, ReadResourceResult } from '../../types.js';
⋮----
const addResource = (name: string, content: string) =>
````

## File: src/examples/shared/inMemoryEventStore.ts
````typescript
import { JSONRPCMessage } from '../../types.js';
import { EventStore } from '../../server/streamableHttp.js';
export class InMemoryEventStore implements EventStore
⋮----
private generateEventId(streamId: string): string
private getStreamIdFromEventId(eventId: string): string
/**
   * Stores an event with a generated event ID
   * Implements EventStore.storeEvent
   */
async storeEvent(streamId: string, message: JSONRPCMessage): Promise<string>
/**
   * Replays events that occurred after a specific event ID
   * Implements EventStore.replayEventsAfter
   */
async replayEventsAfter(lastEventId: string,
    { send }: { send: (eventId: string, message: JSONRPCMessage) => Promise<void> }
): Promise<string>
⋮----
// Extract the stream ID from the event ID
````

## File: src/examples/README.md
````markdown
# MCP TypeScript SDK Examples

This directory contains example implementations of MCP clients and servers using the TypeScript SDK.

## Table of Contents

- [Client Implementations](#client-implementations)
  - [Streamable HTTP Client](#streamable-http-client)
  - [Backwards Compatible Client](#backwards-compatible-client)
- [Server Implementations](#server-implementations)
  - [Single Node Deployment](#single-node-deployment)
    - [Streamable HTTP Transport](#streamable-http-transport)
    - [Deprecated SSE Transport](#deprecated-sse-transport)
    - [Backwards Compatible Server](#streamable-http-backwards-compatible-server-with-sse)
  - [Multi-Node Deployment](#multi-node-deployment)
- [Backwards Compatibility](#testing-streamable-http-backwards-compatibility-with-sse)

## Client Implementations

### Streamable HTTP Client

A full-featured interactive client that connects to a Streamable HTTP server, demonstrating how to:

- Establish and manage a connection to an MCP server
- List and call tools with arguments
- Handle notifications through the SSE stream
- List and get prompts with arguments
- List available resources
- Handle session termination and reconnection
- Support for resumability with Last-Event-ID tracking

```bash
npx tsx src/examples/client/simpleStreamableHttp.ts
```

Example client with OAuth:

```bash
npx tsx src/examples/client/simpleOAuthClient.js
```

### Backwards Compatible Client

A client that implements backwards compatibility according to the [MCP specification](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#backwards-compatibility), allowing it to work with both new and legacy servers. This client demonstrates:

- The client first POSTs an initialize request to the server URL:
  - If successful, it uses the Streamable HTTP transport
  - If it fails with a 4xx status, it attempts a GET request to establish an SSE stream

```bash
npx tsx src/examples/client/streamableHttpWithSseFallbackClient.ts
```

## Server Implementations

### Single Node Deployment

These examples demonstrate how to set up an MCP server on a single node with different transport options.

#### Streamable HTTP Transport

##### Simple Streamable HTTP Server

A server that implements the Streamable HTTP transport (protocol version 2025-03-26). 

- Basic server setup with Express and the Streamable HTTP transport
- Session management with an in-memory event store for resumability
- Tool implementation with the `greet` and `multi-greet` tools
- Prompt implementation with the `greeting-template` prompt
- Static resource exposure
- Support for notifications via SSE stream established by GET requests
- Session termination via DELETE requests

```bash
npx tsx src/examples/server/simpleStreamableHttp.ts

# To add a demo of authentication to this example, use:
npx tsx src/examples/server/simpleStreamableHttp.ts --oauth
```

##### JSON Response Mode Server

A server that uses Streamable HTTP transport with JSON response mode enabled (no SSE). 

- Streamable HTTP with JSON response mode, which returns responses directly in the response body
- Limited support for notifications (since SSE is disabled)
- Proper response handling according to the MCP specification for servers that don't support SSE
- Returning appropriate HTTP status codes for unsupported methods

```bash
npx tsx src/examples/server/jsonResponseStreamableHttp.ts
```

##### Streamable HTTP with server notifications

A server that demonstrates server notifications using Streamable HTTP. 

- Resource list change notifications with dynamically added resources
- Automatic resource creation on a timed interval


```bash
npx tsx src/examples/server/standaloneSseWithGetStreamableHttp.ts
```

#### Deprecated SSE Transport

A server that implements the deprecated HTTP+SSE transport (protocol version 2024-11-05). This example only used for testing backwards compatibility for clients.

- Two separate endpoints: `/mcp` for the SSE stream (GET) and `/messages` for client messages (POST)
- Tool implementation with a `start-notification-stream` tool that demonstrates sending periodic notifications

```bash
npx tsx src/examples/server/simpleSseServer.ts
```

#### Streamable Http Backwards Compatible Server with SSE 

A server that supports both Streamable HTTP and SSE transports, adhering to the [MCP specification for backwards compatibility](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#backwards-compatibility). 

- Single MCP server instance with multiple transport options
- Support for Streamable HTTP requests at `/mcp` endpoint (GET/POST/DELETE)
- Support for deprecated SSE transport with `/sse` (GET) and `/messages` (POST)
- Session type tracking to avoid mixing transport types
- Notifications and tool execution across both transport types

```bash
npx tsx src/examples/server/sseAndStreamableHttpCompatibleServer.ts
```

### Multi-Node Deployment

When deploying MCP servers in a horizontally scaled environment (multiple server instances), there are a few different options that can be useful for different use cases:
- **Stateless mode** - No need to maintain state between calls to MCP servers. Useful for simple API wrapper servers.
- **Persistent storage mode** - No local state needed, but session data is stored in a database. Example: an MCP server for online ordering where the shopping cart is stored in a database.
- **Local state with message routing** - Local state is needed, and all requests for a session must be routed to the correct node. This can be done with a message queue and pub/sub system.

#### Stateless Mode

The Streamable HTTP transport can be configured to operate without tracking sessions. This is perfect for simple API proxies or when each request is completely independent.

##### Implementation

To enable stateless mode, configure the `StreamableHTTPServerTransport` with:
```typescript
sessionIdGenerator: undefined
```

This disables session management entirely, and the server won't generate or expect session IDs.

- No session ID headers are sent or expected
- Any server node can process any request
- No state is preserved between requests
- Perfect for RESTful or stateless API scenarios
- Simplest deployment model with minimal infrastructure requirements

```
┌─────────────────────────────────────────────┐
│                  Client                     │
└─────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│                Load Balancer                │
└─────────────────────────────────────────────┘
          │                       │
          ▼                       ▼
┌─────────────────┐     ┌─────────────────────┐
│  MCP Server #1  │     │    MCP Server #2    │
│ (Node.js)       │     │  (Node.js)          │
└─────────────────┘     └─────────────────────┘
```



#### Persistent Storage Mode

For cases where you need session continuity but don't need to maintain in-memory state on specific nodes, you can use a database to persist session data while still allowing any node to handle requests.

##### Implementation

Configure the transport with session management, but retrieve and store all state in an external persistent storage:

```typescript
sessionIdGenerator: () => randomUUID(),
eventStore: databaseEventStore
```

All session state is stored in the database, and any node can serve any client by retrieving the state when needed.

- Maintains sessions with unique IDs
- Stores all session data in an external database
- Provides resumability through the database-backed EventStore
- Any node can handle any request for the same session
- No node-specific memory state means no need for message routing
- Good for applications where state can be fully externalized
- Somewhat higher latency due to database access for each request


```
┌─────────────────────────────────────────────┐
│                  Client                     │
└─────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│                Load Balancer                │
└─────────────────────────────────────────────┘
          │                       │
          ▼                       ▼
┌─────────────────┐     ┌─────────────────────┐
│  MCP Server #1  │     │    MCP Server #2    │
│ (Node.js)       │     │  (Node.js)          │
└─────────────────┘     └─────────────────────┘
          │                       │
          │                       │
          ▼                       ▼
┌─────────────────────────────────────────────┐
│           Database (PostgreSQL)             │
│                                             │
│  • Session state                            │
│  • Event storage for resumability           │
└─────────────────────────────────────────────┘
```



#### Streamable HTTP with Distributed Message Routing

For scenarios where local in-memory state must be maintained on specific nodes (such as Computer Use or complex session state), the Streamable HTTP transport can be combined with a pub/sub system to route messages to the correct node handling each session.

1. **Bidirectional Message Queue Integration**:
   - All nodes both publish to and subscribe from the message queue
   - Each node registers the sessions it's actively handling
   - Messages are routed based on session ownership

2. **Request Handling Flow**:
   - When a client connects to Node A with an existing `mcp-session-id`
   - If Node A doesn't own this session, it:
     - Establishes and maintains the SSE connection with the client
     - Publishes the request to the message queue with the session ID
     - Node B (which owns the session) receives the request from the queue
     - Node B processes the request with its local session state
     - Node B publishes responses/notifications back to the queue
     - Node A subscribes to the response channel and forwards to the client

3. **Channel Identification**:
   - Each message channel combines both `mcp-session-id` and `stream-id`
   - This ensures responses are correctly routed back to the originating connection

```
┌─────────────────────────────────────────────┐
│                  Client                     │
└─────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│                Load Balancer                │
└─────────────────────────────────────────────┘
          │                       │
          ▼                       ▼
┌─────────────────┐     ┌─────────────────────┐
│  MCP Server #1  │◄───►│    MCP Server #2    │
│ (Has Session A) │     │  (Has Session B)    │
└─────────────────┘     └─────────────────────┘
          ▲│                     ▲│
          │▼                     │▼
┌─────────────────────────────────────────────┐
│         Message Queue / Pub-Sub             │
│                                             │
│  • Session ownership registry               │
│  • Bidirectional message routing            │
│  • Request/response forwarding              │
└─────────────────────────────────────────────┘
```


- Maintains session affinity for stateful operations without client redirection
- Enables horizontal scaling while preserving complex in-memory state
- Provides fault tolerance through the message queue as intermediary


## Backwards Compatibility

### Testing Streamable HTTP Backwards Compatibility with SSE

To test the backwards compatibility features:

1. Start one of the server implementations:
   ```bash
   # Legacy SSE server (protocol version 2024-11-05)
   npx tsx src/examples/server/simpleSseServer.ts
   
   # Streamable HTTP server (protocol version 2025-03-26)
   npx tsx src/examples/server/simpleStreamableHttp.ts
   
   # Backwards compatible server (supports both protocols)
   npx tsx src/examples/server/sseAndStreamableHttpCompatibleServer.ts
   ```

2. Then run the backwards compatible client:
   ```bash
   npx tsx src/examples/client/streamableHttpWithSseFallbackClient.ts
   ```

This demonstrates how the MCP ecosystem ensures interoperability between clients and servers regardless of which protocol version they were built for.
````

## File: src/integration-tests/process-cleanup.test.ts
````typescript
import { Server } from "../server/index.js";
import { StdioServerTransport } from "../server/stdio.js";
````

## File: src/integration-tests/stateManagementStreamableHttp.test.ts
````typescript
import { createServer, type Server } from 'node:http';
import { AddressInfo } from 'node:net';
import { randomUUID } from 'node:crypto';
import { Client } from '../client/index.js';
import { StreamableHTTPClientTransport } from '../client/streamableHttp.js';
import { McpServer } from '../server/mcp.js';
import { StreamableHTTPServerTransport } from '../server/streamableHttp.js';
import { CallToolResultSchema, ListToolsResultSchema, ListResourcesResultSchema, ListPromptsResultSchema } from '../types.js';
import { z } from 'zod';
⋮----
async function setupServer(withSessionManagement: boolean)
````

## File: src/integration-tests/taskResumability.test.ts
````typescript
import { createServer, type Server } from 'node:http';
import { AddressInfo } from 'node:net';
import { randomUUID } from 'node:crypto';
import { Client } from '../client/index.js';
import { StreamableHTTPClientTransport } from '../client/streamableHttp.js';
import { McpServer } from '../server/mcp.js';
import { StreamableHTTPServerTransport } from '../server/streamableHttp.js';
import { CallToolResultSchema, LoggingMessageNotificationSchema } from '../types.js';
import { z } from 'zod';
import { InMemoryEventStore } from '../examples/shared/inMemoryEventStore.js';
````

## File: src/server/auth/handlers/authorize.test.ts
````typescript
import { authorizationHandler, AuthorizationHandlerOptions } from './authorize.js';
import { OAuthServerProvider, AuthorizationParams } from '../provider.js';
import { OAuthRegisteredClientsStore } from '../clients.js';
import { OAuthClientInformationFull, OAuthTokens } from '../../../shared/auth.js';
import express, { Response } from 'express';
import supertest from 'supertest';
import { AuthInfo } from '../types.js';
import { InvalidTokenError } from '../errors.js';
⋮----
async getClient(clientId: string): Promise<OAuthClientInformationFull | undefined>
⋮----
async authorize(client: OAuthClientInformationFull, params: AuthorizationParams, res: Response): Promise<void>
async challengeForAuthorizationCode(): Promise<string>
async exchangeAuthorizationCode(): Promise<OAuthTokens>
async exchangeRefreshToken(): Promise<OAuthTokens>
async verifyAccessToken(token: string): Promise<AuthInfo>
async revokeToken(): Promise<void>
````

## File: src/server/auth/handlers/authorize.ts
````typescript
import { RequestHandler } from "express";
import { z } from "zod";
import express from "express";
import { OAuthServerProvider } from "../provider.js";
import { rateLimit, Options as RateLimitOptions } from "express-rate-limit";
import { allowedMethods } from "../middleware/allowedMethods.js";
import {
  InvalidRequestError,
  InvalidClientError,
  InvalidScopeError,
  ServerError,
  TooManyRequestsError,
  OAuthError
} from "../errors.js";
export type AuthorizationHandlerOptions = {
  provider: OAuthServerProvider;
  rateLimit?: Partial<RateLimitOptions> | false;
};
⋮----
export function authorizationHandler(
function createErrorRedirect(redirectUri: string, error: OAuthError, state?: string): string
````

## File: src/server/auth/handlers/metadata.test.ts
````typescript
import { metadataHandler } from './metadata.js';
import { OAuthMetadata } from '../../../shared/auth.js';
import express from 'express';
import supertest from 'supertest';
````

## File: src/server/auth/handlers/metadata.ts
````typescript
import express, { RequestHandler } from "express";
import { OAuthMetadata, OAuthProtectedResourceMetadata } from "../../../shared/auth.js";
import cors from 'cors';
import { allowedMethods } from "../middleware/allowedMethods.js";
export function metadataHandler(metadata: OAuthMetadata | OAuthProtectedResourceMetadata): RequestHandler
````

## File: src/server/auth/handlers/register.test.ts
````typescript
import { clientRegistrationHandler, ClientRegistrationHandlerOptions } from './register.js';
import { OAuthRegisteredClientsStore } from '../clients.js';
import { OAuthClientInformationFull, OAuthClientMetadata } from '../../../shared/auth.js';
import express from 'express';
import supertest from 'supertest';
⋮----
async getClient(_clientId: string): Promise<OAuthClientInformationFull | undefined>
async registerClient(client: OAuthClientInformationFull): Promise<OAuthClientInformationFull>
````

## File: src/server/auth/handlers/register.ts
````typescript
import express, { RequestHandler } from "express";
import { OAuthClientInformationFull, OAuthClientMetadataSchema } from "../../../shared/auth.js";
import crypto from 'node:crypto';
import cors from 'cors';
import { OAuthRegisteredClientsStore } from "../clients.js";
import { rateLimit, Options as RateLimitOptions } from "express-rate-limit";
import { allowedMethods } from "../middleware/allowedMethods.js";
import {
  InvalidClientMetadataError,
  ServerError,
  TooManyRequestsError,
  OAuthError
} from "../errors.js";
export type ClientRegistrationHandlerOptions = {
  clientsStore: OAuthRegisteredClientsStore;
  clientSecretExpirySeconds?: number;
  rateLimit?: Partial<RateLimitOptions> | false;
};
⋮----
export function clientRegistrationHandler({
  clientsStore,
  clientSecretExpirySeconds = DEFAULT_CLIENT_SECRET_EXPIRY_SECONDS,
  rateLimit: rateLimitConfig
}: ClientRegistrationHandlerOptions): RequestHandler
````

## File: src/server/auth/handlers/revoke.test.ts
````typescript
import { revocationHandler, RevocationHandlerOptions } from './revoke.js';
import { OAuthServerProvider, AuthorizationParams } from '../provider.js';
import { OAuthRegisteredClientsStore } from '../clients.js';
import { OAuthClientInformationFull, OAuthTokenRevocationRequest, OAuthTokens } from '../../../shared/auth.js';
import express, { Response } from 'express';
import supertest from 'supertest';
import { AuthInfo } from '../types.js';
import { InvalidTokenError } from '../errors.js';
⋮----
async getClient(clientId: string): Promise<OAuthClientInformationFull | undefined>
⋮----
async authorize(client: OAuthClientInformationFull, params: AuthorizationParams, res: Response): Promise<void>
async challengeForAuthorizationCode(): Promise<string>
async exchangeAuthorizationCode(): Promise<OAuthTokens>
async exchangeRefreshToken(): Promise<OAuthTokens>
async verifyAccessToken(token: string): Promise<AuthInfo>
async revokeToken(_client: OAuthClientInformationFull, _request: OAuthTokenRevocationRequest): Promise<void>
````

## File: src/server/auth/handlers/revoke.ts
````typescript
import { OAuthServerProvider } from "../provider.js";
import express, { RequestHandler } from "express";
import cors from "cors";
import { authenticateClient } from "../middleware/clientAuth.js";
import { OAuthTokenRevocationRequestSchema } from "../../../shared/auth.js";
import { rateLimit, Options as RateLimitOptions } from "express-rate-limit";
import { allowedMethods } from "../middleware/allowedMethods.js";
import {
  InvalidRequestError,
  ServerError,
  TooManyRequestsError,
  OAuthError
} from "../errors.js";
export type RevocationHandlerOptions = {
  provider: OAuthServerProvider;
  rateLimit?: Partial<RateLimitOptions> | false;
};
export function revocationHandler(
````

## File: src/server/auth/handlers/token.test.ts
````typescript
import { tokenHandler, TokenHandlerOptions } from './token.js';
import { OAuthServerProvider, AuthorizationParams } from '../provider.js';
import { OAuthRegisteredClientsStore } from '../clients.js';
import { OAuthClientInformationFull, OAuthTokenRevocationRequest, OAuthTokens } from '../../../shared/auth.js';
import express, { Response } from 'express';
import supertest from 'supertest';
⋮----
import { InvalidGrantError, InvalidTokenError } from '../errors.js';
import { AuthInfo } from '../types.js';
import { ProxyOAuthServerProvider } from '../providers/proxyProvider.js';
⋮----
async getClient(clientId: string): Promise<OAuthClientInformationFull | undefined>
⋮----
async authorize(client: OAuthClientInformationFull, params: AuthorizationParams, res: Response): Promise<void>
async challengeForAuthorizationCode(client: OAuthClientInformationFull, authorizationCode: string): Promise<string>
async exchangeAuthorizationCode(client: OAuthClientInformationFull, authorizationCode: string): Promise<OAuthTokens>
async exchangeRefreshToken(client: OAuthClientInformationFull, refreshToken: string, scopes?: string[]): Promise<OAuthTokens>
async verifyAccessToken(token: string): Promise<AuthInfo>
async revokeToken(_client: OAuthClientInformationFull, _request: OAuthTokenRevocationRequest): Promise<void>
````

## File: src/server/auth/handlers/token.ts
````typescript
import { z } from "zod";
import express, { RequestHandler } from "express";
import { OAuthServerProvider } from "../provider.js";
import cors from "cors";
import { verifyChallenge } from "pkce-challenge";
import { authenticateClient } from "../middleware/clientAuth.js";
import { rateLimit, Options as RateLimitOptions } from "express-rate-limit";
import { allowedMethods } from "../middleware/allowedMethods.js";
import {
  InvalidRequestError,
  InvalidGrantError,
  UnsupportedGrantTypeError,
  ServerError,
  TooManyRequestsError,
  OAuthError
} from "../errors.js";
export type TokenHandlerOptions = {
  provider: OAuthServerProvider;
  rateLimit?: Partial<RateLimitOptions> | false;
};
⋮----
export function tokenHandler(
````

## File: src/server/auth/middleware/allowedMethods.test.ts
````typescript
import { allowedMethods } from "./allowedMethods.js";
import express, { Request, Response } from "express";
import request from "supertest";
````

## File: src/server/auth/middleware/allowedMethods.ts
````typescript
import { RequestHandler } from "express";
import { MethodNotAllowedError } from "../errors.js";
export function allowedMethods(allowedMethods: string[]): RequestHandler
````

## File: src/server/auth/middleware/bearerAuth.test.ts
````typescript
import { Request, Response } from "express";
import { requireBearerAuth } from "./bearerAuth.js";
import { AuthInfo } from "../types.js";
import { InsufficientScopeError, InvalidTokenError, OAuthError, ServerError } from "../errors.js";
import { OAuthTokenVerifier } from "../provider.js";
````

## File: src/server/auth/middleware/bearerAuth.ts
````typescript
import { RequestHandler } from "express";
import { InsufficientScopeError, InvalidTokenError, OAuthError, ServerError } from "../errors.js";
import { OAuthTokenVerifier } from "../provider.js";
import { AuthInfo } from "../types.js";
export type BearerAuthMiddlewareOptions = {
  verifier: OAuthTokenVerifier;
  requiredScopes?: string[];
  resourceMetadataUrl?: string;
};
⋮----
interface Request {
    auth?: AuthInfo;
  }
⋮----
export function requireBearerAuth(
````

## File: src/server/auth/middleware/clientAuth.test.ts
````typescript
import { authenticateClient, ClientAuthenticationMiddlewareOptions } from './clientAuth.js';
import { OAuthRegisteredClientsStore } from '../clients.js';
import { OAuthClientInformationFull } from '../../../shared/auth.js';
import express from 'express';
import supertest from 'supertest';
⋮----
async getClient(clientId: string): Promise<OAuthClientInformationFull | undefined>
````

## File: src/server/auth/middleware/clientAuth.ts
````typescript
import { z } from "zod";
import { RequestHandler } from "express";
import { OAuthRegisteredClientsStore } from "../clients.js";
import { OAuthClientInformationFull } from "../../../shared/auth.js";
import { InvalidRequestError, InvalidClientError, ServerError, OAuthError } from "../errors.js";
export type ClientAuthenticationMiddlewareOptions = {
  clientsStore: OAuthRegisteredClientsStore;
}
⋮----
interface Request {
    client?: OAuthClientInformationFull;
  }
⋮----
export function authenticateClient(
````

## File: src/server/auth/providers/proxyProvider.test.ts
````typescript
import { Response } from "express";
import { ProxyOAuthServerProvider, ProxyOptions } from "./proxyProvider.js";
import { AuthInfo } from "../types.js";
import { OAuthClientInformationFull, OAuthTokens } from "../../../shared/auth.js";
import { ServerError } from "../errors.js";
import { InvalidTokenError } from "../errors.js";
import { InsufficientScopeError } from "../errors.js";
⋮----
const mockFailedResponse = () =>
````

## File: src/server/auth/providers/proxyProvider.ts
````typescript
import { Response } from "express";
import { OAuthRegisteredClientsStore } from "../clients.js";
import {
  OAuthClientInformationFull,
  OAuthClientInformationFullSchema,
  OAuthTokenRevocationRequest,
  OAuthTokens,
  OAuthTokensSchema,
} from "../../../shared/auth.js";
import { AuthInfo } from "../types.js";
import { AuthorizationParams, OAuthServerProvider } from "../provider.js";
import { ServerError } from "../errors.js";
export type ProxyEndpoints = {
  authorizationUrl: string;
  tokenUrl: string;
  revocationUrl?: string;
  registrationUrl?: string;
};
export type ProxyOptions = {
  endpoints: ProxyEndpoints;
  verifyAccessToken: (token: string) => Promise<AuthInfo>;
  getClient: (clientId: string) => Promise<OAuthClientInformationFull | undefined>;
};
export class ProxyOAuthServerProvider implements OAuthServerProvider
⋮----
constructor(options: ProxyOptions)
get clientsStore(): OAuthRegisteredClientsStore
async authorize(
    client: OAuthClientInformationFull,
    params: AuthorizationParams,
    res: Response
): Promise<void>
async challengeForAuthorizationCode(
    _client: OAuthClientInformationFull,
    _authorizationCode: string
): Promise<string>
async exchangeAuthorizationCode(
    client: OAuthClientInformationFull,
    authorizationCode: string,
    codeVerifier?: string,
    redirectUri?: string
): Promise<OAuthTokens>
async exchangeRefreshToken(
    client: OAuthClientInformationFull,
    refreshToken: string,
    scopes?: string[]
): Promise<OAuthTokens>
async verifyAccessToken(token: string): Promise<AuthInfo>
````

## File: src/server/auth/clients.ts
````typescript
import { OAuthClientInformationFull } from "../../shared/auth.js";
export interface OAuthRegisteredClientsStore {
  getClient(clientId: string): OAuthClientInformationFull | undefined | Promise<OAuthClientInformationFull | undefined>;
  registerClient?(client: OAuthClientInformationFull): OAuthClientInformationFull | Promise<OAuthClientInformationFull>;
}
⋮----
getClient(clientId: string): OAuthClientInformationFull | undefined | Promise<OAuthClientInformationFull | undefined>;
registerClient?(client: OAuthClientInformationFull): OAuthClientInformationFull | Promise<OAuthClientInformationFull>;
````

## File: src/server/auth/errors.ts
````typescript
import { OAuthErrorResponse } from "../../shared/auth.js";
export class OAuthError extends Error
⋮----
constructor(
    public readonly errorCode: string,
    message: string,
    public readonly errorUri?: string
)
toResponseObject(): OAuthErrorResponse
⋮----
export class InvalidRequestError extends OAuthError
⋮----
constructor(message: string, errorUri?: string)
⋮----
export class InvalidClientError extends OAuthError
export class InvalidGrantError extends OAuthError
export class UnauthorizedClientError extends OAuthError
export class UnsupportedGrantTypeError extends OAuthError
export class InvalidScopeError extends OAuthError
export class AccessDeniedError extends OAuthError
export class ServerError extends OAuthError
export class TemporarilyUnavailableError extends OAuthError
export class UnsupportedResponseTypeError extends OAuthError
export class UnsupportedTokenTypeError extends OAuthError
export class InvalidTokenError extends OAuthError
export class MethodNotAllowedError extends OAuthError
export class TooManyRequestsError extends OAuthError
export class InvalidClientMetadataError extends OAuthError
export class InsufficientScopeError extends OAuthError
````

## File: src/server/auth/provider.ts
````typescript
import { Response } from "express";
import { OAuthRegisteredClientsStore } from "./clients.js";
import { OAuthClientInformationFull, OAuthTokenRevocationRequest, OAuthTokens } from "../../shared/auth.js";
import { AuthInfo } from "./types.js";
export type AuthorizationParams = {
  state?: string;
  scopes?: string[];
  codeChallenge: string;
  redirectUri: string;
};
export interface OAuthServerProvider {
  get clientsStore(): OAuthRegisteredClientsStore;
  authorize(client: OAuthClientInformationFull, params: AuthorizationParams, res: Response): Promise<void>;
  challengeForAuthorizationCode(client: OAuthClientInformationFull, authorizationCode: string): Promise<string>;
  exchangeAuthorizationCode(
    client: OAuthClientInformationFull,
    authorizationCode: string,
    codeVerifier?: string,
    redirectUri?: string
  ): Promise<OAuthTokens>;
  exchangeRefreshToken(client: OAuthClientInformationFull, refreshToken: string, scopes?: string[]): Promise<OAuthTokens>;
  verifyAccessToken(token: string): Promise<AuthInfo>;
  revokeToken?(client: OAuthClientInformationFull, request: OAuthTokenRevocationRequest): Promise<void>;
  skipLocalPkceValidation?: boolean;
}
⋮----
get clientsStore(): OAuthRegisteredClientsStore;
authorize(client: OAuthClientInformationFull, params: AuthorizationParams, res: Response): Promise<void>;
challengeForAuthorizationCode(client: OAuthClientInformationFull, authorizationCode: string): Promise<string>;
exchangeAuthorizationCode(
    client: OAuthClientInformationFull,
    authorizationCode: string,
    codeVerifier?: string,
    redirectUri?: string
  ): Promise<OAuthTokens>;
exchangeRefreshToken(client: OAuthClientInformationFull, refreshToken: string, scopes?: string[]): Promise<OAuthTokens>;
verifyAccessToken(token: string): Promise<AuthInfo>;
revokeToken?(client: OAuthClientInformationFull, request: OAuthTokenRevocationRequest): Promise<void>;
⋮----
export interface OAuthTokenVerifier {
  verifyAccessToken(token: string): Promise<AuthInfo>;
}
````

## File: src/server/auth/router.test.ts
````typescript
import { mcpAuthRouter, AuthRouterOptions, mcpAuthMetadataRouter, AuthMetadataOptions } from './router.js';
import { OAuthServerProvider, AuthorizationParams } from './provider.js';
import { OAuthRegisteredClientsStore } from './clients.js';
import { OAuthClientInformationFull, OAuthMetadata, OAuthTokenRevocationRequest, OAuthTokens } from '../../shared/auth.js';
import express, { Response } from 'express';
import supertest from 'supertest';
import { AuthInfo } from './types.js';
import { InvalidTokenError } from './errors.js';
⋮----
async getClient(clientId: string): Promise<OAuthClientInformationFull | undefined>
async registerClient(client: OAuthClientInformationFull): Promise<OAuthClientInformationFull>
⋮----
async authorize(client: OAuthClientInformationFull, params: AuthorizationParams, res: Response): Promise<void>
async challengeForAuthorizationCode(): Promise<string>
async exchangeAuthorizationCode(): Promise<OAuthTokens>
async exchangeRefreshToken(): Promise<OAuthTokens>
async verifyAccessToken(token: string): Promise<AuthInfo>
async revokeToken(_client: OAuthClientInformationFull, _request: OAuthTokenRevocationRequest): Promise<void>
````

## File: src/server/auth/router.ts
````typescript
import express, { RequestHandler } from "express";
import { clientRegistrationHandler, ClientRegistrationHandlerOptions } from "./handlers/register.js";
import { tokenHandler, TokenHandlerOptions } from "./handlers/token.js";
import { authorizationHandler, AuthorizationHandlerOptions } from "./handlers/authorize.js";
import { revocationHandler, RevocationHandlerOptions } from "./handlers/revoke.js";
import { metadataHandler } from "./handlers/metadata.js";
import { OAuthServerProvider } from "./provider.js";
import { OAuthMetadata, OAuthProtectedResourceMetadata } from "../../shared/auth.js";
export type AuthRouterOptions = {
  provider: OAuthServerProvider;
  issuerUrl: URL;
  baseUrl?: URL;
  serviceDocumentationUrl?: URL;
  scopesSupported?: string[];
  resourceName?: string;
  authorizationOptions?: Omit<AuthorizationHandlerOptions, "provider">;
  clientRegistrationOptions?: Omit<ClientRegistrationHandlerOptions, "clientsStore">;
  revocationOptions?: Omit<RevocationHandlerOptions, "provider">;
  tokenOptions?: Omit<TokenHandlerOptions, "provider">;
};
const checkIssuerUrl = (issuer: URL): void =>
export const createOAuthMetadata = (options: {
  provider: OAuthServerProvider,
  issuerUrl: URL,
  baseUrl?: URL
  serviceDocumentationUrl?: URL,
  scopesSupported?: string[];
}): OAuthMetadata =>
export function mcpAuthRouter(options: AuthRouterOptions): RequestHandler
export type AuthMetadataOptions = {
  oauthMetadata: OAuthMetadata;
  resourceServerUrl: URL;
  serviceDocumentationUrl?: URL;
  scopesSupported?: string[];
  resourceName?: string;
}
export function mcpAuthMetadataRouter(options: AuthMetadataOptions)
export function getOAuthProtectedResourceMetadataUrl(serverUrl: URL): string
````

## File: src/server/auth/types.ts
````typescript
export interface AuthInfo {
  token: string;
  clientId: string;
  scopes: string[];
  expiresAt?: number;
  extra?: Record<string, unknown>;
}
````

## File: src/server/completable.test.ts
````typescript
import { z } from "zod";
import { completable } from "./completable.js";
````

## File: src/server/completable.ts
````typescript
import {
  ZodTypeAny,
  ZodTypeDef,
  ZodType,
  ParseInput,
  ParseReturnType,
  RawCreateParams,
  ZodErrorMap,
  ProcessedCreateParams,
} from "zod";
export enum McpZodTypeKind {
  Completable = "McpCompletable",
}
export type CompleteCallback<T extends ZodTypeAny = ZodTypeAny> = (
  value: T["_input"],
) => T["_input"][] | Promise<T["_input"][]>;
export interface CompletableDef<T extends ZodTypeAny = ZodTypeAny>
  extends ZodTypeDef {
  type: T;
  complete: CompleteCallback<T>;
  typeName: McpZodTypeKind.Completable;
}
export class Completable<T extends ZodTypeAny> extends ZodType<
⋮----
_parse(input: ParseInput): ParseReturnType<this["_output"]>
unwrap()
⋮----
export function completable<T extends ZodTypeAny>(
  schema: T,
  complete: CompleteCallback<T>,
): Completable<T>
function processCreateParams(params: RawCreateParams): ProcessedCreateParams
⋮----
const customMap: ZodErrorMap = (iss, ctx) =>
````

## File: src/server/index.test.ts
````typescript
import { Server } from "./index.js";
import { z } from "zod";
import {
  RequestSchema,
  NotificationSchema,
  ResultSchema,
  LATEST_PROTOCOL_VERSION,
  SUPPORTED_PROTOCOL_VERSIONS,
  CreateMessageRequestSchema,
  ListPromptsRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  SetLevelRequestSchema,
  ErrorCode,
} from "../types.js";
import { Transport } from "../shared/transport.js";
import { InMemoryTransport } from "../inMemory.js";
import { Client } from "../client/index.js";
⋮----
type WeatherRequest = z.infer<typeof WeatherRequestSchema>;
type WeatherNotification = z.infer<typeof WeatherNotificationSchema>;
type WeatherResult = z.infer<typeof WeatherResultSchema>;
````

## File: src/server/index.ts
````typescript
import {
  mergeCapabilities,
  Protocol,
  ProtocolOptions,
  RequestOptions,
} from "../shared/protocol.js";
import {
  ClientCapabilities,
  CreateMessageRequest,
  CreateMessageResultSchema,
  EmptyResultSchema,
  Implementation,
  InitializedNotificationSchema,
  InitializeRequest,
  InitializeRequestSchema,
  InitializeResult,
  LATEST_PROTOCOL_VERSION,
  ListRootsRequest,
  ListRootsResultSchema,
  LoggingMessageNotification,
  Notification,
  Request,
  ResourceUpdatedNotification,
  Result,
  ServerCapabilities,
  ServerNotification,
  ServerRequest,
  ServerResult,
  SUPPORTED_PROTOCOL_VERSIONS,
} from "../types.js";
export type ServerOptions = ProtocolOptions & {
  capabilities?: ServerCapabilities;
  instructions?: string;
};
export class Server<
RequestT extends Request = Request,
⋮----
constructor(
    private _serverInfo: Implementation,
    options?: ServerOptions,
)
public registerCapabilities(capabilities: ServerCapabilities): void
protected assertCapabilityForMethod(method: RequestT["method"]): void
protected assertNotificationCapability(
    method: (ServerNotification | NotificationT)["method"],
): void
protected assertRequestHandlerCapability(method: string): void
private async _oninitialize(
    request: InitializeRequest,
): Promise<InitializeResult>
getClientCapabilities(): ClientCapabilities | undefined
getClientVersion(): Implementation | undefined
private getCapabilities(): ServerCapabilities
async ping()
async createMessage(
    params: CreateMessageRequest["params"],
    options?: RequestOptions,
)
async listRoots(
    params?: ListRootsRequest["params"],
    options?: RequestOptions,
)
async sendLoggingMessage(params: LoggingMessageNotification["params"])
async sendResourceUpdated(params: ResourceUpdatedNotification["params"])
async sendResourceListChanged()
async sendToolListChanged()
async sendPromptListChanged()
````

## File: src/server/mcp.test.ts
````typescript
import { McpServer } from "./mcp.js";
import { Client } from "../client/index.js";
import { InMemoryTransport } from "../inMemory.js";
import { z } from "zod";
import {
  ListToolsResultSchema,
  CallToolResultSchema,
  ListResourcesResultSchema,
  ListResourceTemplatesResultSchema,
  ReadResourceResultSchema,
  ListPromptsResultSchema,
  GetPromptResultSchema,
  CompleteResultSchema,
  LoggingMessageNotificationSchema,
  Notification,
  TextContent,
} from "../types.js";
import { ResourceTemplate } from "./mcp.js";
import { completable } from "./completable.js";
import { UriTemplate } from "../shared/uriTemplate.js";
````

## File: src/server/mcp.ts
````typescript
import { Server, ServerOptions } from "./index.js";
import { zodToJsonSchema } from "zod-to-json-schema";
import {
  z,
  ZodRawShape,
  ZodObject,
  ZodString,
  AnyZodObject,
  ZodTypeAny,
  ZodType,
  ZodTypeDef,
  ZodOptional,
} from "zod";
import {
  Implementation,
  Tool,
  ListToolsResult,
  CallToolResult,
  McpError,
  ErrorCode,
  CompleteRequest,
  CompleteResult,
  PromptReference,
  ResourceReference,
  Resource,
  ListResourcesResult,
  ListResourceTemplatesRequestSchema,
  ReadResourceRequestSchema,
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
  CompleteRequestSchema,
  ListPromptsResult,
  Prompt,
  PromptArgument,
  GetPromptResult,
  ReadResourceResult,
  ServerRequest,
  ServerNotification,
  ToolAnnotations,
} from "../types.js";
import { Completable, CompletableDef } from "./completable.js";
import { UriTemplate, Variables } from "../shared/uriTemplate.js";
import { RequestHandlerExtra } from "../shared/protocol.js";
import { Transport } from "../shared/transport.js";
export class McpServer
⋮----
constructor(serverInfo: Implementation, options?: ServerOptions)
async connect(transport: Transport): Promise<void>
async close(): Promise<void>
⋮----
private setToolRequestHandlers()
⋮----
private setCompletionRequestHandler()
private async handlePromptCompletion(
    request: CompleteRequest,
    ref: PromptReference,
): Promise<CompleteResult>
private async handleResourceCompletion(
    request: CompleteRequest,
    ref: ResourceReference,
): Promise<CompleteResult>
⋮----
private setResourceRequestHandlers()
⋮----
private setPromptRequestHandlers()
resource(name: string, uri: string, readCallback: ReadResourceCallback): RegisteredResource;
resource(
    name: string,
    uri: string,
    metadata: ResourceMetadata,
    readCallback: ReadResourceCallback,
  ): RegisteredResource;
resource(
    name: string,
    template: ResourceTemplate,
    readCallback: ReadResourceTemplateCallback,
  ): RegisteredResourceTemplate;
resource(
    name: string,
    template: ResourceTemplate,
    metadata: ResourceMetadata,
    readCallback: ReadResourceTemplateCallback,
  ): RegisteredResourceTemplate;
resource(
    name: string,
    uriOrTemplate: string | ResourceTemplate,
    ...rest: unknown[]
): RegisteredResource | RegisteredResourceTemplate
private _createRegisteredTool(
    name: string,
    description: string | undefined,
    inputSchema: ZodRawShape | undefined,
    outputSchema: ZodRawShape | undefined,
    annotations: ToolAnnotations | undefined,
    callback: ToolCallback<ZodRawShape | undefined>
): RegisteredTool
tool(name: string, cb: ToolCallback): RegisteredTool;
tool(name: string, description: string, cb: ToolCallback): RegisteredTool;
tool<Args extends ZodRawShape>(
    name: string,
    paramsSchemaOrAnnotations: Args | ToolAnnotations,
    cb: ToolCallback<Args>,
  ): RegisteredTool;
tool<Args extends ZodRawShape>(
    name: string,
    description: string,
    paramsSchemaOrAnnotations: Args | ToolAnnotations,
    cb: ToolCallback<Args>,
  ): RegisteredTool;
tool<Args extends ZodRawShape>(
    name: string,
    paramsSchema: Args,
    annotations: ToolAnnotations,
    cb: ToolCallback<Args>,
  ): RegisteredTool;
tool<Args extends ZodRawShape>(
    name: string,
    description: string,
    paramsSchema: Args,
    annotations: ToolAnnotations,
    cb: ToolCallback<Args>,
  ): RegisteredTool;
tool(name: string, ...rest: unknown[]): RegisteredTool
registerTool<InputArgs extends ZodRawShape, OutputArgs extends ZodRawShape>(
    name: string,
    config: {
      description?: string;
      inputSchema?: InputArgs;
      outputSchema?: OutputArgs;
      annotations?: ToolAnnotations;
    },
    cb: ToolCallback<InputArgs>
): RegisteredTool
prompt(name: string, cb: PromptCallback): RegisteredPrompt;
prompt(name: string, description: string, cb: PromptCallback): RegisteredPrompt;
prompt<Args extends PromptArgsRawShape>(
    name: string,
    argsSchema: Args,
    cb: PromptCallback<Args>,
  ): RegisteredPrompt;
prompt<Args extends PromptArgsRawShape>(
    name: string,
    description: string,
    argsSchema: Args,
    cb: PromptCallback<Args>,
  ): RegisteredPrompt;
prompt(name: string, ...rest: unknown[]): RegisteredPrompt
isConnected()
sendResourceListChanged()
sendToolListChanged()
sendPromptListChanged()
⋮----
export type CompleteResourceTemplateCallback = (
  value: string,
) => string[] | Promise<string[]>;
export class ResourceTemplate
⋮----
constructor(
    uriTemplate: string | UriTemplate,
    private _callbacks: {
      list: ListResourcesCallback | undefined;
      complete?: {
        [variable: string]: CompleteResourceTemplateCallback;
      };
    },
)
get uriTemplate(): UriTemplate
get listCallback(): ListResourcesCallback | undefined
completeCallback(
    variable: string,
): CompleteResourceTemplateCallback | undefined
⋮----
export type ToolCallback<Args extends undefined | ZodRawShape = undefined> =
  Args extends ZodRawShape
  ? (
    args: z.objectOutputType<Args, ZodTypeAny>,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ) => CallToolResult | Promise<CallToolResult>
  : (extra: RequestHandlerExtra<ServerRequest, ServerNotification>) => CallToolResult | Promise<CallToolResult>;
export type RegisteredTool = {
  description?: string;
  inputSchema?: AnyZodObject;
  outputSchema?: AnyZodObject;
  annotations?: ToolAnnotations;
  callback: ToolCallback<undefined | ZodRawShape>;
  enabled: boolean;
  enable(): void;
  disable(): void;
  update<InputArgs extends ZodRawShape, OutputArgs extends ZodRawShape>(
    updates: {
      name?: string | null,
      description?: string,
      paramsSchema?: InputArgs,
      outputSchema?: OutputArgs,
      annotations?: ToolAnnotations,
      callback?: ToolCallback<InputArgs>,
      enabled?: boolean
  }): void
  remove(): void
};
⋮----
enable(): void;
disable(): void;
update<InputArgs extends ZodRawShape, OutputArgs extends ZodRawShape>(
remove(): void
⋮----
function isZodRawShape(obj: unknown): obj is ZodRawShape
function isZodTypeLike(value: unknown): value is ZodType
export type ResourceMetadata = Omit<Resource, "uri" | "name">;
export type ListResourcesCallback = (
  extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
) => ListResourcesResult | Promise<ListResourcesResult>;
export type ReadResourceCallback = (
  uri: URL,
  extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
) => ReadResourceResult | Promise<ReadResourceResult>;
export type RegisteredResource = {
  name: string;
  metadata?: ResourceMetadata;
  readCallback: ReadResourceCallback;
  enabled: boolean;
  enable(): void;
  disable(): void;
  update(updates: { name?: string, uri?: string | null, metadata?: ResourceMetadata, callback?: ReadResourceCallback, enabled?: boolean }): void
  remove(): void
};
⋮----
update(updates:
⋮----
export type ReadResourceTemplateCallback = (
  uri: URL,
  variables: Variables,
  extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
) => ReadResourceResult | Promise<ReadResourceResult>;
export type RegisteredResourceTemplate = {
  resourceTemplate: ResourceTemplate;
  metadata?: ResourceMetadata;
  readCallback: ReadResourceTemplateCallback;
  enabled: boolean;
  enable(): void;
  disable(): void;
  update(updates: { name?: string | null, template?: ResourceTemplate, metadata?: ResourceMetadata, callback?: ReadResourceTemplateCallback, enabled?: boolean }): void
  remove(): void
};
type PromptArgsRawShape = {
  [k: string]:
  | ZodType<string, ZodTypeDef, string>
  | ZodOptional<ZodType<string, ZodTypeDef, string>>;
};
export type PromptCallback<
  Args extends undefined | PromptArgsRawShape = undefined,
> = Args extends PromptArgsRawShape
  ? (
    args: z.objectOutputType<Args, ZodTypeAny>,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ) => GetPromptResult | Promise<GetPromptResult>
  : (extra: RequestHandlerExtra<ServerRequest, ServerNotification>) => GetPromptResult | Promise<GetPromptResult>;
export type RegisteredPrompt = {
  description?: string;
  argsSchema?: ZodObject<PromptArgsRawShape>;
  callback: PromptCallback<undefined | PromptArgsRawShape>;
  enabled: boolean;
  enable(): void;
  disable(): void;
  update<Args extends PromptArgsRawShape>(updates: { name?: string | null, description?: string, argsSchema?: Args, callback?: PromptCallback<Args>, enabled?: boolean }): void
  remove(): void
};
⋮----
update<Args extends PromptArgsRawShape>(updates:
⋮----
function promptArgumentsFromSchema(
  schema: ZodObject<PromptArgsRawShape>,
): PromptArgument[]
function createCompletionResult(suggestions: string[]): CompleteResult
````

## File: src/server/sse.test.ts
````typescript
import http from 'http';
import { jest } from '@jest/globals';
import { SSEServerTransport } from './sse.js';
const createMockResponse = () =>
````

## File: src/server/sse.ts
````typescript
import { randomUUID } from "node:crypto";
import { IncomingMessage, ServerResponse } from "node:http";
import { Transport } from "../shared/transport.js";
import { JSONRPCMessage, JSONRPCMessageSchema } from "../types.js";
import getRawBody from "raw-body";
import contentType from "content-type";
import { AuthInfo } from "./auth/types.js";
import { URL } from 'url';
⋮----
export class SSEServerTransport implements Transport
⋮----
constructor(
    private _endpoint: string,
    private res: ServerResponse,
)
async start(): Promise<void>
async handlePostMessage(
    req: IncomingMessage & { auth?: AuthInfo },
    res: ServerResponse,
    parsedBody?: unknown,
): Promise<void>
async handleMessage(message: unknown, extra?:
async close(): Promise<void>
async send(message: JSONRPCMessage): Promise<void>
get sessionId(): string
````

## File: src/server/stdio.test.ts
````typescript
import { Readable, Writable } from "node:stream";
import { ReadBuffer, serializeMessage } from "../shared/stdio.js";
import { JSONRPCMessage } from "../types.js";
import { StdioServerTransport } from "./stdio.js";
⋮----
write(chunk, encoding, callback)
````

## File: src/server/stdio.ts
````typescript
import process from "node:process";
import { Readable, Writable } from "node:stream";
import { ReadBuffer, serializeMessage } from "../shared/stdio.js";
import { JSONRPCMessage } from "../types.js";
import { Transport } from "../shared/transport.js";
export class StdioServerTransport implements Transport
⋮----
constructor(
⋮----
async start(): Promise<void>
private processReadBuffer()
async close(): Promise<void>
send(message: JSONRPCMessage): Promise<void>
````

## File: src/server/streamableHttp.test.ts
````typescript
import { createServer, type Server, IncomingMessage, ServerResponse } from "node:http";
import { AddressInfo } from "node:net";
import { randomUUID } from "node:crypto";
import { EventStore, StreamableHTTPServerTransport, EventId, StreamId } from "./streamableHttp.js";
import { McpServer } from "./mcp.js";
import { CallToolResult, JSONRPCMessage } from "../types.js";
import { z } from "zod";
import { AuthInfo } from "./auth/types.js";
interface TestServerConfig {
  sessionIdGenerator: (() => string) | undefined;
  enableJsonResponse?: boolean;
  customRequestHandler?: (req: IncomingMessage, res: ServerResponse, parsedBody?: unknown) => Promise<void>;
  eventStore?: EventStore;
}
async function createTestServer(config: TestServerConfig =
async function createTestAuthServer(config: TestServerConfig =
async function stopTestServer(
⋮----
async function readSSEEvent(response: Response): Promise<string>
async function sendPostRequest(baseUrl: URL, message: JSONRPCMessage | JSONRPCMessage[], sessionId?: string, extraHeaders?: Record<string, string>): Promise<Response>
function expectErrorResponse(data: unknown, expectedCode: number, expectedMessagePattern: RegExp): void
⋮----
async function initializeServer(): Promise<string>
⋮----
// Clean up - don't wait indefinitely for server close
⋮----
body: "" // Empty as we're using pre-parsed
⋮----
// Set pre-parsed to tools/list
⋮----
// Send actual body with tools/call - should be ignored
⋮----
// Should have processed the pre-parsed body
⋮----
// Test resumability support
⋮----
// Simple implementation of EventStore
⋮----
async storeEvent(streamId: string, message: JSONRPCMessage): Promise<string>
async replayEventsAfter(lastEventId: EventId, { send }: {
      send: (eventId: EventId, message: JSONRPCMessage) => Promise<void>
}): Promise<StreamId>
````

## File: src/server/streamableHttp.ts
````typescript
import { IncomingMessage, ServerResponse } from "node:http";
import { Transport } from "../shared/transport.js";
import { isInitializeRequest, isJSONRPCError, isJSONRPCRequest, isJSONRPCResponse, JSONRPCMessage, JSONRPCMessageSchema, RequestId } from "../types.js";
import getRawBody from "raw-body";
import contentType from "content-type";
import { randomUUID } from "node:crypto";
import { AuthInfo } from "./auth/types.js";
⋮----
export type StreamId = string;
export type EventId = string;
export interface EventStore {
  storeEvent(streamId: StreamId, message: JSONRPCMessage): Promise<EventId>;
  replayEventsAfter(lastEventId: EventId, { send }: {
    send: (eventId: EventId, message: JSONRPCMessage) => Promise<void>
  }): Promise<StreamId>;
}
⋮----
storeEvent(streamId: StreamId, message: JSONRPCMessage): Promise<EventId>;
replayEventsAfter(lastEventId: EventId, { send }: {
    send: (eventId: EventId, message: JSONRPCMessage) => Promise<void>
  }): Promise<StreamId>;
⋮----
export interface StreamableHTTPServerTransportOptions {
  sessionIdGenerator: (() => string) | undefined;
  onsessioninitialized?: (sessionId: string) => void;
  enableJsonResponse?: boolean;
  eventStore?: EventStore;
}
export class StreamableHTTPServerTransport implements Transport
⋮----
constructor(options: StreamableHTTPServerTransportOptions)
async start(): Promise<void>
async handleRequest(req: IncomingMessage &
private async handleGetRequest(req: IncomingMessage, res: ServerResponse): Promise<void>
private async replayEvents(lastEventId: string, res: ServerResponse): Promise<void>
private writeSSEEvent(res: ServerResponse, message: JSONRPCMessage, eventId?: string): boolean
private async handleUnsupportedRequest(res: ServerResponse): Promise<void>
private async handlePostRequest(req: IncomingMessage &
private async handleDeleteRequest(req: IncomingMessage, res: ServerResponse): Promise<void>
private validateSession(req: IncomingMessage, res: ServerResponse): boolean
async close(): Promise<void>
async send(message: JSONRPCMessage, options?:
````

## File: src/shared/auth.ts
````typescript
import { z } from "zod";
⋮----
export type OAuthMetadata = z.infer<typeof OAuthMetadataSchema>;
export type OAuthTokens = z.infer<typeof OAuthTokensSchema>;
export type OAuthErrorResponse = z.infer<typeof OAuthErrorResponseSchema>;
export type OAuthClientMetadata = z.infer<typeof OAuthClientMetadataSchema>;
export type OAuthClientInformation = z.infer<typeof OAuthClientInformationSchema>;
export type OAuthClientInformationFull = z.infer<typeof OAuthClientInformationFullSchema>;
export type OAuthClientRegistrationError = z.infer<typeof OAuthClientRegistrationErrorSchema>;
export type OAuthTokenRevocationRequest = z.infer<typeof OAuthTokenRevocationRequestSchema>;
export type OAuthProtectedResourceMetadata = z.infer<typeof OAuthProtectedResourceMetadataSchema>;
````

## File: src/shared/protocol.test.ts
````typescript
import { ZodType, z } from "zod";
import {
  ClientCapabilities,
  ErrorCode,
  McpError,
  Notification,
  Request,
  Result,
  ServerCapabilities,
} from "../types.js";
import { Protocol, mergeCapabilities } from "./protocol.js";
import { Transport } from "./transport.js";
class MockTransport implements Transport
⋮----
async start(): Promise<void>
async close(): Promise<void>
async send(_message: unknown): Promise<void>
⋮----
protected assertCapabilityForMethod(): void
protected assertNotificationCapability(): void
protected assertRequestHandlerCapability(): void
````

## File: src/shared/protocol.ts
````typescript
import { ZodLiteral, ZodObject, ZodType, z } from "zod";
import {
  CancelledNotificationSchema,
  ClientCapabilities,
  ErrorCode,
  isJSONRPCError,
  isJSONRPCRequest,
  isJSONRPCResponse,
  isJSONRPCNotification,
  JSONRPCError,
  JSONRPCNotification,
  JSONRPCRequest,
  JSONRPCResponse,
  McpError,
  Notification,
  PingRequestSchema,
  Progress,
  ProgressNotification,
  ProgressNotificationSchema,
  Request,
  RequestId,
  Result,
  ServerCapabilities,
  RequestMeta,
} from "../types.js";
import { Transport, TransportSendOptions } from "./transport.js";
import { AuthInfo } from "../server/auth/types.js";
export type ProgressCallback = (progress: Progress) => void;
export type ProtocolOptions = {
  enforceStrictCapabilities?: boolean;
};
⋮----
export type RequestOptions = {
  onprogress?: ProgressCallback;
  signal?: AbortSignal;
  timeout?: number;
  resetTimeoutOnProgress?: boolean;
  maxTotalTimeout?: number;
} & TransportSendOptions;
export type NotificationOptions = {
  relatedRequestId?: RequestId;
}
export type RequestHandlerExtra<SendRequestT extends Request,
  SendNotificationT extends Notification> = {
    signal: AbortSignal;
    authInfo?: AuthInfo;
    sessionId?: string;
    _meta?: RequestMeta;
    requestId: RequestId;
    sendNotification: (notification: SendNotificationT) => Promise<void>;
    sendRequest: <U extends ZodType<object>>(request: SendRequestT, resultSchema: U, options?: RequestOptions) => Promise<z.infer<U>>;
  };
type TimeoutInfo = {
  timeoutId: ReturnType<typeof setTimeout>;
  startTime: number;
  timeout: number;
  maxTotalTimeout?: number;
  resetTimeoutOnProgress: boolean;
  onTimeout: () => void;
};
export abstract class Protocol<
SendRequestT extends Request,
⋮----
constructor(private _options?: ProtocolOptions)
private _setupTimeout(
    messageId: number,
    timeout: number,
    maxTotalTimeout: number | undefined,
    onTimeout: () => void,
    resetTimeoutOnProgress: boolean = false
)
private _resetTimeout(messageId: number): boolean
private _cleanupTimeout(messageId: number)
async connect(transport: Transport): Promise<void>
private _onclose(): void
private _onerror(error: Error): void
private _onnotification(notification: JSONRPCNotification): void
private _onrequest(request: JSONRPCRequest, extra?:
private _onprogress(notification: ProgressNotification): void
private _onresponse(response: JSONRPCResponse | JSONRPCError): void
get transport(): Transport | undefined
async close(): Promise<void>
protected abstract assertCapabilityForMethod(
    method: SendRequestT["method"],
  ): void;
protected abstract assertNotificationCapability(
    method: SendNotificationT["method"],
  ): void;
protected abstract assertRequestHandlerCapability(method: string): void;
request<T extends ZodType<object>>(
    request: SendRequestT,
    resultSchema: T,
    options?: RequestOptions,
): Promise<z.infer<T>>
⋮----
const cancel = (reason: unknown) =>
⋮----
const timeoutHandler = () => cancel(new McpError(
        ErrorCode.RequestTimeout,
        "Request timed out",
        { timeout }
      ));
⋮----
async notification(notification: SendNotificationT, options?: NotificationOptions): Promise<void>
setRequestHandler<
    T extends ZodObject<{
      method: ZodLiteral<string>;
    }>,
  >(
    requestSchema: T,
    handler: (
      request: z.infer<T>,
      extra: RequestHandlerExtra<SendRequestT, SendNotificationT>,
    ) => SendResultT | Promise<SendResultT>,
): void
removeRequestHandler(method: string): void
assertCanSetRequestHandler(method: string): void
setNotificationHandler<
    T extends ZodObject<{
      method: ZodLiteral<string>;
    }>,
  >(
    notificationSchema: T,
    handler: (notification: z.infer<T>) => void | Promise<void>,
): void
removeNotificationHandler(method: string): void
⋮----
export function mergeCapabilities<
  T extends ServerCapabilities | ClientCapabilities,
>(base: T, additional: T): T
````

## File: src/shared/stdio.test.ts
````typescript
import { JSONRPCMessage } from "../types.js";
import { ReadBuffer } from "./stdio.js";
````

## File: src/shared/stdio.ts
````typescript
import { JSONRPCMessage, JSONRPCMessageSchema } from "../types.js";
export class ReadBuffer
⋮----
append(chunk: Buffer): void
readMessage(): JSONRPCMessage | null
clear(): void
⋮----
export function deserializeMessage(line: string): JSONRPCMessage
export function serializeMessage(message: JSONRPCMessage): string
````

## File: src/shared/transport.ts
````typescript
import { AuthInfo } from "../server/auth/types.js";
import { JSONRPCMessage, RequestId } from "../types.js";
export type TransportSendOptions = {
  relatedRequestId?: RequestId;
  resumptionToken?: string;
  onresumptiontoken?: (token: string) => void;
}
export interface Transport {
  start(): Promise<void>;
  send(message: JSONRPCMessage, options?: TransportSendOptions): Promise<void>;
  close(): Promise<void>;
  onclose?: () => void;
  onerror?: (error: Error) => void;
  onmessage?: (message: JSONRPCMessage, extra?: { authInfo?: AuthInfo }) => void;
  sessionId?: string;
}
⋮----
start(): Promise<void>;
send(message: JSONRPCMessage, options?: TransportSendOptions): Promise<void>;
close(): Promise<void>;
````

## File: src/shared/uriTemplate.test.ts
````typescript
import { UriTemplate } from "./uriTemplate.js";
````

## File: src/shared/uriTemplate.ts
````typescript
export type Variables = Record<string, string | string[]>;
⋮----
export class UriTemplate
⋮----
static isTemplate(str: string): boolean
private static validateLength(
    str: string,
    max: number,
    context: string,
): void
⋮----
get variableNames(): string[]
constructor(template: string)
toString(): string
private parse(
    template: string,
  ): Array<
    | string
    | { name: string; operator: string; names: string[]; exploded: boolean }
  > {
    const parts: Array<
      | string
      | { name: string; operator: string; names: string[]; exploded: boolean }
    > = [];
    let currentText = "";
    let i = 0;
    let expressionCount = 0;
while (i < template.length)
private getOperator(expr: string): string
private getNames(expr: string): string[]
private encodeValue(value: string, operator: string): string
private expandPart(
    part: {
      name: string;
      operator: string;
      names: string[];
      exploded: boolean;
    },
    variables: Variables,
): string
expand(variables: Variables): string
private escapeRegExp(str: string): string
private partToRegExp(part: {
    name: string;
    operator: string;
    names: string[];
    exploded: boolean;
}): Array<
match(uri: string): Variables | null
````

## File: src/cli.ts
````typescript
import WebSocket from "ws";
⋮----
import express from "express";
import { Client } from "./client/index.js";
import { SSEClientTransport } from "./client/sse.js";
import { StdioClientTransport } from "./client/stdio.js";
import { WebSocketClientTransport } from "./client/websocket.js";
import { Server } from "./server/index.js";
import { SSEServerTransport } from "./server/sse.js";
import { StdioServerTransport } from "./server/stdio.js";
import { ListResourcesResultSchema } from "./types.js";
async function runClient(url_or_command: string, args: string[])
async function runServer(port: number | null)
````

## File: src/inMemory.test.ts
````typescript
import { InMemoryTransport } from "./inMemory.js";
import { JSONRPCMessage } from "./types.js";
import { AuthInfo } from "./server/auth/types.js";
````

## File: src/inMemory.ts
````typescript
import { Transport } from "./shared/transport.js";
import { JSONRPCMessage, RequestId } from "./types.js";
import { AuthInfo } from "./server/auth/types.js";
interface QueuedMessage {
  message: JSONRPCMessage;
  extra?: { authInfo?: AuthInfo };
}
export class InMemoryTransport implements Transport
⋮----
static createLinkedPair(): [InMemoryTransport, InMemoryTransport]
async start(): Promise<void>
async close(): Promise<void>
async send(message: JSONRPCMessage, options?:
````

## File: src/types.test.ts
````typescript
import { LATEST_PROTOCOL_VERSION, SUPPORTED_PROTOCOL_VERSIONS } from "./types.js";
````

## File: src/types.ts
````typescript
import { z, ZodTypeAny } from "zod";
⋮----
export const isJSONRPCRequest = (value: unknown): value is JSONRPCRequest
⋮----
export const isJSONRPCNotification = (
  value: unknown
): value is JSONRPCNotification
⋮----
export const isJSONRPCResponse = (value: unknown): value is JSONRPCResponse
export enum ErrorCode {
  ConnectionClosed = -32000,
  RequestTimeout = -32001,
  ParseError = -32700,
  InvalidRequest = -32600,
  MethodNotFound = -32601,
  InvalidParams = -32602,
  InternalError = -32603,
}
⋮----
export const isJSONRPCError = (value: unknown): value is JSONRPCError
⋮----
export const isInitializeRequest = (value: unknown): value is InitializeRequest
⋮----
export const isInitializedNotification = (value: unknown): value is InitializedNotification
⋮----
export class McpError extends Error
⋮----
constructor(
    public readonly code: number,
    message: string,
    public readonly data?: unknown,
)
⋮----
type Primitive = string | number | boolean | bigint | null | undefined;
type Flatten<T> = T extends Primitive
  ? T
  : T extends Array<infer U>
  ? Array<Flatten<U>>
  : T extends Set<infer U>
  ? Set<Flatten<U>>
  : T extends Map<infer K, infer V>
  ? Map<Flatten<K>, Flatten<V>>
  : T extends object
  ? { [K in keyof T]: Flatten<T[K]> }
  : T;
type Infer<Schema extends ZodTypeAny> = Flatten<z.infer<Schema>>;
export type ProgressToken = Infer<typeof ProgressTokenSchema>;
export type Cursor = Infer<typeof CursorSchema>;
export type Request = Infer<typeof RequestSchema>;
export type RequestMeta = Infer<typeof RequestMetaSchema>;
export type Notification = Infer<typeof NotificationSchema>;
export type Result = Infer<typeof ResultSchema>;
export type RequestId = Infer<typeof RequestIdSchema>;
export type JSONRPCRequest = Infer<typeof JSONRPCRequestSchema>;
export type JSONRPCNotification = Infer<typeof JSONRPCNotificationSchema>;
export type JSONRPCResponse = Infer<typeof JSONRPCResponseSchema>;
export type JSONRPCError = Infer<typeof JSONRPCErrorSchema>;
export type JSONRPCMessage = Infer<typeof JSONRPCMessageSchema>;
export type EmptyResult = Infer<typeof EmptyResultSchema>;
export type CancelledNotification = Infer<typeof CancelledNotificationSchema>;
export type Implementation = Infer<typeof ImplementationSchema>;
export type ClientCapabilities = Infer<typeof ClientCapabilitiesSchema>;
export type InitializeRequest = Infer<typeof InitializeRequestSchema>;
export type ServerCapabilities = Infer<typeof ServerCapabilitiesSchema>;
export type InitializeResult = Infer<typeof InitializeResultSchema>;
export type InitializedNotification = Infer<typeof InitializedNotificationSchema>;
export type PingRequest = Infer<typeof PingRequestSchema>;
export type Progress = Infer<typeof ProgressSchema>;
export type ProgressNotification = Infer<typeof ProgressNotificationSchema>;
export type PaginatedRequest = Infer<typeof PaginatedRequestSchema>;
export type PaginatedResult = Infer<typeof PaginatedResultSchema>;
export type ResourceContents = Infer<typeof ResourceContentsSchema>;
export type TextResourceContents = Infer<typeof TextResourceContentsSchema>;
export type BlobResourceContents = Infer<typeof BlobResourceContentsSchema>;
export type Resource = Infer<typeof ResourceSchema>;
export type ResourceTemplate = Infer<typeof ResourceTemplateSchema>;
export type ListResourcesRequest = Infer<typeof ListResourcesRequestSchema>;
export type ListResourcesResult = Infer<typeof ListResourcesResultSchema>;
export type ListResourceTemplatesRequest = Infer<typeof ListResourceTemplatesRequestSchema>;
export type ListResourceTemplatesResult = Infer<typeof ListResourceTemplatesResultSchema>;
export type ReadResourceRequest = Infer<typeof ReadResourceRequestSchema>;
export type ReadResourceResult = Infer<typeof ReadResourceResultSchema>;
export type ResourceListChangedNotification = Infer<typeof ResourceListChangedNotificationSchema>;
export type SubscribeRequest = Infer<typeof SubscribeRequestSchema>;
export type UnsubscribeRequest = Infer<typeof UnsubscribeRequestSchema>;
export type ResourceUpdatedNotification = Infer<typeof ResourceUpdatedNotificationSchema>;
export type PromptArgument = Infer<typeof PromptArgumentSchema>;
export type Prompt = Infer<typeof PromptSchema>;
export type ListPromptsRequest = Infer<typeof ListPromptsRequestSchema>;
export type ListPromptsResult = Infer<typeof ListPromptsResultSchema>;
export type GetPromptRequest = Infer<typeof GetPromptRequestSchema>;
export type TextContent = Infer<typeof TextContentSchema>;
export type ImageContent = Infer<typeof ImageContentSchema>;
export type AudioContent = Infer<typeof AudioContentSchema>;
export type EmbeddedResource = Infer<typeof EmbeddedResourceSchema>;
export type PromptMessage = Infer<typeof PromptMessageSchema>;
export type GetPromptResult = Infer<typeof GetPromptResultSchema>;
export type PromptListChangedNotification = Infer<typeof PromptListChangedNotificationSchema>;
export type ToolAnnotations = Infer<typeof ToolAnnotationsSchema>;
export type Tool = Infer<typeof ToolSchema>;
export type ListToolsRequest = Infer<typeof ListToolsRequestSchema>;
export type ListToolsResult = Infer<typeof ListToolsResultSchema>;
export type CallToolResult = Infer<typeof CallToolResultSchema>;
export type CompatibilityCallToolResult = Infer<typeof CompatibilityCallToolResultSchema>;
export type CallToolRequest = Infer<typeof CallToolRequestSchema>;
export type ToolListChangedNotification = Infer<typeof ToolListChangedNotificationSchema>;
export type LoggingLevel = Infer<typeof LoggingLevelSchema>;
export type SetLevelRequest = Infer<typeof SetLevelRequestSchema>;
export type LoggingMessageNotification = Infer<typeof LoggingMessageNotificationSchema>;
export type SamplingMessage = Infer<typeof SamplingMessageSchema>;
export type CreateMessageRequest = Infer<typeof CreateMessageRequestSchema>;
export type CreateMessageResult = Infer<typeof CreateMessageResultSchema>;
export type ResourceReference = Infer<typeof ResourceReferenceSchema>;
export type PromptReference = Infer<typeof PromptReferenceSchema>;
export type CompleteRequest = Infer<typeof CompleteRequestSchema>;
export type CompleteResult = Infer<typeof CompleteResultSchema>;
export type Root = Infer<typeof RootSchema>;
export type ListRootsRequest = Infer<typeof ListRootsRequestSchema>;
export type ListRootsResult = Infer<typeof ListRootsResultSchema>;
export type RootsListChangedNotification = Infer<typeof RootsListChangedNotificationSchema>;
export type ClientRequest = Infer<typeof ClientRequestSchema>;
export type ClientNotification = Infer<typeof ClientNotificationSchema>;
export type ClientResult = Infer<typeof ClientResultSchema>;
export type ServerRequest = Infer<typeof ServerRequestSchema>;
export type ServerNotification = Infer<typeof ServerNotificationSchema>;
export type ServerResult = Infer<typeof ServerResultSchema>;
````

## File: .gitattributes
````
package-lock.json linguist-generated=true
````

## File: .gitignore
````
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*
.pnpm-debug.log*

# Diagnostic reports (https://nodejs.org/api/report.html)
report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage
*.lcov

# nyc test coverage
.nyc_output

# Grunt intermediate storage (https://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/

# Snowpack dependency directory (https://snowpack.dev/)
web_modules/

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional stylelint cache
.stylelintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variable files
.env
.env.development.local
.env.test.local
.env.production.local
.env.local

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next
out

# Nuxt.js build / generate output
.nuxt

# Gatsby files
.cache/
# Comment in the public line in if your project uses Gatsby and not Next.js
# https://nextjs.org/blog/next-9-1#public-directory-support
# public

# vuepress build output
.vuepress/dist

# vuepress v2.x temp and cache directory
.temp
.cache

# Docusaurus cache and generated files
.docusaurus

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# yarn v2
.yarn/cache
.yarn/unplugged
.yarn/build-state.yml
.yarn/install-state.gz
.pnp.*

.DS_Store
dist/
````

## File: .npmrc
````
registry = "https://registry.npmjs.org/"
````

## File: CLAUDE.md
````markdown
# MCP TypeScript SDK Guide

## Build & Test Commands

```sh
npm run build        # Build ESM and CJS versions
npm run lint         # Run ESLint
npm test             # Run all tests
npx jest path/to/file.test.ts  # Run specific test file
npx jest -t "test name"        # Run tests matching pattern
```

## Code Style Guidelines

- **TypeScript**: Strict type checking, ES modules, explicit return types
- **Naming**: PascalCase for classes/types, camelCase for functions/variables
- **Files**: Lowercase with hyphens, test files with `.test.ts` suffix
- **Imports**: ES module style, include `.js` extension, group imports logically
- **Error Handling**: Use TypeScript's strict mode, explicit error checking in tests
- **Formatting**: 2-space indentation, semicolons required, single quotes preferred
- **Testing**: Co-locate tests with source files, use descriptive test names
- **Comments**: JSDoc for public APIs, inline comments for complex logic

## Project Structure

- `/src`: Source code with client, server, and shared modules
- Tests alongside source files with `.test.ts` suffix
- Node.js >= 18 required
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
<mcp-coc@anthropic.com>.
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
<https://www.contributor-covenant.org/version/2/0/code_of_conduct.html>.

Community Impact Guidelines were inspired by [Mozilla's code of conduct
enforcement ladder](https://github.com/mozilla/diversity).

[homepage]: https://www.contributor-covenant.org

For answers to common questions about this code of conduct, see the FAQ at
<https://www.contributor-covenant.org/faq>. Translations are available at
<https://www.contributor-covenant.org/translations>.
````

## File: CONTRIBUTING.md
````markdown
# Contributing to MCP TypeScript SDK

We welcome contributions to the Model Context Protocol TypeScript SDK! This document outlines the process for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR-USERNAME/typescript-sdk.git`
3. Install dependencies: `npm install`
4. Build the project: `npm run build`
5. Run tests: `npm test`

## Development Process

1. Create a new branch for your changes
2. Make your changes
3. Run `npm run lint` to ensure code style compliance
4. Run `npm test` to verify all tests pass
5. Submit a pull request

## Pull Request Guidelines

- Follow the existing code style
- Include tests for new functionality
- Update documentation as needed
- Keep changes focused and atomic
- Provide a clear description of changes

## Running Examples

- Start the server: `npm run server`
- Run the client: `npm run client`

## Code of Conduct

This project follows our [Code of Conduct](CODE_OF_CONDUCT.md). Please review it before contributing.

## Reporting Issues

- Use the [GitHub issue tracker](https://github.com/modelcontextprotocol/typescript-sdk/issues)
- Search existing issues before creating a new one
- Provide clear reproduction steps

## Security Issues

Please review our [Security Policy](SECURITY.md) for reporting security vulnerabilities.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
````

## File: eslint.config.mjs
````
// @ts-check
⋮----
export default tseslint.config(
````

## File: jest.config.js
````javascript
const defaultEsmPreset = createDefaultEsmPreset();
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

## File: package.json
````json
{
  "name": "@modelcontextprotocol/sdk",
  "version": "1.12.2",
  "description": "Model Context Protocol implementation for TypeScript",
  "license": "MIT",
  "author": "Anthropic, PBC (https://anthropic.com)",
  "homepage": "https://modelcontextprotocol.io",
  "bugs": "https://github.com/modelcontextprotocol/typescript-sdk/issues",
  "type": "module",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/modelcontextprotocol/typescript-sdk.git"
  },
  "engines": {
    "node": ">=18"
  },
  "keywords": [
    "modelcontextprotocol",
    "mcp"
  ],
  "exports": {
    "./*": {
      "import": "./dist/esm/*",
      "require": "./dist/cjs/*"
    }
  },
  "typesVersions": {
    "*": {
      "*": [
        "./dist/esm/*"
      ]
    }
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "npm run build:esm && npm run build:cjs",
    "build:esm": "tsc -p tsconfig.prod.json && echo '{\"type\": \"module\"}' > dist/esm/package.json",
    "build:cjs": "tsc -p tsconfig.cjs.json && echo '{\"type\": \"commonjs\"}' > dist/cjs/package.json",
    "prepack": "npm run build:esm && npm run build:cjs",
    "lint": "eslint src/",
    "test": "jest",
    "start": "npm run server",
    "server": "tsx watch --clear-screen=false src/cli.ts server",
    "client": "tsx src/cli.ts client"
  },
  "dependencies": {
    "ajv": "^6.12.6",
    "content-type": "^1.0.5",
    "cors": "^2.8.5",
    "cross-spawn": "^7.0.5",
    "eventsource": "^3.0.2",
    "express": "^5.0.1",
    "express-rate-limit": "^7.5.0",
    "pkce-challenge": "^5.0.0",
    "raw-body": "^3.0.0",
    "zod": "^3.23.8",
    "zod-to-json-schema": "^3.24.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.8.0",
    "@jest-mock/express": "^3.0.0",
    "@types/content-type": "^1.1.8",
    "@types/cors": "^2.8.17",
    "@types/cross-spawn": "^6.0.6",
    "@types/eslint__js": "^8.42.3",
    "@types/eventsource": "^1.1.15",
    "@types/express": "^5.0.0",
    "@types/jest": "^29.5.12",
    "@types/node": "^22.0.2",
    "@types/supertest": "^6.0.2",
    "@types/ws": "^8.5.12",
    "eslint": "^9.8.0",
    "jest": "^29.7.0",
    "supertest": "^7.0.0",
    "ts-jest": "^29.2.4",
    "tsx": "^4.16.5",
    "typescript": "^5.5.4",
    "typescript-eslint": "^8.0.0",
    "ws": "^8.18.0"
  },
  "resolutions": {
    "strip-ansi": "6.0.1"
  }
}
````

## File: README.md
````markdown
# MCP TypeScript SDK ![NPM Version](https://img.shields.io/npm/v/%40modelcontextprotocol%2Fsdk) ![MIT licensed](https://img.shields.io/npm/l/%40modelcontextprotocol%2Fsdk)

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Quickstart](#quick-start)
- [What is MCP?](#what-is-mcp)
- [Core Concepts](#core-concepts)
  - [Server](#server)
  - [Resources](#resources)
  - [Tools](#tools)
  - [Prompts](#prompts)
- [Running Your Server](#running-your-server)
  - [stdio](#stdio)
  - [Streamable HTTP](#streamable-http)
  - [Testing and Debugging](#testing-and-debugging)
- [Examples](#examples)
  - [Echo Server](#echo-server)
  - [SQLite Explorer](#sqlite-explorer)
- [Advanced Usage](#advanced-usage)
  - [Dynamic Servers](#dynamic-servers)
  - [Low-Level Server](#low-level-server)
  - [Writing MCP Clients](#writing-mcp-clients)
  - [Proxy Authorization Requests Upstream](#proxy-authorization-requests-upstream)
  - [Backwards Compatibility](#backwards-compatibility)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Model Context Protocol allows applications to provide context for LLMs in a standardized way, separating the concerns of providing context from the actual LLM interaction. This TypeScript SDK implements the full MCP specification, making it easy to:

- Build MCP clients that can connect to any MCP server
- Create MCP servers that expose resources, prompts and tools
- Use standard transports like stdio and Streamable HTTP
- Handle all MCP protocol messages and lifecycle events

## Installation

```bash
npm install @modelcontextprotocol/sdk
```

## Quick Start

Let's create a simple MCP server that exposes a calculator tool and some data:

```typescript
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "Demo",
  version: "1.0.0"
});

// Add an addition tool
server.tool("add",
  { a: z.number(), b: z.number() },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
);

// Add a dynamic greeting resource
server.resource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  async (uri, { name }) => ({
    contents: [{
      uri: uri.href,
      text: `Hello, ${name}!`
    }]
  })
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
```

## What is MCP?

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io) lets you build servers that expose data and functionality to LLM applications in a secure, standardized way. Think of it like a web API, but specifically designed for LLM interactions. MCP servers can:

- Expose data through **Resources** (think of these sort of like GET endpoints; they are used to load information into the LLM's context)
- Provide functionality through **Tools** (sort of like POST endpoints; they are used to execute code or otherwise produce a side effect)
- Define interaction patterns through **Prompts** (reusable templates for LLM interactions)
- And more!

## Core Concepts

### Server

The McpServer is your core interface to the MCP protocol. It handles connection management, protocol compliance, and message routing:

```typescript
const server = new McpServer({
  name: "My App",
  version: "1.0.0"
});
```

### Resources

Resources are how you expose data to LLMs. They're similar to GET endpoints in a REST API - they provide data but shouldn't perform significant computation or have side effects:

```typescript
// Static resource
server.resource(
  "config",
  "config://app",
  async (uri) => ({
    contents: [{
      uri: uri.href,
      text: "App configuration here"
    }]
  })
);

// Dynamic resource with parameters
server.resource(
  "user-profile",
  new ResourceTemplate("users://{userId}/profile", { list: undefined }),
  async (uri, { userId }) => ({
    contents: [{
      uri: uri.href,
      text: `Profile data for user ${userId}`
    }]
  })
);
```

### Tools

Tools let LLMs take actions through your server. Unlike resources, tools are expected to perform computation and have side effects:

```typescript
// Simple tool with parameters
server.tool(
  "calculate-bmi",
  {
    weightKg: z.number(),
    heightM: z.number()
  },
  async ({ weightKg, heightM }) => ({
    content: [{
      type: "text",
      text: String(weightKg / (heightM * heightM))
    }]
  })
);

// Async tool with external API call
server.tool(
  "fetch-weather",
  { city: z.string() },
  async ({ city }) => {
    const response = await fetch(`https://api.weather.com/${city}`);
    const data = await response.text();
    return {
      content: [{ type: "text", text: data }]
    };
  }
);
```

### Prompts

Prompts are reusable templates that help LLMs interact with your server effectively:

```typescript
server.prompt(
  "review-code",
  { code: z.string() },
  ({ code }) => ({
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: `Please review this code:\n\n${code}`
      }
    }]
  })
);
```

## Running Your Server

MCP servers in TypeScript need to be connected to a transport to communicate with clients. How you start the server depends on the choice of transport:

### stdio

For command-line tools and direct integrations:

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "example-server",
  version: "1.0.0"
});

// ... set up server resources, tools, and prompts ...

const transport = new StdioServerTransport();
await server.connect(transport);
```

### Streamable HTTP

For remote servers, set up a Streamable HTTP transport that handles both client requests and server-to-client notifications.

#### With Session Management

In some cases, servers need to be stateful. This is achieved by [session management](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#session-management).

```typescript
import express from "express";
import { randomUUID } from "node:crypto";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js"



const app = express();
app.use(express.json());

// Map to store transports by session ID
const transports: { [sessionId: string]: StreamableHTTPServerTransport } = {};

// Handle POST requests for client-to-server communication
app.post('/mcp', async (req, res) => {
  // Check for existing session ID
  const sessionId = req.headers['mcp-session-id'] as string | undefined;
  let transport: StreamableHTTPServerTransport;

  if (sessionId && transports[sessionId]) {
    // Reuse existing transport
    transport = transports[sessionId];
  } else if (!sessionId && isInitializeRequest(req.body)) {
    // New initialization request
    transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
      onsessioninitialized: (sessionId) => {
        // Store the transport by session ID
        transports[sessionId] = transport;
      }
    });

    // Clean up transport when closed
    transport.onclose = () => {
      if (transport.sessionId) {
        delete transports[transport.sessionId];
      }
    };
    const server = new McpServer({
      name: "example-server",
      version: "1.0.0"
    });

    // ... set up server resources, tools, and prompts ...

    // Connect to the MCP server
    await server.connect(transport);
  } else {
    // Invalid request
    res.status(400).json({
      jsonrpc: '2.0',
      error: {
        code: -32000,
        message: 'Bad Request: No valid session ID provided',
      },
      id: null,
    });
    return;
  }

  // Handle the request
  await transport.handleRequest(req, res, req.body);
});

// Reusable handler for GET and DELETE requests
const handleSessionRequest = async (req: express.Request, res: express.Response) => {
  const sessionId = req.headers['mcp-session-id'] as string | undefined;
  if (!sessionId || !transports[sessionId]) {
    res.status(400).send('Invalid or missing session ID');
    return;
  }
  
  const transport = transports[sessionId];
  await transport.handleRequest(req, res);
};

// Handle GET requests for server-to-client notifications via SSE
app.get('/mcp', handleSessionRequest);

// Handle DELETE requests for session termination
app.delete('/mcp', handleSessionRequest);

app.listen(3000);
```

#### Without Session Management (Stateless)

For simpler use cases where session management isn't needed:

```typescript
const app = express();
app.use(express.json());

app.post('/mcp', async (req: Request, res: Response) => {
  // In stateless mode, create a new instance of transport and server for each request
  // to ensure complete isolation. A single instance would cause request ID collisions
  // when multiple clients connect concurrently.
  
  try {
    const server = getServer(); 
    const transport: StreamableHTTPServerTransport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });
    res.on('close', () => {
      console.log('Request closed');
      transport.close();
      server.close();
    });
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error('Error handling MCP request:', error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: 'Internal server error',
        },
        id: null,
      });
    }
  }
});

app.get('/mcp', async (req: Request, res: Response) => {
  console.log('Received GET MCP request');
  res.writeHead(405).end(JSON.stringify({
    jsonrpc: "2.0",
    error: {
      code: -32000,
      message: "Method not allowed."
    },
    id: null
  }));
});

app.delete('/mcp', async (req: Request, res: Response) => {
  console.log('Received DELETE MCP request');
  res.writeHead(405).end(JSON.stringify({
    jsonrpc: "2.0",
    error: {
      code: -32000,
      message: "Method not allowed."
    },
    id: null
  }));
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`MCP Stateless Streamable HTTP Server listening on port ${PORT}`);
});

```

This stateless approach is useful for:

- Simple API wrappers
- RESTful scenarios where each request is independent
- Horizontally scaled deployments without shared session state

### Testing and Debugging

To test your server, you can use the [MCP Inspector](https://github.com/modelcontextprotocol/inspector). See its README for more information.

## Examples

### Echo Server

A simple server demonstrating resources, tools, and prompts:

```typescript
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const server = new McpServer({
  name: "Echo",
  version: "1.0.0"
});

server.resource(
  "echo",
  new ResourceTemplate("echo://{message}", { list: undefined }),
  async (uri, { message }) => ({
    contents: [{
      uri: uri.href,
      text: `Resource echo: ${message}`
    }]
  })
);

server.tool(
  "echo",
  { message: z.string() },
  async ({ message }) => ({
    content: [{ type: "text", text: `Tool echo: ${message}` }]
  })
);

server.prompt(
  "echo",
  { message: z.string() },
  ({ message }) => ({
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: `Please process this message: ${message}`
      }
    }]
  })
);
```

### SQLite Explorer

A more complex example showing database integration:

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import sqlite3 from "sqlite3";
import { promisify } from "util";
import { z } from "zod";

const server = new McpServer({
  name: "SQLite Explorer",
  version: "1.0.0"
});

// Helper to create DB connection
const getDb = () => {
  const db = new sqlite3.Database("database.db");
  return {
    all: promisify<string, any[]>(db.all.bind(db)),
    close: promisify(db.close.bind(db))
  };
};

server.resource(
  "schema",
  "schema://main",
  async (uri) => {
    const db = getDb();
    try {
      const tables = await db.all(
        "SELECT sql FROM sqlite_master WHERE type='table'"
      );
      return {
        contents: [{
          uri: uri.href,
          text: tables.map((t: {sql: string}) => t.sql).join("\n")
        }]
      };
    } finally {
      await db.close();
    }
  }
);

server.tool(
  "query",
  { sql: z.string() },
  async ({ sql }) => {
    const db = getDb();
    try {
      const results = await db.all(sql);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(results, null, 2)
        }]
      };
    } catch (err: unknown) {
      const error = err as Error;
      return {
        content: [{
          type: "text",
          text: `Error: ${error.message}`
        }],
        isError: true
      };
    } finally {
      await db.close();
    }
  }
);
```

## Advanced Usage

### Dynamic Servers

If you want to offer an initial set of tools/prompts/resources, but later add additional ones based on user action or external state change, you can add/update/remove them _after_ the Server is connected. This will automatically emit the corresponding `listChanged` notifications:

```ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const server = new McpServer({
  name: "Dynamic Example",
  version: "1.0.0"
});

const listMessageTool = server.tool(
  "listMessages",
  { channel: z.string() },
  async ({ channel }) => ({
    content: [{ type: "text", text: await listMessages(channel) }]
  })
);

const putMessageTool = server.tool(
  "putMessage",
  { channel: z.string(), message: z.string() },
  async ({ channel, message }) => ({
    content: [{ type: "text", text: await putMessage(channel, string) }]
  })
);
// Until we upgrade auth, `putMessage` is disabled (won't show up in listTools)
putMessageTool.disable()

const upgradeAuthTool = server.tool(
  "upgradeAuth",
  { permission: z.enum(["write', admin"])},
  // Any mutations here will automatically emit `listChanged` notifications
  async ({ permission }) => {
    const { ok, err, previous } = await upgradeAuthAndStoreToken(permission)
    if (!ok) return {content: [{ type: "text", text: `Error: ${err}` }]}

    // If we previously had read-only access, 'putMessage' is now available
    if (previous === "read") {
      putMessageTool.enable()
    }

    if (permission === 'write') {
      // If we've just upgraded to 'write' permissions, we can still call 'upgradeAuth' 
      // but can only upgrade to 'admin'. 
      upgradeAuthTool.update({
        paramSchema: { permission: z.enum(["admin"]) }, // change validation rules
      })
    } else {
      // If we're now an admin, we no longer have anywhere to upgrade to, so fully remove that tool
      upgradeAuthTool.remove()
    }
  }
)

// Connect as normal
const transport = new StdioServerTransport();
await server.connect(transport);
```

### Low-Level Server

For more control, you can use the low-level Server class directly:

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListPromptsRequestSchema,
  GetPromptRequestSchema
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "example-server",
    version: "1.0.0"
  },
  {
    capabilities: {
      prompts: {}
    }
  }
);

server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [{
      name: "example-prompt",
      description: "An example prompt template",
      arguments: [{
        name: "arg1",
        description: "Example argument",
        required: true
      }]
    }]
  };
});

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  if (request.params.name !== "example-prompt") {
    throw new Error("Unknown prompt");
  }
  return {
    description: "Example prompt",
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: "Example prompt text"
      }
    }]
  };
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

### Writing MCP Clients

The SDK provides a high-level client interface:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "node",
  args: ["server.js"]
});

const client = new Client(
  {
    name: "example-client",
    version: "1.0.0"
  }
);

await client.connect(transport);

// List prompts
const prompts = await client.listPrompts();

// Get a prompt
const prompt = await client.getPrompt({
  name: "example-prompt",
  arguments: {
    arg1: "value"
  }
});

// List resources
const resources = await client.listResources();

// Read a resource
const resource = await client.readResource({
  uri: "file:///example.txt"
});

// Call a tool
const result = await client.callTool({
  name: "example-tool",
  arguments: {
    arg1: "value"
  }
});
```

### Proxy Authorization Requests Upstream

You can proxy OAuth requests to an external authorization provider:

```typescript
import express from 'express';
import { ProxyOAuthServerProvider } from '@modelcontextprotocol/sdk/server/auth/providers/proxyProvider.js';
import { mcpAuthRouter } from '@modelcontextprotocol/sdk/server/auth/router.js';

const app = express();

const proxyProvider = new ProxyOAuthServerProvider({
    endpoints: {
        authorizationUrl: "https://auth.external.com/oauth2/v1/authorize",
        tokenUrl: "https://auth.external.com/oauth2/v1/token",
        revocationUrl: "https://auth.external.com/oauth2/v1/revoke",
    },
    verifyAccessToken: async (token) => {
        return {
            token,
            clientId: "123",
            scopes: ["openid", "email", "profile"],
        }
    },
    getClient: async (client_id) => {
        return {
            client_id,
            redirect_uris: ["http://localhost:3000/callback"],
        }
    }
})

app.use(mcpAuthRouter({
    provider: proxyProvider,
    issuerUrl: new URL("http://auth.external.com"),
    baseUrl: new URL("http://mcp.example.com"),
    serviceDocumentationUrl: new URL("https://docs.example.com/"),
}))
```

This setup allows you to:

- Forward OAuth requests to an external provider
- Add custom token validation logic
- Manage client registrations
- Provide custom documentation URLs
- Maintain control over the OAuth flow while delegating to an external provider

### Backwards Compatibility

Clients and servers with StreamableHttp tranport can maintain [backwards compatibility](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#backwards-compatibility) with the deprecated HTTP+SSE transport (from protocol version 2024-11-05) as follows

#### Client-Side Compatibility

For clients that need to work with both Streamable HTTP and older SSE servers:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
let client: Client|undefined = undefined
const baseUrl = new URL(url);
try {
  client = new Client({
    name: 'streamable-http-client',
    version: '1.0.0'
  });
  const transport = new StreamableHTTPClientTransport(
    new URL(baseUrl)
  );
  await client.connect(transport);
  console.log("Connected using Streamable HTTP transport");
} catch (error) {
  // If that fails with a 4xx error, try the older SSE transport
  console.log("Streamable HTTP connection failed, falling back to SSE transport");
  client = new Client({
    name: 'sse-client',
    version: '1.0.0'
  });
  const sseTransport = new SSEClientTransport(baseUrl);
  await client.connect(sseTransport);
  console.log("Connected using SSE transport");
}
```

#### Server-Side Compatibility

For servers that need to support both Streamable HTTP and older clients:

```typescript
import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

const server = new McpServer({
  name: "backwards-compatible-server",
  version: "1.0.0"
});

// ... set up server resources, tools, and prompts ...

const app = express();
app.use(express.json());

// Store transports for each session type
const transports = {
  streamable: {} as Record<string, StreamableHTTPServerTransport>,
  sse: {} as Record<string, SSEServerTransport>
};

// Modern Streamable HTTP endpoint
app.all('/mcp', async (req, res) => {
  // Handle Streamable HTTP transport for modern clients
  // Implementation as shown in the "With Session Management" example
  // ...
});

// Legacy SSE endpoint for older clients
app.get('/sse', async (req, res) => {
  // Create SSE transport for legacy clients
  const transport = new SSEServerTransport('/messages', res);
  transports.sse[transport.sessionId] = transport;
  
  res.on("close", () => {
    delete transports.sse[transport.sessionId];
  });
  
  await server.connect(transport);
});

// Legacy message endpoint for older clients
app.post('/messages', async (req, res) => {
  const sessionId = req.query.sessionId as string;
  const transport = transports.sse[sessionId];
  if (transport) {
    await transport.handlePostMessage(req, res, req.body);
  } else {
    res.status(400).send('No transport found for sessionId');
  }
});

app.listen(3000);
```

**Note**: The SSE transport is now deprecated in favor of Streamable HTTP. New implementations should use Streamable HTTP, and existing SSE implementations should plan to migrate.

## Documentation

- [Model Context Protocol documentation](https://modelcontextprotocol.io)
- [MCP Specification](https://spec.modelcontextprotocol.io)
- [Example Servers](https://github.com/modelcontextprotocol/servers)

## Contributing

Issues and pull requests are welcome on GitHub at <https://github.com/modelcontextprotocol/typescript-sdk>.

## License

This project is licensed under the MIT License—see the [LICENSE](LICENSE) file for details.
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

## File: tsconfig.cjs.json
````json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "./dist/cjs"
  },
  "exclude": ["**/*.test.ts", "src/__mocks__/**/*"]
}
````

## File: tsconfig.json
````json
{
  "compilerOptions": {
    "target": "es2018",
    "module": "Node16",
    "moduleResolution": "Node16",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "pkce-challenge": ["node_modules/pkce-challenge/dist/index.node"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
````

## File: tsconfig.prod.json
````json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist/esm"
  },
  "exclude": ["**/*.test.ts", "src/__mocks__/**/*"]
}
````
