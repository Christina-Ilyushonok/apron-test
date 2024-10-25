export interface IUserForm {
  firstName: string,
  lastName: string,
  age: number,
  gender:  GENDER,
}

export interface IUserFormInitial {
  firstName: string,
  lastName: string,
  age: string,
  gender:  string,
}

export interface IUser extends IUserForm {
  id: string
}

export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}
