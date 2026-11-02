# Iditena Lua SDK Reference

Complete API reference for the Iditena Lua SDK.


## IditenaSDK

### Constructor

```lua
local sdk = require("iditena_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `DistrictResult(data)`

Create a new `DistrictResult` entity instance. Pass `nil` for no initial data.

#### `FinderIndex(data)`

Create a new `FinderIndex` entity instance. Pass `nil` for no initial data.

#### `UikIndex(data)`

Create a new `UikIndex` entity instance. Pass `nil` for no initial data.

#### `UikRegion(data)`

Create a new `UikRegion` entity instance. Pass `nil` for no initial data.

#### `VisitorReport(data)`

Create a new `VisitorReport` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## DistrictResultEntity

```lua
local district_result = client:DistrictResult(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aggregateSource` | `string` | No |  |
| `candidates` | `table` | Yes | Single-member district candidates, highest first. |
| `districtName` | `string` | No |  |
| `districtNumber` | `number` | Yes |  |
| `invalid` | `table` | Yes | A vote count and its percentage share. |
| `parties` | `table` | Yes | Party-list results within the district. |
| `partiesInvalid` | `table` | Yes | A vote count and its percentage share. |
| `partiesPrecinctsCounted` | `number` | No |  |
| `partiesTurnout` | `table` | Yes | A vote count and its percentage share. |
| `precincts` | `table` | Yes | One row of integers per precinct: [precinct number, registered voters, ballots cast, invalid ballots, then one vote count per candidate in the order of 'candidates']. |
| `precinctsCounted` | `number` | No |  |
| `precinctsTotal` | `number` | No |  |
| `precinctsTotalSource` | `string` | No |  |
| `sourceAt` | `string` | No | Timestamp of the source data (Moscow time offset). |
| `turnout` | `table` | Yes | A vote count and its percentage share. |
| `updatedAt` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:DistrictResult():list({ district = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DistrictResultEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FinderIndexEntity

```lua
local finder_index = client:FinderIndex(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `districts` | `table` | Yes |  |
| `snapshot` | `string` | No |  |
| `tiles` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:FinderIndex():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FinderIndexEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## UikIndexEntity

```lua
local uik_index = client:UikIndex(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:UikIndex():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UikIndexEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## UikRegionEntity

```lua
local uik_region = client:UikRegion(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:UikRegion():list({ region = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UikRegionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VisitorReportEntity

```lua
local visitor_report = client:VisitorReport(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `closedAt` | `table` | No | Poll closing time per district, keyed by district number. |
| `dateFrom` | `string` | No |  |
| `dateTo` | `string` | No |  |
| `districts` | `table` | Yes | Two integer counters per district, keyed by district number. |
| `fetchedAt` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:VisitorReport():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VisitorReportEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    ratelimit = { active = true },
    retry = { active = true },
    test = { active = true },
    timeout = { active = true },
  },
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

