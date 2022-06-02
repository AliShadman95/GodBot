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

export default function MessagePoints({
  control,
  watch,
  defaultValues,
  errors,
}) {
  const minPointsMessage = watch('minPointsMessage');

  return (
    <React.Fragment>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Title>Punti chat testuale</Title>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ marginBottom: '1em' }}>
            <Grid container>
              <Grid item xs={7} md={10}>
                <Typography component="p" color="main" gutterBottom>
                  Ogni volta che un utente scrive un messaggio, l'utente potrà
                  ricevere punti.
                </Typography>
              </Grid>
            </Grid>
          </div>
          <Divider sx={{ my: 1 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <FormControl fullWidth>
                <Input
                  id="minPointsMessage"
                  name="minPointsMessage"
                  label="Punti minimi per messaggio"
                  margin="normal"
                  control={control}
                  defaultValue={defaultValues.minPointsMessage}
                  type="number"
                  min={1}
                  max={10}
                  rules={{ required: true, min: 1, max: 10 }}
                  error={errors.minPointsMessage}
                  helperText={
                    errors.minPointsMessage
                      ? 'TI GIURO! (Il minimo è 1 e il massimo è 10)'
                      : ''
                  }
                />
                <Input
                  id="maxPointsMessage"
                  name="maxPointsMessage"
                  label="Punti massimi per messaggio"
                  margin="normal"
                  control={control}
                  defaultValue={defaultValues.maxPointsMessage}
                  type="number"
                  min={parseInt(minPointsMessage) + 1}
                  max={30}
                  rules={{
                    required: true,
                    min: parseInt(minPointsMessage) + 1,
                    max: 30,
                  }}
                  error={errors.maxPointsMessage}
                  helperText={
                    errors.maxPointsMessage
                      ? `TI GIURO! (Il minimo è ${
                          parseInt(minPointsMessage) + 1
                        } e il massimo è 30)`
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
                <Input
                  id="messagePointCooldown"
                  name="messagePointCooldown"
                  label="Cooldown in secondi"
                  margin="normal"
                  control={control}
                  defaultValue={defaultValues.messagePointCooldown}
                  type="number"
                  min={60}
                  max={300}
                  rules={{ required: true, min: 60, max: 300 }}
                  error={errors.messagePointCooldown}
                  helperText={
                    errors.messagePointCooldown
                      ? 'TI GIURO! (Il minimo è 60 e il massimo è 300)'
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
