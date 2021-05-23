import { Button, Modal, Typography } from "@material-ui/core";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import MyTextField from "components/Shared/MyTextField";
import AlertContext from "contexts/AlertContext";
import { Form, Formik } from "formik";
import { useCreateTheme } from "hooks/mutations/themes";
import * as React from "react";
import { useContext, useState } from "react";
import * as yup from "yup";

const validationSchema = yup.object({
  themeName: yup
    .string()
    .required("Theme name is required")
    .min(6, "Theme name must have minium six characters"),
});

interface Props {}

const InsertThemeModal: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { alert } = useContext(AlertContext);
  const createTheme = useCreateTheme();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    createTheme.mutate(
      { model: values },
      {
        onSuccess: () => {
          setIsLoading(false);
          handleClose();
          alert("success", "Add theme successfully");
        },
        onError: () => {
          setIsLoading(false);
          alert("error", "Add theme failed");
        },
      }
    );
  };
  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        className="bg-secondary text-white"
      >
        Add theme
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div className="mx-72 my-4 bg-white border border-gray-200 shadow-2xl rounded-2xl">
          <div className="mx-20">
            <div className="py-4">
              <Typography className="text-2xl font-bold">Add theme</Typography>
            </div>
            <hr />
          </div>
          <Formik
            initialValues={{
              themeName: "",
            }}
            onSubmit={(values) => {
              handleSubmit({ value: values.themeName });
            }}
            validationSchema={validationSchema}
          >
            {({ values }) => (
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
                    {isLoading ? <MyLoadingIndicator /> : <p>Add</p>}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
};

export default InsertThemeModal;
