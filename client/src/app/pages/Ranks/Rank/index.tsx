import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Typography, CircularProgress } from '@mui/material';
import _ from 'lodash';
import AlertChanges from 'app/components/AlertChanges';

import {
  selectSettings,
  selectTextChannels,
  selectLoadingUpdate,
  selectLoading,
} from '../../Dashboard/slice/selectors';
import { useDashboardSlice } from '../../Dashboard/slice/index';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card';
import Title from '../../Title';

export default function Ranks() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { actions } = useDashboardSlice();
  const settings = useSelector(selectSettings);
  const loadingUpdate = useSelector(selectLoadingUpdate);
  const loading = useSelector(selectLoading);

  /*   const [thereAreChanges, setThereAreChanges] = React.useState(false);
   */
  const { control, handleSubmit, watch, reset, getValues } = useForm({
    defaultValues: settings?.rank,
  });

  /* const formData = watch();

  React.useEffect(() => {
    if (thereAreChanges && !loadingUpdate) {
      setThereAreChanges(false);
    }
  }, [loadingUpdate]);

  React.useEffect(() => {
    if (
      Object.keys(settings).length > 0 &&
      Object.keys(formData).length > 0 &&
      !_.isEqual({ ...settings.rank, ...formData }, settings?.rank)
    ) {
      setThereAreChanges(true);
    }
  }, [formData]);
 */
  const onSubmit = data => {
    dispatch(
      actions.updateSettingsAction({
        ...settings,
        rank: { ...settings.rank, ...data },
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
            <Title>Livellamento</Title>
            <Typography component="p" color="main" gutterBottom>
              Comando che mostra il livellamento di un utente.
            </Typography>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card
              settings={settings}
              control={control}
              reset={reset}
              watch={watch}
            />
            {/*   <AlertChanges
              open={thereAreChanges}
              reset={reset}
              setIsOpen={setThereAreChanges}
              loading={loadingUpdate}
            /> */}
          </form>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
