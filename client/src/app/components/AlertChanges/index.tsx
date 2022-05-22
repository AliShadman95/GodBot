import * as React from 'react';

import {
  Collapse,
  Box,
  Button,
  Alert,
  AlertTitle,
  CircularProgress,
  Grid,
} from '@mui/material';

export default function AlertChanges({ open, setIsOpen, reset, loading }) {
  return (
    <Box
      sx={{
        position: 'sticky',
        bottom: 0,
        marginTop: '2em',
        marginBottom: '2em',
        zIndex: 434343,
      }}
    >
      <Collapse in={open}>
        <Alert
          severity="info"
          action={
            <Grid container>
              <Grid item>
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
              </Grid>
              <Grid item>
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
              </Grid>
            </Grid>
          }
        >
          <AlertTitle>Modifiche rilevate</AlertTitle>
          Salva o cancella.
        </Alert>
      </Collapse>
    </Box>
  );
}
