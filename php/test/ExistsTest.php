<?php
declare(strict_types=1);

// Iditena SDK exists test

require_once __DIR__ . '/../iditena_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = IditenaSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
