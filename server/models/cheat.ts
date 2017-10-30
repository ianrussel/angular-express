import * as mongoose from 'mongoose';

const cheatSchema = new mongoose.Schema({
	title: {
		type: String,
		require: true,
		max: 10
	},
	code: {
		type: String,
		require: true
	},
	description: {
		type: String,
		require: true
	},
	name: {
		type: String,
		require: true
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
