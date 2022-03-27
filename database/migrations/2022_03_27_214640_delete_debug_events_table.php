<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('debug_events');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::create('debug_events', function (Blueprint $table) {
            $table->id();
            $table->string('app_id');
            $table->string("event_type");
            $table->string("channel");
            $table->string("event")->nullable();
            $table->json("data")->nullable();
            $table->string("user_id")->nullable();
            $table->dateTime("pusher_created_at");
            $table->timestamps();
        });
    }
};
