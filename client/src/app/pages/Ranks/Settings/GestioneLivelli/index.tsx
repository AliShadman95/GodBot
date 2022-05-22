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
} from '@mui/material';
import SelectField from '../../../../components/Fields/Select';
import Input from '../../../../components/Fields/Input';
import SwitchField from 'app/components/Fields/Switch';
import SliderField from 'app/components/Fields/Slider';
import Title from '../../../Title';
import {
  SliderGestioneLivelliMapperToFe,
  SliderGestioneLivelliMapperToDb,
} from 'utils/utils';
export default function GestioneLivelli({
  control,
  watch,
  defaultValues,
  textChannels,
  getValues,
}) {
  const isNotMobile = useMediaQuery('(min-width:650px)');
  const levelMultiplierField = watch('levelMultiplier');

  console.log(levelMultiplierField);

  return (
    <React.Fragment>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: isNotMobile ? 220 : 350,
        }}
      >
        <div style={{ marginBottom: '2em' }}>
          <Grid container>
            <Grid item xs={7} md={10}>
              <Title>Gestione XP</Title>
              <Typography component="p" color="main" gutterBottom>
                Cambia la difficoltà di livellamento modificando l'XP necessaria
                per ottenere un nuovo livello.
              </Typography>
            </Grid>
          </Grid>
        </div>
        <Divider sx={{ my: 1 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <FormControl fullWidth sx={{ marginTop: '1em' }}>
              <SliderField
                name="levelMultiplier"
                id="levelMultiplier"
                defaultValue={SliderGestioneLivelliMapperToFe(
                  defaultValues?.levelMultiplier,
                )}
                control={control}
                feMapper={SliderGestioneLivelliMapperToFe}
                dbMapper={SliderGestioneLivelliMapperToDb}
                marks={[
                  {
                    value: 1,
                    label: 'x0.25',
                  },
                  {
                    value: 2,
                    label: 'x0.50',
                  },
                  {
                    value: 3,
                    label: 'x0.75',
                  },
                  {
                    value: 4,
                    label: 'x1',
                  },
                  {
                    value: 5,
                    label: 'x1.5',
                  },
                  {
                    value: 6,
                    label: 'x2',
                  },
                  {
                    value: 7,
                    label: 'x2.5',
                  },
                  {
                    value: 8,
                    label: 'x3',
                  },
                ]}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
}
