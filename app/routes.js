import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from 'components/Header'
import Home from 'modules/Home/index.web'
import About from 'containers/About'
import Topics from 'containers/Topics'

const Status = ({ code, children }) => (
  <Route render={({ staticContext }) => {
    if (staticContext) {
      staticContext.status = code
    }

    return children
  }} />
)

const NotFound = () => (
  <Status code={404}>
    <div>
      <h1>Sorry, can’t find that.</h1>
    </div>
  </Status>
)

export default (
  <div>
    <Header />

    <hr />

    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route path='/:paramId' component={Topics} />
      <Route component={NotFound} />
    </Switch>

    <Route path='/martin' render={(props) => {
      console.log(props)
      return <h1>Matchea siempre</h1>
    }} />
  </div>
)
