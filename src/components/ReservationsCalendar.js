import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "moment/locale/en-gb";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Container } from "@material-ui/core";

function ReservationsCalendar(props) {
  const localizer = momentLocalizer(moment);

  return (
    <Container style={{ height: "60vh" }}>
        <Calendar
          localizer={localizer}
          events={props.Reservations}
          defaultView="agenda"
          views={['month', 'day', 'agenda']}
          startAccessor={event=>{return moment(event.startTime).toDate(); }}
          popup={true}
          endAccessor={event=>{return moment(event.endTime).toDate(); }}
          titleAccessor={(event) => {
            return (
              event.room.roomName +
              " | Apartment: " +
              event.apartment 

            
            );
          }}
        />
    </Container>
  );
}
export default ReservationsCalendar;
