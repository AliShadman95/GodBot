import * as React from 'react';

import {
  Collapse,
  Box,
  Button,
  Alert,
  AlertTitle,
  CircularProgress,
} from '@mui/material';

export default function AlertChanges({ open, setIsOpen, reset, loading }) {
  return (
    /*  <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        minWidth: '78%',
        marginBottom: '1em',
      }}
      elevation={3}
    >
      <Alert
        severity="info"
        action={
          <React.Fragment>
            <Button
              color="secondary"
              size="small"
              variant="contained"
              sx={{ marginRight: '1em' }}
            >
              Cancella
            </Button>
            <Button color="primary" size="small" variant="contained">
              Salva
            </Button>
          </React.Fragment>
        }
      >
        <AlertTitle>Modifiche rilevate</AlertTitle>
        Salva o cancella.
      </Alert>
    </Paper> */

    <Box
      sx={{
        position: 'sticky',
        bottom: 0,
        marginTop: '2em',
        marginBottom: '2em',
      }}
    >
      <Collapse in={open}>
        <Alert
          severity="info"
          action={
            <React.Fragment>
              <Button
                color="secondary"
                size="small"
                variant="contained"
                sx={{ margin: '1em' }}
                onClick={() => {
                  reset();
                  setIsOpen(false);
                }}
              >
                Cancella
              </Button>
              <Button
                color="primary"
                size="small"
                variant="contained"
                sx={{ margin: '1em' }}
                type="submit"
              >
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  'Salva'
                )}
              </Button>
            </React.Fragment>
          }
        >
          <AlertTitle>Modifiche rilevate</AlertTitle>
          Salva o cancella.
        </Alert>
      </Collapse>
    </Box>
  );
}
