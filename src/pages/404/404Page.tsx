import NotFoundIcon from "assets/images/icons/404.svg";
import * as React from "react";

interface Props {}

const NotFoundPage: React.FC<Props> = () => {
  return (
    <div className="flex flex-col justify-center items-center my-10">
      <div>
        <img src={NotFoundIcon} alt="page not found" width={500} height={500} />
      </div>
      <div className="mt-8 text-4xl">Rất tiếc, trang này không tồn tại</div>
    </div>
  );
};

export default NotFoundPage;
