import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import recipes from '../data/recipes.json';

function RecipeDetail() {
    const { id } = useParams();
    const recipe = recipes.find((r) => r.id === id);

    const storageKey = `recipe-note-${id}`;
    const [note, setNote] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

    const imageCount = recipe.image_path.length;

    const handleNext = () => {
        setCurrentImageIndex((currentImageIndex + 1) % imageCount);
    };

    const handlePrev = () => {
        setCurrentImageIndex(
            (currentImageIndex - 1 + imageCount) % imageCount
        );
    };

    return (
        <div>
            <h1>{recipe.id}. {recipe.title}</h1>
            {/* <img 
                src={`${process.env.PUBLIC_URL}/${recipe.image_path[0]}`} 
                alt={`${recipe.id} depiction`} 
                className="recipe-detail-img" 
            /> */}
            <div className="carousel-container" style={{ position: 'relative', textAlign: 'center' }}>
                <img
                    src={`${process.env.PUBLIC_URL}/${recipe.folder}/${recipe.image_path[currentImageIndex]}`}
                    alt={`${recipe.id} depiction ${currentImageIndex + 1}`}
                    className="recipe-detail-img"
                    style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', borderRadius: '10px' }}
                />

                <button
                    onClick={handlePrev}
                    className='carousel-button'
                    style={{
                        left: '1em'
                    }}
                >
                    ◀
                </button>
                <button
                    onClick={handleNext}
                    className='carousel-button'
                    style={{
                        right: '1em'
                    }}
                >
                    ▶
                </button>

                <div style={{ marginTop: '10px' }}>
                    {recipe.image_path.map((_, index) => (
                        <span
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`carousel-dot ${currentImageIndex === index ? 'active' : ''}`}
                        ></span>
                    ))}
                </div>
            </div>
            <h3>Ingredients</h3>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h3>Instructions</h3>
            <ol>
                {recipe.instructions.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ol>

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
