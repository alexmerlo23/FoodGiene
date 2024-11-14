import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Item = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const API_KEY = '6c0b0bb76f3d4fd497c6ca575ffd382b';

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=true`
        );
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchRecipeDetails();
  }, [id, API_KEY]);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div className="recipe-details">
      <h2>{recipe.title}</h2>
      <div className="recipe-content">
        <div className="recipe-content-top">
          <div className="nutrition-info">
            <p><strong>Calories:</strong> {recipe.nutrition.nutrients.find(n => n.name === 'Calories')?.amount || 'N/A'}</p>
            <p><strong>Carbs:</strong> {recipe.nutrition.nutrients.find(n => n.name === 'Carbohydrates')?.amount || 'N/A'}</p>
            <p><strong>Fat:</strong> {recipe.nutrition.nutrients.find(n => n.name === 'Fat')?.amount || 'N/A'}</p>
            <p><strong>Protein:</strong> {recipe.nutrition.nutrients.find(n => n.name === 'Protein')?.amount || 'N/A'}</p>
          </div>
          <div className="image-container">
            <img src={recipe.image} alt={recipe.title} className="recipe-image" />
          </div>
        </div>
      </div>

      <div className="recipe-summary">
        <p dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
      </div>

      <div className="recipe-instructions">
        <h3>Instructions</h3>
        <ul>
          {recipe.analyzedInstructions[0]?.steps.map((step, index) => (
            <li key={index}>
              <strong>{index + 1}. </strong>
              {step.step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Item;
