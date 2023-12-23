"use client";
import { ApexOptions } from "apexcharts";
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { data } from "../../data";
import DialogToShowChar from "<components>/DialogToShowChar";
import { generateApexChartSeries } from "../../js/generateApexChartSeries";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ChartOne: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(new Date("2022-10-21"));
  const [endDate, setEndDate] = useState<Date>(new Date("2022-10-29"));
  const [selectedProduct, setSelectedProduct] = useState("");
  const modalRef = useRef(null);

  const openModal = () => {
    if (modalRef.current) {
      (modalRef.current as any).showModal();
    }
  };

  var date, products;

  const formattedChartData = generateApexChartSeries(data, startDate, endDate);
  console.log({ formattedChartData });
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
      categories:
        formattedChartData.dates.map((date) =>
          date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "2-digit",
          })
        ) || [],

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
  };

  // NextJS Requirement
  const isWindowAvailable = () => typeof window !== "undefined";

  if (!isWindowAvailable()) return <></>;
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div id="chartOne" className="-ml-5 h-[355px] w-[105%]">
        <ReactApexChart
          options={options}
          series={formattedChartData.series || []}
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
          dates={formattedChartData.dates}
          products={formattedChartData.series.find((data) => {
            return data.name === selectedProduct;
          })}
        />
      </div>
    </div>
  );
};

export default ChartOne;
