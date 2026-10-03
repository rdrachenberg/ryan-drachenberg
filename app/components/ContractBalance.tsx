import { Address, formatEther } from 'viem';
import { useBalance } from 'wagmi';

interface Props {
    contract: string;
    symbol?: string;
}

export default function ContractBalance({ contract, symbol = '' }: Props) {
    const { data, isLoading } = useBalance({
        address: contract as Address,
        query: { enabled: !!contract },
    });

    const formatted = data ? Number(formatEther(data.value)).toLocaleString(undefined, { maximumFractionDigits: 6 }) : null;

    return (
        <div className='flex items-center justify-between rounded-xl bg-zinc-50 px-4 py-3 ring-1 ring-zinc-900/5 dark:bg-gray-900/40 dark:ring-white/5'>
            <span className='text-sm text-zinc-600 dark:text-zinc-400'>Tip jar balance</span>
            <span className='font-mono text-sm font-semibold text-green-600 dark:text-green-400'>
                {isLoading || formatted === null ? '…' : `${formatted} ${symbol}`}
            </span>
        </div>
    );
}
