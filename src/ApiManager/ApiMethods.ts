import { IUser, IUserForm } from "../utils/types"

const BASE_URL = 'http://localhost:3030/'

const getHeaders = () => {
  const App_key = 'somekey'

  const getToken = () => {
    //some code
  }
    // return Authorization: `Bearer ${getToken}`,
    //App_key: App_key
  return {
    'Content-Type': 'application/json',
  }
}

class ApiMethods {
  static apiRequest(method: string, url: string, body?: IUserForm | undefined) {
    url = `${BASE_URL}${url}`
    return new Promise((resolve, reject) => {
      fetch(url, {method, body: JSON.stringify(body), headers: {'Content-Type': 'application/json'}})
        .then(res => res.json())
        .then((result: any) => result)
        .then(resolve)
        .catch(reject)
    })
  }

  static get(url: string) {
    return this.apiRequest('GET', url)
  }

  static post(url: string,  data: IUserForm) {
    return this.apiRequest('POST', url, data)
  }

  static put(url: string, data: IUser) {
    return this.apiRequest('PUT', url, data)
  }

  static delete(url: string) {
    return this.apiRequest('DELETE', url)
  }
}

export default ApiMethods
