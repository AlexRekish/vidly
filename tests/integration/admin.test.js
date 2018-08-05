const request = require('supertest');
const mongoose = require('mongoose');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');

describe('admin middleware', () => {
  let server;
  beforeEach(() => {
    server = require('../../server');
  });

  afterEach(async () => {
    await server.close();
    await Genre.remove({});
  });
  describe('api/genres/', () => {
    let token;
    let genre;
    beforeEach(async () => {
      const user = { _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: false };
      token = new User(user).generateAuthToken();
      genre = new Genre({ name: 'genre1' });
      await genre.save();
    });

    const exec = () => request(server)
      .put(`/api/genres/${genre._id}`)
      .set('x-auth-token', token)
      .send({ name: 'genre2' });

    it('should return 403 if user is authorized, but token is invalid', async () => {
      const res = await exec();
      expect(res.status).toBe(403);
    });

    it('should return 200 if user is authorized and token is valid', async () => {
      const user = { _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true };
      token = new User(user).generateAuthToken();
      const res = await exec();
      expect(res.status).toBe(200);
    });
  });
});
