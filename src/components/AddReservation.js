import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import React from "react";

function AddReservation(props) {
  const [open, setOpen] = React.useState(false);
  const [reservation, setReservation] = React.useState({
    apartment: "",
    bookingdate: "",
    reservationdate: "",
    startTime: "",
    endTime: "",
    invoiced: false,
  });
  const inputChanged = (event) => {
    setReservation({ ...reservation, [event.target.name]: event.target.value });
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        style={{ marginTop: 10 }}
        variant="outlined"
        color="primary"
        onClick={handleOpen}
      >
        Create reservation
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create reservation</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Apartment"
            value={reservation.apartment}
            name="apartment"
            onChange={inputChanged}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AddReservation;
