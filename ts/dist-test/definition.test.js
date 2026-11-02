"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "district_result",
        "accessor": "DistrictResult",
        "op": "list",
        "method": "GET",
        "path": "/api/results",
        "args": [],
        "select": {
            "district": 1
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "district"
        ],
        "queryArgs": [
            {
                "name": "district",
                "wire": "district"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "updatedAt": "2026-01-01T00:00:00Z",
            "sourceAt": "2026-01-01T00:00:00Z",
            "districtNumber": 1,
            "districtName": "x",
            "precinctsTotal": 1,
            "precinctsTotalSource": "reported",
            "precinctsCounted": 1,
            "candidates": [
                {
                    "name": "x",
                    "votes": 1,
                    "share": 1
                }
            ],
            "turnout": {
                "votes": 1,
                "share": 1
            },
            "invalid": {
                "votes": 1,
                "share": 1
            },
            "precincts": [
                [
                    1
                ]
            ],
            "parties": [
                {
                    "name": "x",
                    "votes": 1,
                    "share": 1
                }
            ],
            "partiesPrecinctsCounted": 1,
            "partiesTurnout": {
                "votes": 1,
                "share": 1
            },
            "partiesInvalid": {
                "votes": 1,
                "share": 1
            },
            "aggregateSource": "district"
        },
        "idField": "id"
    },
    {
        "entity": "finder_index",
        "accessor": "FinderIndex",
        "op": "list",
        "method": "GET",
        "path": "/data/finder-index.json",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "snapshot": "2026-09-16",
            "tiles": [
                {
                    "x": 1,
                    "y": 1,
                    "label": "КАР",
                    "region": "x",
                    "name": "x",
                    "county": "x"
                }
            ],
            "districts": [
                {
                    "id": 1,
                    "region": "x",
                    "name": "x",
                    "shortName": "x",
                    "territory": "x",
                    "voters": 1,
                    "cardStatus": "x",
                    "availableCandidateCount": 1,
                    "candidates": [
                        {
                            "id": "d001_3fccdb93e916",
                            "name": "x",
                            "party": "x",
                            "partyShort": "x",
                            "slug": "x"
                        }
                    ]
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "uik_index",
        "accessor": "UikIndex",
        "op": "list",
        "method": "GET",
        "path": "/data/uik/index.json",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "snapshot": "2026-01-01",
            "source": {
                "label": "x",
                "url": "x"
            },
            "districts": {},
            "regions": [
                {
                    "region": "x",
                    "slug": "altayskiy-kray",
                    "count": 1,
                    "cik": "x",
                    "file": "altayskiy-kray.json",
                    "fallback": "x",
                    "fallbackCount": 1,
                    "cikHouses": "x",
                    "cikHousesCount": 1,
                    "cikObserved": "x",
                    "cikObservedCount": 1,
                    "houses": "x",
                    "housesIndex": "x",
                    "housesIndexUrl": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "uik_region",
        "accessor": "UikRegion",
        "op": "list",
        "method": "GET",
        "path": "/data/uik/{region}.json",
        "args": [
            {
                "name": "region",
                "wire": "region",
                "value": "altayskiy-kray"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "region": "x",
            "snapshot": "2026-01-01",
            "stations": [
                {
                    "n": 1,
                    "address": "x",
                    "city": "x",
                    "area": "x",
                    "phone": "x",
                    "lat": 1,
                    "lon": 1,
                    "district": 1
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "visitor_report",
        "accessor": "VisitorReport",
        "op": "load",
        "method": "GET",
        "path": "/api/district-visitors",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "dateFrom": "2026-01-01T00:00:00Z",
            "dateTo": "2026-01-01T00:00:00Z",
            "fetchedAt": "2026-01-01T00:00:00Z",
            "closedAt": {},
            "districts": {}
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map