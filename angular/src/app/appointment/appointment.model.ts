export class Appointment {
  id: number;
  date: string;
  time: string;
  address: string;
  username: string;
  accepted: boolean;
  receipt: number;
  paid: boolean;
  constructor(date: string, time: string, address: string, username: string, accepted: boolean, receipt: number, paid: boolean) {
    this.date = date;
    this.time = time;
    this.address = address;
    this.username = username;
    this.accepted = accepted;
    this.receipt = receipt;
    this.paid = paid;
  }
}
