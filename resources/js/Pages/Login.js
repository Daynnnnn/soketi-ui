import React, { useState } from 'react'
import Main from '../Components/Layouts/Main';
import { useForm } from '@inertiajs/inertia-react'

function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    })

    const [isShaking, setIsShaking] = React.useState(false);
    const [errorMessages, setErrorMessages] = React.useState(Object.create({}));

    function submit(e) {
        e.preventDefault()
        post('/login', {
            onError: (errors) => {
                setErrorMessages(errors)
                setIsShaking(true)
                setTimeout(() => {
                    setIsShaking(false)
                }, 450)
            }
        })
    }

    return (
        <Main>
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in</h2>
                </div>

                <div className={(isShaking === true ? 'animate-wiggle ' : '') + "mt-8 sm:mx-auto sm:w-full sm:max-w-md space-y-4"}>

                {Object.keys(errorMessages).map((errorMessage) => {
                    return (
                        <div key={"error-" + errorMessage} className="bg-red-50 text-red-400 text-center py-4 px-2 shadow sm:rounded-lg sm:px-10">
                            {errorMessages[errorMessage]}
                        </div>
                    );
                })}

                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={submit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                        </label>
                        <div className="mt-1">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            autoComplete="email"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                        </label>
                        <div className="mt-1">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                            autoComplete="current-password"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                            Remember me
                        </label>
                        </div>

                        <div className="text-sm">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Forgot your password?
                        </a>
                        </div>
                    </div>

                    <div>
                        <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                        Sign in
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </Main>
    );
}

export default Login;
