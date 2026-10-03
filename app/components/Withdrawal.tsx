import { useEffect, useState } from 'react';
import { useAccount, useWriteContract, useWatchContractEvent } from 'wagmi';
import { Address } from 'viem';
import { readContract } from '@wagmi/core';
import { abi } from '../../abi/abi';
import { config } from '@/config';
import toast from 'react-hot-toast';
import { Loader2Icon, WalletIcon } from 'lucide-react';

interface Props {
    contract: string;
}

// Only rendered for the contract owner: lets me sweep the tip jar to my wallet.
export default function Withdrawal({ contract }: Props) {
    const [isOwner, setIsOwner] = useState(false);
    const { address } = useAccount();
    const { data: hash, writeContract, isPending } = useWriteContract();

    function handleWithdrawal() {
        writeContract({
            address: contract as Address,
            abi,
            functionName: 'withdraw',
        });
    }

    useWatchContractEvent({
        address: contract as Address,
        abi,
        eventName: 'Withdraw',
        enabled: isOwner,
        onLogs(logs) {
            if (logs.length) toast.success('Withdrawal confirmed');
        },
    });

    useEffect(() => {
        if (!contract || !address) {
            setIsOwner(false);
            return;
        }
        let cancelled = false;
        readContract(config, { abi, address: contract as Address, functionName: 'owner' })
            .then(owner => {
                if (!cancelled) setIsOwner(String(owner).toLowerCase() === address.toLowerCase());
            })
            .catch(() => !cancelled && setIsOwner(false));
        return () => { cancelled = true; };
    }, [contract, address]);

    useEffect(() => {
        if (hash) toast.success('Withdrawal submitted', { duration: 4000 });
    }, [hash]);

    if (!isOwner) return null;

    return (
        <div className='mt-8 border-t border-zinc-200 pt-6 dark:border-white/10'>
            <p className='text-xs font-semibold uppercase tracking-wide text-zinc-500'>Owner</p>
            <button
                type='button'
                disabled={isPending}
                onClick={handleWithdrawal}
                className='mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-400 disabled:opacity-60'
            >
                {isPending ? <Loader2Icon className='h-4 w-4 animate-spin' /> : <WalletIcon className='h-4 w-4' />}
                Withdraw balance to my wallet
            </button>
            {hash && <p className='mt-2 truncate text-center font-mono text-xs text-zinc-500' title={hash}>{hash}</p>}
        </div>
    );
}
