'use client'

import CheckoutForm from "../components/CheckoutForm";

export default function FiatPage() {
  

    return (
        <div className='flex items-center'>        
             <CheckoutForm uiMode="hosted" />
        </div>
    )
} 