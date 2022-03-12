<?php

namespace App\Soketi\Webhooks;

use App\Soketi\Facades\Manager;
use Illuminate\Http\Request;
use Spatie\WebhookClient\SignatureValidator\SignatureValidator as SignatureValidatorInterface;
use Spatie\WebhookClient\WebhookConfig;

class SignatureValidator implements SignatureValidatorInterface
{
    public function isValid(Request $request, WebhookConfig $config): bool
    {
        // Get app id from headers
        if (($appId = $request->header('X-App-ID')) == null) {
            return false;
        }

        // Get signature
        if (($signature = $request->header('X-Pusher-Signature')) == null) {
            return false;
        }

        // Get app secret from passed in app id
        if (($appSecret = optional(Manager::find($appId))->get('appSecret')) == null) {
            return false;
        }

        // Validate signature
        $computedSignature = hash_hmac('sha256', $request->getContent(), $appSecret);

        // Compare sent and computed hashes
        return hash_equals($signature, $computedSignature);
    }
}
