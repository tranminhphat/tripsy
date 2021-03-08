import axios from "./configureAxios";

export const getCities = async () => {
  return await axios.get(`seeds/location/cities`);
};

export const getDistrictsByCityName = async (cityName: string) => {
  return await axios.get(`seeds/location/districts?cityName=${cityName}`);
};

export const getWardsByDistrictsName = async (
  districtName: string,
  cityName: string
) => {
  return await axios.get(
    `seeds/location/wards?districtName=${districtName}&cityName=${cityName}`
  );
};
