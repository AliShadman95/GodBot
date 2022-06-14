/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import ColorizeOutlinedIcon from '@mui/icons-material/ColorizeOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Typography,
  Grid,
  Divider,
  Box,
  Button,
  CircularProgress,
  Accordion,
  AccordionSummary,
  FormControl,
  AccordionDetails,
} from '@mui/material';
import Title from 'app/components/Title';
import SwitchField from 'app/components/Fields/Switch';
import { generateCard } from './canvasGenerator';
import { useSelector } from 'react-redux';
import {
  selectRankInfo,
  selectAllRanks,
} from '../../../Dashboard/slice/selectors';
import Input from 'app/components/Fields/Input';

const CustomBox = ({ color, onClick, isOpen, setColor, disabled = false }) => {
  return (
    <React.Fragment>
      <Box
        onClick={onClick}
        sx={{
          backgroundColor: color,
          minWidth: '5em',
          width: '5em',
          minHeight: '5em',
          height: '5em',
          border: '1px solid black',
          borderRadius: '8%',
          ...(!disabled && {
            '&:hover': {
              opacity: [0.9, 0.8, 0.7],
              cursor: 'pointer',
            },
          }),
          ...(disabled && { opacity: [0.5, 0.4, 0.3] }),
        }}
      >
        <ColorizeOutlinedIcon fontSize="small" sx={{ color: 'black' }} />
      </Box>
      {isOpen && (
        <React.Fragment>
          <div
            style={{
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
            }}
            onClick={onClick}
          />
          <SketchPicker
            color={color}
            onChange={e => setColor(e.hex)}
            disableAlpha
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const Card = ({
  cardInfo,
  control,
  reset,
  watch,
  loadingUpdate,
  color1,
  color2,
  color3,
  gradientColor1,
  gradientColor2,
  setColor1,
  setColor2,
  setColor3,
  setGradientColor1,
  setGradientColor2,
  thereAreChanges,
  setThereAreChanges,
  settings,
}) => {
  let canvasRef = useRef<HTMLCanvasElement>(null);
  const [openPicker, setOpenPicker] = useState('');
  const isGradientField = watch('isGradient');
  const isImageField = watch('isImage');
  const imageField = watch('image');

  const rankInfo = useSelector(selectRankInfo);
  const allRanks = useSelector(selectAllRanks);

  const draw = (ctx, canvas) => {
    generateCard(
      ctx,
      canvas,
      color1,
      color2,
      color3,
      gradientColor1,
      gradientColor2,
      isGradientField,
      rankInfo,
      settings,
      allRanks,
      isImageField,
      imageField,
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
        <div style={{ marginBottom: '2em' }}>
          <Grid container>
            <Grid item xs={12} md={12} lg={8}>
              <Typography component="p" color="main" gutterBottom>
                Puoi customizzare la card del rank. Ogni membro del server avrà
                questa.
              </Typography>
            </Grid>
            <Grid item xs={6} md={6} lg={2}>
              <SwitchField
                name="isImage"
                labelid="isImage"
                id="isImage"
                margin="normal"
                variant="outlined"
                label={isImageField ? 'Immagine' : 'Senza immagine'}
                defaultValue={cardInfo.isImage}
                control={control}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={2}>
              <SwitchField
                name="isGradient"
                labelid="isGradient"
                id="isGradient"
                margin="normal"
                variant="outlined"
                label={
                  isGradientField ? 'Sfondo sfumato' : 'Sfondo non sfumato'
                }
                defaultValue={cardInfo.isGradient}
                control={control}
                disabled={isImageField}
              />
            </Grid>
          </Grid>
        </div>
        <Divider sx={{ my: 1 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={5} lg={5}>
            <canvas
              ref={canvasRef}
              width={1342}
              height={400}
              style={{
                width: '100%',
                maxWidth: '100%',
                height: '78%',
                marginTop: '2.5em',
                zIndex: 200,
              }}
            />
          </Grid>
          <Box width="100%" />

          <Grid item xs={12} md={4} lg={4} my={{ xs: 1, md: 2, lg: 2 }}>
            <Typography component="p" color="main" gutterBottom>
              Colori Principali
            </Typography>

            <Grid container>
              <Grid item xs={4} md={4} lg={4}>
                <CustomBox
                  color={color1}
                  isOpen={openPicker === 'color1'}
                  onClick={() =>
                    setOpenPicker(openPicker === 'color1' ? '' : 'color1')
                  }
                  setColor={setColor1}
                />
              </Grid>
              <Grid item xs={4} md={4} lg={4}>
                <CustomBox
                  color={color2}
                  isOpen={openPicker === 'color2'}
                  onClick={() =>
                    setOpenPicker(openPicker === 'color2' ? '' : 'color2')
                  }
                  setColor={setColor2}
                />
              </Grid>
              <Grid item xs={4} md={4} lg={4}>
                <CustomBox
                  color={color3}
                  isOpen={openPicker === 'color3'}
                  onClick={() =>
                    setOpenPicker(openPicker === 'color3' ? '' : 'color3')
                  }
                  setColor={setColor3}
                />
              </Grid>
            </Grid>
          </Grid>

          {isImageField ? (
            <React.Fragment>
              <Grid item xs={12} md={4} lg={5} mt={{ xs: 4, md: 4, lg: 8 }}>
                <FormControl fullWidth>
                  <Input
                    id="image"
                    name="image"
                    label="Link immagine"
                    control={control}
                    defaultValue={cardInfo.image}
                    rules={{ required: true }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={1} md={1} lg={1} mt={{ xs: 4, md: 4, lg: 8 }} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Grid
                item
                xs={12}
                md={4}
                lg={1}
                my={{ xs: 1, md: 1, lg: 2 }}
              ></Grid>
              <Grid item xs={12} md={4} lg={3} my={{ xs: 1, md: 1, lg: 2 }}>
                <Typography component="p" color="main" gutterBottom>
                  Colori Sfondo
                </Typography>
                <Grid container>
                  <Grid item xs={4} md={4} lg={6}>
                    <CustomBox
                      color={gradientColor1}
                      isOpen={openPicker === 'gradientColor1'}
                      onClick={() =>
                        !isImageField &&
                        setOpenPicker(
                          openPicker === 'gradientColor1'
                            ? ''
                            : 'gradientColor1',
                        )
                      }
                      setColor={setGradientColor1}
                      disabled={isImageField}
                    />
                  </Grid>
                  <Grid item xs={4} md={4} lg={6}>
                    <CustomBox
                      color={gradientColor2}
                      isOpen={openPicker === 'gradientColor2'}
                      onClick={() =>
                        !isImageField &&
                        isGradientField &&
                        setOpenPicker(
                          openPicker === 'gradientColor2'
                            ? ''
                            : 'gradientColor2',
                        )
                      }
                      setColor={setGradientColor2}
                      disabled={isImageField || !isGradientField}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4} lg={2} sx={{ my: 2 }}></Grid>
            </React.Fragment>
          )}

          <Grid
            item
            xs={12}
            md={4}
            lg={2}
            my={{ xs: 0, md: 0, lg: 2 }}
            display="flex"
          >
            <Box display="flex" alignItems="flex-end" maxHeight={'7em'}>
              <Button
                color="secondary"
                size="small"
                variant="contained"
                sx={{ margin: '0.5em' }}
                disabled={!thereAreChanges}
                onClick={() => {
                  reset(cardInfo);
                  setColor1(cardInfo.color1 || 'white');
                  setColor2(cardInfo.color2 || 'white');
                  setColor3(cardInfo.color3 || 'white');
                  setGradientColor1(cardInfo.gradientColor1 || 'white');
                  setGradientColor2(cardInfo.gradientColor2 || 'white');
                  setThereAreChanges(false);
                }}
              >
                Cancella
              </Button>
              <Button
                color="primary"
                size="small"
                variant="contained"
                sx={{ margin: '0.5em' }}
                type="submit"
                disabled={!thereAreChanges}
              >
                {loadingUpdate ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  'Salva'
                )}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default Card;
