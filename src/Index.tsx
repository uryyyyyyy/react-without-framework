import * as React from 'react'
import * as ReactDOM from 'react-dom'
import counterService from './services/CounterService'
import httpClientService from './services/HttpClientService'
import Counter from './counter/Container'

ReactDOM.render(
  <Counter
    counterService={counterService}
    httpClientService={httpClientService}
  />
  , document.getElementById('app')
)