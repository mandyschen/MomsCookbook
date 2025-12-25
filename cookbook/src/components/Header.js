import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMuted, setIsMuted] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false); // hamburger state
  const audioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.8;
      audioRef.current.muted = true;
    }
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.muted = false;
      audio.play().catch(() => {});
    } else {
      audio.muted = true;
    }

    setIsMuted(!isMuted);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/MomsCookbook/search?query=${searchQuery}`);
    setMenuOpen(false); // close menu on submit
  };

  return (
    <header>
      <audio ref={audioRef} loop preload="auto">
        <source src={`${process.env.PUBLIC_URL}/audio/family_music.m4a`} type="audio/mp4" />
      </audio>

      <nav className="navbar">
        <button className="hamburger" onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
        </button>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li>
            <Link to="/MomsCookbook" className="button-link" onClick={() => setMenuOpen(false)}>
              <i className="fas fa-home"></i> <span>Home</span>
            </Link>
          </li>

          <li>
            <Link to="/MomsCookbook/about" className="button-link" onClick={() => setMenuOpen(false)}>
              <i className="fas fa-user"></i> <span>About</span>
            </Link>
          </li>

          <li>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfJ3PFmnDGd8_djUOu_DUrGOyhcx5vpr93eUsRU2EwX2PC3og/viewform?usp=sharing&ouid=106306536704742609739"
              target="_blank"
              rel="noopener noreferrer"
              className="button-link"
              onClick={() => setMenuOpen(false)}
            >
              <i className="fas fa-edit"></i> <span>Submit or Request a Recipe</span>
            </a>
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
                <i className="fas fa-search"></i> <span>Search</span>
              </button>
            </form>
          </li>

          <li>
            <button onClick={toggleMute} className="button-link">
              <i className={`fas ${isMuted ? 'fa-volume-mute' : 'fa-volume-up'}`}></i>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
