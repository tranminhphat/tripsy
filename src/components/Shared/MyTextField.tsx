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
  return <TextField className={className} label={label} {...field} />;
};

export default MyTextField;
