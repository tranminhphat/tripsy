import { Typography } from "@material-ui/core";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import currencyFormatter from "helpers/currencyFormatter";
import { useTransactions } from "hooks/queries/stripes";
import * as React from "react";

interface Props {}

const TransactionTab: React.FC<Props> = () => {
  const { data: transactions } = useTransactions();
  return (
    <div
      className="bg-white p-4 rounded-sm overflow-scroll"
      style={{ height: 500 }}
    >
      <div>
        <Typography className="text-2xl text-gray-500 font-semibold">
          Transactions
        </Typography>
      </div>
      <hr className="w-full mt-2" />
      {transactions ? (
        <>
          <div className="grid grid-cols-10 gap-2 mt-2 px-2">
            <div className="col-span-6">
              <Typography className="text-sm font-semibold">ID</Typography>
            </div>
            <div className="col-span-1">
              <Typography className="text-sm font-semibold">Amount</Typography>
            </div>
            <div className="col-span-3 justify-self-end">
              <Typography className="text-sm font-semibold">Status</Typography>
            </div>
          </div>
          <div>
            {transactions.map((transaction, index) => (
              <a
                href={`https://dashboard.stripe.com/test/payments/${transaction.id}`}
                target="blank"
              >
                <div
                  className={`grid grid-cols-10 gap-2 p-2 ${
                    index % 2 !== 0 ? "bg-blue-100" : ""
                  }`}
                >
                  <div className="col-span-6 my-2">
                    <Typography>{transaction.id}</Typography>
                  </div>
                  <div className="col-span-1 my-2">
                    <Typography>
                      {currencyFormatter(transaction.amount)}
                    </Typography>
                  </div>
                  <div className="col-span-3 my-2 justify-self-end">
                    <Typography>{transaction.status}</Typography>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </>
      ) : (
        <MyLoadingIndicator />
      )}
    </div>
  );
};

export default TransactionTab;
