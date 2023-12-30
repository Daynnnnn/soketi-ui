<?php

namespace App\Http\Controllers;

use App\Models\App;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class WebhooksController extends Controller
{
    public function save(Request $request, App $app)
    {
        if ($request->id !== null) {
            $app->webhooks = $app->webhooks->map(function ($webhook) use ($request) {
                if (! isset($webhook['id']) || $request->id !== $webhook['id']) {
                    return $webhook;
                }

                $headers = collect($request->get('headers'))->filter(fn ($value, $key) => $key && $value)->all();

                $webhook['url'] = $request->url;
                $webhook['event_types'] = $request->event_types;
                $webhook['headers'] = $headers;

                return $webhook;
            });
        } else {
            $headers = collect($request->get('headers'))->filter(fn ($value, $key) => $key && $value)->all();

            $app->webhooks = $app->webhooks->push([
                'id' => Str::uuid(),
                'url' => $request->url,
                'event_types' => $request->event_types,
                'headers' => $headers,
            ]);
        }

        $app->save();
    }

    public function delete(Request $request, App $app)
    {
        $app->webhooks = $app->webhooks->filter(fn ($webhook) => $webhook['id'] !== $request->id)->values();

        $app->save();
    }

    public function toggleDebuggingWebhook(Request $request, App $app)
    {
        $debuggingWebhook = $app->webhooks->firstWhere(fn ($webhook) => $webhook['debug'] ?? false);

        if (! $debuggingWebhook) {
            $app->webhooks = $app->webhooks->push([
                'id' => Str::uuid(),
                'debug' => true,
                'url' => url('/webhooks'),
                'event_types' => [
                    'client_event',
                    'channel_occupied',
                    'channel_vacated',
                    'member_added',
                    'member_removed',
                ],
                'headers' => [
                    'X-App-Id' => $app->id,
                ],
            ]);
        } else {
            $app->webhooks = $app->webhooks->filter(fn ($webhook) => !($webhook['debug'] ?? false));
        }

        $app->save();
    }
}
