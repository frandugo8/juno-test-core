
const request = require('supertest')
const app = require('../index')
const User = require('../models/user');

const LOGIN_DATA = {
  username: "test",
  password: "test12345678"
}

const SIGNUP_DATA = {
  name: "new-user",
  surname: "new-user",
  username: "new-user",
  password: "new-user1234"
}

const USER = {
  name: "user",
  surname: "user",
  username: "user",
  password: "user1234"
}

describe('User controller', () => {
  beforeEach(async () => {
    await User.deleteMany()

    const user = new User(USER)
    await user.save()
  })

  it('Signup method: should return 200', async () => {
    expect(true).toBe(true)
    await request(app)
      .post("/api/signup")
      .send({
        name: "new-user",
        surname: "new-user",
        username: "new-user",
        password: "new-user1234"
      })
      .expect(200);
  });

  it('Signup method: should return 500', async () => {
    await request(app)
      .post('/api/signup')
      .send({...SIGNUP_DATA, password: "1"})
      .expect(500);
  });

  it('Login method: should return 200', async () => {
    await request(app)
      .post('/api/login')
      .send(USER)
      .expect(200);
  });

  it('Login method: should return 500', async () => {
    await request(app)
      .post('/api/login')
      .send(LOGIN_DATA)
      .expect(500);
  });
});