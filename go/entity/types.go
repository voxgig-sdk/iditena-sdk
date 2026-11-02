// Typed models for the Iditena SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/iditena-sdk/go/core"
)

// DistrictResult is the typed data model for the district_result entity.
type DistrictResult struct {
}

// DistrictResultListMatch is the typed request payload for DistrictResult.ListTyped.
type DistrictResultListMatch struct {
	District int `json:"district"`
}

// FinderIndex is the typed data model for the finder_index entity.
type FinderIndex struct {
}

// FinderIndexListMatch is the typed request payload for FinderIndex.ListTyped.
type FinderIndexListMatch struct {
	Districts *[]any `json:"districts,omitempty"`
	Snapshot *string `json:"snapshot,omitempty"`
	Tiles *[]any `json:"tiles,omitempty"`
}

// UikIndex is the typed data model for the uik_index entity.
type UikIndex struct {
}

// UikIndexListMatch is the typed request payload for UikIndex.ListTyped.
type UikIndexListMatch struct {
	Cik *string `json:"cik,omitempty"`
	CikHouses *string `json:"cikHouses,omitempty"`
	CikHousesCount *int `json:"cikHousesCount,omitempty"`
	CikObserved *string `json:"cikObserved,omitempty"`
	CikObservedCount *int `json:"cikObservedCount,omitempty"`
	Count *int `json:"count,omitempty"`
	Fallback *string `json:"fallback,omitempty"`
	FallbackCount *int `json:"fallbackCount,omitempty"`
	File *string `json:"file,omitempty"`
	Houses *string `json:"houses,omitempty"`
	HousesIndex *string `json:"housesIndex,omitempty"`
	HousesIndexUrl *string `json:"housesIndexUrl,omitempty"`
	Region *string `json:"region,omitempty"`
	Slug *string `json:"slug,omitempty"`
}

// UikRegion is the typed data model for the uik_region entity.
type UikRegion struct {
}

// UikRegionListMatch is the typed request payload for UikRegion.ListTyped.
type UikRegionListMatch struct {
	Region string `json:"region"`
}

// VisitorReport is the typed data model for the visitor_report entity.
type VisitorReport struct {
}

// VisitorReportLoadMatch is the typed request payload for VisitorReport.LoadTyped.
type VisitorReportLoadMatch struct {
	ClosedAt *map[string]any `json:"closedAt,omitempty"`
	DateFrom *string `json:"dateFrom,omitempty"`
	DateTo *string `json:"dateTo,omitempty"`
	Districts *map[string]any `json:"districts,omitempty"`
	FetchedAt *string `json:"fetchedAt,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
