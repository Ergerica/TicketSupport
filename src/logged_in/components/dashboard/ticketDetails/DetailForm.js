import React from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Grid,
  InputAdornment,
  InputLabel,
  Select,
  Typography,
  MenuItem,
} from "@material-ui/core";
import StripeTextField from "../../subscription/stripe/StripeTextField";
import { IbanElement } from "@stripe/react-stripe-js";
const isAdmin = true;
function CreateTicketForm(props) {
  const { ticket, setStatus } = props;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1" color="textSecondary">
          ID:
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          {ticket.id}
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
            <MenuItem value={10}>Complete</MenuItem>
            <MenuItem value={20}>Cancelled</MenuItem>
            <MenuItem value={30}>In Progress</MenuItem>
          </Select>
        ) : (
          <Typography gutterBottom variant="subtitle1"></Typography>
        )}
        <Typography variant="body1" color="textSecondary">
          Responable:
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          {ticket.responsible}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Fecha Creación:
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          {ticket.creationDate}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Fecha de Solución:
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          {ticket.finishDate}
        </Typography>
      </Grid>
    </Grid>
  );
}

CreateTicketForm.propTypes = {
  stripeError: PropTypes.string.isRequired,
  setStripeError: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired,
  onAmountChange: PropTypes.func.isRequired,
  amountError: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
};

export default CreateTicketForm;
