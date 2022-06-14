/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Typography, CircularProgress, Box } from '@mui/material';
import AlertChanges from 'app/components/AlertChanges';
import _ from 'lodash';
import {
  selectSettings,
  selectTextChannels,
  selectLoadingUpdate,
  selectLoading,
} from '../Dashboard/slice/selectors';
import { useDashboardSlice } from '../Dashboard/slice/index';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import Title from 'app/components/Title';
import BotInfo from './BotInfo';

export default function Settings() {
  const dispatch = useDispatch();

  const { actions } = useDashboardSlice();

  const settings: any = useSelector(selectSettings);
  const loadingUpdate: boolean = useSelector(selectLoadingUpdate);
  const loading: boolean = useSelector(selectLoading);

  const textChannels: any[] = useSelector(selectTextChannels);
  const [thereAreChanges, setThereAreChanges] = React.useState<boolean>(false);

  const { control, handleSubmit, watch, reset, getValues } = useForm({
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

  const onSubmit = (data): void => {
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
            <Title>Settings</Title>
            <Typography component="p" color="main" gutterBottom>
              Impostazioni generali del bot.
            </Typography>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box marginBottom="3em">
              <BotInfo
                control={control}
                defaultValues={settings?.rank}
                textChannels={textChannels}
                getValues={getValues}
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
