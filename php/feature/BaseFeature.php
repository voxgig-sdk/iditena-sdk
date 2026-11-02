<?php
declare(strict_types=1);

// Iditena SDK base feature

class IditenaBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(IditenaContext $ctx, array $options): void {}
    public function PostConstruct(IditenaContext $ctx): void {}
    public function PostConstructEntity(IditenaContext $ctx): void {}
    public function SetData(IditenaContext $ctx): void {}
    public function GetData(IditenaContext $ctx): void {}
    public function GetMatch(IditenaContext $ctx): void {}
    public function SetMatch(IditenaContext $ctx): void {}
    public function PrePoint(IditenaContext $ctx): void {}
    public function PreSpec(IditenaContext $ctx): void {}
    public function PreRequest(IditenaContext $ctx): void {}
    public function PreResponse(IditenaContext $ctx): void {}
    public function PreResult(IditenaContext $ctx): void {}
    public function PreDone(IditenaContext $ctx): void {}
    public function PreUnexpected(IditenaContext $ctx): void {}
}
