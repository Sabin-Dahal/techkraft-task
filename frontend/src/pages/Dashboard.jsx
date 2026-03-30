import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import api from "../api/axios";
import PropertyCard from "../components/PropertyCard.jsx";
import './Dashboard.css'
import Hero from "../components/Hero.jsx";


const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [properties, setProperties] = useState([]);
    const [error, setError] = useState("");
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [propsRes, favsRes] = await Promise.all([
                    api.get("/properties"),
                    api.get("/favourites")
                ]);
                setProperties(propsRes.data);
                setFavourites(favsRes.data.map(f => f.id));            
            } catch (err) {
                setError("Failed to load data");
            }finally{
                setLoading(false);
            }
        };
        fetchData();
    },[]);

    if (loading) return <div className = "loader">Loading...</div>;
    if(error) return <div className = "error">{error}</div>;
    return(
        <div className="dashboard">
            <Hero 
            user = {user}/>
            {/* <header className = "dashboard-header">
                <h1>Welcome, {user.name}</h1>
                <span className = "badge">{user?.role}</span>
            </header> */}
<section>
    <h2>Favourites</h2>
    <div className="properties-grid">
        {/* Filter the full properties list to find the ones whose ID is in our favourites array */}
        {properties.filter(p => favourites.includes(p.id)).length > 0 ? (
            properties
                .filter(p => favourites.includes(p.id))
                .map(prop => (
                    <PropertyCard 
                        key={prop.id} 
                        property={prop} 
                        isFav={true} 
                        setFavourites={setFavourites} 
                    />
                ))
        ) : (
            <p className="no-favs">No favourites yet</p>
        )}
    </div>
</section>         

<section>
    <h2>All Properties</h2>
    <div className="properties-grid">
        {properties.map(prop => (
            <PropertyCard
                key={prop.id}
                property={prop}
                isFav={favourites.includes(prop.id)}
                setFavourites={setFavourites}
            />
        ))}
    </div>
</section>
        </div>
    );  
};
export default Dashboard;