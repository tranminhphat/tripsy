import * as React from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Button, CircularProgress, Typography } from "@material-ui/core";
import {
  createExperience,
  deleteExperienceById,
  getExperiences,
} from "api/experiences";
import { getCurrentUser } from "api/users";
import MainLayout from "layouts/MainLayout";
import { IExperienceResponse } from "interfaces/experiences/experience.interface";
import { calculateCurrentProgress } from "helpers/calculateProgress";
import { showAlert } from "redux/actions/alert/alertAction";

interface Props {}

const ExperiencePage: React.FC<Props> = () => {
  const [experiences, setExperiences] = React.useState<IExperienceResponse[]>();
  const history = useHistory();
  const { url } = useRouteMatch();
  const dispatch = useDispatch();

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const userResponse = await getCurrentUser(["_id", "firstName"]);
    const { user } = userResponse.data;

    const { data } = await getExperiences({
      hostId: user._id,
    });

    setExperiences(data);
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
    <MainLayout>
      <div className="flex justify-between">
        <Typography className="text-3xl text-main-blue font-bold">
          Hoạt động trải nghiệm của bạn
        </Typography>
        <Button
          variant="outlined"
          className="focus:outline-none text-main-pink border-main-pink hover:bg-main-pink hover:text-white"
          onClick={handleCreateExperience}
        >
          Tạo hoạt động mới
        </Button>
      </div>
      {!experiences ? (
        <CircularProgress />
      ) : (
        <div>
          {experiences.length !== 0 ? (
            experiences.map((item, idx) => {
              const [currentProgress, currentStep] = calculateCurrentProgress(
                item
              );
              return (
                <div key={idx}>
                  {currentProgress === -1 ? (
                    <>
                      <Link
                        to={{
                          pathname: `${url}/${item._id}/progress1`,
                          state: { currentProgress: 1, currentStep: 1 },
                        }}
                      >
                        {item._id}
                      </Link>
                      <p>Done</p>
                    </>
                  ) : (
                    <>
                      <Link
                        to={{
                          pathname: `${url}/${item._id}/progress${currentProgress}`,
                          state: { currentProgress, currentStep },
                        }}
                      >
                        {item._id}
                      </Link>
                      <p>Current progress: {currentProgress}</p>
                      <p>Current step: {currentStep}</p>
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
    </MainLayout>
  );
};

export default ExperiencePage;
