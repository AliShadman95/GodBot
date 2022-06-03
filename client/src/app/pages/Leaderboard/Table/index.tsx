import React from 'react';
import { Paper, Grid, CircularProgress } from '@mui/material';
import { DataGrid, itIT } from '@mui/x-data-grid';

import { rows, columns } from '../columns';

export default function Table({
  loading,
  isAdmin,
  users,
  settings,
  selectionModel,
  setSelectionModel,
}) {
  return (
    <React.Fragment>
      {' '}
      {!loading ? (
        <Paper sx={{ marginLeft: '2em', marginRight: '2em' }}>
          <div
            style={{
              height: 400,
              width: '100%',
              marginTop: isAdmin ? '4em' : '7em',
            }}
          >
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flexGrow: 1 }}>
                <DataGrid
                  rows={rows(users, settings)}
                  columns={columns(isAdmin)}
                  checkboxSelection={isAdmin}
                  onSelectionModelChange={newSelectionModel => {
                    setSelectionModel(newSelectionModel);
                  }}
                  selectionModel={selectionModel}
                  localeText={
                    itIT.components.MuiDataGrid.defaultProps.localeText
                  }
                  sx={{
                    '.MuiDataGrid-columnSeparator': {
                      display: 'none',
                    },
                    '&.MuiDataGrid-root': {
                      border: 'none',
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </Paper>
      ) : (
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            minHeight: '100vh',
            alignItems: 'center',
          }}
        >
          <Grid item>
            {' '}
            <CircularProgress size={80} />
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}
