import { useEffect, useState } from "react";
import "./Hero.css";
import hero1 from '../assets/hero1.jpg';
import hero2 from '../assets/hero2.jpg';
import hero3 from '../assets/hero3.jpg';


const images = [hero1, hero2, hero3];

export default function Hero({user}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt="property"
          className={`hero-image ${index === current ? "active" : ""}`}
        />
      ))}

      <div className="hero-overlay">
        <h1>Welcome, {user.name}</h1>
      </div>
      <div className="dots">
  {images.map((_, i) => (
    <span key={i} className={i === current ? "dot active" : "dot"} />
  ))}
</div>
    </div>
  );
}