'use client';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useWatchContractEvent } from 'wagmi';
import { getChainId } from '@wagmi/core';
import { config } from '@/config';
import { parseEther, Address } from 'viem'
import { abi } from '../../abi/abi';
import { Loader2Icon, CheckCircleIcon, ArrowLeftCircle, CopyIcon, CopyCheck, FileTextIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';  
import Link from 'next/link';
import { Tooltip } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import Withdrawal  from '../components/Withdrawal';
import ContractBalance  from '../components/ContractBalance';
import ConnectButton from '@/components/ConnectButton';
import ContractDeploymentSpecs from '../components/ContractDeploymentSpecs';


export default function CryptoPage() {
    const {address, isConnecting, isDisconnected, isConnected} = useAccount();
    const [loading, isLoading] = useState(true);
    const [valueToSend, setValueToSend] = useState<any>('');
    const [logsState, setLogsState] = useState<any>([])
    const [contract, setContract] = useState<string>('');
    const [chain, setChain] = useState<any>('');
    const [copied, setCopied] = useState(false)
    const isNotNumberBro = isNaN(Number(valueToSend)); 
    let contractAddress = `0x3348791E931c0a9Fc6E40De3242B46ec5272C1b9` as string; // bsctest sepolia testnet deployed
    //const contractAddress = `0x3348791E931c0a9Fc6E40De3242B46ec5272C1b9` as string; // mainnet bsc deployed
    const [explorer, setExplorer] = useState('');
    
    const { data: hash, writeContract, isPending } = useWriteContract();
    const {isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });
    const chainId = getChainId(config);
    
    const chainName = (chainGang: string) => {
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
        // console.log(valueToSend);
        // console.log('parsed -->')
        // console.log(parsedEther);
        chainName(chainId.toString());

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

    const handleEmail = async () => {
        const body = {
            to: 'ryandrachenberg@gmail.com',
            from: 'tssinvestments@gmail.com',
            subject: 'You received a donation',
            text: `You received a donation! \nHere is a link to the transaction: ${explorer}${hash}`,
            html: `<h1>You received a donation!</h1><h2>${explorer}${hash}</h2>`,
        };

        let res = await fetch('/api/email/', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(body),
            
        })
        let data = await res.json();
        console.log(data);

        return JSON.stringify(data);
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
        hash ? handleEmail() : null;

        setTimeout(() => {
            isLoading(false);
        }, 400)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chain, chainId, hash])
    
    return (
        <div className='flex flex-col relative min-h-screen max-h-fit'>
            {loading ? (  
                <div><Loader2Icon className='animate-spin justify-center items-center text-blue-400 dark:text-white w-10 h-10'/></div>
            ) : (
                <div className='relative flex flex-col'>
                    {isConnected && !isDisconnected ? ( 
                        <div className='border-4 border-blue-500 bg-gradient-to-r from-slate-500 to-slate-800 dark:bg-gray-600 p-5 sm:p-48 min-w-[300px] h-full sm:h-[500px] rounded-xl'>
                            <div className='flex align-end my-3 ml-5 mb-10 justify-end absolute top-1 right-0 md:max-w-2xl max-w-sm sm:px-8 px-8'>
                                <ConnectButton />
                            </div>
                            {isPending || isConfirming ? (
                                <div><Loader2Icon className='animate-spin justify-center items-center text-blue-400 dark:text-white w-10 h-10'/></div>
                            ) : (
                                <div className='flex flex-row justify-center items-center mt-1'>
                                    {isConfirmed ? (
                                            <div className='clear flex flex-col justify-start max-w-[300px] sm:max-w-[500px] space-y-4 mt-9 sm:mt-1'>
                                                <div className='flex flex-row'>
                                                    <div className='text-green-400'>Transaction confirmed.</div>
                                                    <div>
                                                        <CheckCircleIcon className='flex w-6 h-6 flex-shrink-0 text-green-400 ml-2 transition-opacity ease-in-out delay-150 duration-300' />
                                                    </div>    
                                                </div>
                                                {hash && 
                                                    <div className='flex flex-row'>
                                                        <Tooltip content={hash} color='foreground' className='bg-black p-4 rounded-lg'>
                                                            <Button radius='none' className='px-0 py-0 text-white truncate'>Transaction Hash: {hash}...</Button>
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
                                            <div className='flex flex-col justify-center mt-8 mb-8 sm:mt-0 sm:mb-0 my-auto'>
                                                <div className='flex flex-row justify-end align-middle justify-items-end text-right mr-3'>
                                                    <ContractBalance contract={contract}/>
                                                </div>
                                                <div className='flex flex-row p-2 sm:mb-8 mx-auto'>
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
                                                    <button disabled={isPending} onClick={handleSubmit} className='rounded-full p-2 w-full sm:w-[90%] border-2 border-white hover:border-blue-500 bg-blue-500 hover:bg-blue-600 mx-auto text-white shadow-lg'>{isPending ? 'Confirming' : 'Submit' }</button>
                                                </div>
                                                <div>
                                                    <Withdrawal contract={contract} />
                                                    
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
                            <div className='container'>
                                <Link href={'/instructions'}>
                                    <div className='flex flex-col-2 -mt-8 sm:-mt-16 hover:underline hover:text-blue-400 mx-auto align-middle justify-center'>
                                        <h2 className='hover:text-blue-600 text-xs'>Help</h2>
                                        <QuestionMarkCircleIcon className='w-4 h-4 ml-1 justify-center align-bottom '/>
                                    </div>
                                </Link>
                                <Link href={'/contracts'}>
                                    <div className='flex flex-col-2 mb-16 mt-4  hover:underline hover:text-blue-400 mx-auto align-middle justify-center'>
                                        <h2 className='hover:text-blue-600 text-xs'>Contracts</h2>
                                        <FileTextIcon className='w-4 h-4 ml-1 justify-center align-bottom '/>
                                    </div>
                                </Link>
                                <ConnectButton />
                            </div>
                            
                        </div>
                    )
                    }
                </div>
            )
            }
            
        </div>
    )
} 