import dynamic from "next/dynamic";

interface GraphicsProps {
  types:
    | "area"
    | "line"
    | "bar"
    | "pie"
    | "donut"
    | "radialBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "candlestick"
    | "boxPlot"
    | "radar"
    | "polarArea"
    | "rangeBar"
    | "rangeArea"
    | "treemap";
}

export default function Graphics({ types }: GraphicsProps) {
  const Chart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });

  const OptionsChartLine = {
    chart: {
      colors: ["#0fffff", "black"],
      tool: {
        enable: true,
      },
    },
  };

  const SeriesChartLine = [
    {
      name: "First",
      data: [0, 16, 32, 48, 64, 80],
      labels: ["First", "Second", "Third"],
    },
  ];

  return (
    <>
      <Chart
        options={OptionsChartLine.chart}
        series={SeriesChartLine}
        height={200}
        width={300}
        type={types}
      />
    </>
  );
}
