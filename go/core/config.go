package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Iditena",
			"slug": "iditena",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://iditena.org",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"district_result": map[string]any{},
				"finder_index": map[string]any{},
				"uik_index": map[string]any{},
				"uik_region": map[string]any{},
				"visitor_report": map[string]any{},
			},
		},
		"entity": map[string]any{
			"district_result": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "aggregateSource",
						"title": "Aggregate Source",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "candidates",
						"title": "Candidates",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Single-member district candidates, highest first.",
					},
					map[string]any{
						"name": "districtName",
						"title": "District Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "districtNumber",
						"title": "District Number",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "invalid",
						"title": "Invalid",
						"type": "`$OBJECT`",
						"req": true,
						"short": "A vote count and its percentage share.",
					},
					map[string]any{
						"name": "parties",
						"title": "Parties",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Party-list results within the district.",
					},
					map[string]any{
						"name": "partiesInvalid",
						"title": "Parties Invalid",
						"type": "`$OBJECT`",
						"req": true,
						"short": "A vote count and its percentage share.",
					},
					map[string]any{
						"name": "partiesPrecinctsCounted",
						"title": "Parties Precincts Counted",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "partiesTurnout",
						"title": "Parties Turnout",
						"type": "`$OBJECT`",
						"req": true,
						"short": "A vote count and its percentage share.",
					},
					map[string]any{
						"name": "precincts",
						"title": "Precincts",
						"type": "`$ARRAY`",
						"req": true,
						"short": "One row of integers per precinct: [precinct number, registered voters, ballots cast, invalid ballots, then one vote count per candidate in the order of 'candidates'].",
					},
					map[string]any{
						"name": "precinctsCounted",
						"title": "Precincts Counted",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "precinctsTotal",
						"title": "Precincts Total",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "precinctsTotalSource",
						"title": "Precincts Total Source",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sourceAt",
						"title": "Source At",
						"type": "`$STRING`",
						"short": "Timestamp of the source data (Moscow time offset).",
						"format": "date-time",
					},
					map[string]any{
						"name": "turnout",
						"title": "Turnout",
						"type": "`$OBJECT`",
						"req": true,
						"short": "A vote count and its percentage share.",
					},
					map[string]any{
						"name": "updatedAt",
						"title": "Updated At",
						"type": "`$STRING`",
						"format": "date-time",
					},
				},
				"name": "district_result",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/results",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "results",
									},
								},
								"parts": []any{
									"api",
									"results",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "district",
											"orig": "district",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
											"example": 1,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"district",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"finder_index": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "districts",
						"title": "Districts",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "snapshot",
						"title": "Snapshot",
						"type": "`$STRING`",
						"format": "date",
					},
					map[string]any{
						"name": "tiles",
						"title": "Tiles",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"name": "finder_index",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/data/finder-index.json",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "finder-index.json",
									},
								},
								"parts": []any{
									"data",
									"finder-index.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"uik_index": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "cik",
						"title": "Cik",
						"type": "`$STRING`",
						"req": true,
						"short": "Region code.",
					},
					map[string]any{
						"name": "cikHouses",
						"title": "Cik Houses",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cikHousesCount",
						"title": "Cik Houses Count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "cikObserved",
						"title": "Cik Observed",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cikObservedCount",
						"title": "Cik Observed Count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "count",
						"title": "Count",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "fallback",
						"title": "Fallback",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "fallbackCount",
						"title": "Fallback Count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "file",
						"title": "File",
						"type": "`$STRING`",
						"short": "Polling-station file name under /data/uik/; absent for some regions.",
					},
					map[string]any{
						"name": "houses",
						"title": "Houses",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "housesIndex",
						"title": "Houses Index",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "housesIndexUrl",
						"title": "Houses Index Url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "region",
						"title": "Region",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "slug",
						"title": "Slug",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "uik_index",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/data/uik/index.json",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "uik",
									},
									map[string]any{
										"lit": "index.json",
									},
								},
								"parts": []any{
									"data",
									"uik",
									"index.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"uik_region": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "address",
						"title": "Address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "area",
						"title": "Area",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "city",
						"title": "City",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "district",
						"title": "District",
						"type": "`$INTEGER`",
						"short": "Single-member district number.",
					},
					map[string]any{
						"name": "lat",
						"title": "Lat",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "lon",
						"title": "Lon",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "n",
						"title": "N",
						"type": "`$INTEGER`",
						"short": "Polling station (UIK) number.",
					},
					map[string]any{
						"name": "phone",
						"title": "Phone",
						"type": "`$STRING`",
					},
				},
				"name": "uik_region",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/data/uik/{region}.json",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "uik",
									},
									map[string]any{
										"lit": "{region}.json",
									},
								},
								"parts": []any{
									"data",
									"uik",
									"{region}.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.stations`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "region",
											"orig": "region",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "altayskiy-kray",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"region",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"visitor_report": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "closedAt",
						"title": "Closed At",
						"type": "`$OBJECT`",
						"short": "Poll closing time per district, keyed by district number.",
					},
					map[string]any{
						"name": "dateFrom",
						"title": "Date From",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "dateTo",
						"title": "Date To",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "districts",
						"title": "Districts",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Two integer counters per district, keyed by district number.",
					},
					map[string]any{
						"name": "fetchedAt",
						"title": "Fetched At",
						"type": "`$STRING`",
						"format": "date-time",
					},
				},
				"name": "visitor_report",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/district-visitors",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "district-visitors",
									},
								},
								"parts": []any{
									"api",
									"district-visitors",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
