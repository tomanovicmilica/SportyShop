import { Box, Typography } from "@mui/material";
import Slider from 'react-slick';
import ButtonBases from "./ButtonBases";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

export default function HomePage() {
    return (
        <>
        <Slider {...settings}>
            <div>
                <img src="/images/1.png" alt="hero" style={{ display: 'block', width: '100%', maxHeight: 500 }} />
            </div>
            <div>
                <img src="/images/2.jpg" alt="hero" style={{ display: 'block', width: '100%', maxHeight: 500 }} />
            </div>
            <div>
                <img src="/images/3.jpg" alt="hero" style={{ display: 'block', width: '100%', maxHeight: 500 }} />
            </div>
        </Slider>
        <Box display='flex' justifyContent='center' sx={{ p: 4 }} >
            <Typography variant='h1'>
                Welcome to the online shop!
            </Typography>
        </Box>
        <Box>
            <ButtonBases />
        </Box>
    </>
    )
}