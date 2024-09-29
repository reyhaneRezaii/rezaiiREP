import React, { useState, useEffect } from "react";
import AddNewProducts from "../AddNewProducts/AddNewProducts";
import ProductsTable from "../productsTable/ProductsTable";
import { supabase } from "../../supabaseClient";
export default function Products() {
  const [allProducts, setallProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: items, error } = await supabase.from("products").select("*");
    setallProducts(items);
  };
  return (
    <div>
      <AddNewProducts fetchData={fetchData}/>
      <ProductsTable
        allProducts={allProducts}
        setallProducts={setallProducts}
        fetchData={fetchData}
      />
    </div>
  );
}
