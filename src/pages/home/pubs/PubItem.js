import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Stack,
    Box as MuiBox
} from '@mui/material';
import Typography from '../../../components/Typography';

export default function PubItem ({desc, description, src, uri, title, srcSet}) {

    return (
        <MuiBox
            position="relative"
        >
            <Card
                elevation={0}
                sx={{
                    bgcolor: 'transparent',
                    border: theme => `1px solid ${theme.palette.divider}`,
                    "& .typography-content" : {
                        height: 100,
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        display: "-webkit-box",
                        WebkitLineClamp: 5,
                        WebkitBoxOrient: "vertical",
                    },
                    "&:hover": {
                        position: 'absolute',
                        "& .typography-content" : {
                            height: 'auto',
                            display: "flex",
                            WebkitLineClamp: 'none',
                            WebkitBoxOrient: "none",
                        },
                    }
                }}
            >
                <CardActionArea>
                    <Stack
                        direction="row"
                        display="flex"
                        flex={1}
                    >
                        <CardMedia
                            component="img"
                            sx={{
                                borderRadius: 2, 
                                bgcolor: 'red', 
                                height: 170, 
                                width: 170,
                                m: 1,
                            }}
                            src={uri || src}
                            loading="lazy"
                            srcSet={srcSet || uri || src}
                        />
                        <CardContent
                            sx={{display: 'flex', flex: 1, flexGrow: 1, flexDirection: 'column'}}
                        >
                            <Typography
                                variant="body1"
                                fontWeight={600}
                                paragraph
                            >{title}</Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                className="typography-content"
                            >{desc || description}</Typography>
                        </CardContent>
                    </Stack>
                </CardActionArea>
            </Card>
        </MuiBox>
    )
}