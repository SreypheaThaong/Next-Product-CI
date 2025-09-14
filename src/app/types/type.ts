export interface User {
  identifier: string;
  password: string;
}

export interface SessionJWT {
  data: {
    id: number;
    identifier: string;
    token: string;
  };
}
