import Cheat from '../models/cheat';
import BaseCtrl from './base';

export default class CheatCtrl extends BaseCtrl {
	model = Cheat;

	searchCheats = (req, res ) => {
		const query = req.params;
		console.log(req.params, 'params');
		this.model.find({'$or':[{name: new RegExp(query, 'i')}, {description: new RegExp(query, 'i')}]}, (err, cheat) => {
			if (err) {
				return console.error(err.toString());
			}
			console.log(cheat, 'cheats');
			res.json(cheat);
		});
	}

	// searchCheats = (req, res ) => {
	// 	console.log(req.query, 'params');
	// 	const value = req.params;
	// 	const query = this.model.find({name: value});
	// 	query.exec((err, products) => {
	// 		if(err) {
	// 			return console.log(err.toString());
	// 		}
	// 		// console.log(products, 'products');
	// 		res.json(products);
	// 	})
	// }
}
