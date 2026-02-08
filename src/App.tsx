import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Error from "./Pages/Error/Error";
import Footer from "./Components/Footer/Footer";
import { Toaster } from "./Components/ui/sonner";
import Payments from "./Pages/Payment/Payments";
import Login from "./pages/Dashboard/Login";
import Dashboard from "./pages/Dashboard/Dashboard";

const AppRoutes = () => {
  const location = useLocation();
  const hideNavbar = ["/transaction", "/pay", "/login", "/dashboard"];
  const shouldHide = hideNavbar.some((path) => location.pathname.startsWith(path));
  const isAuthenticated = true; // Dummy auth flag

  return (
    <main className="max-container">
      {!shouldHide && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="pay/:id" element={<Payments />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
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
