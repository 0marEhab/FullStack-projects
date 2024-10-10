import React from "react";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
export default function CartItem({
  item,
  quantity,
  onAdd,
  onDecrement,
  onDelete,
}) {
  return (
    <div className="flex md:flex-row flex-col items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-4">
        <img
          src={item.productId.image}
          alt={item.productId.name}
          className="w-32 h-32 object-contain"
        />
        <div>
          <h3 className="text-lg font-semibold">{item.productId.name}</h3>
          <p className="text-sm text-gray-500">Stock: {item.productId.stock}</p>
          <p
            className={`text-sm ${
              item.productId.stock ? "text-green-500" : "text-gray-500"
            }`}
          >
            {item.productId.stock ? "In stock" : "Ships in 3 days"}
          </p>
        </div>
      </div>
      <div className="flex m-4 md:m-0 items-center space-x-4">
        <button onClick={() => onAdd(item.productId._id)}>
          <FiPlusCircle  className="size-5" />
        </button>
        <p className="text-lg font-semibold">{quantity}</p>
        <button onClick={() => onDecrement(item.productId._id)}>
          <FiMinusCircle className="size-5" />
        </button>
        <button onClick={() => onDelete(item.productId._id)}>
          <MdDeleteForever className="size-5" />
        </button>
        <p className="text-lg font-semibold">${item.productId.price}</p>
      </div>
    </div>
  );
}
