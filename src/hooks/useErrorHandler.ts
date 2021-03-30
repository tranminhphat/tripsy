import IErrorObject from "interfaces/common/error-object.interface";
import { useState } from "react";

const useErrorHandler = (): [string, (IErrorObject: any) => void] => {
  const [error, setError] = useState("");

  const setErrorMessage = (IErrorObject: IErrorObject) => {
    setError(IErrorObject.userMessage);
  };

  return [error, setErrorMessage];
};

export default useErrorHandler;
