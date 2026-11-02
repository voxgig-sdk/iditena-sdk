# Iditena SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

IditenaUtility.registrar = ->(u) {
  u.clean = IditenaUtilities::Clean
  u.clean_add = IditenaUtilities::CleanAdd
  u.clean_explain = IditenaUtilities::CleanExplain
  u.done = IditenaUtilities::Done
  u.make_error = IditenaUtilities::MakeError
  u.feature_add = IditenaUtilities::FeatureAdd
  u.feature_hook = IditenaUtilities::FeatureHook
  u.feature_init = IditenaUtilities::FeatureInit
  u.fetcher = IditenaUtilities::Fetcher
  u.make_fetch_def = IditenaUtilities::MakeFetchDef
  u.make_context = IditenaUtilities::MakeContext
  u.make_options = IditenaUtilities::MakeOptions
  u.make_request = IditenaUtilities::MakeRequest
  u.make_response = IditenaUtilities::MakeResponse
  u.make_result = IditenaUtilities::MakeResult
  u.make_point = IditenaUtilities::MakePoint
  u.make_spec = IditenaUtilities::MakeSpec
  u.make_url = IditenaUtilities::MakeUrl
  u.param = IditenaUtilities::Param
  u.prepare_auth = IditenaUtilities::PrepareAuth
  u.prepare_body = IditenaUtilities::PrepareBody
  u.prepare_headers = IditenaUtilities::PrepareHeaders
  u.prepare_method = IditenaUtilities::PrepareMethod
  u.prepare_params = IditenaUtilities::PrepareParams
  u.prepare_path = IditenaUtilities::PreparePath
  u.prepare_query = IditenaUtilities::PrepareQuery
  u.graphql_body = IditenaUtilities::GraphqlBody
  u.graphql_errors = IditenaUtilities::GraphqlErrors
  u.result_basic = IditenaUtilities::ResultBasic
  u.result_body = IditenaUtilities::ResultBody
  u.result_headers = IditenaUtilities::ResultHeaders
  u.transform_request = IditenaUtilities::TransformRequest
  u.transform_response = IditenaUtilities::TransformResponse
}
