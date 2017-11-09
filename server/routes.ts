import * as express from 'express';

import CheatCtrl from './controllers/cheat';
import UserCtrl from './controllers/user';
import Cheat from './models/cheat';
import User from './models/user';

export default function setRoutes(app) {

	const router = express.Router();
	const cheatCtrl = new CheatCtrl();
	const userCtrl = new UserCtrl();
	// Cheats
	router.route('/cheats').get(cheatCtrl.getAll);
	router.route('/cheats/count').get(cheatCtrl.count);
	router.route('/cheat').post(cheatCtrl.insert);
	router.route('/cheat/:id').get(cheatCtrl.get);
	router.route('/cheat/:id').put(cheatCtrl.update);
	router.route('/cheat/:id').delete(cheatCtrl.delete);
	router.route('/cheats/getNames').get(cheatCtrl.getNames);
	router.route('/cheats/cheatsWithParams/:name').get(cheatCtrl.cheatsWithParams);

	// Users
	router.route('/login').post(userCtrl.login);
	router.route('/users').get(userCtrl.getAll);
	router.route('/users/count').get(userCtrl.count);
	router.route('/user').post(userCtrl.insert);
	router.route('/user/:id').get(userCtrl.get);
	router.route('/user/:id').put(userCtrl.update);
	router.route('/user/:id').delete(userCtrl.delete);

	// search
	router.route('/cheat/searchCheats/:param').get(cheatCtrl.searchCheats);
	// Apply the routes to our application with the prefix /api
	app.use('/api', router);

}
