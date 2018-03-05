import { HttpService } from 'gc-services'
import { ErrorModel } from 'gc-models'

export class FaqService {
  constructor() {
    this.httpService = new HttpService()
  }

  getFaq() {
    return this.httpService
      .get('/faq')
      .then((response) => {
        return response.data.faq
      })
      .catch(error => {
        debugger
        throw new ErrorModel({
          error
        })
      })
  }
}
