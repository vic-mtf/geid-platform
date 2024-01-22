import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../../utils/validateFields';
import setSignInData from './setSignInData';
import getPathnames from '../../../utils/getPathnames';
import { isBoolean } from 'lodash';

export default function  useSignInSendData ({ refresh }) {
    const [errorMessage, setErrorMessage] = useState(null);
    const [email, setEmail] = useState('');
    const location = useLocation();
    const navigateTo = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const defaultEmail = useMemo(() => {
        const paths = getPathnames(location?.pathname);
        return paths[ paths?.length - 2];
    }, [location?.pathname]);
    const handleCleanErrorMessage = useCallback(() => {
        if(errorMessage) setErrorMessage(null);
    }, [errorMessage]);
    const getEmail = useCallback(() => emailRef.current?.value?.trim() || email , [email]);
    const onCheckEmail = useCallback(async ({ email }) => new Promise(async (resolve, reject) => {
        try {
            const { data } = await refresh({
                url: '/api/auth/check',
                data: { type: 'email', email },
                method: 'post',
            });
            resolve(data)
        } catch(e) { reject(e); }
    }), [refresh]);
    const handleSendData = useCallback(async event => {
        event?.preventDefault();
        handleCleanErrorMessage();
        const email = getEmail();
        const password = passwordRef.current?.value;
        let error;
        if(validateEmail(email)) {
            if(defaultEmail === email) {
                if(!password)
                    error = 'anyPassword';
                else {
                    try {
                        const { data } = await refresh({
                            method: 'post',
                            url: '/api/auth/login',
                            data: { email: defaultEmail, password }
                        });
                        setSignInData(data)
                    } catch(e) {  error = 'password' }
                } 
            } else {
                try {
                    const  data  = await onCheckEmail({ email });
                    if(data?.found) {
                        navigateTo(`${email}/password`);
                        setEmail(email)
                    }
                } catch(e) {
                    error = e?.response?.data?.found === false ? 'account' : 'network';
                }
            }
        } 
        else error = 'anyEmail';
        if(error) setErrorMessage(errors[error]);
    },[ defaultEmail, getEmail, handleCleanErrorMessage, navigateTo, onCheckEmail, refresh]);
    const getters =  {
        errorMessage,
        defaultEmail,
        emailRef,
        email,
        passwordRef,
    };
    const setters = {
        setEmail,
        handleSendData,
        handleCleanErrorMessage
    };
    useEffect(() => {
        const paths = getPathnames(location?.pathname);
        const defaultEmail = paths[ paths?.length - 2];
        const email = getEmail();
        const onFound = (found) => {
            if(found && isBoolean(found)) {
                setEmail(defaultEmail);
                emailRef.current = defaultEmail;
            }
            if(!found && isBoolean(found)) {
                navigateTo("signin/email");
                const error = found === false ? 'account' : 'network';
                if(error) setErrorMessage(errors[error]);
            }
        };
        if(paths[ paths?.length - 1] === 'password' && email !== defaultEmail) {
            onCheckEmail({ email: defaultEmail })
            .then(data => { onFound(data?.found) })
            .catch(e => { onFound(e?.response?.data?.found) });
        }
    }, [location?.pathname, getEmail, navigateTo, onCheckEmail]);

    return [getters, setters];
};

const errors = {
    anyPassword: `Impossible de se connecter, 
    Merci de renseigner votre mot passe.`,
    anyEmail:  `Impossible de se connecter, 
    Merci de saisir une adresse e-mail valide.`,
    password: `Impossible d'ouvrir une session 
    en raison du mot de passe incorrect, 
    vérifier et réessayer.`,
    account: `Compte introuvable, 
    cette adresse ne possède pas de compte à la Geid, 
    vérifiez pour essayer à nouveau.`,
    network:  `Un problème est survenu, 
    Nous avons des difficultés à charger vos données, 
    vérifier que vous êtes connecté à l'internet.`
}