import { Button } from "@material-ui/core";
import { getExperienceById } from "api/experiences";
import MyTextField from "components/Shared/MyTextField";
import { Formik, Form } from "formik";
import * as React from "react";
import { useParams } from "react-router-dom";

interface Props {
  stepProps: any;
}

const Step3: React.FC<Props> = ({ stepProps }) => {
  const { steps, activeStep, handleNext, handleBack } = stepProps;
  const [language, setLanguage] = React.useState("");
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (id: string) => {
    const { data } = await getExperienceById(id, ["language"]);
    if (data) {
      const { language } = data.experience;
      setLanguage(language);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Ngôn ngữ sử dụng</h1>
      {!isLoading ? (
        <Formik
          initialValues={{ experienceLanguage: language ? language : "" }}
          onSubmit={(values) => {
            handleNext(values.experienceLanguage);
          }}
        >
          {({ values }) => (
            <Form className="flex flex-col">
              <div>
                <label className="text-xs mb-4 uppercase text-gray-400">
                  Giới tính
                </label>
                <div>
                  <MyTextField
                    label="Experience language"
                    name="experienceLanguage"
                    className="w-full"
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
                    disabled={!values.experienceLanguage}
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

export default Step3;
