# Iditena SDK utility: make_context
require_relative '../core/context'
module IditenaUtilities
  MakeContext = ->(ctxmap, basectx) {
    IditenaContext.new(ctxmap, basectx)
  }
end
