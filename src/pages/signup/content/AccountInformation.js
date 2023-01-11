import {
    Avatar,
    CardMedia, 
    Slide, 
    Stack, 
    TextField
} from '@mui/material';
import Box from '../../../components/Box';
import _identity from '../../../assets/kisspng-teplogidrostroy-password.webp';
import InputControler from '../../../components/InputControler';
import Typography from '../../../components/Typography';
import PasswordInputs from './PasswordInputs';
import regExp from '../../../utils/regExp.json';

export default function AccountInformation ({email, number, password, checkError}) {
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
                        <InputControler 
                            type="email" 
                            valueRef={email} 
                            regExp={new RegExp(regExp.email)}
                            defaultValue={email.current}
                            externalError={checkError('email')}
                        >
                            <TextField
                                label="Adresse email"
                                margin="normal"
                                type="email"
                                name="email"
                            />
                        </InputControler>
                        <InputControler 
                            type="tel" 
                            valueRef={number} 
                            regExp={new RegExp(regExp.phone, 'mg')}
                            defaultValue={number.current}
                            externalError={checkError('number')}
                        >
                            <TextField
                                type="tel"
                                label="Numéro de téléphone"
                                margin="normal"
                                name="number"
                            />
                        </InputControler>
                    </Box>
                    <Box>
                        <PasswordInputs valueRef={password} externalError={checkError('password')}/>
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
                    children={2}
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
                    Vos renseignements relatifs à l'identification du compte.
                </Typography>
                <Typography color="text.secondary">
                    Le mot de passe ne peut contenir qu'un minimum de 6 caractères,
                    comprenant des lettres (majuscules ou minuscules), 
                    au moins un chiffre et/ou un caractère spécial (!$?...).
                </Typography>
            </Box>
        </Stack>
    )
}