
'use client';

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, Address } from 'viem'
import { abi } from '../../abi/abi';
import { Loader2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CryptoPage() {
    const {address, isConnecting, isDisconnected, isConnected} = useAccount();
    const [loading, isLoading] = useState(true);
    const [valueToSend, setValueToSend] = useState('');
    const isNotNumberBro = isNaN(Number(valueToSend)); 
    const contractAddress = `0x88b98Be6B577a9236695898F24027f7894c824C7` as string; // bsc testnet deployed

    const { data: hash, writeContract, isPending } = useWriteContract();
    const {isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    })

    function handleSubmit() {
        console.log('Submit clicked');
        let parsedEther = parseEther(valueToSend);
        console.log(valueToSend);
        console.log('parsed -->')
        console.log(parsedEther);
        writeContract({
            address: contractAddress as Address,
            abi,
            functionName: 'deposit',
            value: BigInt(parsedEther),
        })
    };

    const  handleValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        setValueToSend(e.target.value);
    };

    

    useEffect(() => {
        isLoading(true);
        
        setTimeout(() => {
            isLoading(false);
        }, 400)
    }, [])

    return (
        <div className='container xl:max-w-screen-xl min-w-full'>
            {loading ? (  
                <div><Loader2Icon className='animate-spin justify-center items-center text-blue-400 dark:text-white w-10 h-10'/></div>
            ) : (
                <div className=''>
                    {isConnected ? ( 
                        <div className='border-4 border-blue-500 container xl:max-w-screen-xl min-w-full min-h-full bg-gray-600 p-48  rounded-xl'>
                            <div className='flex align-end my-3 mx-6 justify-end absolute top-0 right-0 md:max-w-2xl max-w-lg sm:px-8 px-8'>
                                <w3m-button />
                            </div>
                            {isPending ? (
                                <div><Loader2Icon className='animate-spin justify-center items-center text-blue-400 dark:text-white w-10 h-10'/></div>
                            ) : (
                                <div className='min-w-screen min-h-full'>
                                    {isConfirmed ? (
                                            <div className='flex flex-col mx-auto overflow-hidden'>
                                                {hash && <div>Transaction Hash: {hash}</div>}
                                                {isConfirmed && <div className='text-green-400'>Transaction confirmed.</div>}
                                            </div>
                                        ) : (
                                            <div>
                                                <div className='flex p-2 '>
                                                <div className='flex flex-col text-start m-5 text-white'>How much</div>
                                                <div className='flex flex-col justify-center align-top w-60'>
                                                    <input type='text'
                                                        value={valueToSend}
                                                        onChange={handleValueInput}
                                                    ></input>
                                                </div>
                                                </div>
                                                <div className='flex p-2 '>
                                                    <button disabled={isPending} onClick={handleSubmit} className='rounded-full p-2 w-[60%] border-2 border-black bg-blue-500 mx-auto text-white shadow-lg'>{isPending ? 'Confirming' : 'Submit' }</button>
                                                </div>
                                            </div>
                                        )
                                    }
                                    
                                </div> 
                            )
                            }
                        </div>
                    ) : (
                        <div>
                            <w3m-button />
                        </div>
                    )
                    }
                </div>
            )
            }
            
        </div>
    )
} 