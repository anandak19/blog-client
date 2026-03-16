import { IUser } from './user.model';

export interface IUserLogin extends Pick<IUser, 'email' | 'password'> {}

export interface IPayload extends Pick<IUser, 'email' | 'firstName' | 'lastName' | 'id'> {}
