import {
    Avatar,
    CardMedia, 
    Slide, 
    Stack, 
    TextField
} from '@mui/material';
import Box from '../../../components/Box';
import _identity from '../../../assets/kisspng-identity-document-busine.webp';
import InputControler from '../../../components/InputControler';
import Typography from '../../../components/Typography';
import DutyFrame from './DutyFrame';
import regExp from '../../../utils/regExp.json';

export default function PersonalInformation ({name, firstname, middlename, func, role, checkError}) {
    
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
                            valueRef={name} 
                            externalError={checkError('name')}
                            regExp={new RegExp(regExp.name, 'ig')}
                            defaultValue={name?.current}
                        >
                            <TextField
                                label="Nom"
                                margin="normal"
                                name="lastname"
                            />
                        </InputControler>
                        <InputControler 
                            valueRef={middlename} 
                            externalError={checkError('middlename')}
                            regExp={new RegExp(regExp.name, 'ig')}
                            defaultValue={middlename?.current}
                        >
                            <TextField
                                label="Postnom"
                                margin="normal"
                                name="middlename"
                            />
                        </InputControler>
                        <InputControler 
                            valueRef={firstname} 
                            externalError={checkError('firstname')}
                            regExp={new RegExp(regExp.name, 'ig')}
                            defaultValue={firstname.current}
                        >
                            <TextField
                                label="Prénom"
                                margin="normal"
                                name="fistname"
                            />
                        </InputControler>
                    </Box>
                    <Box>
                        <DutyFrame 
                            func={func} 
                            role={role}
                            externalErrorRoleError={checkError('role')}
                            externalFuncError={checkError('func')}
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
                    children={1}
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
                    Vos informations d'identification personnelles
                </Typography>
                <Typography color="text.secondary">
                    Les noms ne doivent contenir que des lettres, 
                    peuvent être composés de plusieurs mots comportant 
                    des espaces et doivent comporter au moins 3 caractères et au plus 30.
                </Typography>
            </Box>
        </Stack>
    )
}