import React, { useState, useEffect } from "react";
import ErrorBox from "../ErrorBox/ErrorBox";
import Table from "react-bootstrap/Table";
import "./Comments.css";
import { supabase } from "../../supabaseClient";
import DetailModal from "../DetailsModal/DetailModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal/EditeModal";

export default function Comments() {
  const [allComments, setAllComments] = useState([]);
  const [isSowDetailModal, setisSowDetailModal] = useState(false);
  const [isSowDeleteModal, setisSowDeleteModal] = useState(false);
  const [isSowEditModal, setisSowEditModal] = useState(false);
  const [isSowAcceptModal, setisSowAcceptModal] = useState(false);
  const [isSowRejectModal, setisSowRejectModal] = useState(false);
  const [mainCommentBody, setMainCommentBody] = useState("");
  const [showComment, setshowComment] = useState("");
  const [commentID, setCommentID] = useState("");

  const onHide = () => setisSowDetailModal(false);
  const canselDeleteModal = () => setisSowDeleteModal(false);
  const submitlDeleteModal = async () => {
    setisSowDeleteModal(false);

    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentID);

    if (error) {
      console.error("Error deleting item:", error);
    } else {
      setAllComments(allComments.filter((item) => item.id !== commentID));
      fetchComments();
    }
  };
  const closeEditModal = () => setisSowEditModal(false);
  const canselAcceptModal = () => setisSowAcceptModal(false);
  const canselRejectModal = () => setisSowRejectModal(false);

  const submitlAccepteModal = () => {
    let acceptData = 1;
    updateData(commentID, acceptData);
    setisSowAcceptModal(false);
  };
  const submitlRejecteModal = () => {
    let acceptData = 0;
    updateData(commentID, acceptData);
    setisSowRejectModal(false);
  };

  const updateData = async (id, newData) => {
    const { data, error } = await supabase
      .from("comments")
      .update({ isAccepted: newData })
      .eq("id", id);

    fetchComments();
  };

  const submitEditModal = async (event) => {
    event.preventDefault();
    console.log(mainCommentBody);
    console.log(commentID);
    let { data, error } = await supabase
      .from("comments")
      .update({ body: mainCommentBody })
      .eq("id", commentID);

    if (error) {
      console.error("Error updating data:", error);
    } else {
      setisSowEditModal(false);
      fetchComments();
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);
  const fetchComments = async () => {
    let { data: comments, error } = await supabase.from("comments").select("*");

    if (error) {
      console.error("Error fetching comments:", error);
    } else {
      setAllComments(comments);
    }
  };
  return (
    <>
      {allComments.length ? (
        <div className="commentsTable">
          <Table className="table">
            <thead>
              <tr>
                <th>اسم کاربر</th>
                <th>محصول</th>
                <th>کامنت</th>
                <th>تاریخ</th>
                <th>ساعت</th>
              </tr>
            </thead>
            <tbody className="productTableTbody col">
              {allComments.map((comment) => {
                return (
                  <tr key={comment.id}>
                    <td>{comment.userId}</td>
                    <td>{comment.productId}</td>
                    <td className="tdOfButtons">
                      <button
                        onClick={() => {
                          setisSowDetailModal(true);
                          setshowComment(comment.body);
                        }}
                        onTouchStart={() => {
                          setisSowDetailModal(true);
                          setshowComment(comment.body);
                        }}
                      >
                        دیدن متن
                      </button>
                    </td>

                    <td>{comment.date}</td>
                    <td>{comment.hour}</td>
                    <td className="tdOfButtons">
                      <button
                        onClick={() => {
                          setisSowDeleteModal(true);
                          setCommentID(comment.id);
                        }}
                        onTouchStart={() => {
                          setisSowDeleteModal(true);
                          setCommentID(comment.id);
                        }}
                      >
                        حذف
                      </button>
                      <button
                        onClick={() => {
                          setisSowEditModal(true);
                          setMainCommentBody(comment.body);
                          setCommentID(comment.id);
                        }}
                        onTouchStart={() => {
                          setisSowEditModal(true);
                          setMainCommentBody(comment.body);
                          setCommentID(comment.id);
                        }}
                      >
                        ویرایش
                      </button>
                      <button>پاسخ</button>
                      {comment.isAccepted === 0 ? (
                        <button
                          onClick={() => {
                            setisSowAcceptModal(true);
                            setCommentID(comment.id);
                          }}
                          onTouchStart={() => {
                            setisSowAcceptModal(true);
                            setCommentID(comment.id);
                          }}
                        >
                          تایید
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setisSowRejectModal(true);
                            setCommentID(comment.id);
                          }}
                          onTouchStart={() => {
                            setisSowRejectModal(true);
                            setCommentID(comment.id);
                          }}
                        >
                          رد
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          {isSowDetailModal && (
            <DetailModal onHide={onHide}>
              <p className="commentDetalModal">{showComment}</p>
            </DetailModal>
          )}
          {isSowDeleteModal && (
            <DeleteModal
              submit={submitlDeleteModal}
              cancel={canselDeleteModal}
              title={"آیا از حذف اطمینان داری؟"}
            ></DeleteModal>
          )}
          {isSowEditModal && (
            <EditModal onsubmit={submitEditModal} onClose={closeEditModal}>
              <textarea
                value={mainCommentBody}
                onChange={(event) => setMainCommentBody(event.target.value)}
              ></textarea>
            </EditModal>
          )}
          {isSowAcceptModal && (
            <DeleteModal
              submit={submitlAccepteModal}
              cancel={canselAcceptModal}
              title={"آیا از تایید اطمینان داری؟"}
            ></DeleteModal>
          )}
          {isSowRejectModal && (
            <DeleteModal
              submit={submitlRejecteModal}
              cancel={canselRejectModal}
              title={"آیا از رد اطمینان داری؟"}
            ></DeleteModal>
          )}
        </div>
      ) : (
        <ErrorBox msg={"هیچ کامنتی یافت نشد."} />
      )}
    </>
  );
}
