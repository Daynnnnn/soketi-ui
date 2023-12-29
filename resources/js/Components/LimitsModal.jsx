import { useEffect, useState } from "react";
import PrimaryButton from "./PrimaryButton";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import Modal from "./Modal";
import SecondaryButton from "./SecondaryButton";
import TextInput from "./TextInput";
import { useForm } from '@inertiajs/react';

const LimitsModal = ({ app, show, setShow, limitItems }) => {

    const { data, setData, post, processing, errors, reset } = useForm(app);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const handleSubmit = (e) => {
        post('/apps/' + app.id + '/limits', {
            onSuccess: () => setShow(false),
        })
    }

    return (
        <Modal show={show} onClose={() => setShow(false)}>
            <form onSubmit={handleSubmit} className="p-6">
                <h2 className="text-lg font-medium text-gray-900">
                    Limits
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    This will change the limits in place for this app.<br />
                    Settings values to -1 will disable the limits.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-2">
                    {limitItems.map(limit => (
                        <div key={limit.key}>
                            <InputLabel for={limit.key} value={limit.label} />

                            <TextInput
                                id={limit.key}
                                name={limit.key}
                                value={data[limit.key]}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                            />
                        </div>
                    ))}
                </div>


                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={() => setShow(false)}>Cancel</SecondaryButton>

                    <PrimaryButton className="ml-3" processing={processing}>
                        Save
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    )
}

export default LimitsModal;
