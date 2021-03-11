import { getExperienceById } from "api/experiences";
import {
  getCities,
  getDistrictsByCityName,
  getWardsByDistrictsName,
} from "api/seeds";
import MyAutocomplete from "components/Shared/MyAutocomplete";
import MyMapbox from "components/Shared/MyMapbox";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

interface Props {
  stepProps: any;
}

interface AddressObject {
  city: string | null;
  district: string | null;
  ward: string | null;
  street: string;
  detail: string;
}

interface AddressInput {
  city: string;
  district: string;
  ward: string;
}

const Address: React.FC<Props> = ({ stepProps }) => {
  const { setIsValid, setStepValue } = stepProps;

  const { id } = useParams<{ id: string }>();

  const experience = useSelector((state) => state.experience);

  const [coordinates, setCoordinates] = useState<[number, number]>([0, 0]);

  const [cities, setCities] = useState<string[]>();

  const [districts, setDistricts] = useState<string[]>();

  const [wards, setWards] = useState<string[]>();

  const [address, setAddress] = useState<AddressObject>({
    city: null,
    district: null,
    ward: null,
    street: "",
    detail: "",
  });

  const [addressInput, setAddressInput] = useState<AddressInput>({
    city: "",
    district: "",
    ward: "",
  });

  useEffect(() => {
    fetchAddress(id);
    fetchCoordinates(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (
      address.city &&
      address.district &&
      address.ward &&
      address.street &&
      address.detail.length >= 10
    ) {
      setIsValid(true);
      setStepValue({ address });
    }
  }, [address, setIsValid, setStepValue]);

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    if (address.city) {
      fetchDistricts(address.city);
    }
  }, [address.city]);

  useEffect(() => {
    if (address.city && address.district) {
      fetchWards(address.district, address.city);
    }
  }, [address.district, address.city]);

  const fetchAddress = async (id: string) => {
    if (experience.address) {
      setAddress(experience.address);
    } else {
      const {
        data: {
          experience: { address },
        },
      } = await getExperienceById(id);
      if (address) {
        setAddress(address);
      }
    }
  };

  const fetchCoordinates = async (id: string) => {
    if (experience.location) {
      setCoordinates(experience.location.coordinates);
    } else {
      const {
        data: {
          experience: { location },
        },
      } = await getExperienceById(id);
      if (location) {
        setCoordinates(location.coordinates);
      }
    }
  };

  const fetchCities = async () => {
    const {
      data: { cities },
    } = await getCities();
    setCities(cities);
  };

  const fetchDistricts = async (cityName: string) => {
    const {
      data: { districts },
    } = await getDistrictsByCityName(cityName);
    setDistricts(districts);
  };

  const fetchWards = async (districtName: string, cityName: string) => {
    const {
      data: { wards },
    } = await getWardsByDistrictsName(districtName, cityName);
    setWards(wards);
  };

  const handleOnAddressChange = (name: string, newValue: string) => {
    setAddress((prevAddress: AddressObject) => ({
      ...prevAddress,
      [name]: newValue,
    }));
  };

  const handleOnAddressInputChange = (name: string, newValue?: string) => {
    setAddressInput((prevAddressInput: AddressInput) => ({
      ...prevAddressInput,
      [name]: newValue,
    }));
  };

  const handleOnDragEnd = (lng: number, lat: number) => {
    setStepValue((prevValue) => ({
      ...prevValue,
      location: { city: address.city, coordinates: [lng, lat] },
    }));
  };

  return (
    <div className="max-w-xl my-8 mx-auto">
      <h1 className="text-4xl font-bold">Chi tiết về vị trí tổ chức</h1>
      <h2 className="text-2xl mt-4 font-bold">Mô tả về vị trí </h2>
      <p className="mt-4 text-gray-500">
        Không cần đề cập đến địa chỉ ở đây, bạn sẽ làm điều đó ở mục tiếp theo.
      </p>
      <div className="mt-4">
        <textarea
          name="detail"
          value={address.detail}
          onChange={(e) => handleOnAddressChange("detail", e.target.value)}
          className="w-full h-36 pl-2 pt-2 border border-gray-300"
        ></textarea>
        <span>{address.detail.length}/450</span>
      </div>
      <div className="mt-4">
        <hr />
      </div>
      <div className="mt-4">
        <h2 className="text-2xl mt-4 font-bold">Khách sẽ gặp bạn ở đâu?</h2>
        <p className="mt-4 text-gray-500">
          Hãy đảm bảo địa điểm gặp mặt có thể dễ dàng tìm kiếm. Địa chỉ chính
          xác sẽ không được chia sẻ cho đến khi khách được xác nhận sẽ tham gia.
        </p>
      </div>
      <div className="mt-4">
        {cities ? (
          <>
            <label className="text-xl font-bold">Thành phố</label>
            <MyAutocomplete
              options={cities}
              value={address.city}
              handleOnChange={(newValue) =>
                handleOnAddressChange("city", newValue)
              }
              handleOnInputChange={(newValue) =>
                handleOnAddressInputChange("city", newValue)
              }
              inputValue={addressInput.city}
              placeholder="Chọn thành phố / tỉnh"
            />
          </>
        ) : null}
      </div>
      <div className="mt-4">
        <>
          <label className="text-xl font-bold">Quận</label>
          <MyAutocomplete
            options={districts ? districts : []}
            value={address.district}
            handleOnChange={(newValue) =>
              handleOnAddressChange("district", newValue)
            }
            handleOnInputChange={(newValue) =>
              handleOnAddressInputChange("district", newValue)
            }
            inputValue={addressInput.district}
            placeholder="Chọn quận / huyện"
          />
        </>
      </div>
      <div className="mt-4">
        <>
          <label className="text-xl font-bold">Phường</label>
          <MyAutocomplete
            options={wards ? wards : []}
            value={address.ward}
            handleOnChange={(newValue) =>
              handleOnAddressChange("ward", newValue)
            }
            handleOnInputChange={(newValue) =>
              handleOnAddressInputChange("ward", newValue)
            }
            inputValue={addressInput.ward}
            placeholder="Chọn phường / xã"
          />
        </>
      </div>
      <div className="mt-4">
        <>
          <label className="text-xl font-bold">Địa chỉ</label>
          <input
            type="text"
            name="street"
            className="w-full border border-gray-300 hover:border-black p-4 rounded-md"
            value={address.street}
            onChange={(e) =>
              handleOnAddressChange(e.target.name, e.target.value)
            }
          />
        </>
      </div>
      <div className="mt-4 flex justify-center">
        <MyMapbox
          width="400px"
          height="400px"
          coordinates={coordinates}
          onDragEnd={(lng, lat) => handleOnDragEnd(lng, lat)}
        />
      </div>
    </div>
  );
};

export default Address;
