<?php

use App\Http\Controllers\AppsController;
use App\Http\Controllers\DebugController;
use App\Http\Controllers\LimitsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WebhooksController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::middleware(['auth', 'verified'])->prefix('apps')->name('apps.')->group(function () {
    Route::get('/', [AppsController::class, 'index'])->name('index');
    Route::prefix('{app}')->group(function () {
        Route::get('debug', [DebugController::class, 'index'])->name('debug');

        Route::prefix('webhooks')->name('webhooks.')->group(function () {
            Route::post('save', [WebhooksController::class, 'save']);
            Route::post('delete', [WebhooksController::class, 'delete']);
        });

        Route::post('limits', [LimitsController::class, 'save'])->name('limits');

        Route::post('refresh-credentials', [AppsController::class, 'refreshCredentials'])->name('refresh-credentials');
    });
});



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
