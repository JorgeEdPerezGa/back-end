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
            response.body[0].should.have.property('user_email');
            response.body[0].should.have.property('username');
            response.body[0].should.have.property('push_notifications_on');
            response.body[0].should.have.property('notification_time');
            response.body[0].should.have.property('primary_contact_name');
            response.body[0].should.have.property('primary_contact_email');
            response.body.length.should.equal(1);
          })
          .catch( err => {
            throw err;
          });
      });
    });
  });

});
