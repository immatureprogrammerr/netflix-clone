import React, { useState, useEffect } from "react"
import "./Player.css"
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [apiData, setApiData] = useState({
        name: "",
        key: "",
        published_at: "",
        typeof: ""
    });

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_FIREBASE_AUTH_KEY}`
        }
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
        .then(res => res.json())
        .then(res => setApiData(res.results[0] ?? apiData))
        .catch(err => console.error(err));
    }, [])
    
    return (
        <div className="player">
            <img src={back_arrow_icon} alt="" onClick={() => navigate(-2)} />
            <iframe 
                width="90%" 
                height="90%" 
                src={`https://www.youtube.com/embed/${apiData.key}`} 
                title="Trailer"
                frameborder="0"
                allowFullScreen
                ></iframe>
                <div className="player-info">
                    <p>{ apiData.published_at.slice(0, 10) }</p>
                    <p>{ apiData.name }</p>
                    <p>{ apiData.typeof }</p>
                </div>
        </div>
    )
}

export default Player