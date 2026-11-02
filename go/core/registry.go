package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewDistrictResultEntityFunc func(client *IditenaSDK, entopts map[string]any) IditenaEntityBase

var NewFinderIndexEntityFunc func(client *IditenaSDK, entopts map[string]any) IditenaEntityBase

var NewUikIndexEntityFunc func(client *IditenaSDK, entopts map[string]any) IditenaEntityBase

var NewUikRegionEntityFunc func(client *IditenaSDK, entopts map[string]any) IditenaEntityBase

var NewVisitorReportEntityFunc func(client *IditenaSDK, entopts map[string]any) IditenaEntityBase

