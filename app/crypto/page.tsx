
'use client';

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useWatchContractEvent } from 'wagmi';
import { getChainId } from '@wagmi/core';
import { config } from '@/config';
import { parseEther, Address } from 'viem'
import { abi } from '../../abi/abi';
import { Loader2Icon, CheckCircleIcon, ArrowLeftCircle, CopyIcon, CopyCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';  
import Link from 'next/link';
import { Tooltip } from "@nextui-org/react";
import { Button } from "@nextui-org/button";

export default function CryptoPage() {
    const {address, isConnecting, isDisconnected, isConnected} = useAccount();
    const [loading, isLoading] = useState(true);
    const [valueToSend, setValueToSend] = useState('');
    const [logsState, setLogsState] = useState<any>([])
    const [contract, setContract] = useState('');
    const [chain, setChain] = useState('');
    const [copied, setCopied] = useState(false)
    const isNotNumberBro = isNaN(Number(valueToSend)); 
    let contractAddress = `0x45b54e6AedeE2d73d9F09934C7C4973f6B6Cd41E` as string; // bsctest sepolia testnet deployed
    //const contractAddress = `0x3348791E931c0a9Fc6E40De3242B46ec5272C1b9` as string; // mainnet bsc deployed
    const [explorer, setExplorer] = useState('');
    
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
            setExplorer('https://bscscan.com/tx/');

        } else if(chainGang == '97')  {
            contractAddress = '0x45b54e6AedeE2d73d9F09934C7C4973f6B6Cd41E'
            setContract(contractAddress);
            setChain('bsc-test');
            setExplorer('https://testnet.bscscan.com/tx/');
        
        } else if(chainGang == '1'){
            console.log('Etherum Network detected');
            setChain('eth');
            contractAddress = '0x3348791E931c0a9Fc6E40De3242B46ec5272C1b9';
            setContract(contractAddress);
            setExplorer('https://etherscan.io/tx/');
        
        } else if(chainGang == '11155111'){
            console.log('Sepolia Test Network detected');
            setChain('eth Sepolia')
            contractAddress = '0x45b54e6AedeE2d73d9F09934C7C4973f6B6Cd41E'
            setContract(contractAddress);
            setExplorer('https://sepolia.etherscan.io/tx/');
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

    const handleCopyClick = (textToCopy: string) => {
        setCopied(!copied);
        console.log('Copy clicked! ');
        navigator.clipboard.writeText(textToCopy);
        console.log(textToCopy);
        setTimeout(() => {
            setCopied(false);
            // console.log('we ever getting here>?')
        }, 2000)
    }

    useWatchContractEvent({
            address: contractAddress as Address,
            abi,
            eventName: 'PaymentReceived',
            onLogs(logs) {
                setLogsState(() => JSON.stringify(logs, (_, v) => typeof v === 'bigint' ? v.toString() : v));
                console.log(logsState)
                console.log('Logs have changed \n', logs);
                console.log(logsState[0].transactionHash);
                () => setExplorer(explorer + `${logsState[0].transactionHash}`)
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
        <div className='flex flex-col relative min-h-screen max-h-fit'>
            {loading ? (  
                <div><Loader2Icon className='animate-spin justify-center items-center text-blue-400 dark:text-white w-10 h-10'/></div>
            ) : (
                <div className='relative flex flex-col'>
                    {isConnected ? ( 
                        <div className='border-4 border-blue-500 bg-gradient-to-r from-slate-500 to-slate-800 dark:bg-gray-600 p-5 sm:p-48 min-w-[300px] h-full rounded-xl'>
                            <div className='flex align-end my-3 ml-5 mb-10 justify-end absolute top-1 right-0 md:max-w-2xl max-w-sm sm:px-8 px-8'>
                                <w3m-button />
                            </div>
                            {isPending || isConfirming ? (
                                <div><Loader2Icon className='animate-spin justify-center items-center text-blue-400 dark:text-white w-10 h-10'/></div>
                            ) : (
                                <div className='flex flex-row justify-center items-center mt-10'>
                                    {isConfirmed ? (
                                            <div className='flex flex-col justify-start truncate max-w-[300px] space-y-4'>
                                                <div className='flex flex-row'>
                                                    <div className='text-green-400'>Transaction confirmed.</div>
                                                    <div>
                                                        <CheckCircleIcon className='flex w-6 h-6 flex-shrink-0 text-green-400 ml-2 transition-opacity ease-in-out delay-150 duration-300' />
                                                    </div>    
                                                </div>
                                                {hash && 
                                                    <div className='flex flex-row'>
                                                        <Tooltip content={hash} color='foreground' className='bg-black p-4 rounded-lg'>
                                                            <Button radius='none' className='px-0 py-0 text-white'>Transaction Hash: {hash}...</Button>
                                                        </Tooltip>
                                                        <div className='flex flex-col justify-center align-middle ml-2' onClick={() => handleCopyClick(hash)}>
                                                            {copied ? 
                                                                <Tooltip content={'Copied'}>
                                                                    <CopyCheck className='w-5 h-5 text-green-500'/> 
                                                                </Tooltip>
                                                                : 
                                                                <Tooltip content={'Copy'}>
                                                                    <CopyIcon className='w-5 h-5 text-white'/>
                                                                </Tooltip>
                                                            }
                                                        </div>
                                                    </div>
                                                }
                                                
                                                <div className='space-y-4 rounded-md '>
                                                    {logsState && 
                                                        <div>
                                                            <Link href={explorer+hash} target='_blank'>
                                                                <div className='flex flex-row text-white hover:text-blue-500'>
                                                                Transaction Block Explorer <ArrowLeftCircle className='ml-2 hover:text-blue-500'/>
                                                                </div>
                                                                
                                                            </Link>
                                                            
                                                        </div>
                                                    }   
                                                </div>
                                            </div>
                                        ) : (
                                            <div className='flex flex-col justify-center mt-8 mb-8'>
                                                <div className='flex flex-row p-2'>
                                                    <div className='flex flex-col text-start m-5 text-white  ms-0'>Amount</div>
                                                    <div className='flex flex-col justify-center align-top sm:w-60 max-w-sm w-[50%] dark:text-black'>
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
                                                            <Image src={'/eth.png'} width={30} height={30} alt='Etherum Smart Chain' />
                                                        )}
                                                        
                                                    </div>
                                                </div>
                                                <div className='flex p-2'>
                                                    <button disabled={isPending} onClick={handleSubmit} className='rounded-full p-2 w-full sm:w-[60%] border-2 border-black bg-blue-500 mx-auto text-white shadow-lg'>{isPending ? 'Confirming' : 'Submit' }</button>
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