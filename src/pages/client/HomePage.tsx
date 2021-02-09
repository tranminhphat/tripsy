import { connect } from "react-redux";
import * as React from "react";
import { useEffect } from "react";
import User from "../../@types/users/User";
import { setUser } from "../../actions/user/userAction";
import { getCurrentUser } from "../../api/Auth";

interface Props {
  setUser: (user: User) => void;
}

const HomePage: React.FC<Props> = ({ setUser }) => {
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCurrentUser();
      setUser(data.user);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>Hello world </div>;
};

const mapDispatchToProps = (dispatch) => ({
  setUser: (user: User) => dispatch(setUser(user)),
});

export default connect(null, mapDispatchToProps)(HomePage);
