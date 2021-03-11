import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { FieldAttributes, useField } from "formik";
import * as React from "react";

type MyCheckboxProps = { label: string } & FieldAttributes<{}>;

const MyCheckbox: React.FC<MyCheckboxProps> = ({ label, ...props }) => {
  const [field] = useField<{}>(props);
  return <FormControlLabel {...field} control={<Checkbox />} label={label} />;
};

export default MyCheckbox;
