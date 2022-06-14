import { Switch, FormControlLabel, FormControl } from '@mui/material';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

const SwitchField = ({
  name,
  label,
  control,
  defaultValue,
  disabled = false,
  ...props
}) => {
  return (
    <FormControl {...props}>
      <FormControlLabel
        control={
          <Controller
            render={({ field: { value, ...field } }) => (
              <Switch {...field} checked={!!value} />
            )}
            name={name}
            disabled={disabled}
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

SwitchField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  defaultValue: PropTypes.bool,
};
