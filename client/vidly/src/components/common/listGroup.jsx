import React, { Component } from "react";

class ListGroup extends Component {
  render() {
    const { items, textProperty, valueProperty, onItemSelect, selectedItem } =
      this.props;
    return (
      <div className="w-48 text-sm font-medium border rounded-lg bg-gray-800 border-gray-600 text-white overflow-hidden">
        {items.map((item) => {
          let classes =
            "block w-full px-4 py-2 cursor-pointer border-b border-gray-600 hover:bg-gray-600 hover:text-white focus:ring-gray-500 focus:text-white";
          if (item.name === selectedItem.name) classes += " bg-gray-600";
          return (
            <a
              onClick={() => onItemSelect(item)}
              key={item[valueProperty]}
              className={classes}
            >
              {item[textProperty]}
            </a>
          );
        })}
      </div>
    );
  }
}

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
