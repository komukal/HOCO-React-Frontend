import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@material-ui/core";
function AddRoom(props) {
  const [room, setRoom] = useState({
    roomName: "",
    roomDescription: "",
    openTime: "",
    closeTime: "",
    minReservationTime: "",
    maxReservationTime: "",
  });
  const inputChanged = (event) => {
    setRoom({ ...room, [event.target.name]: event.target.value });
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setActiveStep(0);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function getSteps() {
    return [
      "Room Name",
      "Room description",
      "open times",
      "reservations times",
      "Accept",
    ];
  }
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const buttonFunc = () => {
    if (activeStep === steps.length - 1) {
      handleNext();
      props.addRoom(room);
      handleClose();
    }else{
        handleNext();
    }
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  return (
    <div>
      <Button
        style={{ marginTop: 10 }}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        Create room
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create reservation</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} orientation="vertical">
            <Step key={0}>
              <StepLabel>Room name</StepLabel>
              <StepContent>
                <TextField
                  onChange={inputChanged}
                  name="roomName"
                  label="Choose a name"
                  variant="outlined"
                />
              </StepContent>
            </Step>

            <Step key={1}>
              <StepLabel>Room description</StepLabel>
              <StepContent>
                <TextField
                  fullWidth
                  onChange={inputChanged}
                  name="roomDescription"
                  label="Describe the room"
                  variant="outlined"
                />
              </StepContent>
            </Step>

            <Step key={2}>
              <StepLabel>Open times</StepLabel>
              <StepContent>
                <TextField
                  name="openTime"
                  onChange={inputChanged}
                  label="Opens at"
                  placeholder="0700"
                  variant="outlined"
                />
                <TextField
                  name="closeTime"
                  onChange={inputChanged}
                  label="Closes at"
                  placeholder="2300"
                  variant="outlined"
                />
              </StepContent>
            </Step>
            <Step key={3}>
              <StepLabel>Reservation time limits</StepLabel>
              <StepContent>
                <TextField
                  name="minReservationTime"
                  onChange={inputChanged}
                  label="Min reservation time(min)"
                  placeholder="60"
                  variant="outlined"
                />
                <TextField
                  name="maxReservationTime"
                  onChange={inputChanged}
                  label="Max reservation time(min)"
                  placeholder="180"
                  variant="outlined"
                />
              </StepContent>
            </Step>
            <Step key={4}>
              <StepLabel>Room overview</StepLabel>
              <StepContent>
                <Typography>Room name: {room.roomName}</Typography>
                <Typography>
                  Room description: {room.roomDescription}
                </Typography>
                <Typography>
                  Room open times: {room.openTime} to {room.closeTime}
                </Typography>
                <Typography>
                  Reservation time limits: {room.minReservationTime} minutes to{" "}
                  {room.maxReservationTime} minutes
                </Typography>
              </StepContent>
            </Step>
          </Stepper>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={buttonFunc}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AddRoom;
