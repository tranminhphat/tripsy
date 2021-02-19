import * as React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import BreadcrumbsLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

interface Props {
  linkArray: string[];
}

const MyBreadcrumbs: React.FC<Props> = ({ linkArray }) => {
  return (
    <Breadcrumbs separator=">" aria-label="breadcrumb">
      {linkArray.map((link, index) => {
        if (index !== linkArray.length - 1) {
          return (
            <Link to={"/" + link}>
              <BreadcrumbsLink className="capitalize text-main-blue opacity-60 hover:opacity-100 transition ease-in-out duration-500">
                {link}
              </BreadcrumbsLink>
            </Link>
          );
        } else {
          return (
            <Typography className="capitalize text-main-blue cursor-default">
              {link}
            </Typography>
          );
        }
      })}
    </Breadcrumbs>
  );
};

export default MyBreadcrumbs;
