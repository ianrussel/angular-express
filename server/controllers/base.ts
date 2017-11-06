abstract class BaseCtrl {

	abstract model: any;

	// Get all
	getAll = (req, res) => {
		const query = req.params.name ?  req.params.name : null;
		this.model.find({}, (err, docs) => {
			if (err) {
				return console.error(err);
			}
			res.json(docs);
		});
	}
	getAlll = (req, res) => {
		this.model.find({name: 'Laravel'}, '_id title description code name')
		.where('name').equals(req.params.name)
		.exec(function(err, names) {
			if (err) {
				console.log(err);
			}
			res.json(names);
		});
	}
	// Count all
	count = (req, res) => {
		this.model.count((err, count) => {
			if (err) {
				return console.error(err);
			}
			res.json(count);
		});
	}

		// Insert
	insert = (req, res) => {
		const obj = new this.model(req.body);
		console.log(obj, 'from form');
		obj.save((err, item) => {
			// 11000 is the code for duplicate key error
			if (err && err.code === 11000) {
				res.sendStatus(400);
			}
			if (err) {
				return console.error(err);
			}
			res.status(200).json(item);
		});
	}

	// Get by id
	get = (req, res) => {
		this.model.findOne({ _id: req.params.id }, (err, obj) => {
			if (err) { return console.error(err); }
			res.json(obj);
		});
	}

	// Update by id
	update = (req, res) => {
		console.log(req.body, 'body');
		this.model.findOneAndUpdate({ _id: req.params.id }, req.body, (err) => {
			if (err) { return console.error(err); }
			res.sendStatus(200);
		});
	}

	// Delete by id
	delete = (req, res) => {
		this.model.findOneAndRemove({ _id: req.params.id }, (err) => {
			if (err) { return console.error(err); }
			res.sendStatus(200);
		});
	}

	// get by names

	getNames = (req, res) => {
		this.model.distinct('name')
		.exec(function(err, names) {
			if (err) {
				console.log(err);
			}
			res.json(names);
		});
	}

	cheatsWithParams = (req, res) => {
		const query = req.params.name;
		this.model.find({name: query}, (err, docs) => {
			if (err) {
				return console.error(err);
			}
			res.json(docs);
		});
	}
}

export default BaseCtrl;
