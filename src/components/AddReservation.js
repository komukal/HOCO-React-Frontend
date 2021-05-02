import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import React from "react";

function AddReservation(props) {
  function getSteps() {
    return ["Your info", "Choose your room", "end when", "starttime", "Accept"];
  }

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [open, setOpen] = React.useState(false);
  const [reservation, setReservation] = React.useState({
    room: "1",
    apartment: "",
    bookedBy: "",
    bookingDate: moment().format(),
    startTime: moment().add(1, "h").startOf("hour").format(),
    endTime: moment().add(2, "h").startOf("hour").format(),
    invoiced: false,
  });
  const inputChanged = (event) => {
    setReservation({ ...reservation, [event.target.name]: event.target.value });
  };

  const handleOpen = () => {
    setActiveStep(0);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setReservation({
      room: "1",
      apartment: "",
      bookedBy: "",
      bookingDate: moment().format(),
      startTime: moment().add(1, "h").startOf("hour").format(),
      endTime: moment().add(2, "h").startOf("hour").format(),
      invoiced: false,
    });
  };
  const handleChanges = () => {
    if (reservation.room) {
      setReservation({
        ...reservation,
        room: "https://hoco-api.herokuapp.com/api/rooms/" + reservation.room,
      });
    }
  };
  const handleSave = () => {
    props.addReservation(reservation);
    handleClose();
  };
  const buttonFunc = () => {
    if (activeStep === steps.length - 1) {
      handleSave();
    } else if (activeStep === steps.length - 2) {
      handleChanges();

      handleNext();
    } else {
      handleNext();
    }
  };
  const renderRoomName = (room) => {
    switch (room) {
      case 1:
        return "Laundry room";
      case 2:
        return "Sauna";
      case 3:
        return "Common room";
      default:
        return "Laundry";
    }
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
        fullWidth={true}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create reservation</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} orientation="vertical">
            <Step key={0}>
              <StepLabel>Contact details</StepLabel>
              <StepContent>
                <div>
                  <TextField
                    id="apartment"
                    onChange={inputChanged}
                    name="apartment"
                    label="Apartment"
                    variant="outlined"
                  />
                  <TextField
                    id="bookedBy"
                    onChange={inputChanged}
                    name="bookedBy"
                    type="email"
                    label="Email"
                    variant="outlined"
                  />
                </div>
              </StepContent>
            </Step>

            <Step key={1}>
              <StepLabel>Choose your room</StepLabel>
              <StepContent>
                <div>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={inputChanged}
                    name="room"
                    value={reservation.room}
                  >
                    <MenuItem value={1}>Laundry</MenuItem>
                    <MenuItem value={2}>Sauna</MenuItem>
                    <MenuItem value={3}>Common room</MenuItem>3
                  </Select>
                </div>
              </StepContent>
            </Step>

            <Step key={2}>
              <StepLabel>Choose start time</StepLabel>
              <StepContent>
                <div>
                  <TextField
                    id="starttimeID"
                    label="From"
                    name="startTime"
                    margin="dense"
                    type="datetime-local"
                    defaultValue={moment()
                      .add(1, "h")
                      .startOf("hour")
                      .format("yyyy-MM-DTHH:mm")}
                    onChange={inputChanged}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
              </StepContent>
            </Step>
            <Step key={3}>
              <StepLabel>Choose end time</StepLabel>
              <StepContent>
                <div>
                  <TextField
                    id="endtimeID"
                    label="to"
                    name="endTime"
                    margin="dense"
                    type="datetime-local"
                    defaultValue={moment()
                      .add(2, "h")
                      .startOf("hour")
                      .format("yyyy-MM-DTHH:mm")}
                    onChange={inputChanged}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
              </StepContent>
            </Step>
            <Step key={4}>
              <StepLabel>Confirm reservation</StepLabel>
              <StepContent>
                <div>
                  <Typography>
                    Room: {renderRoomName(reservation.room)}
                  </Typography>
                  <Typography>
                    Date of reservation:{" "}
                    {moment(reservation.startTime).format("DD.MM.YYYY")}
                  </Typography>
                  <Typography>
                    Reservation time:{" "}
                    {moment(reservation.startTime).format("HH:mm")} -{" "}
                    {moment(reservation.endTime).format("HH:mm")}
                  </Typography>

                  <div></div>
                </div>
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
export default AddReservation;
