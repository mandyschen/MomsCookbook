import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
        return (
            <div className="no-results">
                <h2>Recipe not found</h2>
                <p>The recipe you're looking for doesn't exist.</p>
                <Link to="/MomsCookbook" className="button-link">
                    <i className="fas fa-home"></i>
                    <span>Back to Home</span>
                </Link>
            </div>
        );
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
        <div className="recipe-detail">
            <div className="recipe-detail-header">
                <h1 className="recipe-detail-title">
                    <div 
                        className="recipe-number"
                        style={{
                            textShadow: '0 0 white',
                        }}
                    >
                        {recipe.id}
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div>{recipe.title}</div>
                            {recipe.subtitle && <div className="recipe-subtitle">{recipe.subtitle}</div>}
                        </div>
                    </div>
                </h1>
                <p>{recipe.description}</p>
            </div>

            <div className="recipe-detail-content">
                {/* Image Carousel */}
                <div className="carousel-container">
                    <img
                        src={`${process.env.PUBLIC_URL}/${recipe.folder}/${recipe.image_path[currentImageIndex]}`}
                        alt={`${recipe.title} - Image ${currentImageIndex + 1}`}
                        className="recipe-detail-img"
                    />

                    {imageCount > 1 && (
                        <>
                            <button
                                onClick={handlePrev}
                                className='carousel-button prev'
                            >
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <button
                                onClick={handleNext}
                                className='carousel-button next'
                            >
                                <i className="fas fa-chevron-right"></i>
                            </button>

                            <div className="carousel-dots">
                                {recipe.image_path.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`carousel-dot ${currentImageIndex === index ? 'active' : ''}`}
                                    ></button>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Ingredients Section */}
                <div className="recipe-section">
                    <h3>
                        <i className="fas fa-list-ul"></i>
                        Ingredients
                    </h3>
                    <ul className="recipe-ingredients">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>

                {/* Instructions Section */}
                <div className="recipe-section">
                    <h3>
                        <i className="fas fa-tasks"></i>
                        Instructions
                    </h3>
                    <ol className="recipe-steps">
                        {recipe.instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ol>
                </div>

                {/* Notes Section */}
                <div className="recipe-section">
                    <h3>
                        <i className="fas fa-sticky-note"></i>
                        Notes
                    </h3>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        readOnly={!isEditing}
                        placeholder="Write your personal notes about this recipe..."
                        rows="5"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            border: isEditing ? '2px solid #667eea' : '1px solid #e5e7eb',
                            borderRadius: '12px',
                            backgroundColor: isEditing ? 'white' : '#f9fafb',
                            cursor: isEditing ? 'text' : 'not-allowed',
                            fontFamily: 'inherit',
                            fontSize: 'inherit',
                            resize: 'vertical',
                            transition: 'all 0.3s ease'
                        }}
                    />
                    <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <button className='button-link' onClick={toggleEdit}>
                            <i className={`fas fa-${isEditing ? 'save' : 'edit'}`}></i>
                            <span>{isEditing ? 'Save Note' : 'Edit Note'}</span>
                        </button>
                        {isEditing && (
                            <button className='button-link' onClick={handleClearNote} style={{ background: '#ef4444' }}>
                                <i className="fas fa-trash"></i>
                                <span>Clear Note</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Back to Home */}
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <Link to="/MomsCookbook" className="button-link">
                        <i className="fas fa-arrow-left"></i>
                        <span>Back to All Recipes</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default RecipeDetail;
