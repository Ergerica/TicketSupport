import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Button, Box, withTheme } from "@material-ui/core";
import CreateTicketForm from "./CreateTicketForm";
import FormDialog from "../../../shared/components/FormDialog";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";
import { createTicket } from "../../../api";

const AddBalanceDialog = withTheme(function (props) {
  const { open, onClose, onSuccess } = props;

  const [loading] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");

  const renderPaymentComponent = () => {
    return (
      <Fragment>
        <Box mb={2}>
          <CreateTicketForm
            setTitle={setTitle}
            setDescription={setDescription}
            setType={setType}
            title={title}
            type={type}
            description={description}
          />
        </Box>
        <HighlightedInformation>
          Llenar Todo
          <br />
          <b>Seriamente</b>
        </HighlightedInformation>
      </Fragment>
    );
  };

  return (
    <FormDialog
      open={open}
      onClose={onClose}
      headline="Agregar ticket"
      hideBackdrop={false}
      loading={loading}
      onFormSubmit={async (event) => {
        event.preventDefault();
        onSuccess();
      }}
      content={<Box pt={1}>{renderPaymentComponent()}</Box>}
      actions={
        <Fragment>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            type="submit"
            size="large"
            disabled={loading}
            onClick={() => {
              createTicket(title, description, type).then((r) => {
                if (r) {
                  return;
                }
                alert("Ha ocurrido un error.");
              });
            }}
          >
            Crear Ticket{loading && <ButtonCircularProgress />}
          </Button>
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
  const { open, onClose, onSuccess } = props;
  return (
    <div>
      {open && (
        <AddBalanceDialog open={open} onClose={onClose} onSuccess={onSuccess} />
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
