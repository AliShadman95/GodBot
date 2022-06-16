import { Grid } from '@mui/material';

const Canvas = ({ canvasRef }) => {
  return (
    <Grid item xs={12} md={12} lg={5}>
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
  );
};

export default Canvas;
