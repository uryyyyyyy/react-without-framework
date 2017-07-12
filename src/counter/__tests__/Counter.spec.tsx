import * as React from 'react'
import {Counter} from '../Counter'
import {shallow} from 'enzyme'

describe('Counter', () => {

  const actionDummy:any = () => new Error('should not be called')

  it('rendering', () => {
    const wrapper = shallow(<Counter
      value={1}
      isLoading={false}
      increment={actionDummy}
      decrement={actionDummy}
      asyncIncrement={actionDummy}
    />)
    expect(wrapper.find('p').at(0).prop('children')).toBe('score: 1')
  })

  it('click', () => {
    const spy: any = {increment: actionDummy}
    spyOn(spy, 'increment')
    const wrapper = shallow(<Counter
      value={1}
      isLoading={false}
      increment={spy.increment}
      decrement={actionDummy}
      asyncIncrement={actionDummy}
    />)
    wrapper.find('button').at(0).simulate('click')
    expect(spy.increment).toHaveBeenCalledWith(3)
  })
})