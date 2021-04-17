import { deleteReceiptById, updateReceiptById } from "api/receipt";
import { useMutation, useQueryClient } from "react-query";

export const useUpdateReceipt = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ receiptId, values }: any) => {
      const {
        data: { receipt },
      } = await updateReceiptById(receiptId, { ...values });
      return receipt;
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries("receipts");
      },
    }
  );
};

export const useDeleteReceipt = () => {
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
