<?php

use App\Http\Controllers;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', fn() => redirect('/login'));

Route::get('/login', [Controllers\LoginController::class, 'show'])->name('login');
Route::post('/login', [Controllers\LoginController::class, 'login']);

Route::get('/logout', [Controllers\LoginController::class, 'logout']);

Route::get('/overview', [Controllers\OverviewController::class, 'show'])->middleware(['auth']);
Route::get('/apps', [Controllers\AppsController::class, 'show'])->middleware(['auth']);
