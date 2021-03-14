import { getExperienceById } from "api/experiences";
import MyPhotoUpload from "components/Shared/MyPhotoUpload";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FileReaderResultType } from "types";

interface Props {
  stepProps: any;
}

interface ExperiencePhoto {
  type: string;
  base64String: FileReaderResultType;
  url?: string;
}

const Photos: React.FC<Props> = ({ stepProps }) => {
  const { setIsValid, setStepValue } = stepProps;
  const experience = useSelector((state) => state.experience);
  const { id } = useParams<{ id: string }>();
  const initialPhoToGallery: ExperiencePhoto[] = [
    { type: "cover", base64String: "" },
    { type: "host", base64String: "" },
    { type: "action", base64String: "" },
    { type: "details", base64String: "" },
    { type: "location", base64String: "" },
    { type: "miscellaneous1", base64String: "" },
    { type: "miscellaneous2", base64String: "" },
  ];
  const [base64PhotoGallery, setBase64PhotoGallery] = useState<
    ExperiencePhoto[]
  >([]);

  useEffect(() => {
    fetchPhotos(id);
    console.log(base64PhotoGallery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    handleUpdateStepValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base64PhotoGallery]);

  const fetchPhotos = async (id: string) => {
    if (experience.photoGallery) {
      setBase64PhotoGallery(experience.photoGallery);
    } else {
      const {
        data: {
          experience: { photoGallery },
        },
      } = await getExperienceById(id);
      if (photoGallery) {
        setBase64PhotoGallery(photoGallery);
      } else {
        setBase64PhotoGallery(initialPhoToGallery);
      }
    }
  };

  const handleSetBase64String = (
    type: string,
    base64String: FileReaderResultType
  ) => {
    setBase64PhotoGallery(
      base64PhotoGallery.map((item) => {
        if (item.type === type) {
          return { ...item, base64String };
        } else {
          return item;
        }
      })
    );
  };

  const handleUpdateStepValue = () => {
    if (checkIsPhotoEnough(base64PhotoGallery)) {
      setIsValid(true);
      setStepValue({ photoGallery: base64PhotoGallery });
    } else {
      setIsValid(false);
    }
  };

  const checkIsPhotoEnough = (photoGallery: ExperiencePhoto[]) => {
    for (let i = 0; i < photoGallery.length; i++) {
      if (photoGallery[i].base64String === "") {
        return false;
      }
    }

    return true;
  };

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
      <div className="mt-4">
        <h3 className="text-xl font-bold">
          Ảnh bìa: Cho thấy mọi người đang tương tác trong hoạt động của bạn.
        </h3>
        <p className="mt-2 text-lg text-gray-500">
          Chọn một bức ảnh chân thực có ít nhất một người và đang tham gia vào
          hoạt động trải nghiệm của bạn.
        </p>
      </div>
      <div className="mt-2">
        {base64PhotoGallery.length !== 0 ? (
          <MyPhotoUpload
            type="cover"
            url={base64PhotoGallery[0].url ? base64PhotoGallery[0].url : null}
            setBase64String={(base64String: FileReaderResultType) =>
              handleSetBase64String("cover", base64String)
            }
          />
        ) : null}
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold">
          Thư viện ảnh: Cho thấy đa dạng các chi tiết về hoạt động trải nghiệm
          của bạn.
        </h3>
        <p className="mt-2 text-lg text-gray-500">
          Tải lên thêm ít nhất 6 ảnh nêu bật các khía cạnh khác nhau trong trải
          nghiệm của bạn. Ảnh phải bao gồm sự tương tác giữa người tổ chức với
          khách, vị trí nơi bạn đang tổ chức và các chi tiết cận cảnh của trải
          nghiệm.
        </p>
      </div>
      <div className="mt-4">
        <div className="flex items-stretch justify-start flex-wrap">
          {base64PhotoGallery.length !== 0
            ? base64PhotoGallery.slice(1).map((photo) => (
                <div key={photo.type} className="w-1/3 mb-2">
                  <MyPhotoUpload
                    type={photo.type}
                    url={photo.url ? photo.url : null}
                    setBase64String={(base64String: FileReaderResultType) =>
                      handleSetBase64String(photo.type, base64String)
                    }
                  />
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Photos;
