import { Button, Typography } from "@material-ui/core";
import { getProfileById, updateProfileById } from "api/profile";
import { Field, Form, Formik } from "formik";
import { IUser } from "interfaces/users/user.interface";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showAlert } from "redux/actions/alert/alertAction";

interface Props {
  userData: IUser;
  isCurrentUser: boolean;
}

const UserInformation: React.FC<Props> = ({ userData, isCurrentUser }) => {
  const [introduction, setIntroduction] = useState();
  const [isCreatingIntroduction, setIsCreatingIntroduction] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProfile(userData.profileId as string);
  }, [userData.profileId]);

  const fetchProfile = async (id: string) => {
    const {
      data: { profile },
    } = await getProfileById(id);
    if (profile) {
      setIntroduction(profile.introduction);
    }
  };

  const handleIntroductionUpdate = async (values) => {
    const { data } = await updateProfileById(userData.profileId!, values);
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

export default UserInformation;
