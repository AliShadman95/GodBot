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
import { isAdmin as isAdminFunc } from 'utils/api';

export default function BotInfo({
  control,
  defaultValues,
  textChannels,
  getValues,
}): React.ReactElement {
  const displayRestartMessageField = getValues('displayRestartMessage');

  const isAdmin = isAdminFunc();

  return (
    <React.Fragment>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Title>Bot Info</Title>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ marginBottom: '1em' }}>
            <Grid container>
              <Grid item xs={7} md={10}>
                <Typography component="p" color="main" gutterBottom>
                  Ogni volta che il bot si riavvia, potrà mandare un messaggio
                  personalizzato.
                </Typography>
              </Grid>

              <Grid item xs={5} md={2}>
                <SwitchField
                  name="displayRestartMessage"
                  labelid="displayRestartMessage"
                  id="displayRestartMessage"
                  variant="outlined"
                  /* margin="normal" */
                  label={displayRestartMessageField ? 'Attivo' : 'Disattivo'}
                  defaultValue={defaultValues.displayRestartMessage}
                  control={control}
                  disabled={!isAdmin}
                />
              </Grid>
            </Grid>
          </div>
          <Divider sx={{ my: 1 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <FormControl fullWidth>
                <SelectField
                  name="botInfoChannelId"
                  labelid="botInfoChannelId"
                  id="botInfoChannelId"
                  variant="outlined"
                  margin="normal"
                  label="Canale"
                  defaultValue={defaultValues?.botInfoChannelId}
                  control={control}
                  rules={{ required: true }}
                  required
                  disabled={!isAdmin}
                >
                  {textChannels.map(channel => (
                    <MenuItem key={channel.id} value={channel.id}>
                      # {channel.name}
                    </MenuItem>
                  ))}
                </SelectField>

                <Input
                  id="botRestartMessage"
                  name="botRestartMessage"
                  label="Messaggio riavvio bot"
                  margin="normal"
                  control={control}
                  defaultValue={defaultValues.botRestartMessage}
                  rules={{ required: true }}
                  rows={4}
                  multiline
                  disabled={!isAdmin}
                />
              </FormControl>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
}
