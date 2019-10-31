require('dotenv').config();
const assert = require('assert');
const st = require('supertest');
const { ObjectId } = require('mongoose').Types;
const app = require('../../app');

const { User } = require('../../server/model/user');
const { Department } = require('../../server/model/department');

const {
  prePopulatedDepartments,
  prePopulatedUser,
} = require('../dummyData/dummy');

const request = st(app);
let token;
let department;
let createdUser;
const dummyUserID = '5db992a11379dd48bb0a1ae7';

beforeEach(done => {
  User.deleteMany({})
    .then(() => User.insertMany(prePopulatedUser))
    .then(() => done())
    .catch(e => done(e));
});

before(done => {
  Department.deleteMany({})
    .then(() => Department.insertMany(prePopulatedDepartments))
    .then(() => done())
    .catch(e => done(e));
});

describe('Health Check', () => {
  it('should do a API healthCheck', done => {
    request
      .get('/user/v1/healthcheck')
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        return done();
      });
  });
});

describe('User Login Test', () => {
  it('should not login the user with incorrect password', done => {
    request
      .post('/user/v1/user/login')
      .send({ logonId: 'prakhartkg@gmail.com', password: 'admin1234' })
      .end((err, res) => {
        assert.equal(res.statusCode, 401);
        return done();
      });
  });
  it('should not login the user with incorrect email', done => {
    request
      .post('/user/v1/user/login')
      .send({ logonId: 'prakhartkg1@gmail.com', password: 'admin1234' })
      .end((err, res) => {
        assert.equal(res.statusCode, 401);
        return done();
      });
  });
  it('should login the user with correct password', done => {
    request
      .post('/user/v1/user/login')
      .send({ logonId: 'prakhartkg@gmail.com', password: 'admin123' })
      .end((err, res) => {
        if (res.body.status) {
          const { token: authToken } = res.body.data;
          token = authToken;
        }
        assert.equal(res.statusCode, 200);
        return done();
      });
  });
});

describe('Departments Integration Test', () => {
  it('should add new department', done => {
    request
      .post('/user/v1/department/')
      .set({
        Authorization: token,
      })
      .send({ departmentName: 'Accounts' })
      .end((err, res) => {
        if (res.body.status) {
          department = res.body.data._id;
        }
        assert.equal(res.statusCode, 201);
        return done();
      });
  });

  it('should not add duplicate department', done => {
    request
      .post('/user/v1/department/')
      .set({
        Authorization: token,
      })
      .send({ departmentName: 'IT' })
      .end((err, res) => {
        assert.equal(res.statusCode, 400);
        return done();
      });
  });

  it('should fetch all departments', done => {
    request
      .get('/user/v1/department/all')
      .set({
        Authorization: token,
      })
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        return done();
      });
  });
});

describe('User Test', () => {
  it('should add user with correct values', done => {
    request
      .post('/user/v1/user')
      .set({
        Authorization: token,
      })
      .send({
        firstName: 'Prashu',
        lastName: 'jain',
        department,
        phone: '9770783435',
        email: 'prashutkg@gmail.com',
      })
      .end((err, res) => {
        if (res.body.status) {
          createdUser = res.body.data;
        }
        assert.equal(res.statusCode, 201);
        return done();
      });
  });
  it('should not add user with incorrect department', done => {
    request
      .post('/user/v1/user')
      .set({
        Authorization: token,
      })
      .send({
        firstName: 'Prashu',
        lastName: 'jain',
        department: '123',
        phone: '9770783435',
        email: 'prashutkg1@gmail.com',
      })
      .end((err, res) => {
        assert.equal(res.statusCode, 403);
        return done();
      });
  });
  it('should not add duplicate user', done => {
    request
      .post('/user/v1/user')
      .set({
        Authorization: token,
      })
      .send({
        firstName: 'Prashu',
        lastName: 'jain',
        department,
        phone: '9770783435',
        email: 'prakhartkg@gmail.com',
      })
      .end((err, res) => {
        assert.equal(res.statusCode, 400);
        return done();
      });
  });
  it('should not add user with invalid emailId', done => {
    request
      .post('/user/v1/user')
      .set({
        Authorization: token,
      })
      .send({
        firstName: 'Prashu',
        lastName: 'jain',
        department,
        phone: '9770783435',
        email: 'prakhartkggmail.com',
      })
      .end((err, res) => {
        assert.equal(res.statusCode, 400);
        return done();
      });
  });

  it('should get all users with pagination.', done => {
    request
      .get('/user/v1/user/all?page=1&size=10')
      .set({
        Authorization: token,
      })
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        return done();
      });
  });
  it('should not update user with invalid emailId', done => {
    request
      .put(`/user/v1/user/${createdUser._id}`)
      .set({
        Authorization: token,
      })
      .send({
        email: 'prakhartkggmail.com',
      })
      .end((err, res) => {
        assert.equal(res.statusCode, 400);
        return done();
      });
  });
  it('should update user with valid emailId', done => {
    request
      .put(`/user/v1/user/${dummyUserID}`)
      .set({
        Authorization: token,
      })
      .send({
        email: 'prakhartkg121@gmail.com',
      })
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        return done();
      });
  });
  it('should not delete user with invalid id', done => {
    request
      .delete(`/user/v1/user/${ObjectId()}`)
      .set({
        Authorization: token,
      })
      .end((err, res) => {
        assert.equal(res.statusCode, 404);
        return done();
      });
  });
  it('should delete user with valid id', done => {
    request
      .delete(`/user/v1/user/${dummyUserID}`)
      .set({
        Authorization: token,
      })
      .end((err, res) => {
        assert.equal(res.statusCode, 204);
        return done();
      });
  });
});
