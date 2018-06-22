export class Contact {
  id: number;
	firstName: string;
	lastName: string;
	email: string;

	constructor(data) {
	  this.email = data.email;
	  this.firstName = data.firstName;
	  this.lastName = data.lastName;
	  this.id = data.id;
  }
}
