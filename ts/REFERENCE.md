# Iditena TypeScript SDK Reference

Complete API reference for the Iditena TypeScript SDK.


## IditenaSDK

### Constructor

```ts
new IditenaSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `IditenaSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = IditenaSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `IditenaSDK` instance in test mode.


### Instance Methods

#### `DistrictResult(data?: object)`

Create a new `DistrictResult` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DistrictResultEntity` instance.

#### `FinderIndex(data?: object)`

Create a new `FinderIndex` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FinderIndexEntity` instance.

#### `UikIndex(data?: object)`

Create a new `UikIndex` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UikIndexEntity` instance.

#### `UikRegion(data?: object)`

Create a new `UikRegion` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UikRegionEntity` instance.

#### `VisitorReport(data?: object)`

Create a new `VisitorReport` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VisitorReportEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `IditenaSDK.test()`.

**Returns:** `IditenaSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## DistrictResultEntity

```ts
const district_result = client.DistrictResult()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aggregateSource` | `string` | No |  |
| `candidates` | `any[]` | Yes | Single-member district candidates, highest first. |
| `districtName` | `string` | No |  |
| `districtNumber` | `number` | Yes |  |
| `invalid` | `Record<string, any>` | Yes | A vote count and its percentage share. |
| `parties` | `any[]` | Yes | Party-list results within the district. |
| `partiesInvalid` | `Record<string, any>` | Yes | A vote count and its percentage share. |
| `partiesPrecinctsCounted` | `number` | No |  |
| `partiesTurnout` | `Record<string, any>` | Yes | A vote count and its percentage share. |
| `precincts` | `any[]` | Yes | One row of integers per precinct: [precinct number, registered voters, ballots cast, invalid ballots, then one vote count per candidate in the order of 'candidates']. |
| `precinctsCounted` | `number` | No |  |
| `precinctsTotal` | `number` | No |  |
| `precinctsTotalSource` | `string` | No |  |
| `sourceAt` | `string` | No | Timestamp of the source data (Moscow time offset). |
| `turnout` | `Record<string, any>` | Yes | A vote count and its percentage share. |
| `updatedAt` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.DistrictResult().list({ district: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DistrictResultEntity` instance with the same client and
options.

#### `client()`

Return the parent `IditenaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FinderIndexEntity

```ts
const finder_index = client.FinderIndex()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `districts` | `any[]` | Yes |  |
| `snapshot` | `string` | No |  |
| `tiles` | `any[]` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.FinderIndex().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FinderIndexEntity` instance with the same client and
options.

#### `client()`

Return the parent `IditenaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UikIndexEntity

```ts
const uik_index = client.UikIndex()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cik` | `string` | Yes | Region code. |
| `cikHouses` | `string` | No |  |
| `cikHousesCount` | `number` | No |  |
| `cikObserved` | `string` | No |  |
| `cikObservedCount` | `number` | No |  |
| `count` | `number` | Yes |  |
| `fallback` | `string` | No |  |
| `fallbackCount` | `number` | No |  |
| `file` | `string` | No | Polling-station file name under /data/uik/; absent for some regions. |
| `houses` | `string` | No |  |
| `housesIndex` | `string` | No |  |
| `housesIndexUrl` | `string` | No |  |
| `region` | `string` | Yes |  |
| `slug` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.UikIndex().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UikIndexEntity` instance with the same client and
options.

#### `client()`

Return the parent `IditenaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UikRegionEntity

```ts
const uik_region = client.UikRegion()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | No |  |
| `area` | `string` | No |  |
| `city` | `string` | No |  |
| `district` | `number` | No | Single-member district number. |
| `lat` | `number` | No |  |
| `lon` | `number` | No |  |
| `n` | `number` | No | Polling station (UIK) number. |
| `phone` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.UikRegion().list({ region: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UikRegionEntity` instance with the same client and
options.

#### `client()`

Return the parent `IditenaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VisitorReportEntity

```ts
const visitor_report = client.VisitorReport()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `closedAt` | `Record<string, any>` | No | Poll closing time per district, keyed by district number. |
| `dateFrom` | `string` | No |  |
| `dateTo` | `string` | No |  |
| `districts` | `Record<string, any>` | Yes | Two integer counters per district, keyed by district number. |
| `fetchedAt` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.VisitorReport().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VisitorReportEntity` instance with the same client and
options.

#### `client()`

Return the parent `IditenaSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```ts
const client = new IditenaSDK({
  feature: {
    ratelimit: { active: true },
    retry: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

