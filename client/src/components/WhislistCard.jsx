import React, { useState } from 'react'
import { MdDeleteForever } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { GrFormSubtract } from "react-icons/gr";
import { useDispatch } from 'react-redux';
import { getCart, removeItem } from '@/redux/slices/cartSlice';

const WhislistCard = ({ item }) => {
  // console.log("product", item);
  const data = item.product;
  const dispatch = useDispatch();
  const[quantity, setQuantity] = useState(item.quantity);

  async function removeProduct() {
    await dispatch(removeItem(data._id));
    await dispatch(getCart())

  }

  const increaseQty = async() => {
      const newQty = quantity + 1;
      setQuantity(newQty);

      await dispatch(updateCart({
        id:data._id,
        quantity:newQty
      }))
  }

  async function decreaseQty(){
    if(quantity === 1){
      await dispatch(removeItem(data._id));
       dispatch(getCart())
      return;
    }

    const newQty = quantity - 1;
    setQuantity(newQty);

    await dispatch(updateCart({
      id: item._id,
      quantity: newQty
    }));

  }

    return (
      <div className="w-full bg-white h-auto shadow-md rounded-xl p-2 px-4 flex items-center gap-4">

        <img 
          className="w-20 h-20 object-cover rounded-lg" 
          src={data.thumbnail} 
          alt="img" 
        />

        <div className="flex-1">
          <p className="font-semibold text-gray-900 truncate w-32">{data.title}</p>
          <p className="text-gray-700 text-sm">₹{data.price}</p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={decreaseQty}
            className="px-2 hover:bg-gray-200 py-1 border rounded"
          ><GrFormSubtract /></button>
          <span className="font-semibold">{quantity}</span>
          <button 
            onClick={increaseQty}
            className="px-2 py-1 hover:bg-gray-200 border rounded"
          ><IoMdAdd /></button>
        </div>

        {/* Line Total */}
        <h1 className="font-semibold text-gray-900 w-20 text-right">
          ₹{quantity * data.price}
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