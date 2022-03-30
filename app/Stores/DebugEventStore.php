<?php

namespace App\Stores;

use Illuminate\Support\Facades\Cache;

class DebugEventStore
{
    protected $id;
    protected $debugEvents;
    
    public function __construct($id)
    {
        $this->id = $id;
        $this->debugEvents = Cache::rememberForever('debug_events::'.$this->id, fn() => collect());
    }

    public function get()
    {
        return $this->debugEvents;
    }

    public function push($event)
    {
        $this->debugEvents->prepend($event);
        $this->save();
    }

    public function pushBatch($events)
    {
        foreach($events as $event) {
             $this->debugEvents->prepend($event);
        }

        $this->save();
    }

    public function reset()
    {
        $this->debugEvents = collect();
        $this->save();
    }

    protected function save()
    {
        Cache::put('debug_events::'.$this->id, $this->debugEvents);
    }
}
