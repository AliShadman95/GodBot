import * as React from 'react';
import {
  Paper,
  Typography,
  FormControl,
  useMediaQuery,
  Grid,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import SliderField from 'app/components/Fields/Slider';
import Title from '../../../Title';
import {
  SliderGestioneLivelliMapperToFe,
  SliderGestioneLivelliMapperToDb,
} from 'utils/utils';
export default function GestioneLivelli({ control, watch, defaultValues }) {
  const isNotMobile = useMediaQuery('(min-width:650px)');
  const levelMultiplierField = watch('levelMultiplier');

  return (
    <React.Fragment>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Title>Gestione XP</Title>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ marginBottom: '1em' }}>
            <Grid container>
              <Grid item xs={7} md={10}>
                {/*    <Title>Gestione XP</Title> */}
                <Typography component="p" color="main" gutterBottom>
                  Cambia la difficoltà di livellamento modificando l'XP
                  necessaria per ottenere un nuovo livello.
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
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
}
