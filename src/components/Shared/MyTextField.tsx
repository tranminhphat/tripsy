import { TextField } from "@material-ui/core";
import { FieldAttributes, useField } from "formik";
import * as React from "react";

type MyTextFieldProps = {
  className: string;
  label: string;
  type?: string;
} & FieldAttributes<{}>;

const MyTextField: React.FC<MyTextFieldProps> = ({
  className,
  label,
  type,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      className={className}
      label={label}
      type={type}
      helperText={errorText}
      error={!!errorText}
      {...field}
      InputLabelProps={{ className: "text-gray-400" }}
    />
  );
};

export default MyTextField;
