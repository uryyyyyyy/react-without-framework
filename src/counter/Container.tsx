import * as React from 'react'
import {Counter} from './Counter'
import {CounterService} from '../services/CounterService'
import {Subscription} from 'rxjs/Subscription'

interface Props {
  counterService: CounterService
}

interface State {
  count: number
}

export default class CounterContainer extends React.Component<Props, State> {

  subscription: Subscription

  componentWillMount(){
    this.setState({count: this.props.counterService.getCount()})
    this.subscription = this.props.counterService.getObservable()
      .subscribe(value => this.setState({count: value}))
  }

  componentWillUnmount(){
    this.subscription.unsubscribe()
  }

  increment = (value: number) => {
    this.props.counterService.increment(value)
  }

  decrement = (value: number) => {
    this.props.counterService.decrement(value)
  }

  render() {
    return (
      <Counter
        value={this.state.count}
        increment={this.increment}
        decrement={this.decrement}
      />
    )
  }
}

