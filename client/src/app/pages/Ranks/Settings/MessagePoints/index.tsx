import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Paper,
  Typography,
  FormControl,
  useMediaQuery,
  MenuItem,
  Grid,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import SelectField from '../../../../components/Fields/Select';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Input from '../../../../components/Fields/Input';
import SwitchField from 'app/components/Fields/Switch';
import Title from '../../../Title';

export default function MessagePoints({
  control,
  watch,
  defaultValues,
  textChannels,
  getValues,
  errors,
}) {
  const theme = useTheme();
  const isNotMobile = useMediaQuery('(min-width:650px)');
  const displayLevelUpMessageField = getValues('displayLevelUpMessage');

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
          {/*    <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: isNotMobile ? 450 : 550,
            }}
          > */}
          <div style={{ marginBottom: '1em' }}>
            <Grid container>
              <Grid item xs={7} md={10}>
                {/*   <Title>Livellamento</Title> */}
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
                  min={0}
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
                  min={1}
                  max={20}
                  rules={{ required: true, min: 2, max: 30 }}
                  error={errors.maxPointsMessage}
                  helperText={
                    errors.maxPointsMessage
                      ? 'TI GIURO! (Il minimo è 2 e il massimo è 30)'
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
                  min={10}
                  max={120}
                  rules={{ required: true, min: 10, max: 120 }}
                  error={errors.messagePointCooldown}
                  helperText={
                    errors.messagePointCooldown
                      ? 'TI GIURO! (Il minimo è 10 e il massimo è 120)'
                      : ''
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
