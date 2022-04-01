import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Loadable from 'component/Loadable'
import { inject, observer } from 'mobx-react'
import NavWrapper from 'component/NavWrapper'
import {isN,msg} from 'util/fn'
import {loadUser} from 'util/token'


@inject('mainStore')
@observer
class App extends React.Component {
  constructor(props) {
    super(props)
    this.store = props.mainStore
  }


  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' render={() => (
            <div className='app-root'>
              <NavWrapper>
                <Switch>
                  <Route exact path='/' component={Loadable({loader:()=>import('./app/index')})}/>
                </Switch>
              </NavWrapper>
            </div>
          )}/>
        </Switch>
      </Router>
    )
  }
}

export default App
