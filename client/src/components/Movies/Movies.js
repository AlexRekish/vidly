import React from "react";
import Movie from "./Movie/Movie";

const movies = props => (
  <table className="table">
    <tbody>
      {props.movies.map(movie => (
        <Movie
          title={movie.title}
          genre={movie.genre.name}
          stock={movie.numberInStock}
          rate={movie.dailyRentalRate}
          key={movie._id}
          delete={() => props.deleteMovie(movie._id)}
        />
      ))}
    </tbody>
    <thead>
      <tr>
        <th>Title</th>
        <th>Genre</th>
        <th>Stock</th>
        <th>Rate</th>
        <th />
      </tr>
    </thead>
  </table>
);

export default movies;
