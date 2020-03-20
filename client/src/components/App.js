import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Landing from './Landing'

import { connect } from 'react-redux'
import * as actions from '../actions'

const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>

class App extends React.Component {
  constructor(props){
    super(props)

  }

  componentDidMount() {
    this.props.fetchUser()
  }


  render(){
    return (
      <div className='container'>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path='/' component={Landing}/>
            <Route exact path='/surveys' component={Dashboard}/>
            <Route path='/surveys/new' component={SurveyNew}/>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}



export default connect(null, actions)(App)