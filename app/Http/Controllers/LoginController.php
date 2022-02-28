<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function show()
    {
        if (!is_null(Auth::user())) {
            return redirect('/apps');
        }

        return Inertia::render('Login');
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            return redirect('/apps');
        }

        return Inertia::render('Login', [
            'errors' => [
                'message' => 'Incorrect Email or Password.'
            ],
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return redirect('/login');
    }
}
