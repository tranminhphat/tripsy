import { Button, Typography } from "@material-ui/core";
import {
	createOnBoardingLink,
	createPayOutAccount,
	getAccountById
} from "api/stripe";
import BankIcon from "assets/images/icons/bank.svg";
import FlyIcon from "assets/images/icons/fly.svg";
import NoDataIcon from "assets/images/icons/no-data.svg";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import MyTruncateText from "components/Shared/MyTruncateText";
import AlertContext from "contexts/AlertContext";
import { calculateCurrentProgress } from "helpers/calculateProgress";
import {
	useCreateExperience,
	useDeleteExperience
} from "hooks/mutations/experiences";
import { useUpdateUser } from "hooks/mutations/users";
import { useExperiences } from "hooks/queries/experiences";
import { useCurrentUser } from "hooks/queries/users";
import { IUser } from "interfaces/users/user.interface";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";

interface Props {}

const HostingListTab: React.FC<Props> = () => {
  const { data: userData } = useCurrentUser();
  const { data: experiences } = useExperiences({ hostId: userData?._id }, "-createdAt");
  const updateUser = useUpdateUser();
  const createExperience = useCreateExperience();
  const deleteExperience = useDeleteExperience();
  const [payoutId, setPayoutId] = useState<string>();
  const [isPayOutEnabled, setIsPayOutEnabled] = useState(false);
  const history = useHistory();
  const { url } = useRouteMatch();
  const { alert } = useContext(AlertContext);

  useEffect(() => {
    fetchPayOutInformation(userData!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const fetchPayOutInformation = async (user: IUser) => {
    if (user) {
      if (!user.isPayOutEnabled) {
        if (!user.payoutAccountId) {
          const { data: payoutAccountId } = await createPayOutAccount();
          updateUser.mutate({
            userId: user._id,
            values: { payoutAccountId: payoutAccountId },
          });
          setPayoutId(payoutAccountId);
        } else {
          setPayoutId(user.payoutAccountId);
          const {
            data: { account },
          } = await getAccountById(user.payoutAccountId);
          if (account.charges_enabled) {
            updateUser.mutate({
              userId: user._id,
              values: {
                isPayOutEnabled: true,
              },
            });
            setIsPayOutEnabled(true);
          }
        }
      } else {
        setIsPayOutEnabled(true);
      }
    }
  };

  const handleCreateExperience = async () => {
    createExperience.mutate(undefined, {
      onSuccess: (data) => {
        history.push({
          pathname: `/user/experience-hosting/${data}/progress1`,
          state: { currentProgress: 1, currentStep: 1 },
        });
      },
    });
  };

  const handleDeleteExperience = async (id: string) => {
    deleteExperience.mutate(
      { experienceId: id },
      {
        onSuccess: (message) => {
          if (message) {
            alert("success", message);
          } else {
            alert("error", "Xảy ra lỗi");
          }
        },
      }
    );
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
                    ] = calculateCurrentProgress(
                      item,
                      userData.isPhoneVerified
                    );
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
                                      <>
                                        {item.description ? (
                                          <MyTruncateText
                                            text={item.description!}
                                          />
                                        ) : (
                                          "Hãy thêm một số thông tin để hoàn thành thiết lập."
                                        )}
                                      </>
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
                  <div className="mt-4">
                    <div className="flex flex-col items-center justify-center text-center">
                      <img
                        src={NoDataIcon}
                        width={150}
                        height={150}
                        alt="no data"
                      />
                      <p className="mt-8 text-xl text-gray-500">
                        Không có dữ liệu
                      </p>
                    </div>
                  </div>
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
