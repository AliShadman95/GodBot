import { Grid, Typography } from '@mui/material';
import SwitchField from 'app/components/Fields/Switch';

const Header = ({ defaultValues, control, isImageField, isGradientField }) => {
  return (
    <div style={{ marginBottom: '2em' }}>
      <Grid container>
        <Grid item xs={12} md={12} lg={8}>
          <Typography component="p" color="main" gutterBottom>
            Puoi customizzare la card del rank. Ogni membro del server avrà
            questa.
          </Typography>
        </Grid>
        <Grid item xs={6} md={6} lg={2}>
          <SwitchField
            name="isImage"
            labelid="isImage"
            id="isImage"
            margin="normal"
            variant="outlined"
            label={isImageField ? 'Immagine' : 'Senza immagine'}
            defaultValue={defaultValues.isImage}
            control={control}
          />
        </Grid>
        <Grid item xs={6} md={6} lg={2}>
          <SwitchField
            name="isGradient"
            labelid="isGradient"
            id="isGradient"
            margin="normal"
            variant="outlined"
            label={isGradientField ? 'Sfondo sfumato' : 'Sfondo non sfumato'}
            defaultValue={defaultValues.isGradient}
            control={control}
            disabled={isImageField}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
