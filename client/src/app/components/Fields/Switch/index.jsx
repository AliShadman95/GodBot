import { Switch, FormControlLabel, FormControl } from '@mui/material';
import { Controller } from 'react-hook-form';

const SwitchField = ({ name, label, control, defaultValue, ...props }) => {
  return (
    <FormControl {...props}>
      <Controller
        render={({ field }) => (
          <FormControlLabel
            control={<Switch defaultChecked={defaultValue} {...field} />}
            label={label}
          />
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};
export default SwitchField;
