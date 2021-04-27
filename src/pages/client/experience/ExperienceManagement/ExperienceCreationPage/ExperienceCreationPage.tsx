import { Slide } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import MenuIcon from "@material-ui/icons/Menu";
import { updateExperienceById } from "api/experiences";
import AlertContext from "contexts/AlertContext";
import IExperience from "interfaces/experiences/experience.interface";
import React, { createContext, useContext, useState } from "react";
import {
  Link,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Idea from "./Idea/Idea";
import Introduction from "./Introduction/Introduction";
import Setting from "./Setting/Setting";
import Submission from "./Submission/Submission";

interface Props {}

const ExperienceCreationContext = createContext<any>({});

const ExperienceCreationPage: React.FC<Props> = () => {
  const { url, path } = useRouteMatch();
  const [creationObject, setCreationObject] = useState<IExperience>({});
  const { alert } = useContext(AlertContext);
  const history = useHistory();

  /* Get the current progress of experience process via router*/
  const location = useLocation<{
    currentProgress: number;
    currentStep: number;
  }>();
  const { currentProgress, currentStep } = location.state;

  /* Store the current progress index state */
  const [currentProgressIndex, setCurrentProgressIndex] = useState(
    currentProgress
  );

  /* Store the selected index by current progress index to show the focus style for list item element */
  const [selectedIndex, setSelectedIndex] = useState(currentProgressIndex);

  /* Get the experience ID from the URL */
  const { id } = useParams<{ id: string }>();

  /* Store the toggle state of open mobile drawer*/
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Handle toggling drawer when in mobile screen */
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  /* Handle click on the list item in the drawer */
  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  /* Handle when user click on "Save & exit" */
  const handleSaveProgress = async () => {
    if (creationObject) {
      const { data } = await updateExperienceById(id, creationObject);
      if (data) {
        history.push("/user/experience-hosting");
        setCreationObject({});
        alert("success", "Lưu thiết lập thành công");
      } else {
        alert("error", "Lưu thiết lập thất bại");
      }
    }
  };

  /**
   *
   * Handle done a specific step in the progress
   * @param index - The index step of the current progress
   *
   */
  const handleDone = async (index: number) => {
    if (index === 4) {
      return handleSaveProgress();
    }
    if (currentProgressIndex !== -1) {
      setCurrentProgressIndex((prevIndex) => prevIndex + 1);
    }
    setSelectedIndex(index + 1);
    history.push({
      pathname: `${url}/progress${index + 1}`,
      state: {
        currentProgress,
        currentStep,
      },
    });
  };

  const drawer = (
    <div className="w-56 h-full p-6 bg-gray-100">
      <button
        className="font-bold underline"
        onClick={() => handleSaveProgress()}
      >
        Lưu và thoát ra
      </button>
      <div className="mt-4">
        <h2 className="text-2xl font-bold text-secondary">
          Thiết lập hoạt động của bạn
        </h2>
      </div>
      <ul className="mt-5">
        <Link
          to={{
            pathname: `${url}/progress1`,
            state: {
              currentProgress:
                currentProgress > 1 || currentProgress === -1
                  ? 1
                  : currentProgress,
              currentStep:
                currentProgress > 1 || currentProgress === -1 ? 1 : currentStep,
            },
          }}
        >
          <li className="mt-2" onClick={() => handleListItemClick(1)}>
            <div
              className={`
                    p-2 rounded-lg flex justify-between ${
                      selectedIndex === 1 || selectedIndex === -1
                        ? "border border-black"
                        : ""
                    }`}
            >
              <span>Ý tưởng</span>
              {currentProgressIndex > 1 || currentProgressIndex === -1 ? (
                <span>
                  <CheckCircleIcon />
                </span>
              ) : null}
            </div>
          </li>
        </Link>
        <Link
          to={{
            pathname: `${url}/progress2`,
            state: {
              currentProgress:
                currentProgress > 2 || currentProgress === -1
                  ? 2
                  : currentProgress,
              currentStep:
                currentProgress > 2 || currentProgress === -1 ? 1 : currentStep,
            },
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
              {currentProgressIndex > 2 || currentProgressIndex === -1 ? (
                <span>
                  <CheckCircleIcon />
                </span>
              ) : null}
            </div>
          </li>
        </Link>
        <Link
          to={{
            pathname: `${url}/progress3`,
            state: {
              currentProgress:
                currentProgress > 3 || currentProgress === -1
                  ? 3
                  : currentProgress,
              currentStep:
                currentProgress > 3 || currentProgress === -1 ? 1 : currentStep,
            },
          }}
        >
          <li className="mt-2" onClick={() => handleListItemClick(3)}>
            <div
              className={`
                    p-2 rounded-lg flex justify-between ${
                      selectedIndex === 3 ? "border border-black" : ""
                    }`}
            >
              <span>Thiết lập</span>
              {currentProgressIndex > 3 || currentProgressIndex === -1 ? (
                <span>
                  <CheckCircleIcon />
                </span>
              ) : null}
            </div>
          </li>
        </Link>
        <Link
          to={{
            pathname: `${url}/progress4`,
            state: {
              currentProgress:
                currentProgress > 4 || currentProgress === -1
                  ? 4
                  : currentProgress,
              currentStep:
                currentProgress > 4 || currentProgress === -1 ? 1 : currentStep,
            },
          }}
        >
          <li className="mt-2" onClick={() => handleListItemClick(4)}>
            <div
              className={`
                    p-2 rounded-lg flex justify-between ${
                      selectedIndex === 4 ? "border border-black" : ""
                    }`}
            >
              <span>Xác thực</span>
              {currentProgressIndex > 4 || currentProgressIndex === -1 ? (
                <span>
                  <CheckCircleIcon />
                </span>
              ) : null}
            </div>
          </li>
        </Link>
      </ul>
    </div>
  );

  return (
    <ExperienceCreationContext.Provider
      value={{
        creationObject,
        updateCreationObject: (updatedProperties) => {
          setCreationObject((prevVal) => ({
            ...prevVal,
            ...updatedProperties,
          }));
        },
        resetCreationObject: () => {
          setCreationObject({});
        },
      }}
    >
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
            <Route
              exact
              path={`${path}/progress3/`}
              render={() => <Setting handleDone={handleDone} />}
            />
            <Route
              exact
              path={`${path}/progress4/`}
              render={() => <Submission handleDone={handleDone} />}
            />
          </Switch>
        </main>
      </div>
    </ExperienceCreationContext.Provider>
  );
};

export { ExperienceCreationContext };
export default ExperienceCreationPage;
