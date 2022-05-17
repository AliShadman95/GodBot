import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import SelectField from '../../../../components/Fields/Select';
import Input from '../../../../components/Fields/Input';

import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Title from '../../../Title';

export default function LevelUpMessage({ control, watch, defaultValues }) {
  const theme = useTheme();

  const channel = watch('channel');

  console.log(channel);

  return (
    <React.Fragment>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 400,
        }}
      >
        <div style={{ marginBottom: '2em' }}>
          <Title>Livellamento</Title>
          <Typography component="p" color="main" gutterBottom>
            Ogni volta che un utente raggiunge un nuovo livello, il bot potrà
            mandare un messaggio personalizzato.
          </Typography>
        </div>

        <Grid container spacing={3}>
          <Grid item xs={6} md={6} lg={6}>
            <FormControl fullWidth>
              <SelectField
                name="channel"
                labelid="demo-simple-select-label"
                id="demo-simple-select"
                variant="outlined"
                margin="normal"
                label="Canale"
                defaultValue={10}
                control={control}
                rules={{ required: true }}
                required
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </SelectField>

              <Input
                id="levelUpMessage"
                name="levelUpMessage"
                label="Messaggio"
                margin="normal"
                control={control}
                defaultValue={defaultValues.levelUpMessage}
                rules={{ required: true }}
                rows={4}
                multiline
                helperText={
                  "Usare {user} e {livello} per inserire il nome dell'utente e il livello raggiunto"
                }
              />
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
}
