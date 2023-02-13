import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import { createContext } from 'react';
import ReactSwitch from "react-switch";
export const ThemeContext= createContext("light");



function App() {
  const [theme, setTheme] = useState("light");

  const apiKey = "a6a29708caf8322764abcada788513ca  "
  const [data, setData] = useState()
  const [inputCity,setInputCity]= useState()
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };


  const handleSearch = () => {
  getWeatherDetails(inputCity)
   }
  

  const getWeatherDetails = (city) => {
    if (!city) return 0
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey
    axios.get(apiURL)
    .then((res) => {
      console.log(res.data)
      console.log(JSON.stringify(res.data))
      setData(res.data)
    })
      .catch((err) => {
        console.log("err", err)
      })
  }
  const handleOnChangeInput = (e) => {
    setInputCity(e.target.value)
    console.log(e.target.value)
  }



  

  useEffect(() => {
    getWeatherDetails("kathmandu")
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
    <div className="col-md-12" id={theme}>

      <div className="weatherbg">
        <h1 className="heading">Weather App </h1>
        <div className="d-grid gap-3 col-4 mt-4">
          <input type="text" className="form-control" onChange={handleOnChangeInput} />
          <button className="primary button" type=" button" onClick={handleSearch} >Search
          </button>

        </div>

      </div>
      <div className='col-md-12 text-center mt-5'>
        <div className='shadow rounded weatherResultBox'>
          <img className='wIcon'
            src="https://img.freepik.com/free-photo/3d-render-weather-icons-set-sun-shining-clouds_107791-17177.jpg?w=1800&t=st=1676200530~exp=1676201130~hmac=174b21f82ed8bcc3d5164707615e2a76355705cdbc0fe9908d5105dcc28813f1" />
          <h5 className="weatherCity">{data?.name}</h5>
          <h6 className="weatherTemp"> {((data?.main.temp) - 273.15).toFixed(2)+"°C"}</h6>
          <h1 className="weatherCity">Feels Like: {data?.main.feels_like}</h1>
          <h1 className="weatherCity">temp_max: {data?.main.temp_max}</h1>
          <h1 className="weatherCity">temp_min: {data?.main.temp_min}</h1>
          <h1 className="weatherCity">pressure: {data?.main.pressure}</h1>
          <div className="switch">
          <label> {theme === "light" ? "Light Mode" : "Dark Mode"}</label>
          <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
        </div>
        </div>
      </div>
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
