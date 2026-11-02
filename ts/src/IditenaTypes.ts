// Typed models for the Iditena SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface DistrictResult {
  aggregateSource?: string
  candidates: any[]
  districtName?: string
  districtNumber: number
  invalid: Record<string, any>
  parties: any[]
  partiesInvalid: Record<string, any>
  partiesPrecinctsCounted?: number
  partiesTurnout: Record<string, any>
  precincts: any[]
  precinctsCounted?: number
  precinctsTotal?: number
  precinctsTotalSource?: string
  sourceAt?: string
  turnout: Record<string, any>
  updatedAt?: string
}

export interface DistrictResultListMatch {
  district: number
}

export interface FinderIndex {
  districts: any[]
  snapshot?: string
  tiles: any[]
}

export interface FinderIndexListMatch {
  districts?: any[]
  snapshot?: string
  tiles?: any[]
}

export interface UikIndex {
  cik: string
  cikHouses?: string
  cikHousesCount?: number
  cikObserved?: string
  cikObservedCount?: number
  count: number
  fallback?: string
  fallbackCount?: number
  file?: string
  houses?: string
  housesIndex?: string
  housesIndexUrl?: string
  region: string
  slug: string
}

export interface UikIndexListMatch {
  cik?: string
  cikHouses?: string
  cikHousesCount?: number
  cikObserved?: string
  cikObservedCount?: number
  count?: number
  fallback?: string
  fallbackCount?: number
  file?: string
  houses?: string
  housesIndex?: string
  housesIndexUrl?: string
  region?: string
  slug?: string
}

export interface UikRegion {
  address?: string
  area?: string
  city?: string
  district?: number
  lat?: number
  lon?: number
  n?: number
  phone?: string
}

export interface UikRegionListMatch {
  region: string
}

export interface VisitorReport {
  closedAt?: Record<string, any>
  dateFrom?: string
  dateTo?: string
  districts: Record<string, any>
  fetchedAt?: string
}

export interface VisitorReportLoadMatch {
  closedAt?: Record<string, any>
  dateFrom?: string
  dateTo?: string
  districts?: Record<string, any>
  fetchedAt?: string
}

