<?php

namespace App\Jobs;

use App\Events\NewDebugEvents;
use App\Stores\DebugEventStore;
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

        $debugEventStore = new DebugEventStore($appId);

        $events = collect($payload['events'])
            ->map(fn($event) => array_merge($event, ['pusher_created_at' => $timestamp]))
            ->each(fn($event) => $debugEventStore->push($event));

        $debugEventStore->save();

        NewDebugEvents::dispatch($events, $appId);
    }
}
