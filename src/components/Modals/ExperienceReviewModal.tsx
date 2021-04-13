import { Button } from "@material-ui/core";
import { createExperienceReview } from "api/review";
import BlackStarIcon from "assets/images/icons/blackstar.svg";
import StarIcon from "assets/images/icons/star.svg";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import MyModal from "components/Shared/MyModal";
import { Field, Form, Formik } from "formik";
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { showAlert } from "redux/actions/alert/alertAction";

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
  const [numOfStars, setNumOfStars] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

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
      if (review) {
        setOpen(false);
        dispatch(showAlert("success", "Đánh giá thành công"));
      }
    } catch (err) {
      console.error(err);
      setOpen(false);
      dispatch(showAlert("error", "Đánh giá thất bại"));
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
                    <p className="text-lg">Số sao: </p>
                    <span
                      className="ml-2 cursor-pointer"
                      onClick={() => setNumOfStars(1)}
                    >
                      <img
                        width={16}
                        height={16}
                        src={numOfStars >= 1 ? BlackStarIcon : StarIcon}
                        alt="review star"
                      />
                    </span>
                    <span
                      className="ml-2 cursor-pointer"
                      onClick={() => setNumOfStars(2)}
                    >
                      <img
                        width={16}
                        height={16}
                        src={numOfStars >= 2 ? BlackStarIcon : StarIcon}
                        alt="review star"
                      />
                    </span>
                    <span
                      className="ml-2 cursor-pointer"
                      onClick={() => setNumOfStars(3)}
                    >
                      <img
                        width={16}
                        height={16}
                        src={numOfStars >= 3 ? BlackStarIcon : StarIcon}
                        alt="review star"
                      />
                    </span>
                    <span
                      className="ml-2 cursor-pointer"
                      onClick={() => setNumOfStars(4)}
                    >
                      <img
                        width={16}
                        height={16}
                        src={numOfStars >= 4 ? BlackStarIcon : StarIcon}
                        alt="review star"
                      />
                    </span>
                    <span
                      className="ml-2 cursor-pointer"
                      onClick={() => setNumOfStars(5)}
                    >
                      <img
                        width={16}
                        height={16}
                        src={numOfStars >= 5 ? BlackStarIcon : StarIcon}
                        alt="review star"
                      />
                    </span>
                  </div>
                  <div>
                    <Field
                      as="textarea"
                      name="content"
                      className="w-full h-36 p-4 border border-gray-300"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      className="bg-secondary-blue text-white"
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
