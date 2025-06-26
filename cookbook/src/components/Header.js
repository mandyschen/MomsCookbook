import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        navigate(`/MomsCookbook/search?query=${searchQuery}`);
    };

    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/MomsCookbook" className='button-link'>
                            <i className="fas fa-home"></i>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <form onSubmit={handleSearchSubmit} className="search-form">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search recipes..."
                                className="search-input"
                            />
                            <button type="submit" className="search-button">
                                <i className="fas fa-search"></i>
                                <span>Search</span>
                            </button>
                        </form>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
