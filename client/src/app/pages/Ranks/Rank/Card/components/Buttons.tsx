import { Grid, Box, Button, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectLoadingUpdate } from 'app/pages/Dashboard/slice/selectors';

const Buttons = ({
  thereAreChanges,
  defaultValues,
  reset,
  setColors,
  setImagePosition,
  setThereAreChanges,
  formState,
}) => {
  const loadingUpdate = useSelector(selectLoadingUpdate);

  return (
    <Grid
      item
      xs={12}
      md={4}
      lg={2}
      my={{ xs: 0, md: 0, lg: 2 }}
      display="flex"
    >
      <Box display="flex" alignItems="flex-end" maxHeight={'7em'}>
        <Button
          color="secondary"
          size="small"
          variant="contained"
          sx={{ margin: '0.5em' }}
          disabled={!thereAreChanges}
          onClick={() => {
            reset(defaultValues);

            setColors(
              defaultValues.color1 || 'white',
              defaultValues.color2 || 'white',
              defaultValues.color3 || 'white',
              defaultValues.gradientColor1 || 'white',
              defaultValues.gradientColor2 || 'white',
            );

            setImagePosition(
              defaultValues.sx || 0,
              defaultValues.sy || 0,
              defaultValues.sWidth || 0,
              defaultValues.sHeight || 0,
              defaultValues.dx || 0,
              defaultValues.dy || 0,
              defaultValues.dWidth || 0,
              defaultValues.dHeight || 0,
            );
            setThereAreChanges(false);
          }}
        >
          Cancella
        </Button>
        <Button
          color="primary"
          size="small"
          variant="contained"
          sx={{ margin: '0.5em' }}
          type="submit"
          disabled={
            !thereAreChanges || Object.keys(formState.errors).length > 0
          }
        >
          {loadingUpdate ? (
            <CircularProgress color="inherit" size={20} />
          ) : (
            'Salva'
          )}
        </Button>
      </Box>
    </Grid>
  );
};

export default Buttons;
