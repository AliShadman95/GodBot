import React from 'react';
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
  Avatar,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuthenticationProviderSlice } from '../AuthenticationProvider/slice';
import { useDispatch, useSelector } from 'react-redux';
import Logo from 'app/components/Logo';
import { useHistory } from 'react-router-dom';
import { getIdDiscord, getUsername } from 'utils/api';
import { selectRankInfo } from '../Leaderboard/slice/selectors';

const pages = ['Dashboard'];

export default function SecondaryNavBar() {
  const dispatch = useDispatch();
  let history = useHistory();

  const rankInfo = useSelector(selectRankInfo);

  const { actions } = useAuthenticationProviderSlice();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (): void => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />

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
                <MenuItem
                  key={page}
                  onClick={() => {
                    history.push('/');
                  }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Logo isXs />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
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
                onClick={() => {
                  history.push('/');
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Avatar
            alt="Remy Sharp"
            src={
              `https://cdn.discordapp.com/avatars/${getIdDiscord()}/${
                rankInfo?.avatar
              }.jpg` || 'https://i.pravatar.cc/300?img=8'
            }
            sx={{ flexGrow: 0, marginRight: '0.5em' }}
          />

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 0, marginRight: '1em' }}
          >
            {getUsername()}
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Logout">
              <IconButton
                onClick={() => {
                  dispatch(actions.logoutAction());
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
  );
}
