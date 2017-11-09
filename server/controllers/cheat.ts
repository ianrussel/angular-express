import Cheat from '../models/cheat';
import BaseCtrl from './base';

export default class CheatCtrl extends BaseCtrl {
	model = Cheat;

	searchCheats = (req, res ) => {
		const query = req.params;
		console.log(req.params, 'params');
		this.model.find({'$or':[{name: new RegExp(query, 'i')}, {description: new RegExp(query, 'i')}]}, (err, cheat) => {
		//this.model.find({name: query}, (err, cheat) => {
			if (err) {
				return console.error(err.toString());
			}
			console.log(cheat, 'cheats');
			res.json(cheat);
		});
	}
}
