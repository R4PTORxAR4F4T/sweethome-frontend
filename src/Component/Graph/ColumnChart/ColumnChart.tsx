"use client";
import React, { useEffect } from "react";
import ApexCharts from "apexcharts";

const ColumnChart = () => {
  useEffect(() => {
    const options: ApexCharts.ApexOptions = {
      colors: ["#1A56DB", "#FDBA8C"],
      series: [
        {
          name: "Organic",
          color: "#1A56DB",
          data: [
            { x: "Mon", y: 231 },
            { x: "Tue", y: 122 },
            { x: "Wed", y: 63 },
            { x: "Thu", y: 421 },
            { x: "Fri", y: 122 },
            { x: "Sat", y: 323 },
            { x: "Sun", y: 111 },
          ],
        },
        {
          name: "Social media",
          color: "#FDBA8C",
          data: [
            { x: "Mon", y: 232 },
            { x: "Tue", y: 113 },
            { x: "Wed", y: 341 },
            { x: "Thu", y: 224 },
            { x: "Fri", y: 522 },
            { x: "Sat", y: 411 },
            { x: "Sun", y: 243 },
          ],
        },
      ],
      chart: {
        type: "bar",
        height: 320,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          columnWidth: "70%",
          borderRadius: 8,
        },
      },
      tooltip: { shared: true , intersect: false },
      xaxis: {
        labels: {
          style: { cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400" },
        },
      },
      yaxis: { show: false },
      fill: { opacity: 1 },
    };

    const chartElement = document.getElementById("column-chart");
    if (chartElement) {
      const chart = new ApexCharts(chartElement, options);
      chart.render();

      return () => {
        chart.destroy(); // Cleanup on component unmount
      };
    }
  }, []);

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center me-3">
            <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" viewBox="0 0 20 19" fill="currentColor">
              <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
            </svg>
          </div>
          <div>
            <h5 className="text-2xl font-bold text-gray-900 dark:text-white">3.4k</h5>
            <p className="text-sm text-gray-500 dark:text-gray-400">Leads generated per week</p>
          </div>
        </div>
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
          42.5%
        </span>
      </div>
      <div className="grid grid-cols-2">
        <dl className="flex items-center">
          <dt className="text-gray-500 dark:text-gray-400 text-sm me-1">Money spent:</dt>
          <dd className="text-gray-900 text-sm dark:text-white font-semibold">$3,232</dd>
        </dl>
        <dl className="flex items-center justify-end">
          <dt className="text-gray-500 dark:text-gray-400 text-sm me-1">Conversion rate:</dt>
          <dd className="text-gray-900 text-sm dark:text-white font-semibold">1.2%</dd>
        </dl>
      </div>
      <div id="column-chart"></div>
    </div>
  );
};

export default ColumnChart;
