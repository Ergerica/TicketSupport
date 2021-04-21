import React from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Grid,
  InputAdornment,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import StripeTextField from "../subscription/stripe/StripeTextField";
import { IbanElement } from "@stripe/react-stripe-js";

function CreateTicketForm(props) {
  const {
    stripeError,
    setStripeError,
    amount,
    amountError,
    onAmountChange,
    description,
    title,
    type,
    setType,
    setTitle,
    setDescription,
    name,
    setName,
    email,
    setEmail,
  } = props;

  return (
    <Grid container spacing={2} justify="space-between">
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          margin="none"
          required
          fullWidth
          label="Titulo"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setName(event.target.value);
          }}
          autoFocus
          autoComplete="off"
          type="text"
        />
      </Grid>

      <Grid item xs={12}>
        <InputLabel required id="demo-simple-select-label">
          Tipo
        </InputLabel>
        <Select
          fullWidth
          required
          value={type}
          onChange={(event) => {
            setType(event.target.value);
          }}
          variant="outlined"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        >
          <MenuItem value={10}>Buzon de sugerencias</MenuItem>
          <MenuItem value={20}>Error de UI(Interfaz de usuario)</MenuItem>
          <MenuItem value={30}>Error de base de datos</MenuItem>
          <MenuItem value={30}>Error de servidor</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          variant="outlined"
          fullWidth
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
            console.log({ description });
          }}
          type="email"
          margin="none"
          label="Descripcion"
          multiline
          name="comment"
          rows={3}
        />
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
