import { Button, CircularProgress, Typography } from "@material-ui/core";
import {
  createExperience,
  deleteExperienceById,
  getExperiences,
} from "api/experiences";
import { getCurrentUser } from "api/users";
import FlyIcon from "assets/images/icons/fly.svg";
import { calculateCurrentProgress } from "helpers/calculateProgress";
import { IExperienceResponse } from "interfaces/experiences/experience.interface";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { showAlert } from "redux/actions/alert/alertAction";

interface Props {}

const ExperiencePage: React.FC<Props> = () => {
  const [isIdVerified, setIsIdVerified] = useState(false);
  const [experiences, setExperiences] = useState<IExperienceResponse[]>();
  const history = useHistory();
  const { url } = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const userResponse = await getCurrentUser([
      "_id",
      "firstName",
      "isIdVerified",
    ]);
    const { user } = userResponse.data;

    const { data } = await getExperiences({
      hostId: user._id,
    });

    setExperiences(data);
    setIsIdVerified(user.isIdVerified);
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

  return (
    <MainLayout withSearchBar={false}>
      <div className="container mx-auto px-28">
        <div className="flex justify-between container">
          <Typography className="text-3xl text-main-blue font-bold">
            Hoạt động trải nghiệm của bạn
          </Typography>
          <Button
            variant="outlined"
            className="focus:outline-none text-secondary-blue border-secondary-blue hover:bg-secondary-blue hover:text-white"
            onClick={handleCreateExperience}
          >
            Tạo hoạt động mới
          </Button>
        </div>
        {!experiences ? (
          <div className="flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="mt-8">
            {experiences.length !== 0 ? (
              experiences.map((item, idx) => {
                const [currentProgress, currentStep] = calculateCurrentProgress(
                  item,
                  isIdVerified
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
                                  <p>{item.description}</p>
                                </div>
                              </div>
                              <div></div>
                            </div>
                          </div>
                        </Link>
                        <hr />
                        <Link to="/user/experience-hosting/activation">
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
                                  Click vào đây để lên kế hoạch cho trải nghiệm
                                  này
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
                                    {item.title ? item.title : "Trải nghiệm"}
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
                                Hãy hoàn tất các thiết lập để đưa trải nghiệm
                                của bạn vào hoạt động
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    <button onClick={() => handleDeleteExperience(item._id!)}>
                      x
                    </button>
                  </div>
                );
              })
            ) : (
              <div>Bạn chưa tổ chức trải nghiệm nào </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ExperiencePage;
