const chai =  require('chai');
const server = require('../server');
const chaiHttp = require('chai-http');
const should = chai.should();

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Client Routes', () => {

});

describe('API Routes', () => {
  beforeEach((done) => {
    database.migrate.rollback()
      .then(() => {
        database.migrate.latest()
          .then(() => {
            return database.seed.run()
              .then(() => {
                done();
              });
          });
      });
  });

  describe('USERS endpoints', () => {
    describe('GET /api/v1/users', () => {
      it('should return all of the users with status 200', () => {
        return chai.request(server)
          .get('/api/v1/users')
          .then( response => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('array');
            response.body[0].should.have.property('token_string');
          })
          .catch( error => {
            throw error;
          });
      });
    });

    describe('GET /api/v1/users/:id', () =>{
      it('return a specific user', () => {
        return chai.request(server)
          .get('/api/v1/users/5')
          .then( response => {
            response.should.have.status(200);
            response.should.be.json;
            response.body[0].should.have.property('token_string');
            response.body.length.should.equal(1);
          })
          .catch( error => {
            throw error;
          });
      });
    });

    describe('POST /api/v1/users', () => {
      it.only('should add a new user when given the correct data', () => {
        return chai.request(server)
          .post('/api/v1/users')
          .send({
            token_string: '8hfrn2334'
          })
          .then(response => {
            response.should.have.status(201);
            response.body.should.be.a('object');
            response.body.should.have.property('token_string');
          })
          .catch( error => {
            throw error;
          });
      });
    });
  });

  describe('QUESTIONS endpoints', () => {
    describe('GET /api/v1/users/:id/questions', () => {
      it('should return all of the questions for a specific user', () => {
        return chai.request(server)
          .get('/api/v1/users/5/questions')
          .then( response => {
            response.should.have.status(200);
            response.body[0].should.have.property('how_do_you_feel_morning');
            response.body[0].should.have.property('anything_to_look_forward_to');
            response.body[0].should.have.property('did_you_exercise');
            response.body[0].should.have.property('did_you_take_medicine');
            response.body[0].should.have.property('how_do_you_feel_night');
            response.body[0].should.have.property('date');
          })
          .catch( error => {
            throw error;
          });
      });
    });

    describe('POST /api/v1/users/:id/questions', () => {
      it.skip('should add new question data when given the correct data', () => {
        return chai.request(server)
          .post('/api/v1/users/5/questions')
          .send({
            how_do_you_feel_morning: 'good',
            anything_to_look_forward_to: 'yes',
            did_you_exercise: 'yes',
            did_you_take_medicine: 'yes',
            how_do_you_feel_night: 'good',
            date: '04/02/2018'
          })
          .then(response => {
            response.should.have.status(201);
            response.body.should.be.a('object');
          })
          .catch( error => {
            throw error;
          });
      });
    });
  });
});
