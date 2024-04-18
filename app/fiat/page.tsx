'use client'

import CheckoutForm from "../components/CheckoutForm";
import { useState } from "react";
export default function FiatPage() {
  const [ testToggle, setTestToggle ] = useState(true);

  const handleTestToggle = () => {
    setTestToggle(testToggle ? false : true);
    console.log('That test button was clicked')
  }

    return (
        <div className='flex items-center flex-col'>  
            <div className='flex flex-row justify-between'>
                <div className='flex flex-col w-20'></div>
                <div className='flex flex-col w-20'></div>
               
            </div>

            <div className='flex flex-row'>
                <CheckoutForm uiMode="hosted" testtoggle={testToggle}/>
                <button className={`flex flex-col max-h-5 ml-10
                rounded-full p-2 text-[10px] justify-center my-auto justify-items-center align-middle items-end border-2  dark:text-white stroke-2
                ${testToggle ? 'dark:text-green-100 dark:border-green-700 bg-gradient-to-r from-green-400 to-green-900' : 'text-blue-500 dark:text-blue-400 dark:border-blue-400'}
                `}
                onClick={() => handleTestToggle()}
                >
                   {testToggle ? 'test mode' : 'live mode'}
                </button>
            </div>
             
        </div>
    )
} 