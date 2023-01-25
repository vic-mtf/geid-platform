import {
    Avatar,
    CardMedia, 
    Slide, 
    Stack,
    useMediaQuery, 
} from '@mui/material';
import Box from '../../../components/Box';
import _identity from '../../../assets/kisspng-computer-icons-encapsula.webp';
import Typography from '../../../components/Typography';
import InputsCode from '../../../components/InputsCode';
import CodeExpirationTimes from './CodeExpirationTimes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';

export default function CheckInformation (props) {
    const theme = useTheme();
    const maches = useMediaQuery(theme.breakpoints.only('xs'));

    return (
        <Stack 
            display="flex"  
            direction="row"sx={{...maches ? {
                maxHeight: '70vh',
                overflow: 'auto',
                mb: 1,
            }: {
                flex: 1
            }}}
        >
            {!maches && <Fields {...props} />}
            <Box 
                flex={1} 
                justifyContent="center" 
                alignItems="center" 
                mx={2} 
                position="relative"
            >
                <Avatar
                    children={3}
                    sx={{
                        bgcolor: 'primary.main', 
                        mb: 1, 
                        fontWeight: 'bold',
                        position: 'absolute',
                        top: 0,
                        right:0
                    }}
                />
                <CardMedia
                    component="img"
                    draggable={false}
                    src={_identity}
                    sx={{
                        height: 200,
                        width: 200
                    }}
                />
                <Typography
                    variant="h6"
                    align="center"
                    fontSize={16}
                    fontWeight="bold"
                    paragraph
                    mt={1}
                >
                    Vérification de la validité de l'inscription à 
                    partir de votre e-mail.
                </Typography>
                {maches && <Fields {...props} />}
                <Typography color="text.secondary" paragraph>
                    Un code à six chiffres vous sera envoyé à partir de l'adresse électronique, 
                    certifiant ainsi la soumission de votre demande d'inscription à la <b>Geid</b>.
                </Typography>
            </Box>
        </Stack>
    )
}

const Fields = ({
    code, 
    setCode, 
    refresh, 
    formData,
    handleValidateEmail,
}) => {

    const [error, setError] = useState(false);
    const navigateTo = useNavigate();

    return (
        <Slide in direction="right">
            <Stack 
                flex={1} 
                component={Stack} 
                spacing={1}
                justifyContent="center"
                alignItems="center"
                sx={{
                    mx: { md: 2, xs: 0 },
                    width:'100%'
                }}
            >
                <Box>
                    <Typography
                        paragraph
                    >
                        Bonjour {formData.fname}, 
                        Nous avons envoyé un code de validation à partir 
                        de votre adresse électronique, veuillez entrer ce code ci-dessous.
                    </Typography>
                    <InputsCode
                        onChangeEnd={value => {
                            const inputCode = parseInt(value?.join(''));
                            if(inputCode === parseInt(code))
                                refresh({
                                    data: formData, 
                                    url:'/api/auth/signup',
                                }).then(() => {
                                    navigateTo('/account/signin?email');
                                });
                            else setError(true);
                        }}
                        onChange={(event, _case) => {
                            if(error) setError(false);
                        }}
                    />
                </Box>
                <Box>
                    <CodeExpirationTimes
                        error={error}
                        setCode={setCode}
                        handleValidateEmail={handleValidateEmail}
                    />
                </Box>
            </Stack>
        </Slide>
    )
}