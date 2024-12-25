import React, { useState, useEffect } from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'

let snowOnce = true;

const Home = () => {

    useEffect(() => {
        const createSnowflakes = (count) => {
            const body = document.body;
        
            for (let i = 0; i < count; i++) {
              const snowflake = document.createElement('div');
              const size = Math.random() * 5 + 5; // Random size between 5px and 10px
              const delay = Math.random() * 5; // Random delay for staggered effect
              const duration = Math.random() * 5 + 5; // Random fall duration between 5s and 10s
              const left = Math.random() * window.innerWidth; // Random horizontal start position
              const direction = Math.random() < 0.5 ? -1 : 1; // Random direction (left or right)
        
              snowflake.className = 'snowflake';
              snowflake.style.width = `${size}px`;
              snowflake.style.height = `${size}px`;
              snowflake.style.left = `${left}px`;
              snowflake.style.animationDuration = `${duration}s`;
              snowflake.style.animationDelay = `${delay}s`;
              snowflake.style.setProperty('--direction', direction);
        
              body.appendChild(snowflake);
        
              // Remove snowflake after it falls to avoid memory issues
              setTimeout(() => {
                snowflake.remove();
              }, (duration + delay) * 1000);
            }
          };
        
          // Create 50 snowflakes
          snowOnce && createSnowflakes(50);
          snowOnce = false;
          // Keep adding snowflakes at intervals
          // setInterval(() => createSnowflakes(10), 2000);
    }, [])

    return (
        <div className="home">
            <Navbar />
            <div className="hero">
                <img src={hero_banner} alt="" className="banner-img" />
                <div className="hero-caption">
                    <img src={hero_title} 
                    alt="" className="caption-img" />
                    <p>
                        Discovering his ties to a secret ancient order, a young man living in modern Istanbul embarks on a quest to save the city from an immportal enemy.
                    </p>
                    <div className="hero-btns">
                        <button className="btn">
                            <img src={play_icon} alt="" />
                            Play
                        </button>
                        <button className="btn dark-btn">
                            <img src={info_icon} alt="" />
                            More Info
                        </button>
                    </div>
                    <TitleCards category={"now_playing"} />
                </div>
            </div>
            <div className="more-cards">
                <TitleCards 
                    title={"Blockbuster Movies"} 
                    category={"top_rated"} />
                <TitleCards 
                    title={"Only on Netflix"}
                    category={"popular"} />
                <TitleCards 
                    title={"Upcoming"}
                    category={"upcoming"} />
                <TitleCards 
                    title={"Top picks for you"}
                    category={"now_playing"}
                 />
            </div>
            <Footer />
        </div>
    )
}

export default Home