import { Button } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { createUserReview } from "api/review";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import MyModal from "components/Shared/MyModal";
import AlertContext from "contexts/AlertContext";
import { Field, Form, Formik } from "formik";
import * as React from "react";
import { useContext, useState } from "react";

interface Props {
  open: boolean;
  setOpen: any;
  objectId: string;
}

const UserReviewModal: React.FC<Props> = ({ objectId, setOpen, open }) => {
  const [numOfStars, setNumOfStars] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const { alert } = useContext(AlertContext);

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

export default UserReviewModal;
