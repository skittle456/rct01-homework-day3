import React, { PureComponent } from "react";
import TMDB from "./TMDB";
import FilmListing from "./components/FilmListing";
import FilmDetails from "./components/FilmDetails";
import "./index.css";

const { films } = TMDB;
class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      films: films,
      faves: [],
      current: []
    };
  }

  handleFaveToggle = film => {
    const faves = [...this.state.faves];
    const filmIndex = faves.indexOf(film);
    if (filmIndex === -1) {
      faves.push(film);
    } else {
      faves.splice(filmIndex, 1);
    }
    this.setState({ faves });
  };

  handleDetailsClick = film => {
    const url = `https://api.themoviedb.org/3/movie/${film.id}?api_key=${TMDB.api_key}&append_to_response=videos,images&language=en`;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ current: data });
      });
  };

  render() {
    const { films, faves, current } = this.state;
    return (
      <div className="film-library">
        <FilmListing
          faves={faves}
          films={films}
          onFaveToggle={this.handleFaveToggle}
          handleDetailsClick={this.handleDetailsClick}
        />
        <FilmDetails films={current} />
      </div>
    );
  }
}

export default App;
