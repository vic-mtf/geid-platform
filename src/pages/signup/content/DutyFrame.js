import React,{ useLayoutEffect, useMemo, useState } from "react"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import useAxios from "../../../utils/useAxios";
import { FormControl, FormHelperText, MenuItem, Paper, Popper} from "@mui/material";
import Typography from "../../../components/Typography";

export default function DutyFrame ({func, role,  externalFuncError,  externalErrorRoleError}) {
    const [{error, loading}, refresh] = useAxios(
        {url: '/api/auth/init'}, 
        {manual: true}
    );
    const [values, setValues] = useState({
        func: null,
        service: null,
        funcs: [],
        services: [],
        open: false,
        data: null,
    });
    const funcEmptyError = useMemo(() => !!(externalFuncError && !values.func), 
        [
            externalFuncError, 
            values.func
        ]
    );

    const roleEmptyError = useMemo(() => !!(externalErrorRoleError && !values.service && values.services.length > 1), 
        [
            externalErrorRoleError, 
            values.service,
            values.services.length,
        ]
    );

    const handleFunc = (event, func) => {
        setValues({
            ...values, 
            func,
            service: null,
            services: func ? values.data[func.label].map((label, id) => ({
                label,
                id,
            })) : [],
        });
    };

    const handleRefresh = () => {
        if(!values.data)
            refresh().then(({data}) => {
                setValues({
                    ...values, 
                    data, 
                    funcs: Object.keys(data).map((label, id) => ({
                        label,
                        id,
                    })),
                });
            });
    };

    useLayoutEffect(() => {
        if(func && role && values.func) {
            func.current = values?.func?.label;
            if(values.service)
                role.current = values.service;
            if(values.services.length <= 1)
                role.current = values?.services[0]?.label;
        }
        if(func && role && !values.func) {
            func.current = null;
            role.current = null;
        }
    }, [
        func, 
        role, 
        values.func, 
        values.service, 
        values.funcs, 
        values.services
    ]);

    return (
        <React.Fragment>
            <FormControl>
                <Autocomplete
                    size="small"
                    fullWidth
                    onOpen={handleRefresh}
                    options={values.funcs}
                    onChange={handleFunc}
                    value={values.func}
                    loading={loading}
                    loadingText={<Typography>Chargement...</Typography>}
                    noOptionsText={
                        error ? 
                        (<Typography color="red">
                            Impossible de récupérer des informations, Vérifier le réseau.
                        </Typography>):
                        (<Typography color="red">Aucun élement</Typography>)
                    }
                    renderOption={(params) => (
                        <MenuItem {...params} sx={{fontSize: 14}}>{params.key}</MenuItem>)
                    }
                    PaperComponent={
                        (params) => (
                            <Paper 
                                sx={{
                                    bgcolor: theme => theme.palette.background.paper +
                                    theme.customOptions.opacity,
                                    border: theme => `1px solid ${theme.palette.divider}`,
                                    backdropFilter: theme => `blur(${theme.customOptions.blur})`,
                                }}
                            {...params}/>
                        )
                    }
                    renderInput={(params) => (
                        <TextField 
                            {...params} 
                            label="Fontions" 
                            size="small" 
                            margin="normal"
                            error={funcEmptyError}
                            InputProps={{
                            ...params.InputProps,
                            sx: {fontSize: 14},
                            endAdornment: (
                                <React.Fragment>
                                {loading && <CircularProgress color="inherit" size={15} />}
                                {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                            }}
                        />
                    )}
                />
                {funcEmptyError && <FormHelperText sx={{color: theme => theme.palette.error.main }}>
                    S'il vous plaît sélectionner un élément.
                </FormHelperText>}
            </FormControl>
            <FormControl>
                <Autocomplete
                    size="small"
                    fullWidth
                    disabled={values.services.length  < 2 }
                    onOpen={handleRefresh}
                    value={values.service}
                    title={values.service?.label}
                    noOptionsText="Aucun élement"
                    onChange={(event, service) => setValues({...values, service})}
                    options={values.services}
                    renderOption={(params, index) => (
                        <MenuItem {...params} >
                            <Typography 
                                variant="caption"
                                title={params.key}
                                key={index}
                                sx={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {params.key}
                            </Typography>
                        </MenuItem>
                        )
                    }
                    PopperComponent={(params) => (
                        <Popper
                            {...params}
                        />
                    )}
                    PaperComponent={
                        (params) => (
                            <Paper 
                                {...params}
                                sx={{
                                    bgcolor: theme => theme.palette.background.paper +
                                    theme.customOptions.opacity,
                                    border: theme => `1px solid ${theme.palette.divider}`,
                                    backdropFilter: theme => `blur(${theme.customOptions.blur})`,
                                }}
                            />
                        )
                    }
                    renderInput={(params) => (
                        <TextField 
                            {...params} 
                            label="Attributions" 
                            size="small" 
                            margin="normal"
                            error={roleEmptyError}
                            InputProps={{
                            ...params.InputProps,
                            sx: {fontSize: 14},
                            endAdornment: (
                                <React.Fragment>
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                            }}
                        />
                    )}
                />
                {roleEmptyError && <FormHelperText sx={{color: theme => theme.palette.error.main }}>
                    S'il vous plaît sélectionner un élément.
                </FormHelperText>}
            </FormControl>
        </React.Fragment>
    )

}