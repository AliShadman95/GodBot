import { Slider, FormControl } from '@mui/material';
import { Controller } from 'react-hook-form';

const SliderField = ({
  name,
  control,
  defaultValue,
  marks,
  dbMapper = e => e,
  feMapper = e => e,
  ...props
}) => {
  return (
    <FormControl {...props}>
      <Controller
        render={({ field: { value, ...field } }) => (
          <Slider
            {...field}
            onChange={(_, value) => {
              field.onChange(dbMapper(value));
            }}
            value={feMapper(value)}
            valueLabelDisplay="off"
            sx={{ marginLeft: '0.4em' }}
            {...props}
            step={1}
            marks={marks}
            min={1}
            max={8}
            defaultValue={defaultValue}
          />
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};
export default SliderField;
