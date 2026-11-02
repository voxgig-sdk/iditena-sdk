# Iditena Ruby SDK Reference

Complete API reference for the Iditena Ruby SDK.


## IditenaSDK

### Constructor

```ruby
require_relative 'Iditena_sdk'

client = IditenaSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `IditenaSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = IditenaSDK.test
```


### Instance Methods

#### `DistrictResult(data = nil)`

Create a new `DistrictResult` entity instance. Pass `nil` for no initial data.

#### `FinderIndex(data = nil)`

Create a new `FinderIndex` entity instance. Pass `nil` for no initial data.

#### `UikIndex(data = nil)`

Create a new `UikIndex` entity instance. Pass `nil` for no initial data.

#### `UikRegion(data = nil)`

Create a new `UikRegion` entity instance. Pass `nil` for no initial data.

#### `VisitorReport(data = nil)`

Create a new `VisitorReport` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## DistrictResultEntity

```ruby
district_result = client.DistrictResult
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aggregateSource` | `String` | No |  |
| `candidates` | `Array` | Yes | Single-member district candidates, highest first. |
| `districtName` | `String` | No |  |
| `districtNumber` | `Integer` | Yes |  |
| `invalid` | `Hash` | Yes | A vote count and its percentage share. |
| `parties` | `Array` | Yes | Party-list results within the district. |
| `partiesInvalid` | `Hash` | Yes | A vote count and its percentage share. |
| `partiesPrecinctsCounted` | `Integer` | No |  |
| `partiesTurnout` | `Hash` | Yes | A vote count and its percentage share. |
| `precincts` | `Array` | Yes | One row of integers per precinct: [precinct number, registered voters, ballots cast, invalid ballots, then one vote count per candidate in the order of 'candidates']. |
| `precinctsCounted` | `Integer` | No |  |
| `precinctsTotal` | `Integer` | No |  |
| `precinctsTotalSource` | `String` | No |  |
| `sourceAt` | `String` | No | Timestamp of the source data (Moscow time offset). |
| `turnout` | `Hash` | Yes | A vote count and its percentage share. |
| `updatedAt` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.DistrictResult.list({ "district" => 1 })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DistrictResultEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## FinderIndexEntity

```ruby
finder_index = client.FinderIndex
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `districts` | `Array` | Yes |  |
| `snapshot` | `String` | No |  |
| `tiles` | `Array` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.FinderIndex.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FinderIndexEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## UikIndexEntity

```ruby
uik_index = client.UikIndex
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cik` | `String` | Yes | Region code. |
| `cikHouses` | `String` | No |  |
| `cikHousesCount` | `Integer` | No |  |
| `cikObserved` | `String` | No |  |
| `cikObservedCount` | `Integer` | No |  |
| `count` | `Integer` | Yes |  |
| `fallback` | `String` | No |  |
| `fallbackCount` | `Integer` | No |  |
| `file` | `String` | No | Polling-station file name under /data/uik/; absent for some regions. |
| `houses` | `String` | No |  |
| `housesIndex` | `String` | No |  |
| `housesIndexUrl` | `String` | No |  |
| `region` | `String` | Yes |  |
| `slug` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.UikIndex.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `UikIndexEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## UikRegionEntity

```ruby
uik_region = client.UikRegion
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `String` | No |  |
| `area` | `String` | No |  |
| `city` | `String` | No |  |
| `district` | `Integer` | No | Single-member district number. |
| `lat` | `Float` | No |  |
| `lon` | `Float` | No |  |
| `n` | `Integer` | No | Polling station (UIK) number. |
| `phone` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.UikRegion.list({ "region" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `UikRegionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VisitorReportEntity

```ruby
visitor_report = client.VisitorReport
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `closedAt` | `Hash` | No | Poll closing time per district, keyed by district number. |
| `dateFrom` | `String` | No |  |
| `dateTo` | `String` | No |  |
| `districts` | `Hash` | Yes | Two integer counters per district, keyed by district number. |
| `fetchedAt` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.VisitorReport.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VisitorReportEntity` instance with the same client and
options.

#### `get_name -> String`

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

```ruby
client = IditenaSDK.new({
  "feature" => {
    "ratelimit" => { "active" => true },
    "retry" => { "active" => true },
    "test" => { "active" => true },
    "timeout" => { "active" => true },
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

