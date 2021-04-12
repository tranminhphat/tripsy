import { getExperienceById, updatePhotoGallery } from "api/experiences";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import MyPhotoUpload from "components/Shared/MyPhotoUpload";
import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Props {
  stepProps: any;
}

interface ExperiencePhoto {
  type: string;
  url: string;
}

const Photos: React.FC<Props> = ({ stepProps }) => {
  const { setIsValid } = stepProps;
  const { id } = useParams<{ id: string }>();
  const [photoGallery, setPhotoGallery] = useState<ExperiencePhoto[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPhotos(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchPhotos = async (id: string) => {
    const {
      data: {
        experience: { photoGallery },
      },
    } = await getExperienceById(id);
    if (photoGallery) {
      setPhotoGallery(photoGallery);
      if (!photoGallery.some((photo) => photo.url === "")) {
        setIsValid(true);
      }
    }
    setIsLoading(false);
  };

  const handleUploadGalleryPhoto = async (
    type: string,
    base64String: string
  ) => {
    const {
      data: { experience },
    } = await updatePhotoGallery(id, type, base64String);
    if (!experience.photoGallery.some((photo) => photo.url === "")) {
      setIsValid(true);
    }
  };

  return (
    <div className="max-w-xl my-8 text-justify mx-auto">
      {!isLoading ? (
        <>
          <h1 className="text-4xl font-bold">
            Thêm hình ảnh cho hoạt động của bạn
          </h1>
          <p className="mt-4 mb-4 text-lg text-gray-500">
            Thêm ít nhất 7 ảnh chất lượng cao để cho khách xem trước về trải
            nghiệm của bạn.
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
              <span>
                VÀ QUAN TRỌNG NHẤT, những hình ảnh đó phải thuộc về bạn.
              </span>
            </p>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-bold">
              Ảnh bìa: Cho thấy mọi người đang tương tác trong hoạt động của
              bạn.
            </h3>
            <p className="mt-2 text-lg text-gray-500">
              Chọn một bức ảnh chân thực có ít nhất một người và đang tham gia
              vào hoạt động trải nghiệm của bạn.
            </p>
          </div>
          <div className="mt-2">
            {photoGallery && photoGallery.length !== 0 ? (
              <MyPhotoUpload
                handleUpload={handleUploadGalleryPhoto}
                photo={photoGallery[0]}
                url={photoGallery[0].url ? photoGallery[0].url : null}
              />
            ) : null}
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-bold">
              Thư viện ảnh: Cho thấy đa dạng các chi tiết về hoạt động trải
              nghiệm của bạn.
            </h3>
            <p className="mt-2 text-lg text-gray-500">
              Tải lên thêm ít nhất 6 ảnh nêu bật các khía cạnh khác nhau trong
              trải nghiệm của bạn. Ảnh phải bao gồm sự tương tác giữa người tổ
              chức với khách, vị trí nơi bạn đang tổ chức và các chi tiết cận
              cảnh của trải nghiệm.
            </p>
          </div>
          <div className="mt-4">
            <div className="flex items-stretch justify-start flex-wrap">
              {photoGallery && photoGallery.length !== 0
                ? photoGallery.slice(1).map((photo) => (
                    <div key={photo.type} className="w-1/3 mb-2">
                      <MyPhotoUpload
                        photo={photo}
                        url={photo.url ? photo.url : null}
                        handleUpload={handleUploadGalleryPhoto}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </>
      ) : (
        <div className="flex-grow justify-center items-center">
          <MyLoadingIndicator width={300} height={300} />
        </div>
      )}
    </div>
  );
};

export default Photos;
