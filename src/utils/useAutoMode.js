import { useCallback, useEffect, useState } from "react";

export default function useAutoMode() {
    const [mode, setMode] = useState(darkThemeMediaquery.matches ? 'dark': 'light');
    
    const handleChange = useCallback(event => 
        setMode(event.target.matches ? 'dark': 'light'), 
        [mode]
        );

    useEffect(()=> {
        darkThemeMediaquery
        .addEventListener('change', handleChange);
        return () => 
        darkThemeMediaquery.removeEventListener(
            'change', 
            handleChange
        );
    },[mode]);
   
    return mode
}

const darkThemeMediaquery = window.matchMedia(`(prefers-color-scheme: dark)`);