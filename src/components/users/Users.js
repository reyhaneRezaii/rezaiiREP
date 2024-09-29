import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "./User.css";
import { supabase } from "../../supabaseClient";
import ErrorBox from "../ErrorBox/ErrorBox";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal/EditeModal";
import { CiDollar } from "react-icons/ci";
import DetailModal from "../DetailsModal/DetailModal";

export default function Users() {
  const [allUsers, setAllUsers] = useState([]);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setShowEditModal] = useState(false);
  const [userID, setUserID] = useState("");
  const [isShowDetailModal, setShowDetailModal] = useState(false);
  const [mainUserDetailInfos, setMainUserdetailInfos] = useState({});

  //مقادیر جدید
  const [newName, setNewName] = useState("");
  const [newUserPhonenumber, setNewUserPhonenumber] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  /////////

  const canselDeleteModal = () => setIsShowDeleteModal(false);
  //delete users
  const submitlDeleteModal = async () => {
    setIsShowDeleteModal(false);

    const { error } = await supabase.from("users").delete().eq("id", userID);

    if (error) {
      console.error("Error deleting item:", error);
    } else {
      setAllUsers(allUsers.filter((item) => item.id !== userID));
      fetchData();
    }
  };
  const HiddnDetailModal = () => {
    setShowDetailModal(false);
  };
  ///update infos
  const updateProductInfoes = async (event) => {
    event.preventDefault();

    const userNewInfos = {
      name: newName,
      password: newUserPassword,
      email: newUserEmail,
      phonenumber: newUserPhonenumber,
      username: newUsername,
    };

    const { data, error } = await supabase
      .from("users")
      .update(userNewInfos)
      .eq("id", userID);

    if (error) {
      console.error("Error fetching comments:", error);
    } else {
      setShowEditModal(false);
      fetchData();
    }
  };
  ////
  useEffect(() => {
    fetchData();
  }, []);
  ///get data
  const fetchData = async () => {
    const { data: items, error } = await supabase.from("users").select("*");
    if (error) {
      console.error("Error fetching users:", error);
    } else {
      setAllUsers(items);
    }
  };
  ////
  return (
    <>
      {allUsers.length ? (
        <div className="UserTable">
          <Table className="table">
            <thead>
              <tr>
                <th>نام و نام خانوادگی</th>
                <th>نام کاربری</th>
                <th>رمز عبور</th>
                <th>شماره تماس</th>
                <th>ایمیل</th>
              </tr>
            </thead>
            <tbody className="productTableTbody col">
              {allUsers.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.password}</td>

                    <td>{user.phonenumber}</td>
                    <td>{user.email}</td>
                    <td className="tdOfButtons">
                      <button
                        onClick={() => {
                          setIsShowDeleteModal(true);
                          setUserID(user.id);
                        }}
                      >
                        حذف
                      </button>
                      <button
                        onClick={() => {
                          setShowDetailModal(true);
                          setMainUserdetailInfos(user);
                        }}
                      >
                        جزییات
                      </button>
                      <button
                        onClick={() => {
                          setShowEditModal(true);
                          setUserID(user.id);
                          setNewName(user.name);
                          setNewUserEmail(user.email);
                          setNewUserPassword(user.password);
                          setNewUserPhonenumber(user.phonenumber);
                          setNewUsername(user.username);
                        }}
                        onTouchStart={() => {
                          setShowEditModal(true);
                          setUserID(user.id);
                          setNewName(user.name);
                          setNewUserEmail(user.email);
                          setNewUserPassword(user.password);
                          setNewUserPhonenumber(user.phonenumber);
                          setNewUsername(user.username);
                        }}
                      >
                        ویرایش
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          {isShowDeleteModal && (
            <DeleteModal
              submit={submitlDeleteModal}
              cancel={canselDeleteModal}
              title={"آیا از حذف اطمینان داری؟"}
            ></DeleteModal>
          )}
          {isShowEditModal && (
            <EditModal
              onClose={() => {
                setShowEditModal(false);
              }}
              onsubmit={updateProductInfoes}
            >
              <div className="edit-products-form-group">
                <span>
                  <CiDollar />
                </span>
                <input
                  type="text"
                  className="edit-product-input"
                  placeholder="نام جدید را وارد کنید"
                  value={newName}
                  onChange={(event) => setNewName(event.target.value)}
                />
              </div>

              <div className="edit-products-form-group">
                <span>
                  <CiDollar />
                </span>
                <input
                  type="text"
                  className="edit-product-input"
                  placeholder="نام کاربری جدید را وارد کنید"
                  value={newUsername}
                  onChange={(event) => setNewUsername(event.target.value)}
                />
              </div>

              <div className="edit-products-form-group">
                <span>
                  <CiDollar />
                </span>
                <input
                  type="text"
                  className="edit-product-input"
                  placeholder="رمز جدید  را وارد کنید"
                  value={newUserPassword}
                  onChange={(event) => setNewUserPassword(event.target.value)}
                />
              </div>
              <div className="edit-products-form-group">
                <span>
                  <CiDollar />
                </span>
                <input
                  type="text"
                  className="edit-product-input"
                  placeholder="ایمیل جدید را وارد کنید"
                  value={newUserEmail}
                  onChange={(event) => setNewUserEmail(event.target.value)}
                />
              </div>
              <div className="edit-products-form-group">
                <span>
                  <CiDollar />
                </span>
                <input
                  type="text"
                  className="edit-product-input"
                  placeholder="شماره تلفن محصول را وارد کنید"
                  value={newUserPhonenumber}
                  onChange={(event) =>
                    setNewUserPhonenumber(event.target.value)
                  }
                />
              </div>
            </EditModal>
          )}
          {isShowDetailModal && (
            <DetailModal onHide={HiddnDetailModal}>
              <Table>
                <thead>
                  <tr>
                    <th>شهر</th>
                    <th>میزان خرید</th>
                    <th>امتیاز</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="rowOfDetails">
                    <td>{mainUserDetailInfos.city}%</td>
                    <td>{mainUserDetailInfos.buy}</td>
                    <td>{mainUserDetailInfos.score}</td>
                  </tr>
                </tbody>
              </Table>
            </DetailModal>
          )}
          
        </div>
      ) : (
        <ErrorBox msg={"هیچ کاربری یافت نشد"} />
      )}
    </>
  );
}
