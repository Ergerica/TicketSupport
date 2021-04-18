import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  withStyles,
} from "@material-ui/core";
import EnhancedTableHead from "../../../../shared/components/EnhancedTableHead";
import ColorfulChip from "../../../../shared/components/ColorfulChip";
import unixToDateString from "../../../../shared/functions/unixToDateString";
import HighlightedInformation from "../../../../shared/components/HighlightedInformation";
import currencyPrettyPrint from "../../../../shared/functions/currencyPrettyPrint";
import transitions from "@material-ui/core/styles/transitions";

const styles = (theme) => ({
  tableWrapper: {
    overflowX: "auto",
    width: "100%",
  },
  blackBackground: {
    backgroundColor: theme.palette.primary.main,
  },
  contentWrapper: {
    padding: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2),
    },
    width: "100%",
  },
  dBlock: {
    display: "block !important",
  },
  dNone: {
    display: "none !important",
  },
  firstData: {
    paddingLeft: theme.spacing(3),
  },
});

const colors = {
  Canceled: "#AB1243",
  "In Progress": "#00AA42",
  Complete: "#0055aa",
};

const rows = [
  {
    id: "id",
    numeric: false,
    label: "ID",
  },
  {
    id: "title",
    numeric: false,
    label: "Titulo",
  },
  {
    id: "status",
    numeric: false,
    label: "Estatus",
  },
  {
    id: "date",
    numeric: false,
    label: "Fecha",
  },
  {
    id: "responsible",
    numeric: false,
    label: "Responsable",
  },
];

const rowsPerPage = 25;

function DashboardTable(props) {
  const { transactions, theme, classes } = props;
  const [page, setPage] = useState(0);

  const handleChangePage = useCallback(
    (_, page) => {
      setPage(page);
    },
    [setPage]
  );

  if (transactions.length > 0) {
    return (
      <div className={classes.tableWrapper}>
        <Table aria-labelledby="tableTitle">
          <EnhancedTableHead rowCount={transactions.length} rows={rows} />
          <TableBody>
            {transactions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((transaction, index) => (
                <TableRow hover tabIndex={-1} key={index}>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.firstData}
                  >
                    {transaction.id}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.firstData}
                  >
                    {transaction.title}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <ColorfulChip
                      label={transaction.status}
                      color={colors[transaction.status]}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {unixToDateString(transaction.timestamp)}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {transaction.responsible ? transaction.responsible : ""}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={transactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          onChangePage={handleChangePage}
          classes={{
            select: classes.dNone,
            selectIcon: classes.dNone,
            actions: transactions.length > 0 ? classes.dBlock : classes.dNone,
            caption: transactions.length > 0 ? classes.dBlock : classes.dNone,
          }}
          labelRowsPerPage=""
        />
      </div>
    );
  }
  return (
    <div className={classes.contentWrapper}>
      <HighlightedInformation>
        No transactions received yet.
      </HighlightedInformation>
    </div>
  );
}

DashboardTable.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles, { withTheme: true })(DashboardTable);
