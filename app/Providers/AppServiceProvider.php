<?php

namespace App\Providers;

use App\Soketi\Contracts\ManagerContract;
use App\Soketi\Managers\SqlManager;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(ManagerContract::class, function () {
            return new SqlManager;
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
