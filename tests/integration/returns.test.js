const request = require('supertest');
const mongoose = require('mongoose');
const moment = require('moment');
const { Rental } = require('../../models/rental');
const { User } = require('../../models/user');
const { Movie } = require('../../models/movie');

describe('api/returns/', () => {
  let server;
  let rental;
  let movie;
  let token;
  let customerId;
  let movieId;

  beforeEach(async () => {
    token = new User().generateAuthToken();
    customerId = mongoose.Types.ObjectId().toHexString();
    movieId = mongoose.Types.ObjectId().toHexString();
    server = require('../../server');

    movie = new Movie({
      _id: movieId,
      title: 'movie title',
      dailyRentalRate: 2,
      genre: { name: '12345' },
      numberInStock: 10,
    });
    await movie.save();

    rental = new Rental({
      customer: {
        _id: customerId,
        name: '12345',
        phone: '12345',
      },
      movie: {
        _id: movieId,
        title: 'movie title',
        dailyRentalRate: 2,
      },
    });
    await rental.save();
  });

  afterEach(async () => {
    await server.close();
    await Rental.remove({});
    await Movie.remove({});
  });

  const exec = async () => request(server)
    .post('/api/returns/')
    .set('x-auth-token', token)
    .send({ customerId, movieId });

  it('should return 401 if client is not logged in', async () => {
    token = '';
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it('should return 400 if customerId is not provided', async () => {
    customerId = '';
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it('should return 400 if movieId is not provided', async () => {
    movieId = '';
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it('should return 404 if no rental found for this customer/movie', async () => {
    await Rental.remove({});
    const res = await exec();
    expect(res.status).toBe(404);
  });

  it('should return 400 if rental is already processed', async () => {
    rental.dateReturned = new Date();
    await rental.save();
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it('should return 200 if rental found for this customer/movie ', async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });

  it('should set return date for valid rental ', async () => {
    const res = await exec();
    const result = await Rental.findById(rental._id);
    const diff = new Date() - result.dateReturned;
    expect(res.status).toBe(200);
    expect(result).toHaveProperty('dateReturned');
    expect(result.dateReturned).not.toBeFalsy();
    expect(diff).toBeLessThan(10 * 1000);
  });

  it('should calculate the rental fee ', async () => {
    rental.dateOut = moment().add(-7, 'days').toDate();
    await rental.save();
    const res = await exec();
    const result = await Rental.findById(rental._id);
    expect(res.status).toBe(200);
    expect(result).toHaveProperty('rentalFee');
    expect(result.rentalFee).toBeDefined();
    expect(result.rentalFee).toBe(14);
  });

  it('should update the stock ', async () => {
    const res = await exec();
    const result = await Movie.findById(movieId);
    expect(res.status).toBe(200);
    expect(result.numberInStock).toBeDefined();
    expect(result.numberInStock).toBeGreaterThan(movie.numberInStock);
    expect(result.numberInStock).toBe(movie.numberInStock + 1);
  });

  it('should return rental ', async () => {
    const res = await exec();
    expect(res.status).toBe(200);
    expect(Object.keys(res.body)).toEqual(expect.arrayContaining([
      'customer', 'movie', 'dateOut', 'dateReturned', 'rentalFee',
    ]));
  });
});
