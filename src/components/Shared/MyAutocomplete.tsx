import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import * as React from "react";

interface Props {
  options: any[];
  value: any;
  inputValue: any;
  placeholder?: string;
  handleOnChange: (newValue: any) => void;
  handleOnInputChange: (newInpuValue: any) => void;
}

const MyAutocomplete: React.FC<Props> = ({
  options,
  value,
  inputValue,
  placeholder,
  handleOnChange,
  handleOnInputChange,
}) => {
  return (
    <Autocomplete
      className="w-full focus:border-none hover:border-none"
      value={value}
      onChange={(event: any, newValue: string | null) =>
        handleOnChange(newValue)
      }
      inputValue={inputValue}
      onInputChange={(event: any, newInputValue: string | null) =>
        handleOnInputChange(newInputValue)
      }
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
