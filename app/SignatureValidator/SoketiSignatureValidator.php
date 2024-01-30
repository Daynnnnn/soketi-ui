<?php

namespace App\SignatureValidator;

use Spatie\WebhookClient\SignatureValidator\SignatureValidator;
use Illuminate\Http\Request;
use Spatie\WebhookClient\Exceptions\InvalidConfig;
use Spatie\WebhookClient\WebhookConfig;

class SoketiSignatureValidator implements SignatureValidator
{
    public function isValid(Request $request, WebhookConfig $config): bool
    {
        if (env('DISABLE_SIGNATURE_VALIDATION', false)) {
            return true;
        }

        $appId = $request->header('x-app-id');

        if ($appId == null) {
            return false;
        }

        $signature = $request->header($config->signatureHeaderName);

        if (! $signature) {
            return false;
        }

        $signingSecret = App::firstWhere('id', $appId)?->secret;

        if (empty($signingSecret)) {
            throw InvalidConfig::signingSecretNotSet();
        }

        $computedSignature = hash_hmac('sha256', $request->getContent(), $signingSecret);

        return hash_equals($signature, $computedSignature);
    }
}
