import { getExperienceById } from "api/experiences";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

interface Props {
  stepProps: any;
}
interface GuestBringListItem {
  id: number;
  itemName: string;
}

const defaultGuestBringList: GuestBringListItem[] = [
  { id: 1, itemName: "" },
  { id: 2, itemName: "" },
];

const GuestBring: React.FC<Props> = ({ stepProps }) => {
  const { setIsValid, setStepValue } = stepProps;
  const { id } = useParams<{ id: string }>();
  const experience = useSelector((state) => state.experience);
  const [bringList, setBringList] = useState<GuestBringListItem[]>(
    experience.guestBrings ? experience.guestBrings : defaultGuestBringList
  );

  React.useEffect(() => {
    fetchBringList(id);
    setIsValid(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  React.useEffect(() => {
    const filterBringList = bringList.filter((item) => item.itemName !== "");
    setStepValue({ guestBrings: filterBringList });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bringList]);

  const fetchBringList = async (id: string) => {
    const {
      data: {
        experience: { guestBrings },
      },
    } = await getExperienceById(id);
    if (guestBrings.length !== 0) {
      setBringList(guestBrings);
    } else {
      setBringList(defaultGuestBringList);
    }
  };

  const handleAddItemToBringList = () => {
    setBringList((prevList) => [
      ...prevList,
      { id: prevList.length, itemName: "" },
    ]);
  };

  const handleOnInputChange = (e: any) => {
    setBringList((prevList) =>
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
      <h1 className="text-4xl font-bold">Khách nên mang theo những gì</h1>
      <p className="mt-4 mb-4 text-lg text-gray-500">
        Nếu khách cần mang theo những gì để có thể tham gia trải nghiệm của bạn
        một cách tốt đẹp nhất, đây chính là nơi để ghi ra. Hãy liệt kê một cách
        chi tiết nhất và theo từng vật phẩm một.
      </p>
      <div>
        {bringList.map((item) => (
          <div key={item.id}>
            <input
              id={JSON.stringify(item.id)}
              value={item.itemName}
              onChange={(e: any) => handleOnInputChange(e)}
              type="text"
              className="w-full mt-2 p-4 border border-gray-300 hover:border-black rounded-md"
              placeholder="Nhập vào vật dụng"
            />
          </div>
        ))}
      </div>
      <button
        className="text-lg font-bold underline mt-2 focus:outline-none"
        onClick={() => handleAddItemToBringList()}
      >
        + Thêm đồ cung cấp
      </button>
    </div>
  );
};

export default GuestBring;
