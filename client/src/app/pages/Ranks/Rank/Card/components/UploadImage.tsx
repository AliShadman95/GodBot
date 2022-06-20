/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Grid,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import Input from 'app/components/Fields/Input';
import { useDispatch, useSelector } from 'react-redux';
import { isValidHttpUrl } from 'utils/utils';
import { dashboardActions } from 'app/pages/Dashboard/slice';
import { getIdDiscord, getUsername } from 'utils/api';
import { selectLoadingUpdate } from 'app/pages/Dashboard/slice/selectors';

const UploadImage = ({
  control,
  defaultValues,
  imageField,
  formState,
  setImagePosition,
  imagePosition,
}) => {
  const dispatch = useDispatch();
  const loadingUpdate = useSelector(selectLoadingUpdate);

  const { sx, sy, dx, dy, dWidth, dHeight } = imagePosition;

  const [file, setFile] = useState<File | null | undefined>(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const uploadImage = () => {
    console.log('CONFIRMING');
    dispatch(
      dashboardActions.uploadImageAction({
        file,
        username: getUsername(),
        id: getIdDiscord(),
      }),
    );
    handleClose();
  };

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

  return (
    <React.Fragment>
      <Grid item xs={12} md={4} lg={9} mt={{ xs: 4, md: 4, lg: 8 }}>
        <Button variant="contained" component="label" disabled={loadingUpdate}>
          {loadingUpdate ? (
            <CircularProgress color="inherit" size={20} />
          ) : (
            'Upload file'
          )}
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={e => {
              if (e?.target?.files) {
                setFile(e.target.files[0]);
                handleOpen();
              }
            }}
          />
        </Button>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Conferma</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            La nuova immagine sostituirà definitivamente quella precedente,
            continuare? (Ti sconsiglio di usare immagini personali!)
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annulla</Button>
          <Button onClick={uploadImage} autoFocus>
            Conferma
          </Button>
        </DialogActions>
      </Dialog>
      <Input
        id="image"
        name="image"
        label="Link immagine"
        variant="standard"
        style={{ display: 'none' }}
        control={control}
        defaultValue={defaultValues.image}
      />
    </React.Fragment>
  );
};

export default UploadImage;
