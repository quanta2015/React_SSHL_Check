import React from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import {withRouter} from "react-router-dom";
import { Icon } from 'antd'
import {isN,msg} from 'util/fn'
import {loadUser} from 'util/token'



import logo from "img/logo.svg"
import './index.less'


var MENU_MAIN = [{name:'检测字符',key:'/tech',role:0, list: []},]



@inject('mainStore')
@observer
class NavWrapper extends React.Component {
	constructor(props) {
		super(props)
    this.store = this.props.mainStore
    this.state = {
      cur: '/',
      show: true,
      sel: 0,
    }
	}



	render() {
    const { menu,sel } = this.state
    const { currUser } = this.store

    return (
      <div className="g-nav">
        <div className="m-nav">
          <label>所思互联检查工具</label>
          <div className="m-menu_wrap">
            {MENU_MAIN.map((item,i)=>
              <div key={i} className={(i==sel)?"m-item sel":"m-item"} >
                {item.name}
              </div>
            )}
          </div>

        </div>

        <div className="g-main">
          {this.props.children}
        </div>

        
      </div>
    )
  }
}

export default withRouter(NavWrapper)
