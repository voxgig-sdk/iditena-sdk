

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


describe('UikIndexEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IDITENA_TEST_LIVE=TRUE.
  afterEach(liveDelay('IDITENA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IditenaSDK.test()
    const ent = testsdk.UikIndex()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('uik_index hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of IditenaSDK.test(offline).UikIndex().stream('list')) { }
    }, /offline/)

    for await (const _item of IditenaSDK.test(offline).UikIndex()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = IditenaSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.UikIndex().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of IditenaSDK.test().UikIndex().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new IditenaSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.UikIndex().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.UikIndex().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = IditenaSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.UikIndex().list({"cik":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IDITENA_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'uik_index.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"cik":{"a":true,"h":"Cik","n":"cik","r":true,"sh":"Region code.","t":"`$STRING`","key$":"cik","index$":0},"cikHouses":{"a":true,"h":"Cik Houses","n":"cikHouses","r":false,"t":"`$STRING`","key$":"cikHouses","index$":1},"cikHousesCount":{"a":true,"h":"Cik Houses Count","n":"cikHousesCount","r":false,"t":"`$INTEGER`","key$":"cikHousesCount","index$":2},"cikObserved":{"a":true,"h":"Cik Observed","n":"cikObserved","r":false,"t":"`$STRING`","key$":"cikObserved","index$":3},"cikObservedCount":{"a":true,"h":"Cik Observed Count","n":"cikObservedCount","r":false,"t":"`$INTEGER`","key$":"cikObservedCount","index$":4},"count":{"a":true,"h":"Count","n":"count","r":true,"t":"`$INTEGER`","key$":"count","index$":5},"fallback":{"a":true,"h":"Fallback","n":"fallback","r":false,"t":"`$STRING`","key$":"fallback","index$":6},"fallbackCount":{"a":true,"h":"Fallback Count","n":"fallbackCount","r":false,"t":"`$INTEGER`","key$":"fallbackCount","index$":7},"file":{"a":true,"h":"File","n":"file","r":false,"sh":"Polling-station file name under /data/uik/; absent for some regions.","t":"`$STRING`","key$":"file","index$":8},"houses":{"a":true,"h":"Houses","n":"houses","r":false,"t":"`$STRING`","key$":"houses","index$":9},"housesIndex":{"a":true,"h":"Houses Index","n":"housesIndex","r":false,"t":"`$STRING`","key$":"housesIndex","index$":10},"housesIndexUrl":{"a":true,"h":"Houses Index Url","n":"housesIndexUrl","r":false,"t":"`$STRING`","key$":"housesIndexUrl","index$":11},"region":{"a":true,"h":"Region","n":"region","r":true,"t":"`$STRING`","key$":"region","index$":12},"slug":{"a":true,"h":"Slug","n":"slug","r":true,"t":"`$STRING`","key$":"slug","index$":13}},"name":"uik_index","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /data/uik/index.json","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/data/uik/index.json","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"data"},{"lit":"uik"},{"lit":"index.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"uik_index","name__orig":"uik_index","Name":"UikIndex","name_":"uik_index","name-":"uik-index","NAME":"UIK_INDEX","index$":2}, {"active":true,"entity":"uik_index","key$":"BasicUikIndexFlow","kind":"basic","name":"BasicUikIndexFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"uik_index_ref01"}}],"index$":0}]}, 'UikIndex', {"GET /data/uik/index.json":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let uik_index_ref01_data = Object.values(setup.data.existing.uik_index)[0] as any

    // LIST
    const uik_index_ref01_ent = client.UikIndex()
    const uik_index_ref01_match: any = {}

    const uik_index_ref01_list = (await uik_index_ref01_ent.list(uik_index_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/uik_index/UikIndexTestData.json')

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
    ['uik_index01','uik_index02','uik_index03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IDITENA_TEST_UIK_INDEX_ENTID': idmap,
    'IDITENA_TEST_LIVE': 'FALSE',
    'IDITENA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['IDITENA_TEST_UIK_INDEX_ENTID']

  const live = 'TRUE' === env.IDITENA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IDITENA_TEST_UIK_INDEX_ENTID']
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
  
