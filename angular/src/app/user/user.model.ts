export class User {
  id: number;
  username: string;
  password: string;
  name: string;
  surname: string;
  address: string;

  constructor(id: number, username: string, password: string, name: string, surname: string, address: string) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.name = name;
    this.surname = surname;
    this.address = address;
  }
}
