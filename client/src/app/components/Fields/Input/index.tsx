import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

const Input = ({
  name,
  label,
  control,
  defaultValue = '',
  multiline = false,
  rows = 0,
  type = 'text',
  required = false,
  helperText = '',
  min = 0,
  max = 0,
  rules = {},
  error = false,
  autoFocus = false,
  autoComplete = 'off',
  ...props
}) => {
  return (
    <FormControl {...props}>
      <Controller
        render={({ field }) => (
          <TextField
            label={label}
            multiline={multiline}
            rows={rows}
            required={required}
            type={type}
            helperText={helperText}
            InputProps={{ inputProps: { min, max } }}
            error={error}
            autoFocus={autoFocus}
            autoComplete={autoComplete}
            {...field}
          />
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
      />
    </FormControl>
  );
};
export default Input;
