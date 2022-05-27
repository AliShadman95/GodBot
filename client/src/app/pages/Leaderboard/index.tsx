import React, { useEffect } from 'react';
import {
  Typography,
  Box,
  AppBar,
  Container,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Paper,
  Grid,
  CircularProgress,
} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { rows, columns } from './columns';
import { DataGrid, itIT } from '@mui/x-data-grid';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useLeaderboardSlice } from './slice';
import {
  selectLeaderboardLoading,
  selectLeaderboardSettings,
  selectLeaderboardUsers,
} from './slice/selectors';

const pages = ['Dashboard'];

export default function Leaderboard() {
  const dispatch = useDispatch();
  const { actions } = useLeaderboardSlice();

  useEffect(() => {
    dispatch(actions.getSettingsAction());
    dispatch(actions.getUsersAction());
  }, []);

  const users = useSelector(selectLeaderboardUsers);
  const settings = useSelector(selectLeaderboardSettings);
  const loading = useSelector(selectLeaderboardLoading);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <React.Fragment>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              GODBOT
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map(page => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              GODBOT
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map(page => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Logout">
                <IconButton
                  onClick={() => {
                    console.log('SHOULD LOGOUT');
                  }}
                  sx={{ p: 0 }}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {!loading ? (
        <Paper sx={{ marginLeft: '2em', marginRight: '2em' }}>
          <div
            style={{
              height: 400,
              width: '100%',
              marginTop: '7em',
            }}
          >
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flexGrow: 1 }}>
                <DataGrid
                  rows={rows(users, settings)}
                  columns={columns}
                  localeText={
                    itIT.components.MuiDataGrid.defaultProps.localeText
                  }
                  sx={{
                    '.MuiDataGrid-columnSeparator': {
                      display: 'none',
                    },
                    '&.MuiDataGrid-root': {
                      border: 'none',
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </Paper>
      ) : (
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            minHeight: '100vh',
            alignItems: 'center',
          }}
        >
          <Grid item>
            {' '}
            <CircularProgress size={80} />
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}
