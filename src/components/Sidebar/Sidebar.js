import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";
import "./Sidebar.css";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { TfiCommentAlt } from "react-icons/tfi";
import { LuUsers2 } from "react-icons/lu";
import { IoBagCheckOutline } from "react-icons/io5";
import { FiDollarSign } from "react-icons/fi";

import { Link, NavLink } from "react-router-dom";
export default function Sidebar() {
  const [Width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className="sidebarClass">
        <div className="sidebar">
          {Width >= 622 && (
            <h1 className="sidebar-title">به داشبورد خود خوش آمدید</h1>
          )}

          <ul className="sidebar-links">
            <NavLink to="/products">
              <MdOutlineProductionQuantityLimits className="icon" />
              {Width >= 622 && <span>محصولات</span>}
            </NavLink>

            <NavLink to="/comments">
              <TfiCommentAlt className="icon" />
              {Width >= 622 && <span>کامنت ها</span>}
            </NavLink>

            <NavLink to="/users">
              <LuUsers2 className="icon" />
              {Width >= 622 && <span>کاربران</span>}
            </NavLink>

            <NavLink to="/orders">
              <IoBagCheckOutline className="icon" />
              {Width >= 622 && <span>سفارشات </span>}
            </NavLink>
          </ul>
        </div>
      </div>
    </>
  );
}
