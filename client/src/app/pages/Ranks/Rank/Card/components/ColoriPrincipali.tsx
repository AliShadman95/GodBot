import { Grid, Typography } from '@mui/material';
import BoxColore from './BoxColore';

const ColoriPrincipali = ({ colors, setColors, openPicker, setOpenPicker }) => {
  const { color1, color2, color3, gradientColor1, gradientColor2 } = colors;
  return (
    <Grid item xs={12} md={6} lg={4} my={{ xs: 1, md: 2, lg: 2 }}>
      <Typography component="p" color="main" gutterBottom>
        Colori Principali
      </Typography>
      <Grid container>
        <Grid item xs={4} md={4} lg={4}>
          <BoxColore
            color={color1}
            isOpen={openPicker === 'color1'}
            onClick={() =>
              setOpenPicker(openPicker === 'color1' ? '' : 'color1')
            }
            setColor={e => {
              setColors(e, color2, color3, gradientColor1, gradientColor2);
            }}
          />
        </Grid>
        <Grid item xs={4} md={4} lg={4}>
          <BoxColore
            color={color2}
            isOpen={openPicker === 'color2'}
            onClick={() =>
              setOpenPicker(openPicker === 'color2' ? '' : 'color2')
            }
            setColor={e => {
              setColors(color1, e, color3, gradientColor1, gradientColor2);
            }}
          />
        </Grid>
        <Grid item xs={4} md={4} lg={4}>
          <BoxColore
            color={color3}
            isOpen={openPicker === 'color3'}
            onClick={() =>
              setOpenPicker(openPicker === 'color3' ? '' : 'color3')
            }
            setColor={e => {
              setColors(color1, color2, e, gradientColor1, gradientColor2);
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ColoriPrincipali;
