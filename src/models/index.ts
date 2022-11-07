export interface User {
  id?: number;
  username: string;
  name: string;
  roleId: number;
}

export interface JwtPayload {
  user: User;
  exp: number | Date;
}
