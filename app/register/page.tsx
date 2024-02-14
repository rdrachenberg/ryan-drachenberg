import { UserPlusIcon } from "lucide-react";
import Link from "next/link";
import Form from "../components/Form";

export default function RegisterPage() {

    return (
        <div className='flex h-[90%] w-[90%] items-center justify-center bg-blue-500'>
        <div className='z-10 w-full max-w-md overflow-hidden rounded-2xl border border-blue-500 shadow-xl'>
            <div className='flex flex-col items-center justify-center space-y-3 border-b border-blue-500 bg-white px-4 pb-6 pt-8 text-center sm:px-16'>
                <Link href={'/'}>
                    <UserPlusIcon className='h-10 w-10 text-blue-600'/>
                </Link>
                <h3 className='text-xl font-semibold dark:text-black'>Signup</h3>
                <p className='text-sm text-gray-500'>Create an account</p>
            </div>
            <Form type={'register'}/>
        </div>
        </div>
    )
}