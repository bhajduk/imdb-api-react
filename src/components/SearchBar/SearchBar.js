import React, { useState, useEffect, useRef } from "react";
import "./SearchBar.css";
import VanillaTilt from "vanilla-tilt";

function Tilt(props) {
    const { options, ...rest } = props;
    const tilt = useRef(null);

    useEffect(() => {
        VanillaTilt.init(tilt.current, options);
    }, [options]);

    return <div ref={tilt} {...rest} />;
}

const options = {
    speed: 1000,
    max: 8,
};

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState(null);
    const [poster, setPoster] = useState(null);

    const [rating, setRating] = useState(null);

    const handleChange = (event) => {
        setSearchValue(event.target.value);
    };

    const onSubmit = () => {
        fetch(`http://www.omdbapi.com/?t=${searchValue}&apikey=7f0c8fb4`)
            .then((res) => res.json())
            .then((data) => {
                setPoster(data.Poster);
                setRating(data.imdbRating);
            });
    };

    return (
        <Tilt className="form" options={options}>
            <div>
                <input
                    id="inputBox"
                    type="text"
                    onChange={handleChange}
                    placeholder="type something..."
                />
                <div id="searchBtn" onClick={onSubmit}>
                    search
                </div>
                {rating ? (
                    <h1 id="rating">{rating}</h1>
                ) : (
                    <p id="parag">enter movie title</p>
                )}
                {poster && <img src={poster}></img>}
            </div>
        </Tilt>
    );
};

export default SearchBar;

// "http://www.omdbapi.com/?t=shrek&apikey=7f0c8fb4"

// const movieName = "Contratiempo";
// fetch(`http://www.omdbapi.com/?t=${movieName}&apikey=7f0c8fb4`)
//     .then((res) => res.json())
//     .then((data) => console.log(data.Title, "Rating:", data.imdbRating));
