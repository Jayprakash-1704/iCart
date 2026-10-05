import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Deals from './Pages/Deals'
import CategoryMenu from './Pages/Categories'
import Shop from './Pages/Shop'
import Contact from './Pages/ContactUs'
import ShippingInformation from './Pages/ShippingInfo'
import ReturnRefund from './Pages/Return&Refund'
import TrackOrder from './Pages/TrackOrders'
import Login from './Pages/Login'
import PrivacyPolicy from './Pages/PrivacyPolicy'
import TermsOfService from './Pages/Terms&Service'
import FAQs from './Pages/FAQs'
import Register from './Pages/Register'
import ProductDetails from './Pages/ProductDetails'
import Cart from './Pages/Cart'

function App() {



  return (
  <Router>
    <Navbar/>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/privacy" element={<PrivacyPolicy/>}/>
        <Route path="/terms" element={<TermsOfService/>}/>
        <Route path="/faq" element={<FAQs/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/shipping" element={<ShippingInformation/>}/>
        <Route path="/returns" element={<ReturnRefund/>}/>
        <Route path="/orders" element={<TrackOrder/>}/>

           // internal //

        <Route path="/deals" element={<Deals/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/shop/:category" element={<Shop />} />
        <Route path="/shop/:category/:subCategory" element={<Shop />} />
        <Route path="/shop/product/:productId" element={<ProductDetails/>}/>

        <Route path="/categories" element={<CategoryMenu/>}/>
    </Routes>
    <Footer/>
  </Router>
  )
}

export default App
