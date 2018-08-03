const request = require('supertest');
const { Genre } = require('../../models/genre');

let server;

describe('/api/genres', () => {
  beforeEach(() => {
    server = require('../../server');
  });

  afterEach(async () => {
    server.close();
    await Genre.remove({});
  });

  describe('GET /', () => {
    it('should return all genres', async () => {
      await Genre.insertMany([
        { name: 'genre1' },
        { name: 'genre2' },
      ]);
      const response = await request(server).get('/api/genres');
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
      const res = await request(server).get(`/api/genres/${genre._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', genre.name);
    });

    it('should return 404 if invalid id is passed', async () => {
      const res = await request(server).get('/api/genres/1');
      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {
    it('should return 401 if user is unauthorized', async () => {
      const res = await request(server).post('/api/genres');
      expect(res.status).toBe(401);
    });
  });
});
