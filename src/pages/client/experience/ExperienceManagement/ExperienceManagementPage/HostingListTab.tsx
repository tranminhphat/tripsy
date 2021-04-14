import { Button, Typography } from "@material-ui/core";
import {
  createExperience,
  deleteExperienceById,
  getExperiences,
} from "api/experiences";
import {
  createOnBoardingLink,
  createPayOutAccount,
  getAccountById,
} from "api/stripe";
import { getCurrentUser, updateUserById } from "api/users";
import BankIcon from "assets/images/icons/bank.svg";
import FlyIcon from "assets/images/icons/fly.svg";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import MyTruncateText from "components/Shared/MyTruncateText";
import { calculateCurrentProgress } from "helpers/calculateProgress";
import IExperience from "interfaces/experiences/experience.interface";
import { IUser } from "interfaces/users/user.interface";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { showAlert } from "redux/actions/alert/alertAction";

interface Props {}

const HostingListTab: React.FC<Props> = () => {
  const [userData, setUserData] = useState<IUser>();
  const [payoutId, setPayoutId] = useState<string>();
  const [isPayOutEnabled, setIsPayOutEnabled] = useState(false);
  const [experiences, setExperiences] = useState<IExperience[]>();
  const history = useHistory();
  const { url } = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchExperience();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchExperience = async () => {
    const userResponse = await getCurrentUser([
      "_id",
      "firstName",
      "payoutAccountId",
      "isIdVerified",
      "isPayOutEnabled",
    ]);
    const { user } = userResponse.data;

    const { data } = await getExperiences({
      hostId: user._id,
    });

    setExperiences(data);
    setUserData(user);

    fetchPayOutInformation(user);
  };

  const fetchPayOutInformation = async (user) => {
    if (!user.isPayOutEnabled) {
      if (!user.payoutAccountId) {
        const { data: payoutAccountId } = await createPayOutAccount();
        await updateUserById(user._id, {
          payoutAccountId: payoutAccountId,
        });
        setPayoutId(payoutAccountId);
      } else {
        setPayoutId(user.payoutAccountId);
        const {
          data: { account },
        } = await getAccountById(user.payoutAccountId);
        if (account.charges_enabled) {
          await updateUserById(user._id as string, {
            isPayOutEnabled: true,
          });
          setIsPayOutEnabled(true);
        }
      }
    } else {
      setIsPayOutEnabled(true);
    }
  };

  const handleCreateExperience = async () => {
    const { data } = await createExperience();
    if (data) {
      history.push({
        pathname: `/user/experience-hosting/${data}/progress1`,
        state: { currentProgress: 1, currentStep: 1 },
      });
    }
  };

  const handleDeleteExperience = async (id: string) => {
    const {
      data: { message },
    } = await deleteExperienceById(id);
    if (message) {
      dispatch(showAlert("success", message));
    } else {
      dispatch(showAlert("error", "Xảy ra lỗi"));
    }
  };

  const handleCreatePayOutAccount = async () => {
    const { data: onBoardingLink } = await createOnBoardingLink(payoutId!);
    if (onBoardingLink) {
      window.location.replace(onBoardingLink);
    }
  };

  return (
    <div className="my-8 max-w-6xl mx-auto">
      {userData ? (
        isPayOutEnabled ? (
          <>
            <div className="flex justify-between container">
              <Typography className="text-3xl text-secondary font-bold">
                Hoạt động trải nghiệm của bạn
              </Typography>
              <Button
                variant="outlined"
                className="focus:outline-none text-primary border-primary hover:bg-primary hover:text-white"
                onClick={handleCreateExperience}
              >
                Tạo hoạt động mới
              </Button>
            </div>
            {!experiences ? (
              <div className="flex-grow justify-center items-center">
                <MyLoadingIndicator width={300} height={300} />
              </div>
            ) : (
              <div className="mt-8">
                {experiences.length !== 0 ? (
                  experiences.map((item, idx) => {
                    const [
                      currentProgress,
                      currentStep,
                    ] = calculateCurrentProgress(item, userData.isIdVerified!);
                    return (
                      <div
                        key={idx}
                        className="w-full border border-gray-200 shadow-md mb-4 rounded-lg"
                      >
                        {currentProgress === -1 ? (
                          <>
                            <Link
                              to={{
                                pathname: `${url}/${item._id}/progress1`,
                                state: {
                                  currentProgress,
                                  currentStep,
                                },
                              }}
                            >
                              <div className="hover:bg-gray-100">
                                <div className="flex justify-between p-8">
                                  <div className="flex flex-col">
                                    <div className="flex border border-gray-300 w-28">
                                      <div className="border-l-4 border-green-600 h-full" />
                                      <div className="py-1 w-full text-center">
                                        <p className="text-sm font-bold text-gray-500">
                                          Đã thiết lập
                                        </p>
                                      </div>
                                    </div>
                                    <div className="mt-2">
                                      <h1 className="text-4xl font-bold text-gray-700">
                                        {item.title}
                                      </h1>
                                    </div>
                                    <div className="mt-2">
                                      <MyTruncateText
                                        text={item.description!}
                                      />
                                    </div>
                                  </div>
                                  <div></div>
                                </div>
                              </div>
                            </Link>
                            <hr />
                            <Link
                              to={`/user/experience-hosting/${item._id}/activation`}
                            >
                              <div className="hover:bg-gray-100">
                                <div className="flex p-8">
                                  <div className="mr-2">
                                    <img src={FlyIcon} alt="fly" />
                                  </div>
                                  <div className="ml-2">
                                    <h3 className="text-lg font-bold text-gray-700">
                                      Đưa trải nghiệm đi vào hoạt động
                                    </h3>
                                    <p className="text-lgtext-gray-700">
                                      Click vào đây để lên kế hoạch cho trải
                                      nghiệm này
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link
                              to={{
                                pathname: `${url}/${item._id}/progress${currentProgress}`,
                                state: {
                                  currentProgress,
                                  currentStep,
                                },
                              }}
                            >
                              <div className="hover:bg-gray-100">
                                <div className="flex justify-between p-8">
                                  <div className="flex flex-col">
                                    <div className="flex border border-gray-300 w-28">
                                      <div className="border-l-4 border-yellow-400 h-full" />
                                      <div className="py-1 w-full text-center">
                                        <p className="text-sm font-bold text-gray-500">
                                          Đang thiết lập
                                        </p>
                                      </div>
                                    </div>
                                    <div className="mt-2">
                                      <h1 className="text-4xl font-bold text-gray-700">
                                        {item.title
                                          ? item.title
                                          : "Trải nghiệm"}
                                      </h1>
                                    </div>
                                    <div className="mt-2">
                                      <p>
                                        {item.description
                                          ? item.description
                                          : "Hãy thêm một số thông tin để hoàn thành thiết lập."}
                                      </p>
                                    </div>
                                  </div>
                                  <div></div>
                                </div>
                              </div>
                            </Link>
                            <hr />

                            <div className="hover:bg-gray-100">
                              <div className="flex p-8">
                                <div className="mr-2">
                                  <img src={FlyIcon} alt="fly" />
                                </div>
                                <div className="ml-2">
                                  <h3 className="text-lg font-bold text-gray-700">
                                    Đưa trải nghiệm đi vào hoạt động
                                  </h3>
                                  <p className="text-lgtext-gray-700">
                                    Hãy hoàn tất các thiết lập để đưa trải
                                    nghiệm của bạn vào hoạt động
                                  </p>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                        <hr />
                        <div className="p-8">
                          <button
                            onClick={() => handleDeleteExperience(item._id!)}
                          >
                            <p className="font-bold underline">
                              Xóa trải nghiệm
                            </p>
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>Bạn chưa tổ chức trải nghiệm nào </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="max-w-sm mx-auto">
            <div className="flex flex-col justify-center items-center">
              <div>
                <img src={BankIcon} alt="bank" />
              </div>
              <div className="mt-6 text-center">
                <h1 className="text-3xl text-secondary font-bold">
                  Thiết lập tài khoản thanh toán để tạo trải nghiệm
                </h1>
              </div>
              <div className="mt-6 text-center">
                <p className="text-lg">
                  Hãy thiết lập tài khoản thanh toán để Tripsy chuyển thu nhập
                  vào tài khoản của bạn
                </p>
              </div>
              <div className="w-full mt-6 text-center">
                <Button
                  variant="contained"
                  fullWidth={true}
                  size="large"
                  className="bg-primary text-white"
                  onClick={handleCreatePayOutAccount}
                >
                  Thiết lập tài khoản
                </Button>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="flex-grow justify-center items-center">
          <MyLoadingIndicator width={300} height={300} />
        </div>
      )}
    </div>
  );
};

export default HostingListTab;
