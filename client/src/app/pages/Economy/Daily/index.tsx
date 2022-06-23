/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Typography, CircularProgress, Box } from '@mui/material';
import AlertChanges from 'app/components/AlertChanges';
import _ from 'lodash';
import {
  selectSettings,
  selectLoadingUpdate,
  selectLoading,
} from '../../Dashboard/slice/selectors';
import { useDashboardSlice } from '../../Dashboard/slice/index';
import { useForm } from 'react-hook-form';
import DailyPoints from './DailyPoints';
import { useSelector, useDispatch } from 'react-redux';
import Title from 'app/components/Title';
import DailyMessage from './DailyMessage';

export default function Daily() {
  const dispatch = useDispatch();
  const { actions } = useDashboardSlice();
  const settings: any = useSelector(selectSettings);
  const loadingUpdate: boolean = useSelector(selectLoadingUpdate);
  const loading: boolean = useSelector(selectLoading);
  const [thereAreChanges, setThereAreChanges] = React.useState<boolean>(false);

  const { control, handleSubmit, watch, reset, formState } = useForm({
    defaultValues: settings?.economy,
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
        !_.isEqual({ ...settings.economy, ...formData }, settings?.economy),
    );
  }, [formData]);

  const onSubmit = (data: any): void => {
    dispatch(
      actions.updateSettingsAction({
        ...settings,
        economy: {
          ...settings.economy,
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
            <Title>Daily</Title>
            <Typography component="p" color="main" gutterBottom>
              Impostazioni generali del comando /daily
            </Typography>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box marginBottom="3em">
              <DailyPoints
                control={control}
                defaultValues={settings?.economy}
                errors={formState.errors}
                watch={watch}
              />
            </Box>

            <Box marginBottom="3em">
              <DailyMessage
                control={control}
                defaultValues={settings?.economy}
              />
            </Box>

            <AlertChanges
              open={thereAreChanges}
              reset={() => reset(settings?.economy)}
              setIsOpen={setThereAreChanges}
              loading={loadingUpdate}
            />
          </form>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
