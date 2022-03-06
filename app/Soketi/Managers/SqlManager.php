<?php

namespace App\Soketi\Managers;

use App\Soketi\Apps\App;
use App\Soketi\Contracts\ManagerContract;
use App\Soketi\Models\SqlApp;
use Illuminate\Support\Collection;

class SqlManager implements ManagerContract
{
    public function all(): Collection
    {
        return SqlApp::get()->map(fn($app) => App::makeFromModel($app));
    }

    public function find($id): App
    {
        return App::makeFromModel(SqlApp::find($id));
    }

    public function save($app): void
    {
        $this->appToModel($app)->save();
    }

    public function delete($app): void
    {
        $this->appToModel($app)->delete();
    }

    protected function appToModel(App $app): SqlApp
    {
        $model = SqlApp::find($app->get('appId')) ?? new SqlApp;
        // $model->title = $app->get('title');
        $model->id = $app->get('appId');
        $model->key = $app->get('appKey');
        $model->secret = $app->get('appSecret');
        $model->max_connections = $app->get('maxConnections');
        $model->enable_client_messages = $app->get('enableClientMessages');
        $model->enabled = $app->get('enabled');
        $model->max_backend_events_per_sec = $app->get('maxBackendEventsPerSecond');
        $model->max_client_events_per_sec = $app->get('maxClientEventsPerSecond');
        $model->max_read_req_per_sec = $app->get('maxReadRequestsPerSecond');
        $model->max_presence_members_per_channel = $app->get('maxPresenceMembersPerChannel');
        $model->max_presence_member_size_in_kb = $app->get('maxPresenceMemberSize');
        $model->max_channel_name_length = $app->get('maxChannelNameLength');
        $model->max_event_channels_at_once = $app->get('maxSimultaneousEventChannels');
        $model->max_event_name_length = $app->get('maxEventNameLength');
        $model->max_event_payload_in_kb = $app->get('maxEventPayloadSize');
        $model->max_event_batch_size = $app->get('maxEventBatchSize');
        $model->webhooks = json_encode($app->get('webhooks'));

        return $model;
    }
}