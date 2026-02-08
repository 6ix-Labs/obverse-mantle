import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Error from "./pages/Error/Error";
import Footer from "./components/Footer/Footer";
import { Toaster } from "./components/ui/sonner";
import Payments from "./pages/Payment/Payments";

const AppRoutes = () => {
  const location = useLocation();
  const hideNavbar = ["/transaction", "/pay"];
  const shouldHide = hideNavbar.some((path) => location.pathname.startsWith(path));

  return (
    <main className="max-container">
      {!shouldHide && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="pay/:id" element={<Payments />} />
        <Route path="about" element={<About />} />
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
