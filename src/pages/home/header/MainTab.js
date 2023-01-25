import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import tabs from "./tabs";

export default function MainTab() {
    const [value, setValue] = useState('_home');
    const connected = useSelector(store => store.user.connected);
    const handleChangeTab = (event, newVAlue) => setValue(newVAlue);

    return (
        <React.Fragment>
            <Tabs 
                value={value} 
                onChange={handleChangeTab} 
                sx={{ 
                    flexGrow: 1,
                    width: { xs: 100 },
                    mr: 1,
                }}
                scrollButtons="auto"
                variant="scrollable"
            >
                {tabs.map(tab => (
                    ((connected && tab.access === 'private') || tab.access === 'public') &&
                    <Tab
                        security={tab.id}
                        label={tab.label}
                        key={tab.id}
                        value={tab.id}
                        disabled={tab.disabled}
                        sx={{ textTransform: 'none' }}
                        LinkComponent={tab.component}
                        href={tab.href}
                        to={tab.to}
                    />
                ))}

            </Tabs>
        </React.Fragment>
    );
}