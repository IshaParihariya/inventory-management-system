import { useEffect, useState } from 'react'

const Dashboard = () => {

  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [sales, setSales] = useState({})
  const [lowStock, setLowStock] = useState([])
  const [bestSelling, setBestSelling] = useState([])

  useEffect(() => {

    const getDashboardData = async () => {

      const productsResponse = await fetch(
        'http://localhost:8080/api/products'
      )

      const productsData = await productsResponse.json()
      setProducts(productsData)

      const ordersResponse = await fetch(
        'http://localhost:8080/api/orders'
      )

      const ordersData = await ordersResponse.json()
      setOrders(ordersData)

      const salesResponse = await fetch(
        'http://localhost:8080/api/reports/sales'
      )

      const salesData = await salesResponse.json()
      setSales(salesData)

      const lowStockResponse = await fetch(
        'http://localhost:8080/api/products/low-stock'
      )

      const lowStockData = await lowStockResponse.json()
      setLowStock(lowStockData)

      const bestSellingResponse = await fetch(
        'http://localhost:8080/api/reports/best-selling'
      )

      const bestSellingData = await bestSellingResponse.json()
      setBestSelling(bestSellingData)

    }

    getDashboardData()

  }, [])

  return (
    <div className="w-full h-full bg-[#EFE8CF] text-[#4F5258] p-8">

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-lg mt-2 text-[#91969E]">
          Manage your inventory and orders
        </p>

      </div>


      {/* Summary Cards */}

      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-lg border border-[#B2B2B3]">

          <h2 className="text-lg font-semibold text-[#91969E]">
            Products
          </h2>

          <p className="text-4xl font-bold mt-3 text-[#4F5258]">
            {products.length}
          </p>

        </div>


        <div className="bg-white p-6 rounded-lg border border-[#B2B2B3]">

          <h2 className="text-lg font-semibold text-[#91969E]">
            Orders
          </h2>

          <p className="text-4xl font-bold mt-3 text-[#4F5258]">
            {orders.length}
          </p>

        </div>


        <div className="bg-white p-6 rounded-lg border border-[#B2B2B3]">

          <h2 className="text-lg font-semibold text-[#91969E]">
            Total Sales
          </h2>

          <p className="text-4xl font-bold mt-3 text-[#B0829A]">
            ₹{sales.totalSales || 0}
          </p>

        </div>

      </div>


      {/* Low Stock */}

      <div className="mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Low Stock
        </h2>

        <div className="bg-white border border-[#B2B2B3] rounded-lg p-5">

          {lowStock.length === 0 ? (

            <p className="text-lg text-[#91969E]">
              No low-stock products
            </p>

          ) : (

            lowStock.map((product) => (

              <div
                key={product.id}
                className="flex justify-between items-center py-3 border-b border-[#B2B2B3] last:border-b-0"
              >

                <span className="text-lg font-semibold">
                  {product.name}
                </span>

                <span className="text-lg">
                  {product.stockQuantity} left
                </span>

                <span className="text-[#B0829A] font-semibold">
                  Low
                </span>

              </div>

            ))

          )}

        </div>

      </div>


      {/* Best Selling */}

      <div>

        <h2 className="text-2xl font-bold mb-4">
          Best Selling
        </h2>

        <div className="bg-white border border-[#B2B2B3] rounded-lg p-5">

          {bestSelling.length === 0 ? (

            <p className="text-lg text-[#91969E]">
              No sales data available
            </p>

          ) : (

            bestSelling.map((product, index) => (

              <div
                key={product.productId}
                className="flex justify-between items-center py-3 border-b border-[#B2B2B3] last:border-b-0"
              >

                <div className="flex items-center gap-4">

                  <span className="text-lg font-bold text-[#B0829A]">
                    {index + 1}
                  </span>

                  <span className="text-lg font-semibold">
                    {product.productName}
                  </span>

                </div>

                <span className="text-lg">
                  {product.quantitySold} sold
                </span>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  )
}

export default Dashboard