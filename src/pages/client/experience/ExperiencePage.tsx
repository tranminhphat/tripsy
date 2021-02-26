import * as React from "react";
import { useHistory } from "react-router-dom";

import { Button, CircularProgress, Typography } from "@material-ui/core";
import { createExperience, getExperiences } from "api/experiences";
import { getCurrentUser } from "api/users";

interface Props {}

interface Experience {
  _id: string;
  hostId: string;
  title: string;
  createAt: string;
  updateAt: string;
  _v: string;
}

const ExperiencePage: React.FC<Props> = () => {
  const [experiences, setExperiences] = React.useState<Experience[]>();
  const history = useHistory();

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const userResponse = await getCurrentUser(["_id", "firstName"]);
    const { user } = userResponse.data;

    const { data } = await getExperiences({
      hostId: user._id,
    });

    setExperiences(data);
  };

  const handleCreateExperience = async () => {
    const { data } = await createExperience();
    if (data) {
      history.push(`/user/experience-hosting/${data}`);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <Typography className="text-3xl text-main-blue font-bold">
          Hoạt động trải nghiệm của bạn
        </Typography>
        <Button
          variant="outlined"
          className="focus:outline-none text-main-pink border-main-pink hover:bg-main-pink hover:text-white"
          onClick={handleCreateExperience}
        >
          Tạo hoạt động mới
        </Button>
      </div>
      {!experiences ? (
        <CircularProgress />
      ) : (
        <div>
          {experiences.length !== 0 ? (
            experiences.map((item, idx) => <div key={idx}>{item.title}</div>)
          ) : (
            <div>Bạn chưa tổ chức trải nghiệm nào </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExperiencePage;
