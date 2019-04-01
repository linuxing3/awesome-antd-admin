export default {
  queryRouteList: '/routes',

  queryUserInfo: '/user',
  logoutUser: '/user/logout',
  loginUser: 'POST /user/login',

  queryUser: '/user/:id',
  queryUserList: '/users',
  updateUser: 'Patch /user/:id',
  createUser: 'POST /user',
  removeUser: 'DELETE /user/:id',
  removeUserList: 'POST /users/delete',
  // lowdb
  queryUserLowdb: '/user/:id',
  queryUserListLowdb: '/users',
  updateUserLowdb: 'Patch /user/:id',
  createUserLowdb: 'POST /user',
  removeUserLowdb: 'DELETE /user/:id',
  removeUserListLowdb: 'POST /users/delete',

  queryPostList: '/posts',

  queryDashboard: '/dashboard'
}
