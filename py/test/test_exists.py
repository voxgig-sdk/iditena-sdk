# Iditena SDK exists test

import pytest
from iditena_sdk import IditenaSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = IditenaSDK.test(None, None)
        assert testsdk is not None
