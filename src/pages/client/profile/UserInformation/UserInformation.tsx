import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonIcon from "@material-ui/icons/Person";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import MyTabPanel from "components/Shared/MyTabPanel";
import { IUserResponse } from "interfaces/users/user.interface";
import * as React from "react";
import { useState } from "react";
import AboutMeTab from "./Tabs/AboutMeTab";

interface Props {
  userData: IUserResponse;
  isCurrentUser: boolean;
}

const UserInformation: React.FC<Props> = ({ userData, isCurrentUser }) => {
  const [value, setValue] = useState(0);

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
      <MyTabPanel value={value} index={0}>
        <AboutMeTab userData={userData} isCurrentUser={isCurrentUser} />
      </MyTabPanel>
    </div>
  );
};

export default UserInformation;
