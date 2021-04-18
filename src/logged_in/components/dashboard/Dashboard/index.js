import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { List, Divider, Paper, withStyles } from "@material-ui/core";
import TicketTable from "./TicketTable";
import TicketInfo from "./TicketInfo";

const styles = {
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.26)",
  },
};

function Dashboard(props) {
  const {
    transactions,
    classes,
    openAddBalanceDialog,
    selectDashboard,
  } = props;

  useEffect(selectDashboard, [selectDashboard]);

  return (
    <Paper>
      <List disablePadding>
        <TicketInfo openAddBalanceDialog={openAddBalanceDialog} />
        <Divider className={classes.divider} />
        <TicketTable transactions={transactions} />
      </List>
    </Paper>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectDashboard: PropTypes.func.isRequired,
  openAddBalanceDialog: PropTypes.func.isRequired,
};

export default withStyles(styles)(Dashboard);
