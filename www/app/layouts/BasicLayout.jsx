import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux, Link } from 'dva/router';
export class BasicLayout extends Component {
  constructor(props){
    super()
  }
  
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.login._login != 'ok') {
      nextProps.dispatch(routerRedux.push('/user/login'));
      // alert("请先登陆")
    }
  }
  componentDidMount(){
    this.props.dispatch({"type" : "login/checklogin"})
  }
  render() {
    // const session = this.props.dispatch({"type" : "login/checklogin"})
    // console.log(session)
    // console.log(this.props.login)
    return (
      <div>
        <h1>哈哈</h1>
      </div>
    )
  }
}



export default connect(
  state => ({
    login: state.login,
  })
)(BasicLayout)
