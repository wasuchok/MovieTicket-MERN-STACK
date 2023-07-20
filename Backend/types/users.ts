export interface createUser {
    username : string
    email : string
    password : string
}

export interface loginUser {
    email : string
    password : string
}

export interface User {
    _id: number;
    username: string;
    email: string;
  }
  

export interface DecodedToken {
    user: User;
  }