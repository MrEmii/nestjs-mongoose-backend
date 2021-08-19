export interface IUser extends Document {
  _id?: any,
  name: string;
  username: string;
  email: string;
  password: string;
}