import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom"; 
import Card from "./Card";
import MovieCarousel from "./MovieCarousel"; 
import MovieDetails from "./MovieDetails"; 
import Header from "./Header";
import './style.css'; 

let API_key = "&api_key=279abc0632bd7ab7df4457fff4c4ab8d";
let base_url = "https://api.themoviedb.org/3";
let url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;

const Main = () => {
    const [movieData, setData] = useState([]);
    const [url_set, setUrl] = useState(url);
    const [search, setSearch] = useState("");
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetch(url_set)
            .then(res => res.json())
            .then(data => {
                const filteredData = data.results.filter(movie => movie.vote_average > 0);
                setData(filteredData);
            });
    }, [url_set]);

    const getData = (movieType) => {
        if (movieType === "Popular") {
            url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
        }
        if (movieType === "Theatre") {
            url = base_url + "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22" + API_key;
        }
        if (movieType === "Kids") {
            url = base_url + "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc" + API_key;
        }
        if (movieType === "Drama") {
            url = base_url + "/discover/movie?with_genres=18&primary_release_year=2014" + API_key;
        }
        if (movieType === "Comedie") {
            url = base_url + "/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc" + API_key;
        }
        setUrl(url);
    };

    const searchMovie = (evt) => {
        evt.preventDefault();
        if (search.trim()) {
            const searchUrl = base_url + "/search/movie?api_key=279abc0632bd7ab7df4457fff4c4ab8d&query=" + search;
            setUrl(searchUrl);
            setSearch("");
        }
    };

    const addFavorite = (movie) => {
        if (!favorites.some(fav => fav.id === movie.id)) {
            setFavorites([...favorites, movie]);
        }
    };

    const removeFavorite = (movie) => {
        setFavorites(favorites.filter(fav => fav.id !== movie.id));
    };

    return (
        <Routes>
            <Route path="/" element={
                <>
                    <Header 
                        getData={getData} 
                        setUrl={setUrl} 
                        searchMovie={searchMovie} 
                        search={search} 
                        setSearch={setSearch} 
                    />

                    {url_set !== 'favorites' && <MovieCarousel movies={movieData.slice(0, 5)} />} 

                    {url_set === 'favorites' ? (
                        <div className="container">
                            {favorites.length === 0 ? (
                                <p className="notfound">No Favorites Found</p>
                            ) : (
                                favorites.map((res, pos) => (
                                    <Card
                                        info={res}
                                        key={pos}
                                        addFavorite={() => addFavorite(res)}
                                        removeFavorite={() => removeFavorite(res)}
                                        isFavorite={true}
                                    />
                                ))
                            )}
                        </div>
                    ) : (
                        <div className="container">
                            {movieData.length === 0 ? (
                                <p className="notfound">Not Found</p>
                            ) : (
                                movieData.map((res, pos) => (
                                    <Card
                                        info={res}
                                        key={pos}
                                        addFavorite={() => addFavorite(res)}
                                        removeFavorite={() => removeFavorite(res)}
                                        isFavorite={favorites.some(fav => fav.id === res.id)}
                                    />
                                ))
                            )}
                        </div>
                    )}
                </>
            } />
            <Route path="/movie/:id" element={
                <MovieDetails 
                    favorites={favorites} 
                    addFavorite={addFavorite} 
                    removeFavorite={removeFavorite} 
                />
            } />
        </Routes>
    );
};

export default Main;
