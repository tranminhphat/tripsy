import { deleteReceiptById } from "api/receipt";
import { useMutation, useQueryClient } from "react-query";

const useDeleteReceipt = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ receiptId }: any) => {
      return await deleteReceiptById(receiptId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("receipts");
      },
    }
  );
};

export default useDeleteReceipt;
