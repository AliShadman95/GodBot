import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
  Divider,
  List,
  Toolbar,
  Grid,
  Typography,
  Tooltip,
  Avatar,
  useMediaQuery,
} from '@mui/material';
import { MainListItems } from '../ListItems';
import { useAuthenticationProviderSlice } from '../AuthenticationProvider/slice';
import Logo from 'app/components/Logo';
import { getIdDiscord, getUsername } from 'utils/api';
import { selectRankInfo } from '../Dashboard/slice/selectors';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function PrimaryNavBar() {
  const dispatch = useDispatch();
  const { actions } = useAuthenticationProviderSlice();

  const rankInfo = useSelector(selectRankInfo);
  const isMobile: boolean = useMediaQuery('(max-width:600px)');

  const [open, setOpen] = React.useState<boolean>(true);

  const toggleDrawer = (): void => {
    setOpen(!open);
  };

  const canShowLabels = isMobile ? !open : true;

  return (
    <React.Fragment>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          {canShowLabels && (
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
          )}

          <Avatar
            alt="Remy Sharp"
            src={`https://cdn.discordapp.com/avatars/${getIdDiscord()}/${
              rankInfo?.avatar !== undefined ? rankInfo?.avatar : 0
            }.jpg`}
            sx={{ flexGrow: 0, marginRight: '0.5em' }}
          />

          {canShowLabels && (
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 0, marginRight: '0.5em' }}
            >
              {getUsername()}
            </Typography>
          )}

          <Tooltip title="Logout">
            <IconButton
              color="inherit"
              onClick={() => {
                dispatch(actions.logoutAction());
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
              <Logo />
              {/*  <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
              <Typography
                variant="subtitle1"
                noWrap
                component="a"
                href="/"
                sx={{
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
            </Grid>
          </Grid>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <MainListItems />
        </List>
      </Drawer>
    </React.Fragment>
  );
}
