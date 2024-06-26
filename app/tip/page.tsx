
import { DollarSignIcon } from "lucide-react";
import Link from "next/link";
import { SiBnbchain } from "react-icons/si";

const paymentLinks = [
    {
        icon: DollarSignIcon,
        text: 'Credit Card',
        social: '/fiat',
        count: 1,
    },
    
    {
        icon: SiBnbchain,
        text: 'Crypto',
        social: '/crypto',
        count: 2,
    },

]

export default function TipPage() {
   
    return (
        <div className='mt-8 border-solid border-cyan-300'>
            <div className='grid grid-col-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12'>
                {paymentLinks.map(link => (
                    <Link href={link.social} key={link.count}>
                        <li className='group hover:scale-[110%] flex border-blue-400 hover:text-black hover:bg-blue-500 border-2 rounded-2xl p-5 m-5 '>
                            <link.icon className='w-5 group-hover:scale-125 my-auto'/>
                                <span className='pl-3  dark:text-white'>{`${link.text}`}</span>
                        </li>
                    </Link>
                ))}
                
            </div>
            
        </div>
    )
}