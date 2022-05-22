import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Typography, CircularProgress, Box } from '@mui/material';
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
import GestioneLivelli from './GestioneLivelli';
import MessagePoints from './MessagePoints';
import { useSelector, useDispatch } from 'react-redux';
import Title from '../../Title';
import { levelGenerator } from 'utils/utils';

export default function Settings() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { actions } = useDashboardSlice();

  const settings = useSelector(selectSettings);
  const loadingUpdate = useSelector(selectLoadingUpdate);
  const loading = useSelector(selectLoading);

  const textChannels = useSelector(selectTextChannels);
  const [thereAreChanges, setThereAreChanges] = React.useState(false);

  const { control, handleSubmit, watch, reset, getValues, formState } = useForm(
    {
      defaultValues: settings?.rank,
      mode: 'onChange',
    },
  );

  const formData = watch();

  console.log(formState.errors);

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

  const onSubmit = data => {
    let xps = settings.rank.xps;

    if (settings?.rank.levelMultiplier !== data.levelMultiplier) {
      xps = levelGenerator(data.levelMultiplier);
    }

    dispatch(
      actions.updateSettingsAction({
        ...settings,
        rank: {
          ...settings.rank,
          ...data,
          ...{ xps },
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
              Impostazioni generali della feature livellamento.
            </Typography>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box marginBottom="3em">
              <LevelUpMessage
                control={control}
                watch={watch}
                defaultValues={settings?.rank}
                textChannels={textChannels}
                getValues={getValues}
              />
            </Box>
            <Box marginBottom="3em">
              <GestioneLivelli
                control={control}
                watch={watch}
                defaultValues={settings?.rank}
              />
            </Box>
            <Box>
              <MessagePoints
                control={control}
                watch={watch}
                defaultValues={settings?.rank}
                textChannels={textChannels}
                getValues={getValues}
                errors={formState.errors}
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
