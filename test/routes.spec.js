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
            response.body[0].should.have.property('user_email');
            response.body[0].should.have.property('username');
            response.body[0].should.have.property('push_notifications_on');
            response.body[0].should.have.property('notification_time');
            response.body[0].should.have.property('primary_contact_name');
            response.body[0].should.have.property('primary_contact_email');
            response.body.length.should.equal(1);
          })
          .catch( error => {
            throw error;
          });
      });
    });

    describe('POST /api/v1/users', () => {
      it.skip('should add a new user when gived the correct data', () => {
        return chai.request(server)
          .post('/api/v1/users')
          .send({
            user_email: 'myemail@gmail.com',
            username: 'nyssak',
            password: 'nyssak',
            push_notifications_on: true,
            notification_time: '9:00am',
            primary_contact_name: 'Jorge',
            primary_contact_email: 'moana@ofMotenewi.com'
          })
          .then(response => {
            response.should.have.status(201);
            response.body.should.be.a('object');
            response.body.should.have.property('user_email');
            response.body.user_email.should.equal('myemail@gmail.com');
            response.body.should.have.property('username');
            response.body.username.should.equal('nyssak');
            response.body.should.have.property('password');
            response.body.password.should.equal('nyssak');
            response.body.should.have.property('push_notifications_on');
            response.body.push_notifications_on.should.equal(true);
            response.body.should.have.property('notification_time');
            response.body.notification_time.should.equal('9:00am');
            response.body.should.have.property('primary_contact_name');
            response.body.primary_contact_name.should.equal('Jorge');
            response.body.should.have.property('primary_contact_email');
            response.body.primary_contact_email.should.equal('moana@ofMotenewi.com');
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
          })
          .catch( error => {
            throw error;
          });
      });
    });
  });
});
