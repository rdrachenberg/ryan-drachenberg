
// @ts-nocheck
import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useWatchContractEvent } from 'wagmi';
import { parseEther, Address } from 'viem'
import { readContract } from '@wagmi/core';
import { abi } from '../../abi/abi';
import { config } from '@/config';
import toast from 'react-hot-toast';  

interface Contract {
    contract: string,
}
export default function Withdrawal(contract: Contract): JSX.Element {
    const [isOwner, setIsOwner] = useState(false);
    const [contractOwner, setContractOwner] = useState('');
    const { address } = useAccount();
    const { data: hash, writeContract, isPending } = useWriteContract();
    const [receiptHash, setReceiptHash] = useState('');
    // console.log('This here account');
    // console.log(address)

    const contractAddress = contract.contract;

    async function handleWithdrawal() {
        console.log('Withdrawal clicked');
        // console.log(valueToSend); // console.log('parsed -->')
        // chainName(chainId.toString());

        writeContract({
            address: contractAddress as Address,
            abi,
            functionName: 'withdraw',
        });
    };
    
    useWatchContractEvent({
        address: contractAddress as Address,
        abi,
        eventName: 'Withdraw',
        onLogs(logs) {
            // setLogsState(() => JSON.stringify(logs, (_, v) => typeof v === 'bigint' ? v.toString() : v));
            // console.log(logsState)
            
            console.log('Logs have changed \n', logs);
            console.log(logsState[0].transactionHash);
            setReceiptHash(logsState[0].transactionHash);
            // () => setExplorer(explorer + `${logsState[0].transactionHash}`)
            () => toast.success('Withdrawl successful');
        }
    });

    useEffect(() => {
        const getOwnerAddressFromContract = async () => {
            const result = await readContract(config, {
                abi, 
                address: contractAddress,
                functionName: 'owner',
            })
            // console.log(result);
            if(result){
                setContractOwner(result)
            }
            
            if(result == address){
                setIsOwner(true);
            } else {
                setIsOwner(false);
            }
            return result
        }
       getOwnerAddressFromContract();
        // setContractOwner(`${owner}`);
        console.log(`contractOwner var: ${contractOwner}`);
        console.log(`address var: ${address}`);

        if(hash){
            toast.success('Withdrawl successful!', 4000)
        }
        
    }, [contractAddress, address, contractOwner, hash])

    return (
        <div>
            {isOwner ? (
                <div>
                    <div className='flex p-2'>
                        <button disabled={isPending} onClick={handleWithdrawal} className='rounded-full p-2 w-full sm:w-[90%] border-2 border-yellow-100 hover:border-3 hover:border-green-400 bg-yellow-500 mx-auto text-white hover:text-black shadow-lg'>Withdrawal</button>
                    </div> 
                    <div className='flex flex-row'>
                    {hash && <div className='truncate max-w-[70%] mx-auto'>{hash}</div>}
                    </div>
                </div>
            ) : ( 
                <>
                </>
            )}
        
            
        </div>
    )
}

// ** TODO: need to read owner of contract DONE 
// ** TODO: need to implement withdraw function DONE
