import { IUser, IUserForm } from "../utils/types"
import ApiMethods from "./ApiMethods"
import { EndPoints } from "./EndPoints"

export class ApiManager {
  static updateUserApi = (userId: string, params: IUser) => {
    const url = EndPoints.UPDATE_USER(userId)

    return ApiMethods.put(url, params)
  }

  static deleteUserApi = (userId: string) => {
    const url = EndPoints.DELETE_USER(userId)

    return ApiMethods.delete(url)
  }

  static addUserApi = (user: IUserForm) => {
    const url = EndPoints.ADD_USER()

    return ApiMethods.post(url, user)
  }

  static getUsersApi = () => {
    const url = EndPoints.GET_USERS()

    return ApiMethods.get(url)
  }
}
