import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Button, Box, withTheme } from "@material-ui/core";

import DetailForm from "./DetailForm";
import FormDialog from "../../../../shared/components/FormDialog";

import ButtonCircularProgress from "../../../../shared/components/ButtonCircularProgress";
import { cancelTicket } from "../../../../api";

const AddBalanceDialog = withTheme(function (props) {
  const { open, onClose, onSuccess, ticket, setStatus } = props;

  const isAdmin = React.useMemo(() => {
    return !!localStorage.getItem("current_user")
      ? JSON.parse(localStorage.getItem("current_user")).userType !== "user"
      : false;
  }, []);

  const [loading] = useState(false);

  const renderPaymentComponent = () => {
    return (
      <Fragment>
        <Box mb={2}>
          <DetailForm ticket={ticket} setStatus={setStatus} />
        </Box>
      </Fragment>
    );
  };

  return (
    <FormDialog
      open={open}
      onClose={onClose}
      headline="Informacion de ticket"
      hideBackdrop={false}
      loading={loading}
      onFormSubmit={async (event) => {
        event.preventDefault();
        onSuccess();
      }}
      content={<Box pt={1}>{renderPaymentComponent()}</Box>}
      actions={
        <Fragment>
          {!isAdmin ? (
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              type="submit"
              size="large"
              disabled={loading}
              onClick={() => {
                cancelTicket(ticket.ticketID).then(() => {
                  window.location.reload();
                });
              }}
            >
              Cancelar ticket{loading && <ButtonCircularProgress />}
            </Button>
          ) : null}
        </Fragment>
      }
    />
  );
});

AddBalanceDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

function Wrapper(props) {
  const { open, onClose, onSuccess, ticket, setStatus } = props;
  return (
    <div>
      {open && (
        <AddBalanceDialog
          open={open}
          ticket={ticket}
          onClose={onClose}
          onSuccess={onSuccess}
          setStatus={setStatus}
        />
      )}
    </div>
  );
}

AddBalanceDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default Wrapper;
