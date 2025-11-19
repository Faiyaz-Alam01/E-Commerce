import React from 'react'

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white w-60 p-4 flex flex-col shadow rounded-lg border">
      
      <div className="bg-white h-32 w-full rounded overflow-hidden flex items-center justify-center">
        <img 
          src={product.thumbnail} 
          className="w-full h-full object-contain" 
          alt="productImg" 
        />
      </div>

      <p className="mt-2 text-gray-700 font-medium truncate">
        {product.title}
      </p>

      <p className="text-gray-500 text-sm">
        ₹{product.price}
      </p>

    </div>
  )
}

export default ProductCard
