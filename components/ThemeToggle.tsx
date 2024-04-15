'use client'
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])

    if(!mounted) {
        return null 
    }

    return (
        <button onClick={() => setTheme(theme === 'light' ? 'dark': 'light')} className='rounded-full shadow border dark:border-gray-700 p-2 flex items-center justify-center' suppressHydrationWarning>
            {theme === 'light' ? 
            (
            <MoonIcon className='w-3 h-3 sm:w-5 sm:h-5'/>
            ) : (
            <SunIcon className='w-3 h-3 sm:w-5 sm:h-5'/>
            )}
            
        </button>
    )
}