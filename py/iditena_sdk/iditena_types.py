# Typed models for the Iditena SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class DistrictResultRequired(TypedDict):
    candidates: list
    districtNumber: int
    invalid: dict
    parties: list
    partiesInvalid: dict
    partiesTurnout: dict
    precincts: list
    turnout: dict


class DistrictResult(DistrictResultRequired, total=False):
    aggregateSource: str
    districtName: str
    partiesPrecinctsCounted: int
    precinctsCounted: int
    precinctsTotal: int
    precinctsTotalSource: str
    sourceAt: str
    updatedAt: str


class DistrictResultListMatch(TypedDict):
    district: int


class FinderIndexRequired(TypedDict):
    districts: list
    tiles: list


class FinderIndex(FinderIndexRequired, total=False):
    snapshot: str


class FinderIndexListMatch(TypedDict, total=False):
    districts: list
    snapshot: str
    tiles: list


class UikIndexRequired(TypedDict):
    cik: str
    count: int
    region: str
    slug: str


class UikIndex(UikIndexRequired, total=False):
    cikHouses: str
    cikHousesCount: int
    cikObserved: str
    cikObservedCount: int
    fallback: str
    fallbackCount: int
    file: str
    houses: str
    housesIndex: str
    housesIndexUrl: str


class UikIndexListMatch(TypedDict, total=False):
    cik: str
    cikHouses: str
    cikHousesCount: int
    cikObserved: str
    cikObservedCount: int
    count: int
    fallback: str
    fallbackCount: int
    file: str
    houses: str
    housesIndex: str
    housesIndexUrl: str
    region: str
    slug: str


class UikRegion(TypedDict, total=False):
    address: str
    area: str
    city: str
    district: int
    lat: float
    lon: float
    n: int
    phone: str


class UikRegionListMatch(TypedDict):
    region: str


class VisitorReportRequired(TypedDict):
    districts: dict


class VisitorReport(VisitorReportRequired, total=False):
    closedAt: dict
    dateFrom: str
    dateTo: str
    fetchedAt: str


class VisitorReportLoadMatch(TypedDict, total=False):
    closedAt: dict
    dateFrom: str
    dateTo: str
    districts: dict
    fetchedAt: str
