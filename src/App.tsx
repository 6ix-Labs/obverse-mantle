import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Error from "./Pages/Error/Error";
import Footer from "./Components/Footer/Footer";
import Wallet from "./Pages/Wallet/Wallet";
import Payment from "./Pages/Payment/Payment";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppRoutes = () => {
  const location = useLocation();
  const hideNavbar = ["/transaction", "/pay"];
  const shouldHide = hideNavbar.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <main className="max-container">
      {!shouldHide && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="transactions/:linkId" element={<Wallet />} />
        <Route path="pay/:id" element={<Payment />} />
        <Route path="*" element={<Error />} />
      </Routes>
      {/* Footer */}
      {!shouldHide && <Footer />}
    </main>
  );
};

const App = () => (
  <BrowserRouter>
    <AppRoutes />
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </BrowserRouter>
);

export default App;
