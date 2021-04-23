import React from "react";
import {
  TextField,
  Grid,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

function CreateTicketForm(props) {
  const { description, title, type, setType, setTitle, setDescription } = props;

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
          <MenuItem value={"Buzon de sugerencias"}>
            Buzon de sugerencias
          </MenuItem>
          <MenuItem value={"Error de UI(Interfaz de usuario)"}>
            Error de UI(Interfaz de usuario)
          </MenuItem>
          <MenuItem value={"Error de base de datos"}>
            Error de base de datos
          </MenuItem>
          <MenuItem value={"Error de servidor"}>Error de servidor</MenuItem>
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

CreateTicketForm.propTypes = {};

export default CreateTicketForm;
