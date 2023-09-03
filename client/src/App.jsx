import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context";
import HomeLayout from "./layouts/homelayout";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import NotFound from "./components/notfound";
import Dashboard from "./pages/dashboard";

const App = () => {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/" index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </GlobalProvider>
  );
};

export default App;
