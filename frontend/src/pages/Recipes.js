import React, { useContext, useEffect, useState } from 'react';
import { IngredientsContext } from '../context/IngredientsContext';

const Recipes = () => {
  /*const { savedIngredients } = useContext(IngredientsContext);*/
  const [recipes, setRecipes] = useState([]);
  const [calorieMax, setCalorieMax] = useState(500);
  const [carbMax, setCarbMax] = useState(50);
  const [fatMax, setFatMax] = useState(50);
  const [proteinMax, setProteinMax] = useState(50);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const API_KEY = 'd1906924bafb4d909b977e24cf855d32';

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/findByNutrients?apiKey=${API_KEY}&maxCarbs=${carbMax}&maxFat=${fatMax}&maxProtein=${proteinMax}&number=10`
        );
        const data = await response.json();
        console.log('Fetched recipes:', data); // Log fetched recipes
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [API_KEY, carbMax, fatMax, proteinMax]);

  // Filter recipes to include only those with images and within the specified calorie max
  const filteredRecipes = recipes.filter(recipe => {
    return (
      recipe.image && // Only include recipes with images
      recipe.calories <= calorieMax
    );
  });

  // Further filter based on dietary preferences
  const dietaryFilteredRecipes = filteredRecipes.filter(recipe => {
    if (isVegetarian && !recipe.vegetarian) return false;
    if (isVegan && !recipe.vegan) return false;
    if (isGlutenFree && !recipe.glutenFree) return false;
    return true;
  });

  return (
    <div className="recipes-container" style={{ display: 'flex' }}>
      <div className="recipes-list" style={{ flex: '3' }}>
        <h2>Recipes</h2>
        {dietaryFilteredRecipes.length > 0 ? (
          <div className="recipes-list">
            {dietaryFilteredRecipes.map(recipe => (
              <div key={recipe.id} className="recipe-item">
                <h3>{recipe.title}</h3>
                <img src={recipe.image} alt={recipe.title} />
                <p>Calories: {recipe.calories}</p>
                <p>Carbs: {recipe.carbs}</p>
                <p>Fat: {recipe.fat}</p>
                <p>Protein: {recipe.protein}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No recipes found. Try adjusting your filters.</p>
        )}
      </div>

      <div className="filters" style={{ flex: '1', padding: '20px', borderLeft: '1px solid #ccc' }}>
        <h3>Filters</h3>

        <div>
          <label>Max Calories: {calorieMax}</label>
          <input 
            type="range" 
            min="0" 
            max="1000" 
            value={calorieMax} 
            onChange={e => setCalorieMax(Number(e.target.value))} 
          />
        </div>

        <div>
          <label>Max Carbohydrates: {carbMax}</label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={carbMax} 
            onChange={e => setCarbMax(Number(e.target.value))} 
          />
        </div>

        <div>
          <label>Max Fat: {fatMax}</label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={fatMax} 
            onChange={e => setFatMax(Number(e.target.value))} 
          />
        </div>

        <div>
          <label>Max Protein: {proteinMax}</label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={proteinMax} 
            onChange={e => setProteinMax(Number(e.target.value))} 
          />
        </div>

        <div>
          <h4>Dietary Preferences</h4>
          <label>
            <input 
              type="checkbox" 
              checked={isVegetarian} 
              onChange={() => setIsVegetarian(!isVegetarian)} 
            /> Vegetarian
          </label>
          <br />
          <label>
            <input 
              type="checkbox" 
              checked={isVegan} 
              onChange={() => setIsVegan(!isVegan)} 
            /> Vegan
          </label>
          <br />
          <label>
            <input 
              type="checkbox" 
              checked={isGlutenFree} 
              onChange={() => setIsGlutenFree(!isGlutenFree)} 
            /> Gluten Free
          </label>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
