import MyPhotoUpload from "components/Shared/MyPhotoUpload";
import * as React from "react";

interface Props {
  stepProps: any;
}

const Photos: React.FC<Props> = ({ stepProps }) => {
  return (
    <div className="max-w-xl my-8 text-justify mx-auto">
      <h1 className="text-4xl font-bold">
        Thêm hình ảnh cho hoạt động của bạn
      </h1>
      <p className="mt-4 mb-4 text-lg text-gray-500">
        Thêm ít nhất 7 ảnh chất lượng cao để cho khách xem trước về trải nghiệm
        của bạn.
      </p>
      <div className="mt-4">
        <h2 className="text-2xl font-bold">Mẹo để có những bức ảnh đẹp</h2>
        <p className="mt-4 text-lg text-gray-500">
          <span className="pr-5">1.</span>
          <span>Ảnh nên có độ sáng, rõ và có màu sắc</span>
        </p>
        <p className="mt-2 text-lg text-gray-500">
          <span className="pr-5">2.</span>
          <span>Ảnh nên mô tả chính xác hoạt động của bạn</span>
        </p>
        <p className="mt-2 text-lg text-gray-500">
          <span className="pr-5">3.</span>
          <span>
            Không nên đăng những hình ảnh tạo dáng hoặc selfie trước camera
          </span>
        </p>
        <p className="mt-2 text-lg text-gray-500">
          <span className="pr-5">4.</span>
          <span>Không nên chèn logo, ký tự hay sử dụng filter</span>
        </p>
        <p className="mt-2 text-lg text-gray-500">
          <span className="pr-5">5.</span>
          <span>VÀ QUAN TRỌNG NHẤT, những hình ảnh đó phải thuộc về bạn.</span>
        </p>
      </div>
      <div className="mt-2">
        <MyPhotoUpload />
      </div>
    </div>
  );
};

export default Photos;
