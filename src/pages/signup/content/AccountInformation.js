import {
    Avatar,
    CardMedia, 
    Slide, 
    Stack, 
    TextField,
    useMediaQuery,
    useTheme
} from '@mui/material';
import Box from '../../../components/Box';
import _identity from '../../../assets/kisspng-teplogidrostroy-password.webp';
import InputControler from '../../../components/InputControler';
import Typography from '../../../components/Typography';
import PasswordInputs from './PasswordInputs';
import regExp from '../../../utils/regExp.json';

export default function AccountInformation (props) {
    const theme = useTheme();
    const maches = useMediaQuery(theme.breakpoints.only('xs'));
    
    return (
        <Stack 
            display="flex" 
            direction="row"
            sx={{...maches ? {
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
                {maches && <Fields {...props} />}
                <Typography color="text.secondary"  paragraph>
                    Le mot de passe ne peut contenir qu'un minimum de 6 caractères,
                    comprenant des lettres (majuscules ou minuscules), 
                    au moins un chiffre et/ou un caractère spécial (!$?...).
                </Typography>
            </Box>
        </Stack>
    )
}

const Fields = ({email, number, password, checkError}) => (
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
)