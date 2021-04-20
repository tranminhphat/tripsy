import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { useParams } from "react-router-dom";

interface Props {}

const ActivityDetailPage: React.FC<Props> = () => {
  const { activityId } = useParams<{ activityId: string }>();
  return (
    <MainLayout withSearchBar={false}>
      This is activity detail page id: {activityId}
    </MainLayout>
  );
};

export default ActivityDetailPage;
