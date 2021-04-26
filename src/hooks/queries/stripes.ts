import { getBalanceByAccountId } from "api/stripe";
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
