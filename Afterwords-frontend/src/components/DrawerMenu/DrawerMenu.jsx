import "./DrawerMenu.scss";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function DrawerMenu({ showTags, isHomeOptions, user, id }) {

  return (
    <>
      {isHomeOptions ? (
        <div
          className={`filters-container ${showTags === true ? "filters-container--open" : ""
            }`}
        >
          <nav className="filters__drawer">
            <NavLink className="filters__tag" to="/about">About</NavLink>
            <NavLink className="filters__tag" to="/how-to">How To</NavLink>
            <NavLink className="filters__tag" to="/login">Login</NavLink>
          </nav>
        </div>
      ) : (
        <div
          className={`filters-container ${showTags === true ? "filters-container--open" : ""
            }`}
        >
          <nav className="filters__drawer filters__drawer--extended">
            {/* <NavLink className="filters__tag" to={`/${id}/add-loved-one`}>+ Add A Loved One</NavLink> */}
            <NavLink className="filters__tag" to={`/${user.id}/loved-ones/all`}>View Loved Ones</NavLink>
            {/* <NavLink className="filters__tag" to={`/${id}/add-entry`}>Add Entry</NavLink> */}
            <NavLink className="filters__tag" to="/">Logout</NavLink>
          </nav>
        </div>
      )}
    </>
  );
}

export default DrawerMenu;
