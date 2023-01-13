import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { drawerWidth } from '../utils/PDFLib';
import { Typography, useTheme } from '@mui/material';
import CustomDrawerHeader from './CustomDrawerHeader';
import ViewPages from './ViewPages';

const titles = {
    detail: 'Détails',
    pages: 'Vue des rapide des pages'
}
export default function NavRight ({open, handleDrawerClose}) {
    const theme = useTheme();
    return (
        <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            display: "flex",
            overflow: "hidden",
          },
        }}
        variant="persistent"
        anchor="right"
        open={!!open}
      >
        <CustomDrawerHeader>
          <IconButton onClick={handleDrawerClose} size="small">
            {theme.direction === 'rtl' ? 
            <ChevronLeftRoundedIcon fontSize="small" /> : 
            <ChevronRightRoundedIcon fontSize="small"/>
            }
          </IconButton>
          <Typography sx={{flexGrow: 1, mx: 1}}>{titles[open]}</Typography>
        </CustomDrawerHeader>
        <Divider />
        {open === 'pages' && <ViewPages/>}
      </Drawer>
    )
}