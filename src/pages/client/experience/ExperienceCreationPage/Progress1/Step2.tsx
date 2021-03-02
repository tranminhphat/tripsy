import { Button } from "@material-ui/core";
import { getExperienceById } from "api/experiences";
import MyTextField from "components/Shared/MyTextField";
import { Formik, Form } from "formik";
import * as React from "react";
import { useParams } from "react-router-dom";

interface Props {
  stepProps: any;
}

const Step2: React.FC<Props> = ({ stepProps }) => {
  const { steps, activeStep, handleNext, handleBack } = stepProps;
  const [title, setTitle] = React.useState("");
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (id: string) => {
    const { data } = await getExperienceById(id, ["title"]);
    if (data) {
      const { title } = data.experience;
      setTitle(title);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Tên của trải nghiệm</h1>
      {!isLoading ? (
        <Formik
          initialValues={{ experienceTitle: title ? title : "" }}
          onSubmit={(values) => {
            handleNext(values.experienceTitle);
          }}
        >
          {({ values }) => (
            <Form className="flex flex-col">
              <div>
                <div>
                  <MyTextField
                    label="Experience title"
                    name="experienceTitle"
                    value={values.experienceTitle}
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
                    className="mr-2"
                    type="submit"
                    disabled={!values.experienceTitle}
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

export default Step2;
