import { Typography } from "@material-ui/core";
import { getExperienceById } from "api/experiences";
import * as React from "react";
import MapboxAutocomplete from "react-mapbox-autocomplete";
import { useParams } from "react-router-dom";
interface Props {
  stepProps: any;
}

const Location: React.FC<Props> = ({ stepProps }) => {
  const { setStepValue, setIsValid } = stepProps;
  const { id } = useParams<{ id: string }>();
  const [location, setLocation] = React.useState<{
    city: string;
    lat: string;
    lng: string;
  }>();

  React.useEffect(() => {
    fetchData(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchData = async (id: string) => {
    const {
      data: {
        experience: { location },
      },
    } = await getExperienceById(id);
    console.log(location);
    if (location) {
      setLocation(location);
      setIsValid(true);
    }
  };

  const handleSelect = (result, lat, lng) => {
    setStepValue({
      location: {
        city: result,
        lat,
        lng,
      },
    });
    setIsValid(true);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-4xl font-bold">
        Hãy chọn thành phố nơi bạn tổ chức buổi trải nghiệm
      </h1>
      <p className="mt-4 mb-4 text-gray-500">
        Đừng lo lắng nếu thành phố của bạn không xuất hiện trong ô tìm kiếm bên
        dưới, hãy chọn địa điểm gần nhất, bạn sẽ được cập nhật địa chỉ chi tiết
        ở mục sau
      </p>
      {location ? (
        <div>
          <div className="p-5 mb-4 mr-4 border border-gray-500 bg-gray-200 opacity-50 rounded-lg">
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
    </div>
  );
};

export default Location;
