import React from "react";
import { Grid, Select, Typography, MenuItem } from "@material-ui/core";

function CreateTicketForm(props) {
  const { ticket, setStatus } = props;

  const isAdmin = React.useMemo(() => {
    return !!localStorage.getItem("current_user")
      ? JSON.parse(localStorage.getItem("current_user")).userType !== "user"
      : false;
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1" color="textSecondary">
          ID:
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          {ticket.ticketID}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Title:
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          {ticket.title}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Descripcion:
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {ticket.description}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Tipo:
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          {ticket.type}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1" color="textSecondary">
          Priodidad(1-5):
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          {ticket.priority}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Estado:
        </Typography>

        {isAdmin ? (
          <Select
            fullWidth
            required
            value={ticket.status}
            onChange={(event) => {
              setStatus(event.target.value);
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
          >
            <MenuItem value={"Complete"}>Complete</MenuItem>
            <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
            <MenuItem value={"Progress"}>In Progress</MenuItem>
          </Select>
        ) : (
          <Typography gutterBottom variant="subtitle1">
            {ticket.status}
          </Typography>
        )}
        <Typography variant="body1" color="textSecondary">
          Responable:
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          {ticket.creatorID}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Fecha Creación:
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          {new Date(ticket.createdAt).toISOString().split("T")[0]}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Fecha de ultima actualizacion:
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          {new Date(ticket.updatedAt).toISOString().split("T")[0]}
        </Typography>
      </Grid>
    </Grid>
  );
}

CreateTicketForm.propTypes = {};

export default CreateTicketForm;
