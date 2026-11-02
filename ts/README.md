# Iditena TypeScript SDK



The TypeScript SDK for the Iditena API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.DistrictResult()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/iditena-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/voxgig-sdk/iditena-sdk
npm install ./iditena-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { IditenaSDK } from '@voxgig-sdk/iditena-sdk'

const client = new IditenaSDK()
```

### 2. List districtresult records

`list()` resolves to an array of DistrictResult ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const districtresults = await client.DistrictResult().list({ district: 1 })

for (const districtresult of districtresults) {
  console.log(districtresult.data())
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const visitorreport = await client.VisitorReport().load()
  console.log(visitorreport.data())
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = IditenaSDK.test()

const visitorreport = await client.VisitorReport().load()
// visitorreport is the VisitorReport entity; .data() reads its mock record
console.log(visitorreport.data())
```

You can also use the instance method:

```ts
const client = new IditenaSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.VisitorReport()

// First call runs the operation and stores its result
await entity.load()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new IditenaSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
IDITENA_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### IditenaSDK

#### Constructor

```ts
new IditenaSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `DistrictResult(data?)` | `DistrictResultEntity` | Create a DistrictResult entity instance. |
| `FinderIndex(data?)` | `FinderIndexEntity` | Create a FinderIndex entity instance. |
| `UikIndex(data?)` | `UikIndexEntity` | Create an UikIndex entity instance. |
| `UikRegion(data?)` | `UikRegionEntity` | Create an UikRegion entity instance. |
| `VisitorReport(data?)` | `VisitorReportEntity` | Create a VisitorReport entity instance. |
| `tester(testopts?, sdkopts?)` | `IditenaSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `IditenaSDK.test(testopts?, sdkopts?)` | `IditenaSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria, and return it. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria, one per record. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): IditenaSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity itself — there is no result
envelope, and an entity's `data()` reads its record:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### DistrictResult

| Field | Description |
| --- | --- |
| `aggregateSource` |  |
| `candidates` | Single-member district candidates, highest first. |
| `districtName` |  |
| `districtNumber` |  |
| `invalid` | A vote count and its percentage share. |
| `parties` | Party-list results within the district. |
| `partiesInvalid` | A vote count and its percentage share. |
| `partiesPrecinctsCounted` |  |
| `partiesTurnout` | A vote count and its percentage share. |
| `precincts` | One row of integers per precinct: [precinct number, registered voters, ballots cast, invalid ballots, then one vote count per candidate in the order of 'candidates']. |
| `precinctsCounted` |  |
| `precinctsTotal` |  |
| `precinctsTotalSource` |  |
| `sourceAt` | Timestamp of the source data (Moscow time offset). |
| `turnout` | A vote count and its percentage share. |
| `updatedAt` |  |

Operations: list.

API path: `/api/results`

#### FinderIndex

| Field | Description |
| --- | --- |
| `districts` |  |
| `snapshot` |  |
| `tiles` |  |

Operations: list.

API path: `/data/finder-index.json`

#### UikIndex

| Field | Description |
| --- | --- |
| `cik` | Region code. |
| `cikHouses` |  |
| `cikHousesCount` |  |
| `cikObserved` |  |
| `cikObservedCount` |  |
| `count` |  |
| `fallback` |  |
| `fallbackCount` |  |
| `file` | Polling-station file name under /data/uik/; absent for some regions. |
| `houses` |  |
| `housesIndex` |  |
| `housesIndexUrl` |  |
| `region` |  |
| `slug` |  |

Operations: list.

API path: `/data/uik/index.json`

#### UikRegion

| Field | Description |
| --- | --- |
| `address` |  |
| `area` |  |
| `city` |  |
| `district` | Single-member district number. |
| `lat` |  |
| `lon` |  |
| `n` | Polling station (UIK) number. |
| `phone` |  |

Operations: list.

API path: `/data/uik/{region}.json`

#### VisitorReport

| Field | Description |
| --- | --- |
| `closedAt` | Poll closing time per district, keyed by district number. |
| `dateFrom` |  |
| `dateTo` |  |
| `districts` | Two integer counters per district, keyed by district number. |
| `fetchedAt` |  |

Operations: load.

API path: `/api/district-visitors`



## Entities


### DistrictResult

Create an instance: `const district_result = client.DistrictResult()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aggregateSource` | `string` |  |
| `candidates` | `any[]` | Single-member district candidates, highest first. |
| `districtName` | `string` |  |
| `districtNumber` | `number` |  |
| `invalid` | `Record<string, any>` | A vote count and its percentage share. |
| `parties` | `any[]` | Party-list results within the district. |
| `partiesInvalid` | `Record<string, any>` | A vote count and its percentage share. |
| `partiesPrecinctsCounted` | `number` |  |
| `partiesTurnout` | `Record<string, any>` | A vote count and its percentage share. |
| `precincts` | `any[]` | One row of integers per precinct: [precinct number, registered voters, ballots cast, invalid ballots, then one vote count per candidate in the order of 'candidates']. |
| `precinctsCounted` | `number` |  |
| `precinctsTotal` | `number` |  |
| `precinctsTotalSource` | `string` |  |
| `sourceAt` | `string` | Timestamp of the source data (Moscow time offset). |
| `turnout` | `Record<string, any>` | A vote count and its percentage share. |
| `updatedAt` | `string` |  |

#### Example: List

```ts
const district_results = await client.DistrictResult().list({ district: 1 })
```


### FinderIndex

Create an instance: `const finder_index = client.FinderIndex()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `districts` | `any[]` |  |
| `snapshot` | `string` |  |
| `tiles` | `any[]` |  |

#### Example: List

```ts
const finder_indexs = await client.FinderIndex().list()
```


### UikIndex

Create an instance: `const uik_index = client.UikIndex()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cik` | `string` | Region code. |
| `cikHouses` | `string` |  |
| `cikHousesCount` | `number` |  |
| `cikObserved` | `string` |  |
| `cikObservedCount` | `number` |  |
| `count` | `number` |  |
| `fallback` | `string` |  |
| `fallbackCount` | `number` |  |
| `file` | `string` | Polling-station file name under /data/uik/; absent for some regions. |
| `houses` | `string` |  |
| `housesIndex` | `string` |  |
| `housesIndexUrl` | `string` |  |
| `region` | `string` |  |
| `slug` | `string` |  |

#### Example: List

```ts
const uik_indexs = await client.UikIndex().list()
```


### UikRegion

Create an instance: `const uik_region = client.UikRegion()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` |  |
| `area` | `string` |  |
| `city` | `string` |  |
| `district` | `number` | Single-member district number. |
| `lat` | `number` |  |
| `lon` | `number` |  |
| `n` | `number` | Polling station (UIK) number. |
| `phone` | `string` |  |

#### Example: List

```ts
const uik_regions = await client.UikRegion().list({ region: "example" })
```


### VisitorReport

Create an instance: `const visitor_report = client.VisitorReport()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `closedAt` | `Record<string, any>` | Poll closing time per district, keyed by district number. |
| `dateFrom` | `string` |  |
| `dateTo` | `string` |  |
| `districts` | `Record<string, any>` | Two integer counters per district, keyed by district number. |
| `fetchedAt` | `string` |  |

#### Example: Load

```ts
const visitor_report = await client.VisitorReport().load()
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
iditena/
├── src/
│   ├── IditenaSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { IditenaSDK } from '@voxgig-sdk/iditena-sdk'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const visitorreport = client.VisitorReport()
await visitorreport.load()

// visitorreport.data() now returns the visitorreport data from the last `load`
// visitorreport.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
