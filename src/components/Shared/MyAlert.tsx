import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import AlertContext from "contexts/AlertContext";
import * as React from "react";
import { useContext } from "react";

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const MyAlert: React.FC = () => {
  const { alert, isAlert, alertType, alertMessage } = useContext(AlertContext);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    alert(undefined);
  };

  return (
    <Snackbar
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      open={isAlert}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={alertType}>
        {alertMessage}
      </Alert>
    </Snackbar>
  );
};

export default MyAlert;
