import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'

export class HttpClientService {
  private myHeaders = new Headers({
    "Content-Type": "application/json",
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  })

  private requestingCount: BehaviorSubject<number>

  constructor() {
    this.requestingCount = new BehaviorSubject(0)
  }

  async getRequest<T>(url: string): Promise<{success?: T, fail?: Error}> {
    this.requestingCount.next(this.requestingCount.getValue() + 1)

    try {
      const response: Response = await fetch(url, {
        method: 'GET',
        headers: this.myHeaders
      })

      if (response.ok) {
        const json: T = await response.json()
        return {success: json}
      } else {
        return {fail: new Error(`illegal status code: ${response.status}`)}
      }
    } catch (err) {
      return {fail: err}
    } finally {
      this.requestingCount.next(this.requestingCount.getValue() - 1)
    }
  }

  getObservable(): Observable<boolean> {
    return this.requestingCount.map(count => count !== 0)
  }

  getIsLoading(): boolean {
    return this.requestingCount.value !== 0
  }
}

// singleton
export default new HttpClientService()