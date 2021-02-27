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
import { getExperienceById, updateExperienceById } from "api/experiences";
import Progress1 from "./Progress1/Progress1";

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

  React.useEffect(() => {
    fetchExperienceData();
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

  const handleDone = (index: number) => {};

  const drawer = (
    <div className="w-56">
      <div onClick={handleSaveProgress}>Save & exit</div>
      <List>
        <Link to={`${url}/progress1`}>
          <ListItem button>
            <ListItemText primary="Progress 1" />
          </ListItem>
        </Link>
        <Link to={`${url}/progress2`}>
          <ListItem button>
            <ListItemText primary="Progress 2" />
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
        </Switch>
      </main>
    </div>
  );
}
