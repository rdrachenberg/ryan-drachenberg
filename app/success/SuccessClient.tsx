'use client'

import { useSearchParams } from 'next/navigation'
import { CheckCircleIcon } from '@heroicons/react/24/solid';


export default function SuccessClient() {
  const search = useSearchParams()
  const sessionId = search.get('session_id') // keep whatever you were using

  const router = useSearchParams();

    const amount = router.get('amount');
    
    const error = sessionId? false : true;
    const data = 'STRING DATA'

  // ⬇️ Keep/restore your previous JSX here if you had a custom success UI.
  // This minimal return just unblocks builds.
  return (
   <div className='container xl:max-w-screen-xl mx-auto py-12 px-6 text-center'>
            {error ? ( 
                <div className='p-2 rounded-md bg-rose-100 text-rose-500 max-w-md mx-auto'>
                    <p className='text-lg'>Sorry, there something didnt go right. Lets try again</p>
                </div>
            ) : !data ? (
                <div className='p-2 rounded-md text-gray-500 max-w-md mx-auto'>
                    <p className='text-lg'>Loading ... </p>
                </div>
            ) : ( 
                <div className='py-4 px-8 space-y-4 rounded-md max-w-lg mx-auto'>
                    <CheckCircleIcon className='w-24 h-24 mx-auto flex-shrink-0 text-lime-500' />
                    <h2 className='text-4xl font-semibold flex flex-col items-center space-x-1'>
                        Thank you for your Donation of ${amount}! 
                    </h2>
                </div>
            )}
        </div>
  )
}
