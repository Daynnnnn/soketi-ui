<?php

namespace App\Http\Controllers;

use App\Models\App;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LimitsController extends Controller
{
    protected $limits = [
        'max_connections',
        'max_backend_events_per_sec',
        'max_client_events_per_sec',
        'max_presence_members_per_channel',
        'max_presence_member_size_in_kb',
        'max_channel_name_length',
        'max_event_channels_at_once',
        'max_read_req_per_sec',
        'max_event_name_length',
        'max_event_payload_in_kb',
        'max_event_batch_size',
    ];

    public function save(Request $request, App $app)
    {
        $app->fill($request->only($this->limits));
        $app->save();
    }
}
