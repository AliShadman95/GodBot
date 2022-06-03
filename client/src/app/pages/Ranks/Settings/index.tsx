import * as React from 'react';
import { Typography, CircularProgress, Box } from '@mui/material';
import AlertChanges from 'app/components/AlertChanges';
import _ from 'lodash';
import {
  selectSettings,
  selectTextChannels,
  selectLoadingUpdate,
  selectLoading,
  selectVoiceChannels,
} from '../../Dashboard/slice/selectors';
import { useDashboardSlice } from '../../Dashboard/slice/index';
import { useForm } from 'react-hook-form';
import LevelUpMessage from './LevelUpMessage';
import GestioneLivelli from './GestioneLivelli';
import MessagePoints from './MessagePoints';
import VoicePoints from './VoicePoints';
import { useSelector, useDispatch } from 'react-redux';
import Title from 'app/components/Title';
import { levelGenerator } from 'utils/utils';

export default function Settings() {
  const dispatch = useDispatch();

  const { actions } = useDashboardSlice();

  const settings = useSelector(selectSettings);
  const loadingUpdate = useSelector(selectLoadingUpdate);
  const loading = useSelector(selectLoading);

  const textChannels = useSelector(selectTextChannels);
  const voiceChannels = useSelector(selectVoiceChannels);
  const [thereAreChanges, setThereAreChanges] = React.useState(false);

  const { control, handleSubmit, watch, reset, getValues, formState } = useForm(
    {
      defaultValues: settings?.rank,
      mode: 'onChange',
    },
  );

  const formData = watch();

  React.useEffect(() => {
    if (thereAreChanges && !loadingUpdate) {
      setThereAreChanges(false);
    }
  }, [loadingUpdate]);

  React.useEffect(() => {
    let xps = settings?.rank?.xps;

    if (settings?.rank?.levelMultiplier !== formData?.levelMultiplier) {
      xps = levelGenerator(formData.levelMultiplier);
    }

    if (
      Object.keys(settings).length > 0 &&
      Object.keys(formData).length > 0 &&
      !_.isEqual({ ...settings.rank, ...formData, ...{ xps } }, settings?.rank)
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
                defaultValues={settings?.rank}
                textChannels={textChannels}
                getValues={getValues}
              />
            </Box>
            <Box marginBottom="3em">
              <GestioneLivelli
                control={control}
                defaultValues={settings?.rank}
              />
            </Box>
            <Box marginBottom="3em">
              <MessagePoints
                control={control}
                watch={watch}
                defaultValues={settings?.rank}
                errors={formState.errors}
              />
            </Box>
            <Box>
              <VoicePoints
                control={control}
                watch={watch}
                defaultValues={settings?.rank}
                voiceChannels={voiceChannels}
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
