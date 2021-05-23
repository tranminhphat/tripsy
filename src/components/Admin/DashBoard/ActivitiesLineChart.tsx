import { Typography } from "@material-ui/core";
import * as React from "react";
import Chart from "react-apexcharts";

interface Props {}

const ActivitiesLineChart: React.FC<Props> = () => {
  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [
        "1/10",
        "2/10",
        "3/10",
        "4/10",
        "5/10",
        "6/10",
        "7/10",
        "8/10",
      ],
    },
  };
  const series = [
    {
      name: "Number of activities",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ];
  return (
    <div
      className="bg-white p-4 rounded-sm overflow-scroll"
      style={{ height: 500 }}
    >
      <div>
        <Typography className="text-2xl text-gray-500 font-semibold">
          Activities
        </Typography>
      </div>
      <hr className="w-full mt-2" />
      <Chart
        options={options}
        series={series}
        type="line"
        width="500"
        height="500"
      />
    </div>
  );
};

export default ActivitiesLineChart;
