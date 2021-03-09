import { Typography } from "@material-ui/core";
import { getExperienceById } from "api/experiences";
import * as React from "react";
import MapboxAutocomplete from "react-mapbox-autocomplete";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
interface Props {
  stepProps: any;
}

const Location: React.FC<Props> = ({ stepProps }) => {
  const { setStepValue, setIsValid } = stepProps;
  const { id } = useParams<{ id: string }>();
  const experience = useSelector((state) => state.experience);
  const [coordinates, setCoordinates] = React.useState<{
    city: string;
    lat: string;
    lng: string;
  }>(experience.coordinates ? experience.coordinates : {});

  React.useEffect(() => {
    fetchData(id);
    if (experience.coordinates) {
      setIsValid(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchData = async (id: string) => {
    const {
      data: {
        experience: { coordinates },
      },
    } = await getExperienceById(id);
    if (coordinates) {
      setCoordinates(coordinates);
      setIsValid(true);
    }
  };

  const handleSelect = (result, lat, lng) => {
    setStepValue({
      coordinates: {
        city: result,
        lat,
        lng,
      },
    });
    setIsValid(true);
  };

  return (
    <div className="max-w-xl text-justify mx-auto">
      <h1 className="text-4xl font-bold">
        Hãy chọn thành phố nơi bạn tổ chức buổi trải nghiệm
      </h1>
      <p className="mt-4 mb-4 text-lg text-gray-500">
        Đừng lo lắng nếu thành phố của bạn không xuất hiện trong ô tìm kiếm bên
        dưới, hãy chọn địa điểm gần nhất, bạn sẽ được cập nhật địa chỉ chi tiết
        ở mục sau
      </p>

      {coordinates && coordinates.city ? (
        <div>
          <div className="p-5 mb-4 border border-gray-500 bg-gray-200 opacity-50 rounded-lg">
            <Typography className="text-lg">{coordinates.city}</Typography>
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
    </div>
  );
};

export default Location;
