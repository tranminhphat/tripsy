import { Button, CircularProgress } from "@material-ui/core";
import { updateListOfGuest } from "api/activity";
import { deleteReceiptById, getReceipts } from "api/receipt";
import { createExperienceReview, createUserReview } from "api/review";
import { createRefund, getCheckoutSessionById } from "api/stripe";
import { getCurrentUser } from "api/users";
import BlackStarIcon from "assets/images/icons/blackstar.svg";
import StarIcon from "assets/images/icons/star.svg";
import MyModal from "components/Shared/MyModal";
import { Field, Form, Formik } from "formik";
import IReceipt from "interfaces/receipts/receipt.interface";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showAlert } from "redux/actions/alert/alertAction";

interface Props {}

const ExperienceListTab: React.FC<Props> = () => {
  const [receipts, setReceipts] = useState<IReceipt[]>();
  const [numOfStars, setNumOfStars] = useState(0);
  const dispatch = useDispatch();
  const [openUserReviewModal, setOpenUserReviewModal] = useState(false);
  const [openExperienceReviewModal, setOpenExperienceReviewModal] = useState(
    false
  );

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    const {
      data: {
        user: { _id: userId },
      },
    } = await getCurrentUser(["_id"]);
    if (userId) {
      const { data } = await getReceipts({ guestId: userId });
      if (data) {
        setReceipts(data);
      }
    }
  };

  const handleRefundExperience = async (
    checkOutSessionId: string,
    receipt: IReceipt
  ) => {
    const {
      data: { session },
    } = await getCheckoutSessionById(checkOutSessionId);
    if (session.payment_intent) {
      await deleteReceiptById(receipt._id!);
      await updateListOfGuest(receipt.activityId);
      await createRefund(session.payment_intent);
    }
  };

  const handleCreateUserReview = async (
    objectId: string,
    numOfStars: number,
    content: string
  ) => {
    try {
      const review = await createUserReview(objectId, numOfStars, content);
      if (review) {
        setOpenUserReviewModal(false);
        dispatch(showAlert("success", "Đánh giá thành công"));
      }
    } catch (err) {
      console.error(err);
      setOpenUserReviewModal(false);
      dispatch(showAlert("error", "Đánh giá thất bại"));
    }
  };

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
        setOpenExperienceReviewModal(false);
        dispatch(showAlert("success", "Đánh giá thành công"));
      }
    } catch (err) {
      console.error(err);
      setOpenExperienceReviewModal(false);
      dispatch(showAlert("error", "Đánh giá thất bại"));
    }
  };

  return (
    <div>
      {receipts ? (
        receipts.map((item) => (
          <div key={item._id}>
            <p>{item.experienceId}</p>
            <button
              onClick={() =>
                handleRefundExperience(item.checkOutSessionId as string, item)
              }
            >
              refund
            </button>
            <button onClick={() => setOpenUserReviewModal(true)}>
              user review
            </button>
            <button onClick={() => setOpenExperienceReviewModal(true)}>
              experience review
            </button>
            <MyModal
              size="xl"
              open={openUserReviewModal}
              setOpen={setOpenUserReviewModal}
            >
              {{
                header: (
                  <h1 className="text-2xl font-bold">Đánh giá người tổ chức</h1>
                ),
                content: (
                  <div>
                    <Formik
                      initialValues={{ content: "" }}
                      onSubmit={(values) =>
                        handleCreateUserReview(
                          item.hostId,
                          numOfStars,
                          values.content
                        )
                      }
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
                              Đánh giá
                            </Button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                ),
              }}
            </MyModal>

            <MyModal
              size="xl"
              open={openExperienceReviewModal}
              setOpen={setOpenExperienceReviewModal}
            >
              {{
                header: (
                  <h1 className="text-2xl font-bold">Đánh giá trải nghiệm</h1>
                ),
                content: (
                  <div>
                    <Formik
                      initialValues={{ content: "" }}
                      onSubmit={(values) =>
                        handleCreateExperienceReview(
                          item.experienceId,
                          numOfStars,
                          values.content
                        )
                      }
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
                              Đánh giá
                            </Button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                ),
              }}
            </MyModal>
          </div>
        ))
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default ExperienceListTab;
