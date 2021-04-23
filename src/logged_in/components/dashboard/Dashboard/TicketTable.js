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
import tickets from "@material-ui/core/styles/transitions";

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
  pending: "rgba(0, 0, 0, 0.87)",
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
  const { tickets, theme, classes, openTicketDetails } = props;
  const [page, setPage] = useState(0);

  const handleChangePage = useCallback(
    (_, page) => {
      setPage(page);
    },
    [setPage]
  );

  if (tickets.length > 0) {
    return (
      <div className={classes.tableWrapper}>
        <Table aria-labelledby="tableTitle">
          <EnhancedTableHead rowCount={tickets.length} rows={rows} />
          <TableBody>
            {tickets
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((ticket, index) => (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={index}
                  onClick={() => openTicketDetails(ticket)}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.firstData}
                  >
                    {ticket.ticketID}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.firstData}
                  >
                    {ticket.title}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <ColorfulChip
                      label={ticket.status}
                      color={`${colors[ticket.status]}`.toLowerCase()}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {new Date(ticket.createdAt).toISOString().split("T")[0]}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {ticket.creatorID ? ticket.creatorID : ""}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={tickets.length}
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
            actions: tickets.length > 0 ? classes.dBlock : classes.dNone,
            caption: tickets.length > 0 ? classes.dBlock : classes.dNone,
          }}
          labelRowsPerPage=""
        />
      </div>
    );
  }
  return (
    <div className={classes.contentWrapper}>
      <HighlightedInformation>No tickets received yet.</HighlightedInformation>
    </div>
  );
}

DashboardTable.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles, { withTheme: true })(DashboardTable);
