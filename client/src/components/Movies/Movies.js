import React from "react";
import Movie from "./Movie/Movie";
import Pagination from '../Common/Pagination/Pagination';


const movies = props => (
  <React.Fragment>
    {props.count}
    <table className="table">
      <tbody>
        {props.movies.map(movie => (
          <Movie
            movie={movie}
            key={movie._id}
            delete={() => props.deleteMovie(movie._id)}
            onLike={() => props.onLike(movie._id)}
            liked={movie.liked}
          />
        ))}
      </tbody>
      <thead>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Stock</th>
          <th>Rate</th>
          <th/>
          <th/>
        </tr>
      </thead>
    </table>
    <Pagination
      itemCount={props.itemCount}
      pageSize={props.pageSize}
      onPageChanged={props.onPageChanged}
    />
  </React.Fragment>
);

export default movies;
