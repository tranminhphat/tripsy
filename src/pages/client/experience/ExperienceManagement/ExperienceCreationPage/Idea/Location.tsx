import { Typography } from "@material-ui/core";
import { getExperienceById } from "api/experiences";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import * as React from "react";
import { useEffect, useState } from "react";
import MapboxAutocomplete from "react-mapbox-autocomplete";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
interface Props {
  stepProps: any;
}

interface LocationProps {
  city: string;
  coordinates: [number, number];
}

const initialValue: LocationProps = { city: "", coordinates: [0, 0] };

const Location: React.FC<Props> = ({ stepProps }) => {
  const { setStepValue, setIsValid } = stepProps;
  const { id } = useParams<{ id: string }>();
  const experience = useSelector((state) => state.experience);
  const [location, setLocation] = useState<LocationProps>(
    experience.location ? experience.location : initialValue
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchData = async (id: string) => {
    if (experience.location) {
      setIsValid(true);
    } else {
      const {
        data: {
          experience: { location },
        },
      } = await getExperienceById(id);
      if (location) {
        setLocation(location);
        setIsValid(true);
      }
    }

    setIsLoading(false);
  };

  const handleSelect = (result: string, lat: number, lng: number) => {
    setStepValue({
      location: {
        city: result,
        coordinates: [lng, lat],
      },
    });
    setIsValid(true);
  };

  return (
    <div className="max-w-xl my-8 text-justify mx-auto">
      {!isLoading ? (
        <>
          <h1 className="text-4xl font-bold">
            Hãy chọn thành phố nơi bạn tổ chức buổi trải nghiệm
          </h1>
          <p className="mt-4 mb-4 text-lg text-gray-500">
            Đừng lo lắng nếu thành phố của bạn không xuất hiện trong ô tìm kiếm
            bên dưới, hãy chọn địa điểm gần nhất, bạn sẽ được cập nhật địa chỉ
            chi tiết ở mục sau
          </p>
          {location && location.city ? (
            <div>
              <div className="p-5 mb-4 border border-gray-500 bg-gray-200 opacity-50 rounded-lg">
                <Typography className="text-lg">{location.city}</Typography>
              </div>
            </div>
          ) : (
            <MapboxAutocomplete
              inputClass="w-full p-2 border border-gray-300"
              placeholder="Nhập vào thành phố"
              publicKey="pk.eyJ1IjoidHJhbm1pbmhwaGF0IiwiYSI6ImNrbHdkZHhydzJ6Y3Myb24xOTI5ZjlteTEifQ.1XeapTPIPwrlnE9hHMqYxg"
              onSuggestionSelect={handleSelect}
              country="vn"
              resetSearch={false}
            />
          )}
        </>
      ) : (
        <div className="flex-grow justify-center items-center">
          <MyLoadingIndicator width={300} height={300} />
        </div>
      )}
    </div>
  );
};

export default Location;
