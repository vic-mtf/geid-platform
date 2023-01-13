import { FormControl, OutlinedInput, Stack, IconButton } from "@mui/material";
import {  useMemo, useState } from "react";
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
export default function InputsCode ({
        len,
        size,
        onChange,
        onChangeEnd,
        sizes,
        value,
        values,
        readOnly,
        codeRef: ref
    })  {
    const [_values, _setValues] = useState({
        inputs: [],
        read: 0,
    });

    const inputs = useMemo(() => {
        const inputsProps = [];
        for (let i = 0; i < len; i++) 
            inputsProps.push({
                id: i, size,
                autoComplete: 'off',
                defaultValue: value || values[i],
            });
        return inputsProps;
    }, [len, size, value, values]);

    const handleChange = id => event => {
        const value = event.target.value.trim().toString();
        if(!~'0123456789'.indexOf(value)) return;
        const inputs = [..._values.inputs];
        inputs[id] = value;
        const read = id + 1;
        _setValues({
            ...values, 
            inputs, 
            read
        });
        document.getElementById(`input_code_${read}`)?.focus();
        if(ref)
            ref.current = {
                value,
                values: inputs
            };
        if(typeof onChange === 'function')
            onChange(event, {
                id,
                value,
            });
        if(typeof onChangeEnd === 'function' && id === len - 1)
        onChangeEnd([...inputs]);
    }

    const handleDelete = event => {
        event.preventDefault();
        const read = Math.min(len, Math.max(0, _values.inputs.length - 1));
        document.getElementById(`input_code_${read}`)?.focus();
        let inputs = _values.inputs?.filter((input, index) => index !== read);
        _setValues({
            ..._values, 
            inputs,
            read
        });
        if(typeof onChange === 'function')
            onChange(event, {
                id: read,
                value: inputs[read],
            });
    }

    return (
        <Stack
            direction="row"
            spacing={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            {
                inputs.map(({id, ...inputProps}) => (
                    <FormControl variant="outlined" key={id}>
                        <OutlinedInput
                            onChange={handleChange(id)}
                            id={`input_code_${id}`}
                            onKeyDown={event => {
                                if(event.keyCode === 8) 
                                    handleDelete(event);
                            }}
                            inputProps={{
                                style: {
                                    height: sizes,
                                    width: sizes,
                                    textAlign: 'center',
                                    fontSize: 30,
                                },
                                value: _values.inputs[id] || '',
                            }}
                            sx={{height: sizes, width: sizes}}
                            readOnly={readOnly || _values.read !== id}
                            autoFocus={_values.read === id}
                            {...inputProps}
                        />
                    </FormControl>
                ))
            }
            <IconButton 
                aria-label="Backspace" 
                onClick={handleDelete}
            >
                <BackspaceRoundedIcon/>
            </IconButton>
        </Stack>
    )
};

InputsCode.defaultProps = {
    len: 6,
    size: 'small',
    sizes: 45,
    value: '',
    values: [],
    readOnly: false,
};