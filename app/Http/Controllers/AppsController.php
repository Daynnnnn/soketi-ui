<?php

namespace App\Http\Controllers;

use App\Models\App;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AppsController extends Controller
{
    public function index()
    {
        return Inertia::render('Apps', [
            'apps' => App::all(),
        ]);
    }

    public function create(Request $request)
    {
        App::create([
            'id' => rand(100000, 999999),
            'key' => strtolower(Str::random(20)),
            'secret' => strtolower(Str::random(20)),
            'name' => $request->name,
            'enabled' => true,
            'enable_client_messages' => false,
            'enable_user_authentication' => false,
            'max_connections' => -1,
            'max_backend_events_per_sec' => -1,
            'max_client_events_per_sec' => -1,
            'max_read_req_per_sec' => -1,
        ]);

        return $this->index();
    }

    public function refreshCredentials(App $app)
    {
        $app->key = strtolower(Str::random(20));
        $app->secret = strtolower(Str::random(20));

        $app->save();
    }
}
