import MuiCarousel from "react-material-ui-carousel";
import { Box as MuiBox} from '@mui/material';
import CarouselItem from "./CarouselItem";
import items from "./items";

export default function Carousel () {
    return (
        <MuiBox>
            <MuiCarousel
                animation="slide"
                duration={1000}
                interval={10000}
            >
                {
                    items.map( (item, index) => (
                        <CarouselItem 
                            desc={item.description}
                            title={item.title}
                            key={index}
                            imagesProps={{src: item.primaryUri}}
                        />
                    ) )
                }
            </MuiCarousel>
        </MuiBox>
    )
}