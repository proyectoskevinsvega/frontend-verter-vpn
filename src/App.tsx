import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import HelpCenter from "./pages/HelpCenter";
import Docs from "./pages/Docs";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Downloads from "./pages/Downloads";
import ScrollToHash from "./components/layout/ScrollToHash";
import { Toaster } from "sonner";

function App() {
  return (
    <Router>
      <ScrollToHash />
      <Toaster position="top-right" richColors closeButton />
      <Routes>
        <Route 
          path="/" 
          element={
            <MainLayout>
              <Landing />
            </MainLayout>
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route 
          path="/blog" 
          element={
            <MainLayout>
              <Blog />
            </MainLayout>
          } 
        />
        <Route 
          path="/careers" 
          element={
            <MainLayout>
              <Careers />
            </MainLayout>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <MainLayout>
              <Contact />
            </MainLayout>
          } 
        />
        <Route 
          path="/help" 
          element={
            <MainLayout>
              <HelpCenter />
            </MainLayout>
          } 
        />
        <Route 
          path="/docs" 
          element={
            <MainLayout>
              <Docs />
            </MainLayout>
          } 
        />
        <Route 
          path="/privacy" 
          element={
            <MainLayout>
              <Privacy />
            </MainLayout>
          } 
        />
        <Route 
          path="/terms" 
          element={
            <MainLayout>
              <Terms />
            </MainLayout>
          } 
        />
        <Route 
          path="/downloads" 
          element={
            <MainLayout>
              <Downloads />
            </MainLayout>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
