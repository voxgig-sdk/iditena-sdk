# Iditena SDK exists test

require "minitest/autorun"
require_relative "../Iditena_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = IditenaSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
