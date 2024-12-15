import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import recipes from '../data/recipes.json';

function RecipeDetail() {
    const { id } = useParams();
    const recipe = recipes.find((r) => r.id === id);

    const storageKey = `recipe-note-${id}`;
    const [note, setNote] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const savedNote = localStorage.getItem(storageKey);
        if (savedNote) {
            setNote(savedNote);
        }
    }, [storageKey]);

    const handleSaveNote = () => {
        localStorage.setItem(storageKey, note);
        setIsEditing(false);
    };

    const toggleEdit = () => {
        if (isEditing) {
            handleSaveNote();
        } else {
            setIsEditing(true);
        }
    };

    const handleClearNote = () => {
        setNote('');
        localStorage.removeItem(storageKey);
    };

    if (!recipe) {
        return <div>Recipe not found.</div>;
    }

    return (
        <div>
            <h1>{recipe.id}. {recipe.title}</h1>
            <img 
                src={`${process.env.PUBLIC_URL}/${recipe.image_path}`} 
                alt={`${recipe.id} depiction`} 
                className="recipe-detail-img" 
            />
            <h3>Ingredients</h3>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h3>Instructions</h3>
            <p>{recipe.instructions}</p>

            <h3>Notes</h3>
            <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                readOnly={!isEditing}
                placeholder="Write your note here"
                rows="5"
                cols="50"
                style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '0.2rem solid lightgray',
                    borderRadius: '0.4rem',
                    backgroundColor: isEditing ? 'white' : 'lightgray',
                    cursor: isEditing ? 'text' : 'not-allowed',
                    fontFamily: 'inherit',
                    fontsize: 'inherit',
                }}
            />
            <button className='button-link' onClick={toggleEdit}>
                {isEditing ? 'Save' : 'Edit'}
            </button>
            {isEditing && (<button className='button-link' onClick={handleClearNote}>
                Clear
            </button>)}
        </div>
    );
}

export default RecipeDetail;
