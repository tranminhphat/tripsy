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
  Switch,
  Route,
} from "react-router-dom";
import Idea1 from "./ExperienceIdea/Idea1";
import Idea2 from "./ExperienceIdea/Idea2";
import Idea3 from "./ExperienceIdea/Idea3";

interface Props {
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const defaultItemList = [
    { text: "Idea1", isDone: false },
    { text: "Idea2", isDone: false },
    { text: "Idea3", isDone: false },
  ];

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const [itemList, setItemList] = React.useState(defaultItemList);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSaveProgress = () => {
    history.push("/user/experience-hosting");
  };
  const handleDone = (index: number) => {
    const newItemList = itemList.map((item, idx) => {
      if (idx === index) {
        return { ...item, isDone: true };
      } else {
        return item;
      }
    });
    if (index + 1 < itemList.length) {
      setItemList(newItemList);
      history.push(`${url}/idea${index + 2}`);
    } else {
      setItemList(newItemList);
      alert("Done progress");
    }
  };

  const drawer = (
    <div className="w-56">
      <div onClick={handleSaveProgress}>Save & exit</div>
      <List>
        {itemList.map((item, index) => (
          <Link to={`${url}/idea${index + 1}`}>
            <ListItem button key={item.text}>
              <ListItemText primary={item.text} />
              {item.isDone ? (
                <span>
                  <CheckIcon />
                </span>
              ) : null}
            </ListItem>
          </Link>
        ))}
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
            path={`${path}/:idea`}
            render={(props) => <Idea1 handleDone={handleDone} />}
          />
        </Switch>
      </main>
    </div>
  );
}
