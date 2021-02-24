import { Button, CircularProgress, Typography } from "@material-ui/core";
import { createExperience, getExperiences } from "api/experiences";
import { getCurrentUser } from "api/users";
import * as React from "react";

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

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const userResponse = await getCurrentUser("_id,username");
    const { user } = userResponse.data;

    const { data } = await getExperiences({
      hostId: user._id,
    });

    setExperiences(data);
  };

  const handleCreateExperience = async () => {
    let title = prompt("Ten hoat dong");

    if (title) {
      const { data } = await createExperience({ title });
      console.log(data);
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
