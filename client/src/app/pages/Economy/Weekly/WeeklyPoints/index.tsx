import * as React from 'react';
import {
  Typography,
  FormControl,
  Grid,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Input from 'app/components/Fields/Input';
import Title from 'app/components/Title';

export default function WeeklyPoints({
  control,
  watch,
  defaultValues,
  errors,
}) {
  const weeklyRewardMin = watch('weeklyRewardMin');

  return (
    <React.Fragment>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Title>Punti settimanali</Title>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ marginBottom: '1em' }}>
            <Grid container>
              <Grid item xs={12} md={10}>
                <Typography component="p" color="main" gutterBottom>
                  Ogni volta che un utente usa il comando /weekly, l'utente
                  potrà ricevere punti.
                </Typography>
              </Grid>
            </Grid>
          </div>
          <Divider sx={{ my: 1 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <FormControl fullWidth>
                <Input
                  id="weeklyRewardMin"
                  name="weeklyRewardMin"
                  label="Punti minimi settimanali"
                  margin="normal"
                  control={control}
                  defaultValue={defaultValues.weeklyRewardMin}
                  type="number"
                  min={80}
                  max={120}
                  rules={{ required: true, min: 80, max: 120 }}
                  error={errors.weeklyRewardMin}
                  helperText={
                    errors.weeklyRewardMin
                      ? 'TI GIURO! (Il minimo è 80 e il massimo è 120)'
                      : ''
                  }
                />
                <Input
                  id="weeklyRewardMax"
                  name="weeklyRewardMax"
                  label="Punti massimi settimanali"
                  margin="normal"
                  control={control}
                  defaultValue={defaultValues.weeklyRewardMax}
                  type="number"
                  min={parseInt(weeklyRewardMin) + 1}
                  max={150}
                  rules={{
                    required: true,
                    min: parseInt(weeklyRewardMin) + 1,
                    max: 150,
                  }}
                  error={errors.weeklyRewardMax}
                  helperText={
                    errors.weeklyRewardMax
                      ? `TI GIURO! (Il minimo è ${
                          parseInt(weeklyRewardMin) + 1
                        } e il massimo è 150)`
                      : ''
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
}
