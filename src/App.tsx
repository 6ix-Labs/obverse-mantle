import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Error from "./Pages/Error/Error";
import Footer from "./Components/Footer/Footer";
import { Toaster } from "./Components/ui/sonner";
import Payments from "./Pages/Payment/Payments";
import Login from "./Pages/Dashboard/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import OverviewPage from "./Pages/Dashboard/OverviewPage";
import Invoices from "./Pages/Dashboard/Invoices";
import PaymentLinks from "./Pages/Dashboard/PaymentLinks";
import Settings from "./Pages/Dashboard/Settings";
import ReceiptPage from "./Pages/Receipt/Receipt";
import Cookies from "js-cookie";

const AppRoutes = () => {
  const location = useLocation();
  const hideNavbar = ["/transaction", "/pay", "/receipt", "/reciept", "/login", "/dashboard"];
  const shouldHide = hideNavbar.some((path) => location.pathname.startsWith(path));
  const isAuthenticated = !!Cookies.get("accessToken");

  return (
    <main className="max-container">
      {!shouldHide && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="pay/:id" element={<Payments />} />
        <Route path="receipt/:paymentId" element={<ReceiptPage />} />
        <Route path="reciept/:paymentId" element={<ReceiptPage />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}>
          <Route index element={<OverviewPage />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="payment-links" element={<PaymentLinks />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Error />} />
        {/* <Route path="/" element={<Main />} />
        <Route path="transactions/:linkId" element={<Wallet />} />
        <Route path="pay/:id" element={<Payment />} /> */}
      </Routes>
      {/* Footer */}
      {!shouldHide && <Footer />}
    </main>
  );
};

const App = () => (
  <BrowserRouter>
    <AppRoutes />
    <Toaster />
  </BrowserRouter>
);

export default App;
