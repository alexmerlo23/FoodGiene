import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Recipes from "./pages/Recipes";
import Item from "./pages/Item";
import { IngredientsProvider } from "./context/IngredientsContext";
import LandingPage from "./pages/LandingPage"; 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <IngredientsProvider>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/recipes/:id" element={<Item />} />
            </Routes>
          </div>
        </IngredientsProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
