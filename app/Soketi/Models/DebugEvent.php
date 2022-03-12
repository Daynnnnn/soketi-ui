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

    protected $map = [
        'event_types' => [
            'client_event' => 'Client Event',
            'member_added' => 'Member Added',
            'member_removed' => 'Member Removed',
            'channel_occupied' => 'Channel Occupied',
            'channel_vacated' => 'Channel Vacated',
        ]
    ];

    public function toFrontend()
    {
        return array_merge($this->toArray(), [
            'event_type' => $this->map['event_types'][$this->event_type],
        ]);
    }
}
