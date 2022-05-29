import { useState } from 'react'
const Statistics = ({ good, neutral, bad }) => {
  const all = good+neutral+bad
  const average = (good-bad)/all
  const positive = 100*good/all
  if (all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return ( 
    <table>
    <tr>
      <td>good</td>
      <td><StatisticLine value = {good} /></td>
    </tr>
    <tr>
      <td>neutral</td>
      <td><StatisticLine value = {neutral} /></td>
    </tr>
    <tr>
      <td>bad</td>
      <td><StatisticLine value = {bad} /></td>
    </tr>
    <tr>
      <td>all</td>
      <td><StatisticLine value = {all} /></td>
    </tr>
    <tr>
      <td>average</td>
      <td><StatisticLine value = {average} /></td>
    </tr>
    <tr>
      <td>positive</td>
      <td><StatisticLine value = {positive} /></td>
    </tr>
  </table>
  )
}

const StatisticLine  = ({value}) => {
  return (
    <div>
      {value}
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const [ good, setGood] = useState(0)
  const [ neutral, setNeutral] = useState(0)
  const [ bad, setBad] = useState(0)
  const addGood = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1)
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button
        handleClick={addGood}
        text='good'
       /> 
      <Button
        handleClick={addNeutral}
        text='neutral'
       />  
      <Button
        handleClick={addBad}
        text='bad'
       />  
      <h1>statistics</h1> 
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App;
