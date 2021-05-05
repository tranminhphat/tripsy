import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { getExperienceById } from "api/experiences";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import * as React from "react";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ExperienceCreationContext } from "../ExperienceCreationPage";

interface Props {
  stepProps: any;
}
interface GuestBringListItem {
  id: number;
  itemName: string;
}

const defaultGuestBringList: GuestBringListItem[] = [{ id: 0, itemName: "" }];

const GuestBring: React.FC<Props> = ({ stepProps }) => {
  const { setIsValid, setStepValue } = stepProps;
  const { id } = useParams<{ id: string }>();
  const { creationObject } = useContext(ExperienceCreationContext);
  const [bringList, setBringList] = useState<GuestBringListItem[]>(
    defaultGuestBringList
  );
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    fetchBringList(id);
    setIsValid(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  React.useEffect(() => {
    const filterBringList = bringList
      .filter((item) => item.itemName !== "")
      .map((item, index) => ({
        id: index,
        itemName: item.itemName,
      }));
    setStepValue({ guestBrings: filterBringList });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bringList]);

  const fetchBringList = async (id: string) => {
    if (creationObject.guestBrings) {
      setBringList(creationObject.guestBrings);
    } else {
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
    }
    setIsLoading(false);
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
        if (Number(e.target.id) === index) {
          return { ...item, itemName: e.target.value };
        } else {
          return item;
        }
      })
    );
  };

  return (
    <div className="max-w-xl my-8 text-justify mx-auto">
      {!isLoading ? (
        <>
          <h1 className="text-4xl font-bold">Khách nên mang theo những gì</h1>
          <p className="mt-4 mb-4 text-lg text-gray-500">
            Nếu khách cần mang theo những gì để có thể tham gia trải nghiệm của
            bạn một cách tốt đẹp nhất, đây chính là nơi để ghi ra. Hãy liệt kê
            một cách chi tiết nhất và theo từng vật phẩm một.
          </p>
          <div>
            {bringList.map((item) => (
              <div className="flex" key={item.id}>
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
          <div className="w-full flex justify-center">
            <IconButton
              onClick={() => handleAddItemToBringList()}
              className="bg-black text-white my-4"
            >
              <AddIcon />
            </IconButton>
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

export default GuestBring;
