/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import ColorizeOutlinedIcon from '@mui/icons-material/ColorizeOutlined';
import {
  Paper,
  Typography,
  useMediaQuery,
  Grid,
  Divider,
  Box,
  Button,
  CircularProgress,
} from '@mui/material';
import Title from 'app/components/Title';
import SwitchField from 'app/components/Fields/Switch';
import {
  generateAvatar,
  generateBackground,
  generateProgressBar,
  generateText,
} from './canvasGenerator';
import OutsideAlerter from './OutsideAlerter';

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
      {isOpen && <SketchPicker color={color} onChange={e => setColor(e.hex)} />}
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
}) => {
  let canvasRef = useRef<HTMLCanvasElement>(null);

  const isNotMobile = useMediaQuery('(min-width:650px)');

  const [openPicker, setOpenPicker] = useState('');

  const isGradientField = watch('isGradient');

  const draw = (ctx, canvas) => {
    generateBackground(ctx, gradientColor1, gradientColor2, isGradientField);
    generateText(ctx, color1, color2, color3);
    generateProgressBar(ctx, color1, color2);
    generateAvatar(ctx, canvas);
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
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: isNotMobile ? 500 : 750,
      }}
    >
      <div style={{ marginBottom: '2em' }}>
        <Grid container>
          <Grid item xs={7} md={10}>
            <Title>Server rank card</Title>
            <Typography component="p" color="main" gutterBottom>
              Puoi customizzare la card del rank. Ogni membro del server avrà
              questa.
            </Typography>
          </Grid>
          <Grid item xs={5} md={2}>
            <SwitchField
              name="isGradient"
              labelid="isGradient"
              id="isGradient"
              margin="normal"
              variant="outlined"
              label={isGradientField ? 'Sfondo sfumato' : 'Sfondo non sfumato'}
              defaultValue={cardInfo.isGradient}
              control={control}
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
            }}
          />
        </Grid>
        <Box width="100%" />
        <Grid item xs={12} md={4} lg={5} sx={{ my: 2 }}>
          <Typography component="p" color="main" gutterBottom>
            Colori Principali
          </Typography>

          <Grid container>
            <Grid item xs={4} md={4} lg={3}>
              <OutsideAlerter
                func={() => {
                  setOpenPicker(openPicker !== '' ? '' : openPicker);
                }}
              >
                <CustomBox
                  color={color1}
                  isOpen={openPicker === 'color1'}
                  onClick={() =>
                    setOpenPicker(openPicker === 'color1' ? '' : 'color1')
                  }
                  setColor={setColor1}
                />
              </OutsideAlerter>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
              <OutsideAlerter
                func={() => {
                  setOpenPicker(openPicker !== '' ? '' : openPicker);
                }}
              >
                <CustomBox
                  color={color2}
                  isOpen={openPicker === 'color2'}
                  onClick={() =>
                    setOpenPicker(openPicker === 'color2' ? '' : 'color2')
                  }
                  setColor={setColor2}
                />
              </OutsideAlerter>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
              <OutsideAlerter
                func={() => {
                  setOpenPicker(openPicker !== '' ? '' : openPicker);
                }}
              >
                <CustomBox
                  color={color3}
                  isOpen={openPicker === 'color3'}
                  onClick={() =>
                    setOpenPicker(openPicker === 'color3' ? '' : 'color3')
                  }
                  setColor={setColor3}
                />
              </OutsideAlerter>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} lg={5} sx={{ my: 2 }}>
          <Typography component="p" color="main" gutterBottom>
            Colori Sfondo
          </Typography>

          <Grid container>
            <Grid item xs={4} md={4} lg={3}>
              <OutsideAlerter
                func={() => {
                  setOpenPicker(openPicker !== '' ? '' : openPicker);
                }}
              >
                <CustomBox
                  color={gradientColor1}
                  isOpen={openPicker === 'gradientColor1'}
                  onClick={() =>
                    setOpenPicker(
                      openPicker === 'gradientColor1' ? '' : 'gradientColor1',
                    )
                  }
                  setColor={setGradientColor1}
                />
              </OutsideAlerter>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
              <OutsideAlerter
                func={() => {
                  setOpenPicker(openPicker !== '' ? '' : openPicker);
                }}
              >
                <CustomBox
                  color={gradientColor2}
                  isOpen={openPicker === 'gradientColor2'}
                  onClick={() =>
                    isGradientField &&
                    setOpenPicker(
                      openPicker === 'gradientColor2' ? '' : 'gradientColor2',
                    )
                  }
                  setColor={setGradientColor2}
                  disabled={!isGradientField}
                />
              </OutsideAlerter>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={4} lg={2} sx={{ my: 2 }} display="flex">
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
    </Paper>
  );
};

export default Card;
