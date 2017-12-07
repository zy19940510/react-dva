import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import styles from '../styles/UserLayout.less';

// const links = [{
//   title: '帮助',
//   href: '',
// }, {
//   title: '隐私',
//   href: '',
// }, {
//   title: '条款',
//   href: '',
// }];

const copyright = <div>Copyright <Icon type="copyright" /> 2017 蚂蚁金服体验技术部出品</div>;

class UserLayout extends React.Component {
  constructor(props){
    super()
    // props.dispatch({"type" : "login/checklogin"})
  }
    static childContextTypes ={
      location: PropTypes.object,
}
  
  getChildContext() {
    const { location } = this.props;
    return { location };
  }
  getPageTitle() {
    const { getRouteData, location } = this.props;
    const { pathname } = location;
    let title = 'Ant Design Pro';
    getRouteData('UserLayout').forEach((item) => {
      if (item.path === pathname) {
        title = `${item.name} - Ant Design Pro`;
      }
    });
    return title;
  }
  render() {
    const { getRouteData } = this.props;

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className="container">
          <div className="top">
            <div className="header">
              <Link to="/">
                <img alt="" className="logo" src="../../images/logo.svg" />
                <span className="title">张宇的项目</span>
              </Link>
            </div>
            <div className="desc">这是一个相当牛逼的项目！</div>
          </div>
          {
            getRouteData('UserLayout').map(item =>
              (
                <Route
                  exact={item.exact}
                  key={item.path}
                  path={item.path}
                  component={item.component}
                />
              )
            )
          }
          {/* <GlobalFooter className={styles.footer} links={links} copyright={copyright} /> */}
        </div>
      </DocumentTitle>
    );
  }
}

export default connect(
  state => ({
    login: state.login,
  })
)(UserLayout);
