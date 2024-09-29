import React, { useEffect, useState } from "react";
import ErrorBox from "../ErrorBox/ErrorBox";
import { supabase } from "../../supabaseClient";
import Table from "react-bootstrap/Table";
import DeleteModal from "../DeleteModal/DeleteModal";
import "./Orders.css";

export default function Orders() {
  const [allOrders, setAllOrders] = useState([]);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [orderID, setOrderID] = useState("");
  const [isSowAcceptModal, setisSowAcceptModal] = useState(false);
  const [isSowRejectModal, setisSowRejectModal] = useState(false);

  const canselDeleteModal = () => setIsShowDeleteModal(false);
  const canselAcceptModal = () => setisSowAcceptModal(false);
  const canselRejectModal = () => setisSowRejectModal(false);

  const submitAccepteModal = () => {
    let acceptData = 1;
    updateData(orderID, acceptData);
    setisSowAcceptModal(false);
  };
  const submitlRejecteModal = () => {
    let acceptData = 0;
    updateData(orderID, acceptData);
    setisSowRejectModal(false);
  };

  const updateData = async (id, newData) => {
    const { data, error } = await supabase
      .from("orders")
      .update({ isAccepted: newData })
      .eq("id", orderID);

    fetchData();
  };

  const submitlDeleteModal = async () => {
    setIsShowDeleteModal(false);

    const { error } = await supabase.from("orders").delete().eq("id", orderID);

    if (error) {
      console.error("Error deleting item:", error);
    } else {
      setAllOrders(allOrders.filter((item) => item.id !== orderID));
      fetchData();
    }
  };
  ////
  useEffect(() => {
    fetchData();
  }, []);
  ///get data
  const fetchData = async () => {
    const { data: items, error } = await supabase.from("orders").select("*");
    if (error) {
      console.error("Error fetching order:", error);
    } else {
      setAllOrders(items);
    }
  };
  ////
  return (
    <div>
      {allOrders.length ? (
        <div className="ordersTable">
          <Table className="table">
            <thead>
              <tr>
                <th>نام خریدار</th>
                <th>نام محصول</th>
                <th>تاریخ</th>
                <th>زمان</th>
              </tr>
            </thead>
            <tbody className="productTableTbody col">
              {allOrders.map((order) => {
                return (
                  <tr key={order.id}>
                    <td>{order.buyer}</td>
                    <td>{order.product}</td>
                    <td>{order.date}</td>
                    <td>{order.time}</td>

                    <td className="tdOfButtons">
                      <button
                        onClick={() => {
                          setIsShowDeleteModal(true);
                          setOrderID(order.id);
                        }}
                      >
                        حذف
                      </button>
                      {order.isAccepted === 0 ? (
                        <button
                          onClick={() => {
                            setisSowAcceptModal(true);
                            setOrderID(order.id);
                          }}
                        >
                          تایید
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setisSowRejectModal(true);
                            setOrderID(order.id);
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
          {isShowDeleteModal && (
            <DeleteModal
              submit={submitlDeleteModal}
              cancel={canselDeleteModal}
              title={"آیا از حذف اطمینان داری؟"}
            ></DeleteModal>
          )}
          {isSowAcceptModal && (
            <DeleteModal
              submit={submitAccepteModal}
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
        <ErrorBox msg={"هیچ سفارشی یافت نشد"} />
      )}
    </div>
  );
}
