import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import {Observable} from 'rxjs/Observable'
import httpClientServiceImpl, {HttpClientService} from './HttpClientService'

export class CounterService {
  private count: BehaviorSubject<number>

  constructor(private httpClientService: HttpClientService) {
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

  async asyncIncrement() {
    const result = await this.httpClientService.getRequest<{value: number}>('/api/count')
    if (result.success) {
      const newCount = this.count.getValue() + result.success.value
      this.count.next(newCount)
    } else {
      console.error(result!.fail)
    }
  }

  getObservable(): Observable<number> {
    return this.count.asObservable()
  }

  getCount(): number {
    return this.count.value
  }
}

// singleton
export default new CounterService(httpClientServiceImpl)