import { IUserResponse } from "interfaces/users/user.interface";
import * as React from "react";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PersonIcon from "@material-ui/icons/Person";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import AboutMeTab from "./Tabs/AboutMeTab";
import { Box } from "@material-ui/core";

interface Props {
  userData: IUserResponse;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`user-tabpanel-${index}`}
      aria-labelledby={`user-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const UserInformation: React.FC<Props> = ({ userData }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Paper square className="text-main-blue">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="inherit"
          aria-label="icon label tabs example"
        >
          <Tab
            className="focus:outline-none"
            icon={<PersonIcon />}
            label="Về tôi"
          />
          <Tab
            className="focus:outline-none"
            icon={<FavoriteIcon />}
            label="FAVORITES"
          />
          <Tab
            className="focus:outline-none"
            icon={<PersonPinIcon />}
            label="NEARBY"
          />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <AboutMeTab userData={userData} />
      </TabPanel>
    </div>
  );
};

export default UserInformation;
