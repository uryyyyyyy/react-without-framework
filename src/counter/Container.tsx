import * as React from 'react'
import {Counter} from './Counter'
import {CounterService} from '../services/CounterService'

interface Props {
  counterService: CounterService
}

interface State {
  count: number
}

export default class CounterContainer extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {count: props.counterService.getCount()}
  }

  componentWillMount(){
    this.props.counterService.getObservable()
      .subscribe(value => this.setState({count: value}))
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

