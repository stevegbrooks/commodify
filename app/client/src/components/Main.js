import React, { Component } from 'react'
import Footer from './Footer'
import { Switch, Route, Redirect } from 'react-router-dom'
import Dashboard from './Dashboard'
import Search from './Search'
import PageNavbar from './PageNavbar'
import Home from './Home'
import Contact from './Contact'

class Main extends Component {
  render() {
    return (
      <div>
        <PageNavbar />
        <Switch>
          <Route path = "/Home" component={Home} />
          <Route path="/Dashboard" component={Dashboard} />
          <Route path="/Search" component={Search} />
          <Route path="/Contact" component={Contact} />
          <Redirect from='*' to='/Home' />
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default Main