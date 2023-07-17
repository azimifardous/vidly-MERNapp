import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = ({ columns, sortColumn, onSort, data }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-lefttext-gray-400">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={data} columns={columns} />
      </table>
    </div>
  );
};

export default Table;
