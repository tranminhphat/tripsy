import { Button } from "@material-ui/core";
import { createUserReview } from "api/review";
import BlackStarIcon from "assets/images/icons/blackstar.svg";
import StarIcon from "assets/images/icons/star.svg";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import MyModal from "components/Shared/MyModal";
import AlertContext from "contexts/AlertContext";
import { Field, Form, Formik } from "formik";
import * as React from "react";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";

interface Props {
  open: boolean;
  setOpen: any;
  objectId: string;
}

const UserReviewModal: React.FC<Props> = ({ objectId, setOpen, open }) => {
  const [numOfStars, setNumOfStars] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { alert } = useContext(AlertContext);
  const dispatch = useDispatch();

  const handleCreateUserReview = async (
    objectId: string,
    numOfStars: number,
    content: string
  ) => {
    try {
      const review = await createUserReview(objectId, numOfStars, content);
      if (review) {
        setOpen(false);
        alert("success", "Đánh giá thành công");
      }
    } catch (err) {
      console.error(err);
      setOpen(false);
      alert("error", "Đánh giá thất bại");
    }
  };
  return (
    <MyModal size="xl" open={open} setOpen={setOpen}>
      {{
        header: <h1 className="text-2xl font-bold">Đánh giá người tổ chức</h1>,
        content: (
          <div>
            <Formik
              initialValues={{ content: "" }}
              onSubmit={(values) => {
                setIsLoading(true);
                handleCreateUserReview(objectId, numOfStars, values.content);
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

export default UserReviewModal;