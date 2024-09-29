import React from "react";
import "./Header.css";
import { CiBellOn } from "react-icons/ci";
import { CiBrightnessUp } from "react-icons/ci";

export default function Header() {
  return (
    <div className="header">
      <div className="admin-profile">
        <div className="admin-profile-detail">
          <h1>ریحانه رضایی</h1>
          <h3>برنامه نویس فرانت اند</h3>
        </div>
      </div>

      <div className="header-left-section">
        <div className="search-box">
          <input type="text" placeholder="جست و جو کنید..." />
          <button>جست و جو</button>
        </div>
        <button className="header-left-icon">
          <CiBellOn />
        </button>
        <button className="header-left-icon">
          <CiBrightnessUp />
        </button>
      </div>
    </div>
  );
}
