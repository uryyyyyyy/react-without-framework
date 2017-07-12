import {CounterService} from '../CounterService'

describe('CounterService', () => {

  const dummyService: any = {}

  it('initialize', () => {
    const service = new CounterService(dummyService)
    expect(service.getCount()).toBe(0)
  })

  it('calling increment changes state', () => {
    const service = new CounterService(dummyService)
    const results: number[] = []
    service.getObservable().subscribe(value => {
      results.push(value)
    })
    service.increment(10)
    expect(results).toEqual([0, 10])
    expect(service.getCount()).toBe(10)
  })

  it('call multi API', () => {
    const service = new CounterService(dummyService)
    const results: number[] = []
    service.getObservable().subscribe(value => {
      results.push(value)
    })
    service.increment(10)
    service.decrement(5)
    service.increment(20)
    expect(results).toEqual([0, 10, 5, 25])
    expect(service.getCount()).toBe(25)
  })
})
