<?php

namespace App\Jobs;

use App\Soketi\Models\DebugEvent;
use Carbon\Carbon;
use Spatie\WebhookClient\Jobs\ProcessWebhookJob;

class ProcessDebugWebhook extends ProcessWebhookJob
{
    /**
     * Process incoming debugging webhook.
     *
     * @return void
     */
    public function handle()
    {
        $appId = $this->webhookCall->headers()->get('x-app-id');

        $payload = $this->webhookCall->payload;

        $timestamp = Carbon::parse($payload['time_ms'] / 1000)->toDateTimeString();

        foreach($payload['events'] as $event) {
            DebugEvent::create([
                'app_id' => $appId,
                'event_type' => $event['name'],
                'channel' => $event['channel'],
                'event' => $event['event'] ?? null,
                'data' => $event['data'] ?? null,
                'user_id' => $event['user_id'] ?? null,
                'pusher_created_at' => $timestamp,
            ]);
        }
    }
}
