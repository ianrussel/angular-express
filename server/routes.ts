import * as express from 'express';

import CatCtrl from './controllers/cat';
import CheatCtrl from './controllers/cheat';
import UserCtrl from './controllers/user';
import Cat from './models/cat';
import Cheat from './models/cheat';
import User from './models/user';

export default function setRoutes(app) {

    const router = express.Router();

    const catCtrl = new CatCtrl();
    const cheatCtrl = new CheatCtrl();
    const userCtrl = new UserCtrl();

    // Cats
    router.route('/cats').get(catCtrl.getAll);
    router.route('/cats/count').get(catCtrl.count);
    router.route('/cat').post(catCtrl.insert);
    router.route('/cat/:id').get(catCtrl.get);
    router.route('/cat/:id').put(catCtrl.update);
    router.route('/cat/:id').delete(catCtrl.delete);


    // Cheats
    router.route('/cheats').get(cheatCtrl.getAll);
    router.route('/cheats/count').get(cheatCtrl.count);
    router.route('/cheat').post(cheatCtrl.insert);
    router.route('/cheat/:id').get(cheatCtrl.get);
    router.route('/cheat/:id').put(cheatCtrl.update);
    router.route('/cheat/:id').delete(cheatCtrl.delete);
    router.route('/cheats/getNames').get(cheatCtrl.getNames);

    // Users
    router.route('/login').post(userCtrl.login);
    router.route('/users').get(userCtrl.getAll);
    router.route('/users/count').get(userCtrl.count);
    router.route('/user').post(userCtrl.insert);
    router.route('/user/:id').get(userCtrl.get);
    router.route('/user/:id').put(userCtrl.update);
    router.route('/user/:id').delete(userCtrl.delete);

    // Apply the routes to our application with the prefix /api
    app.use('/api', router);

}
