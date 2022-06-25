import * as React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HandshakeIcon from '@mui/icons-material/Handshake';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Settings from '@mui/icons-material/Settings';
import Divider from '@mui/material/Divider';
import TodayIcon from '@mui/icons-material/Today';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export const MainListItems = () => {
  const history = useHistory();
  const { url } = useRouteMatch();

  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Generale
      </ListSubheader>
      <ListItemButton
        onClick={() => {
          history.push(`${url}/settings`);
        }}
      >
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
      <Divider sx={{ my: 1 }} />
      <ListSubheader component="div" inset>
        Ranks
      </ListSubheader>
      <ListItemButton
        onClick={() => {
          history.push(`${url}/rank/rank`);
        }}
      >
        <ListItemIcon>
          <EmojiEventsIcon />
        </ListItemIcon>
        <ListItemText primary="/rank" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          history.push(`${url}/rank/give-xp`);
        }}
      >
        <ListItemIcon>
          <HandshakeIcon />
        </ListItemIcon>
        <ListItemText primary="/givexp" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          history.push(`${url}/rank/remove-xp`);
        }}
      >
        <ListItemIcon>
          <PlaylistRemoveIcon />
        </ListItemIcon>
        <ListItemText primary="/remove-xp" />
      </ListItemButton>

      <ListItemButton
        onClick={() => {
          history.push(`${url}/rank/settings`);
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
      <ListItemButton
        onClick={() => {
          history.push(`${url}/economy/daily`);
        }}
      >
        <ListItemIcon>
          <TodayIcon />
        </ListItemIcon>
        <ListItemText primary="/daily" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          history.push(`${url}/economy/weekly`);
        }}
      >
        <ListItemIcon>
          <DateRangeIcon />
        </ListItemIcon>
        <ListItemText primary="/weekly" />
      </ListItemButton>

      <ListItemButton
        onClick={() => {
          history.push(`${url}/economy/coins`);
        }}
      >
        <ListItemIcon>
          <AttachMoneyIcon />
        </ListItemIcon>
        <ListItemText primary="/coins" />
      </ListItemButton>

      <ListItemButton
        onClick={() => {
          history.push(`${url}/economy/settings`);
        }}
      >
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
    </React.Fragment>
  );
};
