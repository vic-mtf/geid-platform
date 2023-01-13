import { Card, Box as MuiBox, CardContent, CardMedia, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import { BookCover } from "book-cover-3d";
import { extractColors } from "extract-colors";
import React, { useEffect, useMemo, useState } from "react";
import Button from "../../../components/Button";
import Typography from "../../../components/Typography";
import DocReader from "../../doc-reader";

export default function BookPlan ({src, uri, url,  title, coverSrcSet, coverUrl}) {
    const [openReader, setOpenReader] = useState(false);
    const _url = useMemo(() => url || src || uri, [url, src, uri]);

    return (
        <React.Fragment>
            <Card
                sx={{
                    bgcolor: theme => theme.palette.background.paper + 
                    theme.customOptions.opacity,
                    display: 'block',
                    backdropFilter: theme => `blur(${theme.customOptions.opacity})`
                }}
                elevation={0}
            >
                <CardContent>
                    <Stack
                        direction="row"
                    >
                        <MuiBox>
                            <BookCoverColor 
                                src={coverUrl}
                                srcSet={coverSrcSet}
                            />
                        </MuiBox>
                        <MuiBox
                            display="flex"
                            flex={1}
                            pl={1}
                        >
                            <Stack
                                display="flex"
                                flex={1}
                            >
                                <MuiBox
                                    display="flex"
                                    flex={1}
                                    position="relative"
                                >
                                    <Typography 
                                        variant="body2"
                                        sx={{
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            display: "-webkit-box",
                                            WebkitLineClamp: 5,
                                            WebkitBoxOrient: "vertical",
                                            "&:hover": {
                                                position: 'absolute',
                                                height: 'auto',
                                                display: "flex",
                                                WebkitLineClamp: 'none',
                                                WebkitBoxOrient: "none",
                                                bgcolor: 'transparent',
                                                backdropFilter: theme => `blur(${theme.customOptions.blur})`
                                            }
                                        }}
                                    >
                                        {title}
                                    </Typography>
                                </MuiBox>
                                <MuiBox
                                display="flex"
                                justifyContent="center"
                                >
                                    <Button 
                                        fullWidth 
                                        variant="outlined"
                                        onClick={() => setOpenReader(true)}
                                    >Lire le document</Button>  
                                </MuiBox>
                            </Stack>
                        </MuiBox>
                    </Stack>
                </CardContent>
            </Card>
            {openReader &&
            <DocReader
                open={openReader}
                onClose={() => setOpenReader(false)}
                url={_url}
                name={title}
            />}
        </React.Fragment>
    );
}

const BookCoverColor = ({src, srcSet}) => {
    const [color, setColor] = useState(null);
    const theme = useTheme();

    useEffect(() => {
        extractColors(src).then(colors => {
            const [{hex: color}] = colors;
            setColor(color);
        });
    }, [src]);

    return (
        <BookCover
            height={140}
            width={95}
            thickness={20}
            rotate={35}
            transitionDuration={.5}
            radius={1}
            bgColor={color || theme.palette.divider}
            shadowColor={theme.palette.divider}
        >
            <CardMedia
                component="img"
                src={src}
                loading="lazy"
                srcSet={srcSet || src}
                sx={{
                    borderRight: theme => `.5px outset ${theme.palette.divider}`
                }}
            />
        </BookCover>
    );
}