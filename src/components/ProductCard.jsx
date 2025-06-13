import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const ProductCard = ({
  productId,
  productName,
  image,
  description,
  quantity,
  price,
  discount,
  specialPrice,
}) => {
  const [openProductViewModal, setOpenProductViewModal] = useState(false);
  const btnLoader = false;
  const [SelectedViewProduct, setSelectedViewProduct] = useState(false);
  const isAvailable = quantity && Number(quantity) > 0;

  const handleProductView = (product) => {
    setSelectedViewProduct(product);
    setOpenProductViewModal(true);
  };

  return (
    <div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
      <div
        onClick={() => {
            handleProductView({
                id: productId,
                productName,
                image,
                description,
                quantity,
                price,
                discount,
                specialPrice,
            })
        }}
        className="w-full overflow-hidden aspect-[3/2]"
      >
        <img
          className="w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105"
          src={image}
          alt={productName}
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h2
          onClick={() => {
                handleProductView({
                    id: productId,
                    productName,
                    image,
                    description,
                    quantity,
                    price,
                    discount,
                    specialPrice,
                })
            }}
          className="text-lg font-semibold mb-2 cursor-pointer"
        >
          {productName}
        </h2>

        <div className="min-h-20 max-h-20">
          <p className="text-gray-600 text-sm text-justify">{description}</p>
        </div>

        {/* Precio y botón alineados horizontalmente */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col">
            {specialPrice ? (
              <>
                <span className="text-gray-400 line-through">
                  ${Number(price).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span className="text-xl font-bold text-slate-700">
                  ${Number(specialPrice).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-slate-700">
                ${Number(price).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            )}
          </div>

          <button
            disabled={!isAvailable || btnLoader}
            onClick={() => {

            }}
            className={`w-36 ${
              isAvailable
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-blue-300 text-blue-800 opacity-80 cursor-not-allowed'
            } font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2`}
          
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
    </div>
  );
};

export default ProductCard;
