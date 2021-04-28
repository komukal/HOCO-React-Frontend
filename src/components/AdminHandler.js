import React, { useState, useEffect } from "react";
import RoomDetails from "./RoomDetails";
import AddRoom from "./AddRoom";
import AddReservation from "./AddReservation";
import ReservationsCalendar from "./ReservationsCalendar";
import Grid from "@material-ui/core/Grid";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { IconButton, Tooltip, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import moment from "moment";
function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);

  const fetchReservations = () => {
    fetch("https://hoco-api.herokuapp.com/getreservations")
      .then((response) => response.json())
      .then((data) => setReservations(data))
      .catch((err) => console.log(err));
  };
  const fetchRooms = () => {
    fetch("https://hoco-api.herokuapp.com/getrooms")
      .then((response) => response.json())
      .then((data) => setRooms(data))
      .catch((err) => console.log(err));
  };
  const addReservation = (newReservation) => {
    fetch("https://hoco-api.herokuapp.com/api/reservations", {
      method: "POST",
      body: JSON.stringify(newReservation),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          fetchReservations();
        } else {
          alert("error");
        }
      })
      .catch((err) => console.error(err));
  };
  const addRoom = (newRoom) => {
    fetch("https://hoco-api.herokuapp.com/api/rooms/", {
      method: "POST",
      body: JSON.stringify(newRoom),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          fetchRooms();
        } else {
          alert("error");
        }
      })
      .catch((err) => console.error(err));
  };

  const deleteReservation = (url) => {
    fetch("https://hoco-api.herokuapp.com/api/reservations/" + url, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          fetchReservations();
        } else {
          alert("error");
        }
      })
      .catch((err) => console.error(err));
  };
  const deleteRoom = (id) => {
    fetch("https://hoco-api.herokuapp.com/api/rooms/" + id, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          fetchRooms();
        } else {
          alert("error");
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchReservations();
    fetchRooms();
  }, []);

  const gridColumns = [
    {
      field: "id",
      headerName: "",
      width: 100,
      cellRendererFramework: (params) => (
        <div>
          {" "}
          <Tooltip title="Delete reservation" placement="top">
            <IconButton
              onClick={() => deleteReservation(params.value)}
              aria-label="delete"
              color="secondary"
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
    {
      headerName: "Id",
      width: 100,
      field: "id",
    },
    {
      headerName: "Room",
      field: "room.roomName",
    },
    {
      headerName: "Apartment",
      width: 100,

      field: "apartment",
    },

    {
      headerName: "Start",
      field: "startTime",
      width: 100,

      cellRendererFramework: (params) => moment(params.value).format("HH:mm"),
    },
    {
      headerName: "End",
      field: "endTime",
      width: 100,

      cellRendererFramework: (params) => moment(params.value).format("HH:mm"),
    },
    {
      headerName: "Date",
      field: "startTime",
      cellRendererFramework: (params) =>
        moment(params.value).format("DD.MM.YYYY"),
    },
    {
      headerName: "Booking date",
      field: "bookingDate",
      cellRendererFramework: (params) =>
        moment(params.value).format("HH:mm DD.MM.YYYY"),
    },
    {
      headerName: "Invoice status",
      field: "invoiced",
    },
  ];

  return (
    <div>
      <Grid
        style={{
          alignItems: "center",
          alignContent: "center",
          textAlign: "center",
          marginTop: 30,
        }}
        container
        spacing={2}
      >
        <Grid
          item
          lg={2}
          xs={12}
          style={{
            alignItems: "center",
            alignContent: "center",
            textAlign: "center",
            marginTop: 30,
          }}
        >
          <div>
            <Typography variant="h5">Room management</Typography>
            <AddRoom addRoom={addRoom} />
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          lg={10}
          style={{
            alignItems: "center",
            alignContent: "center",
            textAlign: "center",
            marginTop: 30,
          }}
        >
          <Grid spacing="3" container>
            {rooms.map((room) => (
              <Grid item xs={12} md={6} lg={3}>
                <Card style={{ width: 345 }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        #{room.roomId} | {room.roomName}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {room.roomDescription}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Tooltip title="Room is open between:" placement="top">
                      <Button size="small" variant="outlined" color="primary">
                        {room.openTime} - {room.closeTime}
                      </Button>
                    </Tooltip>
                    <RoomDetails Room={room} />
                    <Button
                      id={room.roomId}
                      name={room.roomId}
                      onClick={() => deleteRoom(room.roomId)}
                      size="small"
                      variant="contained"
                      color="secondary"
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid
          item
          xs={4}
          style={{ alignItems: "center", textAlign: "center", marginTop: 30 }}
        >
          <Typography variant="h5">Reservations overview</Typography>
          <ReservationsCalendar Reservations={reservations} />
        </Grid>
        <Grid
          item
          xs={8}
          style={{
            height: 800,
            alignItems: "center",
            textAlign: "center",
            marginTop: 30,
          }}
        >
          <div
            border={1}
            className="ag-theme-material"
            style={{ height: 700, width: "90%" }}
          >
            <Typography variant="h5">Reservations</Typography>
            <AddReservation addReservation={addReservation} />

            <AgGridReact
              identifier="table-2"
              rowData={reservations}
              columnDefs={gridColumns}
              pagination={true}
              paginationAutoPageSize={true}
              suppressCellSelection={true}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
export default ReservationList;
