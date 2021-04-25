import MyBreadcrumbs from "components/Shared/MyBreadcrumbs";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { useState } from "react";
import ChooseIDTypeForm from "./ChooseIDTypeForm";
import UploadIDPhotos from "./UploadIDPhotos";

interface Props {}

const UpdateIDPage: React.FC<Props> = () => {
  const [idType, setIdType] = useState("");
  return (
    <MainLayout>
      <div className="container mx-auto px-40">
        <MyBreadcrumbs
          linkArray={[
            {
              path: "/account-settings",
              name: "Tài khoản",
            },
            {
              path: "/account-settings/personal-info",
              name: "Thông tin cá nhân",
            },
            {
              path: "/account-settings/personal-info/update-info",
              name: "Thêm giấy tờ tùy thân",
            },
          ]}
        />
        {!idType ? (
          <ChooseIDTypeForm setIdType={setIdType} />
        ) : (
          <UploadIDPhotos setIdType={setIdType} />
        )}
      </div>
    </MainLayout>
  );
};

export default UpdateIDPage;
