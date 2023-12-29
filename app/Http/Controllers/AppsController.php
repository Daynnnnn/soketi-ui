<?php

namespace App\Http\Controllers;

use App\Models\App;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppsController extends Controller
{
    public function index()
    {
        return Inertia::render('Apps', [
            'apps' => App::all(),
        ]);
    }
}
