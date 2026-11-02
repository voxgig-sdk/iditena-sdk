# Iditena SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module IditenaFeatures
  def self.make_feature(name)
    case name
    when "base"
      IditenaBaseFeature.new
    when "ratelimit"
      IditenaRatelimitFeature.new
    when "retry"
      IditenaRetryFeature.new
    when "test"
      IditenaTestFeature.new
    when "timeout"
      IditenaTimeoutFeature.new
    else
      IditenaBaseFeature.new
    end
  end
end
