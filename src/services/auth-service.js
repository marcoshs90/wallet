import { ErrorModel } from "gc-models";
import { StorageService, HttpService } from "gc-services";
import { Settings } from "gc-config";
import EventEmitter from "sm-event-emitter";

export class AuthService {
  constructor() {
    this.httpService = new HttpService();
  }

  init() {
    return StorageService.getString("sessionToken")
  }

  doLogin(data) {
    StorageService.setString('sessionToken', '123')
      .then(() => {
        EventEmitter.emit('LOGIN_SUCCESS', '123')
      })
  }
}
