import * as React from 'react';
import {
  Typography,
  FormControl,
  Grid,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  MenuItem,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Input from 'app/components/Fields/Input';
import Title from 'app/components/Title';
import SelectField from 'app/components/Fields/Select';

export default function VoicePoints({
  control,
  watch,
  defaultValues,
  voiceChannels,
  getValues,
  errors,
}) {
  return (
    <React.Fragment>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Title>Punti chat vocale</Title>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ marginBottom: '1em' }}>
            <Grid container>
              <Grid item xs={7} md={10}>
                <Typography component="p" color="main" gutterBottom>
                  Ogni volta che un utente esce da una chat vocale, gli verranno
                  assegnati dei punti.
                </Typography>
              </Grid>
            </Grid>
          </div>
          <Divider sx={{ my: 1 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <FormControl fullWidth>
                <Input
                  id="minPointsVoiceChannel"
                  name="minPointsVoiceChannel"
                  label="Punti minimi ogni 10 minuti"
                  margin="normal"
                  control={control}
                  defaultValue={defaultValues.minPointsVoiceChannel}
                  type="number"
                  min={0}
                  max={10}
                  rules={{ required: true, min: 1, max: 5 }}
                  error={errors.minPointsVoiceChannel}
                  helperText={
                    errors.minPointsVoiceChannel
                      ? 'TI GIURO! (Il minimo è 1 e il massimo è 5)'
                      : ''
                  }
                />
                <Input
                  id="maxPointsVoiceChannel"
                  name="maxPointsVoiceChannel"
                  label="Punti massimi ogni 10 minuti"
                  margin="normal"
                  control={control}
                  defaultValue={defaultValues.maxPointsVoiceChannel}
                  type="number"
                  min={1}
                  max={20}
                  rules={{ required: true, min: 2, max: 10 }}
                  error={errors.maxPointsVoiceChannel}
                  helperText={
                    errors.maxPointsVoiceChannel
                      ? 'TI GIURO! (Il minimo è 2 e il massimo è 10)'
                      : ''
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <FormControl fullWidth>
                <SelectField
                  name="afkChannelId"
                  labelid="afkChannelId"
                  id="afkChannelId"
                  variant="outlined"
                  margin="normal"
                  label="Canale AFK"
                  defaultValue={defaultValues?.afkChannelId}
                  control={control}
                  rules={{ required: true }}
                  required
                >
                  {voiceChannels.map(channel => (
                    <MenuItem key={channel.id} value={channel.id}>
                      {channel.name}
                    </MenuItem>
                  ))}
                </SelectField>
              </FormControl>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
}
