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

Route::get('/apps', [Controllers\AppsController::class, 'index'])->middleware(['auth']);
Route::get('/apps/{id}', fn($id) => redirect("/apps/$id/credentials"))->middleware(['auth']);
Route::get('/apps/{id}/credentials', [Controllers\AppsController::class, 'credentials'])->middleware(['auth']);
Route::get('/apps/{id}/limits', [Controllers\AppsController::class, 'limits'])->middleware(['auth']);
Route::get('/apps/{id}/webhooks', [Controllers\AppsController::class, 'webhooks'])->middleware(['auth']);
Route::get('/apps/{id}/debug', [Controllers\AppsController::class, 'debug'])->middleware(['auth']);

Route::post('/apps/{id}/regenerate-credentials', [Controllers\AppsController::class, 'regenerateCredentials'])->middleware(['auth']);
Route::post('/apps/{id}/save', [Controllers\AppsController::class, 'save'])->middleware(['auth']);
