import React from "react";
import Hidden from "@material-ui/core/Hidden";
import CheckIcon from "@material-ui/icons/Check";

import {
  Link,
  useHistory,
  useRouteMatch,
  useLocation,
  useParams,
  Switch,
  Route,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import Progress1 from "./Idea/Idea";
import { updateExperienceById } from "api/experiences";
import { showAlert } from "redux/actions/alert/alertAction";

interface Props {
  window?: () => Window;
}

export default function ExperienceCreationPage(props: Props) {
  const [updatedProperties, setUpdatedProperties] = React.useState<any>({});
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { url, path } = useRouteMatch();
  const location = useLocation();
  const { isDone } = location.state as { isDone: string };
  const history = useHistory();

  const [selectedIndex, setSelectedIndex] = React.useState(0);

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
    history.push(`${url}/progress${index + 2}`);
  };

  return (
    <div className="flex">
      <Hidden smDown implementation="css">
        <div className="w-56 h-screen p-6 border-r">
          <button onClick={() => handleSaveProgress()}>Lưu và thoát ra</button>
          <ul className="mt-5">
            <Link to={`${url}/progress1/1`}>
              <li className="mt-2" onClick={() => handleListItemClick(0)}>
                <div
                  className={`
                    p-2 rounded-lg ${
                      selectedIndex === 0 ? "border border-black" : ""
                    }`}
                >
                  <p>Ý tưởng</p>
                  {isDone ? (
                    <span>
                      <CheckIcon />
                    </span>
                  ) : null}
                </div>
              </li>
            </Link>
            <Link to={`${url}/progress1/1`}>
              <li className="mt-2" onClick={() => handleListItemClick(1)}>
                <div
                  className={`
                    p-2 rounded-lg ${
                      selectedIndex === 1 ? "border border-black" : ""
                    }`}
                >
                  <p>Progress 2</p>
                  {isDone ? (
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
            path={`${path}/progress1/:progressStep`}
            render={() => (
              <Progress1
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
          {/* <Route
            exact
            path={`${path}/progress2`}
            render={() => <Progress2 handleDone={handleDone} />}
          /> */}
        </Switch>
      </main>
    </div>
  );
}
