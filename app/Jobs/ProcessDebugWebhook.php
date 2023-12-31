<?php

namespace App\Jobs;

use App\Notifications\NewDebugEvents;
use Carbon\Carbon;
use Illuminate\Support\Str;
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

        $events = collect($payload['events'])
            ->map(fn($event) => array_merge($event, ['pusher_created_at' => $timestamp, 'debug_uuid' => Str::uuid()]));

        NewDebugEvents::dispatch($events, $appId);
    }
}
