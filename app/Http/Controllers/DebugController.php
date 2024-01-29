<?php

namespace App\Http\Controllers;

use App\Models\App;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DebugController extends Controller
{
    public function index(App $app)
    {
        return Inertia::render('Debug', [
            'app' => $app,
            'pusherConfig' => [
                'appKey' => env('PUSHER_APP_KEY'),
                'cluster' => env('PUSHER_APP_CLUSTER'),
                'host' => env('PUSHER_HOST'),
                'port' => env('PUSHER_PORT'),
                'forceTLS' => env('PUSHER_SCHEME') === 'https',
            ],
        ]);
    }
}
