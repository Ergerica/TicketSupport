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

import DetailForm from "./DetailForm";
import FormDialog from "../../../../shared/components/FormDialog";

import HighlightedInformation from "../../../../shared/components/HighlightedInformation";
import ButtonCircularProgress from "../../../../shared/components/ButtonCircularProgress";

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");
const isAdmin = true;
const paymentOptions = ["SEPA Direct Debit"];

const AddBalanceDialog = withTheme(function (props) {
  const { open, theme, onClose, onSuccess, ticket, setStatus } = props;

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
          <DetailForm ticket={ticket} type={type} setStatus={setStatus} />
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
          {!isAdmin ? (
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              type="submit"
              size="large"
              disabled={loading}
              onClick={() => alert("HOLA")}
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
    <Elements stripe={stripePromise}>
      {open && (
        <AddBalanceDialog
          open={open}
          ticket={ticket}
          onClose={onClose}
          onSuccess={onSuccess}
          setStatus={setStatus}
        />
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
