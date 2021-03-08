import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import * as React from "react";

interface Props {
  options: any[];
  value: any;
  setValue: (newValue: any) => void;
  setIsValid: (isValid: boolean) => void;
  inputValue: any;
  setInputValue: (newInputValue: any) => void;
  placeholder: string;
}

const MyAutocomplete: React.FC<Props> = ({
  options,
  setIsValid,
  value,
  setValue,
  inputValue,
  setInputValue,
  placeholder,
}) => {
  return (
    <Autocomplete
      className="w-full focus:border-none hover:border-none"
      value={value}
      onChange={(event: any, newValue: string | null) => {
        setValue(newValue);
        if (newValue) {
          setIsValid(true);
        }
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        if (options.includes(newInputValue)) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      }}
      options={options}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          className="hover:border-none hover:outline-none focus:border-none focus:outline-none"
          placeholder={placeholder}
          {...params}
          variant="outlined"
        />
      )}
    />
  );
};

export default MyAutocomplete;
