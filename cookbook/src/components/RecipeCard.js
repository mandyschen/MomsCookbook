import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
    return (
        <div>
            <h2>{recipe.id}. {recipe.title}</h2>
            <img src={`${process.env.PUBLIC_URL}/${recipe.folder}/${recipe.image_path[0]}`} alt={`${recipe.id} image.`} className='recipe-card-img'/>
            <p>{recipe.description}</p>
            <Link to={`/recipe/${recipe.id}`} className="button-link">
                View Recipe
            </Link>
        </div>
    );
}

export default RecipeCard;
