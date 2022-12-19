import { createTheme } from '@mui/material';
import appConfig from '../configs/app-config.json';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import useAutoMode from './useAutoMode';

const useTheme = () => {
    const autoMode = useAutoMode();
    const themeMode = useSelector(store => store.app?.mode);

    const mode = useMemo(() => 
        themeMode === 'auto' ? autoMode : themeMode, 
        [themeMode, autoMode]
    );

    const { main, paper, ...otherKey } = useMemo(() => 
        appConfig.colors.primary[mode], 
        [mode]
    );
    
    return createTheme({
        palette: {
            mode,
            primary: { main },
            background: { default: otherKey, paper }
        }
    })};

    export default useTheme;
