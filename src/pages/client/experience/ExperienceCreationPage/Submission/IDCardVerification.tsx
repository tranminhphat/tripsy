import { Button } from "@material-ui/core";
import * as React from "react";

interface Props {
  stepProps: any;
}

const IDCardVerification: React.FC<Props> = () => {
  return (
    <div className="max-w-xl my-8 text-justify mx-auto">
      <h1 className="text-4xl font-bold">Xác nhân danh tính của bạn</h1>
      <p className="mt-4 mb-4 text-lg text-gray-500">
        Trước khi hoàn tất, hãy xác nhận danh tính của bạn. Điều này giúp cho
        hoạt động của bạn được khách tham gia tin tưởng và tín nhiệm.
      </p>
      <div className="mt-4 p-8 shadow-xl rounded-xl">
        <h3 className="text-xl font-bold">Xác nhận thẻ ID</h3>
        <p>Điều này là bắt buộc đối với tất cả người tổ chức trải nghiệm.</p>
        <Button className="mt-4 " variant="contained">
          Xác thực thẻ ID của tôi
        </Button>
      </div>
    </div>
  );
};

export default IDCardVerification;
