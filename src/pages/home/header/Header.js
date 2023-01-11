import React from "react";
import DeconnectDialog from "./DeconnectDialog";
import MainAppBar from "./MainAppBar";
import MainHeader from "./MainHeader";

export default function Header () {

    return (
        <React.Fragment>
            <MainHeader/>
            <MainAppBar/>
            <DeconnectDialog/>
        </React.Fragment>
    );
}