const adminToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njc2MzExNzksIm9yaWdfaWF0IjoxNjY3NjI5Mzc5LCJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwibmFtZSI6ImFkbWluIiwicm9sZUlkIjo5fX0.lw6TyilmyyQ1ll-Xf-X8Lf6H-hAAyzJajx9Au38IYAk';
// {
//   "exp": 1667631179,
//   "orig_iat": 1667629379,
//   "user": {
//     "id": 1,
//     "username": "admin",
//     "name": "admin",
//     "roleId": 9
//   }
// }
const simpleToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njc2MzExNzksIm9yaWdfaWF0IjoxNjY3NjI5Mzc5LCJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6InRlc3QiLCJuYW1lIjoidGVzdCIsInJvbGVJZCI6MX19.gW0FeqtoP4YdFT6qoM2TdEeutDKfQmwphnmOwsWZqtE';
// "name": "test"
// "roleId": 1;

function login(username: string, password: string, isAdmin: boolean = false): Promise<{ data: { token: string } }> {
  // TODO call axios
  const data = {
    token: isAdmin ? adminToken : simpleToken,
  };
  return new Promise(resolve => resolve({ data }));
}

function logout(): Promise<{ data: Object }> {
  // TODO call axios
  const data = {};
  return new Promise(resolve => resolve({ data }));
}

export const LoginService = {
  login,
  logout,
};
