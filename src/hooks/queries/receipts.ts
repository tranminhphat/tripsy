import { getReceiptById, getReceipts } from "api/receipt";
import IReceipt from "interfaces/receipts/receipt.interface";
import { useQuery } from "react-query";

export const useReceipts = (filterObject?: any, sortString?: string) => {
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

export const useReceipt = (receiptId: string) => {
  return useQuery<IReceipt>(
    ["receipts", receiptId],
    async () => {
      const {
        data: { receipt },
      } = await getReceiptById(receiptId);
      return receipt;
    },
    {
      enabled: !!receiptId,
    }
  );
};
