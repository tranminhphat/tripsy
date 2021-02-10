import { TextField } from "@material-ui/core";
import { FieldAttributes, useField } from "formik";
import * as React from "react";

type MyTextFieldProps = {
  className: string;
  label: string;
} & FieldAttributes<{}>;

const MyTextField: React.FC<MyTextFieldProps> = ({
  className,
  label,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      className={className}
      InputLabelProps={{ className: "text-gray-400" }}
      label={label}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

export default MyTextField;
