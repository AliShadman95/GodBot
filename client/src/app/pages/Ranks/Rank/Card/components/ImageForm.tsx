import { Typography, Grid, Box, TextField as MuiInput } from '@mui/material';

const ImageForm = ({ imagePosition, setImagePosition }) => {
  const { sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight } = imagePosition;
  return (
    <Grid item xs={12} md={12} lg={7}>
      <Typography mb={2} component="p" color="main" gutterBottom>
        Modifica immagine
      </Typography>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
      >
        <MuiInput
          id="sx"
          name="sx"
          label="Posizione X dell'immagine"
          type="number"
          value={sx}
          variant="standard"
          onChange={e =>
            setImagePosition(
              parseInt(e.target.value),
              sy,
              sWidth,
              sHeight,
              dx,
              dy,
              dWidth,
              dHeight,
            )
          }
        />

        <MuiInput
          id="sy"
          name="sy"
          variant="standard"
          type="number"
          label="Posizione Y dell'immagine"
          value={sy}
          onChange={e =>
            setImagePosition(
              sx,
              parseInt(e.target.value),
              sWidth,
              sHeight,
              dx,
              dy,
              dWidth,
              dHeight,
            )
          }
        />

        <MuiInput
          id="sWidth"
          name="sWidth"
          label="Larghezza immagine"
          type="number"
          value={sWidth}
          variant="standard"
          onChange={e =>
            setImagePosition(
              sx,
              sy,
              parseInt(e.target.value),
              sHeight,
              dx,
              dy,
              dWidth,
              dHeight,
            )
          }
        />
        <MuiInput
          id="sHeight"
          name="sHeight"
          label="Altezza immagine"
          type="number"
          variant="standard"
          value={sHeight}
          onChange={e =>
            setImagePosition(
              sx,
              sy,
              sWidth,
              parseInt(e.target.value),
              dx,
              dy,
              dWidth,
              dHeight,
            )
          }
        />
        <MuiInput
          id="dx"
          name="dx"
          label="Posizione X Contenitore"
          type="number"
          value={dx}
          variant="standard"
          onChange={e =>
            setImagePosition(
              sx,
              sy,
              sWidth,
              sHeight,
              parseInt(e.target.value),
              dy,
              dWidth,
              dHeight,
            )
          }
        />
        <MuiInput
          id="dy"
          name="dy"
          label="Posizione Y Contenitore"
          type="number"
          variant="standard"
          value={dy}
          onChange={e =>
            setImagePosition(
              sx,
              sy,
              sWidth,
              sHeight,
              dx,
              parseInt(e.target.value),
              dWidth,
              dHeight,
            )
          }
        />
        <MuiInput
          id="dWidth"
          name="dWidth"
          label="Larghezza Contenitore"
          type="number"
          variant="standard"
          value={dWidth}
          onChange={e =>
            setImagePosition(
              sx,
              sy,
              sWidth,
              sHeight,
              dx,
              dy,
              parseInt(e.target.value),
              dHeight,
            )
          }
        />
        <MuiInput
          id="dHeight"
          name="dHeight"
          label="Altezza Contenitore"
          type="number"
          variant="standard"
          value={dHeight}
          onChange={e =>
            setImagePosition(
              sx,
              sy,
              sWidth,
              sHeight,
              dx,
              dy,
              dWidth,
              parseInt(e.target.value),
            )
          }
        />
      </Box>
    </Grid>
  );
};

export default ImageForm;
