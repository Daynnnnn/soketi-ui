<?php

namespace App\Stores;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

class DebugEventStore extends Collection
{
    protected $id;

    public function __construct($id, $items = [])
    {
        $this->id = $id;
        $this->items = Cache::rememberForever('debug_events::'.$this->id, fn () => $this->getArrayableItems($items));
    }

    public function reset()
    {
        $this->items = [];

        return $this;
    }

    public function save()
    {
        Cache::put('debug_events::'.$this->id, $this->items);
    }
}
