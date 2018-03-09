import { ErrorModel } from "gc-models";
import { StorageService, HttpService } from "gc-services";
import { Settings } from "gc-config";
import EventEmitter from "sm-event-emitter";

export class AuthService {
  constructor() {
    this.httpService = new HttpService();
  }

  init() {
    return StorageService.getString("authorization")
  }

  doLogin(data) {


    this.httpService.post('/usuario/access', data)
      .then((response) => {

        debugger

        this.httpService.registerToken(response.headers['authorization'])
          .then(() => {
            EventEmitter.emit('LOGIN_SUCCESS', '123')
          })
      })
      .catch(error => {
        debugger
      })
  }
}
