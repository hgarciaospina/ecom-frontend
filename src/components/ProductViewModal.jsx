import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

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

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      {/* Dark background pattern */}
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      {/* Centered content */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
          <DialogTitle className="text-xl font-semibold text-gray-800">
            {productName}
          </DialogTitle>

          <img
            src={image}
            alt={productName}
            className="mt-4 w-full h-48 object-cover rounded"
          />

          <p className="mt-4 text-gray-600 text-sm">{description}</p>

          <div className="mt-4 text-gray-900 font-bold text-lg">
            {specialPrice ? (
              <>
                <span className="line-through text-gray-400 mr-2">
                  ${price.toFixed(2)}
                </span>
                ${specialPrice.toFixed(2)}
              </>
            ) : (
              <>${price.toFixed(2)}</>
            )}
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
