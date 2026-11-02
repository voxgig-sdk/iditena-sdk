# Iditena PHP SDK Reference

Complete API reference for the Iditena PHP SDK.


## IditenaSDK

### Constructor

```php
require_once __DIR__ . '/iditena_sdk.php';

$client = new IditenaSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `IditenaSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = IditenaSDK::test();
```


### Instance Methods

#### `DistrictResult($data = null)`

Create a new `DistrictResultEntity` instance. Pass `null` for no initial data.

#### `FinderIndex($data = null)`

Create a new `FinderIndexEntity` instance. Pass `null` for no initial data.

#### `UikIndex($data = null)`

Create a new `UikIndexEntity` instance. Pass `null` for no initial data.

#### `UikRegion($data = null)`

Create a new `UikRegionEntity` instance. Pass `null` for no initial data.

#### `VisitorReport($data = null)`

Create a new `VisitorReportEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): IditenaUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## DistrictResultEntity

```php
$district_result = $client->DistrictResult();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aggregateSource` | `string` | No |  |
| `candidates` | `array` | Yes | Single-member district candidates, highest first. |
| `districtName` | `string` | No |  |
| `districtNumber` | `int` | Yes |  |
| `invalid` | `array` | Yes | A vote count and its percentage share. |
| `parties` | `array` | Yes | Party-list results within the district. |
| `partiesInvalid` | `array` | Yes | A vote count and its percentage share. |
| `partiesPrecinctsCounted` | `int` | No |  |
| `partiesTurnout` | `array` | Yes | A vote count and its percentage share. |
| `precincts` | `array` | Yes | One row of integers per precinct: [precinct number, registered voters, ballots cast, invalid ballots, then one vote count per candidate in the order of 'candidates']. |
| `precinctsCounted` | `int` | No |  |
| `precinctsTotal` | `int` | No |  |
| `precinctsTotalSource` | `string` | No |  |
| `sourceAt` | `string` | No | Timestamp of the source data (Moscow time offset). |
| `turnout` | `array` | Yes | A vote count and its percentage share. |
| `updatedAt` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->DistrictResult()->list(["district" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DistrictResultEntity`

Create a new `DistrictResultEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FinderIndexEntity

```php
$finder_index = $client->FinderIndex();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `districts` | `array` | Yes |  |
| `snapshot` | `string` | No |  |
| `tiles` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->FinderIndex()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FinderIndexEntity`

Create a new `FinderIndexEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## UikIndexEntity

```php
$uik_index = $client->UikIndex();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cik` | `string` | Yes | Region code. |
| `cikHouses` | `string` | No |  |
| `cikHousesCount` | `int` | No |  |
| `cikObserved` | `string` | No |  |
| `cikObservedCount` | `int` | No |  |
| `count` | `int` | Yes |  |
| `fallback` | `string` | No |  |
| `fallbackCount` | `int` | No |  |
| `file` | `string` | No | Polling-station file name under /data/uik/; absent for some regions. |
| `houses` | `string` | No |  |
| `housesIndex` | `string` | No |  |
| `housesIndexUrl` | `string` | No |  |
| `region` | `string` | Yes |  |
| `slug` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->UikIndex()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): UikIndexEntity`

Create a new `UikIndexEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## UikRegionEntity

```php
$uik_region = $client->UikRegion();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | No |  |
| `area` | `string` | No |  |
| `city` | `string` | No |  |
| `district` | `int` | No | Single-member district number. |
| `lat` | `float` | No |  |
| `lon` | `float` | No |  |
| `n` | `int` | No | Polling station (UIK) number. |
| `phone` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->UikRegion()->list(["region" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): UikRegionEntity`

Create a new `UikRegionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VisitorReportEntity

```php
$visitor_report = $client->VisitorReport();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `closedAt` | `array` | No | Poll closing time per district, keyed by district number. |
| `dateFrom` | `string` | No |  |
| `dateTo` | `string` | No |  |
| `districts` | `array` | Yes | Two integer counters per district, keyed by district number. |
| `fetchedAt` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->VisitorReport()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VisitorReportEntity`

Create a new `VisitorReportEntity` instance with the same client and
options.

#### `get_name(): string`

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

```php
$client = new IditenaSDK([
  "feature" => [
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
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

