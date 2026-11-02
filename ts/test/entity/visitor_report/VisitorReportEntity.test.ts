

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


describe('VisitorReportEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IDITENA_TEST_LIVE=TRUE.
  afterEach(liveDelay('IDITENA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IditenaSDK.test()
    const ent = testsdk.VisitorReport()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = IditenaSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.VisitorReport().load({"dateFrom":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IDITENA_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'visitor_report.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"closedAt":{"a":true,"h":"Closed At","n":"closedAt","r":false,"sh":"Poll closing time per district, keyed by district number.","t":"`$OBJECT`","key$":"closedAt","index$":0},"dateFrom":{"a":true,"fo":"date-time","h":"Date From","n":"dateFrom","r":false,"t":"`$STRING`","key$":"dateFrom","index$":1},"dateTo":{"a":true,"fo":"date-time","h":"Date To","n":"dateTo","r":false,"t":"`$STRING`","key$":"dateTo","index$":2},"districts":{"a":true,"h":"Districts","n":"districts","r":true,"sh":"Two integer counters per district, keyed by district number.","t":"`$OBJECT`","key$":"districts","index$":3},"fetchedAt":{"a":true,"fo":"date-time","h":"Fetched At","n":"fetchedAt","r":false,"t":"`$STRING`","key$":"fetchedAt","index$":4}},"name":"visitor_report","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/district-visitors","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/district-visitors","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"district-visitors"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"visitor_report","name__orig":"visitor_report","Name":"VisitorReport","name_":"visitor_report","name-":"visitor-report","NAME":"VISITOR_REPORT","index$":4}, {"active":true,"entity":"visitor_report","key$":"BasicVisitorReportFlow","kind":"basic","name":"BasicVisitorReportFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"visitor_report_ref01","srcdatavar":"visitor_report_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-visitor_report_ref01"}}],"index$":0}]}, 'VisitorReport', {"GET /api/district-visitors":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let visitor_report_ref01_data = Object.values(setup.data.existing.visitor_report)[0] as any

    // LOAD
    const visitor_report_ref01_ent = client.VisitorReport()
    const visitor_report_ref01_match_dt0: any = {}
    const visitor_report_ref01_data_dt0 = (await visitor_report_ref01_ent.load(visitor_report_ref01_match_dt0)).data()
    assert(null != visitor_report_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/visitor_report/VisitorReportTestData.json')

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
    ['visitor_report01','visitor_report02','visitor_report03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IDITENA_TEST_VISITOR_REPORT_ENTID': idmap,
    'IDITENA_TEST_LIVE': 'FALSE',
    'IDITENA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['IDITENA_TEST_VISITOR_REPORT_ENTID']

  const live = 'TRUE' === env.IDITENA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IDITENA_TEST_VISITOR_REPORT_ENTID']
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
  
