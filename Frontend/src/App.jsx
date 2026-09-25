import Footer from "./components/Footer"
import LeftComponent from "./components/LeftComponent"
import Navbar from "./components/Navbar"
import Dashboard from "./pages/Dashboard"
import { Routes, Route } from "react-router-dom"
import Reports from "./pages/Reports"
import Orders from "./pages/Orders"
import Products from "./pages/Products"

const App = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">

      <Navbar />

      <div className="flex flex-1 min-h-0">

        <div className="h-full w-64">
          <LeftComponent />
        </div>

        <div className="flex-1 min-w-0 overflow-y-auto">

          <Routes>

            <Route path="/" element={<Dashboard />} />

            <Route path="/products" element={<Products />} />

            <Route path="/orders" element={<Orders />} />

            <Route path="/reports" element={<Reports />} />

          </Routes>

        </div>

      </div>

      <Footer />

    </div>
  )
}

export default App