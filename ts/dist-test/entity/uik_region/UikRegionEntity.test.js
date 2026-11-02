"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('UikRegionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when IDITENA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('IDITENA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.IditenaSDK.test();
        const ent = testsdk.UikRegion();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.IditenaSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.UikRegion().list({ "region": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.IDITENA_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'uik_region.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "address": { "a": true, "h": "Address", "n": "address", "r": false, "t": "`$STRING`", "key$": "address", "index$": 0 }, "area": { "a": true, "h": "Area", "n": "area", "r": false, "t": "`$STRING`", "key$": "area", "index$": 1 }, "city": { "a": true, "h": "City", "n": "city", "r": false, "t": "`$STRING`", "key$": "city", "index$": 2 }, "district": { "a": true, "h": "District", "n": "district", "r": false, "sh": "Single-member district number.", "t": "`$INTEGER`", "key$": "district", "index$": 3 }, "lat": { "a": true, "h": "Lat", "n": "lat", "r": false, "t": "`$NUMBER`", "key$": "lat", "index$": 4 }, "lon": { "a": true, "h": "Lon", "n": "lon", "r": false, "t": "`$NUMBER`", "key$": "lon", "index$": 5 }, "n": { "a": true, "h": "N", "n": "n", "r": false, "sh": "Polling station (UIK) number.", "t": "`$INTEGER`", "key$": "n", "index$": 6 }, "phone": { "a": true, "h": "Phone", "n": "phone", "r": false, "t": "`$STRING`", "key$": "phone", "index$": 7 } }, "name": "uik_region", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /data/uik/{region}.json", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "altayskiy-kray", "k": "param", "n": "region", "or": "region", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/data/uik/{region}.json", "q": { "exist": ["region"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "data" }, { "lit": "uik" }, { "lit": "{region}.json" }], "t": { "req": "`reqdata`", "res": "`body.stations`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "uik_region", "name__orig": "uik_region", "Name": "UikRegion", "name_": "uik_region", "name-": "uik-region", "NAME": "UIK_REGION", "index$": 3 }, { "active": true, "entity": "uik_region", "key$": "BasicUikRegionFlow", "kind": "basic", "name": "BasicUikRegionFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "region": "region01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "uik_region_ref01" } }], "index$": 0 }] }, 'UikRegion', { "GET /data/uik/{region}.json": { "protocol": "http", "parameters": [{ "name": "region", "in": "path", "required": true, "description": "Region file stem: the 'file' value from getUikIndex without '.json' (usually equal to the region slug).", "schema": { "type": "string" }, "example": "altayskiy-kray", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let uik_region_ref01_data = Object.values(setup.data.existing.uik_region)[0];
        // LIST
        const uik_region_ref01_ent = client.UikRegion();
        const uik_region_ref01_match = {};
        uik_region_ref01_match['region'] = setup.idmap['region01'];
        const uik_region_ref01_list = (await uik_region_ref01_ent.list(uik_region_ref01_match)).map((e) => e.data());
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/uik_region/UikRegionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.IditenaSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['uik_region01', 'uik_region02', 'uik_region03', 'region01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'IDITENA_TEST_UIK_REGION_ENTID': idmap,
        'IDITENA_TEST_LIVE': 'FALSE',
        'IDITENA_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['IDITENA_TEST_UIK_REGION_ENTID'];
    const live = 'TRUE' === env.IDITENA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['IDITENA_TEST_UIK_REGION_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.IditenaSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.IDITENA_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=UikRegionEntity.test.js.map