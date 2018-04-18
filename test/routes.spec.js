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
      it('should add a new user when given the correct data', () => {
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
    describe('GET /api/v1/users/:id/daily_totals', () => {
      it('should return all of the questions for a specific user', () => {
        return chai.request(server)
          .get('/api/v1/users/5/daily_totals')
          .then( response => {
            response.should.have.status(200);
            response.body[0].should.have.property('current_date');
            response.body[0].should.have.property('week_start_date');
            response.body[0].should.have.property('daily_total');
          })
          .catch( error => {
            throw error;
          });
      });
    });

    describe('POST /api/v1/users/:id/daily_totals', () => {
      it.only('should add new question data when given the correct data', () => {
        return chai.request(server)
          .post('/api/v1/users/5/daily_totals')
          .send({
            current_date: 'Sat Apr 21 2018 14:22:06 GMT-0600',
            week_start_date: 'Tue Apr 17 2018 14:22:06 GMT-0600',
            daily_total: 3
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
