import React, { Component } from 'react'
import Footer from './Footer'
import { Switch, Route, Redirect } from 'react-router-dom'
import Dashboard from './Dashboard'
import Search from './Search'
import PageNavbar from './PageNavbar'
import Home from './Home'

class Main extends Component {
  render() {
    return (
      <div>
        <PageNavbar />
        <Switch>
          <Route path = "/Home" component={Home} />
          <Route path="/Dashboard" component={Dashboard} />
          <Route path="/Search" component={Search} />
          <Redirect from='*' to='/Home' />
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default Main