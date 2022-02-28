<?php

namespace App\Soketi\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SqlApp extends Model
{
    use HasFactory;

    protected $table = 'apps';
    public $timestamps = false;
}
