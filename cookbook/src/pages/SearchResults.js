import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import recipesData from '../data/recipes.json';

function SearchResults() {
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');

    useEffect(() => {
        if (query) {
            const results = recipesData.filter((recipe) =>
                recipe.title.toLowerCase().includes(query.toLowerCase()) ||
                recipe.description.toLowerCase().includes(query.toLowerCase()) ||
                recipe.id.includes(query)
            );
            setFilteredRecipes(results);
        } else {
            setFilteredRecipes([]);
        }
    }, [query]);    

    return (
        <div>
            <h1>Search Results</h1>
            {filteredRecipes.length > 0 ? (
                <div className="recipe-list">
                    {filteredRecipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            ) : (
                <p>No recipes found for "{query}".</p>
            )}
        </div>
    );
}

export default SearchResults;
