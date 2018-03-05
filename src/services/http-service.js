import * as axios from 'axios'
import { ConfigSettings } from 'gc-config'
import { ErrorModel } from 'gc-models'
import { StorageService } from 'gc-services'
import { NetInfo } from 'react-native'

const httpClient = axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})


httpClient.defaults.headers.common['Usertoken'] = '37399709-9593-45fc-9d8c-8192ebcf2255'

httpClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response.status === 401 || error.response.status === 403) {
     StorageService.remove('X-AUTH-TOKEN')
  }
  return Promise.reject(error)
})

let isConnected = true

export class HttpService {
  static init() {
    NetInfo.isConnected.addEventListener('change', status => {
      isConnected = status
    })

    return new Promise((resolve) => {
      StorageService.getString('X-AUTH-TOKEN')
        .then(token => {

          if(token) {
            httpClient.defaults.headers.common['X-AUTH-TOKEN'] = token
          }
          resolve(token)
        })
    })
  }

  registerToken(token) {
    httpClient.defaults.headers.common['X-AUTH-TOKEN'] = token
    return StorageService.setString('X-AUTH-TOKEN', token)
  }

  removeToken() {
    return new Promise((resolve) => {
      StorageService.remove('X-AUTH-TOKEN')
        .then(() => {
          httpClient.defaults.headers.common['X-AUTH-TOKEN'] = ''
          delete httpClient.defaults.headers.common['X-AUTH-TOKEN']
          resolve(true)
        })
    })
  }

  get(url, data, setting) {
    const resolvedUrl = new UrlRequestResolver(url, setting).resolve()
    return new RequestPromiseResolver(httpClient.get(resolvedUrl)).resolve()
  }

  delete(url, data, setting) {
    const resolvedUrl = new UrlRequestResolver(url, setting).resolve()
    return new RequestPromiseResolver(httpClient.delete(resolvedUrl)).resolve()
  }

  post(url, data, setting) {
    const resolvedUrl = new UrlRequestResolver(url, setting).resolve()
    return new RequestPromiseResolver(httpClient.post(resolvedUrl, data)).resolve()
  }
}

class RequestPromiseResolver {
  constructor(requestPromise) {
    this.requestPromise = requestPromise
  }

  resolve() {
    return new Promise((resolve, reject) => {
      if (isConnected) {
        this.requestPromise
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      } else {
        reject(
          new ErrorModel({
            message: 'Você não está conectado.'
          })
        )
      }
    })
  }
}

class UrlRequestResolver {
  constructor(url, settings = {}) {
    this.apiUrl = ConfigSettings.apiUrl()
    this.url = url
    this.useRawUrl = settings.useRawUrl
  }

  resolve() {
    if (this.useRawUrl) {
      return this.url
    }
    return `${this.apiUrl}${this.url}`
  }
}
