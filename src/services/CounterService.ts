import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import {Observable} from 'rxjs/Observable'

export class CounterService {
  private count: BehaviorSubject<number>

  constructor() {
    this.count = new BehaviorSubject(0)
  }

  increment(value: number): void {
    const newCount = this.count.getValue() + value
    this.count.next(newCount)
  }

  decrement(value: number): void {
    const newCount = this.count.getValue() - value
    this.count.next(newCount)
  }

  getObservable(): Observable<number> {
    return this.count.asObservable()
  }

  getCount(): number {
    return this.count.value
  }
}

// singleton
export default new CounterService()