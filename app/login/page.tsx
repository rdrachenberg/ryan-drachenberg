import Form from "../components/Form";
import { LockKeyholeIcon, UserPlusIcon } from "lucide-react";
import Link from 'next/link';

export default function LoginPage() {
    return (
        <div className='flex h-[92%] w-[92%] items-center justify-center bg-blue-500'>
        <div className='z-10 w-full max-w-md overflow-hidden rounded-2xl border border-blue-500 shadow-xl'>
            <div className='flex flex-col items-center justify-center space-y-3 border-b border-blue-500 bg-white px-4 pb-6 pt-8 text-center sm:px-16'>
                <Link href={'/'}>
                    <LockKeyholeIcon className='h-10 w-10 text-blue-600'/>
                </Link>
                <h3 className='text-xl font-semibold dark:text-black'>Login</h3>
                <p className='text-sm text-gray-500'>Use your email and password to login</p>
            </div>
            <Form type={'login'}/>
        </div>
        </div>
    )
}