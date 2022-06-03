import * as React from 'react';
import { Collapse, Box, Alert, IconButton, Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { selectAlert } from './slice/selectors';
import { useAlertSlice } from './slice/index';
import ClearIcon from '@mui/icons-material/Clear';

export function properAlertByStatus(status, contextMessage) {
  if (/^20/.test(status)) {
    return { color: 'success', message: contextMessage };
  }
  if (status === 404) {
    return { color: 'warning', message: 'notFound' };
  }
  if (status === 409) {
    return { color: 'danger', message: contextMessage };
  }
  if (status === 400) {
    return { color: 'danger', message: contextMessage };
  }
  if (status === 422) {
    return { color: 'danger', message: contextMessage };
  }
  return {
    color: 'danger',
    message:
      "Non è stato possibile eseguire l'operazione, riprovare più tardi. Se il problema persiste contattare un amministratore",
  };
}

export default function AlertInfo() {
  const { showAlert, message } = useSelector(selectAlert);
  const { actions } = useAlertSlice();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (showAlert) {
      const timeout = setTimeout(() => {
        dispatch(actions.hideAlert());
      }, 12000);
      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [showAlert]);

  return (
    <Box>
      <Collapse in={showAlert}>
        <Alert
          severity="error"
          id="alert-error"
          action={
            <Grid container>
              <Grid item>
                <IconButton
                  color="info"
                  aria-label="clear"
                  component="span"
                  onClick={() => {
                    dispatch(actions.hideAlert());
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </Grid>
            </Grid>
          }
        >
          {message || ''}
        </Alert>
      </Collapse>
    </Box>
  );
}
