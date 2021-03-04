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
import Progress1 from "./Progress1/Progress1";
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
  const history = useHistory();
  const [progresses, setProgesses] = React.useState([
    { name: "progress1", isDone: false },
  ]);

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
    let newProgress = progresses.map((progress, idx) => {
      if (idx === index) {
        return { ...progress, isDone: true };
      } else {
        return progress;
      }
    });

    setProgesses(newProgress);
    if (index === progresses.length - 1) {
      alert("Finish");
    } else {
      history.push(`${url}/progress${index + 2}`);
    }
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
                  <p>Progress 1</p>
                  {progresses[0].isDone ? (
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
                  {progresses[0].isDone ? (
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
