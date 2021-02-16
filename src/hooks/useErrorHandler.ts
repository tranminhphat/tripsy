import * as React from "react";

const useErrorHandler = (): [string, (errorObject: any) => void] => {
  const [error, setError] = React.useState("");

  const setErrorMessage = (errorObject) => {
    const firstPropertyOfErrorObject = errorObject[Object.keys(errorObject)[0]];
    if (typeof firstPropertyOfErrorObject === "object") {
      setError(
        firstPropertyOfErrorObject[Object.keys(firstPropertyOfErrorObject)[0]]
      );
    } else {
      setError(firstPropertyOfErrorObject);
    }
  };

  return [error, setErrorMessage];
};

export default useErrorHandler;
