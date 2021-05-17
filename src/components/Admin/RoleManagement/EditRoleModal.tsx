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
import { useUpdateRole } from "hooks/mutations/roles";
import { useRole } from "hooks/queries/roles";
import IRole from "interfaces/roles/role.interface";
import * as React from "react";
import { useContext, useState } from "react";
import * as yup from "yup";

const validationSchema = yup.object({
  roleName: yup
    .string()
    .required("Role name is required")
    .min(3, "Role name must have minium six characters"),
});

interface Props {
  roleId: string;
}

const EditRoleModal: React.FC<Props> = ({ roleId }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { alert } = useContext(AlertContext);
  const updateRole = useUpdateRole();
  const { data: role } = useRole(roleId);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values: IRole) => {
    setIsLoading(true);
    updateRole.mutate(
      { roleId, updatedProperties: values },
      {
        onSuccess: () => {
          setIsLoading(false);
          handleClose();
          alert("success", "Edit role successfully");
        },
        onError: () => {
          setIsLoading(false);
          alert("error", "Edit role failed");
        },
      }
    );
  };
  return (
    <>
      <IconButton onClick={handleOpen}>
        <Tooltip title="Edit role">
          <EditIcon />
        </Tooltip>
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <div className="mx-72 my-4 bg-white border border-gray-200 shadow-2xl rounded-2xl">
          <div className="mx-20">
            <div className="py-4">
              <Typography className="text-2xl font-bold">Edit role</Typography>
            </div>
            <hr />
          </div>
          {role ? (
            <Formik
              initialValues={{
                roleName: role.roleName,
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

export default EditRoleModal;
