import * as React from 'react';
import {
  Typography,
  FormControl,
  Grid,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  CircularProgress,
  Button,
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoadingUpdate } from 'app/pages/Dashboard/slice/selectors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { dashboardActions } from 'app/pages/Dashboard/slice';
import Input from 'app/components/Fields/Input';
import Title from 'app/components/Title';
import { alertActions } from 'app/pages/Alert/slice';

export default function CoinName({
  control,
  defaultValues,
}): React.ReactElement {
  const dispatch = useDispatch();
  const loadingUpdate = useSelector(selectLoadingUpdate);

  const [file, setFile] = React.useState<File | null | undefined>(null);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const uploadImage = () => {
    console.log('CONFIRMING');
    dispatch(
      dashboardActions.uploadCoinIconAction({
        file,
      }),
    );
    handleClose();
  };

  return (
    <React.Fragment>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Title>Nome moneta</Title>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ marginBottom: '1em' }}>
            <Grid container>
              <Grid item xs={7} md={10}>
                <Typography component="p" color="main" gutterBottom>
                  Qui è possibile scegliere il nome e l'icona della moneta per
                  il server.
                </Typography>
              </Grid>
            </Grid>
          </div>
          <Divider sx={{ my: 1 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={2} lg={2}>
              <Paper
                sx={{
                  backgroundColor: '#262934',
                  width: '10em',
                  height: '10em',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  variant="square"
                  sx={{ height: '70px', width: '70px' }}
                  src={defaultValues.coinIcon}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <Grid item xs={12} md={12} lg={12}>
                {' '}
                <FormControl fullWidth>
                  <Input
                    id="coinName"
                    name="coinName"
                    label="Nome moneta"
                    margin="normal"
                    control={control}
                    defaultValue={defaultValues.coinName}
                    rules={{ required: true }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Button
                  variant="contained"
                  component="label"
                  disabled={loadingUpdate}
                >
                  {loadingUpdate ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : (
                    'Upload ICONA'
                  )}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={e => {
                      if (e?.target?.files) {
                        const file = e.target.files[0];

                        if (file.size > 256000) {
                          console.log('SHOWING ALERT');
                          dispatch(
                            alertActions.showAlert(
                              'La dimensione del file supera i 256kb',
                            ),
                          );
                          return;
                        }

                        setFile(e.target.files[0]);
                        handleOpen();
                      }
                    }}
                  />
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">Conferma</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      La nuova icona verrà salvata subito e sostituirà
                      definitivamente quella precedente, continuare?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Annulla</Button>
                    <Button onClick={uploadImage} autoFocus>
                      Conferma
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
}
