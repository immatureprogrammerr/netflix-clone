import React, { useRef, useEffect, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom'

const TitleCards = ({ title, category }) => {

    const [apiData, setApiData] = useState([])
    const cardsRef = useRef();

    const handleWheel = (event) => {
        event.preventDefault()
        cardsRef.current.scrollLeft += event.deltaY
    }

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_FIREBASE_AUTH_KEY}`
            }
          };
          
          fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => setApiData(res.results))
            .catch(err => console.error(err));

        cardsRef.current.addEventListener('wheel', handleWheel)
    }, [])

    return (
        <div className="title-cards">
            <h2>{ title ? title : "Popular on Netflix" }</h2>
            <div className="card-list" ref={cardsRef}>
                {apiData.map((card, index) => {
                    return <Link to={`/player/${card.id}`} className="card" key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500/${card.backdrop_path}`} alt="" />
                        <p>{card.original_title}</p>
                    </Link>
                })}
            </div>
        </div>
    )
}

export default TitleCards