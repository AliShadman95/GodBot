import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Paper,
  Typography,
  FormControl,
  useMediaQuery,
  MenuItem,
  Grid,
  Divider,
} from '@mui/material';
import SelectField from '../../../../components/Fields/Select';
import Input from '../../../../components/Fields/Input';
import SwitchField from 'app/components/Fields/Switch';
import Title from '../../../Title';

export default function LevelUpMessage({
  control,
  watch,
  defaultValues,
  textChannels,
  getValues,
}) {
  const theme = useTheme();
  const isNotMobile = useMediaQuery('(min-width:650px)');
  const displayLevelUpMessageField = getValues('displayLevelUpMessage');

  return (
    <React.Fragment>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: isNotMobile ? 450 : 550,
        }}
      >
        <div style={{ marginBottom: '2em' }}>
          <Grid container>
            <Grid item xs={7} md={10}>
              <Title>Livellamento</Title>
              <Typography component="p" color="main" gutterBottom>
                Ogni volta che un utente raggiunge un nuovo livello, il bot
                potrà mandare un messaggio personalizzato.
              </Typography>
            </Grid>

            <Grid item xs={5} md={2}>
              <SwitchField
                name="displayLevelUpMessage"
                labelid="displayLevelUpMessage"
                id="displayLevelUpMessage"
                variant="outlined"
                margin="normal"
                label={displayLevelUpMessageField ? 'Attivo' : 'Disattivo'}
                defaultValue={defaultValues.displayLevelUpMessage}
                control={control}
              />
            </Grid>
          </Grid>
        </div>
        <Divider sx={{ my: 1 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <FormControl fullWidth>
              <SelectField
                name="levelUpChannelId"
                labelid="levelUpChannelId"
                id="levelUpChannelId"
                variant="outlined"
                margin="normal"
                label="Canale"
                defaultValue={defaultValues?.levelUpChannelId}
                control={control}
                rules={{ required: true }}
                required
              >
                {textChannels.map(channel => (
                  <MenuItem key={channel.id} value={channel.id}>
                    # {channel.name}
                  </MenuItem>
                ))}
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
