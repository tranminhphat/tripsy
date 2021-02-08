import { connect } from "react-redux";
import * as React from "react";

interface Props {
  state: {
    users: {
      fullName: string;
    };
  };
}

const HomePage: React.FC<Props> = ({ state }) => {
  const { fullName } = state.users;
  console.log(state.users);
  return <div>Hello world {fullName}</div>;
};

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps, null)(HomePage);
