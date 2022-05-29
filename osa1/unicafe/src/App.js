import { useState } from 'react'
const Statistics = ({ good, neutral, bad }) => {
  const all = good+neutral+bad
  const average = (good-bad)/all
  const positive = 100*good/all
  if (all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }
  return ( 
    <div>
      <h1>statistics</h1>
      <StatisticLine text="good" value = {good} />
      <StatisticLine text="neutral" value = {neutral} />
      <StatisticLine text="bad" value = {bad} />
      <StatisticLine text="all" value = {all} />
      <StatisticLine text="average" value = {average} />
      <StatisticLine text="positive" value = {positive + ' %'} />
    </div>   
  )
}

const StatisticLine  = ({text,value}) => {
  return (
    <div>
      {text} {value}
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
  // tallenna napit omaan tilaansa
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
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App;
