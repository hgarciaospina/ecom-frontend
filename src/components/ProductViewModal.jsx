import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { MdDone, MdClose } from 'react-icons/md';
import Status from './Status';

function ProductViewModal({ open, setOpen, product, isAvailable }) {
  if (!product) return null;

  const {
    productName,
    image,
    description,
    price,
    specialPrice,
  } = product;

  const handleClose = () => setOpen(false);

  // Formateador de moneda
  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
          <DialogTitle className="text-xl font-semibold text-gray-800 mb-2">
            {productName}
          </DialogTitle>

          <img
            src={image}
            alt={productName}
            className="mb-4 w-full h-48 object-cover rounded"
          />

          <p className="text-gray-600 text-sm mb-4">{description}</p>

          <div className="border-t pt-4 flex justify-between items-center">
            <div className="text-gray-900 font-bold text-lg">
              {specialPrice ? (
                <>
                  <span className="line-through text-gray-400 mr-2">
                    {formatCurrency(price)}
                  </span>
                  {formatCurrency(specialPrice)}
                </>
              ) : (
                <>{formatCurrency(price)}</>
              )}
            </div>

            <div className="text-sm">
              {isAvailable ? (
                <Status
                  text="In Stock"
                  icon={MdDone}
                  bg="bg-teal-100"
                  color="text-teal-800"
                />
              ) : (
                <Status
                  text="Out of Stock"
                  icon={MdClose}
                  bg="bg-rose-100"
                  color="text-rose-700"
                />
              )}
            </div>
          </div>

          <div className="mt-6 text-right">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default ProductViewModal;
