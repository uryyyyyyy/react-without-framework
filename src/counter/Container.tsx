import * as React from 'react'
import {Counter} from './Counter'
import {CounterService} from '../services/CounterService'
import {Subscription} from 'rxjs/Subscription'
import {HttpClientService} from '../services/HttpClientService'

interface Props {
  counterService: CounterService
  httpClientService: HttpClientService
}

interface State {
  count: number
  isLoading: boolean
}

export default class CounterContainer extends React.Component<Props, State> {

  subscriptions: Subscription[] = []

  componentWillMount(){
    this.setState({
      count: this.props.counterService.getCount(),
      isLoading: this.props.httpClientService.getIsLoading()
    })
    const subscription1 = this.props.counterService.getObservable()
      .subscribe(value => this.setState({count: value}))
    this.subscriptions.push(subscription1)
    const subscription2 = this.props.httpClientService.getObservable()
      .subscribe(value => this.setState({isLoading: value}))
    this.subscriptions.push(subscription2)
  }

  componentWillUnmount(){
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  increment = (value: number) => {
    this.props.counterService.increment(value)
  }

  decrement = (value: number) => {
    this.props.counterService.decrement(value)
  }

  asyncInc = () => {
    this.props.counterService.asyncIncrement()
  }

  render() {
    return (
      <Counter
        value={this.state.count}
        isLoading={this.state.isLoading}
        increment={this.increment}
        decrement={this.decrement}
        asyncIncrement={this.asyncInc}
      />
    )
  }
}

