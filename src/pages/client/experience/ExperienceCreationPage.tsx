import * as React from "react";
import { useParams } from "react-router-dom";

interface Props {}

interface Params {
  id: string;
}

const ExperienceCreationPage: React.FC<Props> = () => {
  const { id } = useParams<Params>();
  return <div>This is a experience with the id {id}</div>;
};

export default ExperienceCreationPage;
