import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  ButtonGroup,
} from '@mui/material';
import { isAdmin as isAdminFunc } from 'utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { useLeaderboardSlice } from './slice';
import {
  selectLeaderboardLoading,
  selectLeaderboardSettings,
  selectLeaderboardUsers,
} from './slice/selectors';
import SecondaryNavBar from '../SecondaryNavBar';
import Table from './Table';
import { GridSelectionModel } from '@mui/x-data-grid';

export default function Leaderboard() {
  const dispatch = useDispatch();
  const { actions } = useLeaderboardSlice();

  useEffect(() => {
    dispatch(actions.getSettingsAction());
    dispatch(actions.getUsersAction());
  }, []);

  const isAdmin = isAdminFunc();
  const users = useSelector(selectLeaderboardUsers);
  const settings = useSelector(selectLeaderboardSettings);
  const loading = useSelector(selectLeaderboardLoading);

  // 0 = none, 1 = Some, 2 = All
  const [openDialog, setOpenDialog] = React.useState('0');

  const handleClickOpenDialog = value => {
    setOpenDialog(value);
  };

  const handleCloseDialog = () => {
    setOpenDialog('0');
  };
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);

  return (
    <React.Fragment>
      <SecondaryNavBar />
      {isAdmin && (
        <Box
          sx={{
            flexGrow: 0,
            marginTop: '3em',
            marginLeft: '2em',
            marginRight: '2em',
          }}
        >
          <ButtonGroup
            color="secondary"
            variant="text"
            aria-label="text button group"
          >
            <Button
              onClick={() => handleClickOpenDialog('2')}
              color="secondary"
            >
              Reset tutti gli xp
            </Button>
            <Button
              onClick={() => handleClickOpenDialog('1')}
              disabled={selectionModel.length <= 0}
              color="secondary"
            >
              Reset gli xp selezioanti
            </Button>
          </ButtonGroup>
        </Box>
      )}

      <Table
        settings={settings}
        loading={loading}
        setSelectionModel={setSelectionModel}
        selectionModel={selectionModel}
        users={users}
        isAdmin={isAdmin}
      />

      <Dialog
        open={openDialog !== '0'}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Conferma</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Sei sicuro di volere resettare l'exp?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Annulla
          </Button>
          <Button
            onClick={() => {
              openDialog === '1'
                ? dispatch(actions.resetRanksAction(selectionModel))
                : dispatch(actions.resetAllRanksAction());
              handleCloseDialog();
            }}
            autoFocus
          >
            Conferma
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
