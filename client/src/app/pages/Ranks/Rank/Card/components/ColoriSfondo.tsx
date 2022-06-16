import { Grid, Typography } from '@mui/material';
import BoxColore from './BoxColore';

const ColoriSfondo = ({
  colors,
  setColors,
  openPicker,
  setOpenPicker,
  isImageField,
  isGradientField,
}) => {
  const { color1, color2, color3, gradientColor1, gradientColor2 } = colors;

  return (
    <Grid item xs={12} md={5} lg={3} my={{ xs: 1, md: 1, lg: 2 }}>
      <Typography component="p" color="main" gutterBottom>
        Colori Sfondo
      </Typography>
      <Grid container>
        <Grid item xs={4} md={4} lg={6}>
          <BoxColore
            color={gradientColor1}
            isOpen={openPicker === 'gradientColor1'}
            onClick={() =>
              !isImageField &&
              setOpenPicker(
                openPicker === 'gradientColor1' ? '' : 'gradientColor1',
              )
            }
            setColor={e => {
              setColors(color1, color2, color3, e, gradientColor2);
            }}
            disabled={isImageField}
          />
        </Grid>
        <Grid item xs={4} md={4} lg={6}>
          <BoxColore
            color={gradientColor2}
            isOpen={openPicker === 'gradientColor2'}
            onClick={() =>
              !isImageField &&
              isGradientField &&
              setOpenPicker(
                openPicker === 'gradientColor2' ? '' : 'gradientColor2',
              )
            }
            setColor={e => {
              setColors(color1, color2, color3, gradientColor1, e);
            }}
            disabled={isImageField || !isGradientField}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ColoriSfondo;
