import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "./ProductsTable.css";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal/EditeModal";  
import ErrorBox from "../ErrorBox/ErrorBox";
import DetailModal from "../DetailsModal/DetailModal";
import { CiDollar } from "react-icons/ci";
import { supabase } from "../../supabaseClient"; // مسیر صحیح را تنظیم کنید

export default function ProductsTable({
  allProducts,
  setallProducts,
  fetchData,
}) {
  const [isShowModal, setShowmodal] = useState(false);
  const [isShowDetailModal, setShowDetailModal] = useState(false);
  const [isShowEditModal, setShowEditModal] = useState(false);
  const [productID, setProductID] = useState([]);
  const [mainProductDetailInfos, setMainproductdetailInfos] = useState({});

  //مقادیر جدید
  const [newProductName, setNewProductName] = useState("");
  const [newProductImg, setNewProductImg] = useState("");
  const [newProductSale, setNewProductSale] = useState("");
  const [newProductColor, setNewProductColor] = useState("");
  const [newProductPopularity, setNewProductPopularity] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductStock, setNewProductStock] = useState("");
  /////////////////////

  const deletModalCancelBtn = () => {
    setShowmodal(false);
  };
  const deletModalAcceptBtn = async (id) => {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productID);

    if (error) {
      console.error("Error deleting item:", error);
    } else {
      // Update the state to remove the deleted item
      setallProducts(allProducts.filter((item) => item.id !== productID));
    }

    setShowmodal(false);
  };
  const HiddnDetailModal = () => {
    setShowDetailModal(false);
  };
  //اپدیت کردن اطلاعات در مدال ویرایش
  const updateProductInfoes = async (event) => {
    event.preventDefault();

    const productsNewInfos = {
      name: newProductName,
      img: newProductImg,
      sale: newProductSale,
      color: newProductColor,
      popularity: newProductPopularity,
      price: newProductPrice,
      stock: newProductStock,
    };

    const { data, error } = await supabase
      .from("products")
      .update(productsNewInfos)
      .eq("id", productID);

    if (error) {
      console.error("Error updating data:", error);
    } else {
      setShowEditModal(false);
    }

  
  };

  //////////////////////////

  useEffect(() => {
 
    //برای رندر مجدد جهت تغییر مقادیر اپدیت شده ب صورت همزمان
    fetchData();
  }, [isShowEditModal]);

  return (
    <>
 
      {allProducts.length ? (
        <div className="tabelProduct">
          <Table className="table">
            <thead className="tableproductThead">
              <tr>
                <th>عکس</th>
                <th>اسم</th>
                <th>قیمت</th>
                <th>موجودی</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className="productTableTbody">
              {allProducts && 
                allProducts.reverse().map((product) => {
                  return (
                    <tr key={product.id}>
                      <td>
                        <img src={product.img} alt="" />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.stock}</td>
                      <td className="tdOfButtons">
                        <button
                          onClick={() => {
                            setShowDetailModal(true);
                            setMainproductdetailInfos(product);
                          }}
                        >
                          جزییات
                        </button>
                        <button
                          onClick={() => {
                            setShowmodal(true);
                            setProductID(product.id);
                             
                          }}
                        >
                          حذف
                        </button>
                        <button
                          onClick={() => {
                            setShowEditModal(true);
                            setProductID(product.id);
                            setNewProductName(product.name);
                            setNewProductSale(product.sale);
                            setNewProductColor(product.color);
                            setNewProductPrice(product.price);
                            setNewProductStock(product.stock);
                            setNewProductPopularity(product.popularity);
                            setNewProductImg(product.img);
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
          {isShowModal && (
            <DeleteModal
              submit={deletModalAcceptBtn}
              cancel={deletModalCancelBtn}
              title={'آیا از حذف اطمینان داری؟'}

            />
          )}
          {isShowDetailModal && (
            <DetailModal onHide={HiddnDetailModal}>
              <Table className="tableDetail">
                <thead>
                  <tr>
                    <th>محبوبیت</th>
                    <th>فروش</th>
                    <th>رنگبندی</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="rowOfDetails">
                    <td>{mainProductDetailInfos.popularity}%</td>
                    <td>{mainProductDetailInfos.sale}</td>
                    <td>{mainProductDetailInfos.color}</td>
                  </tr>
                </tbody>
              </Table>
            </DetailModal>
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
                  placeholder="عنوان جدید را وارد کنید"
                  value={newProductName}
                  onChange={(event) => setNewProductName(event.target.value)}
                />
              </div>

              <div className="edit-products-form-group">
                <span>
                  <CiDollar />
                </span>
                <input
                  type="text"
                  className="edit-product-input"
                  placeholder="قیمت جدید را وارد کنید"
                  value={newProductPrice}
                  onChange={(event) => setNewProductPrice(event.target.value)}
                />
              </div>

              <div className="edit-products-form-group">
                <span>
                  <CiDollar />
                </span>
                <input
                  type="text"
                  className="edit-product-input"
                  placeholder="عکس جدید را وارد کنید"
                  value={newProductImg}
                  onChange={(event) => setNewProductImg(event.target.value)}
                />
              </div>
              <div className="edit-products-form-group">
                <span>
                  <CiDollar />
                </span>
                <input
                  type="text"
                  className="edit-product-input"
                  placeholder="موجودی جدید را وارد کنید"
                  value={newProductStock}
                  onChange={(event) => setNewProductStock(event.target.value)}
                />
              </div>
              <div className="edit-products-form-group">
                <span>
                  <CiDollar />
                </span>
                <input
                  type="text"
                  className="edit-product-input"
                  placeholder="محبوبیت محصول را وارد کنید"
                  value={newProductPopularity}
                  onChange={(event) =>
                    setNewProductPopularity(event.target.value)
                  }
                />
              </div>
              <div className="edit-products-form-group">
                <span>
                  <CiDollar />
                </span>
                <input
                  type="text"
                  className="edit-product-input"
                  placeholder="رنگبندی جدید را وارد کنید"
                  value={newProductColor}
                  onChange={(event) => setNewProductColor(event.target.value)}
                />
              </div>
              <div className="edit-products-form-group">
                <span>
                  <CiDollar />
                </span>
                <input
                  type="text"
                  className="edit-product-input"
                  placeholder="میزان فروش جدید را وارد کنید"
                  value={newProductSale}
                  onChange={(event) => setNewProductSale(event.target.value)}
                />
              </div>
            </EditModal>
          )}
        </div>
      ) : (
        <ErrorBox msg={"هیچ محصولی یافت نشد"} />
      )}
    </>
  );
}
