const request = require('supertest');
const mongoose = require('mongoose');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');

let server;
const path = '/api/genres/';

describe(path, () => {
  beforeEach(() => {
    server = require('../../server');
  });

  afterEach(async () => {
    await server.close();
    await Genre.remove({});
  });

  describe('GET /', () => {
    it('should return all genres', async () => {
      await Genre.insertMany([
        { name: 'genre1' },
        { name: 'genre2' },
      ]);
      const response = await request(server).get(path);
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body.some(genre => genre.name === 'genre1'));
      expect(response.body.some(genre => genre.name === 'genre2'));
    });
  });

  describe('GET /:id', () => {
    it('should return a genre if valid id is passed', async () => {
      const genre = new Genre({ name: 'genre1' });
      await genre.save();
      const res = await request(server).get(`${path}${genre._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', genre.name);
    });

    it('should return 404 if invalid id is passed', async () => {
      const res = await request(server).get(`${path}1`);
      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {
    let token;
    let name;

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = 'genre1';
    });

    const exec = () => request(server)
      .post(path)
      .set('x-auth-token', token)
      .send({ name });

    it('should return 401 if user is unauthorized', async () => {
      token = '';
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it('should return 400 if genre is less than 3 characters', async () => {
      name = 1;
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if genre is more than 20 characters', async () => {
      name = new Array(21).fill('a').join('');
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should save the genre if genre is valid', async () => {
      const res = await exec();
      const result = await Genre.find({ name });
      expect(res.status).toBe(200);
      expect(result.name).not.toBeNull();
    });

    it('should return the genre if genre is valid', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'genre1');
    });
  });

  describe('PUT /:id', () => {
    let token;
    let genre;
    let name;

    beforeEach(async () => {
      const user = { _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true };
      token = new User(user).generateAuthToken();
      genre = new Genre({ name: 'genre1' });
      name = 'genre2';
      await genre.save();
    });

    const exec = () => request(server)
      .put(`${path}${genre._id}`)
      .set('x-auth-token', token)
      .send({ name });

    it('should return 400 if genre is less than 3 characters', async () => {
      name = 1;
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 400 if genre is more than 20 characters', async () => {
      name = new Array(21).fill('a').join('');
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return 404 if invalid id is passed', async () => {
      genre._id = new mongoose.Types.ObjectId().toHexString();
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it('should change the genre if genre is valid', async () => {
      const res = await exec();
      const result = await Genre.find({ name });
      expect(res.status).toBe(200);
      expect(result.name).not.toBeNull();
    });

    it('should return the genre if genre is valid', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'genre2');
    });
  });

  describe('DELETE /:id', () => {
    let token;
    let genre;

    beforeEach(async () => {
      const user = { _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true };
      token = new User(user).generateAuthToken();
      genre = new Genre({ name: 'genre1' });
      await genre.save();
    });

    const exec = () => request(server)
      .delete(`${path}${genre._id}`)
      .set('x-auth-token', token)
      .send();

    it('should return 404 if invalid id is passed', async () => {
      genre._id = new mongoose.Types.ObjectId().toHexString();
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it('should delete the genre if id is valid', async () => {
      const res = await exec();
      const result = await Genre.findById(genre._id);
      expect(res.status).toBe(200);
      expect(result).toBeNull();
    });

    it('should return the genre if id is valid', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'genre1');
    });
  });
});
