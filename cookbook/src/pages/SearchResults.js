import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
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
            <div className="search-results-header">
                <h1>Search Results</h1>
                {query && (
                    <p className="search-results-count">
                        Found {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} for "{query}"
                    </p>
                )}
            </div>
            
            {filteredRecipes.length > 0 ? (
                <div className="recipes-grid">
                    {filteredRecipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            ) : (
                <div className="no-results">
                    <h2>No recipes found</h2>
                    <p>We couldn't find any recipes matching "{query}".</p>
                    <p>Try searching with different keywords or browse all recipes.</p>
                    <Link to="/MomsCookbook" className="button-link">
                        <i className="fas fa-home"></i>
                        <span>Browse All Recipes</span>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default SearchResults;
