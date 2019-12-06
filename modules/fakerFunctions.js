var faker = require('faker');

module.exports = {
	createEventName: function () {
		return {
			randomName: faker.name.findName(),
			randomEventName: faker.fake("{{company.catchPhraseNoun}} {{commerce.color}}"),
			randomLocation: faker.fake("{{address.streetAddress}}, {{address.county}} {{address.state}}, {{address.country}}")
		};
	},

	createUser: function (event) {
		return {
			randomName: faker.name.findName(),
			randomAge: faker.random.number({min:10, max:90}),
			_event: event
		};
	}
};