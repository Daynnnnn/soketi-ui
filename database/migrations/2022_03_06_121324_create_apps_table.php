<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAppsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('apps', function (Blueprint $table) {
            $table->string('id', 255);
            $table->string('key', 255);
            $table->string('secret', 255);
            $table->integer('max_connections');
            $table->boolean('enable_client_messages');
            $table->boolean('enabled');
            $table->integer('max_backend_events_per_sec');
            $table->integer('max_client_events_per_sec');
            $table->integer('max_read_req_per_sec');
            $table->json('webhooks')->nullable();
            $table->primary('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('apps');
    }
}
