import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "../ui/card";
import {
  FaChartLine,
  FaClock,
  FaSignLanguage,
  FaCheckCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import GlobalTable from "../common/table";

const History = () => {
  const [selectedTest, setSelectedTest] = useState(null);

  const stats = {
    totalTests: 6,
    averageScore: 82,
    bestSign: "Hello",
    mostDifficultSign: "Thank You",
  };

  const testHistory = [
    { id: 1, date: "Oct 25, 2025", score: 8, total: 10, percent: 80, time: "4m 10s" },
    { id: 2, date: "Oct 26, 2025", score: 9, total: 10, percent: 90, time: "3m 55s" },
    { id: 3, date: "Oct 27, 2025", score: 7, total: 10, percent: 70, time: "4m 20s" },
    { id: 4, date: "Oct 28, 2025", score: 9, total: 10, percent: 90, time: "3m 40s" },
    { id: 5, date: "Oct 29, 2025", score: 10, total: 10, percent: 100, time: "3m 15s" },
  ];

  const columns = [
    { key: "date", label: "Date", sortable: true },
    {
      key: "score",
      label: "Score",
      sortable: true,
      render: (row) => (
        <span className="font-medium text-gray-800 text-sm">
          {row.score}/{row.total}
        </span>
      ),
    },
    {
      key: "percent",
      label: "Percentage",
      sortable: true,
      render: (row) => (
        <span
          className={`font-semibold text-sm ${row.percent >= 90
            ? "text-green-600"
            : row.percent >= 80
              ? "text-yellow-600"
              : "text-red-600"
            }`}
        >
          {row.percent}%
        </span>
      ),
    },
    { key: "time", label: "Time Taken", sortable: false },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <button
          onClick={() => setSelectedTest(row)}
          className="text-indigo-600 hover:text-indigo-800 text-sm underline"
        >
          View
        </button>
      ),
    },
  ];

  const tableData = testHistory.map((t) => ({ ...t, actions: "" }));

  return (
    <div className="p-5 space-y-6   min-h-screen py-1 px-4">
      <div className="container mx-auto">
        {/* Title */}
        <motion.h1
          className="text-xl font-bold text-gray-600 tracking-tight mt-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Performance History
        </motion.h1>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4  mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {[

            {
              icon: <FaChartLine className="text-indigo-600 text-2xl" />,
              label: "Avg Score",
              value: `${stats.averageScore}%`,
              gradient: "from-indigo-500/10 to-indigo-100",
            },
            {
              icon: <FaClock className="text-blue-600 text-2xl" />,
              label: "Total Tests",
              value: stats.totalTests,
              gradient: "from-blue-500/10 to-blue-100",
            },
            {
              icon: <FaSignLanguage className="text-emerald-600 text-2xl" />,
              label: "Best Sign",
              value: stats.bestSign,
              gradient: "from-emerald-500/10 to-emerald-100",
            },
            {
              icon: <FaCheckCircle className="text-amber-600 text-2xl" />,
              label: "Needs Practice",
              value: stats.mostDifficultSign,
              gradient: "from-amber-500/10 to-amber-100",
            },


          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Card
                className={`bg-gradient-to-br ${item.gradient} rounded-xl border-0 shadow-sm hover:shadow-md transition-all  mt-4`}
              >
                <CardContent className="flex items-center gap-3 p-3">
                  {item.icon}
                  <div>
                    <p className="text-gray-600 text-xs">{item.label}</p>
                    <p className="text-lg font-bold text-gray-900 leading-tight">
                      {item.value}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Chart */}
        <motion.div
          className="bg-white p-5 rounded-xl shadow-md border border-gray-100  mt-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-sm font-semibold text-gray-800 mb-3">
            Progress Over Time
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={testHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={11} />
              <YAxis domain={[0, 100]} stroke="#6b7280" fontSize={11} />
              <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
              <Line
                type="monotone"
                dataKey="percent"
                stroke="#6366f1"
                strokeWidth={2.5}
                dot={{ r: 4, strokeWidth: 1.5, fill: "#6366f1" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Table */}
        <motion.div
          className="bg-white p-5 rounded-xl shadow-md border border-gray-100  mt-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-sm font-semibold text-gray-800 mb-3">
            Past Test Results
          </h2>
          <GlobalTable columns={columns} data={tableData} rowsPerPage={5} />
        </motion.div>

        {/* Details Modal */}
        <AnimatePresence>
          {selectedTest && (
            <motion.div
              className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm  mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-xl p-5 w-[90%] md:w-[420px] shadow-2xl relative"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Test — {selectedTest.date}
                </h3>
                <p className="text-gray-700 text-sm mb-1">
                  <span className="font-semibold">Score:</span>{" "}
                  {selectedTest.score}/{selectedTest.total}
                </p>
                <p className="text-gray-700 text-sm mb-1">
                  <span className="font-semibold">Percentage:</span>{" "}
                  {selectedTest.percent}%
                </p>
                <p className="text-gray-500 text-xs mt-2 leading-snug">
                  {selectedTest.percent === 100
                    ? "Excellent! You’ve mastered all signs."
                    : "Keep practicing your weaker signs for a perfect score 💪"}
                </p>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => setSelectedTest(null)}
                    className="bg-indigo-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-indigo-700 transition-all"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default History;
