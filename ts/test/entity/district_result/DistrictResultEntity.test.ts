

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { IditenaSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('DistrictResultEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IDITENA_TEST_LIVE=TRUE.
  afterEach(liveDelay('IDITENA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IditenaSDK.test()
    const ent = testsdk.DistrictResult()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('district_result hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of IditenaSDK.test(offline).DistrictResult().stream('list')) { }
    }, /offline/)

    for await (const _item of IditenaSDK.test(offline).DistrictResult()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = IditenaSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.DistrictResult().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of IditenaSDK.test().DistrictResult().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new IditenaSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.DistrictResult().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.DistrictResult().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = IditenaSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DistrictResult().list({"district":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IDITENA_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'district_result.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"aggregateSource":{"a":true,"h":"Aggregate Source","n":"aggregateSource","r":false,"t":"`$STRING`","key$":"aggregateSource","index$":0},"candidates":{"a":true,"h":"Candidates","n":"candidates","r":true,"sh":"Single-member district candidates, highest first.","t":"`$ARRAY`","key$":"candidates","index$":1},"districtName":{"a":true,"h":"District Name","n":"districtName","r":false,"t":"`$STRING`","key$":"districtName","index$":2},"districtNumber":{"a":true,"h":"District Number","n":"districtNumber","r":true,"t":"`$INTEGER`","key$":"districtNumber","index$":3},"invalid":{"a":true,"h":"Invalid","n":"invalid","r":true,"sh":"A vote count and its percentage share.","t":"`$OBJECT`","key$":"invalid","index$":4},"parties":{"a":true,"h":"Parties","n":"parties","r":true,"sh":"Party-list results within the district.","t":"`$ARRAY`","key$":"parties","index$":5},"partiesInvalid":{"a":true,"h":"Parties Invalid","n":"partiesInvalid","r":true,"sh":"A vote count and its percentage share.","t":"`$OBJECT`","key$":"partiesInvalid","index$":6},"partiesPrecinctsCounted":{"a":true,"h":"Parties Precincts Counted","n":"partiesPrecinctsCounted","r":false,"t":"`$INTEGER`","key$":"partiesPrecinctsCounted","index$":7},"partiesTurnout":{"a":true,"h":"Parties Turnout","n":"partiesTurnout","r":true,"sh":"A vote count and its percentage share.","t":"`$OBJECT`","key$":"partiesTurnout","index$":8},"precincts":{"a":true,"h":"Precincts","n":"precincts","r":true,"sh":"One row of integers per precinct: [precinct number, registered voters, ballots cast, invalid ballots, then one vote count per candidate in the order of 'candidates'].","t":"`$ARRAY`","key$":"precincts","index$":9},"precinctsCounted":{"a":true,"h":"Precincts Counted","n":"precinctsCounted","r":false,"t":"`$INTEGER`","key$":"precinctsCounted","index$":10},"precinctsTotal":{"a":true,"h":"Precincts Total","n":"precinctsTotal","r":false,"t":"`$INTEGER`","key$":"precinctsTotal","index$":11},"precinctsTotalSource":{"a":true,"h":"Precincts Total Source","n":"precinctsTotalSource","r":false,"t":"`$STRING`","key$":"precinctsTotalSource","index$":12},"sourceAt":{"a":true,"fo":"date-time","h":"Source At","n":"sourceAt","r":false,"sh":"Timestamp of the source data (Moscow time offset).","t":"`$STRING`","key$":"sourceAt","index$":13},"turnout":{"a":true,"h":"Turnout","n":"turnout","r":true,"sh":"A vote count and its percentage share.","t":"`$OBJECT`","key$":"turnout","index$":14},"updatedAt":{"a":true,"fo":"date-time","h":"Updated At","n":"updatedAt","r":false,"t":"`$STRING`","key$":"updatedAt","index$":15}},"name":"district_result","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/results","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"district","or":"district","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/api/results","q":{"exist":["district"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"results"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"district_result","name__orig":"district_result","Name":"DistrictResult","name_":"district_result","name-":"district-result","NAME":"DISTRICT_RESULT","index$":0}, {"active":true,"entity":"district_result","key$":"BasicDistrictResultFlow","kind":"basic","name":"BasicDistrictResultFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"district_result_ref01"}}],"index$":0}]}, 'DistrictResult', {"GET /api/results":{"protocol":"http","parameters":[{"name":"district","in":"query","required":true,"description":"Single-member district number, 1 to 225. Out-of-range values return 400 {\"error\":\"invalid district\"}.","schema":{"type":"integer","minimum":1,"maximum":225},"example":1,"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let district_result_ref01_data = Object.values(setup.data.existing.district_result)[0] as any

    // LIST
    const district_result_ref01_ent = client.DistrictResult()
    const district_result_ref01_match: any = {}

    const district_result_ref01_list = (await district_result_ref01_ent.list(district_result_ref01_match)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/district_result/DistrictResultTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = IditenaSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['district_result01','district_result02','district_result03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IDITENA_TEST_DISTRICT_RESULT_ENTID': idmap,
    'IDITENA_TEST_LIVE': 'FALSE',
    'IDITENA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['IDITENA_TEST_DISTRICT_RESULT_ENTID']

  const live = 'TRUE' === env.IDITENA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IDITENA_TEST_DISTRICT_RESULT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new IditenaSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
