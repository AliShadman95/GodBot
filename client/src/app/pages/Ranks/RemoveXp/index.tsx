/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Typography, CircularProgress, Box } from '@mui/material';
import AlertChanges from 'app/components/AlertChanges';
import _ from 'lodash';
import {
  selectSettings,
  selectRoles,
  selectLoadingUpdate,
  selectLoading,
} from '../../Dashboard/slice/selectors';
import { useDashboardSlice } from '../../Dashboard/slice/index';
import { useForm } from 'react-hook-form';
import RemoveXpMessage from './RemoveXpMessage';
import { useSelector, useDispatch } from 'react-redux';
import Title from 'app/components/Title';

export default function RemoveXp() {
  const dispatch = useDispatch();
  const { actions } = useDashboardSlice();
  const settings: any = useSelector(selectSettings);
  const loadingUpdate: boolean = useSelector(selectLoadingUpdate);
  const loading: boolean = useSelector(selectLoading);
  const roles: any[] = useSelector(selectRoles);
  const [thereAreChanges, setThereAreChanges] = React.useState<boolean>(false);

  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: settings?.rank,
    mode: 'onChange',
  });

  const formData: any = watch();

  React.useEffect(() => {
    if (thereAreChanges && !loadingUpdate) {
      setThereAreChanges(false);
    }
  }, [loadingUpdate]);

  React.useEffect(() => {
    setThereAreChanges(
      Object.keys(settings).length > 0 &&
        Object.keys(formData).length > 0 &&
        !_.isEqual({ ...settings.rank, ...formData }, settings?.rank),
    );
  }, [formData]);

  const onSubmit = (data: any): void => {
    dispatch(
      actions.updateSettingsAction({
        ...settings,
        rank: {
          ...settings.rank,
          ...data,
        },
      }),
    );
  };

  return (
    <React.Fragment>
      {loading || !settings || Object.keys(settings).length <= 0 ? (
        <CircularProgress />
      ) : (
        <React.Fragment>
          <div style={{ marginBottom: '3em' }}>
            <Title>Remove XP</Title>
            <Typography component="p" color="main" gutterBottom>
              Impostazioni generali del comando /removexp
            </Typography>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box marginBottom="3em">
              <RemoveXpMessage
                control={control}
                defaultValues={settings?.rank}
                roles={roles}
              />
            </Box>

            <AlertChanges
              open={thereAreChanges}
              reset={() => reset(settings?.rank)}
              setIsOpen={setThereAreChanges}
              loading={loadingUpdate}
            />
          </form>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
