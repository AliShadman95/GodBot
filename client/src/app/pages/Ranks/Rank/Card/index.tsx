/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Grid,
  Divider,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import Title from 'app/components/Title';
import { generateCard } from './canvasGenerator';
import { useSelector } from 'react-redux';
import {
  selectRankInfo,
  selectAllRanks,
  selectSettings,
} from '../../../Dashboard/slice/selectors';
import ColoriPrincipali from './components/ColoriPrincipali';
import ColoriSfondo from './components/ColoriSfondo';
import ImageForm from './components/ImageForm';
import Header from './components/Header';
import Canvas from './components/Canvas';
import ImageLink from './components/ImageLink';
import Buttons from './components/Buttons';

const Card = ({
  defaultValues,
  control,
  reset,
  watch,
  colors,
  thereAreChanges,
  setThereAreChanges,
  formState,
  imagePosition,
  setImagePosition,
  setColors,
}) => {
  let canvasRef = useRef<HTMLCanvasElement>(null);

  const [openPicker, setOpenPicker] = useState<string>('');

  const isGradientField: boolean | undefined = watch('isGradient');
  const isImageField: boolean | undefined = watch('isImage');
  const imageField: string | undefined = watch('image');

  const rankInfo: any = useSelector(selectRankInfo);
  const allRanks: any[] = useSelector(selectAllRanks);
  const settings = useSelector(selectSettings);

  const draw = (ctx, canvas): void => {
    generateCard(
      ctx,
      canvas,
      colors,
      imagePosition,
      isGradientField,
      rankInfo,
      settings,
      allRanks,
      isImageField,
      imageField,
      defaultValues,
      setImagePosition,
    );
  };

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        draw(context, canvas);
      }
    }
  }, [draw]);

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Title>Server rank card</Title>
      </AccordionSummary>
      <AccordionDetails>
        <Header
          control={control}
          defaultValues={defaultValues}
          isGradientField={isGradientField}
          isImageField={isImageField}
        />

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={3}>
          <Canvas canvasRef={canvasRef} />

          <Box width="100%" />

          {isImageField && (
            <ImageForm
              imagePosition={imagePosition}
              setImagePosition={setImagePosition}
            />
          )}

          <ColoriPrincipali
            colors={colors}
            setColors={setColors}
            openPicker={openPicker}
            setOpenPicker={setOpenPicker}
          />

          {isImageField ? (
            <React.Fragment>
              <ImageLink
                control={control}
                defaultValues={defaultValues}
                imageField={imageField}
                setImagePosition={setImagePosition}
                imagePosition={imagePosition}
                formState={formState}
              />
              <Grid item xs={1} md={1} lg={1} mt={{ xs: 4, md: 4, lg: 8 }} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Grid item xs={12} md={1} lg={1} my={{ xs: 1, md: 1, lg: 2 }} />
              <ColoriSfondo
                colors={colors}
                setColors={setColors}
                openPicker={openPicker}
                setOpenPicker={setOpenPicker}
                isImageField={isImageField}
                isGradientField={isGradientField}
              />
              <Grid item xs={12} md={4} lg={2} sx={{ my: 2 }} />
            </React.Fragment>
          )}

          <Buttons
            thereAreChanges={thereAreChanges}
            setThereAreChanges={setThereAreChanges}
            formState={formState}
            setColors={setColors}
            reset={reset}
            setImagePosition={setImagePosition}
            defaultValues={defaultValues}
          />
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default Card;
