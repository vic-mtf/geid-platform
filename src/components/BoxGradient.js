import { Box, styled } from "@mui/material";

const BoxGradient = styled( Box, {
  })(({ colors }) => ({
    display: 'flex',
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    flexDirection: 'column',
    background: colors.map((color, index) => 
      `linear-gradient(${
        (360 / colors.length) * index
      }deg, ${color}, transparent 70.71%)`).join(','),
 })); 

export default BoxGradient;

BoxGradient.defaultProps = {
  colors: ['#0095c940', '#fff24b40', '#db383240'],
}