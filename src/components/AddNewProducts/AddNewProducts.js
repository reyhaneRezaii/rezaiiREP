import React, { useEffect, useState } from "react";
import "./AddNewProducts.css";
import { Form } from "react-bootstrap";
import { supabase } from "../../supabaseClient";
export default function AddNewProducts({fetchData}) {
  const [newProductName, setNewProductName] = useState("");
  const [newProductPopularity, setNewProductPopularity] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductSale, setNewProductSale] = useState("");
  const [newProductColor, setNewProductColor] = useState("");
  const [newProductStock, setNewProductStock] = useState("");
  const [newProductImg, setNewProductImg] = useState("");

   
  const newProductsInfos = {
    name: newProductName,
    img: newProductImg,
    sale: newProductSale,
    color: newProductColor,
    popularity: newProductPopularity,
    price: newProductPrice,
    stock: newProductStock,
  };
  const addNewProductsBtn = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase
      .from("products") // Replace with your table name
      .insert(newProductsInfos); // Insert an array of objects

      fetchData()

      setNewProductName("");
      setNewProductImg("");
      setNewProductSale("");
      setNewProductColor("");
      setNewProductPopularity("");
      setNewProductPrice("");
      setNewProductStock("");
  };
  return (
    <div className="products-main">
      <h1 className="product-title">افزودن محصول جدید</h1>

      <Form>
        <div className="addproducts-form-group">
          <Form.Group controlId="formName">
            <Form.Control
              id="inputElm"
              type="text"
              placeholder="اسم محصول  را بنویسید"
              name="name"
              required
              value={newProductName}
              onChange={(event) => setNewProductName(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Control
              id="inputElm"
              type="text"
              placeholder="موجودی محصول را بنویسید"
              name="email"
              required
              value={newProductStock}
              onChange={(event) => setNewProductStock(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Control
              id="inputElm"
              type="text"
              placeholder="میزان محبوبیت محصول را بنویسید"
              name="password"
              value={newProductPopularity}
              onChange={(event) => setNewProductPopularity(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formAge">
            <Form.Control
              id="inputElm"
              type="text"
              placeholder="تعداد رنگ بندی محصول را وارد کنید"
              name="age"
              value={newProductColor}
              onChange={(event) => setNewProductColor(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formAge">
            <Form.Control
              id="inputElm"
              type="text"
              placeholder=" قیمت محصول را بنویسید"
              name="age"
              value={newProductPrice}
              onChange={(event) => setNewProductPrice(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formAge">
            <Form.Control
              id="inputElm"
              type="text"
              placeholder=" آدرس عکس محصول را بنویسید"
              name="age"
              value={newProductImg}
              onChange={(event) => setNewProductImg(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formAge">
            <Form.Control
              id="inputElm"
              type="text"
              placeholder="میزان فروش محصول را وارد کنید"
              name="age"
              value={newProductSale}
              onChange={(event) => setNewProductSale(event.target.value)}
              required
            />
          </Form.Group>

          <button
            className="submitBtn"
            onClick={(event) => addNewProductsBtn(event)}
          >
            ثبت محصول
          </button>
        </div>
      </Form>
    </div>
  );
}
