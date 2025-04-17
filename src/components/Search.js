
// import Homepage from "./components/Homepage";
import "./App.css";
import { useState } from "react";
import Recipecard from "./components/Recipecard";

const dummydata = "dummydata";
function Search() {
  const [loadingState, setLoadingState] = useState(false);

  //save result that we get from api

  const [recipes, setRecipes] = useState([]);

  //favorites data store

  const [favorites,setFavorites]=useState([]);

  const getDataFromSearchComponent = (getdata) => {
    //set loading state true before api call
    setLoadingState(true);
    console.log(getdata, "getdata");

    //calling api

    async function getRecipes() {
      const apiResponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=6a96121decb04832b714c14bb2a11954&query=${getdata}`
      );
      const result = await apiResponse.json();
      const { results } = result;

      if (results && results.length > 0) {
        setLoadingState(false);
        setRecipes(results);
      }
      console.log(result);
    }
    getRecipes();
  };
  console.log(loadingState, recipes);

  const addtofav=(getCurrentRecipesItem)=>{
    console.log(getCurrentRecipesItem);

    let cpyfav=[...favorites];

    const index=cpyfav.findIndex(item=>item.id===getCurrentRecipesItem.id)
    console.log(index);

    if(index === -1){
      cpyfav.push(getCurrentRecipesItem)
      setFavorites(cpyfav);
    }
    else{
      alert('Item is already present in Favorites!!');
    }
};
console.log(favorites);
  return (
    <>
    
      <Homepage
        getDataFromSearchComponent={getDataFromSearchComponent}
        dummydatacopy={dummydata}
        />
         {loadingState && (
          <div className="loading">Loading Recipes Please Wait!!</div>
        )}
        {/* loading statement */}
       

      {/* loading statement */}

      {/* map the recipes */}
      <div className="items">
        {recipes && recipes.length > 0
          ? recipes.map((item) => (
              <Recipecard id={item.id} image={item.image} title={item.title}
              
              addtofav={()=>addtofav(item)} />
            ))
          : null}
      </div>

      {/* map the recipes */}
    </>
  );
}

export default Search;
