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

  arquivar(data) {
    return this.httpService
      .post('/enderecos/arquivar', data)
      .then((response) => {
        debugger
        return response.data
      })
      .catch(error => {
        debugger
        throw new ErrorModel({
          error
        })
      })
  }

  desarquivar(data) {
    return this.httpService
      .post('/enderecos/desarquivar', data)
      .then((response) => {
        debugger
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
