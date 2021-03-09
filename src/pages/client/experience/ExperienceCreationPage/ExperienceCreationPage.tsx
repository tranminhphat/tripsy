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
import { useDispatch, useSelector } from "react-redux";
import Idea from "./Idea/Idea";
import { updateExperienceById } from "api/experiences";
import { showAlert } from "redux/actions/alert/alertAction";
import Introduction from "./Introduction/Introduction";
import { resetExperiece } from "redux/actions/experience/experienceAction";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Slide } from "@material-ui/core";

interface Props {}

const ExperienceCreationPage: React.FC<Props> = () => {
  const updatedProperties = useSelector((state) => state.experience);
  const location = useLocation<{ currentProgress: number }>();
  const { currentProgress } = location.state;
  const [currentProgressIndex, setCurrentProgressIndex] = React.useState(
    currentProgress
  );
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { url, path } = useRouteMatch();
  const history = useHistory();

  const [selectedIndex, setSelectedIndex] = React.useState(currentProgress);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleSaveProgress = async () => {
    if (updatedProperties) {
      const { data } = await updateExperienceById(id, updatedProperties);
      if (data) {
        history.push("/user/experience-hosting");
        dispatch(resetExperiece());
        dispatch(showAlert("success", "success"));
      } else {
        dispatch(showAlert("error", "error"));
      }
    }
  };

  const handleDone = async (index: number) => {
    setCurrentProgressIndex((prevIndex) => prevIndex + 1);
    setSelectedIndex(index + 1);
    history.push({
      pathname: `${url}/progress${index + 1}`,
      state: { currentProgress: index + 1, currentStep: 1 },
    });
  };

  const drawer = (
    <div className="w-56 h-full p-6 bg-gray-100">
      <button onClick={() => handleSaveProgress()}>Lưu và thoát ra</button>
      <ul className="mt-5">
        <Link
          to={{
            pathname: `${url}/progress1`,
            state: { currentProgress: 1, currentStep: 1 },
          }}
        >
          <li className="mt-2" onClick={() => handleListItemClick(1)}>
            <div
              className={`
                    p-2 rounded-lg flex justify-between ${
                      selectedIndex === 1 ? "border border-black" : ""
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
            state: { currentProgress: 2, currentStep: 1 },
          }}
        >
          <li className="mt-2" onClick={() => handleListItemClick(2)}>
            <div
              className={`
                    p-2 rounded-lg flex justify-between ${
                      selectedIndex === 2 ? "border border-black" : ""
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
  );

  return (
    <div className="flex">
      <Hidden smUp implementation="css">
        <Slide direction="right" in={mobileOpen} mountOnEnter unmountOnExit>
          {drawer}
        </Slide>
      </Hidden>
      <Hidden xsDown implementation="css">
        {drawer}
      </Hidden>
      <main className="flex-grow border-l border-black">
        <Hidden smUp implementation="css">
          <IconButton
            className="ml-4"
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
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
};

export default ExperienceCreationPage;
