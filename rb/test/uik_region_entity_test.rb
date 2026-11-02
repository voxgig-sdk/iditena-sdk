# UikRegion entity test

require "minitest/autorun"
require "json"
require_relative "../Iditena_sdk"
require_relative "runner"

class UikRegionEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = IditenaSDK.test(nil, nil)
    ent = testsdk.UikRegion(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = IditenaConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = IditenaSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.UikRegion(nil).list({ "region" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = uik_region_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "uik_region." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      { "region01" => "altayskiy-kray" }.each do |_live_key, _live_ex|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          setup[:idmap][_live_key] = _live_ex
        end
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    uik_region_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.uik_region")))
    uik_region_ref01_data = nil
    if uik_region_ref01_data_raw.length > 0
      uik_region_ref01_data = Helpers.to_map(uik_region_ref01_data_raw[0][1])
    end

    # LIST
    uik_region_ref01_ent = client.UikRegion(nil)
    uik_region_ref01_match = {
      "region" => setup[:idmap]["region01"],
    }

    uik_region_ref01_list_result = uik_region_ref01_ent.list(uik_region_ref01_match, nil)
    assert uik_region_ref01_list_result.is_a?(Array)

  end
end

def uik_region_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "uik_region", "UikRegionTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = IditenaSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["uik_region01", "uik_region02", "uik_region03", "region01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["IDITENA_TEST_UIK_REGION_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "IDITENA_TEST_UIK_REGION_ENTID" => idmap,
    "IDITENA_TEST_LIVE" => "FALSE",
    "IDITENA_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["IDITENA_TEST_UIK_REGION_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["IDITENA_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
      },
      extra || {},
    ])
    client = IditenaSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["IDITENA_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["IDITENA_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
