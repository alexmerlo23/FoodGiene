import React, { useState, useEffect } from 'react';
import '../index.css'; // Import your CSS file for styling
import { FaTrash } from 'react-icons/fa'; // Import the trash icon

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [savedIngredients, setSavedIngredients] = useState([]);
  const [categoryIngredients, setCategoryIngredients] = useState({
    common: [],
    vegetables: [],
    meat: [],
    dairy: [],
    grains: []
  });

  const API_KEY = '2fa9e870b0df4ed696f377868a757fa5'; // Replace with your actual API key

  // Fetch popular ingredients for each category
  useEffect(() => {
    const fetchIngredientsByCategory = async (query, category) => {
      try {
        const response = await fetch(`https://api.spoonacular.com/food/ingredients/search?apiKey=${API_KEY}&query=${query}`);
        const data = await response.json();
        setCategoryIngredients((prev) => ({
          ...prev,
          [category]: data.results.slice(0, 10) // Keep the top 10 results for scrolling
        }));
      } catch (error) {
        console.error(`Error fetching ${category} ingredients:`, error);
      }
    };

    fetchIngredientsByCategory('common', 'common');
    fetchIngredientsByCategory('vegetable', 'vegetables');
    fetchIngredientsByCategory('meat', 'meat');
    fetchIngredientsByCategory('dairy', 'dairy');
    fetchIngredientsByCategory('grain', 'grains');
  }, [API_KEY]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      try {
        const response = await fetch(`https://api.spoonacular.com/food/ingredients/search?apiKey=${API_KEY}&query=${searchTerm}`);
        const data = await response.json();
        setIngredients(data.results || []);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    } else {
      setIngredients([]);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const addIngredient = (ingredient) => {
    setSavedIngredients((prev) => [...prev, ingredient]);
  };

  const removeIngredient = (ingredientToRemove) => {
    setSavedIngredients((prev) => 
      prev.filter((ingredient) => ingredient.name !== ingredientToRemove.name)
    );
  };

  return (
    <div className="home-container">
      <div className="left-container">
        <div className="box">
          <h4>Common Ingredients</h4>
        </div>
        <div className="box">
          <h4>Vegetables</h4>
          <div className="ingredient-box">
            {categoryIngredients.vegetables.map((ingredient) => (
              <div key={ingredient.id} className="ingredient-item left-ingredient" onClick={() => addIngredient(ingredient)}>
                {ingredient.name}
              </div>
            ))}
          </div>
        </div>
        <div className="box">
          <h4>Meat</h4>
          <div className="ingredient-box">
            {categoryIngredients.meat.map((ingredient) => (
              <div key={ingredient.id} className="ingredient-item left-ingredient" onClick={() => addIngredient(ingredient)}>
                {ingredient.name}
              </div>
            ))}
          </div>
        </div>
        <div className="box">
          <h4>Dairy</h4>
          <div className="ingredient-box">
            {categoryIngredients.dairy.map((ingredient) => (
              <div key={ingredient.id} className="ingredient-item left-ingredient" onClick={() => addIngredient(ingredient)}>
                {ingredient.name}
              </div>
            ))}
          </div>
        </div>
        <div className="box">
          <h4>Grains</h4>
          <div className="ingredient-box">
            {categoryIngredients.grains.map((ingredient) => (
              <div key={ingredient.id} className="ingredient-item left-ingredient" onClick={() => addIngredient(ingredient)}>
                {ingredient.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for ingredients..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button type="submit">Search</button>
        </form>
        <div className="ingredients-list">
          {ingredients.length > 0 ? (
            ingredients.map((ingredient) => (
              <div key={ingredient.id} className="ingredient-item" onClick={() => addIngredient(ingredient)}>
                {ingredient.name}
              </div>
            ))
          ) : (
            <p>No ingredients found.</p>
          )}
        </div>
      </div>
      <div className="right-container">
        <h3>Saved Ingredients</h3>
        <div className="saved-ingredients">
          {savedIngredients.map((ingredient, index) => (
            <div key={index} className="saved-ingredient-item">
              {ingredient.name}
              <FaTrash className="trash-icon" onClick={() => removeIngredient(ingredient)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
