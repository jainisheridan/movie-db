import React, { useState } from 'react';
import './style.css'; 

const Header = ({ getData, setUrl, searchMovie, search, setSearch }) => {
    const [menuOpen, setMenuOpen] = useState(false); 

    let arr = ["Popular", "Theatre", "Kids", "Drama", "Comedie"];

    return (
        <div className="header">
            <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </div>
            <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
                <ul>
                    {arr.map((value, pos) => (
                        <li key={pos}>
                            <button onClick={() => getData(value)} className="link-button">
                                {value}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button onClick={() => setUrl('favorites')} className="link-button">
                            Favorites
                        </button>
                    </li>
                </ul>
                <form onSubmit={searchMovie}>
                    <div className="search-btn">
                        <input
                            type="text"
                            placeholder="Enter Movie Name"
                            className="inputText"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                        <button type="submit">Search</button>
                    </div>
                </form>
            </nav>
        </div>
    );
};

export default Header;
