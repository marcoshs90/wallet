import { HttpService } from 'gc-services'
import { ErrorModel } from 'gc-models'

export class EnderecoService {
  constructor() {
    this.httpService = new HttpService()
  }

  getEnderecos(data) {
    return this.httpService
      .post('/enderecos', data)
      .then((response) => {
        return response.data
      })
      .catch(error => {
        debugger
        throw new ErrorModel({
          error
        })
      })
  }

  novo(data) {
    return this.httpService
      .post('/enderecos/novo', data)
      .then((response) => {
        return response.data
      })
      .catch(error => {
        debugger
        throw new ErrorModel({
          error
        })
      })
  }
}
