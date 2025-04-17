import { useContext } from "react";
import { ThemeContext } from "../App";
import "./page.css"


const ThemeButton=()=>{

    const {theme,setTheme}=useContext(ThemeContext)
    console.log(theme,setTheme);
    return(
        <button style={theme ?{backgroundColor: "#407891"}:{}} className="themeButton" onClick={()=>setTheme(!theme)}>Change Theme</button>
    )
}

export default ThemeButton;