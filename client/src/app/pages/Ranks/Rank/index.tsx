import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Typography, CircularProgress } from '@mui/material';
import _ from 'lodash';
import {
  selectSettings,
  selectLoadingUpdate,
  selectLoading,
} from '../../Dashboard/slice/selectors';
import { useDashboardSlice } from '../../Dashboard/slice/index';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card';
import Title from 'app/components/Title';

export default function Ranks() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { actions } = useDashboardSlice();
  const settings = useSelector(selectSettings);
  const loadingUpdate = useSelector(selectLoadingUpdate);
  const loading = useSelector(selectLoading);

  const [color1, setColor1] = useState('white');
  const [color2, setColor2] = useState('white');
  const [color3, setColor3] = useState('white');
  const [gradientColor1, setGradientColor1] = useState('white');
  const [gradientColor2, setGradientColor2] = useState('white');

  const [thereAreChanges, setThereAreChanges] = React.useState(false);

  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: settings?.rank,
  });

  React.useEffect(() => {
    if (settings && Object.keys(settings).length > 0) {
      setColor1(settings.rank.color1);
      setColor2(settings.rank.color2);
      setColor3(settings.rank.color3);
      setGradientColor1(settings.rank.gradientColor1);
      setGradientColor2(settings.rank.gradientColor2);
    }
  }, [settings]);

  const formData = watch();

  React.useEffect(() => {
    if (thereAreChanges && !loadingUpdate) {
      setThereAreChanges(false);
    }
  }, [loadingUpdate]);

  React.useEffect(() => {
    if (
      Object.keys(settings).length > 0 &&
      Object.keys(formData).length > 0 &&
      !_.isEqual(
        {
          ...settings.rank,
          ...formData,
          color1,
          color2,
          color3,
          gradientColor1,
          gradientColor2,
        },
        settings?.rank,
      )
    ) {
      setThereAreChanges(true);
    }
  }, [formData]);

  const onSubmit = data => {
    dispatch(
      actions.updateSettingsAction({
        ...settings,
        rank: {
          ...settings.rank,
          ...data,
          color1,
          color2,
          color3,
          gradientColor1,
          gradientColor2,
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
              loadingUpdate={loadingUpdate}
              color1={color1}
              color2={color2}
              color3={color3}
              gradientColor1={gradientColor1}
              gradientColor2={gradientColor2}
              setColor1={setColor1}
              setColor2={setColor2}
              setColor3={setColor3}
              setGradientColor1={setGradientColor1}
              setGradientColor2={setGradientColor2}
              thereAreChanges={thereAreChanges}
            />
          </form>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
