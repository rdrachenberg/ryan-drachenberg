import { useState, useEffect } from 'react';
import { Address, formatEther } from 'viem';
import { useBalance } from 'wagmi';

interface Contract {
    contract: string,
}

export default function ContractBalance (contract: Contract): JSX.Element {
    const [balanceState, setBalanceState] = useState('');
    let castAddress = `${contract.contract}` as Address
    const result = useBalance({
            address: castAddress,
    });
//    console.log(result.data?.value.toString());

   useEffect(() => {
        if(result.data){
            setBalanceState(formatEther(result.data?.value))
        }

   }, [result])

    return (
        <div className='flex flex-col-2 text-lg text-white'>
            Contract Balance: {balanceState && <div className='ml-5 text-green-400 '>{balanceState}</div>}
        </div>
    )
}