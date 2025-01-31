import React, { useState, useEffect, useRef } from "react";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loadedCards, setLoadedCards] = useState({});
  const containerRefs = useRef({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/movie/")
      .then((res) => {
        const moviesData = res.data.moviesList.map((movie) => ({
          id: movie._id,
          poster: movie.poster,
          genre: movie.genre || "Other",
        }));
        setMovies(moviesData);

        // Initialize loaded cards with a default count per genre
        const initialLoadedCards = moviesData.reduce((acc, movie) => {
          if (!acc[movie.genre]) acc[movie.genre] = 4; // Load first 4 movies per genre
          return acc;
        }, {});
        setLoadedCards(initialLoadedCards);
      })
      .catch((err) => console.error("Error fetching movies:", err.message));
  }, []);

  // Group movies by genre
  const groupMoviesByGenre = (movies) => {
    return movies.reduce((grouped, movie) => {
      if (!grouped[movie.genre]) grouped[movie.genre] = [];
      grouped[movie.genre].push(movie);
      return grouped;
    }, {});
  };

  const groupedMovies = groupMoviesByGenre(movies);
  const sliderMovies = movies.slice(0, 4); // Get first 4 movies for the slider

  // Function to load more movies when scrolled to the end
  const loadMoreCards = (genre) => {
    setLoadedCards((prev) => ({
      ...prev,
      [genre]: prev[genre] + 3, // Load 3 more movies
    }));
  };

  // Handle infinite scroll for each genre
  useEffect(() => {
    const scrollListeners = {};

    Object.keys(groupedMovies).forEach((genre) => {
      const container = containerRefs.current[genre];

      if (container) {
        const handleScroll = () => {
          if (
            container.scrollLeft + container.clientWidth >=
            container.scrollWidth - 50 // 50px buffer
          ) {
            loadMoreCards(genre);
          }
        };

        // Store event listener reference for cleanup
        scrollListeners[genre] = handleScroll;
        container.addEventListener("scroll", handleScroll);
      }
    });

    return () => {
      // Cleanup scroll event listeners
      Object.keys(scrollListeners).forEach((genre) => {
        if (containerRefs.current[genre]) {
          containerRefs.current[genre].removeEventListener("scroll", scrollListeners[genre]);
        }
      });
    };
  }, [groupedMovies, loadedCards]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* 🎥 Movie Slider */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-2xl">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation={true}
            effect="fade"
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            className="mySwiper"
          >
            {sliderMovies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <div className="relative h-[250px] sm:h-[350px] md:h-[400px] lg:h-[450px]">
                  <img
                    src={movie.poster}
                    alt={`Movie poster for ${movie.id}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                  <div className="absolute bottom-8 left-8 text-white">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                      Featured Movie
                    </h2>
                    <p className="text-sm sm:text-base mt-2">
                      Explore the latest releases.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 🎭 Genre Sections */}
        {Object.entries(groupedMovies).map(([genre, movies]) => (
          <div key={genre} className="mb-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              {genre}
            </h2>

            {/* Horizontal Scrollable Container */}
            <div
              ref={(el) => (containerRefs.current[genre] = el)}
              className="overflow-x-auto scrollbar-hide"
            >
              <div className="flex gap-6 pb-2">
                {movies.slice(0, loadedCards[genre] || 4).map((movie) => (
                  <div
                    key={movie.id}
                    className="flex-shrink-0 w-[200px] sm:w-[250px] md:w-[300px]"
                  >
                    <Card
                      img={movie.poster}
                      movieId={movie.id}
                      className="transform transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
