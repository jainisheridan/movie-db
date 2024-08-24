import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const MovieCarousel = ({ movies }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    if (!movies || movies.length === 0) {
        return null;
    }

    return (
        <Slider {...settings}>
            {movies.map((movie, index) => (
                <div key={index} className="carousel-slide">
                    <img 
                        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} 
                        alt={movie.title} 
                        className="carousel-image"
                    />
                    <div className="carousel-caption">
                        <h2>{movie.title}</h2>
                        <p>{movie.release_date} &bull; {movie.vote_average.toFixed(1)} <span>&#9733;</span></p>
                        <p>{movie.overview}</p>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", right: "10px" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", left: "10px" }}
            onClick={onClick}
        />
    );
}

export default MovieCarousel;
