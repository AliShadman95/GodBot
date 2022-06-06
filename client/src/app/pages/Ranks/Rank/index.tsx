/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { Typography, CircularProgress } from '@mui/material';
import _ from 'lodash';
import {
  selectSettings,
  selectLoadingUpdate,
  selectLoading,
  selectCard,
} from '../../Dashboard/slice/selectors';
import { useDashboardSlice } from '../../Dashboard/slice/index';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card';
import Title from 'app/components/Title';

export default function Ranks() {
  const dispatch = useDispatch();
  const { actions } = useDashboardSlice();
  const settings = useSelector(selectSettings);
  const loadingUpdate = useSelector(selectLoadingUpdate);
  const card = useSelector(selectCard);
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
    if (card && Object.keys(card).length > 0) {
      setColor1(card.color1);
      setColor2(card.color2);
      setColor3(card.color3);
      setGradientColor1(card.gradientColor1);
      setGradientColor2(card.gradientColor2);
    }
  }, [card]);

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
      Object.keys(card).length > 0 &&
      !_.isEqual(
        {
          ...settings.rank,
          ...formData,
          ...(color1 !== 'white' && { color1 }),
          ...(color2 !== 'white' && { color2 }),
          ...(color3 !== 'white' && { color3 }),
          ...(gradientColor1 !== 'white' && { gradientColor1 }),
          ...(gradientColor2 !== 'white' && { gradientColor2 }),
        },
        { ...settings?.rank, ...card },
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
              setThereAreChanges={setThereAreChanges}
              originalCard={card}
            />
          </form>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
