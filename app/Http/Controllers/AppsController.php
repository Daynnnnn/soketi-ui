<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AppsController extends Controller
{
    public function show()
    {
        return Inertia::render('Dashboard/Apps');
    }
}
