<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OverviewController extends Controller
{
    public function show()
    {
        return Inertia::render('Dashboard/Overview');
    }
}
