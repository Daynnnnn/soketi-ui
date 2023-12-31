<?php

namespace App\Notifications;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;

class NewDebugEvents implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected $events;
    protected $appId;
    protected $timestamp;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Collection $events, $appId)
    {
        $this->events = $events;
        $this->appId = $appId;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('events_' . $this->appId);
    }

    /**
     * Get the data to broadcast.
     *
     * @return array
     */
    public function broadcastWith()
    {
        return $this->events->toArray();
    }
}
