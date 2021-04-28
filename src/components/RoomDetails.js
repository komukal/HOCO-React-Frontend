import { Button } from "@material-ui/core";
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function RoomDetails(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button size="small" onClick={handleClickOpen} color="primary">
        See details
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {props.Room.roomName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">{props.Room.roomDescription}</DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">Details:</DialogContentText>

          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              
              <TableBody>
                <TableRow key="1">
                  <TableCell component="th" scope="row">
                    Room identifier
                  </TableCell>
                  <TableCell align="right">{props.Room.roomId}</TableCell>
                  
                </TableRow>
                <TableRow key="2">
                  <TableCell component="th" scope="row">
                    Open between
                  </TableCell>
                  <TableCell align="right">{props.Room.openTime} to {props.Room.closeTime}</TableCell>
                  
                </TableRow>
                <TableRow key="3">
                  <TableCell component="th" scope="row">
                    Minimum reservation time
                  </TableCell>
                  <TableCell align="right">{props.Room.minReservationTime} minutes</TableCell>
                  
                </TableRow>
                <TableRow key="4">
                  <TableCell component="th" scope="row">
                    Maximum reservation time
                  </TableCell>
                  <TableCell align="right">{props.Room.maxReservationTime} minutes</TableCell>
                  
                </TableRow>
                <TableRow key="5">
                  <TableCell component="th" scope="row">
                   API Slug
                  </TableCell>
                  <TableCell align="right">{"https://hoco-api.herokuapp.com/api/rooms/"+props.Room.roomId}</TableCell>
                  
                </TableRow>
                
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>

          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default RoomDetails;
