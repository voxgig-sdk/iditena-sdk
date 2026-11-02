# UikRegion entity test

import json
import os
import time

import pytest

from iditena_sdk.utility.voxgig_struct import voxgig_struct as vs
from iditena_sdk import IditenaSDK
from iditena_sdk.core import helpers
from iditena_sdk.config import shared_config
from iditena_sdk.feature.base_feature import IditenaBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestUikRegionEntity:

    def test_should_create_instance(self):
        testsdk = IditenaSDK.test(None, None)
        ent = testsdk.UikRegion(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = IditenaSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.UikRegion(None).list({"region": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _uik_region_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "uik_region." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"]:
            for _live_key, _live_ex in {"region01": "altayskiy-kray"}.items():
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    setup["idmap"][_live_key] = _live_ex
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        uik_region_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.uik_region")))
        uik_region_ref01_data = None
        if len(uik_region_ref01_data_raw) > 0:
            uik_region_ref01_data = helpers.to_map(uik_region_ref01_data_raw[0][1])

        # LIST
        uik_region_ref01_ent = client.UikRegion(None)
        uik_region_ref01_match = {
            "region": setup["idmap"]["region01"],
        }

        uik_region_ref01_list_result = uik_region_ref01_ent.list(uik_region_ref01_match, None)
        assert isinstance(uik_region_ref01_list_result, list)



def _uik_region_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/uik_region/UikRegionTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = IditenaSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["uik_region01", "uik_region02", "uik_region03", "region01"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "IDITENA_TEST_UIK_REGION_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "IDITENA_TEST_UIK_REGION_ENTID": idmap,
        "IDITENA_TEST_LIVE": "FALSE",
        "IDITENA_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("IDITENA_TEST_UIK_REGION_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("IDITENA_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
            },
            extra or {},
        ])
        client = IditenaSDK(helpers.to_map(merged_opts))

    _live = env.get("IDITENA_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("IDITENA_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
