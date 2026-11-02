# Iditena SDK utility: make_context

from iditena_sdk.core.context import IditenaContext


def make_context_util(ctxmap, basectx):
    return IditenaContext(ctxmap, basectx)
