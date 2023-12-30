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
        ]);
    }
}
