import * as firebase from 'firebase';

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
	measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export {firebase, database as default};

// //child_removed
// database.ref('expenses').on('child_removed', (snapshot) => {
// 	console.log(snapshot.key, snapshot.val());
// })
//
// // child_changed
// database.ref('expenses').on('child_changed', (snapshot) => {
// 	console.log(snapshot.key, snapshot.val());
// })
//
// // child_added
// database.ref('expenses').on('child_added', (snapshot) => {
// 	console.log(snapshot.key, snapshot.val());
// })
//
//
// // const printSnapshotAsArray = (snapshot) => {
// // 	const expenses = [];
// //
// // 	snapshot.forEach((childSnapshot) => {
// // 		expenses.push({
// // 			id: childSnapshot.key, // this is the ID
// // 			...childSnapshot.val() // get everything else from val
// // 		});
// // 	});
// //
// // 	console.log(expenses);
// // };
// //
// // database.ref('expenses')
// // 	.once('value')
// // 	.then((snapshot) => {
// // 		printSnapshotAsArray(snapshot);
// // 	});
// //
// // database.ref('expenses').on('value', (snapshot) => {
// // 	printSnapshotAsArray(snapshot)
// // })
//
//
// database.ref('expenses').push({
// 	description: 'Rent',
// 	note: 'Note',
// 	amount: 1200,
// 	createdAt: 0
// });
// // setup "expenses" with three items (description, note, amount, createdAt)
//
// // database.ref('notes/-M8E22MRxuWSW0SB67nL').update({
// // 	body: 'buy food'
// // })
// // database.ref('notes').push({
// // 	title: 'Course Topics',
// // 	body: 'React Native, Angular, Python'
// // });
//
// // const firebaseNotes = {
// // 	notes: {
// // 		apoijasdf: {
// // 			title: 'First Note',
// // 			body: 'This is my note'
// // 		},
// // 		asfwefwat: {
// // 			title: 'Another note',
// // 			body: 'This is my note'
// // 		}
// // 	}
// // }
// //
// // const notes = [{
// // 	id: '12',
// // 	title: 'First Note',
// // 	body: 'This is my note'
// // }, {
// // 	id: '761ase',
// // 	title: 'First Note',
// // 	body: 'This is another note'
// // }];
// //
// // database.ref('notes').set(notes);
//
// // Set up data sub -> Andrew is a Software Developer at Amazon.
// // Change the data and make sure it reprints
//
// // const sub = database.ref().on('value', (snapshot) => {
// // 	const name = snapshot.child('name').val();
// // 	const jobTitle = snapshot.child('job/title').val();
// // 	const jobCompany = snapshot.child('job/company').val();
// //
// // 	console.log(`${name} is a ${jobTitle} at ${jobCompany}`);
// // })
// //
// // setTimeout(() => {
// // 	database.ref('job').update({
// // 		title: 'Software Developer II'
// // 	})
// // }, 3000);
//
// // const onValueChange = database.ref().on('value', (snapshot) => {
// // 	console.log(snapshot.val());
// // }, (e) => {
// // 	console.log('Error with data fetching', e)
// // });
// //
// // setTimeout(() => {
// // 	database.ref('age').set(29)
// // }, 3500);
// //
// // setTimeout(() => {
// // 	database.ref().off(onValueChange) // Can turn off specific listeners
// // }, 7000);
// //
// // setTimeout(() => {
// // 	database.ref('age').set(30)
// // }, 10500);
//
//
// // database.ref('location')
// // 	.once('value')
// // 	.then((snapshot) => {
// // 		const val = snapshot.val();
// // 		console.log(val);
// // 	})
// // 	.catch((e) => {
// //
// // 	})
// // database.ref().set({ // Ref gives reference to specific part of database, e.g. table names
// // 	name: 'Andrew Mead',
// // 	age: 26,
// // 	job: {
// // 		title: 'Software Developer',
// // 		company: 'Google'
// // 	},
// // 	stressLevel: 6,
// // 	location: {
// // 		city: 'Philadelphia',
// // 		country: 'United States'
// // 	}
// // }).then(() => {
// // 	console.log('Data is saved');
// // }).catch((e) => {
// // 	console.log('This failed.', e)
// // });
// //
// // // Change the stressLevel to a 9
// // // Change job.company to Amazon
// // // Change location.city to Seattle
// // database.ref().update({
// // 	stressLevel: 9,
// // 	'job/company': 'Amazon',
// // 	'location/city': 'Seattle'
// // });
//
// // database.ref('isSingle').remove().then(() => {
// // 	console.log('removed is single');
// // }).catch((e) => {
// // 	console.log('did not remove single');
// // })
// // database.ref().set('This is my data');
//
//
// // set up then and catch
// // make sure catch actually works
// // switch rules to be open
// // make sure that then runs
//
//
// // database.ref('age').set(27);
// // database.ref('location/city').set('New York');
// // database.ref('attributes').set({
// // 	height: 70,
// // 	weight: 170
// // }).then(() => {
// // 	console.log('Attributes set');
// // }).catch((e) => {
// // 	console.log('Didn\'t do it');
// // })
