import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" className={classes.title}>
            HOCO System
          </Typography>
          <Button color="inherit">Reservations</Button>
          <Button color="inherit">Rooms</Button>
          <Button color="inherit">Create Reservation</Button>

        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Navbar;
