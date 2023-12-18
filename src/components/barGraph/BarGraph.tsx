import React, { useState } from "react";
import { ProductData } from "../../util/convertToProductDataInRange";
import ReactApexChart from "react-apexcharts";

type Props = { products: ProductData[]; dates: Date[] };

const BarGraph: React.FC<Props> = ({ products, dates }) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },
    xaxis: {
      type: "datetime",
      categories: dates.map((date) => date.toISOString().split("T")[0]) || [],
    },
    legend: {
      position: "right",
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <div id="chart" className="bg-white rounded-2xl p-2">
      <ReactApexChart
        options={options}
        series={products}
        type="bar"
        height={550}
        width={500}
      />
    </div>
  );
};

export default BarGraph;
