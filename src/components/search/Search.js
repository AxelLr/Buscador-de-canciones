import React,{ useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { reactContext } from '../../context/Context'
import { SET_SEARCH_RESULTS } from '../../context/Types'

export default function Search() {

const [title, setTitle] = useState('')

const Context  = useContext(reactContext)

const searchSong = (e) => {

  e.preventDefault();
    
 axios.get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${title}&page_size=10&page=1&s_track_rating=desc&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      )
      .then(res => {
        let trackList = res.data.message.body.track_list;
        
        Context.Dispatch({type: SET_SEARCH_RESULTS, payload: trackList})

        setTitle('');
      })
      .catch(err => console.log(err));
}

 
return (
        <div>
            <div className="card card-body mb-4 p-4">
      <h1 className="display-4 text-center">
        <i className="fas fa-music" /> Busca una cancíon
      </h1>
      <p className="lead text-center">Obtén la letra de cualquiera de ellas</p>
      <form onSubmit={searchSong}>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Ingresa el título de la cancíon..."
            name="userInput"
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
          />
        </div>
        <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">
          Buscar
        </button>
      </form>
    </div>
            
        </div>
    )
}
