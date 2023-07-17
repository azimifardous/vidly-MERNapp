import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { faSortAsc, faSortDesc } from "@fortawesome/free-solid-svg-icons";

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <FontAwesomeIcon icon={faSortAsc} />;
    return <FontAwesomeIcon icon={faSortDesc} />;
  };

  render() {
    return (
      <thead className="text-xs bg-gray-700 text-gray-300">
        <tr>
          {this.props.columns.map((column) => {
            return (
              <th
                key={column.path || column.key}
                onClick={() => this.raiseSort(column.path)}
                scope="col"
                className="px-6 py-3 cursor-pointer"
              >
                {column.label} {this.renderSortIcon(column)}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
}
export default TableHeader;
