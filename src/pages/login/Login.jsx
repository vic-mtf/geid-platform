import {
  Card,
  Box,
  alpha,
  CardContent,
  CardActions,
  Slide,
  Button,
  Typography,
} from "@mui/material";
import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import useAxios from "../../hooks/useAxios";
import LoginHeader from "./LoginHeader";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import AutoReconnectSuggestion from "./AutoReconnectSuggestion";
import EmailCheckStep from "./EmailCheckStep";
import PasswordCheckStep from "./PasswordCheckStep";
import { useSelector } from "react-redux";
import { decrypt } from "../../utils/crypt";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import LinearProgressLayer from "../../components/LinearProgressLayer";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { formatUser } from "../../utils/formatObjectData";
import setLoginData from "./setLoginData";

const Login = React.forwardRef((props, ref) => {
  const { search } = useLocation();
  const navigateTo = useNavigate();
  const encryptUser = useSelector((store) => store.app.user?.data);
  const user = useMemo(
    () => encryptUser && decrypt(encryptUser),
    [encryptUser]
  );
  const defaultEmail = useMemo(() => {
    try {
      const { email } = queryString.parse(search);
      return email;
    } catch (error) {
      console.error(error);
      return "";
    }
  }, [search]);

  const [step, setStep] = useState(() => {
    if (defaultEmail) return 1;
    return user ? 0 : 1;
  });
  const emailCheckRef = useRef(null);
  const directions = useMemo(() => ({ enter: "left", exit: "right" }), []);
  const location = useLocation();

  const removeEmailParam = useCallback(
    (param) => {
      const params = new URLSearchParams(location.search);
      if (params.has(param)) {
        params.delete(param);
        const newSearch = params.toString()?.trim();
        navigateTo(`${location.pathname}${newSearch ? "?" + newSearch : ""}`, {
          replace: true,
        });
      }
    },
    [location, navigateTo]
  );

  const [{ loading, error, data }, refetch] = useAxios(
    {
      url: "/api/auth/check",
      method: "POST",
      data: { type: "email", email: defaultEmail },
    },
    { manual: !defaultEmail }
  );
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { email: defaultEmail || user?.email, password: "" },
  });

  const handleChange = useCallback(
    (dir = 1) => {
      directions.enter = dir < 1 ? "right" : "left";
      directions.exit = dir > -1 ? "right" : "left";
      const val = step + dir;
      const newIndex = Math.min(3, Math.max(0, val));
      if (newIndex !== step) setStep(newIndex);
    },
    [step, directions]
  );

  const checkSession = useCallback(
    async ({ type, value }) => {
      let isValid = false;
      try {
        const response = await refetch({
          url: "/api/auth/check",
          data: { type, [type]: value },
          method: "POST",
        });
        isValid = response?.data?.found;
      } catch (error) {
        console.error(error);
      }
      return isValid;
    },
    [refetch]
  );

  const handleConnection = useCallback(
    async ({ email, password }) => {
      try {
        const response = await refetch({
          url: "/api/auth/login",
          data: { email, password },
        });
        const user = formatUser(response.data);
        setLoginData(user);
      } catch (error) {
        console.error(error);
      }
    },
    [refetch]
  );

  const onSubmit = useCallback(
    async ({ email, password }) => {
      switch (step) {
        case 0: {
          handleChange(1);
          setValue("email", "");
          break;
        }
        case 1: {
          const isValid = await checkSession({ type: "email", value: email });
          if (isValid) handleChange(1);
          break;
        }
        case 2:
          handleConnection({ email, password });
          break;
      }
    },
    [step, handleChange, checkSession, handleConnection, setValue]
  );

  useEffect(() => {
    if (defaultEmail && step === 1 && !emailCheckRef.current && data) {
      emailCheckRef.current = data?.found;
      handleChange(1);
      removeEmailParam("email");
    }
  }, [data, defaultEmail, step, handleChange, removeEmailParam]);

  return (
    <Box
      justifyContent='center'
      alignItems='center'
      ref={ref}
      {...props}
      width='100%'
      height='100%'
      display='flex'
      flexDirection='column'>
      <Box
        minHeight={{ xs: "80%", md: 500 }}
        width={{ xs: "100%", md: 420 }}
        display='flex'
        position='relative'
        flexDirection='row'
        px={0.5}>
        <Card
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            bgcolor: (t) => alpha(t.palette.background.paper, 0.5),
            display: "flex",
            border: (theme) => `1px solid ${theme.palette.divider}`,
            flex: 1,
            flexDirection: "column",
            position: "relative",
          }}>
          <LoginHeader />
          <CardContent sx={{ display: "flex", flex: 1, position: "relative" }}>
            {steps.map((Step, index) => (
              <Slide
                key={index}
                in={index === step}
                appear={false}
                direction={directions[index === step ? "enter" : "exit"]}
                unmountOnExit={index !== 1}
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}>
                <StepWrapper>
                  <Step
                    register={register}
                    user={user}
                    serverError={error}
                    handleChange={handleChange}
                    checkSession={checkSession}
                    {...(index > 0 && {
                      error: errors[index === 1 ? "email" : "password"],
                      required: index === step,
                      watch,
                    })}
                  />
                </StepWrapper>
              </Slide>
            ))}
          </CardContent>
          <CardActions sx={{ justifyContent: "right" }}>
            {step === 2 && <Button disabled> Mot de passe oublié </Button>}
            <Button
              color='primary'
              type='submit'
              disabled={loading}
              onClick={() => {
                console.log("submit");
              }}
              endIcon={
                step < 2 ? (
                  <NavigateNextOutlinedIcon />
                ) : (
                  <LockOpenOutlinedIcon />
                )
              }
              variant='outlined'>
              {step === 0 && "Se connecter avec autre compte"}
              {step === 1 && "Continuer"}
              {step === 2 && "Se connecter"}
            </Button>
          </CardActions>
          <LinearProgressLayer open={loading} />
        </Card>
      </Box>
      <Typography
        variant='caption'
        color='textSecondary'
        align='center'
        fontSize={10}
        px={2}
        my={2}>
        {
          "Direction Archives et Nouvelles Technologies de l'Information et de la Communication"
        }{" "}
        &copy;2021
      </Typography>
    </Box>
  );
});

const steps = [AutoReconnectSuggestion, EmailCheckStep, PasswordCheckStep];

const StepWrapper = React.memo(
  React.forwardRef(({ children, ...props }, ref) => {
    return (
      <Box ref={ref} {...props} height='100%' width='100%' position='relative'>
        {children}
      </Box>
    );
  })
);

StepWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

StepWrapper.displayName = "StepWrapper";

Login.displayName = "Login";

export default Login;

// const SIGN_IN_CHANNEL = new BroadcastChannel(channels.signIn);
