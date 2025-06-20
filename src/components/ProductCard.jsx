import React, { lazy, Suspense, useMemo, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

// 💤 Lazy-load the ProductViewModal to reduce the initial bundle size
const ProductViewModal = lazy(() => import('./ProductViewModal'));

const ProductCard = ({
  id,
  productName,
  image,
  description,
  stock,
  price,
  discount,
  specialPrice,
}) => {
  const [openProductViewModal, setOpenProductViewModal] = useState(false);
  const [selectedViewProduct, setSelectedViewProduct] = useState(null);
  const isAvailable = stock && Number(stock) > 0;

  // 🧠 Memoize the formatter to avoid performance hits on each render
  const currencyFormatter = useMemo(() => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });
  }, []);

  const formatCurrency = (value) => currencyFormatter.format(value);

  /**
   * 🔁 Defer modal rendering to avoid performance violation in 'mousedown' event
   * 
   * This ensures that UI transitions (mousedown/click) are not blocked by
   * heavy state changes or component mounting (like modals).
   * We use `requestIdleCallback` (if available) to delay modal rendering
   * until the browser is idle, or fall back to `setTimeout` for compatibility.
   */
  const handleProductView = () => {
    const product = {
      id,
      productName,
      image,
      description,
      stock,
      price,
      discount,
      specialPrice,
    };

    setSelectedViewProduct(product);

    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => setOpenProductViewModal(true));
    } else {
      setTimeout(() => setOpenProductViewModal(true), 0);
    }
  };

  return (
    <div className="rounded-2xl bg-white overflow-hidden shadow-[inset_0_0_5px_rgba(0,0,0,0.05),0_10px_20px_rgba(0,0,0,0.15)] hover:shadow-[inset_0_0_5px_rgba(0,0,0,0.05),0_20px_30px_rgba(0,0,0,0.25)] transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 hover:bg-gradient-to-br from-white to-slate-100">
      <div
        onClick={handleProductView}
        className="w-full h-48 bg-white flex items-center justify-center overflow-hidden cursor-pointer"
      >
        {/* 💤 Lazy loading image improves loading performance */}
        <img
          className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
          src={image}
          alt={productName}
          loading="lazy"
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h2
          onClick={handleProductView}
          className="text-lg font-semibold mb-2 cursor-pointer"
        >
          {productName}
        </h2>

        <div className="min-h-20 max-h-20">
          <p className="text-gray-600 text-sm text-justify">{description}</p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col">
            {specialPrice ? (
              <>
                <span className="text-gray-400 line-through">
                  {formatCurrency(price)}
                </span>
                <span className="text-xl font-bold text-slate-700">
                  {formatCurrency(specialPrice)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-slate-700">
                {formatCurrency(price)}
              </span>
            )}
          </div>

          <button
            className={`w-36 ${
              isAvailable
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-blue-300 text-blue-800 opacity-80 cursor-not-allowed'
            } font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2`}
            disabled={!isAvailable}
          >
            {isAvailable ? (
              <>
                <FaShoppingCart className="text-white" />
                Add to Cart
              </>
            ) : (
              'Stock Out'
            )}
          </button>
        </div>
      </div>

      {/* 🧩 Only render the modal when it's open, and lazy-load it inside Suspense */}
      {openProductViewModal && (
        <Suspense fallback={<div className="p-4 text-center">Loading modal...</div>}>
          <ProductViewModal
            open={openProductViewModal}
            setOpen={setOpenProductViewModal}
            product={selectedViewProduct}
            isAvailable={isAvailable}
          />
        </Suspense>
      )}
    </div>
  );
};

// 🧠 Memoize component to prevent unnecessary re-renders
export default React.memo(ProductCard);
