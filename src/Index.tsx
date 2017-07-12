import * as React from 'react'
import * as ReactDOM from 'react-dom'
import counterService from './services/CounterService'
import Counter from './counter/Container'

ReactDOM.render(
  <Counter counterService={counterService}/>
  , document.getElementById('app')
)