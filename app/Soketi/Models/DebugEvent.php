<?php

namespace App\Soketi\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DebugEvent extends Model
{
    use HasFactory;

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'data' => 'json',
    ];

    protected $fillable = [
        'app_id',
        'event_type',
        'channel',
        'event',
        'data',
        'user_id',
        'pusher_created_at',
    ];
}
