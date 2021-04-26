import React, { Component } from 'react'
import Footer from './Footer'
import { Switch, Route, Redirect } from 'react-router-dom'
import Dashboard from './Dashboard'
import TopCommodities from './TopCommodities'
import Search from './Search'
import PageNavbar from './PageNavbar'

class Main extends Component {
  render() {
    return (
      <div>
        <PageNavbar />
        <Switch>
          <Route path="/Dashboard" component={Dashboard} />
          <Route path="/Search" component={Search} />
          <Route path="/TopCommodities" component={TopCommodities} />
          <Redirect from='*' to='/' />
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default Main