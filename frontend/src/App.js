import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Recipes from './pages/Recipes';
import { IngredientsProvider } from './context/IngredientsContext';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <IngredientsProvider>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipes" element={<Recipes />} />
            </Routes>
          </div>
        </IngredientsProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;