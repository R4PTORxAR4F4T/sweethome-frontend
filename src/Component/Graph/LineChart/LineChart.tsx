'use client'
import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const LineChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const options = {
        chart: {
          type: "line",
          height: "100%",
          maxWidth: "100%",
          fontFamily: "Inter, sans-serif",
          toolbar: { show: false },
          dropShadow: { enabled: false },
        },
        tooltip: { enabled: true, x: { show: false } },
        dataLabels: { enabled: false },
        stroke: { width: 6, curve: "smooth" },
        grid: {
          show: true,
          strokeDashArray: 4,
          padding: { left: 2, right: 2, top: -26 },
        },
        series: [
          { name: "Clicks", data: [6500, 6418, 6456, 6526, 6356, 6456], color: "#1A56DB" },
          { name: "CPC", data: [6456, 6356, 6526, 6332, 6418, 6500], color: "#7E3AF2" },
        ],
        xaxis: {
          categories: ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb'],
          labels: {
            style: {
              fontFamily: "Inter, sans-serif",
              cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
            },
          },
          axisBorder: { show: false },
          axisTicks: { show: false },
        },
        yaxis: { show: false },
        legend: { show: false },
      };

      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => chart.destroy(); // Cleanup on unmount
    }
  }, []);

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between mb-5">
        <h5 className="text-gray-500 dark:text-gray-400 font-normal">Clicks</h5>
        <p className="text-gray-900 dark:text-white text-2xl font-bold">42.3k</p>
      </div>
      <div ref={chartRef}></div>
    </div>
  );
};

export default LineChart;
