import * as React from "react";
import { FieldAttributes, useField } from "formik";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

type MyCheckboxProps = { label: string } & FieldAttributes<{}>;

const MyCheckbox: React.FC<MyCheckboxProps> = ({ label, ...props }) => {
  const [field] = useField<{}>(props);
  return <FormControlLabel {...field} control={<Checkbox />} label={label} />;
};

export default MyCheckbox;
