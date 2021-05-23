import {
  Button,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import MyTextField from "components/Shared/MyTextField";
import AlertContext from "contexts/AlertContext";
import { Form, Formik } from "formik";
import { useUpdateTheme } from "hooks/mutations/themes";
import { useTheme } from "hooks/queries/themes";
import * as React from "react";
import { useContext, useState } from "react";
import * as yup from "yup";

const validationSchema = yup.object({
  themeName: yup
    .string()
    .required("Theme name is required")
    .min(3, "Theme name must have minium six characters"),
});

interface Props {
  themeId: string;
}

const EditThemeModal: React.FC<Props> = ({ themeId }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { alert } = useContext(AlertContext);
  const updateTheme = useUpdateTheme();
  const { data: theme } = useTheme(themeId);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    updateTheme.mutate(
      { themeId, updatedProperties: values },
      {
        onSuccess: () => {
          setIsLoading(false);
          handleClose();
          alert("success", "Edit theme successfully");
        },
        onError: () => {
          setIsLoading(false);
          alert("error", "Edit theme failed");
        },
      }
    );
  };
  return (
    <>
      <IconButton onClick={handleOpen}>
        <Tooltip title="Edit theme">
          <EditIcon />
        </Tooltip>
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <div className="mx-72 my-4 bg-white border border-gray-200 shadow-2xl rounded-2xl">
          <div className="mx-20">
            <div className="py-4">
              <Typography className="text-2xl font-bold">Edit theme</Typography>
            </div>
            <hr />
          </div>
          {theme ? (
            <Formik
              initialValues={{
                themeName: theme.value,
              }}
              onSubmit={(values) => {
                handleSubmit({ value: values.themeName });
              }}
              validationSchema={validationSchema}
            >
              {() => (
                <Form className="mt-6 mx-20">
                  <div className="mt-4">
                    <MyTextField
                      label="Theme name"
                      name="themeName"
                      className="w-full"
                    />
                  </div>
                  <div className="my-8 w-4/12 md:col-span-2 h-12 mx-auto">
                    <Button
                      className="outline:none w-full h-full bg-secondary text-white"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? <MyLoadingIndicator /> : <p>Edit</p>}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            <MyLoadingIndicator />
          )}
        </div>
      </Modal>
    </>
  );
};

export default EditThemeModal;
