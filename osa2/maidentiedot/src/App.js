import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  useEffect(hook, [])
  
  console.log('render', countries.length, 'notes')
  console.log(countries)
  const countryNames = countries.map(country => country.name)

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const countriesToShow = showAll
    ? countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))
    : countries
  console.log("countriestoshow", countriesToShow)
  if (countriesToShow.length>10){
    return(
      <div>
      <h1>Countries</h1>
      <Filter newFilter = {newFilter} handleFilterChange = {handleFilterChange} />
      Too many matches, specify another filter
      </div>
      )
  }
  if (countriesToShow.length===1){
    const country = countriesToShow[0]
    return(
      <div>
      <h1>Countries</h1>
      <Filter newFilter = {newFilter} handleFilterChange = {handleFilterChange} />
      <Singlecountry country = {country}  />
      </div>
      )
  }
  return (
    <div>
      <h1>Countries</h1>
      <Filter newFilter = {newFilter} handleFilterChange = {handleFilterChange} />
      <ul>
      {countriesToShow.map(country => <Country country={country}/>)}
      </ul>
     
    </div>
  )
}

const Country = ({country}) => {
  return(
    <div>{country.name}</div>
  )
}

const Singlecountry = ({country}) => {
  return(
    <div>
    <h2>{country.name}</h2>
    <div>capital  {country.capital}</div> 
    <div>area {country.area}</div>
    <br/>
    <div><b>languages:</b></div>
      <ul>{country.languages.map(language => <li> {language.name}</li>)}</ul>
    
    
    <img width={250} height={200}
      src={country.flag}
      alt="new"
      />
    </div>
  )
}

const Filter = (props) => {
  return(
  <div> filter shown with: <input value={props.newFilter} onChange={props.handleFilterChange}/></div>
  )
}
export default App;
