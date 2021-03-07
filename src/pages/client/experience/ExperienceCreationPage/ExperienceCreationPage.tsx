import React from "react";
import Hidden from "@material-ui/core/Hidden";
import CheckIcon from "@material-ui/icons/Check";

import {
  Link,
  useHistory,
  useRouteMatch,
  useParams,
  Switch,
  Route,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import Idea from "./Idea/Idea";
import { getExperienceById, updateExperienceById } from "api/experiences";
import { showAlert } from "redux/actions/alert/alertAction";
import Introduction from "./Introduction/Introduction";
import { IExperienceResponse } from "interfaces/experiences/experience.interface";
import { isProgressDone } from "helpers/calculateProgressStep";

interface Props {
  window?: () => Window;
}

export default function ExperienceCreationPage(props: Props) {
  const [updatedProperties, setUpdatedProperties] = React.useState<any>({});
  const [experience, setExperience] = React.useState<IExperienceResponse>();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { url, path } = useRouteMatch();
  const history = useHistory();

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    fetchExperienceById(id);
  }, [id]);

  const fetchExperienceById = async (id: string) => {
    const {
      data: { experience },
    } = await getExperienceById(id);
    if (experience) {
      setExperience(experience);
    }
  };

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleSaveProgress = async () => {
    const { data } = await updateExperienceById(id, updatedProperties);
    if (data) {
      history.push("/user/experience-hosting");
      dispatch(showAlert("success", "success"));
    } else {
      dispatch(showAlert("error", "error"));
    }
  };

  const handleDone = (index: number) => {
    history.push({
      pathname: `${url}/progress${index + 2}`,
      state: { progressStep: 1 },
    });
  };

  return (
    <div className="flex">
      <Hidden smDown implementation="css">
        <div className="w-56 h-screen p-6 border-r">
          <button onClick={() => handleSaveProgress()}>Lưu và thoát ra</button>
          <ul className="mt-5">
            <Link
              to={{ pathname: `${url}/progress1`, state: { progressStep: 1 } }}
            >
              <li className="mt-2" onClick={() => handleListItemClick(0)}>
                <div
                  className={`
                    p-2 rounded-lg flex justify-between ${
                      selectedIndex === 0 ? "border border-black" : ""
                    }`}
                >
                  <span>Ý tưởng</span>
                  {experience && isProgressDone(experience, 1) ? (
                    <span>
                      <CheckIcon />
                    </span>
                  ) : null}
                </div>
              </li>
            </Link>
            <Link
              to={{
                pathname: `${url}/progress2`,
                state: { progressStep: 1 },
              }}
            >
              <li className="mt-2" onClick={() => handleListItemClick(1)}>
                <div
                  className={`
                    p-2 rounded-lg flex justify-between ${
                      selectedIndex === 1 ? "border border-black" : ""
                    }`}
                >
                  <span>Giới thiệu</span>
                  {experience && isProgressDone(experience, 2) ? (
                    <span>
                      <CheckIcon />
                    </span>
                  ) : null}
                </div>
              </li>
            </Link>
          </ul>
        </div>
      </Hidden>
      <main className="flex-grow">
        <Switch>
          <Route
            exact
            path={`${path}/progress1/`}
            render={() => (
              <Idea
                handleDone={handleDone}
                setUpdatedProperties={(values: any) =>
                  setUpdatedProperties((prevState) => ({
                    ...prevState,
                    ...values,
                  }))
                }
              />
            )}
          />
          <Route
            exact
            path={`${path}/progress2/`}
            render={() => (
              <Introduction
                handleDone={handleDone}
                setUpdatedProperties={(values: any) =>
                  setUpdatedProperties((prevState) => ({
                    ...prevState,
                    ...values,
                  }))
                }
              />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}
