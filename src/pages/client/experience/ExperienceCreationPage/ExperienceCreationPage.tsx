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
import { useDispatch, useSelector } from "react-redux";
import Idea from "./Idea/Idea";
import { getExperienceById, updateExperienceById } from "api/experiences";
import { showAlert } from "redux/actions/alert/alertAction";
import Introduction from "./Introduction/Introduction";
import { IExperienceResponse } from "interfaces/experiences/experience.interface";
import { resetExperiece } from "redux/actions/experience/experienceAction";

interface Props {
  window?: () => Window;
}

export default function ExperienceCreationPage(props: Props) {
  const updatedProperties = useSelector((state) => state.experience);
  const [currentProgressIndex, setCurrentProgressIndex] = React.useState(1);
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { url, path } = useRouteMatch();
  const history = useHistory();

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleSaveProgress = async () => {
    const { data } = await updateExperienceById(id, updatedProperties);
    if (data) {
      history.push("/user/experience-hosting");
      dispatch(resetExperiece());
      dispatch(showAlert("success", "success"));
    } else {
      dispatch(showAlert("error", "error"));
    }
  };

  const handleDone = async (index: number) => {
    setCurrentProgressIndex((prevIndex) => prevIndex + 1);
    history.push({
      pathname: `${url}/progress${index + 1}`,
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
                  {currentProgressIndex > 1 ? (
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
                  {currentProgressIndex > 2 ? (
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
            render={() => <Idea handleDone={handleDone} />}
          />
          <Route
            exact
            path={`${path}/progress2/`}
            render={() => <Introduction handleDone={handleDone} />}
          />
        </Switch>
      </main>
    </div>
  );
}
