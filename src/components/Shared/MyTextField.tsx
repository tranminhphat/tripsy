import * as React from "react";
import { TextField } from "@material-ui/core";
import { FieldAttributes, useField } from "formik";

type MyTextFieldProps = {
  className: string;
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
      <label
        htmlFor={props.name}
        style={{ fontFamily: "Lora" }}
        className="text-xs font-bold mb-4 uppercase text-grey-darkest"
      >
        {label}
      </label>
      <TextField
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
