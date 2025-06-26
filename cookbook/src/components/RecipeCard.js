import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
    return (
        <div className="recipe-card">
            <div className="recipe-card-header">
                <h2 className="recipe-card-title">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span className="recipe-number">{recipe.id}</span>
                        <div>
                            <div>{recipe.title}</div>
                            {recipe.subtitle && <div className="recipe-subtitle">{recipe.subtitle}</div>}
                        </div>
                    </div>
                </h2>
            </div>
            <img 
                src={`${process.env.PUBLIC_URL}/${recipe.folder}/${recipe.image_path[0]}`} 
                alt={`${recipe.title}`} 
                className='recipe-card-img'
            />
            <div className="recipe-card-content">
                <p className="recipe-card-description">{recipe.description}</p>
                <div className="recipe-card-actions">
                    <Link to={`/MomsCookbook/recipe/${recipe.id}`} className="button-link">
                        <i className="fas fa-utensils"></i>
                        <span>View Recipe</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default RecipeCard;
