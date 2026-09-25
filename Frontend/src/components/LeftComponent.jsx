import { Link } from 'react-router-dom'

const LeftComponent = () => {
  return (
    <div className="h-full w-full bg-[#91969E] text-[#EFE8CF] flex flex-col py-10 px-6">

      <h2 className="text-sm font-semibold uppercase tracking-widest mb-8">
        Menu
      </h2>

      <div className="flex flex-col gap-3">

        <Link
          to="/"
          className="text-lg font-semibold px-4 py-3 rounded-lg hover:bg-[#B0829A] hover:text-white transition"
        >
          Dashboard
        </Link>

        <Link
          to="/products"
          className="text-lg font-semibold px-4 py-3 rounded-lg hover:bg-[#B0829A] hover:text-white transition"
        >
          Products
        </Link>

        <Link
          to="/orders"
          className="text-lg font-semibold px-4 py-3 rounded-lg hover:bg-[#B0829A] hover:text-white transition"
        >
          Orders
        </Link>

        <Link
          to="/reports"
          className="text-lg font-semibold px-4 py-3 rounded-lg hover:bg-[#B0829A] hover:text-white transition"
        >
          Reports
        </Link>

      </div>

    </div>
  )
}

export default LeftComponent