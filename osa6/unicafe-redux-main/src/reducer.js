const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      const stateAddGood = {
        good: state.good + 1,
        ok: state.ok,
        bad: state.bad
      }
      return stateAddGood
    case 'OK':
      const stateAddOk = {
        good: state.good,
        ok: state.ok +1,
        bad: state.bad
      }
      return stateAddOk
    case 'BAD':
      const stateAddBad = {
        good: state.good,
        ok: state.ok,
        bad: state.bad + 1
      }
      return stateAddBad
      
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer