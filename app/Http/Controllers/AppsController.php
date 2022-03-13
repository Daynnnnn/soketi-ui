<?php

namespace App\Http\Controllers;

use App\Soketi\Facades\Manager;
use App\Soketi\Models\DebugEvent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppsController extends Controller
{
    public function index()
    {
        $apps = Manager::all()->map(function ($app) {
            return [
                'id' => $app->get('appId'),
                'title' => $app->get('title'),
                'enabled' => $app->get('enabled'),
                'enable_client_messages' => $app->get('enableClientMessages'),
                'max_connections' => $app->get('maxConnections'),
                'webhook_count' => count($app->accessWebhooks()),
            ];
        })->toArray();

        return Inertia::render('Dashboard/Apps/Index', [
            'apps' => $apps,
        ]);
    }

    public function credentials($id)
    {
        $app = Manager::find($id);

        return Inertia::render('Dashboard/Apps/Credentials', [
            'app' => $app->toArray(),
        ]);
    }

    public function limits($id)
    {
        $app = Manager::find($id);

        return Inertia::render('Dashboard/Apps/Limits', [
            'app' => $app->toArray(),
        ]);
    }

    public function webhooks($id)
    {
        $app = Manager::find($id);

        return Inertia::render('Dashboard/Apps/Webhooks', [
            'app' => $app->toArray(),
        ]);
    }

    public function debug($id)
    {
        $app = Manager::find($id);

        $debugEvents = DebugEvent::where('app_id', $app->get('appId'))
            ->orderBy('pusher_created_at', 'desc')
            ->limit(10)
            ->get()
            ->map(fn($event) => $event->toArray());

        return Inertia::render('Dashboard/Apps/Debug', [
            'app' => fn() => $app->toArray(),
            'debug_events' => $debugEvents,
        ]);
    }

    public function save($id)
    {
        $app = Manager::find($id);

        foreach (request()->json() as $key => $value) {
            $app->set($key, $value);
        }

        $app->save();

        return redirect(url()->previous());
    }

    public function regenerateCredentials($id)
    {
        $app = Manager::find($id);

        $app->regenerateCredentials()->save();

        return redirect(url()->previous());
    }
}
