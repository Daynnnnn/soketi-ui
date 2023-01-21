import AppCard from '@/Components/AppCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Apps(props) {
    const apps = [
        {
            name: 'Soup QA',
            id: '83245',
            key: 'fnds87fhdsf789dsu',
            secret: 'fdhsf8ds9hf7ds887',
            max_connections: 500,
            enable_client_messages: true,
            enabled: false,
            max_backend_events_per_sec: 100,
            max_client_events_per_sec: 100,
            max_read_req_events_per_sec: 100,
            max_presence_members_per_channel: 50,
            max_presence_member_size_in_kb: 100,
            max_channel_name_length: 50,
            max_event_channels_at_once: 5,
            max_event_name_length: 50,
            max_event_payload_in_kb: 500,
            max_event_batch_size: 100,
            enable_user_authentication: false,
            webhooks: [],
        },
        {
            name: 'Soup Production',
            enabled: true,
            id: '78943',
            key: 'sanVFd67fg8dsui',
            secret: 'df872hfu93hfdo',
            enable_client_messages: true,
            max_connections: null,
            max_backend_events_per_sec: null,
            max_client_events_per_sec: null,
            max_read_req_events_per_sec: null,
            max_presence_members_per_channel: null,
            max_presence_member_size_in_kb: null,
            max_channel_name_length: null,
            max_event_channels_at_once: null,
            max_event_name_length: null,
            max_event_payload_in_kb: null,
            max_event_batch_size: null,
            enable_user_authentication: false,
            webhooks: [
                {
                    url: 'https://webhook.site/hf98f84hf8934j',
                    event_types: [
                        "client_event",
                        "member_added",
                        "member_removed",
                    ],
                    filter: {
                        channel_name_starts_with: "beta-",
                        channel_name_ends_with: "-app",
                    },
                },
                {
                    lambda_function: 'arn:aws:lambda:us-east-2:123456789012:function:my-function:1',
                    event_types: [
                        "client_event",
                        "member_added",
                        "member_removed",
                    ],
                    filter: {
                        channel_name_starts_with: "beta-",
                        channel_name_ends_with: "-app",
                    },
                },
            ],
        },
    ]

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Apps</h2>}
        >
            <Head title="Apps" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-4">
                        {apps.map(app => <AppCard key={app.id} app={app} />)}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
