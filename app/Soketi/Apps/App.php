<?php

namespace App\Soketi\Apps;

use App\Soketi\Facades\Manager;
use Illuminate\Support\Str;

class App
{
    protected $title;
    protected $appId;
    protected $appKey;
    protected $appSecret;
    protected $enabled;
    protected $debug;
    protected $maxConnections;
    protected $maxBackendEventsPerSecond;
    protected $maxClientEventsPerSecond;
    protected $maxReadRequestsPerSecond;
    protected $maxPresenceMembersPerChannel;
    protected $maxPresenceMemberSize;
    protected $maxChannelNameLength;
    protected $maxSimultaneousEventChannels;
    protected $maxEventNameLength;
    protected $maxEventPayloadSize;
    protected $maxEventBatchSize;
    protected $webhooks;

    public function get($item)
    {
        return $this->{$item} ?? null;
    }

    public function set(string $item, $value): self
    {
        $this->{$item} = $value;

        return $this;
    }

    public function save(): self
    {
        $app = $this;

        $app->webhooks = $this->pushWebhooks();

        Manager::save($app);

        return $this;
    }

    public function toArray(): array
    {
        return [
            'title' => $this->title,
            'appId' => $this->appId,
            'appKey' => $this->appKey,
            'appSecret' => $this->appSecret,
            'enabled' => $this->enabled,
            'debug' => $this->debug,
            'enableClientMessages' => $this->enableClientMessages,
            'maxConnections' => $this->maxConnections,
            'maxBackendEventsPerSecond' => $this->maxBackendEventsPerSecond,
            'maxClientEventsPerSecond' => $this->maxClientEventsPerSecond,
            'maxReadRequestsPerSecond' => $this->maxReadRequestsPerSecond,
            'maxPresenceMembersPerChannel' => $this->maxPresenceMembersPerChannel,
            'maxPresenceMemberSize' => $this->maxPresenceMemberSize,
            'maxChannelNameLength' => $this->maxChannelNameLength,
            'maxSimultaneousEventChannels' => $this->maxSimultaneousEventChannels,
            'maxEventNameLength' =>  $this->maxEventNameLength,
            'maxEventPayloadSize' => $this->maxEventPayloadSize,
            'maxEventBatchSize' => $this->maxEventBatchSize,
            'webhooks' => $this->accessWebhooks(true),
        ];
    }

    public function regenerateCredentials(): self
    {
        $this->appKey = strtolower(Str::random(20));
        $this->appSecret = strtolower(Str::random(20));

        return $this;
    }

    protected function accessWebhooks()
    {
        return array_filter($this->webhooks, fn($webhook) => !($webhook['debug'] ?? false));
    }

    protected function pushWebhooks()
    {
        $webhooks = $this->webhooks;

        if ($this->debug == true) {
            array_push($webhooks, [
                'debug' => true,
                'url' => url('/webhooks'),
                'event_types' => [
                    'client_event',
                    'channel_occupied',
                    'channel_vacated',
                    'member_added',
                    'member_removed',
                ],
                'headers' => [
                    'X-App-Id' => $this->appId,
                ],
            ]);
        }

        return $webhooks;
    }
}
