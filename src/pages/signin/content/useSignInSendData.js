import { useCallback, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../../utils/validateFields';
import setSignInData from './setSignInData';
import getPathnames from '../../../utils/getPathnames';

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

    const getEmail = useCallback(() => emailRef.current?.value?.trim() || email, [email]);

    const handleSendData = async event => {
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
                    const { data } = await refresh({
                        url: '/api/auth/check',
                        data: { type: 'email', email },
                        method: 'post',
                    });
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
        setErrorMessage(errors[error]);
    };
    return [
        {
            errorMessage,
            defaultEmail,
            emailRef,
            email,
            passwordRef,
        }, 
        {
            setEmail,
            handleSendData,
            handleCleanErrorMessage
        }
    ];
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