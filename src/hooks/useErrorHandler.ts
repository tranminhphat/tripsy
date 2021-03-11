import ErrorObject from "interfaces/common/error-object.interface";
import { useState } from "react";

const useErrorHandler = (): [string, (errorObject: any) => void] => {
  const [error, setError] = useState("");

  const setErrorMessage = (errorObject: ErrorObject) => {
    setError(errorObject.userMessage);
  };

  return [error, setErrorMessage];
};

export default useErrorHandler;
