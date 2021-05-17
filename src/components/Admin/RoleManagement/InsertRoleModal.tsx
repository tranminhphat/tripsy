import { Button, Modal, Typography } from "@material-ui/core";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import MyTextField from "components/Shared/MyTextField";
import AlertContext from "contexts/AlertContext";
import { Form, Formik } from "formik";
import { useCreateRole } from "hooks/mutations/roles";
import * as React from "react";
import { useContext, useState } from "react";
import * as yup from "yup";

const validationSchema = yup.object({
  roleName: yup
    .string()
    .required("Role name is required")
    .min(3, "Role name must have minium six characters"),
});

interface Props {}

const InsertRoleModal: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { alert } = useContext(AlertContext);
  const createRole = useCreateRole();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    createRole.mutate(
      { model: values },
      {
        onSuccess: () => {
          setIsLoading(false);
          handleClose();
          alert("success", "Add role successfully");
        },
        onError: () => {
          setIsLoading(false);
          alert("error", "Add role failed");
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
        Add role
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div className="mx-72 my-4 bg-white border border-gray-200 shadow-2xl rounded-2xl">
          <div className="mx-20">
            <div className="py-4">
              <Typography className="text-2xl font-bold">Add role</Typography>
            </div>
            <hr />
          </div>
          <Formik
            initialValues={{
              roleName: "",
            }}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
            validationSchema={validationSchema}
          >
            {({ values }) => (
              <Form className="mt-6 mx-20">
                <div className="mt-4">
                  <MyTextField
                    label="Role name"
                    name="roleName"
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

export default InsertRoleModal;
