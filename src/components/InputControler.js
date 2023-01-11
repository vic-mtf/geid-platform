import { FormControl, FormHelperText } from '@mui/material';
import React, { useLayoutEffect, useMemo, useState } from 'react';
import capStr from '../utils/capStr';
import validateFields from '../utils/validateFields';

export default function InputControler ({
    children, 
    regExp,
    emptyErrorMessage,
    invalidateErrorMessage,
    type,
    trim,
    size,
    autoControler,
    valueRef,
    externalError,
    name,
    defaultValue,
    onChange: handleChange,
    ...otherProps
}) {
    const [values, setValues] = useState({
        value: defaultValue,
        error: false,
    });
    const validate = validateFields[`validate${capStr(type)}`];
    const validateFunc = (autoControler) ? validate :
    value => value.toString().match(new RegExp(regExp));
    const error = useMemo(() => !!(externalError && (values.error)), 
        [
            values.error, 
            externalError,
        ]
    );
    const onChange = event => {
        const value = trim ? event.target?.value?.trim() : event.target?.value;
        setValues({
            value,
            error: Boolean(typeof validateFunc === 'function' ?
            !validateFunc(value) : false),
        });
        if(typeof handleChange === 'function')
            handleChange(event, value);
       
    };
    
    useLayoutEffect(() => {
        if(typeof valueRef === 'object') 
            valueRef.current = values.error ? null : values.value;
    });

    const cloneChild = React.cloneElement(
        React.Children.only(children),
        {...values, error, size, onChange}
    );

    return (
        <FormControl  {...otherProps}>
          {cloneChild}
          {error && (
            <FormHelperText sx={{color: theme => theme.palette.error.main}}>
                {
                values.value.trim() ? 
                invalidateErrorMessage : emptyErrorMessage
                }
            </FormHelperText>
          )}
        </FormControl>
    )
}

InputControler.defaultProps = {
    size: 'small',
    trim: true,
    regExp: /./,
    autoControler: false,
    defaultValue: '',
    emptyErrorMessage: 'Veuillez remplir ce champ.',
    invalidateErrorMessage: `Le champ n'est pas valable, 
    veuillez le remplir correctement.`
};
