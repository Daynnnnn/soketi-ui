import AddButton from '@/Components/AddButton';
import AppCard from '@/Components/AppCard';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Apps(props) {
    const [showAddAppModal, setShowAddAppModal] = useState(false);
    const [newAppName, setNewAppName] = useState('');

    const createApp = () => {
        router.post('/apps/create', {
            name: newAppName,
        });

        setNewAppName('');
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={(
                <div className='flex items-center space-x-2'>
                    <AddButton onClick={() => setShowAddAppModal(true)} />
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Apps</h2>
                </div>
            )}
        >
            <Head title="Apps" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-4">
                        {props.apps.map(app => <AppCard key={app.id} app={app} />)}
                    </div>
                </div>
            </div>

            <Modal show={showAddAppModal} onClose={() => setShowAddAppModal(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        What should we call this app?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        This name only gets used on Soketi UI, it won't have any affect on your apps functionality.
                    </p>

                    <div className='mt-2'>
                        <TextInput
                            id="name"
                            name="name"
                            value={newAppName}
                            className="mt-1 block w-full"
                            handleChange={(event) => setNewAppName(event.target.value)}
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={() => setShowAddAppModal(false)}>Cancel</SecondaryButton>

                        <PrimaryButton className="ml-3" onClick={createApp}>
                            Create App
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
