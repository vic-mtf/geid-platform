import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import Button from "../../../components/Button";
import MuiBox from '@mui/material/Box';
import randomCode from "../../../utils/randomCode";
import Typography from "../../../components/Typography";
import { Alert, FormHelperText } from "@mui/material";
import pluralize from "pluralize";

export default function CodeExpirationTimes ({setCode, error, handleValidateEmail}) {
   
    const [retry, setRetry] = useState(5);
    const { seconds, minutes, restart, isRunning, pause } = useTimer({
        expiryTimestamp: getTime(),
        onExpire: () => {
            setCode(randomCode({mode: 'num'}));
        },
    });

    const handeSendCode = () => {
        handleValidateEmail().then(() => {
            setRetry(5);
            restart(getTime());
        })
    };
    
    useEffect(() => {
        if(error) 
            setRetry(_try => _try - 1);
    }, [error, setRetry]);

    useEffect(() => {
        if(retry === 0 && isRunning) {
            restart(getTime(retry));
            pause();
        };
    }, [retry, restart, isRunning, pause])


    return (
        <React.Fragment>
            <MuiBox>
                <Button
                    disabled={isRunning}
                    onClick={handeSendCode}
                >
                    Renvoyer un nouveau code
                </Button>
            </MuiBox>
            {isRunning && error && 
                <FormHelperText sx={{color: theme => theme.palette.error.main}}>
                    Ce code de validation est incorrect, 
                    vérifiez-le et essayez de nouveau.
                </FormHelperText>
            }
            {isRunning ? 
            (<Typography component="div" paragraph>
                    Ce code expire au bout de {minutes}:{seconds} ou 
                    après {pluralize('tentative', retry, true)} {pluralize('erronée', retry)}
            </Typography>) :
            (<Alert severity="warning">
                Le code de validation envoyé à partir de votre adresse vient d'expirer.
            </Alert>)
            }
        </React.Fragment>
    );
}

const getTime = addSeconds => {
    const time = new Date();
    time.setSeconds( 
        time.getSeconds() + 
        (typeof addSeconds === 'number' ? addSeconds : 300)
    );
    return time;
};