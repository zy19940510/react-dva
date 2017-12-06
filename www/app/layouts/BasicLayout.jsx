import React, { Component } from 'react'
import { routerRedux, Link ,Route, Redirect, Switch} from 'dva/router';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon, Avatar, Dropdown, Tag, message, Spin } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import Debounce from 'lodash-decorators/debounce';
// import HeaderSearch from '../components/HeaderSearch';
// import NoticeIcon from '../components/NoticeIcon';
// import GlobalFooter from '../components/GlobalFooter';
// import NotFound from '../routes/Exception/404';
import styles from '../styles/BasicLayout.less';
import logo from '../../images/logo.svg';
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
