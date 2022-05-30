import React from 'react';

import { GridRenderCellParams } from '@mui/x-data-grid';
import { Typography, Box, Avatar, CircularProgress } from '@mui/material';

export const rows = (users, settings) => {
  return users.map((user, index) => {
    const currentLevelIndex =
      settings.rank?.xps?.findIndex(
        (xp, i) =>
          parseInt(user.points) >= xp &&
          parseInt(user.points) < settings.rank.xps[i + 1],
      ) + 1;

    return {
      ...user,
      badge: index + 1,
      level: currentLevelIndex,
      minutesInVoiceChannel: Math.floor(user.secondsInVoiceChat / 60),
      levelUpPercent: Math.floor(
        (parseInt(user.points) -
          (settings.rank?.xps[currentLevelIndex - 1] || 0)) /
          ((settings.rank?.xps[currentLevelIndex] -
            (settings.rank?.xps[currentLevelIndex - 1] || 0)) /
            100),
      ),
    };
  });
};

export const columns = isAdmin => [
  {
    field: 'badge',
    headerName: '',
    flex: 0.4,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<string>) => (
      <div
        style={{
          width: '30px',
          lineHeight: '30px',
          borderRadius: '50%',
          textAlign: 'center',
          fontSize: '14px',
          backgroundColor: '#63F58B',
          color: 'black',
        }}
      >
        {params.value}
      </div>
    ),
  },
  {
    field: 'avatar',
    headerName: '',
    flex: 0.4,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<string>) => (
      <Avatar
        alt="Avatar"
        src={`https://cdn.discordapp.com/avatars/${params.row.id}/${params.value}.png`}
      />
    ),
  },
  {
    field: 'username',
    headerName: '',
    flex: 4,
    minWidth: 150,
  },
  { field: 'messageAwarded', headerName: 'MESSAGGI', flex: 0.6, minWidth: 100 },
  {
    field: 'minutesInVoiceChannel',
    headerName: 'MINUTI IN VOICE CHAT',
    flex: 1,
    minWidth: 200,
  },
  { field: 'points', headerName: 'XP', flex: 0.6, minWidth: 100 },
  {
    field: 'level',
    headerName: 'LIVELLO',
    flex: 0.6,
    minWidth: 100,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<string>) => (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          value={params.row.levelUpPercent}
          variant="determinate"
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.primary">
            {params.value}
          </Typography>
        </Box>
      </Box>
    ),
  },
];
