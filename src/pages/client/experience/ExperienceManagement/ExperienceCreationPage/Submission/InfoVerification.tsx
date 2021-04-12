import { getExperienceById } from "api/experiences";
import { getUserById } from "api/users";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Props {
  stepProps: any;
}

const InfoVerification: React.FC<Props> = ({ stepProps }) => {
  const { setIsValid } = stepProps;
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (firstName && lastName && phoneNumber) {
      setIsValid(true);
    }
  });

  useEffect(() => {
    fetchUserData(id);
  }, [id]);

  const fetchUserData = async (id: string) => {
    const {
      data: {
        experience: { hostId },
      },
    } = await getExperienceById(id);
    if (hostId) {
      const {
        data: { firstName, lastName, phoneNumber },
      } = await getUserById(hostId);
      if (firstName) {
        setFirstName(firstName);
      }
      if (lastName) {
        setLastName(lastName);
      }
      if (phoneNumber) {
        setPhoneNumber(phoneNumber);
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-xl my-8 text-justify mx-auto">
      {!isLoading ? (
        <>
          <h1 className="text-4xl font-bold">Xác nhận hồ sơ của bạn</h1>
          <p className="mt-4 mb-4 text-lg text-gray-500">
            Hãy xác nhận lại hồ sơ của bạn, những thông tin dưới đây sẽ được
            hiển thị khi khách tham gia vào hoạt động của bạn. Nếu muốn thay
            đổi, hãy đến trang thông tin cá nhân để cập nhật.
          </p>
          <div className="mt-2">
            <p className="text-xl font-bold">Họ</p>
            <input
              type="text"
              name="lastName"
              value={lastName}
              disabled={true}
              className="w-full mt-2 p-4 border border-gray-300 bg-gray-200 rounded-md"
            />
          </div>
          <div className="mt-2">
            <p className="text-xl font-bold">Tên</p>
            <input
              type="text"
              name="firstName"
              value={firstName}
              disabled={true}
              className="w-full mt-2 p-4 border border-gray-300 bg-gray-200 rounded-md"
            />
          </div>
          <div className="mt-2">
            <p className="text-xl font-bold">Số điện thoại</p>
            <input
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              disabled={true}
              className="w-full mt-2 p-4 border border-gray-300 bg-gray-200 rounded-md"
            />
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

export default InfoVerification;
