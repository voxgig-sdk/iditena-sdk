# Iditena Golang SDK



The Golang SDK for the Iditena API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.DistrictResult(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/iditena-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Tags](https://github.com/voxgig-sdk/iditena-sdk/tags) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/iditena-sdk/go=../iditena-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the entity, and for
`List` a `[]any` of entities, one per record (there is no `{ok, data}`
wrapper), so check `err` and read a record through the entity's
`Data()`.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/iditena-sdk/go"
)

func main() {
    client := sdk.New()

    // List districtResult records — the value is a []any of entities, one per record.
    districtResults, err := client.DistrictResult(nil).List(map[string]any{"district": 1}, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range districtResults.([]any) {
        fmt.Println(item.(sdk.Entity).Data())
    }
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
visitorreport, err := client.VisitorReport(nil).Load(nil, nil)
if err != nil {
    // handle err
    return
}
_ = visitorreport
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

visitorReport, err := client.VisitorReport(nil).Load(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(visitorReport.(sdk.Entity).Data()) // the entity's mock record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewIditenaSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
IDITENA_TEST_LIVE=TRUE
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewIditenaSDK

```go
func NewIditenaSDK(options map[string]any) *IditenaSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *IditenaSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### IditenaSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `DistrictResult` | `(data map[string]any) IditenaEntityBase` | Create a DistrictResult entity instance. |
| `FinderIndex` | `(data map[string]any) IditenaEntityBase` | Create a FinderIndex entity instance. |
| `UikIndex` | `(data map[string]any) IditenaEntityBase` | Create an UikIndex entity instance. |
| `UikRegion` | `(data map[string]any) IditenaEntityBase` | Create an UikRegion entity instance. |
| `VisitorReport` | `(data map[string]any) IditenaEntityBase` | Create a VisitorReport entity instance. |

### Entity interface (IditenaEntityBase)

All entities implement the `IditenaEntityBase` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria, and return it. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria, one per record. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity, whose `Data()` reads its record (`map[string]any`) |
| `List` | a `[]any` of entities, one per record |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    districtResult, err := client.DistrictResult(nil).List(map[string]any{"district": 1}, nil)
    if err != nil { /* handle */ }
    // districtResult is a []any of entities, one per record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### DistrictResult

| Field | Description |
| --- | --- |
| `"aggregateSource"` |  |
| `"candidates"` | Single-member district candidates, highest first. |
| `"districtName"` |  |
| `"districtNumber"` |  |
| `"invalid"` | A vote count and its percentage share. |
| `"parties"` | Party-list results within the district. |
| `"partiesInvalid"` | A vote count and its percentage share. |
| `"partiesPrecinctsCounted"` |  |
| `"partiesTurnout"` | A vote count and its percentage share. |
| `"precincts"` | One row of integers per precinct: [precinct number, registered voters, ballots cast, invalid ballots, then one vote count per candidate in the order of 'candidates']. |
| `"precinctsCounted"` |  |
| `"precinctsTotal"` |  |
| `"precinctsTotalSource"` |  |
| `"sourceAt"` | Timestamp of the source data (Moscow time offset). |
| `"turnout"` | A vote count and its percentage share. |
| `"updatedAt"` |  |

Operations: List.

API path: `/api/results`

#### FinderIndex

| Field | Description |
| --- | --- |
| `"districts"` |  |
| `"snapshot"` |  |
| `"tiles"` |  |

Operations: List.

API path: `/data/finder-index.json`

#### UikIndex

| Field | Description |
| --- | --- |
| `"cik"` | Region code. |
| `"cikHouses"` |  |
| `"cikHousesCount"` |  |
| `"cikObserved"` |  |
| `"cikObservedCount"` |  |
| `"count"` |  |
| `"fallback"` |  |
| `"fallbackCount"` |  |
| `"file"` | Polling-station file name under /data/uik/; absent for some regions. |
| `"houses"` |  |
| `"housesIndex"` |  |
| `"housesIndexUrl"` |  |
| `"region"` |  |
| `"slug"` |  |

Operations: List.

API path: `/data/uik/index.json`

#### UikRegion

| Field | Description |
| --- | --- |
| `"address"` |  |
| `"area"` |  |
| `"city"` |  |
| `"district"` | Single-member district number. |
| `"lat"` |  |
| `"lon"` |  |
| `"n"` | Polling station (UIK) number. |
| `"phone"` |  |

Operations: List.

API path: `/data/uik/{region}.json`

#### VisitorReport

| Field | Description |
| --- | --- |
| `"closedAt"` | Poll closing time per district, keyed by district number. |
| `"dateFrom"` |  |
| `"dateTo"` |  |
| `"districts"` | Two integer counters per district, keyed by district number. |
| `"fetchedAt"` |  |

Operations: Load.

API path: `/api/district-visitors`



## Entities


### DistrictResult

Create an instance: `districtResult := client.DistrictResult(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aggregateSource` | `string` |  |
| `candidates` | `[]any` | Single-member district candidates, highest first. |
| `districtName` | `string` |  |
| `districtNumber` | `int` |  |
| `invalid` | `map[string]any` | A vote count and its percentage share. |
| `parties` | `[]any` | Party-list results within the district. |
| `partiesInvalid` | `map[string]any` | A vote count and its percentage share. |
| `partiesPrecinctsCounted` | `int` |  |
| `partiesTurnout` | `map[string]any` | A vote count and its percentage share. |
| `precincts` | `[]any` | One row of integers per precinct: [precinct number, registered voters, ballots cast, invalid ballots, then one vote count per candidate in the order of 'candidates']. |
| `precinctsCounted` | `int` |  |
| `precinctsTotal` | `int` |  |
| `precinctsTotalSource` | `string` |  |
| `sourceAt` | `string` | Timestamp of the source data (Moscow time offset). |
| `turnout` | `map[string]any` | A vote count and its percentage share. |
| `updatedAt` | `string` |  |

#### Example: List

```go
districtResults, err := client.DistrictResult(nil).List(map[string]any{"district": 1}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range districtResults.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### FinderIndex

Create an instance: `finderIndex := client.FinderIndex(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `districts` | `[]any` |  |
| `snapshot` | `string` |  |
| `tiles` | `[]any` |  |

#### Example: List

```go
finderIndexs, err := client.FinderIndex(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range finderIndexs.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### UikIndex

Create an instance: `uikIndex := client.UikIndex(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cik` | `string` | Region code. |
| `cikHouses` | `string` |  |
| `cikHousesCount` | `int` |  |
| `cikObserved` | `string` |  |
| `cikObservedCount` | `int` |  |
| `count` | `int` |  |
| `fallback` | `string` |  |
| `fallbackCount` | `int` |  |
| `file` | `string` | Polling-station file name under /data/uik/; absent for some regions. |
| `houses` | `string` |  |
| `housesIndex` | `string` |  |
| `housesIndexUrl` | `string` |  |
| `region` | `string` |  |
| `slug` | `string` |  |

#### Example: List

```go
uikIndexs, err := client.UikIndex(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range uikIndexs.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### UikRegion

Create an instance: `uikRegion := client.UikRegion(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` |  |
| `area` | `string` |  |
| `city` | `string` |  |
| `district` | `int` | Single-member district number. |
| `lat` | `float64` |  |
| `lon` | `float64` |  |
| `n` | `int` | Polling station (UIK) number. |
| `phone` | `string` |  |

#### Example: List

```go
uikRegions, err := client.UikRegion(nil).List(map[string]any{"region": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range uikRegions.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### VisitorReport

Create an instance: `visitorReport := client.VisitorReport(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `closedAt` | `map[string]any` | Poll closing time per district, keyed by district number. |
| `dateFrom` | `string` |  |
| `dateTo` | `string` |  |
| `districts` | `map[string]any` | Two integer counters per district, keyed by district number. |
| `fetchedAt` | `string` |  |

#### Example: Load

```go
visitorReport, err := client.VisitorReport(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(visitorReport.(sdk.Entity).Data()) // the loaded entity's record
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

An operation returns the entity, and its `Data()` returns the record. Use
`core.ToMapAny()` to safely cast that record, or data nested in it, to
`map[string]any`: it returns `nil` for anything else, an entity included.

### Package structure

```
github.com/voxgig-sdk/iditena-sdk/go/
├── iditena.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/iditena-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
visitorreport := client.VisitorReport(nil)
visitorreport.Load(nil, nil)

// visitorreport.Data() now returns the visitorreport data from the last load
// visitorreport.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
