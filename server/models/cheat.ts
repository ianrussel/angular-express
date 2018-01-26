import * as mongoose from 'mongoose';

const cheatSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		max: 10
	},
	code: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	date_created: {
		type: Date
	},
	date_updated: {
		type: Date
	},
	created_by: {
		type: String
	},
	updated_by: {
		type: String
	}
});

const Cheat = mongoose.model('Cheaters', cheatSchema);

export default Cheat;
