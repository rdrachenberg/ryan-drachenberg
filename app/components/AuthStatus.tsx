import { getServerSession } from "next-auth";
export default async function AuthStatus() {
    const session = await getServerSession();
    // console.log(session)
    return (
        <div className='absolute top-7 w-full flex justify-center items-center'>
            {session && (
                <p className='text-white text-md'>Signed in as {session.user?.email}</p>
            )}
        </div>
    )
}