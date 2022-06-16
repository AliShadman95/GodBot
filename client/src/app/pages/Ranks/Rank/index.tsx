/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { Typography, CircularProgress } from '@mui/material';
import _ from 'lodash';
import {
  selectSettings,
  selectLoadingUpdate,
  selectLoading,
  selectCardInfo,
} from '../../Dashboard/slice/selectors';
import { useDashboardSlice } from '../../Dashboard/slice/index';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card';
import Title from 'app/components/Title';
import { getIdDiscord } from 'utils/api';

export default function Ranks() {
  const dispatch = useDispatch();
  const { actions } = useDashboardSlice();

  const settings: any = useSelector(selectSettings);
  const loadingUpdate: boolean = useSelector(selectLoadingUpdate);
  const loading: boolean = useSelector(selectLoading);

  const defaultValues: any = useSelector(selectCardInfo);

  const idDiscord: string | null = getIdDiscord();

  const [color1, setColor1] = useState('white');
  const [color2, setColor2] = useState('white');
  const [color3, setColor3] = useState('white');
  const [gradientColor1, setGradientColor1] = useState('white');
  const [gradientColor2, setGradientColor2] = useState('white');
  const [sx, setSx] = useState(0);
  const [sy, setSy] = useState(0);
  const [sWidth, setSWidth] = useState(0);
  const [sHeight, setSHeight] = useState(0);
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);
  const [dWidth, setDWidth] = useState(0);
  const [dHeight, setDHeight] = useState(0);

  const [thereAreChanges, setThereAreChanges] = React.useState(false);

  const { control, handleSubmit, watch, reset, formState } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const setImagePosition = (
    sxValue,
    syValue,
    sWidthValue,
    sHeightValue,
    dxValue,
    dyValue,
    dWidthValue,
    dHeightValue,
  ) => {
    setSx(sxValue);
    setSy(syValue);
    setSWidth(sWidthValue);
    setSHeight(sHeightValue);
    setDx(dxValue);
    setDy(dyValue);
    setDWidth(dWidthValue);
    setDHeight(dHeightValue);
  };

  const setColors = (
    color1Value,
    color2Value,
    color3Value,
    gradientColor1Value,
    gradientColor2Value,
  ) => {
    setColor1(color1Value);
    setColor2(color2Value);
    setColor3(color3Value);
    setGradientColor1(gradientColor1Value);
    setGradientColor2(gradientColor2Value);
  };

  React.useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      setColors(
        defaultValues.color1,
        defaultValues.color2,
        defaultValues.color3,
        defaultValues.gradientColor1,
        defaultValues.gradientColor2,
      );

      setImagePosition(
        defaultValues.sx,
        defaultValues.sy,
        defaultValues.sWidth,
        defaultValues.sHeight,
        defaultValues.dx,
        defaultValues.dy,
        defaultValues.dWidth,
        defaultValues.dHeight,
      );
    }
  }, [defaultValues]);

  const formData = watch();

  React.useEffect(() => {
    if (thereAreChanges && !loadingUpdate) {
      setThereAreChanges(false);
    }
  }, [loadingUpdate]);

  React.useEffect(() => {
    setThereAreChanges(
      Object.keys(defaultValues).length > 0 &&
        Object.keys(formData).length > 0 &&
        !_.isEqual(
          {
            ...defaultValues,
            ...formData,
            ...(color1 !== 'white' && { color1 }),
            ...(color2 !== 'white' && { color2 }),
            ...(color3 !== 'white' && { color3 }),
            ...(gradientColor1 !== 'white' && { gradientColor1 }),
            ...(gradientColor2 !== 'white' && { gradientColor2 }),
            sx,
            sy,
            sWidth,
            sHeight,
            dx,
            dy,
            dWidth,
            dHeight,
          },
          defaultValues,
        ),
    );
  }, [formData]);

  const onSubmit = data => {
    dispatch(
      actions.updateSettingsAction({
        ...settings,
        rank: {
          ...settings.rank,
          ...{
            cards: settings.rank.cards.map(c =>
              c.idDiscord === getIdDiscord()
                ? {
                    ...data,
                    color1,
                    color2,
                    color3,
                    gradientColor1,
                    gradientColor2,
                    idDiscord,
                    sx,
                    sy,
                    sWidth,
                    sHeight,
                    dx,
                    dy,
                    dWidth,
                    dHeight,
                  }
                : c,
            ),
          },
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
              defaultValues={defaultValues}
              setColors={setColors}
              setImagePosition={setImagePosition}
              control={control}
              reset={reset}
              watch={watch}
              colors={{
                color1,
                color2,
                color3,
                gradientColor1,
                gradientColor2,
              }}
              imagePosition={{
                sx,
                sy,
                sWidth,
                sHeight,
                dx,
                dy,
                dWidth,
                dHeight,
              }}
              thereAreChanges={thereAreChanges}
              setThereAreChanges={setThereAreChanges}
              formState={formState}
            />
          </form>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
