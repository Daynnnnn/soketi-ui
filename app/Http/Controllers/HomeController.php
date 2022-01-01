<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function show(Event $event)
    {
        return Inertia::render('Home/Show');
    }
}
