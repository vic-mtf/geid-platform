import { useCallback, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/validateFields";
import getPathnames from "../utils/getPathnames";
import { encrypt } from "../utils/crypt";
import { SIGN_IN_CHANNEL } from "../utils/broadcastChannel";
import store from "../redux/store";
import { updateApp } from "../redux/app";
import { updateUser } from "../redux/user";
import formatUserData from "../utils/formatObjectData";

export default function useSignInSendData({ refresh, user }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState(user?.email);
  const location = useLocation();
  const navigateTo = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const defaultEmail = useMemo(() => {
    const paths = getPathnames(location?.pathname);
    return paths[paths?.length - 2];
  }, [location?.pathname]);

  const handleCleanErrorMessage = useCallback(() => {
    if (errorMessage) setErrorMessage(null);
  }, [errorMessage]);

  const getEmail = useCallback(
    () => emailRef.current?.value?.trim() || email,
    [email]
  );

  const handleSendData = useCallback(
    async (event) => {
      event?.preventDefault();
      handleCleanErrorMessage();
      const email = getEmail();
      const password = passwordRef.current?.value;
      let error;
      if (validateEmail(email)) {
        if (defaultEmail === email) {
          if (!password) error = "anyPassword";
          else {
            try {
              const { data } = await refresh({
                method: "post",
                url: "/api/auth/login",
                data: { email: defaultEmail, password },
              });
              setSignInData(data);
            } catch (e) {
              error = "password";
            }
          }
        } else {
          try {
            const { data } = await refresh({
              url: "/api/auth/check",
              data: { type: "email", email },
              method: "post",
            });
            if (data?.found) {
              navigateTo(`${email}/password`);
              setEmail(email);
            }
          } catch (e) {
            error = e?.response?.data?.found === false ? "account" : "network";
          }
        }
      } else error = "anyEmail";
      if (error) setErrorMessage(errors[error]);
    },
    [handleCleanErrorMessage, refresh, navigateTo, defaultEmail, getEmail]
  );

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
      handleCleanErrorMessage,
    },
  ];
}

export function useCheckTokenAccount({ user, refresh }) {
  const navigateTo = useNavigate();
  const handleCheckAccount = useCallback(() => {
    const { token, email } = user;
    refresh({
      url: "/api/auth/check",
      method: "post",
      data: { type: "token", token },
    })
      .then(({ data }) => {
        if (data?.found) setSignInData(user);
      })
      .catch((error) => {
        const path = `/account/signin/${email}/password`;
        if (error?.response?.data?.found === false) navigateTo(path);
      });
  }, [user, navigateTo, refresh]);
  return handleCheckAccount;
}

export const setSignInData = (data) => {
  const user = formatUserData({
    ...data,
    grade: data?.grade || data?.userGrade?.grade,
    role: data?.role || data?.userGrade?.role,
  });

  const encryptUser = encrypt(user);
  SIGN_IN_CHANNEL.postMessage(encryptUser, window.location.origin);
  store.dispatch(updateApp({ data: { user: { data: encryptUser } } }));
  store.dispatch(updateUser({ data: { ...user, connected: true } }));
  window.close();
};

const errors = {
  anyPassword: `Impossible de se connecter, 
    Merci de renseigner votre mot passe.`,
  anyEmail: `Impossible de se connecter, 
    Merci de saisir une adresse e-mail valide.`,
  password: `Impossible d'ouvrir une session 
    en raison du mot de passe incorrect, 
    vérifier et réessayer.`,
  account: `Compte introuvable, 
    cette adresse ne possède pas de compte à la Geid, 
    vérifiez pour essayer à nouveau.`,
  network: `Un problème est survenu, 
    Nous avons des difficultés à charger vos données, 
    vérifier que vous êtes connecté à l'internet.`,
};
