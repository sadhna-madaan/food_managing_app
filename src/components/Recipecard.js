import { useContext, useState } from "react";
import "./page.css";
import { ThemeContext } from "../App";

const Recipecard = (props) => {
    const { id, image, title, addtofav } = props;
    const { theme } = useContext(ThemeContext);

    const [showRecipe, setShowRecipe] = useState(false);
    const [recipeDetails, setRecipeDetails] = useState(null);   

    const handleShowRecipe = async () => {
        // Toggle the visibility of the recipe details
        setShowRecipe(!showRecipe);

        // Fetch recipe details if not already fetched
        if (!showRecipe) {
            try {
                const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=6a96121decb04832b714c14bb2a11954`);
                
                // Check if the response is OK
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setRecipeDetails(data);
                window.location.href = data.sourceUrl;
            } catch (error) {
                console.error("Error fetching recipe details:", error);
            }
        }
    };

    return (
        <>
            <div key={id} className="recipe-item">
                <div>
                    <img src={image} alt="Image Not Available" />
                </div>

                <p className="recipe-title" style={theme ? { color: "#407891" } : {}}>{title}</p>
<div className="btn">
                <button
                    type="button"
                    className="recipe-item-btn"
                    style={theme ? { backgroundColor: "#12343b" } : {}}
                    onClick={handleShowRecipe}
                >
                    Show Recipe
                </button>

                <button type="button" className="recipe-item-btn" style={theme ? { backgroundColor: "#407891" } : {}} onClick={addtofav}>Add to Favorite</button>
</div>
            
            </div>
        </>
    );
};

export default Recipecard;