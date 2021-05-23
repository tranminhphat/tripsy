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
import { useDeleteTheme } from "hooks/mutations/themes";
import * as React from "react";
import { useContext, useState } from "react";

interface Props {
  themeId: string;
}

const DeleteThemeModal: React.FC<Props> = ({ themeId }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { alert } = useContext(AlertContext);
  const deleteTheme = useDeleteTheme();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (themeId: string) => {
    setIsLoading(true);
    deleteTheme.mutate(
      { themeId },
      {
        onSuccess: () => {
          setIsLoading(false);
          handleClose();
          alert("success", "Delete theme successfully");
        },
        onError: () => {
          setIsLoading(false);
          alert("error", "Delete theme failed");
        },
      }
    );
  };
  return (
    <>
      <IconButton onClick={handleOpen}>
        <Tooltip title="Delete theme">
          <ClearIcon />
        </Tooltip>
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <div className="mx-96 my-48 bg-white border border-gray-200 shadow-2xl rounded-2xl p-8">
          <div>
            <Typography className="text-xl font-bold">
              Do you want to delete this theme?
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
                onClick={() => handleSubmit(themeId)}
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

export default DeleteThemeModal;
