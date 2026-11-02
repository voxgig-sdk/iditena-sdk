<?php
declare(strict_types=1);

// Typed models for the Iditena SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** DistrictResult entity data model. */
class DistrictResult
{
    public ?string $aggregateSource = null;
    public array $candidates;
    public ?string $districtName = null;
    public int $districtNumber;
    public array $invalid;
    public array $parties;
    public array $partiesInvalid;
    public ?int $partiesPrecinctsCounted = null;
    public array $partiesTurnout;
    public array $precincts;
    public ?int $precinctsCounted = null;
    public ?int $precinctsTotal = null;
    public ?string $precinctsTotalSource = null;
    public ?string $sourceAt = null;
    public array $turnout;
    public ?string $updatedAt = null;
}

/** Request payload for DistrictResult#list. */
class DistrictResultListMatch
{
    public int $district;
}

/** FinderIndex entity data model. */
class FinderIndex
{
    public array $districts;
    public ?string $snapshot = null;
    public array $tiles;
}

/** Request payload for FinderIndex#list. */
class FinderIndexListMatch
{
    public ?array $districts = null;
    public ?string $snapshot = null;
    public ?array $tiles = null;
}

/** UikIndex entity data model. */
class UikIndex
{
    public string $cik;
    public ?string $cikHouses = null;
    public ?int $cikHousesCount = null;
    public ?string $cikObserved = null;
    public ?int $cikObservedCount = null;
    public int $count;
    public ?string $fallback = null;
    public ?int $fallbackCount = null;
    public ?string $file = null;
    public ?string $houses = null;
    public ?string $housesIndex = null;
    public ?string $housesIndexUrl = null;
    public string $region;
    public string $slug;
}

/** Request payload for UikIndex#list. */
class UikIndexListMatch
{
    public ?string $cik = null;
    public ?string $cikHouses = null;
    public ?int $cikHousesCount = null;
    public ?string $cikObserved = null;
    public ?int $cikObservedCount = null;
    public ?int $count = null;
    public ?string $fallback = null;
    public ?int $fallbackCount = null;
    public ?string $file = null;
    public ?string $houses = null;
    public ?string $housesIndex = null;
    public ?string $housesIndexUrl = null;
    public ?string $region = null;
    public ?string $slug = null;
}

/** UikRegion entity data model. */
class UikRegion
{
    public ?string $address = null;
    public ?string $area = null;
    public ?string $city = null;
    public ?int $district = null;
    public ?float $lat = null;
    public ?float $lon = null;
    public ?int $n = null;
    public ?string $phone = null;
}

/** Request payload for UikRegion#list. */
class UikRegionListMatch
{
    public string $region;
}

/** VisitorReport entity data model. */
class VisitorReport
{
    public ?array $closedAt = null;
    public ?string $dateFrom = null;
    public ?string $dateTo = null;
    public array $districts;
    public ?string $fetchedAt = null;
}

/** Request payload for VisitorReport#load. */
class VisitorReportLoadMatch
{
    public ?array $closedAt = null;
    public ?string $dateFrom = null;
    public ?string $dateTo = null;
    public ?array $districts = null;
    public ?string $fetchedAt = null;
}

