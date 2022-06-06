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
  Tooltip,
} from '@mui/material';
import SelectField from 'app/components/Fields/Select';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Input from 'app/components/Fields/Input';
import Title from 'app/components/Title';
import { isAdmin as isAdminFunc } from 'utils/api';

export default function GiveXpMessage({ control, defaultValues, roles }) {
  const isAdmin = isAdminFunc();

  return (
    <React.Fragment>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Title>Messaggio comando /givexp</Title>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ marginBottom: '1em' }}>
            <Grid container>
              <Grid item xs={12} md={10}>
                <Typography component="p" color="main" gutterBottom>
                  Ogni volta che un utente usa il comando /givexp, il bot potrà
                  mandare un messaggio personalizzato.
                </Typography>
              </Grid>
            </Grid>
          </div>
          <Divider sx={{ my: 1 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <FormControl fullWidth>
                <SelectField
                  name="giveXpEnabledRoles"
                  labelid="giveXpEnabledRoles"
                  id="giveXpEnabledRoles"
                  variant="outlined"
                  margin="normal"
                  label="Ruoli"
                  defaultValue={defaultValues?.giveXpEnabledRoles}
                  control={control}
                  multiple
                  disabled={!isAdmin}
                >
                  {roles.map(role => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </SelectField>

                <Input
                  id="giveXpMessage"
                  name="giveXpMessage"
                  label="Messaggio"
                  margin="normal"
                  control={control}
                  defaultValue={defaultValues.giveXpMessage}
                  rules={{ required: true }}
                  rows={4}
                  multiline
                  helperText={
                    "Usare {user} e {punti} per inserire il nome dell'utente e il punteggio"
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
          {/*   </Paper> */}
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
}
