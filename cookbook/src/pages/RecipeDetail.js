import React from 'react';
import { useParams } from 'react-router-dom';
import recipes from '../data/recipes.json';

function RecipeDetail() {
    const { id } = useParams();
    const recipe = recipes.find((r) => r.id === id);

    if (!recipe) {
        return <div>Recipe not found.</div>;
    }

    return (
        <div>
            <h1>{recipe.title}</h1>
            <img src={`${process.env.PUBLIC_URL}/${recipe.image_path}`} alt={`${recipe.id} image.`} className='recipe-detail-img'/>
            <h3>Ingredients</h3>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h3>Instructions</h3>
            <p>{recipe.instructions}</p>
        </div>
    );
}

export default RecipeDetail;
