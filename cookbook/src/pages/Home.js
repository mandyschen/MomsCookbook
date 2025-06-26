import React from 'react';
import recipes from '../data/recipes.json';
import RecipeCard from '../components/RecipeCard';

function Home() {
    return (
        <div>
            <div className="home-header">
                <img 
                    src={`${process.env.PUBLIC_URL}/images/full_icon.png`} 
                    alt="Mom's Cookbook" 
                    className="home-logo"
                />
                <h1>Mom's Cookbook</h1>
                <p>Discover delicious family recipes passed down through generations</p>
            </div>
            <div className="recipes-grid">
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </div>
    );
}

export default Home;
