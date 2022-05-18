import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Typography, CircularProgress } from '@mui/material';
import AlertChanges from 'app/components/AlertChanges';
import _ from 'lodash';
import {
  selectSettings,
  selectTextChannels,
  selectLoadingUpdate,
  selectLoading,
} from '../../Dashboard/slice/selectors';
import { useDashboardSlice } from '../../Dashboard/slice/index';
import { useForm } from 'react-hook-form';
import LevelUpMessage from './LevelUpMessage';
import { useSelector, useDispatch } from 'react-redux';

import Title from '../../Title';

export default function Settings() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { actions } = useDashboardSlice();

  const settings = useSelector(selectSettings);
  const loadingUpdate = useSelector(selectLoadingUpdate);
  const loading = useSelector(selectLoading);

  const textChannels = useSelector(selectTextChannels);
  const [thereAreChanges, setThereAreChanges] = React.useState(false);

  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: settings?.rank,
  });

  const formData = watch();

  React.useEffect(() => {
    if (thereAreChanges && !loadingUpdate) {
      setThereAreChanges(false);
    }
  }, [loadingUpdate]);

  React.useEffect(() => {
    console.log(settings, formData);
    if (
      Object.keys(settings).length > 0 &&
      Object.keys(formData).length > 0 &&
      !_.isEqual(formData, settings?.rank)
    ) {
      console.log('setting this');
      setThereAreChanges(true);
    }
  }, [formData]);

  const onSubmit = data => {
    dispatch(actions.updateSettingsAction({ ...settings, rank: data }));
  };

  return (
    <React.Fragment>
      {loading || !settings || Object.keys(settings).length <= 0 ? (
        <CircularProgress />
      ) : (
        <React.Fragment>
          <div style={{ marginBottom: '3em' }}>
            <Title>Settings</Title>
            <Typography component="p" color="main" gutterBottom>
              Impostazioni generali della feature livellamento.
            </Typography>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <LevelUpMessage
              control={control}
              watch={watch}
              defaultValues={settings?.rank}
              textChannels={textChannels}
            />

            <AlertChanges
              open={thereAreChanges}
              reset={reset}
              setIsOpen={setThereAreChanges}
              loading={loadingUpdate}
            />
          </form>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
