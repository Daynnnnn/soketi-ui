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

    public function refreshCredentials(App $app)
    {
        $app->key = strtolower(Str::random(20));
        $app->secret = strtolower(Str::random(20));

        $app->save();
    }
}
