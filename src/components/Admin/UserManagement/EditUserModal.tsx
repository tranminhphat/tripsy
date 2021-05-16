import { IconButton, Modal, Tooltip } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AlertContext from "contexts/AlertContext";
import { useUpdateUser } from "hooks/mutations/users";
import IRegisterForm from "interfaces/forms/register-form.interface";
import * as React from "react";
import { useContext, useState } from "react";
import EditUserForm from "./EditUserForm";

interface Props {
  userId: string;
}

const EditUserModal: React.FC<Props> = ({ userId }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { alert } = useContext(AlertContext);
  const updateUser = useUpdateUser();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values: IRegisterForm) => {
    setIsLoading(true);
    updateUser.mutate(
      { userId, values },
      {
        onSuccess: () => {
          setIsLoading(false);
          handleClose();
          alert("success", "Edit user successfully");
        },
        onError: (err) => {
          setIsLoading(false);
          alert("error", "Edit user failed");
        },
      }
    );
  };
  return (
    <>
      <IconButton onClick={handleOpen}>
        <Tooltip title="Edit user">
          <EditIcon />
        </Tooltip>
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <EditUserForm
          userId={userId}
          isLoading={isLoading}
          onSubmit={(values: IRegisterForm) => handleSubmit(values)}
        />
      </Modal>
    </>
  );
};

export default EditUserModal;
