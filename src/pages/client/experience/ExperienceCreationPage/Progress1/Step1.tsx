import { Button } from "@material-ui/core";
import MyRadioButton from "components/Shared/MyRadioButton";
import { Formik, Form } from "formik";
import * as React from "react";

interface Props {
  stepProps: any;
}

const Step1: React.FC<Props> = ({ stepProps }) => {
  const { steps, activeStep, handleNext, handleBack } = stepProps;

  return (
    <div>
      <h1 className="text-2xl font-bold">Chọn chủ đề của trải nghiệm</h1>
      <Formik
        initialValues={{ experienceTheme: "" }}
        onSubmit={(values) => handleNext(values.experienceTheme)}
      >
        {({ values }) => (
          <Form className="flex flex-col">
            <div>
              <div>
                <MyRadioButton
                  name="experienceTheme"
                  type="radio"
                  value="Food"
                  label="Ăn uống"
                />
                <MyRadioButton
                  name="experienceTheme"
                  type="radio"
                  value="Culture"
                  label="Văn hóa và lịch sử"
                />
              </div>

              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className="mr-2"
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="mr-2"
                  disabled={!values.experienceTheme}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Step1;
