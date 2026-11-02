

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


describe('UikRegionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IDITENA_TEST_LIVE=TRUE.
  afterEach(liveDelay('IDITENA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IditenaSDK.test()
    const ent = testsdk.UikRegion()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = IditenaSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.UikRegion().list({"region":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IDITENA_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'uik_region.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"address":{"a":true,"h":"Address","n":"address","r":false,"t":"`$STRING`","key$":"address","index$":0},"area":{"a":true,"h":"Area","n":"area","r":false,"t":"`$STRING`","key$":"area","index$":1},"city":{"a":true,"h":"City","n":"city","r":false,"t":"`$STRING`","key$":"city","index$":2},"district":{"a":true,"h":"District","n":"district","r":false,"sh":"Single-member district number.","t":"`$INTEGER`","key$":"district","index$":3},"lat":{"a":true,"h":"Lat","n":"lat","r":false,"t":"`$NUMBER`","key$":"lat","index$":4},"lon":{"a":true,"h":"Lon","n":"lon","r":false,"t":"`$NUMBER`","key$":"lon","index$":5},"n":{"a":true,"h":"N","n":"n","r":false,"sh":"Polling station (UIK) number.","t":"`$INTEGER`","key$":"n","index$":6},"phone":{"a":true,"h":"Phone","n":"phone","r":false,"t":"`$STRING`","key$":"phone","index$":7}},"name":"uik_region","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /data/uik/{region}.json","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"altayskiy-kray","k":"param","n":"region","or":"region","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/data/uik/{region}.json","q":{"exist":["region"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"data"},{"lit":"uik"},{"lit":"{region}.json"}],"t":{"req":"`reqdata`","res":"`body.stations`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"uik_region","name__orig":"uik_region","Name":"UikRegion","name_":"uik_region","name-":"uik-region","NAME":"UIK_REGION","index$":3}, {"active":true,"entity":"uik_region","key$":"BasicUikRegionFlow","kind":"basic","name":"BasicUikRegionFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"region":"region01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"uik_region_ref01"}}],"index$":0}]}, 'UikRegion', {"GET /data/uik/{region}.json":{"protocol":"http","parameters":[{"name":"region","in":"path","required":true,"description":"Region file stem: the 'file' value from getUikIndex without '.json' (usually equal to the region slug).","schema":{"type":"string"},"example":"altayskiy-kray","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let uik_region_ref01_data = Object.values(setup.data.existing.uik_region)[0] as any

    // LIST
    const uik_region_ref01_ent = client.UikRegion()
    const uik_region_ref01_match: any = {}
    uik_region_ref01_match['region'] = setup.idmap['region01']

    const uik_region_ref01_list = (await uik_region_ref01_ent.list(uik_region_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/uik_region/UikRegionTestData.json')

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
    ['uik_region01','uik_region02','uik_region03','region01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IDITENA_TEST_UIK_REGION_ENTID': idmap,
    'IDITENA_TEST_LIVE': 'FALSE',
    'IDITENA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['IDITENA_TEST_UIK_REGION_ENTID']

  const live = 'TRUE' === env.IDITENA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IDITENA_TEST_UIK_REGION_ENTID']
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
  
