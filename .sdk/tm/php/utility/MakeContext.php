<?php
declare(strict_types=1);

// Iditena SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class IditenaMakeContext
{
    public static function call(array $ctxmap, ?IditenaContext $basectx): IditenaContext
    {
        return new IditenaContext($ctxmap, $basectx);
    }
}
