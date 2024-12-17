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
                    <li><Link to="/MomsCookbook" className='button-link' style={{ padding: '0rem 0.5rem' }}><i className="fas fa-home"></i></Link></li>
                    <li>
                        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search recipes"
                                style={{
                                    padding: '0.3rem',
                                    border: '0.1rem solid #ccc',
                                    borderRadius: '0.4rem',
                                    marginRight: '0.1rem'
                                }}
                            />
                            <button type="submit" className="button-link">
                                <strong>Go!</strong>
                            </button>
                        </form>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
