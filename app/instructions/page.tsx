'use client'
import Image from "next/image"
import toast from "react-hot-toast";
import useOnScreen from '../api/utils/useOnScreen';
import { useEffect, useRef, useState } from 'react';
import Link from "next/link";


export default function Instructions() {

    const [show, setShow] = useState(false);

    const endTrigger = useRef(null);
    const middleTrigger = useRef(null);

    const visible = useOnScreen(endTrigger, '-100px')
    const visibleMiddle = useOnScreen(middleTrigger, '-50px');

    const trigger = () => {
        toast.success('🥳🥳🥳 Congrats! If you have finished these onboarding instructions and should have a new crypto wallet.',{duration: 5000});
    }

    const triggerMiddle = () => {
        console.log('Middle trigger hit');
        setShow(true);
    }

    useEffect(() => {
        if(visible){
            trigger();
        }
    },[visible])
    
    useEffect(() => {
        if(visibleMiddle){
            triggerMiddle();
        }
    },[visibleMiddle])
    

    return (
        <div>
            <div className='text-xl text-white border-2 dark:border-black bg-gradient-to-r from-blue-500 to-black rounded p-2'>Instructions</div>
            <div className='text-lg mb-4 mt-4 darK:bg-gradient-to-l from-blue-400 to-black animate-in slide-in-from-left delay-100 duration-1000'>First click on the connect button</div>
            <div className='text-md mb-4 mt-4 darK:bg-gradient-to-r from-blue-400 to-black animate-in slide-in-from-left delay-100 duration-1000'>This starts the process of logging in or seting up a new wallet.</div>
            <Link href={'/crypto'}>
                <Image src='/explainer.png' alt='where to connect' width={500} height={200} className='animate-in slide-in-from-right delay-100 duration-1000 border-3 border-gradient-to-l from-blue-400 to-black'/>
            </Link>
            <div className='text-lg mb-4 mt-8 border-3 dark:bg-gradient-to-l from-blue-400 to-black animate-in ease-in slide-in-from-bottom delay-100 duration-1000'>Are you a new user or exsisting user?</div>
            <div className='mb-4 mt-4 dark:bg-gradient-to-r from-gray-700 to-black rounded p-2 animate-in ease-in slide-in-from-bottom delay-100 duration-1000'>
                <div className='text-sm animate-in ease-in slide-in-from-left delay-100 duration-1000'>If you are a new user or email user, enter your email on the top line.</div>
                <div className='text-sm animate-in ease-in slide-in-from-left delay-100 duration-1000'>If you already have a wallet, you can connect with your wallet provider below</div>
            </div>
            <Image src='/explainer-two.png' alt='modal login view' width={500} height={200} className='animate-in ease-in slide-in-from-right delay-10000 duration-1000'/>
            <div className='text-lg mb-4 mt-8 animate-in ease-in slide-in-from-right delay-100000 duration-1000' ref={middleTrigger}>Then you will receive an email from Wallet Connect with a Login code</div>
            <Image src='/explainer-three.png' alt='confirmation email' width={500} height={200} className='animate-in ease-in slide-in-from-bottom delay-1000'/>
            <div className='text-lg mb-4 mt-8'>Enter this code in the App</div>
            <Image src='/explainer-five.png' alt='enter code view' width={500} height={200}/>
            <div className='text-lg mb-4 mt-8'>Click on your wallet address</div>
            <Image src='/explainer-logged-in.png' alt='enter code view' width={500} height={200}/>
            <div className='text-lg mb-4 mt-8 flex flex-col-2 mx-auto'>This will pop up your wallet modal</div>
            <Image src='/explainer-modal.png' alt='logged in modal view' width={300} height={200}/>
            <div className='text-lg mb-4 mt-8'>Congratulations 🥳</div>
            <div ref={endTrigger} className='text-lg mb-28 mt-8'>You now have a crypto wallet that works on multiple networks. Including- Ethereum network, sepolia testnet, Binance Smart Chain, Binance testnet</div>
        </div>
    )
}