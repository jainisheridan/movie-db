import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Components/Main'; 
import MovieDetails from './Components/MovieDetails';
import MovieCarousel from './Components/MovieCarousel'; 
import './Components/style.css'; 

function App() {
    return (
        <Router>
            <Routes>
                <Route 
                    path="/" 
                    element={
                        <>
                            <MovieCarousel />
                            <Main />
                        </>
                    } 
                />
                <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
