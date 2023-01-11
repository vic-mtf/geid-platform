import {
    Grid, 
    AppBar, 
    Toolbar, 
    Typography,
    Box as MuiBox,
} from '@mui/material';
import { createContext, useState } from 'react';
import Box from '../../components/Box';
import LineChart from './LineChart';
import BarChart from './BarChart';
import DoughnutChart from './DoughnutChart';
import BubbleChart from './BubbleChart';
import PolarArea from './PolarArea';
import Scatter from './Scatter';
import HorizontalBarChart from './HorizontalBarChart';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import IconButton from '../../components/IconButton';
import { Link } from 'react-router-dom';

export const dashboard = createContext(null);
const DashboardProvider = dashboard.Provider;

const useDashboardData = (init) => {
    const [values, setValues] = useState({
        
    });

    const actions = {
        handleChangeProps(props, value) {
            setValues({
                ...values, 
                ...(typeof props === 'string' ? {props : value} : props)
            });
        }
    };
    return [values, actions];
};

function Dashboard(props) {

    const [values, actions] = useDashboardData({
    });

    return (
        <DashboardProvider value={[values, actions]}>
            <Box>
                <AppBar 
                    position="fixed" 
                    sx={{
                        background: theme => theme.palette.background.paper +
                        theme.customOptions.opacity,
                        backdropFilter: theme => `blur(${theme.customOptions.blur})`
                    }}

                >
                    <Toolbar>
                        <IconButton 
                            LinkComponent={Link}
                            to="/"
                        >
                            <ArrowBackIosRoundedIcon/>
                        </IconButton>
                        <Typography color="text.primary" mx={1} fontSize={18} variant="h6">
                            Tableau de bord
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Content />
            </Box>
        </DashboardProvider>
        );
}

function Content() {
    
    return (
        <MuiBox
            p={10}
            overflow="auto"
        >
            <Grid container spacing={2} justifyContent="center" display="flex">
                <Grid xs={12} md={3} item justifyContent="center" display="flex">
                    <DoughnutChart />
                </Grid>
                <Grid xs={12} md={4} item justifyContent="center" display="flex">
                    <LineChart/>
                </Grid>
                <Grid xs={12} md={4} item justifyContent="center" display="flex">
                    <BarChart/>
                </Grid>
                
                <Grid xs={12} md={4} item justifyContent="center" display="flex">
                    <BubbleChart/>
                </Grid>
                <Grid xs={12} md={4} item justifyContent="center" display="flex">
                    <Scatter/>
                </Grid>
                <Grid xs={12} md={4} item justifyContent="center" display="flex">
                    <PolarArea/>
                </Grid>
                <Grid xs={12} md={6} item justifyContent="center" display="flex">
                    <HorizontalBarChart/>
                </Grid>
            </Grid>
        </MuiBox>
        )
}

export default Dashboard;