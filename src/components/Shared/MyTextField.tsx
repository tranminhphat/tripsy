import { TextField } from "@material-ui/core";
import { FieldAttributes, useField } from "formik";
import * as React from "react";

type MyTextFieldProps = {
  className?: string;
  label?: string;
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
    <>
      {label ? (
        <label
          htmlFor={props.name}
          className="text-xs mb-4 uppercase text-gray-400"
        >
          {label}
        </label>
      ) : null}
      <TextField
        size="small"
        variant="outlined"
        className={className}
        type={type}
        helperText={errorText}
        error={!!errorText}
        {...field}
        InputLabelProps={{ className: "text-gray-400" }}
      />
    </>
  );
};

export default MyTextField;
