import React from "react";
import PropTypes from "prop-types";
import {
  Drawer,
  IconButton,
  Toolbar,
  Divider,
  Typography,
  Box,
  withStyles,
  Grid,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const drawerWidth = 240;

const styles = {
  toolbar: {
    minWidth: drawerWidth,
  },
};

function SideDrawer(props) {
  const { classes, onClose, open } = props;
  const user = JSON.parse(localStorage.getItem("current_user"));
  return (
    <Drawer anchor="right" open={open} variant="temporary" onClose={onClose}>
      <Toolbar disableGutters className={classes.toolbar}>
        <Box
          pl={3}
          pr={3}
          display="flex"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
        >
          <Typography variant="h6">Perfil</Typography>
          <IconButton
            onClick={onClose}
            color="primary"
            aria-label="Close Sidedrawer"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Divider />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 20,
        }}
      >
        <Typography variant="body1" color="textSecondary">
          Nombre:
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {user.name}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Email:
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {user.email}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Tipo:
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {user.userType}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Fecha de registro:
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {new Date(user.createdAt).toISOString().split("T")[0]}
        </Typography>
      </div>
    </Drawer>
  );
}

SideDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(SideDrawer);
