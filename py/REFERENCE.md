# Iditena Python SDK Reference

Complete API reference for the Iditena Python SDK.


## IditenaSDK

### Constructor

```python
from iditena_sdk import IditenaSDK

client = IditenaSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `IditenaSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = IditenaSDK.test()
```


### Instance Methods

#### `DistrictResult(data=None)`

Create a new `DistrictResultEntity` instance. Pass `None` for no initial data.

#### `FinderIndex(data=None)`

Create a new `FinderIndexEntity` instance. Pass `None` for no initial data.

#### `UikIndex(data=None)`

Create a new `UikIndexEntity` instance. Pass `None` for no initial data.

#### `UikRegion(data=None)`

Create a new `UikRegionEntity` instance. Pass `None` for no initial data.

#### `VisitorReport(data=None)`

Create a new `VisitorReportEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## DistrictResultEntity

```python
district_result = client.DistrictResult()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aggregateSource` | `str` | No |  |
| `candidates` | `list` | Yes | Single-member district candidates, highest first. |
| `districtName` | `str` | No |  |
| `districtNumber` | `int` | Yes |  |
| `invalid` | `dict` | Yes | A vote count and its percentage share. |
| `parties` | `list` | Yes | Party-list results within the district. |
| `partiesInvalid` | `dict` | Yes | A vote count and its percentage share. |
| `partiesPrecinctsCounted` | `int` | No |  |
| `partiesTurnout` | `dict` | Yes | A vote count and its percentage share. |
| `precincts` | `list` | Yes | One row of integers per precinct: [precinct number, registered voters, ballots cast, invalid ballots, then one vote count per candidate in the order of 'candidates']. |
| `precinctsCounted` | `int` | No |  |
| `precinctsTotal` | `int` | No |  |
| `precinctsTotalSource` | `str` | No |  |
| `sourceAt` | `str` | No | Timestamp of the source data (Moscow time offset). |
| `turnout` | `dict` | Yes | A vote count and its percentage share. |
| `updatedAt` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[DistrictResultEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.DistrictResult().list({"district": 1})
for district_result in results:
    print(district_result.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DistrictResultEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FinderIndexEntity

```python
finder_index = client.FinderIndex()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `districts` | `list` | Yes |  |
| `snapshot` | `str` | No |  |
| `tiles` | `list` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[FinderIndexEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.FinderIndex().list()
for finder_index in results:
    print(finder_index.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FinderIndexEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UikIndexEntity

```python
uik_index = client.UikIndex()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cik` | `str` | Yes | Region code. |
| `cikHouses` | `str` | No |  |
| `cikHousesCount` | `int` | No |  |
| `cikObserved` | `str` | No |  |
| `cikObservedCount` | `int` | No |  |
| `count` | `int` | Yes |  |
| `fallback` | `str` | No |  |
| `fallbackCount` | `int` | No |  |
| `file` | `str` | No | Polling-station file name under /data/uik/; absent for some regions. |
| `houses` | `str` | No |  |
| `housesIndex` | `str` | No |  |
| `housesIndexUrl` | `str` | No |  |
| `region` | `str` | Yes |  |
| `slug` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[UikIndexEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.UikIndex().list()
for uik_index in results:
    print(uik_index.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UikIndexEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UikRegionEntity

```python
uik_region = client.UikRegion()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `str` | No |  |
| `area` | `str` | No |  |
| `city` | `str` | No |  |
| `district` | `int` | No | Single-member district number. |
| `lat` | `float` | No |  |
| `lon` | `float` | No |  |
| `n` | `int` | No | Polling station (UIK) number. |
| `phone` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[UikRegionEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.UikRegion().list({"region": "example"})
for uik_region in results:
    print(uik_region.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UikRegionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VisitorReportEntity

```python
visitor_report = client.VisitorReport()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `closedAt` | `dict` | No | Poll closing time per district, keyed by district number. |
| `dateFrom` | `str` | No |  |
| `dateTo` | `str` | No |  |
| `districts` | `dict` | Yes | Two integer counters per district, keyed by district number. |
| `fetchedAt` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> VisitorReportEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.VisitorReport().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VisitorReportEntity` instance with the same options.

#### `get_name() -> str`

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

```python
client = IditenaSDK({
    "feature": {
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
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

