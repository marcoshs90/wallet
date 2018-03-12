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

  getCarteiras(data) {
    return this.httpService
      .post('/compra', data)
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

  calcularComissao(valor) {
    return this.httpService
      .post('/compra/calculo', {real: valor})
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

  comprar(data) {
    return this.httpService
      .post('/compra/comprar', data)
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
