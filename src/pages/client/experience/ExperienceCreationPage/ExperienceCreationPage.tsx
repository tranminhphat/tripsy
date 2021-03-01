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
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const [progresses, setProgesses] = React.useState([
    { name: "progress1", isDone: false },
  ]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSaveProgress = async () => {
    const { data } = await updateExperienceById(id, updatedProperties);
    console.log(data);
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

  const drawer = (
    <div className="w-56">
      <button onClick={() => handleSaveProgress()}>Save & exit</button>
      <List>
        <Link to={`${url}/progress1`}>
          <ListItem button>
            <ListItemText primary="Progress 1" />
            {progresses[0].isDone ? (
              <span>
                <CheckIcon />
              </span>
            ) : null}
          </ListItem>
        </Link>
        {/* <Link to={`${url}/progress2`}>
          <ListItem button>
            <ListItemText primary="Progress 2" />
            {isProgressDone[1].isDone ? (
              <span>
                <CheckIcon />
              </span>
            ) : null}
          </ListItem>
        </Link> */}
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
