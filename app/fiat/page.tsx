'use client'

import CheckoutForm from "../components/CheckoutForm";

export default function FiatPage() {
  

    return (
        <div className=' mx-auto flex'>        
             <CheckoutForm uiMode="hosted" />
        </div>
    )
} 