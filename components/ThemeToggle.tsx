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
        <button onClick={() => setTheme(theme === 'light' ? 'dark': 'light')} className='border dark:border-gray-700 shadow rounded-full w-10 h-10 flex items-center justify-center' suppressHydrationWarning>
            {theme === 'light' ? 
            (
            <MoonIcon className='w-5 h-5'/>
            ) : (
            <SunIcon className='w-5 h-5'/>
            )}
            
        </button>
    )
}