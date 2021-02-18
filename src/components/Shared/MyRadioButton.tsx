import * as React from "react";
import { FieldAttributes, useField } from "formik";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

type MyRadioButtonProps = { label: string } & FieldAttributes<{}>;

const MyRadioButton: React.FC<MyRadioButtonProps> = ({ label, ...props }) => {
  const [field] = useField<{}>(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

export default MyRadioButton;
