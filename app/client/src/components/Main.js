import React, { Component } from 'react'
import Footer from './Footer'
import { Switch, Route, Redirect } from 'react-router-dom'
import Dashboard from './Dashboard'
import UserProfile from './UserProfile'
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
          <Route path="/UserProfile" component={UserProfile} />
          <Route path="/TopCommodities" component={TopCommodities} />
          <Route path="/Search" component={Search} />
          <Redirect from='*' to='/dashboard' />
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default Main