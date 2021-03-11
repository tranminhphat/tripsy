import { getExperienceById } from "api/experiences";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

interface Props {
  stepProps: any;
}
interface ProvisionListItem {
  id: number;
  itemName: string;
}

const defaultProvisionList: ProvisionListItem[] = [
  { id: 1, itemName: "" },
  { id: 2, itemName: "" },
];

const HostProvision: React.FC<Props> = ({ stepProps }) => {
  const { setIsValid, setStepValue } = stepProps;
  const { id } = useParams<{ id: string }>();
  const experience = useSelector((state) => state.experience);
  const [provisionList, setProvisionList] = useState<ProvisionListItem[]>(
    defaultProvisionList
  );

  React.useEffect(() => {
    fetchProvisionList(id);
    setIsValid(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  React.useEffect(() => {
    const filterProvisionList = provisionList.filter(
      (item) => item.itemName !== ""
    );
    setStepValue({ hostProvisions: filterProvisionList });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provisionList]);

  const fetchProvisionList = async (id: string) => {
    if (experience.hostProvisions) {
      setProvisionList(experience.hostProvisions);
    } else {
      const {
        data: {
          experience: { hostProvisions },
        },
      } = await getExperienceById(id);
      if (hostProvisions.length !== 0) {
        setProvisionList(hostProvisions);
      } else {
        setProvisionList(defaultProvisionList);
      }
    }
  };

  const handleAddItemToProvisionList = () => {
    setProvisionList((prevList) => [
      ...prevList,
      { id: prevList.length, itemName: "" },
    ]);
  };

  const handleOnInputChange = (e: any) => {
    setProvisionList((prevList) =>
      prevList.map((item, index) => {
        if (Number(e.target.id) - 1 === index) {
          return { ...item, itemName: e.target.value };
        } else {
          return item;
        }
      })
    );
  };

  return (
    <div className="max-w-xl my-8 text-justify mx-auto">
      <h1 className="text-4xl font-bold">
        Thêm vào chi tiết những gì mà bạn sẽ cung cấp cho khách
      </h1>
      <p className="mt-4 mb-4 text-lg text-gray-500">
        Bạn có thể cung cấp đồ ăn và thức uống, thiết bị đặc biệt, vé xem một
        buổi hòa nhạc hoặc bất cứ thứ gì đặc biệt khác để khách của bạn cảm thấy
        thoải mái.
      </p>
      <div>
        {provisionList.map((item) => (
          <div key={item.id}>
            <input
              id={JSON.stringify(item.id)}
              value={item.itemName}
              onChange={(e: any) => handleOnInputChange(e)}
              type="text"
              className="w-full mt-2 p-4 border border-gray-300 hover:border-black rounded-md"
              placeholder="Nhập vào đồ cung cấp"
            />
          </div>
        ))}
      </div>
      <button
        className="text-lg font-bold underline mt-2 focus:outline-none"
        onClick={() => handleAddItemToProvisionList()}
      >
        + Thêm đồ cung cấp
      </button>
    </div>
  );
};

export default HostProvision;
