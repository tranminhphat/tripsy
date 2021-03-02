import * as React from "react";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import MyRadioButton from "components/Shared/MyRadioButton";
import { Formik, Form } from "formik";
import { getExperienceById } from "api/experiences";

interface Props {
  stepProps: any;
}

const Step1: React.FC<Props> = ({ stepProps }) => {
  const { steps, activeStep, handleNext, handleBack } = stepProps;
  const [theme, setTheme] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (id: string) => {
    const { data } = await getExperienceById(id, ["theme"]);
    if (data) {
      const { theme } = data.experience;
      setTheme(theme);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Chọn chủ đề của trải nghiệm</h1>
      {!isLoading ? (
        <Formik
          initialValues={{ experienceTheme: theme ? theme : "" }}
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
                    checked={values.experienceTheme === "Food"}
                  />
                  <MyRadioButton
                    name="experienceTheme"
                    type="radio"
                    value="Culture"
                    label="Văn hóa và lịch sử"
                    checked={values.experienceTheme === "Culture"}
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
      ) : (
        <div>...loading</div>
      )}
    </div>
  );
};

export default Step1;
