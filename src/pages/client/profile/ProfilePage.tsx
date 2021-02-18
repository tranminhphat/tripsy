import MyBreadcrumbs from "components/Shared/MyBreadcrumbs";
import * as React from "react";

interface Props {}

const ProfilePage: React.FC<Props> = () => {
  return <MyBreadcrumbs linkArray={["profile", "this"]} />;
};

export default ProfilePage;
