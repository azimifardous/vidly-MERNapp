import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Vidly
            </span>
          </Link>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to="/movies"
                  className="block py-2 pl-3 pr-4 rounded text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
                >
                  Movies
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/customers"
                  className="block py-2 pl-3 pr-4 rounded text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
                >
                  Customers
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/rentals"
                  className="block py-2 pl-3 pr-4 rounded text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
                >
                  Rentals
                </NavLink>
              </li>
              {!this.props.user && (
                <React.Fragment>
                  <li>
                    <NavLink
                      to="/login"
                      className="block py-2 pl-3 pr-4 rounded text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/register"
                      className="block py-2 pl-3 pr-4 rounded text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
                    >
                      Register
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
              {this.props.user && (
                <React.Fragment>
                  <li>
                    <NavLink
                      to="/profile"
                      className="block py-2 pl-3 pr-4 rounded text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
                    >
                      {this.props.user.name}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/logout"
                      className="block py-2 pl-3 pr-4 rounded text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
                    >
                      Logout
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
