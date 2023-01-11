import { 
    Stack,
    Box as MuiBox
} from "@mui/material";
import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "../../../components/Box";
import Button from "../../../components/Button";
import randomCode from "../../../utils/randomCode";
import AccountInformation from "./AccountInformation";
import CheckInformation from "./CheckInformation";
import PersonalInformation from "./PersonalInformation";

export default function Content({loading, refresh}) {
    const [step, setStep] = useState(1);
    const [errorsField, setErrorsField] = useState([]);
    const navigateTo = useNavigate();
    const checkError = useCallback(field => !!~errorsField?.indexOf(field), [errorsField]);
    const [code, setCode] = useState(randomCode({mode: 'num'}));

    const personalInfos = {
        name: useRef(),
        firstname: useRef(),
        middlename: useRef(),
        func: useRef(),
        role: useRef(),
        checkError
    };
    const accountInfos = {
        email: useRef(),
        number: useRef(),
        password: useRef(),
        checkError
    };
    
    const checkInfos = {
        email: accountInfos.email.current,
        code,
        setCode,
        refresh,
        formData: {
            fname: personalInfos.firstname.current,
            lname: personalInfos.name.current,
            mname: personalInfos.middlename.current,
            email: accountInfos.email.current,
            phoneCell: accountInfos.number.current,
            password: accountInfos.password.current,
            grade: {
                grade : personalInfos.func.current,
                role : personalInfos.role.current,
            }
        },
        handleValidateEmail() {
            return (
                refresh({
                    url: '/api/auth/validate',
                    data: {
                       key: code,
                       email: accountInfos.email.current,
                    }
                })
            )
        }
    };
    
    const handleSendForm = event => {
        event.preventDefault();
        const errors = [];
        if(step === 1)
            Object.keys(personalInfos).forEach(field => {
                if(!personalInfos[field]?.current && field !== 'checkError') 
                    errors.push(field);

            });
        if(step === 2)
            Object.keys(accountInfos).forEach(field => {
                if(!accountInfos[field]?.current && field !== 'checkError') 
                    errors.push(field);
            });
        if(errors.length)
            setErrorsField(errors);
        else if(step < 3 ) {
            if(step === 1)
                setStep(step => step + 1);
            if(step === 2) 
                checkInfos.handleValidateEmail()
                .then(() => {
                        setStep(step => step + 1);
                    });;
        }
    };

    return (
        <Box 
            flex={1} 
            flexDirection="column"
            component="form"
            onSubmit={handleSendForm}
        >
            <Box flex={1}>
                {step === 1 && <PersonalInformation {...personalInfos} />}
                {step === 2 && <AccountInformation {...accountInfos} />}
                {step === 3 && <CheckInformation {...checkInfos} />}
            </Box>
            <Stack spacing={1} direction="row" display="flex">
                <MuiBox display="flex" flexGrow={1}>
                    <Button
                        onClick={() => step > 1 ? 
                            setStep(step - 1) : 
                            navigateTo('/account/signin')
                        }
                    >
                        {step === 1 &&  "J'ai déjà mon compte"}
                        {step === 2 && "Etape précédente"}
                        {step === 3 && "Revérifiez mes informations"}
                    </Button>
                </MuiBox>
                <MuiBox display="flex" flexGrow={1} justifyContent="right">
                    {step !== 3 && 
                    <Button type="submit" variant="contained">
                        Suivant
                    </Button>}
                </MuiBox>
            </Stack> 
        </Box>
    )
}