import { Button } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { countReviews, createExperienceReview } from "api/review";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import MyModal from "components/Shared/MyModal";
import AlertContext from "contexts/AlertContext";
import { Field, Form, Formik } from "formik";
import { useUpdateExperience } from "hooks/mutations/experiences";
import * as React from "react";
import { useContext, useState } from "react";

interface Props {
  open: boolean;
  setOpen: any;
  objectId: string;
}

const ExperienceReviewModal: React.FC<Props> = ({
  open,
  setOpen,
  objectId,
}) => {
  const updateExperience = useUpdateExperience();
  const [numOfStars, setNumOfStars] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { alert } = useContext(AlertContext);

  const handleCreateExperienceReview = async (
    objectId: string,
    numOfStars: number,
    content: string
  ) => {
    try {
      const review = await createExperienceReview(
        objectId,
        numOfStars,
        content
      );
      const { data: reviews } = await countReviews({ objectId });
      updateExperience.mutate(
        {
          experienceId: objectId,
          updatedValues: {
            review: {
              totalItem: reviews.totalItems,
              averageStars: Number(reviews.averageStars),
            },
          },
        },
        {
          onSettled: () => {
            if (review) {
              setOpen(false);
              alert("success", "Đánh giá thành công");
            }
          },
        }
      );
    } catch (err) {
      console.error(err);
      setOpen(false);
      alert("error", "Đánh giá thất bại");
    }
  };

  return (
    <MyModal size="xl" open={open} setOpen={setOpen}>
      {{
        header: <h1 className="text-2xl font-bold">Đánh giá trải nghiệm</h1>,
        content: (
          <div>
            <Formik
              initialValues={{ content: "" }}
              onSubmit={(values) => {
                setIsLoading(true);
                handleCreateExperienceReview(
                  objectId,
                  numOfStars,
                  values.content
                );
                setIsLoading(false);
              }}
            >
              {() => (
                <Form>
                  <div className="flex items-center">
                    <Rating
                      name="simple-controlled"
                      value={numOfStars}
                      onChange={(event, newValue) => {
                        setNumOfStars(newValue as number);
                      }}
                    />
                  </div>
                  <div className="mt-2">
                    <Field
                      as="textarea"
                      name="content"
                      className="w-full h-36 p-4 border border-gray-300"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      className="bg-primary text-white"
                      variant="contained"
                      type="submit"
                    >
                      {!isLoading ? "Đánh giá" : <MyLoadingIndicator />}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        ),
      }}
    </MyModal>
  );
};

export default ExperienceReviewModal;
