import { getReceipts } from "api/receipt";
import IReceipt from "interfaces/receipts/receipt.interface";
import { useQuery } from "react-query";

const useReceipts = (filterObject?: any, sortString?: string) => {
  return useQuery<IReceipt[]>(
    ["receipts", filterObject, sortString],
    async () => {
      const {
        data: { receipts },
      } = await getReceipts(filterObject);
      return receipts;
    }
  );
};

export default useReceipts;
