import * as React from 'react'

interface Props {
  value: number
  isLoading: boolean
  increment: (n: number) => void
  decrement: (n: number) => void
  asyncIncrement: () => void
}

export const Counter: React.StatelessComponent<Props> = (props: Props) => {
  return (
    <div>
      <p>{`score: ${props.value}`}</p>
      <button onClick={() => props.increment(3)}>Increment 3</button>
      <button onClick={() => props.decrement(2)}>Decrement 2</button>
      <button onClick={() => props.asyncIncrement()}>async Increment 100</button>
      {props.isLoading ? <p>loading</p> : null}
    </div>
  )
}