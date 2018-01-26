import * as chai from 'chai';
import * as chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';

import { app } from '../app';
import Cheat from '../models/cheat';

const should = chai.use(chaiHttp).should();

describe('Cheaters', () => {
	beforeEach(done => {
		Cheat.remove({}, err => {
			done();
		});
	});
	describe('Backend test for cheaters', () => {
		it('should get all cheaters', done => {
			chai.request(app)
				.get('/api/cheats')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(0);
					done();
				});
		});

		it('should get cheaters count', done => {
			chai.request(app)
				.get('/api/cheats/count')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('number');
					res.body.should.be.eql(0);
					done();
				});
		});

		it('should create new cheater', done => {
			const cheat = { title: 'illegal cheater', code: 'bal', description: 'tai', name: 'name ko'};
			chai.request(app)
				.post('/api/cheat')
				.send(cheat)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.a.property('title');
					res.body.should.have.a.property('code');
					res.body.should.have.a.property('description');
					res.body.should.have.a.property('name');
					res.body.should.not.have.a.property('olok');
					done();
				});
		});

		it('should not save if title field is not added', (done) => {
			const cheats = { code: 'namam', description: 'descript', name: 'tau'};
			chai.request(app)
				.post('/api/cheat')
				.send(cheats)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('errors');
					res.body.errors.should.have.property('title');
					res.body.errors.title.should.have.property('kind').eql('required');
					done();
				});
		});

		it('should not save if description field is not added', done => {
			const cheats = { title: 'tang ina', code: 'rert', name: 'ako'};
			chai.request(app)
				.post('/api/cheat')
				.send(cheats)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('errors');
					res.body.errors.should.have.property('description');
					res.body.errors.description.should.have.property('kind').eql('required');
					done();
				});
		});

		it('should get cheater by id given', done => {
			const cheater = new Cheat({ title: 'bunab', description: 'otot', code: 'code alert', name: 'pangalan mo'});
			cheater.save(( error, newCheater) => {
				chai.request(app)
					.get(`/api/cheat/${cheater._id}`)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('title');
						res.body.should.have.property('description');
						res.body.should.have.property('code');
						res.body.should.have.property('name');
						done();
					});
			});
		});

		it('should be updated by given id', done => {
			const cheater = new Cheat({ title: 'ang gago', description: 'descriptive', code: 'code of the day', name: 'Thomes'});
			cheater.save((err, newCheater) => {
				chai.request(app)
					.put(`/api/cheat/${newCheater._id}`)
					.send({ title: 'Ang bagong title'})
					.end((error, res) => {
						res.should.have.status(200);
						done();
					});
			});
		});

		it('should delete cheater by given id', done => {
			const cheater = new Cheat({ title: 'Ang title', description: 'ang description', code: 'ang code', name: 'ang pangalan'});
			cheater.save((err, newCheater) => {
				chai.request(app)
					.delete(`/api/cheat/${newCheater._id}`)
					.end((error, res) => {
						res.should.have.status(200);
						done();
					});
			});
		});

		it('should return all cheater names', done => {
			chai.request(app)
				.get(`/api/cheats/getNames`)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					console.log(res, 'names');
					done();
				});
		});
	});
});
