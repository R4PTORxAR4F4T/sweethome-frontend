"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios.get("http://localhost:4000/control/logs", {
      withCredentials: true,
    })
      .then((response) => {
        if (response.status === 200 && Array.isArray(response.data)) {
          setLogs(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
          setLogs([]);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401 || error.response.status === 403) {
          router.push("/login");
        } else {
          console.error("Error fetching logs:", error);
        }
      });
  }, [router]);

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">Activity Logs</h1>
      {logs.length > 0 ? (
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
          {logs.map((log, index) => (
            <li key={index} className="ms-4 mb-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {new Date().toLocaleDateString()} {/* Replace with actual timestamp if available */}
              </time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Log Entry {index + 1}
              </h3>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                {typeof log === "string" ? log : JSON.stringify(log)}
              </p>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-gray-500">No logs available.</p>
      )}
    </div>
  );
};

export default Page;
