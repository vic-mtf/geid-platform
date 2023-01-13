import { CardMedia } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default function Editor ({src, onclose, cropRef, imageRef: _imageRef}) {
    const [crop, setCrop] = useState(null);
    const [defaultCrop, setDefaultCrop] = useState(null);
    const imageRef = useRef();
    const size = 200;
    useEffect(() => {
        cropRef.current = crop || defaultCrop;
        _imageRef.current = imageRef.current;
    },[cropRef, crop, _imageRef, defaultCrop]);
    return (
        <ReactCrop 
            aspect={1}
            crop={crop} 
            onChange={value => setCrop(value)}
        >
            <CardMedia
                component="img"
                ref={imageRef}
                src={src} 
                onLoad={event => {
                    const img = event.target;
                    const _size = Math.min(img.width, img.height);
                    if(_size >= size) {
                        setDefaultCrop({
                            height: _size,
                            width: _size,
                            x: (img.width - _size) / 2,
                            y: (img.height - _size) / 2,
                            unit:'px',
                        });
                    } else {
                        alert(`L'image trop petite, ${size}x${size} est le format minimum requis.`);
                        onclose();
                    }
            }} 
            />
        </ReactCrop>
    )
}