package voxgigiditenasdk

import (
	"github.com/voxgig-sdk/iditena-sdk/go/core"
	"github.com/voxgig-sdk/iditena-sdk/go/entity"
	"github.com/voxgig-sdk/iditena-sdk/go/feature"
	_ "github.com/voxgig-sdk/iditena-sdk/go/utility"
)

// Type aliases preserve external API.
type IditenaSDK = core.IditenaSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type IditenaEntityBase = core.IditenaEntityBase

// Deprecated: use IditenaEntityBase.
type IditenaEntity = core.IditenaEntityBase

type StreamItem = core.StreamItem
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type IditenaError = core.IditenaError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewDistrictResultEntityFunc = func(client *core.IditenaSDK, entopts map[string]any) core.IditenaEntityBase {
		return entity.NewDistrictResultEntity(client, entopts)
	}
	core.NewFinderIndexEntityFunc = func(client *core.IditenaSDK, entopts map[string]any) core.IditenaEntityBase {
		return entity.NewFinderIndexEntity(client, entopts)
	}
	core.NewUikIndexEntityFunc = func(client *core.IditenaSDK, entopts map[string]any) core.IditenaEntityBase {
		return entity.NewUikIndexEntity(client, entopts)
	}
	core.NewUikRegionEntityFunc = func(client *core.IditenaSDK, entopts map[string]any) core.IditenaEntityBase {
		return entity.NewUikRegionEntity(client, entopts)
	}
	core.NewVisitorReportEntityFunc = func(client *core.IditenaSDK, entopts map[string]any) core.IditenaEntityBase {
		return entity.NewVisitorReportEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewIditenaSDK = core.NewIditenaSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewIditenaSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *IditenaSDK  { return NewIditenaSDK(nil) }
func Test() *IditenaSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
