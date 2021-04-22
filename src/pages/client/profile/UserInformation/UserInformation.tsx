import { Button, Typography } from "@material-ui/core";
import MedalIcon from "assets/images/icons/medal.svg";
import ReviewSection from "components/Profile/ReviewSection";
import MyTruncateText from "components/Shared/MyTruncateText";
import { themes } from "constants/index";
import AlertContext from "contexts/AlertContext";
import { Field, Form, Formik } from "formik";
import { useUpdateProfile } from "hooks/mutations/profiles";
import { useExperiences } from "hooks/queries/experiences";
import { useProfile } from "hooks/queries/profiles";
import { IUser } from "interfaces/users/user.interface";
import * as React from "react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
interface Props {
  userData: IUser;
  isCurrentUser: boolean;
}

const UserInformation: React.FC<Props> = ({ userData, isCurrentUser }) => {
  const { data: profile } = useProfile(userData.profileId);
  const { data: experiences } = useExperiences({ hostId: userData._id });
  const updateProfile = useUpdateProfile();
  const [isCreatingIntroduction, setIsCreatingIntroduction] = useState(false);
  const { alert } = useContext(AlertContext);

  const handleIntroductionUpdate = async (values) => {
    updateProfile.mutate(
      { profileId: profile?._id, values },
      {
        onSuccess: () => {
          alert("success", "Cập nhật thành công");
        },
        onError: () => {
          alert("success", "Cập nhật thất bại");
        },
      }
    );
  };

  return (
    <>
      <div>
        <div>
          <Typography className="text-4xl">
            Xin chào, tôi là {userData.firstName}
          </Typography>
        </div>
        {!isCreatingIntroduction ? (
          <div className="mt-2">
            {profile?.introduction ? (
              <div className="whitespace-pre-line">
                <MyTruncateText text={profile?.introduction} />
              </div>
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
              initialValues={{ introduction: profile?.introduction }}
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
                      className="w-full h-36 p-4 border border-gray-300"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      className="bg-primary text-white"
                      variant="contained"
                      type="submit"
                    >
                      Cập nhật
                    </Button>
                    <Button
                      className="ml-2 border border-success text-success"
                      variant="outlined"
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

      <div className="mt-4">
        <hr />
      </div>
      <div className="mt-4">
        {profile && profile.checkpoints.some((item) => item.points === 100) ? (
          <>
            <div>
              <Typography className="text-xl font-bold">Danh hiệu</Typography>
              {profile.checkpoints.map((item) => {
                const theme = themes.find((theme) => theme.id === item.themeId);
                const themeName = theme?.name;
                if (item.points === 100) {
                  return (
                    <div className="mt-4 flex items-center">
                      <img src={MedalIcon} alt="medal" width={32} height={32} />
                      <Typography className="ml-2 text-lg">
                        {themeName}
                      </Typography>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
            <div className="mt-4">
              <hr />
            </div>
          </>
        ) : null}
      </div>
      <div className="mt-4">
        {experiences && experiences.length !== 0 ? (
          <>
            <div>
              <Typography className="text-xl font-bold">
                Trải nghiệm của {userData.firstName}
              </Typography>
              <div className="flex mt-4">
                {experiences.map((item) => (
                  <Link key={item._id!} to={`/experience/${item._id}`}>
                    <div className="flex flex-col items-center justify-center mx-2 max-w-sm">
                      <div>
                        <img
                          className="rounded-md"
                          width={150}
                          height={200}
                          src={item.photoGallery![0].url}
                          alt="experience"
                        />
                      </div>
                      <div className="mt-2">{item.title}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <hr />
            </div>
          </>
        ) : null}
      </div>
      <div className="mt-4">
        <ReviewSection userId={userData._id!} />
      </div>
    </>
  );
};

export default UserInformation;
