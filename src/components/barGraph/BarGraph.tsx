import React, { useRef, useState } from "react";
import { ProductData } from "../../util/convertToProductDataInRange";
import ReactApexChart from "react-apexcharts";
import DialogToShowChar from "<components>/DialogToShowChar";
import { DataType } from "../../data";

type Props = {
  products: ProductData[];
  dates: Date[];
  endDate: Date;
  startDate: Date;
  data: DataType[];
};

const BarGraph: React.FC<Props> = ({
  products,
  dates,
  data,
  startDate,
  endDate,
}) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const modalRef = useRef(null);

  const openModal = () => {
    if (modalRef.current) {
      (modalRef.current as any).showModal();
    }
  };
  
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
      events: {
        click: function (event, chartContext, config) {
          console.log({ event, chartContext, config });
          openModal();
          setSelectedProduct(config.config.series[config.seriesIndex].name);
        },
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
    stroke: {
      width: 1,
    },
    title: {
      text: "Trent over time",
    },
    xaxis: {
      categories: dates.map((date) => date.toISOString().split("T")[0]) || [],
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
    fill: {
      opacity: 1,
    },
  };

  return (
    <div id="chart" className="-ml-5 h-[355px] w-[105%]">
      <ReactApexChart
        options={options}
        series={products}
        type="bar"
        height={550}
        width={500}
      />
      <DialogToShowChar
        data={data}
        startDate={startDate}
        endDate={endDate}
        productNames={selectedProduct ? [selectedProduct] : ["a"]}
        modalRef={modalRef}
      />
    </div>
  );
};

export default BarGraph;
