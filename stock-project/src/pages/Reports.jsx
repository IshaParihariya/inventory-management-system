import { useEffect, useState } from 'react'

const Reports = () => {

  const [sales, setSales] = useState({})
  const [bestSelling, setBestSelling] = useState([])

  const getReports = async () => {

    const salesResponse = await fetch(
      'http://localhost:8080/api/reports/sales'
    )

    const salesData = await salesResponse.json()
    setSales(salesData)

    const bestSellingResponse = await fetch(
      'http://localhost:8080/api/reports/best-selling'
    )

    const bestSellingData = await bestSellingResponse.json()
    setBestSelling(bestSellingData)

  }

  useEffect(() => {
    getReports()
  }, [])


  return (
    <div className="w-full h-full bg-[#EFE8CF] text-[#4F5258] p-8">

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Reports
        </h1>

        <p className="text-lg mt-2 text-[#91969E]">
          Sales and product performance
        </p>

      </div>


      {/* Sales Summary */}

      <div className="grid grid-cols-2 gap-6 mb-8">

        <div className="bg-white border border-[#B2B2B3] rounded-lg p-6">

          <h2 className="text-lg font-semibold text-[#91969E]">
            Total Orders
          </h2>

          <p className="text-4xl font-bold mt-3">
            {sales.totalOrders || 0}
          </p>

        </div>


        <div className="bg-white border border-[#B2B2B3] rounded-lg p-6">

          <h2 className="text-lg font-semibold text-[#91969E]">
            Total Sales
          </h2>

          <p className="text-4xl font-bold mt-3 text-[#B0829A]">
            ₹{sales.totalSales || 0}
          </p>

        </div>

      </div>


      {/* Best Selling Products */}

      <h2 className="text-2xl font-bold mb-4">
        Best Selling Products
      </h2>


      <div className="bg-white border border-[#B2B2B3] rounded-lg p-6">

        {bestSelling.length === 0 ? (

          <p className="text-lg text-[#91969E]">
            No sales data available
          </p>

        ) : (

          bestSelling.map((product, index) => (

            <div
              key={product.productId}
              className="flex justify-between items-center py-4 border-b border-[#B2B2B3] last:border-b-0"
            >

              <div className="flex items-center gap-5">

                <span className="text-lg font-bold text-[#B0829A]">
                  {index + 1}
                </span>

                <span className="text-lg font-semibold">
                  {product.productName}
                </span>

              </div>

              <span className="text-lg font-semibold">
                {product.quantitySold} sold
              </span>

            </div>

          ))

        )}

      </div>

    </div>
  )
}

export default Reports