import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import * as React from "react";
import { connect } from "react-redux";
import { AlertType } from "types/alertType";
import { closeAlert } from "redux/actions/alert/alertAction";

interface Props {
  isAlert: boolean;
  alertType: AlertType;
  alertMessage: string;
  closeAlert: () => void;
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const MyAlert: React.FC<Props> = ({
  isAlert,
  alertType,
  alertMessage,
  closeAlert,
}) => {
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    closeAlert();
    console.log(isAlert);
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

const mapDispatchToProps = (dispatch) => ({
  closeAlert: () => dispatch(closeAlert()),
});

const mapStateToProps = (state) => ({
  ...state.alert,
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAlert);
