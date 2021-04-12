import { makeStyles } from "@material-ui/core/styles";
import { getExperienceById } from "api/experiences";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import currencyFormatter from "helpers/currencyFormatter";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const useStyles = makeStyles({
  number: {
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
});

interface Props {
  stepProps: any;
}

const Price: React.FC<Props> = ({ stepProps }) => {
  const { setIsValid, setStepValue } = stepProps;
  const experience = useSelector((state) => state.experience);
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [price, setPrice] = useState<number>(
    experience.pricing ? experience.pricing.individualPrice : 1
  );
  const [estimatedEarning, setEstimatedEarning] = useState<string>(
    experience.pricing ? experience.pricing.estimatedEarning : "0.8"
  );
  const classes = useStyles();

  useEffect(() => {
    setIsValid(true);
    fetchPricing(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchPricing = async (id: string) => {
    const {
      data: {
        experience: { pricing },
      },
    } = await getExperienceById(id);
    if (pricing) {
      setPrice(pricing.individualPrice);
      setEstimatedEarning(currencyFormatter(pricing.estimatedEarning));
    }

    setIsLoading(false);
  };

  const handleOnPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 10) {
      setPrice(Number(e.target.value));
      const estimatedEarningFormat = currencyFormatter(
        Number(e.target.value) * 0.8
      );
      setEstimatedEarning(estimatedEarningFormat);
      setStepValue({
        pricing: {
          individualPrice: Number(e.target.value),
          estimatedEarning: Number(e.target.value) * 0.8,
        },
      });
    }
  };

  return (
    <div className="max-w-xl my-8 text-justify mx-auto">
      {!isLoading ? (
        <>
          <h1 className="text-4xl font-bold">
            Chi phí để tham gia trải nghiệm
          </h1>
          <p className="mt-4 mb-4 text-lg text-gray-500">
            Chi phí cho mỗi khách tham gia tùy thuộc vào sự quyết định của bạn.
            Nhập vào mức phí và bạn sẽ biết được số tiền bạn kiếm được trên một
            vị khách là bao nhiêu.
          </p>
          <div className="mt-4">
            <div className="flex justify-between">
              <div className="mr-2 self-end">
                <h3 className="text-xl font-bold">Tỉ lệ cá nhân</h3>
              </div>
              <div className="ml-2 flex">
                <div className="mr-1 flex flex-col">
                  <label>Mỗi khách phải trả</label>
                  <div className="flex items-center w-48 h-8 border border-gray-400 rounded-lg">
                    <span className="text-md pl-2 font-bold mr-4">VNĐ</span>
                    <input
                      className={`w-28 focus:outline-none ${classes.number}`}
                      type="number"
                      value={price}
                      onChange={handleOnPriceChange}
                    />
                  </div>
                </div>
                <div className="ml-1 flex flex-col">
                  <label>Thu nhập ước tính của bạn</label>
                  <div className="flex items-center w-48 h-8 border border-gray-400 bg-gray-200 rounded-lg">
                    <span className="text-md pl-2 font-bold mr-4">VNĐ</span>
                    <div className="w-28">{estimatedEarning}</div>
                  </div>
                </div>
              </div>
            </div>
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

export default Price;
