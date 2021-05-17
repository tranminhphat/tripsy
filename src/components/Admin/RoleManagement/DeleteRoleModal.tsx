import {
  Button,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import AlertContext from "contexts/AlertContext";
import { useDeleteRole } from "hooks/mutations/roles";
import * as React from "react";
import { useContext, useState } from "react";

interface Props {
  roleId: string;
}

const DeleteRoleModal: React.FC<Props> = ({ roleId }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { alert } = useContext(AlertContext);
  const deleteRole = useDeleteRole();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (roleId: string) => {
    setIsLoading(true);
    deleteRole.mutate(
      { roleId },
      {
        onSuccess: () => {
          setIsLoading(false);
          handleClose();
          alert("success", "Delete role successfully");
        },
        onError: () => {
          setIsLoading(false);
          alert("error", "Delete role failed");
        },
      }
    );
  };
  return (
    <>
      <IconButton onClick={handleOpen}>
        <Tooltip title="Delete role">
          <ClearIcon />
        </Tooltip>
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <div className="mx-96 my-48 bg-white border border-gray-200 shadow-2xl rounded-2xl p-8">
          <div>
            <Typography className="text-xl font-bold">
              Do you want to delete this role?
            </Typography>
          </div>
          <div className="mt-4 flex justify-end">
            <div className="w-20 h-12 mr-2">
              <Button
                onClick={handleClose}
                className="w-full h-full overflow-hidden"
                variant="outlined"
              >
                Cancel
              </Button>
            </div>
            <div className="w-20 h-12">
              <Button
                onClick={() => handleSubmit(roleId)}
                variant="outlined"
                className="bg-secondary w-full h-full text-white overflow-hidden"
                disabled={isLoading}
              >
                {isLoading ? <MyLoadingIndicator /> : <p>Delete</p>}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteRoleModal;
