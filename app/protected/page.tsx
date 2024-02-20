// import SignOut from "@/app/components/SignOut"
import AuthStatus from "../components/AuthStatus"
import NewBlogPost from "../components/NewBlogPost"
export default function ProtectedPage() {
    return <div className='flex h-full pb-20 bg-black rounded-md dark:bg-blue-500'>
        <div className='w-[800px] h-[500px] flex flex-col space-y-5 justify-center items-center text-orange-300'>
            <AuthStatus />
            <NewBlogPost  />
            {/* <SignOut /> */}
        </div>
        
    </div>
}