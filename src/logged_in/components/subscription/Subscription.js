import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { List, Divider, Paper, withStyles } from "@material-ui/core";

const styles = {
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.26)",
  },
};

function Subscription(props) {
  const { classes, selectSubscription } = props;

  useEffect(selectSubscription, [selectSubscription]);

  return (
    <Paper>
      <List disablePadding>
        <Divider className={classes.divider} />
      </List>
    </Paper>
  );
}

Subscription.propTypes = {
  classes: PropTypes.object.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectSubscription: PropTypes.func.isRequired,
  openAddBalanceDialog: PropTypes.func.isRequired,
};

export default withStyles(styles)(Subscription);
