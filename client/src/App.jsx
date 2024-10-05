import { Routes, Route } from "react-router-dom";

//pages
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Search from "./pages/search/Search";
import Alerts from "./pages/alerts/Alerts";
import Faqv from "./pages/faq-view/Faq-view";

//components
import Layout from "./ui/partials/layout/Layout";
import ProtectedRoute from "./data/hooks/protectedRoute";

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route
          path="alerts"
          element={
            <ProtectedRoute>
              <Alerts />
            </ProtectedRoute>
          }
        />
        <Route
          path="faq-view"
          element={
            <ProtectedRoute>
              <Faqv />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
