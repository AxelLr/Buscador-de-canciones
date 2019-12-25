import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Moment from "react-moment"

export default function Lyrics(props) {

    const [lyrics, setLyrics] = useState({})
    const [track, setTrack] = useState({})

 useEffect(() => {

    axios
    .get(
      `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
        props.match.params.id
      }&apikey=${process.env.REACT_APP_MM_KEY}`
    )
    .then(res => {
      let lyrics = res.data.message.body.lyrics;
      setLyrics( lyrics );

      return axios.get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${
          props.match.params.id
        }&apikey=${process.env.REACT_APP_MM_KEY}`
      );
    })
    .then(res => {
      let track = res.data.message.body.track;
      setTrack( track );
    })
    .catch(err => console.log(err));

  }, []);

    return (

      <Fragment> 
        <Link to="/" className="btn btn-dark btn-sm mb-4">
          Volver atrás
        </Link>
        <div className="card">

          <h5 className="card-header"> {track.track_name} by <span className="text-primary"> {track.artist_name} </span> </h5>

          <div className="card-body">
            <p className="card-text">{lyrics.lyrics_body}</p>
          </div>

        </div>

        <ul className="list-group mt-3">

          <li className="list-group-item">
            <strong>Album ID</strong>: {track.album_id}
          </li>
          
          <li className="list-group-item">
            <strong>Palabras explícitas</strong>:{" "}
            {track.explicit === 0 ? "No" : "Si"}
          </li>

          <li className="list-group-item">
            <strong> Fecha de lanzamiento </strong>:{" "}
                <Moment format="MM/DD/YYYY">
                {track.first_release_date}
                </Moment>
          </li>
        </ul>
      </Fragment>
    )
}


