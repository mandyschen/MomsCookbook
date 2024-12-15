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
        navigate(`/search?query=${searchQuery}`);
    };

    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/" className='button-link' style={{ padding: '0px 3px' }}><i className="fas fa-home"></i></Link></li>
                    <li>
                        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search recipes..."
                                style={{
                                    padding: '5px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    marginRight: '10px'
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
