import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  IbanElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Grid, Button, Box, withTheme } from "@material-ui/core";
import StripeCardForm from "../subscription/stripe/StripeCardForm";
import CreateTicketForm from "./CreateTicketForm";
import FormDialog from "../../../shared/components/FormDialog";
import ColoredButton from "../../../shared/components/ColoredButton";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";
import { createTicket } from "../../../api";

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const paymentOptions = ["SEPA Direct Debit"];

const AddBalanceDialog = withTheme(function (props) {
  const { open, theme, onClose, onSuccess } = props;

  const [loading, setLoading] = useState(false);
  const [paymentOption, setPaymentOption] = useState("SEPA Direct Debit");
  const [stripeError, setStripeError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState(0);
  const [amountError, setAmountError] = useState("");
  const elements = useElements();
  const stripe = useStripe();

  const onAmountChange = (amount) => {
    if (amount < 0) {
      return;
    }
    if (amountError) {
      setAmountError("");
    }
    setAmount(amount);
  };

  const getStripePaymentInfo = () => {
    switch (paymentOption) {
      case "SEPA Direct Debit": {
        return {
          type: "sepa_debit",
          sepa_debit: elements.getElement(IbanElement),
          billing_details: { email: email, name: name },
        };
      }
      default:
        throw new Error("No case selected in switch statement");
    }
  };

  const renderPaymentComponent = () => {
    return (
      <Fragment>
        <Box mb={2}>
          <CreateTicketForm
            stripeError={stripeError}
            setStripeError={setStripeError}
            setName={setName}
            setEmail={setEmail}
            setTitle={setTitle}
            setDescription={setDescription}
            setType={setType}
            name={name}
            email={email}
            amount={amount}
            title={title}
            type={type}
            description={description}
            amountError={amountError}
            onAmountChange={onAmountChange}
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
        if (amount <= 0) {
          setAmountError("Can't be zero");
          return;
        }
        if (stripeError) {
          setStripeError("");
        }
        setLoading(true);
        const { error } = await stripe.createPaymentMethod(
          getStripePaymentInfo()
        );
        if (error) {
          setStripeError(error.message);
          setLoading(false);
          return;
        }
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
                  alert("Ticket Agregado");
                  window.location.reload();
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
    <Elements stripe={stripePromise}>
      {open && (
        <AddBalanceDialog open={open} onClose={onClose} onSuccess={onSuccess} />
      )}
    </Elements>
  );
}

AddBalanceDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default Wrapper;
