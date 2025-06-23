import { useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import useProductFilter from "../../hooks/useProductFilter";
import { fetchCategories } from "../../store/actions";
import ElegantSpinner from "../shared/ElegantSpinner"; // ✅ Import spinner component
import Paginations from "../shared/Paginations";
import ProductCard from "../shared/ProductCard";
import Filter from "./Filter";

// http://localhost:xxxx?keyword=clothing&sortby=desc

// 1. Make sure url is updated with filter values
// 2. Use this filter values for getting data from backend 

const Products = () => {
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { products, categories, pagination } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useProductFilter();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // ⏳ Local state to delay spinner visibility (prevents flashing for fast requests)
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    let timer;
    if (isLoading) {
      // 📌 Wait 150ms before showing spinner to avoid quick flash
      timer = setTimeout(() => setShowSpinner(true), 150);
    } else {
      setShowSpinner(false);
      clearTimeout(timer);
    }
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
      <Filter categories={categories ? categories: []}/>

      {/* 🧪 Elegant loading state */}
      {isLoading && showSpinner ? (
        <ElegantSpinner />
      ) : errorMessage ? (
        <div className="flex justify-center items-center h-[200px]">
          <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
          <span className="text-slate-800 text-lg font-medium">
            {errorMessage}
          </span>
        </div>
      ) : (
        <div className="min-h-[700px]">
          <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
            {products &&
              products.map((item, i) => <ProductCard key={i} {...item} />)}
          </div>
          <div className="flex justify-center pt-10">
            <Paginations 
                numberOfPage = {pagination?.totalPages}
                totalProucts = {pagination?.totalElements}
              
              />
          </div>
          
        </div>
      )}
    </div>
  );
};

export default Products;
