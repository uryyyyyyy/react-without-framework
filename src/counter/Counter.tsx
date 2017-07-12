import * as React from 'react'

interface Props {
  value: number
  increment: (n: number) => void
  decrement: (n: number) => void
}

export const Counter: React.StatelessComponent<Props> = (props: Props) => {
  return (
    <div>
      <p>score: {props.value}</p>
      <button onClick={() => props.increment(3)}>Increment 3</button>
      <button onClick={() => props.decrement(2)}>Decrement 2</button>
    </div>
  )
}