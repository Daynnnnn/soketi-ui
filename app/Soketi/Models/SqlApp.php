<?php

namespace App\Soketi\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SqlApp extends Model
{
    use HasFactory;

    protected $table = 'apps';

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'webhooks' => 'json',
        'soketi_ui_settings' => 'json',
    ];

    public $timestamps = false;
}
