import React,{ Fragment } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
// COMPONENTES
import Navbar from './components/navbar/Nabvar'
// PAGINAS 
import Layout from './pages/layout/Layout'
import Lyrics from './pages/lirycs/Lyrics'
// CONTEXT
import { State } from './context/Context'

export default function App() {
  
  return (
    <State> 
        <HashRouter>
            <Fragment>
              <Navbar />
                <div className='container'> 
                  <Switch>
                    <Route exact path='/' component={Layout} />
                    <Route exact path='/lyrics/track/:id' component={Lyrics} /> 
                  </Switch>
                </div>
            </Fragment>
        </HashRouter>
    </State>
  )
}

