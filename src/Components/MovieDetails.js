import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=db95773a7fb212ba790d71f6adac0e7e`)
            .then(response => response.json())
            .then(data => setMovie(data));
    }, [id]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className="movie-details-page">
            <div 
                className="movie-details-banner" 
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` }}
            >
                <button className="back-button" onClick={() => navigate(-1)}>
                    Back
                </button>
                <div className="movie-details-content">
                    <img 
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                        alt={movie.title} 
                        className="movie-details-poster" 
                    />
                    <div className="movie-details-info">
                        <h1>{movie.title}</h1>
                        <p><strong>Release Date:</strong> {movie.release_date}</p>
                        <p><strong>Rating:</strong> {movie.vote_average.toFixed(1)} ({movie.vote_count} votes)</p>
                        <p><strong>Runtime:</strong> {movie.runtime} mins</p>
                        <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
                        <p><strong>Synopsis:</strong> {movie.overview}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
