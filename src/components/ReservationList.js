import React, { useState, useEffect } from "react";

import AddReservation from './AddReservation';

import Grid from "@material-ui/core/Grid";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { Typography } from "@material-ui/core";
import moment from "moment";
function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const fetchReservations = () => {
    fetch("https://hoco-api.herokuapp.com/getreservations")
      .then((response) => response.json())
      .then((data) => setReservations(data))
      .catch((err) => console.log(err));
  };

  const addReservation = (newReservation) => {
    fetch("https://hoco-api.herokuapp.com/api/reservations", {
      method: "POST",
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

  useEffect(() => {
    fetchReservations();
  }, []);

  const gridColumns = [
    {
      headerName: "Id",
      width: 100,
      field: "id",
    },
    {
      headerName: "Apartment",
      width: 100,

      field: "apartment",
    },
    {

        headerName: "Booking date",
        field: "bookingDate",
        cellRendererFramework: (params) =>
          moment(params.value).format("DD.MM.YYYY HH:mm"),
      },
    {
      headerName: "Starting time",
      field: "startTime",
      cellRendererFramework: (params) =>
          moment(params.value).format("HH:mm"),
    },
    {
      headerName: "End time",
      field: "endTime",
      cellRendererFramework: (params) =>
          moment(params.value).format("HH:mm"),
    },
    {
      headerName: "Reservation date",
      field: "reservationDate",
      cellRendererFramework: (params) =>
          moment(params.value).format("DD.MM.YYYY"),
    },
    {
      headerName: "Invoice status",
      field: "invoiced",
    },
  ];

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Typography variant="h5">Reservations Handling</Typography>
          <AddReservation />
        </Grid>
        <Grid item xs={9}>
          <div
            border={1}
            className="ag-theme-material"
            style={{ height: 600, width: "60%", margin: "auto" }}
          >
            <Typography variant="h5">Reservations</Typography>
            <AgGridReact
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
