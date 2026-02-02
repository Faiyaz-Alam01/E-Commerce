import React from 'react'
import { useSelector } from 'react-redux'

const AdminPage = () => {

  const products = useSelector((state) => state.product.productData);
  console.log(products);

  return (
    <div className="p-5">
      <h1 className='text-center font-bold text-2xl mb-5'>Admin Page</h1>

      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-5">
        <h2 className="text-xl font-semibold mb-3">All Products</h2>

        {products?.length > 0 ? (
          <ul className="space-y-2">
            {products.map((p) => (
              <li 
                key={p._id} 
                className="p-3 border rounded-md hover:bg-gray-100 flex justify-between items-center"
              >
				<div className='flex gap-4 items-center'>
					<img 
						className='size-24 rounded-full border-2'
					src={p.thumbnail} alt="img1" />
				
					<div>
					<p className="font-medium truncate w-40">{p.title}</p>
					<p className="text-sm text-gray-600">Price: ₹{p.price}</p>
					</div>
				</div>

				<div className='flex gap-3'>
					<button className="px-3 py-1 bg-blue-500 hover:bg-blue-800 font-medium  text-white rounded-md text-sm w-16">
                  		Edit
					</button>
					<button className='px-3 py-1 bg-red-500 font-medium hover:bg-red-700 text-white rounded-md text-sm w-16'>
						Delete
					</button>
				</div>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-gray-600'>No products found.</p>
        )}
      </div>

    </div>
  )
}

export default AdminPage
