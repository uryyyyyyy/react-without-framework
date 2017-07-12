import Container from '../Container'

describe('Container', () => {

  it('can execute increment', () => {
    const spyService: any = {increment: {}}
    const props: any = {counterService: spyService}
    spyOn(spyService, 'increment')
    const container = new Container(props)
    container.increment(100)
    expect(spyService.increment.calls.count()).toEqual(1)
    expect(spyService.increment.calls.argsFor(0)[0]).toEqual(100)
  })
})