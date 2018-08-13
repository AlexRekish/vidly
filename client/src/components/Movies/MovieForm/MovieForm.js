import React from 'react';
import Joi from 'joi-browser';
import Form from '../../Common/Form/Form';
import { getGenres } from '../../../services/genreService';
import { saveMovie, getMovie } from './../../../services/movieService';

class MovieForm extends Form {
  state = {
    data: {
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: '',
    },
    genres: [],
    errors: {}
  }

  populateGenres = async () => {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  populateMovie = async () => {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === 'new') return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.adaptMovieToData(movie) });
    } catch (err) {
      if (err.response && err.response.status === 404) return this.props.history.replace('/not-found');
    }
  }

  componentDidMount = async () => {
    await this.populateGenres();
    await this.populateMovie();
  }

  adaptMovieToData = (movie) => {
    const { _id, title, genre, numberInStock, dailyRentalRate } = movie;
    return {
      _id,
      title,
      numberInStock,
      dailyRentalRate,
      genreId: genre._id,
    };
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string().min(3).max(50).required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number().min(0).max(100).required().label('Number in Stock'),
    dailyRentalRate: Joi.number().min(0).max(10).required().label('Stock'),
  }

  onSubmitted = async () => {
    const movie = { ...this.state.data };
    await saveMovie(movie);
    this.props.history.push('/movies');
  }

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.formSubmitHandler}>
          {this.renderInput('title', 'Title', 'Enter title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Number in Stock', 'Enter number in stock')}
          {this.renderInput('dailyRentalRate', 'Rate', 'Enter rate')}
          {this.renderSubmitButton('Save')}
        </form>
      </div>
     );
  }
}

export default MovieForm;
