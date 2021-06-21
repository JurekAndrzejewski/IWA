export class SignupInfo {

  username: string;
  role: string[];
  password: string;
  name: string;
  surname: string;
  address: string;

  constructor(username: string, password: string, name: string, surname: string, address: string) {
    this.username = username;
    this.role = ['user'];
    this.password = password;
    this.name = name;
    this.surname = surname;
    this.address = address;
  }
}
