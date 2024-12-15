import React from 'react';
import recipes from '../data/recipes.json';
import RecipeCard from '../components/RecipeCard';

function Home() {
    return (
        <div>
            <img 
                src={`${process.env.PUBLIC_URL}/images/full_icon.png`} 
                alt="Full icon image." 
                style={{
                    width: '500px',
                    height: 'auto',
                    margin: '0 auto',
                    display: 'block'
                }} 
            />
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
}

export default Home;
