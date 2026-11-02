# Iditena API

Public JSON feeds behind iditena.org, a site covering the September 2026 Russian State Duma elections: single-member district results, the district/candidate finder index, polling-station (UIK) locations, and site visitor counters per district. Knowledge source: the community Swift client https://github.com/l0v3m0n3y/iditena (src/iditena.swift lists four endpoints; there is no documentation) and live GET probes on 2026-10-23, from which every schema here is taken. getUikRegion is not in the client; its path comes from the &#39;file&#39; field of getUikIndex and was probed for one region. Unverified: the meaning of the two integers per district in getDistrictVisitors (undocumented); /api/results with no district parameter returns a different, all-district summary shape that is not modelled here; only 68 of 83 regions carry a &#39;file&#39; for getUikRegion, so the others probably 404. Text is in Russian. The data is a post-election snapshot and may stop updating.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 5 entities and 5 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### DistrictResult

Results: District results.

SDK operations: `list`.

Key fields to recognise:

- `candidates`: Single-member district candidates, highest first.
- `invalid`: A vote count and its percentage share.
- `parties`: Party-list results within the district.
- `partiesInvalid`: A vote count and its percentage share.
- `partiesTurnout`: A vote count and its percentage share.

### FinderIndex

Results: Finder index.

SDK operations: `list`.

### UikIndex

Results: UIK index.

SDK operations: `list`.

Key fields to recognise:

- `cik`: Region code.
- `file`: Polling-station file name under /data/uik/; absent for some regions.

### UikRegion

Results: Polling stations in the region.

SDK operations: `list`.

Key fields to recognise:

- `district`: Single-member district number.
- `n`: Polling station (UIK) number.

### VisitorReport

Results: Visitor counters keyed by district number.

SDK operations: `load`.

Key fields to recognise:

- `closedAt`: Poll closing time per district, keyed by district number.
- `districts`: Two integer counters per district, keyed by district number. Their meaning is undocumented (probably visitors and page views).

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| DistrictResult | `list` | `GET /api/results` | See reference |
| FinderIndex | `list` | `GET /data/finder-index.json` | See reference |
| UikIndex | `list` | `GET /data/uik/index.json` | See reference |
| UikRegion | `list` | `GET /data/uik/{region}.json` | See reference |
| VisitorReport | `load` | `GET /api/district-visitors` | See reference |

## Connect to the API

- API server: `https://iditena.org`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `iditena_list`: List records for an entity. Supported entities: `district_result`, `finder_index`, `uik_index`, `uik_region`.
- `iditena_load`: Load one record for an entity. Supported entities: `visitor_report`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

