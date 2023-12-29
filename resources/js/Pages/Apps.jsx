import AppCard from '@/Components/AppCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Apps(props) {
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
                        {props.apps.map(app => <AppCard key={app.id} app={app} />)}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
