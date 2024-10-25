export const EndPoints ={
  UPDATE_USER: (userId: string) => `users/${userId}`,
  DELETE_USER: (userId: string) => `users/${userId}`,
  ADD_USER: () => 'users',
  GET_USERS: () => 'users',
}
