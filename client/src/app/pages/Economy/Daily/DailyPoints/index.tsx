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

export default function DailyPoints({ control, watch, defaultValues, errors }) {
  const dailyRewardMin = watch('dailyRewardMin');

  return (
    <React.Fragment>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Title>Punti giornalieri</Title>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ marginBottom: '1em' }}>
            <Grid container>
              <Grid item xs={12} md={10}>
                <Typography component="p" color="main" gutterBottom>
                  Ogni volta che un utente usa il comando /daily, l'utente potrà
                  ricevere monete.
                </Typography>
              </Grid>
            </Grid>
          </div>
          <Divider sx={{ my: 1 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <FormControl fullWidth>
                <Input
                  id="dailyRewardMin"
                  name="dailyRewardMin"
                  label="Punti minimi giornalieri"
                  margin="normal"
                  control={control}
                  defaultValue={defaultValues.dailyRewardMin}
                  type="number"
                  min={10}
                  max={30}
                  rules={{ required: true, min: 10, max: 30 }}
                  error={errors.dailyRewardMin}
                  helperText={
                    errors.dailyRewardMin
                      ? 'TI GIURO! (Il minimo è 10 e il massimo è 30)'
                      : ''
                  }
                />
                <Input
                  id="dailyRewardMax"
                  name="dailyRewardMax"
                  label="Punti massimi giornalieri"
                  margin="normal"
                  control={control}
                  defaultValue={defaultValues.dailyRewardMax}
                  type="number"
                  min={parseInt(dailyRewardMin) + 1}
                  max={40}
                  rules={{
                    required: true,
                    min: parseInt(dailyRewardMin) + 1,
                    max: 40,
                  }}
                  error={errors.dailyRewardMax}
                  helperText={
                    errors.dailyRewardMax
                      ? `TI GIURO! (Il minimo è ${
                          parseInt(dailyRewardMin) + 1
                        } e il massimo è 40)`
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
