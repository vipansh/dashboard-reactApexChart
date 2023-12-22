"use client";

import ChartOne from "<components>/Charts/ChartOne";
import ChartTwo from "<components>/Charts/ChartTwo";
import FilterButton from "<components>/FiltersButton";
import React from "react";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <>
      <div className="inline-flex">
        <FilterButton />
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />

        {/* <ChatCard /> */}
      </div>
    </>
  );
};

export default Dashboard;
