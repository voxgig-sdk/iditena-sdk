# Iditena SDK feature factory

from iditena_sdk.feature.base_feature import IditenaBaseFeature
from iditena_sdk.feature.ratelimit_feature import IditenaRatelimitFeature
from iditena_sdk.feature.retry_feature import IditenaRetryFeature
from iditena_sdk.feature.test_feature import IditenaTestFeature
from iditena_sdk.feature.timeout_feature import IditenaTimeoutFeature


_FEATURES = {
    "base": lambda: IditenaBaseFeature(),
    "ratelimit": lambda: IditenaRatelimitFeature(),
    "retry": lambda: IditenaRetryFeature(),
    "test": lambda: IditenaTestFeature(),
    "timeout": lambda: IditenaTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
