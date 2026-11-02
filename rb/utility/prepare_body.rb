# Iditena SDK utility: prepare_body
require_relative 'media'
module IditenaUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return IditenaUtilities.raw_body(ctx.reqdata) if IditenaUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
