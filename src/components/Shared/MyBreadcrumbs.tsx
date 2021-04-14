import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { Link } from "react-router-dom";

interface Props {
  linkArray: { path: string; name: string }[];
}

const MyBreadcrumbs: React.FC<Props> = ({ linkArray }) => {
  return (
    <Breadcrumbs separator=">" aria-label="breadcrumb">
      {linkArray.map((link, index) => {
        if (index !== linkArray.length - 1) {
          return (
            <Link
              key={index}
              to={link.path}
              className="capitalize text-secondary opacity-60 hover:opacity-100 transition ease-in-out duration-500"
            >
              {link.name}
            </Link>
          );
        } else {
          return (
            <Typography
              key={index}
              className="capitalize text-secondary cursor-default"
            >
              {link.name}
            </Typography>
          );
        }
      })}
    </Breadcrumbs>
  );
};

export default MyBreadcrumbs;
