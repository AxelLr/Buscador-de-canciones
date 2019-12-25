import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { reactContext } from '../../context/Context'
import Track from '../track/Track'
// BOOTSTRAP
import Spinner from 'react-bootstrap/Spinner'
// TYPES
import { GET_TRACKS } from '../../context/Types'

export default function Tracks() {

    const Context  = useContext(reactContext)

    const { trackList } = Context.State
    
    useEffect(() => {

        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`)
        
        .then(res => {

            Context.Dispatch({
                type: GET_TRACKS, 
                payload: res.data.message.body.track_list 
            });
        })
    
        .catch(err => console.log(err))
         
      }, [])

    return (
        <div>
             { trackList.length === 0 
              ? <Spinner animation="border" variant="info" />
              : trackList.map( (item, uid) =>  <Track key={uid} track={item.track} /> )}
        </div>
    )
}
