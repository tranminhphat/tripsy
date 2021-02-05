import { TextField, Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as React from "react";

interface Values {
  email: string;
  password: string;
}
interface Props {
  onSubmit: (vavlues: Values) => void;
}

export const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({ values, handleChange, handleBlur }) => (
        <Form>
          <div>
            <TextField
              name="email"
              label="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {/* <div>
            <TextField
              name="username"
              label="Username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div> */}
          <div>
            <TextField
              name="password"
              label="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <pre>{JSON.stringify(values, null, 2)}</pre>
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  );
};
