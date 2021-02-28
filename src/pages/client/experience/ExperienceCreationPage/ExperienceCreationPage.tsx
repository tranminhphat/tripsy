import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";

import {
  Link,
  useHistory,
  useRouteMatch,
  useParams,
  Switch,
  Route,
} from "react-router-dom";
import { getExperienceById } from "api/experiences";
import Progress1 from "./Progress1/Progress1";
import Progress2 from "./Progress2/Progress2";

interface Props {
  window?: () => Window;
}

export default function ExperienceCreationPage(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [currentProgressIndex, setCurrentProgressIndex] = React.useState(0);
  const { url, path } = useRouteMatch();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [isProgressDone, setIsProgessDone] = React.useState([
    { name: "progress1", isDone: false },
    { name: "progress2", isDone: false },
  ]);

  React.useEffect(() => {
    fetchExperienceData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchExperienceData = async () => {
    const { data } = await getExperienceById(id);
    if (data) {
      setCurrentProgressIndex(data.experience.progress);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSaveProgress = async () => {
    history.push("/user/experience-hosting");
  };

  const handleDone = (index: number) => {
    let newProgress = isProgressDone.map((progress, idx) => {
      if (idx === index) {
        return { ...progress, isDone: true };
      } else {
        return progress;
      }
    });

    setIsProgessDone(newProgress);
    if (index === isProgressDone.length - 1) {
      alert("Finish");
    } else {
      history.push(`${url}/progress${index + 2}`);
    }
  };

  const drawer = (
    <div className="w-56">
      <div onClick={handleSaveProgress}>Save & exit</div>
      <List>
        <Link to={`${url}/progress1`}>
          <ListItem button>
            <ListItemText primary="Progress 1" />
            {isProgressDone[0].isDone ? (
              <span>
                <CheckIcon />
              </span>
            ) : null}
          </ListItem>
        </Link>
        <Link to={`${url}/progress2`}>
          <ListItem button>
            <ListItemText primary="Progress 2" />
            {isProgressDone[1].isDone ? (
              <span>
                <CheckIcon />
              </span>
            ) : null}
          </ListItem>
        </Link>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className="flex">
      <nav className="flex-shrink" aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            className="w-48"
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer variant="permanent" open>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className="flex-grow sm:ml-64">
        <Switch>
          <Route
            exact
            path={`${path}/progress1`}
            render={() => (
              <Progress1
                handleDone={handleDone}
                currentProgressIndex={currentProgressIndex}
              />
            )}
          />
          <Route
            exact
            path={`${path}/progress2`}
            render={() => (
              <Progress2
                handleDone={handleDone}
                currentProgressIndex={currentProgressIndex}
              />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}
