'use client'
import { RotateCwIcon } from "lucide-react";
import {  signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


type Props = {
    type: 'register' | 'login'
}

export default function Form({ type }: Props) {
    const [isLoading, setisLoading] = useState(false);

    const router = useRouter()

    function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        setisLoading(true);

        if(type === 'login') {
            signIn('credentials', {
                email: event.currentTarget.email.value,
                password: event.currentTarget.password.value,
                redirect: false,
                // @ts-ignore
            }).then(({error}) => {
                if(error) {
                    setisLoading(false);
                    toast.error(error);
                } else {
                    router.refresh();
                    router.push('/protected');
                }
            })
        } else {
            fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: event.currentTarget.email.value,
                    password: event.currentTarget.password.value
                })
            }).then(async (res) => {
                if(res.status === 200) {
                    toast.success('Account created 🥳')
                    setTimeout(() => {
                        router.push('/login')
                    }, 2000)
                    setisLoading(false)
                
                } else {
                    const {error} = await res.json();
                    toast.error(error);
                }
            })
        }
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16'>
            <div>
                <label htmlFor='email' className='block text-xs text-gray-700 uppercase'>
                    Email Address
                </label>
                <input 
                id='email'
                name='email'
                type='email'
                required
                placeholder='youremail@here.com'
                autoComplete='email'
                className='text-black mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm'
                />
            </div>
            <div>
                <label htmlFor='password' className='block text-xs text-gray-700 uppercase'>
                    Password
                </label>
                <input 
                id='password'
                name='password'
                type='password'
                required
                placeholder="********"
                autoComplete='current-password'
                className='text-black mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm'
                />
            </div>
            <button className={`${ isLoading ? 'cursor-not-allowed bg-gray-800/50' 
            : 
            'bg-black '} flex h-10 w-full items-center justify-center rounded-md border text-sm transition-colors focus:outline-none text-white bg-black shadow-sm border-white hover:bg-blue-600`}
            disabled={isLoading}
            >
                {isLoading ? (
                    <RotateCwIcon className='animate-spin justify-center items-center '/> 
                ) : (
                    <span>{type === 'login' ? 'Login' : 'Signup'}</span>)
                }
            </button>
            
            {type === 'login' ? (
                <p className='text-center text-sm text-gray-600'>
                    Don&apos;t have an account? {' '}
                    <Link href={'/register'} className='font-semibold text-gray-800'>
                        Register {' '}
                    </Link>
                    for free
                </p>
            ) : (
                <p className='text-center text-sm text-gray-600'>
                    Already have an account? {' '}
                    <Link href={'/login'} className='font-semibold text-gray-800'>
                        Login instead
                    </Link>
                </p>
            )}
        </form>
    )
}