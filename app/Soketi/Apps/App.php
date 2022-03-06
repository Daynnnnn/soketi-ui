<?php

namespace App\Soketi\Apps;

use App\Soketi\Facades\Manager;
use Illuminate\Support\Str;

class App
{
    // protected $title;
    protected $appId;
    protected $appKey;
    protected $appSecret;
    protected $enabled;
    protected $maxConnections;
    protected $maxBackendEventsPerSecond;
    protected $maxClientEventsPerSecond;
    protected $maxReadRequestsPerSecond;
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
        Manager::save($this);

        return $this;
    }

    public static function makeFromModel($model): self
    {
        return (new self)
            // ->set('title', $model->title)
            ->set('appId', $model->id)
            ->set('appKey', $model->key)
            ->set('appSecret', $model->secret)
            ->set('enabled', $model->enabled)
            ->set('maxConnections', $model->max_connections)
            ->set('enableClientMessages', $model->enable_client_messages)
            ->set('maxBackendEventsPerSecond', $model->max_backend_events_per_sec)
            ->set('maxClientEventsPerSecond', $model->max_client_events_per_sec)
            ->set('maxReadRequestsPerSecond', $model->max_read_req_per_sec)
            ->set('maxPresenceMembersPerChannel', $model->max_presence_members_per_channel)
            ->set('maxPresenceMemberSize', $model->max_presence_member_size_in_kb)
            ->set('maxChannelNameLength', $model->max_channel_name_length)
            ->set('maxSimultaneousEventChannels', $model->max_event_channels_at_once)
            ->set('maxEventNameLength', $model->max_event_name_length)
            ->set('maxEventPayloadSize', $model->max_event_payload_in_kb)
            ->set('maxEventBatchSize', $model->max_event_batch_size)
            ->set('webhooks', json_decode($model->webhooks));
    }

    public function toArray(): array
    {
        return [
            // 'title' => $this->title,
            'appId' => $this->appId,
            'appKey' => $this->appKey,
            'appSecret' => $this->appSecret,
            'enabled' => $this->enabled,
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
            'webhooks' => $this->webhooks,
        ];
    }

    public function regenerateCredentials(): self
    {
        $this->appKey = strtolower(Str::random(20));
        $this->appSecret = strtolower(Str::random(20));

        return $this;
    }
}
