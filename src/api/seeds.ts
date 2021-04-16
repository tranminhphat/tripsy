import axios from "./configureAxios";

export const getCities = () => {
  return axios.get(`seeds/location/cities`);
};

export const getDistrictsByCityName = (cityName: string) => {
  return axios.get(`seeds/location/districts?cityName=${cityName}`);
};

export const getWardsByDistrictsName = (
  districtName: string,
  cityName: string
) => {
  return axios.get(
    `seeds/location/wards?districtName=${districtName}&cityName=${cityName}`
  );
};
