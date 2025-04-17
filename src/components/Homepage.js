import { useEffect, useState, useContext } from 'react';
import './page.css';
import { ThemeContext } from '../App';
// import 'index.js'
// import Search from './Search.js';
const Homepage = (props) => {
    // console.log(props);
    const {getDataFromSearchComponent,apicallsuccess,setApicallsuccess}=props;
    const[inputValue,setInputValue]=useState('')
    const handleInputvalue=(event)=>{
        const{value}=event.target;
        setInputValue(value)
    }
    // console.log(inputValue)

    const handleSubmit=(event)=>{
        event.preventDefault()  
        getDataFromSearchComponent(inputValue); 
      }
      // console.log(getDataFromSearchComponent);

      useEffect(()=>{
        if(apicallsuccess){
          setInputValue('');
          setApicallsuccess(false);
        }
      },[apicallsuccess])
      console.log(apicallsuccess)

      const {theme}=useContext(ThemeContext)
      
  return (
    <>
      <form onSubmit={handleSubmit}  className="Search" >
        <input name="search" onChange={handleInputvalue} value={inputValue} placeholder="Search Recipes" id="search" />
        <button onClick={handleSubmit} style={theme?{backgroundColor:"#407891"}:{}} type="submit">Search</button>
      </form>
    {/* <Search/> */}
    </>
  );
};

export default Homepage;
