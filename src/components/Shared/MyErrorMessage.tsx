import * as React from "react";
import WarningIcon from "@material-ui/icons/Warning";

interface Props {}

const MyErrorMessage: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex items-center justify-center w-full rounded-xl bg-red-500 p-4 text-md text-white font-bold">
      <WarningIcon />
      <p>{children}</p>
    </div>
  );
};

export default MyErrorMessage;
