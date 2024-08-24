import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'; 
const Card = ({ info, addFavorite, removeFavorite, isFavorite }) => {

    const overview = info.overview.length > 150 ? `${info.overview.substring(0, 150)}...` : info.overview;

    return (
        <div className="movie">
            <Link to={`/movie/${info.id}`} className="movie-link">
                <img src={`https://image.tmdb.org/t/p/w500/${info.poster_path}`} alt={info.title} className="poster" />
                <div className="movie-details">
                    <h2 className="title">{info.title}</h2>
                    <p className="release-date">Release Date: {info.release_date}</p>
                    <p className="rating">Rating: {info.vote_average.toFixed(1)}</p>
                    <p className="overview">{overview}</p>
                </div>
            </Link>
            <div className="favorite-btn-container">
                {isFavorite ? (
                    <button onClick={(e) => { e.preventDefault(); removeFavorite(info); }} className="favorite-btn remove">
                        Remove from Favorites
                    </button>
                ) : (
                    <button onClick={(e) => { e.preventDefault(); addFavorite(info); }} className="favorite-btn add">
                        Add to Favorites
                    </button>
                )}
            </div>
        </div>
    );
};

export default Card;
