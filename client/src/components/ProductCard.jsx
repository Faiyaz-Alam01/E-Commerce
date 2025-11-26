import axiosInstance from '@/helper/axiousInstance'
import React from 'react'

const ProductCard = ({ product }) => {

  const addProducttoCart = async() => {
    try {
      const response = await axiosInstance.post('/whishlist/add',{productId: product._id});
      if(!response.data.success){
        console.error("Failed to add product to cart")
      } else {
        console.log("Product added to cart successfully")
      }
    } catch (error) {
      console.error("An error adding product to cart:", error);
    }
  }

    return (
      <div className="bg-white w-60 p-4 flex flex-col shadow-md rounded-lg border hover:shadow-lg transition cursor-pointer">

        <div className="bg-gray-100 h-36 w-full rounded overflow-hidden flex items-center justify-center">
          <img 
            src={product.thumbnail} 
            className="w-full h-full object-contain" 
            alt="productImg" 
          />
        </div>

        <div className="flex justify-between items-center mt-2">
          
          <div className="w-[70%]">
            <p className="text-gray-800 font-semibold leading-tight truncate">
              {product.title}
            </p>

            <p className="text-gray-600 text-sm mt-1">
              ₹{product.price}
            </p>
          </div>
          
          <button
            onClick={addProducttoCart} 
            className="bg-blue-600 text-white font-medium text-xs px-3 py-1 rounded-lg hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>

        </div>
      </div>
    )
}

export default ProductCard
