<?php
declare(strict_types=1);

// Iditena SDK utility: result_headers

class IditenaResultHeaders
{
    public static function call(IditenaContext $ctx): ?IditenaResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
