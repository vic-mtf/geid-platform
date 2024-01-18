import { useCallback } from "react";
import { encrypt } from "../../../utils/crypt";
import { useNavigate } from 'react-router-dom';

export default function useCheckTokenAccount({ user, refresh }) {
    const navigateTo = useNavigate();
    const handleCheckAccount = useCallback(() => {
        const { token, email } = user;
        refresh({
            url: '/api/auth/check',
            method: 'post',
            data: { type: "token", token },
        }).then(({data}) => {
            if(data?.found) {
                const customEvent = new CustomEvent('_connected', {
                    detail: {
                        user: encrypt(user),
                        name: '_connected',
                    }
                });
                document.getElementById('root')
                .dispatchEvent(customEvent);
            }
        }).catch((error) => {
            if(error?.response?.data?.found === false) 
                navigateTo(`/account/signin?email=${email}`);
        })
    }, [user, navigateTo, refresh]);
    return handleCheckAccount
}