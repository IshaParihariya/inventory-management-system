import { useEffect, useState } from 'react'

const Products = () => {

  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stockQuantity: '',
    minimumStock: ''
  })

  const getProducts = async () => {

    const response = await fetch(
      'http://localhost:8080/api/products'
    )

    const data = await response.json()

    data.sort((a, b) => b.id.localeCompare(a.id))

    setProducts(data)
  }

  useEffect(() => {
    getProducts()
  }, [])


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  }


  const handleSubmit = async (e) => {

    e.preventDefault()

    const productData = {
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      stockQuantity: Number(formData.stockQuantity),
      minimumStock: Number(formData.minimumStock)
    }

    if (editingProduct) {

      await fetch(
        `http://localhost:8080/api/products/${editingProduct.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(productData)
        }
      )

    } else {

      await fetch(
        'http://localhost:8080/api/products',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(productData)
        }
      )

    }

    setFormData({
      name: '',
      category: '',
      price: '',
      stockQuantity: '',
      minimumStock: ''
    })

    setEditingProduct(null)
    setShowForm(false)

    getProducts()
  }


  const editProduct = (product) => {

    setEditingProduct(product)

    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stockQuantity: product.stockQuantity,
      minimumStock: product.minimumStock
    })

    setShowForm(true)
  }


  const deleteProduct = async (id) => {

    await fetch(
      `http://localhost:8080/api/products/${id}`,
      {
        method: 'DELETE'
      }
    )

    getProducts()
  }


  const restockProduct = async (id) => {

    const quantity = prompt('Enter restock quantity')

    if (!quantity) {
      return
    }

    await fetch(
      `http://localhost:8080/api/products/${id}/restock?quantity=${quantity}`,
      {
        method: 'POST'
      }
    )

    getProducts()
  }


  return (
    <div className="w-full h-full bg-[#EFE8CF] text-[#4F5258] p-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Products
          </h1>

          <p className="text-lg mt-2 text-[#91969E]">
            Manage your inventory
          </p>

        </div>


        <button
          onClick={() => {
            setEditingProduct(null)

            setFormData({
              name: '',
              category: '',
              price: '',
              stockQuantity: '',
              minimumStock: ''
            })

            setShowForm(true)
          }}
          className="bg-[#B0829A] text-white px-5 py-3 rounded-lg font-semibold hover:bg-[#9B7189] transition"
        >
          + Add Product
        </button>

      </div>


      {showForm && (

        <div className="bg-white border border-[#B2B2B3] rounded-lg p-6 mb-8">

          <h2 className="text-2xl font-bold mb-5">
            {editingProduct ? 'Edit Product' : 'Add Product'}
          </h2>


          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-4"
          >

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product name"
              className="border border-[#B2B2B3] p-3 rounded-lg outline-none focus:border-[#B0829A]"
              required
            />

            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="border border-[#B2B2B3] p-3 rounded-lg outline-none focus:border-[#B0829A]"
              required
            />

            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="border border-[#B2B2B3] p-3 rounded-lg outline-none focus:border-[#B0829A]"
              required
            />

            <input
              name="stockQuantity"
              type="number"
              value={formData.stockQuantity}
              onChange={handleChange}
              placeholder="Stock quantity"
              className="border border-[#B2B2B3] p-3 rounded-lg outline-none focus:border-[#B0829A]"
              required
            />

            <input
              name="minimumStock"
              type="number"
              value={formData.minimumStock}
              onChange={handleChange}
              placeholder="Minimum stock"
              className="border border-[#B2B2B3] p-3 rounded-lg outline-none focus:border-[#B0829A]"
              required
            />


            <div className="col-span-2 flex gap-3">

              <button
                type="submit"
                className="bg-[#B0829A] text-white px-5 py-3 rounded-lg font-semibold hover:bg-[#9B7189] transition"
              >
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingProduct(null)
                }}
                className="bg-[#91969E] text-white px-5 py-3 rounded-lg font-semibold hover:bg-[#7F848B] transition"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      )}


      <div className="bg-white rounded-lg border border-[#B2B2B3] overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#91969E] text-white">

            <tr>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Category
              </th>

              <th className="p-4 text-left">
                Price
              </th>

              <th className="p-4 text-left">
                Stock
              </th>

              <th className="p-4 text-left">
                Minimum
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>


          <tbody>

            {products.map((product) => (

              <tr
                key={product.id}
                className="border-b border-[#B2B2B3] hover:bg-[#EFE8CF]"
              >

                <td className="p-4 font-semibold">
                  {product.name}
                </td>

                <td className="p-4">
                  {product.category}
                </td>

                <td className="p-4">
                  ₹{product.price}
                </td>

                <td className="p-4">

                  <span
                    className={
                      product.stockQuantity <= product.minimumStock
                        ? 'text-[#B0829A] font-bold'
                        : ''
                    }
                  >
                    {product.stockQuantity}
                  </span>

                  {product.stockQuantity <= product.minimumStock && (
                    <span className="ml-2 text-[#B0829A] font-semibold">
                      Low
                    </span>
                  )}

                </td>

                <td className="p-4">
                  {product.minimumStock}
                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => editProduct(product)}
                      className="bg-[#D3A6BC] text-[#4F5258] px-3 py-2 rounded-lg font-semibold hover:bg-[#B0829A] hover:text-white transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => restockProduct(product.id)}
                      className="bg-[#B0829A] text-white px-3 py-2 rounded-lg font-semibold hover:bg-[#9B7189] transition"
                    >
                      Restock
                    </button>

                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="bg-[#91969E] text-white px-3 py-2 rounded-lg font-semibold hover:bg-[#7F848B] transition"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default Products