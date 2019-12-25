import React,{ useReducer } from 'react'
import { GET_TRACKS, SET_SEARCH_RESULTS } from './Types'

export const reactContext = React.createContext()

function reducer (state, action) {
  switch(action.type) {

    case GET_TRACKS:
      return {
        ...state,
        trackList: [...state.trackList, ...action.payload]
      };
    case SET_SEARCH_RESULTS:
      console.log(action.payload)
      return {
        trackList: [...action.payload],
        header: 'Resultados'
      }
    default: return state
  }
}

export function State (props) {

  const initialState = {
        trackList : [],
        header: 'top 10 de canciones'
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <reactContext.Provider value= {{ State: state, Dispatch: dispatch }} >
            {props.children}
        </reactContext.Provider>
    )
}

