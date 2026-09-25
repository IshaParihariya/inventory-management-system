import { useEffect, useState } from 'react'

const Orders = () => {

  const [orders, setOrders] = useState([])

  const getOrders = async () => {

    const response = await fetch(
      'http://localhost:8080/api/orders'
    )

    const data = await response.json()

    setOrders(data)
  }

  useEffect(() => {
    getOrders()
  }, [])


  return (
    <div className="w-full h-full bg-[#EFE8CF] text-[#4F5258] p-8">

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Orders
        </h1>

        <p className="text-lg mt-2 text-[#91969E]">
          View all customer orders
        </p>

      </div>


      {orders.length === 0 ? (

        <div className="bg-white border border-[#B2B2B3] rounded-lg p-6">

          <p className="text-lg text-[#91969E]">
            No orders available
          </p>

        </div>

      ) : (

        <div className="flex flex-col gap-5">

          {orders.map((order) => (

            <div
              key={order.id}
              className="bg-white border border-[#B2B2B3] rounded-lg p-6"
            >

              <div className="flex justify-between items-center mb-4">

                <div>

                  <h2 className="text-xl font-bold">
                    Order #{order.id}
                  </h2>

                  <p className="text-sm mt-1 text-[#91969E]">
                    {order.createdAt}
                  </p>

                </div>

                <p className="text-2xl font-bold text-[#B0829A]">
                  ₹{order.total}
                </p>

              </div>


              <div className="border-t border-[#B2B2B3] pt-4">

                {order.items.map((item, index) => (

                  <div
                    key={index}
                    className="flex justify-between items-center py-3 border-b border-[#B2B2B3] last:border-b-0"
                  >

                    <div>

                      <p className="font-semibold">
                        {item.productName}
                      </p>

                      <p className="text-sm text-[#91969E]">
                        ₹{item.price} × {item.quantity}
                      </p>

                    </div>

                    <p className="font-semibold">
                      ₹{item.price * item.quantity}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  )
}

export default Orders