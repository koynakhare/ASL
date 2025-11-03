import React, { useState } from "react";
import { FaSort, FaSortUp, FaSortDown, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import CustomImage from "../image";

const GlobalTable = ({ columns = [], data = [], rowsPerPage = 5 }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig?.key) {
      sortableData?.sort((a, b) => {
        const aVal = a[sortConfig?.key];
        const bVal = b[sortConfig?.key];
        if (aVal < bVal) return sortConfig?.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig?.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev?.key === key && prev?.direction === "asc") {
        return { key, direction: "desc" };
      }
      return { key, direction: "asc" };
    });
  };

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  // Rendering based on type
  const renderCell = (type, value) => {
    switch (type) {
      case "image":
        return (
          <CustomImage
            src={value}
            className="w-12 h-12 object-contain rounded-lg"
          />

        );

      case "status":
        return value === "correct" ? (
          <span className="flex items-center gap-2 text-green-600">
            <FaCheckCircle /> Correct
          </span>
        ) : (
          <span className="flex items-center gap-2 text-red-500">
            <FaTimesCircle /> Incorrect
          </span>
        );

      case "date":
        return (
          <span className="text-gray-600 dark:text-gray-300">
            {new Date(value).toLocaleDateString()}
          </span>
        );
      case "date-time":
        return (
          <span className="text-gray-600 dark:text-gray-300">
            {new Date(value).toLocaleString(undefined, {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        );


      case "badge":
        return (
          <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-full">
            {value}
          </span>
        );

      default:
        return <span>{value}</span>;
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full text-sm border-collapse rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
            {columns?.map((col) => (
              <th
                key={col?.key}
                className="px-2 py-3 text-left cursor-pointer select-none"
                onClick={() => col?.sortable && handleSort(col?.key)}
              >
                <div className="flex items-center gap-2">
                  {col?.label}
                  {col?.sortable && (
                    sortConfig?.key === col?.key ? (
                      sortConfig?.direction === "asc" ? (
                        <FaSortUp className="inline text-xs" />
                      ) : (
                        <FaSortDown className="inline text-xs" />
                      )
                    ) : (
                      <FaSort className="inline text-xs opacity-50" />
                    )
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows?.length > 0 ? (
            currentRows?.map((row, i) => (
              <tr
                key={i}
                className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                {columns.map((col) => (
                  <td key={col?.key} className="px-5 py-3">
                    {renderCell(col?.type, row?.[col?.key])}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4 text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded-lg text-sm disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded-lg text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GlobalTable;
