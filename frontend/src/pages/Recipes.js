import React, { useContext, useEffect, useState } from 'react';
import { IngredientsContext } from '../context/IngredientsContext';
import { Link } from 'react-router-dom';

const Recipes = () => {
  const { savedIngredients } = useContext(IngredientsContext);
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [calorieMax, setCalorieMax] = useState(1000);
  const [carbMax, setCarbMax] = useState(100);
  const [fatMax, setFatMax] = useState(50);
  const [proteinMax, setProteinMax] = useState(50);

  // Add states for the dietary filters
  const [vegan, setVegan] = useState(false);
  const [vegetarian, setVegetarian] = useState(false);
  const [glutenFree, setGlutenFree] = useState(false);
  const [dairyFree, setDairyFree] = useState(false);

  const API_KEY = 'fd241b80e4a64e83bc1336dc1532be46'; // Replace with your actual API key

  useEffect(() => {
    const fetchRecipes = async () => {
      if (savedIngredients.length === 0) return; // Don't fetch if there are no saved ingredients

      try {
        // Step 1: Fetch recipes by ingredients with nutritional information
        const response = await fetch(
          `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${savedIngredients.join(',')}&number=20`
        );
        const data = await response.json();
        
        // Log the data to inspect its structure
        console.log("Fetched data:", data);

        // Ensure data is an array before proceeding
        if (Array.isArray(data)) {
          // Step 2: Fetch detailed information (including nutritional info) for each recipe
          const recipeDetails = await Promise.all(
            data.map(async recipe => {
              // Updated request to include nutrition details
              const recipeInfoResponse = await fetch(
                `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${API_KEY}&includeNutrition=true`
              );
              const recipeInfo = await recipeInfoResponse.json();
              console.log("Recipe Info:", recipeInfo);             

              return {
                ...recipe,
                // Include nutritional information if available
                calories: recipeInfo.nutrition?.nutrients.find(nutrient => nutrient.name === 'Calories')?.amount || 'N/A',
                carbs: recipeInfo.nutrition?.nutrients.find(nutrient => nutrient.name === 'Carbohydrates')?.amount || 'N/A',
                fat: recipeInfo.nutrition?.nutrients.find(nutrient => nutrient.name === 'Fat')?.amount || 'N/A',
                protein: recipeInfo.nutrition?.nutrients.find(nutrient => nutrient.name === 'Protein')?.amount || 'N/A',
                diets: recipeInfo.diets, // Add the diets information to each recipe
              };
            })
          );

          console.log('Fetched recipes with nutritional info:', recipeDetails);
          setRecipes(recipeDetails);
          setFilteredRecipes(recipeDetails); // Initialize filtered recipes with all fetched recipes
        } else {
          console.error("API response is not an array:", data);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [savedIngredients, API_KEY]);

  // Apply filters to the fetched recipes
  useEffect(() => {
    const applyFilters = () => {
      const filtered = recipes.filter(recipe => {
        const matchesVegan = vegan ? recipe.diets.includes('vegan') : true;
        const matchesVegetarian = vegetarian ? recipe.diets.includes('lacto ovo vegetarian') : true;
        const matchesGlutenFree = glutenFree ? recipe.diets.includes('gluten free') : true;
        const matchesDairyFree = dairyFree ? recipe.diets.includes('dairy free') : true;

        return (
          matchesVegan &&
          matchesVegetarian &&
          matchesGlutenFree &&
          matchesDairyFree &&
          recipe.calories <= calorieMax &&
          recipe.carbs <= carbMax &&
          recipe.fat <= fatMax &&
          recipe.protein <= proteinMax
        );
      });
      setFilteredRecipes(filtered);
    };

    applyFilters();
  }, [calorieMax, carbMax, fatMax, proteinMax, recipes, vegan, vegetarian, glutenFree, dairyFree]);

  return (
    <div className="recipes-container" style={{ display: 'flex' }}>
      <div className="recipes-list" style={{ flex: '3' }}>
        <h2>Recipes</h2>
        {filteredRecipes.length > 0 ? (
          <div className="recipes-list">
            {filteredRecipes.map(recipe => (
              <div key={recipe.id} className="recipe-item">
                <Link to={`/recipes/${recipe.id}`} className='recipe-link'>
                  <h3>{recipe.title}</h3>
                  <img src={recipe.image} alt={recipe.title} />
                  <p>Calories: {recipe.calories || 'N/A'}</p>
                  <p>Carbs: {recipe.carbs || 'N/A'}</p>
                  <p>Fat: {recipe.fat || 'N/A'}</p>
                  <p>Protein: {recipe.protein || 'N/A'}</p>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>No recipes found. Try adjusting your filters.</p>
        )}
      </div>

      {/* Filters Section */}
      <div className="filters" style={{ flex: '1', padding: '20px', borderLeft: '1px solid #ccc' }}>
        <h3>Filters</h3>
        
        {/* Nutritional Filters */}
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

        {/* Dietary Filters */}
        <div className="diet-filters" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <label>Vegan</label>
            <input
              type="checkbox"
              checked={vegan}
              onChange={() => setVegan(prev => !prev)}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <label>Vegetarian</label>
            <input
              type="checkbox"
              checked={vegetarian}
              onChange={() => setVegetarian(prev => !prev)}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <label>Gluten Free</label>
            <input
              type="checkbox"
              checked={glutenFree}
              onChange={() => setGlutenFree(prev => !prev)}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <label>Dairy Free</label>
            <input
              type="checkbox"
              checked={dairyFree}
              onChange={() => setDairyFree(prev => !prev)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
