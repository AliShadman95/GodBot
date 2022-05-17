import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

const Input = ({
  name,
  label,
  control,
  defaultValue,
  multiline,
  rows,
  required = false,
  helperText,
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
            helperText={helperText}
            {...field}
          />
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};
export default Input;
