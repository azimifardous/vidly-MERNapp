import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody className="text-white">
        {data.map((item) => (
          <tr
            key={item._id}
            className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600"
          >
            {columns.map((column) => {
              return (
                <td key={column.path || column.key} className="px-6 py-4">
                  {this.renderCell(item, column)}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
