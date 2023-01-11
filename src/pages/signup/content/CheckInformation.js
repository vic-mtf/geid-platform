import {
    Avatar,
    CardMedia, 
    Slide, 
    Stack, 
} from '@mui/material';
import Box from '../../../components/Box';
import _identity from '../../../assets/kisspng-computer-icons-encapsula.webp';
import Typography from '../../../components/Typography';
import InputsCode from '../../../components/InputsCode';
import CodeExpirationTimes from './CodeExpirationTimes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CheckInformation ({
    code, 
    setCode, 
    refresh, 
    formData,
    handleValidateEmail,
}) {
    const [error, setError] = useState(false);
    const navigateTo = useNavigate();
    
    return (
        <Stack display="flex" flex={1} direction="row">
            <Slide in direction="right">
                <Stack 
                    flex={1} 
                    component={Stack} 
                    spacing={1}
                    justifyContent="center"
                    alignItems="center"
                    mx={2}
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
                                console.log(code);
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
                <Typography color="text.secondary">
                    Un code à six chiffres vous sera envoyé à partir de l'adresse électronique, 
                    certifiant ainsi la soumission de votre demande d'inscription à la <b>Geid</b>.
                </Typography>
            </Box>
        </Stack>
    )
}