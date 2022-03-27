<?php

namespace App\Jobs;

use App\Events\NewDebugEvent;
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
            NewDebugEvent::dispatch(array_merge($event, [
                'app_id' => $appId,
                'pusher_created_at' => $timestamp,
            ]));
        }
    }
}
