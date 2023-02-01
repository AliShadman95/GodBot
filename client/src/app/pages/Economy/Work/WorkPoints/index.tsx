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

export default function WorkPoints({ control, watch, defaultValues, errors }) {
  const workRewardMin = watch('workRewardMin');

  return (
    <React.Fragment>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Title>Punti lavoro</Title>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ marginBottom: '1em' }}>
            <Grid container>
              <Grid item xs={12} md={10}>
                <Typography component="p" color="main" gutterBottom>
                  Ogni volta che un utente usa il comando /work e finisce di
                  lavorare, l'utente potrà ricevere monete.
                </Typography>
              </Grid>
            </Grid>
          </div>
          <Divider sx={{ my: 1 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <FormControl fullWidth>
                <Input
                  id="workRewardMin"
                  name="workRewardMin"
                  label="Punti minimi giornalieri"
                  margin="normal"
                  control={control}
                  defaultValue={defaultValues.workRewardMin}
                  type="number"
                  min={10}
                  max={30}
                  rules={{ required: true, min: 10, max: 30 }}
                  error={errors.workRewardMin}
                  helperText={
                    errors.workRewardMin
                      ? 'TI GIURO! (Il minimo è 10 e il massimo è 30)'
                      : ''
                  }
                />
                <Input
                  id="workRewardMax"
                  name="workRewardMax"
                  label="Punti massimi giornalieri"
                  margin="normal"
                  control={control}
                  defaultValue={defaultValues.workRewardMax}
                  type="number"
                  min={parseInt(workRewardMin) + 1}
                  max={40}
                  rules={{
                    required: true,
                    min: parseInt(workRewardMin) + 1,
                    max: 40,
                  }}
                  error={errors.workRewardMax}
                  helperText={
                    errors.workRewardMax
                      ? `TI GIURO! (Il minimo è ${
                          parseInt(workRewardMin) + 1
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
