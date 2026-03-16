import { IUser } from './user.model';

export interface IUserEmail extends Pick<IUser, 'email'> {}

export interface IUserSignup extends Omit<IUser, 'id'> {}

export interface IOtpVerify extends IUserEmail {
  otp: string;
}
