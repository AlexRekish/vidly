const request = require('supertest');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');

describe('auth middleware', () => {
  let server;
  beforeEach(() => {
    server = require('../../server');
  });

  afterEach(async () => {
    await server.close();
    await Genre.remove({});
  });

  describe('/api/genres', () => {
    let token;
    let name;
    beforeEach(() => {
      token = new User().generateAuthToken();
      name = 'genre1';
    });
    const exec = () => request(server)
      .post('/api/genres/')
      .set('x-auth-token', token)
      .send({ name });

    it('should return 401 if user is unauthorized', async () => {
      token = '';
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it('should return 400 if invalid token is passed', async () => {
      token = 'a';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 200 if valid token is passed', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });
  });
});
