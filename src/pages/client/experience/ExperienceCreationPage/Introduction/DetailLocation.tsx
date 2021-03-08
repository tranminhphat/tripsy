import * as React from "react";
import {
  getCities,
  getDistrictsByCityName,
  getWardsByDistrictsName,
} from "api/seeds";
import MyAutocomplete from "components/Shared/MyAutocomplete";
import TextField from "@material-ui/core/TextField";

interface Props {
  stepProps: any;
}

const DetailLocation: React.FC<Props> = ({ stepProps }) => {
  const { setIsValid } = stepProps;
  const [describe, setDescribe] = React.useState("");

  const [cities, setCities] = React.useState<string[]>();
  const [city, setCity] = React.useState<string | null>(null);
  const [cityInput, setCityInput] = React.useState("");

  const [districts, setDistricts] = React.useState<string[]>();
  const [district, setDistrict] = React.useState<string | null>(null);
  const [districtInput, setDistrictInput] = React.useState("");

  const [wards, setWards] = React.useState<string[]>();
  const [ward, setWard] = React.useState<string | null>(null);
  const [wardInput, setWardInput] = React.useState("");

  const [address, setAddress] = React.useState("");

  React.useEffect(() => {
    fetchCities();
  }, []);

  React.useEffect(() => {
    if (city) {
      fetchDistricts(city);
    }
  }, [city]);

  React.useEffect(() => {
    if (city && district) {
      fetchWards(district, city);
    }
  }, [district, city]);

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

  const handleOnChange = (e) => {
    setDescribe(e.target.value);
    setIsValid(city!.length >= 10);
  };
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-4xl font-bold">Chi tiết về vị trí tổ chức</h1>
      <h2 className="text-2xl mt-4 font-bold">Mô tả về vị trí </h2>
      <p className="mt-4 text-gray-500">
        Không cần đề cập đến địa chỉ ở đây, bạn sẽ làm điều đó ở mục tiếp theo.
      </p>
      <div className="mt-4">
        <textarea
          value={describe}
          onChange={handleOnChange}
          className="w-full h-36 pl-2 pt-2 border border-gray-300"
        ></textarea>
        <span>{describe.length}/450</span>
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
              value={city}
              setValue={setCity}
              inputValue={cityInput}
              setInputValue={setCityInput}
              setIsValid={setIsValid}
              placeholder="Chọn thành phố / tỉnh"
            />
          </>
        ) : null}
      </div>
      <div className="mt-4">
        {districts ? (
          <>
            <label className="text-xl font-bold">Quận</label>
            <MyAutocomplete
              options={districts}
              value={district}
              setValue={setDistrict}
              inputValue={districtInput}
              setInputValue={setDistrictInput}
              setIsValid={setIsValid}
              placeholder="Chọn quận / huyện"
            />
          </>
        ) : null}
      </div>
      <div className="mt-4">
        {wards ? (
          <>
            <label className="text-xl font-bold">Phường</label>
            <MyAutocomplete
              options={wards}
              value={ward}
              setValue={setWard}
              inputValue={wardInput}
              setInputValue={setWardInput}
              setIsValid={setIsValid}
              placeholder="Chọn phường / xã"
            />
          </>
        ) : null}
      </div>
      <div className="mt-4">
        {city && district && ward ? (
          <>
            <label className="text-xl font-bold">Địa chỉ</label>
            <input
              type="text"
              className="w-full border border-gray-300 hover:border-black p-4 rounded-md"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default DetailLocation;
