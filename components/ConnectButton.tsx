import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi';
export default function ConnectButton(){
    
    const {address, isConnecting, isDisconnected, isConnected} = useAccount();

    const { open } = useWeb3Modal();

    return (
        <div>
        {isConnected ? <div className=''><w3m-button balance='show' /></div> : <div>
                <button onClick={() => open()} className='rounded-full p-2 w-[150px] bg-blue-500 border-blue-500'>Connect Wallet</button>
            </div>}
        </div>
    )
}