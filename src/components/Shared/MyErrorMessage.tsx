import WarningIcon from "@material-ui/icons/Warning";
import * as React from "react";

interface Props {}

const MyErrorMessage: React.FC<Props> = ({ children }) => {
  if (children) {
    return (
      <div className="flex items-center justify-center uppercase w-full rounded-xl bg-red-500 p-4 text-md text-white font-bold">
        <WarningIcon />
        <p className="ml-2">{children}</p>
      </div>
    );
  } else {
    return null;
  }
};

export default MyErrorMessage;
