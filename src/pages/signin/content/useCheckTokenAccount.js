import { useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import setSignInData from "./setSignInData";
import { encrypt } from "../../../utils/crypt";

export default function useCheckTokenAccount({ user, refresh }) {
    const navigateTo = useNavigate();
    const handleCheckAccount = useCallback(() => {
        const { token, email } = user;
        refresh({
            url: '/api/auth/check',
            method: 'post',
            data: { type: "token", token },
        }).then(({data}) => {
            if(data?.found) setSignInData(encrypt(user))
        }).catch((error) => {
            if(error?.response?.data?.found === false) 
                navigateTo(`/account/signin/${email}/password`);
        })
    }, [user, navigateTo, refresh]);
    return handleCheckAccount
}