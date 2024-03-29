'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { RotateCwIcon } from "lucide-react";
import formatDateForMDFile from "@/lib/formatDateForMDFile";
import blogPost from "@/lib/blogPost";
import blogPostToDB from "@/lib/blogPostToDB";



export default function NewBlogPost() {
    const [isLoading, setisLoading] = useState(false);

    const router = useRouter()

    const authorId = 'clsl6nl9l00009y1z7b7gyriv';

   

    function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        setisLoading(true);
        // console.log('handleSubmit kickin')
        let date = new Date();
        date.toISOString().split('T')[0];

        console.log(date);
        
        
        const payload = {
            authorId: authorId,
            title: event.currentTarget.title.value,
            description: event.currentTarget.description.value,
            date: new Date(formatDateForMDFile(date.toString())),
            code: event.currentTarget.code.value,
        }

        if(process.env.NODE_ENV === 'development') {
            // need to swap these function calls in actual production to blogPost(payload here)
            // console.log('we are in dev here')
            // blogPostToDB(payload); // TESTING THIS FUNCTION. Needs to move to else statement 
            blogPost(payload); // UNCOMMENT THIS FUNCTION FOR PRODUCTION
            
        } else {
            blogPostToDB(payload);
        }
        // console.log(payload);
        toast.success('Article submitted successfuly');
        
        setisLoading(false);
        router.push('/');
    }
    return (
        <form onSubmit={handleSubmit} className='flex w-[90%] flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16 border-blue-500 dark:border-black rounded-md border-2' >
            <div>
                <label htmlFor='title' className='block text-xs text-gray-700 uppercase'>
                    Title
                </label>
                <input 
                id='title'
                name='title'
                type='text'
                required
                placeholder='Your Title'
                autoComplete='off'
                className='text-black mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-black sm:text-sm'
                />
            </div>
            <div>
                <label htmlFor='description' className='block text-xs text-gray-700 uppercase'>
                    Description
                </label>
                <textarea 
                id='description'
                name='description'
                required
                placeholder="Your Description"
                autoComplete='off'
                className='text-black mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-black sm:text-sm'
                />
            </div> 
            <div>
                <label htmlFor='code' className='block text-xs text-gray-700 uppercase'>
                    Blog Content
                </label>
                <textarea 
                id='code'
                name='code'
                required
                placeholder="Blog post content here"
                autoComplete='off'
                className='text-black mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-black sm:text-sm'
                />
            </div>
            <button className={`${ isLoading ? 'cursor-not-allowed bg-blue-800/50' 
            : 
            'bg-black '} flex h-10 w-full items-center justify-center rounded-md border text-sm transition-colors focus:outline-none text-white bg-black shadow-sm border-white hover:bg-blue-600`}
            disabled={isLoading}
            >
                {isLoading ? (
                    <RotateCwIcon className='animate-spin justify-center items-center '/> 
                ) : (
                    <span>Submit</span>
                )
                }
            </button>
        </form>
    )
}