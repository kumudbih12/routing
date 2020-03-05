export class UserModel {
  private userName: string;
  private email: string;
  private password: string;

  constructor(userName, email, password) {
    this.userName = userName;
    this.email = email;
    this.password = password;
  }
}
