import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HandshakeIcon from '@mui/icons-material/Handshake';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Settings from '@mui/icons-material/Settings';
import Divider from '@mui/material/Divider';

export const MainListItems = ({ changeRoute }) => {
  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Ranks
      </ListSubheader>
      <ListItemButton
        onClick={() => {
          changeRoute('ranks');
        }}
      >
        <ListItemIcon>
          <EmojiEventsIcon />
        </ListItemIcon>
        <ListItemText primary="!rank" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          changeRoute('give-xp');
        }}
      >
        <ListItemIcon>
          <HandshakeIcon />
        </ListItemIcon>
        <ListItemText primary="!givexp" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          changeRoute('remove-xp');
        }}
      >
        <ListItemIcon>
          <PlaylistRemoveIcon />
        </ListItemIcon>
        <ListItemText primary="!remove-xp" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          changeRoute('levels');
        }}
      >
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="!levels" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          changeRoute('ranks/settings');
        }}
      >
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
      <Divider sx={{ my: 1 }} />
      <ListSubheader component="div" inset>
        Economy
      </ListSubheader>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Current month" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Last quarter" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Year-end sale" />
      </ListItemButton>
    </React.Fragment>
  );
};
