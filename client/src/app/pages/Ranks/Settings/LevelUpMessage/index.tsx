import * as React from 'react';
import {
  Typography,
  FormControl,
  MenuItem,
  Grid,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import SelectField from 'app/components/Fields/Select';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Input from 'app/components/Fields/Input';
import SwitchField from 'app/components/Fields/Switch';
import Title from 'app/components/Title';

export default function LevelUpMessage({
  control,
  defaultValues,
  textChannels,
  getValues,
}): React.ReactElement {
  const displayLevelUpMessageField =
    getValues('displayLevelUpMessage') || defaultValues?.displayLevelUpMessage;

  return (
    <React.Fragment>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Title>Messaggio nuovo livello</Title>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ marginBottom: '1em' }}>
            <Grid container>
              <Grid item xs={7} md={10}>
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
                  /* margin="normal" */
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
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
}
