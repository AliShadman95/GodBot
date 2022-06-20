/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Grid, FormControl, Button } from '@mui/material';
import Input from 'app/components/Fields/Input';
import { isValidHttpUrl } from 'utils/utils';

const ImageLink = ({
  control,
  defaultValues,
  imageField,
  formState,
  setImagePosition,
  imagePosition,
  file,
  setFile,
}) => {
  const { sx, sy, dx, dy, dWidth, dHeight } = imagePosition;

  useEffect(() => {
    if (
      imageField &&
      imageField !== '' &&
      isValidHttpUrl(imageField) &&
      !imageField.includes('wiki') &&
      formState.dirtyFields.image
    ) {
      setImagePosition(
        sx,
        sy,
        defaultValues.sWidth || 0,
        defaultValues.sHeight || 0,
        dx,
        dy,
        dWidth,
        dHeight,
      );
    }
  }, [imageField]);

  const getHelperTextLink = (): string => {
    if (imageField !== undefined) {
      if (!isValidHttpUrl(imageField)) {
        return 'Devi usare un link valido';
      }
      if (imageField.includes('wiki')) {
        return 'Stai usando un link di wikipedia';
      }
    }

    return 'Non usare link di wikipedia!';
  };

  return (
    <Grid item xs={12} md={4} lg={9} mt={{ xs: 4, md: 4, lg: 8 }}>
      <FormControl fullWidth>
        <Input
          id="image"
          name="image"
          label="Link immagine"
          variant="standard"
          control={control}
          defaultValue={defaultValues.image}
          error={
            imageField !== undefined &&
            (imageField.includes('wiki') || !isValidHttpUrl(imageField))
          }
          rules={{
            validate: value => !value.includes('wiki') && isValidHttpUrl(value),
          }}
          helperText={getHelperTextLink()}
        />
      </FormControl>
    </Grid>
  );
};

export default ImageLink;
