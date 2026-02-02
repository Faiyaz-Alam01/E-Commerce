import React, { useState } from 'react'
import { MdDeleteForever } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { GrFormSubtract } from "react-icons/gr";
import { useDispatch } from 'react-redux';
import { deleteWishlist, getAllWishlist } from '@/redux/slices/wishlistSlice';



const WhislistCard = ({ product }) => {
  // console.log(product);
  const dispatch = useDispatch();
  
  const[quantity, setQuantity] = useState(1);

  async function removeProduct() {
    await dispatch(deleteWishlist(product._id));
    dispatch(getAllWishlist());

  }

    return (
      <div className="w-full bg-white h-auto shadow-md rounded-xl p-2 px-4 flex items-center gap-4">

        <img 
          className="w-20 h-20 object-cover rounded-lg" 
          src={product.thumbnail} 
          alt="img" 
        />

        <div className="flex-1">
          <p className="font-semibold text-gray-900 truncate w-32">{product.title}</p>
          <p className="text-gray-700 text-sm">₹{product.price}</p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setQuantity(quantity > 1 ? quantity-1 : 1)}
            className="px-2 hover:bg-gray-200 py-1 border rounded"
          ><GrFormSubtract /></button>
          <span className="font-semibold">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity+1)}
            className="px-2 py-1 hover:bg-gray-200 border rounded"
          ><IoMdAdd /></button>
        </div>

        {/* Line Total */}
        <h1 className="font-semibold text-gray-900 w-20 text-right">
          ₹{quantity * product.price}
        </h1>

        <button 
          onClick={removeProduct}
          className="flex items-center text-red-600 hover:text-red-700 gap-1">
          <MdDeleteForever size={22}/>
          <span className="text-sm hover:text-red-700 hover:font-medium">Remove</span>
        </button>

      </div>

    )
}

export default WhislistCard