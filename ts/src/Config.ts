
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Iditena',
        slug: "iditena",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "now": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://iditena.org",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        district_result: {
        },
  
        finder_index: {
        },
  
        uik_index: {
        },
  
        uik_region: {
        },
  
        visitor_report: {
        },
  
    }
  }


  entity = {
    "district_result": {
      "fields": [
        {
          "name": "aggregateSource",
          "title": "Aggregate Source",
          "type": "`$STRING`"
        },
        {
          "name": "candidates",
          "title": "Candidates",
          "type": "`$ARRAY`",
          "req": true,
          "short": "Single-member district candidates, highest first."
        },
        {
          "name": "districtName",
          "title": "District Name",
          "type": "`$STRING`"
        },
        {
          "name": "districtNumber",
          "title": "District Number",
          "type": "`$INTEGER`",
          "req": true
        },
        {
          "name": "invalid",
          "title": "Invalid",
          "type": "`$OBJECT`",
          "req": true,
          "short": "A vote count and its percentage share."
        },
        {
          "name": "parties",
          "title": "Parties",
          "type": "`$ARRAY`",
          "req": true,
          "short": "Party-list results within the district."
        },
        {
          "name": "partiesInvalid",
          "title": "Parties Invalid",
          "type": "`$OBJECT`",
          "req": true,
          "short": "A vote count and its percentage share."
        },
        {
          "name": "partiesPrecinctsCounted",
          "title": "Parties Precincts Counted",
          "type": "`$INTEGER`"
        },
        {
          "name": "partiesTurnout",
          "title": "Parties Turnout",
          "type": "`$OBJECT`",
          "req": true,
          "short": "A vote count and its percentage share."
        },
        {
          "name": "precincts",
          "title": "Precincts",
          "type": "`$ARRAY`",
          "req": true,
          "short": "One row of integers per precinct: [precinct number, registered voters, ballots cast, invalid ballots, then one vote count per candidate in the order of 'candidates']."
        },
        {
          "name": "precinctsCounted",
          "title": "Precincts Counted",
          "type": "`$INTEGER`"
        },
        {
          "name": "precinctsTotal",
          "title": "Precincts Total",
          "type": "`$INTEGER`"
        },
        {
          "name": "precinctsTotalSource",
          "title": "Precincts Total Source",
          "type": "`$STRING`"
        },
        {
          "name": "sourceAt",
          "title": "Source At",
          "type": "`$STRING`",
          "short": "Timestamp of the source data (Moscow time offset).",
          "format": "date-time"
        },
        {
          "name": "turnout",
          "title": "Turnout",
          "type": "`$OBJECT`",
          "req": true,
          "short": "A vote count and its percentage share."
        },
        {
          "name": "updatedAt",
          "title": "Updated At",
          "type": "`$STRING`",
          "format": "date-time"
        }
      ],
      "name": "district_result",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/results",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "results"
                }
              ],
              "parts": [
                "api",
                "results"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "district",
                    "orig": "district",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "reqd": true,
                    "example": 1
                  }
                ]
              },
              "select": {
                "exist": [
                  "district"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "finder_index": {
      "fields": [
        {
          "name": "districts",
          "title": "Districts",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "snapshot",
          "title": "Snapshot",
          "type": "`$STRING`",
          "format": "date"
        },
        {
          "name": "tiles",
          "title": "Tiles",
          "type": "`$ARRAY`",
          "req": true
        }
      ],
      "name": "finder_index",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/data/finder-index.json",
              "segments": [
                {
                  "lit": "data"
                },
                {
                  "lit": "finder-index.json"
                }
              ],
              "parts": [
                "data",
                "finder-index.json"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "uik_index": {
      "fields": [
        {
          "name": "cik",
          "title": "Cik",
          "type": "`$STRING`",
          "req": true,
          "short": "Region code."
        },
        {
          "name": "cikHouses",
          "title": "Cik Houses",
          "type": "`$STRING`"
        },
        {
          "name": "cikHousesCount",
          "title": "Cik Houses Count",
          "type": "`$INTEGER`"
        },
        {
          "name": "cikObserved",
          "title": "Cik Observed",
          "type": "`$STRING`"
        },
        {
          "name": "cikObservedCount",
          "title": "Cik Observed Count",
          "type": "`$INTEGER`"
        },
        {
          "name": "count",
          "title": "Count",
          "type": "`$INTEGER`",
          "req": true
        },
        {
          "name": "fallback",
          "title": "Fallback",
          "type": "`$STRING`"
        },
        {
          "name": "fallbackCount",
          "title": "Fallback Count",
          "type": "`$INTEGER`"
        },
        {
          "name": "file",
          "title": "File",
          "type": "`$STRING`",
          "short": "Polling-station file name under /data/uik/; absent for some regions."
        },
        {
          "name": "houses",
          "title": "Houses",
          "type": "`$STRING`"
        },
        {
          "name": "housesIndex",
          "title": "Houses Index",
          "type": "`$STRING`"
        },
        {
          "name": "housesIndexUrl",
          "title": "Houses Index Url",
          "type": "`$STRING`"
        },
        {
          "name": "region",
          "title": "Region",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "slug",
          "title": "Slug",
          "type": "`$STRING`",
          "req": true
        }
      ],
      "name": "uik_index",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/data/uik/index.json",
              "segments": [
                {
                  "lit": "data"
                },
                {
                  "lit": "uik"
                },
                {
                  "lit": "index.json"
                }
              ],
              "parts": [
                "data",
                "uik",
                "index.json"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "uik_region": {
      "fields": [
        {
          "name": "address",
          "title": "Address",
          "type": "`$STRING`"
        },
        {
          "name": "area",
          "title": "Area",
          "type": "`$STRING`"
        },
        {
          "name": "city",
          "title": "City",
          "type": "`$STRING`"
        },
        {
          "name": "district",
          "title": "District",
          "type": "`$INTEGER`",
          "short": "Single-member district number."
        },
        {
          "name": "lat",
          "title": "Lat",
          "type": "`$NUMBER`"
        },
        {
          "name": "lon",
          "title": "Lon",
          "type": "`$NUMBER`"
        },
        {
          "name": "n",
          "title": "N",
          "type": "`$INTEGER`",
          "short": "Polling station (UIK) number."
        },
        {
          "name": "phone",
          "title": "Phone",
          "type": "`$STRING`"
        }
      ],
      "name": "uik_region",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/data/uik/{region}.json",
              "segments": [
                {
                  "lit": "data"
                },
                {
                  "lit": "uik"
                },
                {
                  "lit": "{region}.json"
                }
              ],
              "parts": [
                "data",
                "uik",
                "{region}.json"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.stations`"
              },
              "args": {
                "params": [
                  {
                    "name": "region",
                    "orig": "region",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "altayskiy-kray"
                  }
                ]
              },
              "select": {
                "exist": [
                  "region"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "visitor_report": {
      "fields": [
        {
          "name": "closedAt",
          "title": "Closed At",
          "type": "`$OBJECT`",
          "short": "Poll closing time per district, keyed by district number."
        },
        {
          "name": "dateFrom",
          "title": "Date From",
          "type": "`$STRING`",
          "format": "date-time"
        },
        {
          "name": "dateTo",
          "title": "Date To",
          "type": "`$STRING`",
          "format": "date-time"
        },
        {
          "name": "districts",
          "title": "Districts",
          "type": "`$OBJECT`",
          "req": true,
          "short": "Two integer counters per district, keyed by district number."
        },
        {
          "name": "fetchedAt",
          "title": "Fetched At",
          "type": "`$STRING`",
          "format": "date-time"
        }
      ],
      "name": "visitor_report",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/district-visitors",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "district-visitors"
                }
              ],
              "parts": [
                "api",
                "district-visitors"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

