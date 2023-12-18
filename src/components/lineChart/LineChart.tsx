import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

type Props = { products: { date: Date; total: number }[] };

const LineChart: React.FC<Props> = ({ products }) => {
  console.log({ products });

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: "Trent over time of a single feature",
      align: "left",
    },
    fill: {
      type: "gradient",
    },
    xaxis: {
      categories:
        products.map((date) => date.date.toISOString().split("T")[0]) || [],
      labels: {
        formatter: function (val) {
          return val;
        },
      },
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      offsetX: 40,
    },

    stroke: {
      curve: "smooth",
    },
  };
  console.log({ products });
  return (
    <div id="chart" className="bg-white rounded-2xl p-2">
      <ReactApexChart
        options={options}
        series={[
          {
            name: "Desktops",
            data: products.map((product) => product?.total),
          },
        ]}
        height={550}
        width={500}
      />
    </div>
  );
};

export default LineChart;
