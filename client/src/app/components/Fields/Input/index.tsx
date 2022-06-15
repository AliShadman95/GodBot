import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

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
  disabled = false,
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
            disabled={disabled}
            {...field}
            {...props}
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

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  defaultValue: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  type: PropTypes.string,
  required: PropTypes.bool,
  helperText: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  rules: PropTypes.object,
  error: PropTypes.bool,
  autoFocus: PropTypes.bool,
  autoComplete: PropTypes.string,
  variant: PropTypes.string,
};
