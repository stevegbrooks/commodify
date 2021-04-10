import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import Test from './components/Test'

class App extends Component {

  render() {
    return (
      <div className="wrapper">
        <Router>
          <Sidebar />
          <Route path='/' component={Main} />
          <Route path='/test' component={Test} />
        </Router>
      </div>
    )
  }
}

export default App