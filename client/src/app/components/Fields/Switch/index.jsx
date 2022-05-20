import { Switch, FormControlLabel, FormControl } from '@mui/material';
import { Controller } from 'react-hook-form';

const SwitchField = ({ name, label, control, defaultValue, ...props }) => {
  return (
    <FormControl {...props}>
      <FormControlLabel
        control={
          <Controller
            render={({ field: { value, ...field } }) => (
              <Switch {...field} checked={!!value} />
            )}
            name={name}
            control={control}
            defaultValue={defaultValue}
          />
        }
        label={label}
      />
    </FormControl>
  );
};
export default SwitchField;
