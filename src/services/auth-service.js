import { ErrorModel } from "gc-models";
import { StorageService, HttpService } from "gc-services";
import { Settings } from "gc-config";
import EventEmitter from "sm-event-emitter";

export class AuthService {
  constructor() {
    this.httpService = new HttpService();
  }

  init() {
    return StorageService.getString("Authorization")
  }

  doLogin(data) {
    return this.httpService.post('/usuario/access', data)
      .then((response) => {

        debugger

        const token = response.headers['authorization']
        const usuario = {
          id: response.data.id_user
        }

        StorageService.setObject("usuario", usuario)

        this.httpService.registerToken(token)
          .then(() => {
            EventEmitter.emit('LOGIN_SUCCESS', token)
          })
      })
      .catch(error => {
        throw new ErrorModel({
          message: error.response.data.error,
          error
        })
      })
  }
}
