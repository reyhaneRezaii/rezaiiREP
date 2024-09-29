import React, { Children, useEffect } from "react";
import "./DetailModal.css";
import Table from "react-bootstrap/Table";
import { IoCloseOutline } from "react-icons/io5";

export default function DeleteModal({ onHide, children }) {

  return (
    <>
      <div className="detailModal active">
        <div className="parent">
          <IoCloseOutline className="iconClose" onClick={()=>onHide()}/>
          {children}
        </div>
      </div>
    </>
  );
}
