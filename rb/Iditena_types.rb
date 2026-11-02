# frozen_string_literal: true

# Typed models for the Iditena SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# DistrictResult entity data model.
#
# @!attribute [rw] aggregateSource
#   @return [String, nil]
#
# @!attribute [rw] candidates
#   @return [Array]
#
# @!attribute [rw] districtName
#   @return [String, nil]
#
# @!attribute [rw] districtNumber
#   @return [Integer]
#
# @!attribute [rw] invalid
#   @return [Hash]
#
# @!attribute [rw] parties
#   @return [Array]
#
# @!attribute [rw] partiesInvalid
#   @return [Hash]
#
# @!attribute [rw] partiesPrecinctsCounted
#   @return [Integer, nil]
#
# @!attribute [rw] partiesTurnout
#   @return [Hash]
#
# @!attribute [rw] precincts
#   @return [Array]
#
# @!attribute [rw] precinctsCounted
#   @return [Integer, nil]
#
# @!attribute [rw] precinctsTotal
#   @return [Integer, nil]
#
# @!attribute [rw] precinctsTotalSource
#   @return [String, nil]
#
# @!attribute [rw] sourceAt
#   @return [String, nil]
#
# @!attribute [rw] turnout
#   @return [Hash]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
DistrictResult = Struct.new(
  :aggregateSource,
  :candidates,
  :districtName,
  :districtNumber,
  :invalid,
  :parties,
  :partiesInvalid,
  :partiesPrecinctsCounted,
  :partiesTurnout,
  :precincts,
  :precinctsCounted,
  :precinctsTotal,
  :precinctsTotalSource,
  :sourceAt,
  :turnout,
  :updatedAt,
  keyword_init: true
)

# Request payload for DistrictResult#list.
#
# @!attribute [rw] district
#   @return [Integer]
DistrictResultListMatch = Struct.new(
  :district,
  keyword_init: true
)

# FinderIndex entity data model.
#
# @!attribute [rw] districts
#   @return [Array]
#
# @!attribute [rw] snapshot
#   @return [String, nil]
#
# @!attribute [rw] tiles
#   @return [Array]
FinderIndex = Struct.new(
  :districts,
  :snapshot,
  :tiles,
  keyword_init: true
)

# Request payload for FinderIndex#list.
#
# @!attribute [rw] districts
#   @return [Array, nil]
#
# @!attribute [rw] snapshot
#   @return [String, nil]
#
# @!attribute [rw] tiles
#   @return [Array, nil]
FinderIndexListMatch = Struct.new(
  :districts,
  :snapshot,
  :tiles,
  keyword_init: true
)

# UikIndex entity data model.
#
# @!attribute [rw] cik
#   @return [String]
#
# @!attribute [rw] cikHouses
#   @return [String, nil]
#
# @!attribute [rw] cikHousesCount
#   @return [Integer, nil]
#
# @!attribute [rw] cikObserved
#   @return [String, nil]
#
# @!attribute [rw] cikObservedCount
#   @return [Integer, nil]
#
# @!attribute [rw] count
#   @return [Integer]
#
# @!attribute [rw] fallback
#   @return [String, nil]
#
# @!attribute [rw] fallbackCount
#   @return [Integer, nil]
#
# @!attribute [rw] file
#   @return [String, nil]
#
# @!attribute [rw] houses
#   @return [String, nil]
#
# @!attribute [rw] housesIndex
#   @return [String, nil]
#
# @!attribute [rw] housesIndexUrl
#   @return [String, nil]
#
# @!attribute [rw] region
#   @return [String]
#
# @!attribute [rw] slug
#   @return [String]
UikIndex = Struct.new(
  :cik,
  :cikHouses,
  :cikHousesCount,
  :cikObserved,
  :cikObservedCount,
  :count,
  :fallback,
  :fallbackCount,
  :file,
  :houses,
  :housesIndex,
  :housesIndexUrl,
  :region,
  :slug,
  keyword_init: true
)

# Request payload for UikIndex#list.
#
# @!attribute [rw] cik
#   @return [String, nil]
#
# @!attribute [rw] cikHouses
#   @return [String, nil]
#
# @!attribute [rw] cikHousesCount
#   @return [Integer, nil]
#
# @!attribute [rw] cikObserved
#   @return [String, nil]
#
# @!attribute [rw] cikObservedCount
#   @return [Integer, nil]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] fallback
#   @return [String, nil]
#
# @!attribute [rw] fallbackCount
#   @return [Integer, nil]
#
# @!attribute [rw] file
#   @return [String, nil]
#
# @!attribute [rw] houses
#   @return [String, nil]
#
# @!attribute [rw] housesIndex
#   @return [String, nil]
#
# @!attribute [rw] housesIndexUrl
#   @return [String, nil]
#
# @!attribute [rw] region
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
UikIndexListMatch = Struct.new(
  :cik,
  :cikHouses,
  :cikHousesCount,
  :cikObserved,
  :cikObservedCount,
  :count,
  :fallback,
  :fallbackCount,
  :file,
  :houses,
  :housesIndex,
  :housesIndexUrl,
  :region,
  :slug,
  keyword_init: true
)

# UikRegion entity data model.
#
# @!attribute [rw] address
#   @return [String, nil]
#
# @!attribute [rw] area
#   @return [String, nil]
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] district
#   @return [Integer, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] lon
#   @return [Float, nil]
#
# @!attribute [rw] n
#   @return [Integer, nil]
#
# @!attribute [rw] phone
#   @return [String, nil]
UikRegion = Struct.new(
  :address,
  :area,
  :city,
  :district,
  :lat,
  :lon,
  :n,
  :phone,
  keyword_init: true
)

# Request payload for UikRegion#list.
#
# @!attribute [rw] region
#   @return [String]
UikRegionListMatch = Struct.new(
  :region,
  keyword_init: true
)

# VisitorReport entity data model.
#
# @!attribute [rw] closedAt
#   @return [Hash, nil]
#
# @!attribute [rw] dateFrom
#   @return [String, nil]
#
# @!attribute [rw] dateTo
#   @return [String, nil]
#
# @!attribute [rw] districts
#   @return [Hash]
#
# @!attribute [rw] fetchedAt
#   @return [String, nil]
VisitorReport = Struct.new(
  :closedAt,
  :dateFrom,
  :dateTo,
  :districts,
  :fetchedAt,
  keyword_init: true
)

# Request payload for VisitorReport#load.
#
# @!attribute [rw] closedAt
#   @return [Hash, nil]
#
# @!attribute [rw] dateFrom
#   @return [String, nil]
#
# @!attribute [rw] dateTo
#   @return [String, nil]
#
# @!attribute [rw] districts
#   @return [Hash, nil]
#
# @!attribute [rw] fetchedAt
#   @return [String, nil]
VisitorReportLoadMatch = Struct.new(
  :closedAt,
  :dateFrom,
  :dateTo,
  :districts,
  :fetchedAt,
  keyword_init: true
)

