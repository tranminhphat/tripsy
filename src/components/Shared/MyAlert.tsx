import * as React from "react";
import { Snackbar } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import { closeAlert } from "redux/actions/alert/alertAction";

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const MyAlert: React.FC = () => {
  const { isAlert, alertType, alertMessage } = useSelector(
    (state) => state.alert
  );

  const dispatch = useDispatch();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeAlert());
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
