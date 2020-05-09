//
// Object Destructuring
//

// const person = {
// 	name: 'Andrew',
// 	age: 26,
// 	location: {
// 		city: 'Philadelphia',
// 		temp: 92
// 	}
// }
//
// const { name: firstName = 'Anonymous', age } = person;
// // const name = person.name;
// // const age = person.age;
//
// console.log(`${firstName} is ${age}`);
//
// const {city, temp: temperature} = person.location;
//
// if (city && temperature) {
// 	console.log(`It's ${temperature} in ${city}`);
// }

// const book = {
// 	title: 'Ego is the Enemy',
// 	author: 'Ryan Holiday',
// 	publisher: {
// 		name: 'Penguin'
// 	}
// }
//
// const {publisher: publisherName = 'Self-Published'} = book;
//
// console.log(publisherName); // if valid, use it, if no name on publisher, use Self-Published


//
// Array Destructuring
//

// const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];
//
// const [, city, state = 'New York'] = address;
//
// console.log(`You are in ${city} ${state}.`);

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];
const [itemName, priceS, priceM, priceL] = item;

// Grab first and third items using array destructuring
console.log(`A Medium ${itemName} costs ${priceM}`);