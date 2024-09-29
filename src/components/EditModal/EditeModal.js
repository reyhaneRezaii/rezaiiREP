import React from "react";
import "./EditModal.css";
import { IoCloseOutline } from "react-icons/io5";

export default function EditeModal({ children, onClose, onsubmit }) {
  return (
    <div className="edit-modal-parent active">
      <div className="editModal">
        <button className="btnClose" onClick={() => onClose()}>
          <IoCloseOutline />
        </button>
        <form className="edit-modal-form">
          <h1>اطلاعات جدید را وارد نمایید</h1>
          {children}
          <button className="edit-form-btn" onClick={(event)=>onsubmit(event)} onTouchStart={(event)=>onsubmit(event)}>ثبت اطلاعات جدید</button>
        </form>
      </div>
    </div>
  );
}