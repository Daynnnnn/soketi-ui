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

                $webhook['url'] = $request->url;
                $webhook['event_types'] = $request->event_types;

                return $webhook;
            });
        } else {
            $app->webhooks = $app->webhooks->push([
                'id' => Str::uuid(),
                'url' => $request->url,
                'event_types' => $request->event_types,
            ]);
        }

        $app->save();
    }
}
