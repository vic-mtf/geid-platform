import { Checkbox, FormControl, FormControlLabel, TextField } from '@mui/material';
import React, { useLayoutEffect, useRef, useState } from 'react';
import InputControler from '../../../components/InputControler';
import Typography from '../../../components/Typography';
import regExp from '../../../utils/regExp.json';

export default function PasswordInputs ({valueRef, externalError}) {
    const [values, setValues] = useState({
        password: '',
        confirm: '',
        show: false,
    });
    const passwordRef = useRef();
    useLayoutEffect(() => {
        if(valueRef) 
            valueRef.current = values.password === values.confirm ? 
            passwordRef.current : null;
    });
    return (
        <React.Fragment>
            <InputControler
                onChange={(event, password) => setValues({...values, password})}
                regExp={new RegExp(regExp.password, "mg")}
                valueRef={passwordRef}
                trim={false}
                externalError={externalError}
                invalidateErrorMessage={
                    `Ce mot de passe n'est pas valide, 
                    s'il vous plaît remplir correctement 
                    conformément aux restrictions.`
                }
            >
                <TextField
                    type={values.show ? 'text' : 'password'}
                    value={values.password}
                    onPaste={event => event.preventDefault()}
                    margin="normal"
                    label="Mot de passe"
                    name="password"
                />
            </InputControler>
            <InputControler 
                regExp={`^${values.password}$`} 
                trim={false}
                onChange={(event, _confrim) => setValues({...values,confirm: _confrim})}
                externalError={values.password && externalError && values.password !== values.confirm}
                invalidateErrorMessage="Ce mot de passe ne correspond pas au précédent."
            >
                <TextField
                    type={values.show ? 'text' : 'password'}
                    label="Confimer"
                    value={values.confirm}
                    margin="normal"
                    onPaste={event => event.preventDefault()}
                />
            </InputControler>
            <FormControl sx={{display: 'inline-block'}}>
                <FormControlLabel
                    value="left"
                    control={
                    <Checkbox 
                        size="small" 
                        onChange={(event, show)=> setValues({...values, show})} 
                        checked={values.show}
                    />}
                    label={
                        <Typography>Afficher le mot de passe</Typography>
                    }
                    labelPlacement="end"
                />
            </FormControl>

        </React.Fragment>
    )
}