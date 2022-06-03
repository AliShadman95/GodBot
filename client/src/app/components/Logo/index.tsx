import { Box } from '@mui/material';

const Logo = ({ isXs = false }) => {
  return (
    <Box
      sx={{
        display: { xs: isXs ? 'flex' : 'none', md: isXs ? 'none' : 'flex' },
        mr: 1,
        width: '2em',
      }}
    >
      <img
        id="logo"
        alt="logo"
        src="https://cdn-icons-png.flaticon.com/512/2534/2534504.png"
        style={{ height: '100%', width: '100%' }}
      />
    </Box>
  );
};

export default Logo;
