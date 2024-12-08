'use client'
import AuthLayout from '@/components/Layouts/auth.layout'
import SelectGroupOne from '@/components/SelectGroup/SelectGroupOne'
import enumToOptions from '@/utils/enum-to-object'
import Request from '@/utils/request'
import Link from 'next/link'
import React, { useState } from 'react'

type FormData = {
    username: string
    email: string
    phone: string
    gender: string
    password: string
    passwordConfirm?: string
}

enum GenderSelects {
    male = 'Male',
    female = 'Female',
    unknown = 'Not Prefer to Say'
}

const Register = () => {
    const [registerSuccess, setRegisterSuccess] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [responseMessage, setResponseMessage] = useState('')
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        phone: '',
        gender: '',
        password: '',
        passwordConfirm: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            if (formData.password != formData.passwordConfirm) throw new Error('Password and password confirm are not equal.')

            const { passwordConfirm, ...restOfFormData } = formData

            const response = await Request.post({ body: restOfFormData, endpoint: '/auth/register', useToken: false })

            setResponseMessage(response.message)
            setRegisterSuccess(true)
        } catch (error) {
            if (error instanceof Error) setResponseMessage(error.message)
            else console.log('ERRRRRIIROR', error)
        } finally {
            setShowPopup(true)
            setTimeout(() => {
                setShowPopup(false)
            }, 2000)
        }
    }
    return (
        <AuthLayout
            popupAttrs={{
                textColor: registerSuccess ? 'text-green-600' : 'text-red-600',
                message: responseMessage,
                isVisible: showPopup
            }}
        >
            <div className="flex bg-white rounded-lg shadow-lg dark:bg-boxdark overflow-hidden w-242.5">
                <div
                    className="hidden lg:block lg:w-1/2 bg-cover"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')"
                    }}
                ></div>
                <div className="w-full p-8 lg:w-1/2">
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-white text-center">Brand</h2>
                    <p className="text-xl text-gray-600 dark:text-white text-center">Welcome back!</p>
                    <a href="#" className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md">
                        <div className="px-4 py-3">
                            <svg className="h-6 w-6" viewBox="0 0 40 40">
                                <path
                                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                    fill="#FFC107"
                                />
                                <path
                                    d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                                    fill="#FF3D00"
                                />
                                <path
                                    d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                                    fill="#4CAF50"
                                />
                                <path
                                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                    fill="#1976D2"
                                />
                            </svg>
                        </div>
                        <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 dark:text-white font-bold">
                            Register with Google
                        </h1>
                    </a>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b w-1/5 lg:w-1/4"></span>
                        <a href="#" className="text-xs text-center text-gray-500 dark:text-white uppercase">
                            or register with email
                        </a>
                        <span className="border-b w-1/5 lg:w-1/4"></span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Username</label>
                            <input
                                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                type="text"
                                name="username"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Email</label>
                            <input
                                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                type="email"
                                name="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Phone</label>
                            <input
                                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                type="text"
                                name="phone"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Gender</label>
                            <SelectGroupOne
                                message="Select your gender"
                                name="gender"
                                selectOptions={enumToOptions(GenderSelects)}
                                handleChange={handleChange}
                            ></SelectGroupOne>
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Password</label>
                            <input
                                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                type="password"
                                name="password"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Confirm Password</label>
                            <input
                                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                type="password"
                                name="passwordConfirm"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mt-8">
                            <button
                                type="submit"
                                className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b w-1/5 md:w-1/4"></span>
                        <Link href="/auth/login" className="text-xs text-gray-500 dark:text-white uppercase">
                            or login
                        </Link>
                        <span className="border-b w-1/5 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}

export default Register
