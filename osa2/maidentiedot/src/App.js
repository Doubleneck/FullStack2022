import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  
  ? countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))
  : countries
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

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const countriesToShow = showAll
    ? countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))
    : countries

  const showThisCountry = (country) => {
    setNewFilter(country.name)
  }

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
      {countriesToShow.map(country =>  <Country country={country} showThisCountry={showThisCountry}/> 
      )}
      </ul>
    </div>
  )
}

const Country = ({country,showThisCountry}) => {
  return(
    <div>{country.name} 
      <button onClick={() => showThisCountry(country)}>
        show
      </button>
    </div>
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
