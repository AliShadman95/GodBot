import React from 'react';
import { Box } from '@mui/material';
import ColorizeOutlinedIcon from '@mui/icons-material/ColorizeOutlined';
import { SketchPicker } from 'react-color';

export const BoxColore = ({
  color,
  onClick,
  isOpen,
  setColor,
  disabled = false,
}) => {
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

export default BoxColore;
