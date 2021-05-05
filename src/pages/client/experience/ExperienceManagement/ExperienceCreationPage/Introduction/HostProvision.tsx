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
interface ProvisionListItem {
  id: number;
  itemName: string;
}

const defaultProvisionList: ProvisionListItem[] = [{ id: 0, itemName: "" }];

const HostProvision: React.FC<Props> = ({ stepProps }) => {
  const { setIsValid, setStepValue } = stepProps;
  const { id } = useParams<{ id: string }>();
  const { creationObject } = useContext(ExperienceCreationContext);
  const [provisionList, setProvisionList] = useState<ProvisionListItem[]>(
    defaultProvisionList
  );
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    fetchProvisionList(id);
    setIsValid(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  React.useEffect(() => {
    const filterProvisionList = provisionList
      .filter((item) => item.itemName !== "")
      .map((item, index) => ({ id: index, itemName: item.itemName }));
    setStepValue({ hostProvisions: filterProvisionList });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provisionList]);

  const fetchProvisionList = async (id: string) => {
    if (creationObject.hostProvisions) {
      setProvisionList(creationObject.hostProvisions);
    } else {
      const {
        data: {
          experience: { hostProvisions },
        },
      } = await getExperienceById(id);
      if (hostProvisions.length !== 0) {
        setProvisionList(hostProvisions);
        console.log(hostProvisions);
      } else {
        setProvisionList(defaultProvisionList);
      }
    }
    setIsLoading(false);
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
          <h1 className="text-4xl font-bold">
            Thêm vào chi tiết những gì mà bạn sẽ cung cấp cho khách
          </h1>
          <p className="mt-4 mb-4 text-lg text-gray-500">
            Bạn có thể cung cấp đồ ăn và thức uống, thiết bị đặc biệt, vé xem
            một buổi hòa nhạc hoặc bất cứ thứ gì đặc biệt khác để khách của bạn
            cảm thấy thoải mái.
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
          <div className="w-full flex justify-center">
            <IconButton
              onClick={() => handleAddItemToProvisionList()}
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

export default HostProvision;
