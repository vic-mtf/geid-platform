import {
    CardMedia,
    Box as MuiBox,
} from '@mui/material';
import Typography from '../../../components/Typography';

export default function CarouselItem ({
        imagesProps: {src, srcSet, alt, loading, ...otherProps},
        desc,
        description,
        title,
        uri,
}) {
    return (
        <MuiBox
            sx={{
                position: 'relative', 
                width: '100%', 
                display: 'flex',
                borderBottom: theme => `1px solid ${theme.palette.divider}`
            }}
        > 
            <CardMedia 
                src={uri || src}
                srcSet={srcSet || uri || src}
                alt={alt}
                {...otherProps}
                loading={loading || 'lazy'}
                component="img"
                height={200}
            />
            <MuiBox
                position="absolute"
                width="60%"
                height={200}
                display="flex"
                flexDirection="column"
                sx={{
                    bgcolor: theme => theme.palette.background.paper + '99'
                }}
            >  
                <MuiBox
                    p={2}
                >
                    <Typography 
                        paragraph 
                        variant="h4" 
                        fontSize={22} 
                        color="text.primary"
                    >
                        <MuiBox 
                            component="span"
                            padding={1}
                            fontWeight={900}
                            sx={{
                                backdropFilter: theme => `blur(${theme.customOptions.blur})`,
                                borderRadius: 2,
                                display: 'inline-block'
                            }}
                        >{title}</MuiBox> 
                    </Typography>
                    <Typography 
                        fontWeight={100} 
                        fontSize={18} 
                        variant="body2" 
                        padding={1}
                        color="text.primary"
                        sx={{
                            backdropFilter: theme => `blur(${theme.customOptions.blur})`,
                            borderRadius: 2,
                        }}
                    >{desc || description}
                    </Typography>
                </MuiBox>
            </MuiBox> 
        </MuiBox>
    );
}