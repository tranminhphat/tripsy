import { getBalanceByAccountId, getTransactions } from "api/stripe";
import { useQuery } from "react-query";

export const useBalance = (accountId: string) => {
  return useQuery(
    ["balances", accountId],
    async () => {
      const {
        data: { balance },
      } = await getBalanceByAccountId(accountId);
      return balance;
    },
    {
      enabled: !!accountId,
    }
  );
};

export const useTransactions = (limit?: number) => {
  return useQuery(["transactions"], async () => {
    const {
      data: { transactions },
    } = await getTransactions(limit);
    return transactions;
  });
};
