import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { checkUserLogin, logout } from "../../helpers/functions";
import UsersModal from "./UsersModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import icon_logo from "../../assets/icon_logo.png";
import style from "./navbar.module.css";

const Navbar = () => {
  const [navClick, setNavClick] = useState(false);
  const [usersModal, setUsersModal] = useState(false);

  const { loading } = useSelector((state: RootState) => state.users);

  useEffect(() => {}, [loading]);

  const toggleMenu = () => {
    setUsersModal(!usersModal);
  };

  function closeUsersModal() {
    setUsersModal(false);
  }

  return (
    <div onClick={() => setNavClick(!navClick)}>
      <div className={style.nav_oll}>
        <div>
          <img className="w-24" src={icon_logo} alt="" />
        </div>
        <NavLink className={"ml-4"} to="/">
          Home
        </NavLink>

        {checkUserLogin() ? (
          <>
            <div className="flex gap-5">
              <NavLink to="/projects">Projects</NavLink>
              <NavLink to="/forum">Forum</NavLink>
              <NavLink to="/roadmaps">Road Maps</NavLink>
              <NavLink to="/posts">Posts</NavLink>
              <NavLink to="/er_code">Code Help</NavLink>
              <NavLink to="/education">Education</NavLink>
            </div>
            <NavLink
              to="/"
              onClick={() => {
                logout();
              }}
            >
              Log Out
            </NavLink>

            <div className="flex-grow"></div>

            <div className="users--modal bg-gray-900  z-40">
              <button className="modalBtn" onClick={toggleMenu}>
                {usersModal ? (
                  <div className="close--modal">
                    <p>Your Account</p>
                  </div>
                ) : (
                  <div className="open--modal">
                    <p>Your Account</p>
                  </div>
                )}
              </button>
              {usersModal && (
                <div className="top-0 absolute right-0">
                  <UsersModal />
                  <div className="overlay" onClick={closeUsersModal}></div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink to="/sign-up">Registration</NavLink>
            <NavLink to="/sign-in">Authorization</NavLink>
          </>
        )}
      </div>
      <div className={style.nav_line}></div>
    </div>
  );
};

export default Navbar;
