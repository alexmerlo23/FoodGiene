import React, { useState, useEffect, useContext } from 'react';
import '../index.css'; // Import your CSS file for styling
import { FaTrash } from 'react-icons/fa'; // Import the trash icon
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { IngredientsContext } from '../context/IngredientsContext';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const { savedIngredients, setSavedIngredients } = useContext(IngredientsContext);

  // Hardcoded common ingredients for each category
  const [categoryIngredients] = useState({
    common: [
      'Salt', 'Pepper', 'Garlic', 'Onion', 'Olive Oil',
      'Butter', 'Sugar', 'Flour', 'Eggs', 'Baking Powder'
    ],
    vegetables: [
      'Tomato', 'Broccoli', 'Carrot', 'Green Beans', 'Spinach',
      'Lettuce', 'Cucumber', 'Bell Pepper', 'Zucchini', 'Asparagus'
    ],
    meat: [
      'Chicken Breast', 'Ground Beef', 'Pork Chop', 'Bacon',
      'Turkey', 'Lamb', 'Sausage', 'Ham', 'Steak', 'Salmon'
    ],
    dairy: [
      'Milk', 'Cheese', 'Yogurt', 'Butter', 'Cream',
      'Sour Cream', 'Cottage Cheese', 'Feta', 'Mozzarella', 'Parmesan'
    ],
    grains: [
      'Rice', 'Pasta', 'Oats', 'Bread', 'Quinoa',
      'Barley', 'Couscous', 'Cornmeal', 'Tortilla', 'Cereal'
    ],
  });

  const API_KEY = 'c4fc55292607408b9662788eb7a8e921'; // Replace with your actual API key

  // Fetch ingredients as the user types (live search)
  useEffect(() => {
    const fetchIngredients = async () => {
      if (searchTerm.trim()) {
        try {
          const response = await fetch(
            `https://api.spoonacular.com/food/ingredients/search?apiKey=${API_KEY}&query=${searchTerm}`
          );
          const data = await response.json();
          setIngredients(data.results || []);
        } catch (error) {
          console.error('Error fetching ingredients:', error);
        }
      } else {
        setIngredients([]);
      }
    };

    fetchIngredients();
  }, [searchTerm, API_KEY]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const addIngredient = (ingredient) => {
    if (!savedIngredients.includes(ingredient)) {
      // Log the ingredient to the console when added
      console.log(`Added ingredient: ${ingredient}`);
      
      setSavedIngredients((prev) => {
        const updatedIngredients = [...prev, ingredient];
        console.log('Current ingredients: ',updatedIngredients);
        return updatedIngredients;
      });
    }
  };

  const removeIngredient = (ingredientToRemove) => {
    setSavedIngredients((prev) =>
      prev.filter((ingredient) => ingredient !== ingredientToRemove)
    );
  };

  return (
    <div className="home-container">
      <div className="left-container">
         {/* Ingredient categories */}
         {Object.entries(categoryIngredients).map(([category, items]) => (
          <div className="box" key={category}>
            <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
            <div className="ingredient-box">
              {items.map((ingredient, index) => (
                <div
                  key={index}
                  className="ingredient-item left-ingredient"
                  onClick={() => addIngredient(ingredient)}
                >
                  {ingredient}
                </div>
              ))}
            </div>
          </div>
         ))}
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for ingredients..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <div className="ingredients-list">
          {ingredients.length > 0 ? (
            ingredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className="ingredient-item"
                onClick={() => addIngredient(ingredient.name)}
              >
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
              {ingredient}
              <FaTrash
                className="trash-icon"
                onClick={() => removeIngredient(ingredient)}
              />
            </div>
          ))}
        </div>
        <Link
          to={{
            pathname: '/recipes',
            state: { savedIngredients },
          }}
          className="view-recipes-button"
        >
          View Recipes
        </Link>
      </div>
    </div>
  );
};

export default Home;
