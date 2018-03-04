const API_URL = 'https://apiwigool.herokuapp.com/api'
const API_URL_DEV = 'https://apiwigool.herokuapp.com/api'

/*
 *---------------------------------------------------------------
 * APPLICATION ENVIRONMENT
 *---------------------------------------------------------------
 *     development
 *     production
 */

const ENV = 'development'

/*--------------------------------------------------------------- */


export class ConfigSettings {
  static apiUrl() {

    if(ENV === 'development') {
      return API_URL_DEV
    }

    return API_URL
  }

  static getEnv() {
    return ENV
  }
}
