import { Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getCurrentUser } from "api/users";
import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

interface Props {
  stepProps: any;
}

const IDCardVerification: React.FC<Props> = () => {
  const [isIdVerified, setIsIdVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const {
      data: { user },
    } = await getCurrentUser(["isIdVerified"]);
    if (user) {
      setIsIdVerified(user.isIdVerified);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl my-8 text-justify mx-auto">
      {!isLoading ? (
        <>
          <h1 className="text-4xl font-bold">
            Xác nhân giấy tờ tùy thân của bạn
          </h1>
          {isIdVerified ? (
            <p className="mt-4 mb-4 text-lg text-gray-500">
              Bạn đã xác nhận giấy tờ tùy thân.
            </p>
          ) : (
            <>
              <p className="mt-4 mb-4 text-lg text-gray-500">
                Trước khi hoàn tất, hãy xác nhận giấy tờ tùy thân của bạn. Điều
                này giúp cho hoạt động của bạn được khách tham gia tin tưởng và
                tín nhiệm.
              </p>
              <div className="mt-4 p-8 shadow-xl rounded-xl">
                <h3 className="text-xl font-bold">Xác nhận giấy tờ tùy thân</h3>
                <p>
                  Điều này là bắt buộc đối với tất cả người tổ chức trải nghiệm.
                </p>
                <Button
                  onClick={() =>
                    history.push("/account-settings/personal-info/update-id")
                  }
                  className="mt-4 "
                  variant="contained"
                >
                  Xác thực giấy tờ tùy thân của tôi
                </Button>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default IDCardVerification;
