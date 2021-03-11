import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { updateUserById } from "api/users";
import { Field, Form, Formik } from "formik";
import { IUserResponse } from "interfaces/users/user.interface";
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { showAlert } from "redux/actions/alert/alertAction";

interface Props {
  userData: IUserResponse;
  isCurrentUser: boolean;
}

const AboutMeTab: React.FC<Props> = ({ userData, isCurrentUser }) => {
  const [introduction, setIntroduction] = useState(userData.introduction);
  const [isCreatingIntroduction, setIsCreatingIntroduction] = useState(false);
  const dispatch = useDispatch();

  const handleIntroductionUpdate = async (values) => {
    const { data } = await updateUserById(userData._id!, values);
    if (data) {
      setIntroduction(values.introduction);
      dispatch(showAlert("success", "Cập nhật thành công"));
    } else {
      dispatch(showAlert("success", "Cập nhật thất bại"));
    }
  };

  return (
    <div>
      <div>
        <Typography className="text-4xl">
          Xin chào, tôi là {userData.firstName}
        </Typography>
      </div>
      {!isCreatingIntroduction ? (
        <div className="mt-2">
          {introduction ? (
            <div className="whitespace-pre-line">{introduction}</div>
          ) : (
            <div>Bạn chưa có lời giới thiệu</div>
          )}
          {isCurrentUser ? (
            <div className="mt-2">
              <p
                className="underline hover:no-underline cursor-pointer"
                onClick={() => setIsCreatingIntroduction(true)}
              >
                Cập nhật lời giới thiệu
              </p>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-2">
          <Formik
            initialValues={{ introduction: introduction }}
            onSubmit={(values) => {
              handleIntroductionUpdate(values);
            }}
          >
            {() => (
              <Form>
                <div>
                  <Field
                    as="textarea"
                    name="introduction"
                    className="w-full h-36 pl-4 border border-gray-300"
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    className="bg-main-blue text-white"
                    variant="contained"
                    type="submit"
                  >
                    Cập nhật
                  </Button>
                  <Button
                    className="ml-2"
                    color="secondary"
                    variant="contained"
                    onClick={() => setIsCreatingIntroduction(false)}
                  >
                    Xong
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default AboutMeTab;
