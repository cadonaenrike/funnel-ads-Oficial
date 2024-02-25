import dynamic from "next/dynamic";
import React from "react";

export default function DonutChart() {
  const chartOptions = {
    labels: ["Entreprise", "Starter", "Professional"],
    series: [44, 55, 43],
  };

  const Chart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });

  return (
    <>
      <Chart
        options={chartOptions}
        series={chartOptions.series}
        type="pie"
        height={450}
        width={370}
      />
    </>
  );
}
