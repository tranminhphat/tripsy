import { Snackbar } from "@material-ui/core";
import * as React from "react";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { AlertType } from "../../@types/alertType";
import { closeAlert } from "../../actions/alert/alertAction";

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
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert severity={alertType}>{alertMessage}</Alert>
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
