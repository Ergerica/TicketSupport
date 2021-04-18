import React from "react";
import PropTypes from "prop-types";
import { ListItemText, Button, Toolbar, withStyles } from "@material-ui/core";

const styles = {
  toolbar: {
    justifyContent: "space-between",
  },
};

function TicketInfo(props) {
  const { classes, openAddBalanceDialog } = props;
  return (
    <Toolbar className={classes.toolbar}>
      <ListItemText primary="Tickets" secondary="Cuenta de user" />
      <Button
        variant="contained"
        color="secondary"
        onClick={openAddBalanceDialog}
        disableElevation
      >
        Agregar ticket
      </Button>
    </Toolbar>
  );
}

TicketInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  openAddBalanceDialog: PropTypes.func.isRequired,
};

export default withStyles(styles)(TicketInfo);
