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
import Step from "./Progress1/Step";

interface Props {
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const defaultItemList = [
    { text: "Step 1", isDone: false },
    { text: "Step 2", isDone: false },
    { text: "Step 3", isDone: false },
  ];

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [currentProgressIndex, setCurrentProgressIndex] = React.useState(0);
  const { url, path } = useRouteMatch();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [itemList, setItemList] = React.useState(defaultItemList);

  React.useEffect(() => {
    fetchExperienceData();
  }, []);

  const fetchExperienceData = async () => {
    const { data } = await getExperienceById(id);
    if (data) {
      setCurrentProgressIndex(data.experience.progress);
      setItemList(
        defaultItemList.map((item, index) => {
          if (index + 1 <= data.experience.progress) {
            return { ...item, isDone: true };
          } else {
            return item;
          }
        })
      );
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSaveProgress = async () => {
    history.push("/user/experience-hosting");
    const newProgress = itemList.filter((item) => item.isDone);
    console.log(newProgress);
    await updateExperienceById(id, {
      newProgress: newProgress.length !== 0 ? newProgress.length : 1,
    });
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
      history.push(`${url}/step/${index + 2}`);
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
          <Link key={index} to={`${url}/step/${index + 1}`}>
            <ListItem button>
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
            path={`${path}/step/:stepId`}
            render={() => (
              <Step
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
