"use client";
import { ApexOptions } from "apexcharts";
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { convertToProductDataInRange } from "../../util/convertToProductDataInRange";
import { data } from "../../data";
import DialogToShowChar from "<components>/DialogToShowChar";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ChartOne: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(new Date("2022-10-03"));
  const [endDate, setEndDate] = useState<Date>(new Date("2022-10-29"));
  const [selectedProduct, setSelectedProduct] = useState("");
  const modalRef = useRef(null);

  const openModal = () => {
    if (modalRef.current) {
      (modalRef.current as any).showModal();
    }
  };

  const { products, dates } = convertToProductDataInRange(
    data,
    startDate,
    endDate,
    ["a", "b", "c", "d", "e", "f"],
    "All",
    "All"
  );

  const options: ApexOptions = {
    legend: {
      position: "top",
      horizontalAlign: "left",
      offsetX: 40,
    },
    chart: {
      // events: {
      //   beforeMount: (chart) => {
      //     chart.windowResizeHandler();
      //   },
      // },
      fontFamily: "Satoshi, sans-serif",
      height: 335,
      type: "bar",
      stacked: true,
      toolbar: {
        show: true,
      },
      events: {
        click: function (event, chartContext, config) {
          if (config.config.series[config.seriesIndex].name) {
            openModal();
            setSelectedProduct(config.config.series[config.seriesIndex].name);
          }
        },
      },
    },

    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: 1,
      curve: "smooth",
    },

    xaxis: {
      categories: dates.map((date) => date.toISOString().split("T")[0]) || [],
      labels: {
        formatter: function (val) {
          return val;
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
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
  };

  // NextJS Requirement
  const isWindowAvailable = () => typeof window !== "undefined";

  if (!isWindowAvailable()) return <></>;
  console.log({ products, options });
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div id="chartOne" className="-ml-5 h-[355px] w-[105%]">
        <ReactApexChart
          options={options}
          series={products || []}
          type="bar"
          width="100%"
          height="100%"
        />

        <DialogToShowChar
          data={data}
          startDate={startDate}
          endDate={endDate}
          productNames={selectedProduct ? [selectedProduct] : ["a"]}
          modalRef={modalRef}
        />
      </div>
    </div>
  );
};

export default ChartOne;
