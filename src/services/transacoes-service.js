import { HttpService } from 'gc-services'
import { ErrorModel } from 'gc-models'

export class TransacoesService {
  constructor() {
    this.httpService = new HttpService()
  }

  getTransacoes(data) {
    return this.httpService
      .post('/transacoes', data)
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
