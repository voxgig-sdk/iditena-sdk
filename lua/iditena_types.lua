-- Typed models for the Iditena SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class DistrictResult
---@field aggregateSource? string
---@field candidates table
---@field districtName? string
---@field districtNumber number
---@field invalid table
---@field parties table
---@field partiesInvalid table
---@field partiesPrecinctsCounted? number
---@field partiesTurnout table
---@field precincts table
---@field precinctsCounted? number
---@field precinctsTotal? number
---@field precinctsTotalSource? string
---@field sourceAt? string
---@field turnout table
---@field updatedAt? string

---@class DistrictResultListMatch
---@field district number

---@class FinderIndex
---@field districts table
---@field snapshot? string
---@field tiles table

---@class FinderIndexListMatch
---@field districts? table
---@field snapshot? string
---@field tiles? table

---@class UikIndex
---@field cik string
---@field cikHouses? string
---@field cikHousesCount? number
---@field cikObserved? string
---@field cikObservedCount? number
---@field count number
---@field fallback? string
---@field fallbackCount? number
---@field file? string
---@field houses? string
---@field housesIndex? string
---@field housesIndexUrl? string
---@field region string
---@field slug string

---@class UikIndexListMatch
---@field cik? string
---@field cikHouses? string
---@field cikHousesCount? number
---@field cikObserved? string
---@field cikObservedCount? number
---@field count? number
---@field fallback? string
---@field fallbackCount? number
---@field file? string
---@field houses? string
---@field housesIndex? string
---@field housesIndexUrl? string
---@field region? string
---@field slug? string

---@class UikRegion
---@field address? string
---@field area? string
---@field city? string
---@field district? number
---@field lat? number
---@field lon? number
---@field n? number
---@field phone? string

---@class UikRegionListMatch
---@field region string

---@class VisitorReport
---@field closedAt? table
---@field dateFrom? string
---@field dateTo? string
---@field districts table
---@field fetchedAt? string

---@class VisitorReportLoadMatch
---@field closedAt? table
---@field dateFrom? string
---@field dateTo? string
---@field districts? table
---@field fetchedAt? string

local M = {}

return M
