
'use client';

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useWatchContractEvent } from 'wagmi';
import { getChainId } from '@wagmi/core';
import { config } from '@/config';
import { parseEther, Address } from 'viem'
import { abi } from '../../abi/abi';
import { Loader2Icon, CheckCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';  

export default function CryptoPage() {
    const {address, isConnecting, isDisconnected, isConnected} = useAccount();
    const [loading, isLoading] = useState(true);
    const [valueToSend, setValueToSend] = useState('');
    const [logsState, setLogsState] = useState<any>([])
    const [contract, setContract] = useState('');
    const [chain, setChain] = useState('');
    const isNotNumberBro = isNaN(Number(valueToSend)); 
    let contractAddress = `0x45b54e6AedeE2d73d9F09934C7C4973f6B6Cd41E` as string; // bsctest sepolia testnet deployed
    //const contractAddress = `0x3348791E931c0a9Fc6E40De3242B46ec5272C1b9` as string; // mainnet bsc deployed
    
    const { data: hash, writeContract, isPending } = useWriteContract();
    const {isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    })

    const chainId = getChainId(config);
    

    const chainName = async (chainGang: string) => {
        if(chainGang == '56') {
            console.log('Binance Smart Chain detected');
            setChain('bsc');
            contractAddress = '0x3348791E931c0a9Fc6E40De3242B46ec5272C1b9'
            setContract(contractAddress);

        } else if(chainGang == '97')  {
            contractAddress = '0x45b54e6AedeE2d73d9F09934C7C4973f6B6Cd41E'
            setContract(contractAddress);
            setChain('bsc-test')
        
        } else if(chainGang == '1'){
            console.log('Etherum Network detected');
            setChain('eth');
            contractAddress = '0x3348791E931c0a9Fc6E40De3242B46ec5272C1b9';
            setContract(contractAddress);
        
        } else if(chainGang == '11155111'){
            console.log('Sepolia Test Network detected');
            setChain('eth Sepolia')
            contractAddress = '0x45b54e6AedeE2d73d9F09934C7C4973f6B6Cd41E'
            setContract(contractAddress);
        }

        return chain
    }

    async function handleSubmit() {
        console.log('Submit clicked');
        let parsedEther = parseEther(valueToSend);
        console.log(valueToSend);
        console.log('parsed -->')
        console.log(parsedEther);
        await chainName(chainId.toString());

        writeContract({
            address: contract as Address,
            abi,
            functionName: 'deposit',
            value: BigInt(parsedEther),
        });
        
    };

    const  handleValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setValueToSend(e.target.value);
    };

    useWatchContractEvent({
            address: contractAddress as Address,
            abi,
            eventName: 'PaymentReceived',
            onLogs(logs) {
                setLogsState(() => JSON.stringify(logs, (_, v) => typeof v === 'bigint' ? v.toString() : v));
                console.log(logsState)
                console.log('Logs have changed \n', logs);
                toast.success('Transaction successful')
            }
        });
    

    useEffect(() => {
        isLoading(true);
        console.log(chainId);
        chainName(chainId.toString());
        
        
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
                            {isPending || isConfirming ? (
                                <div><Loader2Icon className='animate-spin justify-center items-center text-blue-400 dark:text-white w-10 h-10'/></div>
                            ) : (
                                <div className='flex flex-row min-w-screen min-h-full'>
                                    {isConfirmed ? (
                                            <div className='flex flex-col justify-start truncate overscroll-contain'>
                                                {hash && <div className='grid grid-col-1 min-w-[150%]'>Transaction Hash: {hash}</div>}
                                                <div className='space-y-4 rounded-md '>
                                                    
                                                    {isConfirmed && 
                                                    <div>
                                                        <div className='grid grid-cols-2 gap-1'>
                                                            <div className='text-green-400'>Transaction confirmed.</div>
                                                            <div>
                                                                <CheckCircleIcon className='flex w-6 h-6 flex-shrink-0 text-green-400 ' />
                                                            </div>    
                                                        </div>
                                                        <div className='flex flex-col'>
                                                            
                                                        </div>
                                                        </div>
                                                    }
                                                    {/* {logsState && 
                                                        <div>
                                                            <div>{JSON.parse(logsState)[0].logIndex}</div>
                                                            <div>{JSON.parse(logsState)[0].transactionHash}</div>
                                                        </div>
                                                    } */}
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className='flex flex-row p-2 '>
                                                    <div className='flex flex-col text-start m-5 text-white'>Amount</div>
                                                    <div className='flex flex-col justify-center align-top w-60'>
                                                        <input type='text'
                                                            value={valueToSend}
                                                            onChange={handleValueInput}
                                                            className=' p-1'
                                                        >
                                                        </input>
                                                        
                                                    </div>
                                                    <div className='flex flex-col w-5 h-5 border border-black rounded justify-center align-middle mx-auto my-auto ml-2'>
                                                        {chain == 'bsc' || chain == 'bsc-test' ? (
                                                            <Image src={'/bsc-nobg.png'} width={20} height={20} alt='Binance Smart Chain' />
                                                        ) : (
                                                            <Image src={'/eth.png'} width={30} height={30} alt='Binance Smart Chain' />
                                                        )}
                                                        
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