import { Select } from "@material-ui/core";
import { FieldAttributes, useField } from "formik";
import * as React from "react";

type MySelectProps = {
  className?: string;
  label?: string;
  multiple?: boolean;
  renderValue?: any;
} & FieldAttributes<{}>;

const MyTextField: React.FC<MySelectProps> = ({
  children,
  className,
  label,
  multiple,
  renderValue,
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
      <Select
        className={className}
        multiple
        error={!!errorText}
        variant="outlined"
        {...field}
        renderValue={renderValue}
      >
        {children}
      </Select>
      <div className="text-xs ml-4 text-danger mt-2">{errorText}</div>
    </>
  );
};

export default MyTextField;
