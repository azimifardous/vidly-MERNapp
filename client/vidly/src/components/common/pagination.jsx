import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

// the number of pages should be according to number of movies - evenly divided
// onClick events
// stateless

class Pagination extends Component {
  render() {
    const { itemsCount, pageSize, onPageChange, currentPage } = this.props;
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);

    return (
      <nav className="mt-4">
        <ul className="inline-flex -space-x-px text-sm">
          {pages.map((page) => {
            return (
              <li key={page}>
                <a
                  href="#"
                  className={this.getClasses(page, pagesCount, currentPage)}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  getClasses = (page, pagesCount, currentPage) => {
    let classes =
      "flex items-center justify-center px-3 h-8 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white ";
    classes +=
      page === 1 ? "rounded-l-lg" : page === pagesCount ? "rounded-r-lg" : "";
    if (page === currentPage) {
      classes =
        "flex items-center justify-center px-3 h-8 border border-gray-700 bg-gray-700 text-white ";
      if (page === 1) classes += "rounded-l-lg";
      else if (page === pagesCount) classes += "rounded-r-lg";
    }
    return classes;
  };
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
