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

export default function DailyMessage({
  control,
  defaultValues,
}): React.ReactElement {
  return (
    <React.Fragment>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Title>Messaggio comando /daily</Title>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ marginBottom: '1em' }}>
            <Grid container>
              <Grid item xs={7} md={10}>
                <Typography component="p" color="main" gutterBottom>
                  Ogni volta che un utente riceve la ricompensa giornaliera, il
                  bot potrà mandare un messaggio personalizzato.
                </Typography>
              </Grid>
            </Grid>
          </div>
          <Divider sx={{ my: 1 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <FormControl fullWidth>
                <Input
                  id="dailyRewardMessage"
                  name="dailyRewardMessage"
                  label="Messaggio"
                  margin="normal"
                  control={control}
                  defaultValue={defaultValues.dailyRewardMessage}
                  rules={{ required: true }}
                  rows={4}
                  multiline
                  helperText={
                    "Usare {user}, {coins} e {coinsTotale} per inserire il nome dell'utente, le monete ricevute e le monete totali."
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
