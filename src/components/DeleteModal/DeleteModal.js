import React from "react";
import "./DeleteModal.css";
export default function DeleteModal({submit,cancel,title}) {
  return (
    <div>
      <div className="modal-parent active">
        <div className="delete-modal">
          <h1>{title}</h1>
          <div className="delete-modal-btns">
            <button className="delete-btn delete-modal-accept-btn" onClick={ ()=>submit()} onTouchStart={ ()=>submit()}>بله</button>
            <button className="delete-btn delete-modal-reject-btn" onClick={()=>cancel()} onTouchStart={ ()=>cancel()}>خیر</button>
          </div>
        </div>
      </div>
    </div>
  );
}
