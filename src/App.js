import Homepage from "./components/Homepage";
import "./App.css";
import { createContext, useEffect, useReducer, useState } from "react";
import Recipecard from "./components/Recipecard";
import Favcard from "./components/Favcard";
import ThemeButton from "./components/theme";
import { use } from "react";

const dummydata = "dummydata";

const reducer = (state, action) => {
  switch (action.type) {
    case "filtereFavorites":
      console.log(action);
      return {
        ...state,
        filteredValue: action.value,
      };

    default:
      return state;
  }
};

const initialState = {
  filteredValue: "",
};

//create the context
//provide the context
//consume the context
export const ThemeContext= createContext(null);
function App() {
  const [loadingState, setLoadingState] = useState(false);

  //save result that we get from api

  const [recipes, setRecipes] = useState([]);

  //favorites data store

  const [favorites, setFavorites] = useState([]);

  const [apicallsuccess, setApicallsuccess] = useState(false);

  //use reducer

  const [filteredState, dispatch] = useReducer(reducer, initialState);

  const getDataFromSearchComponent = (getdata) => {
    //set loading state true before api call
    setLoadingState(true);
    console.log(getdata, "getdata");

    //calling api

    async function getRecipes() {
      const apiResponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch/?apiKey=6a96121decb04832b714c14bb2a11954&query=${getdata}`
      );
      const result = await apiResponse.json();
      const { results } = result;

      if (results && results.length > 0) {
        setLoadingState(false);
        setRecipes(results);
        setApicallsuccess(true);
      }
      console.log(result);  
    }
    getRecipes();
  };
  console.log(loadingState, recipes);

  const addtofav = (getCurrentRecipesItem) => {
    console.log(getCurrentRecipesItem);
    console.log("yes");

    let cpyfav = [...favorites];

    const index = cpyfav.findIndex(
      (item) => item.id === getCurrentRecipesItem.id
    );
    console.log(index);

    if (index === -1) {
      cpyfav.push(getCurrentRecipesItem);
      setFavorites(cpyfav);
      //save the fav in local storage
      localStorage.setItem("favorites", JSON.stringify(cpyfav));
    } else {
      alert("Item is already present in Favorites!!");
    }
  };

  const removefromfav = (getCurrentid) => {
    let cpyfav = [...favorites];
    cpyfav = cpyfav.filter((item) => item.id !== getCurrentid);
    setFavorites(cpyfav);
    localStorage.setItem("favorites", JSON.stringify(cpyfav));
  };
  useEffect(() => {
    const extractFavFromLocalStorageOnPageLoad = JSON.parse(
      localStorage.getItem("favorites")
    );
    setFavorites(extractFavFromLocalStorageOnPageLoad);
  }, []);
  console.log(favorites);
  console.log("filtereddstate", filteredState);


  //filter the fav

  const filtereFavoritesItems=  favorites.filter((item)=>
    item.title.toLowerCase().includes(filteredState.filteredValue)
);

const [theme,setTheme]=useState(false);
useEffect(()=>{document.body.style.backgroundColor=theme ?"#eb9146":"#407891"},[theme]);
  return (
    <>
        <div className="page">
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
        <ThemeButton/>
        

      <Homepage 

        getDataFromSearchComponent={getDataFromSearchComponent}
        dummydatacopy={dummydata}
        apicallsuccess={apicallsuccess}
        setApicallsuccess={setApicallsuccess}
        />

      {/* Show fav items */}
      <div className="favorites-wrapper">
        <h1 className="favorites-title" style={theme?{color:"rgb(18, 52, 59)"}:{}}>Favorites</h1>
        <div className="search-favorites">
          <input
            onChange={(event) => {
              dispatch({ type: "filtereFavorites", value: event.target.value });
            }}
            // style={theme ? {backgroundColor : "rgb(222 243 247)",border:"none",fontWeight:"bold"}:{}}
            value={filteredState.filteredValue}
            name="searchfavorites"
            placeholder="Search Your Favorites"
          />
        </div>
        <div className="favorites">
          {
            !filtereFavoritesItems.length && <div className="no-recipes"  style={theme ? {color : "#000"}:{}}>No Favorite Recipe!!</div>
          }
          {filtereFavoritesItems && filtereFavoritesItems.length > 0
            ? filtereFavoritesItems.map((item) => (
                <Favcard
                  key={item.id} // It's a good practice to add a key prop
                  id={item.id}
                  image={item.image}
                  title={item.title}
                  recipe={item.recipe}
                  removefromfav={() => removefromfav(item.id)}
                />
              ))
            : null}
        </div>
      </div>
      {/* Show fav items */}

      {/* loading statement */}
      
      {loadingState && (
        <div className="loading skeleton"  style={theme ? {color : "#000"}:{}}>Loading Recipes.. Please Wait!!</div>
      )}

      {/* loading statement */}

      {/* map the recipes */}
      <div className="items">
        {recipes && recipes.length > 0
          ? recipes.map((item) => (
              <Recipecard
                id={item.id}
                image={item.image}
                title={item.title}
                recipe={item.recipe}
                addtofav={() => addtofav(item)}
              />
            ))
          : null}
      </div>
      {
        !loadingState && !recipes.length && <div className="no-recipes" style={theme ? {color : "#000"}:{}}>No Recipes found!!</div>
      }
        </ThemeContext.Provider>
    </div>



      {/* map the recipes */}

      
    </>

  );
}
      


export default App;
