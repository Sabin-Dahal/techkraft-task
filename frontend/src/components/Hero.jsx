import { useEffect, useState } from "react";
import "./Hero.css";

const images = [
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
  "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
];

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