<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class RegisterController extends Controller
{
    public function show()
    {
        return Inertia::render('Register');
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users,email',
            'password' => 'required',
        ]);

        User::create([
            'name' => $request->input('name'),
            'email' =>  $request->input('email'),     
            'password' => Hash::make($request->input('password')),
        ])->sendEmailVerificationNotification();

        return Inertia::render('Register');
    }
}
