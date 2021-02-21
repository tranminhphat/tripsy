import ErrorObject from "interfaces/common/error-object.interface";
import * as React from "react";

const useErrorHandler = (): [string, (errorObject: any) => void] => {
  const [error, setError] = React.useState("");

  const setErrorMessage = (errorObject: ErrorObject) => {
    setError(errorObject.userMessage);
  };

  return [error, setErrorMessage];
};

export default useErrorHandler;
