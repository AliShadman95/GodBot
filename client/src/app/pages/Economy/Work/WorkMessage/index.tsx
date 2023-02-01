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

export default function WorkMessage({
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
          <Title>Messaggio comando /work</Title>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ marginBottom: '1em' }}>
            <Grid container>
              <Grid item xs={7} md={10}>
                <Typography component="p" color="main" gutterBottom>
                  Ogni volta che un utente comincia a lavorare, il bot potrà
                  mandare un messaggio personalizzato.
                </Typography>
              </Grid>
            </Grid>
          </div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <FormControl fullWidth>
                <Input
                  id="workInProgressMessage"
                  name="workInProgressMessage"
                  label="Messaggio"
                  margin="normal"
                  control={control}
                  defaultValue={defaultValues.workInProgressMessage}
                  rules={{ required: true }}
                  rows={4}
                  multiline
                  helperText={
                    "Usare {user}, {hours} e {mestiere} per inserire il nome dell'utente, le ore totali e il mestiere."
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
          <div style={{ marginBottom: '1em', marginTop: '3em' }}>
            <Grid container>
              <Grid item xs={7} md={10}>
                <Typography component="p" color="main" gutterBottom>
                  Ogni volta che un utente finisce di lavorare, il bot potrà
                  mandare un messaggio personalizzato.
                </Typography>
              </Grid>
            </Grid>
          </div>
          <Divider sx={{ my: 1 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <FormControl fullWidth>
                <Input
                  id="workDoneMessage"
                  name="workDoneMessage"
                  label="Messaggio"
                  margin="normal"
                  control={control}
                  defaultValue={defaultValues.workDoneMessage}
                  rules={{ required: true }}
                  rows={4}
                  multiline
                  helperText={
                    "Usare {user}, {coins} e {totalCoins} per inserire il nome dell'utente, le monete ricevute e le monete totali."
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
