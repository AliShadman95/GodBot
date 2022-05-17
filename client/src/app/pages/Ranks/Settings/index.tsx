import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import SelectField from '../../../components/Fields/Select';
import MenuItem from '@mui/material/MenuItem';
import { useForm } from 'react-hook-form';
import LevelUpMessage from './LevelUpMessage';

import Title from '../../Title';

export default function Settings() {
  const theme = useTheme();

  const defaultValues = {
    channel: 10,
    levelUpMessage: 'Complimenti {user}, hai raggiunto il livello: {livello}',
  };

  const { control, handleSubmit, watch } = useForm({
    defaultValues,
  });

  const onSubmit = data => console.log(data);

  const channel = watch('channel');

  return (
    <React.Fragment>
      <div style={{ marginBottom: '3em' }}>
        <Title>Settings</Title>
        <Typography component="p" color="main" gutterBottom>
          Impostazioni generali della feature livellamento.
        </Typography>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <LevelUpMessage
          control={control}
          watch={watch}
          defaultValues={defaultValues}
        />
      </form>
    </React.Fragment>
  );
}
