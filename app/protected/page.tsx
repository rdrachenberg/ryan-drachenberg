// import SignOut from "@/app/components/SignOut"
// import AuthStatus from "../components/AuthStatus"
import NewBlogPost from "../components/NewBlogPost"
export default function ProtectedPage() {
    return <div className='flex w-full h-50% bg-black rounded-md dark:bg-blue-500' suppressHydrationWarning>
        <div className='w-[700px] h-[500px] flex flex-col space-y-5 justify-center items-center text-orange-300' suppressHydrationWarning>
            {/* <AuthStatus /> */}
            <NewBlogPost  />
            {/* <SignOut /> */}
        </div>
        
    </div>
}