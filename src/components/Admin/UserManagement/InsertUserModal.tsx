import { Button, Modal } from "@material-ui/core";
import { register } from "api/auth";
import AlertContext from "contexts/AlertContext";
import useErrorHandler from "hooks/useErrorHandler";
import IRegisterForm from "interfaces/forms/register-form.interface";
import * as React from "react";
import { useContext, useState } from "react";
import InsertUserForm from "./InsertUserForm";

interface Props {}

const InsertUserModal: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useErrorHandler();
  const { alert } = useContext(AlertContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values: IRegisterForm) => {
    try {
      setIsLoading(true);
      const { data } = await register(values);
      if (data) {
        setIsLoading(false);
        handleClose();
        alert("success", "Add user successfully");
      }
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        setErrorMessage(err.response.data.error);
        alert("error", "Add user failed");
      }
    }
  };
  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        className="bg-secondary text-white"
      >
        Add user
      </Button>
      <Modal open={open} onClose={handleClose}>
        <InsertUserForm
          error={errorMessage}
          isLoading={isLoading}
          onSubmit={(values: IRegisterForm) => handleSubmit(values)}
        />
      </Modal>
    </>
  );
};

export default InsertUserModal;
