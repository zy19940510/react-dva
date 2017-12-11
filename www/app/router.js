import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import cloneDeep from 'lodash/cloneDeep';
import { getNavData } from './common/nav';
import { getPlainNode } from './utils';

import Index from "./columns/index/Index";
import Login from "./routes/User/Login.js";
import Register from "./routes/User/Register.js";
import SaleIndex from "./columns/sale/SaleIndex";
import OrderIndex from "./columns/order/OrderIndex";
import PeopleIndex from "./columns/people/PeopleIndex";
import Dabiao from "./columns/sale/Dabiao";
import Sousuo from "./columns/sale/Sousuo";
import Sisdian from "./columns/sale/Sisdian";

// export default ({history}) => {
//     return <Router history={history}>
//        <div>
//             <Route path="/" exact component={Index} />
//             <Route path="/login" exact component={Login} />
//             <Route path="/regist" exact component={Register} />
//             <Route path="/sale" exact component={SaleIndex} />
//             <Route path="/sale/dabiao" component={Dabiao} />
//             <Route path="/sale/sousuo" component={Sousuo} />
//             <Route path="/sale/sisdian" component={Sisdian} />
            
//             <Route path="/people" component={PeopleIndex} />
//        </div>
//     </Router>
// }
dynamic.setDefaultLoadingComponent(() => {
    return <Spin size="large" className="globalSpin" />;
  });
  
  function getRouteData(navData, path) {
    if (!navData.some(item => item.layout === path) ||
      !(navData.filter(item => item.layout === path)[0].children)) {
      return null;
    }
    const route = cloneDeep(navData.filter(item => item.layout === path)[0]);
    const nodeList = getPlainNode(route.children);
    return nodeList;
  }
  
  function getLayout(navData, path) {
    if (!navData.some(item => item.layout === path) ||
      !(navData.filter(item => item.layout === path)[0].children)) {
      return null;
    }
    const route = navData.filter(item => item.layout === path)[0];
    return {
      component: route.component,
      layout: route.layout,
      name: route.name,
      path: route.path,
    };
  }
  
  function RouterConfig({ history, app }) {
    const navData = getNavData(app);
    const UserLayout = getLayout(navData, 'UserLayout').component;
    const BasicLayout = getLayout(navData, 'BasicLayout').component;
    const passProps = {
      app,
      navData,
      getRouteData: (path) => {
        return getRouteData(navData, path);
      },
    };
  
    return (
      <LocaleProvider locale={zhCN}>
        <Router history={history}>
            <Switch>
                <Route path="/user" render={props => <UserLayout {...props} {...passProps} />} />
                <Route path="/"  render={props => <BasicLayout {...props} {...passProps} />} />
                {/* <Route path="/api" exact component={Index} /> */}
            </Switch>
        </Router>
      </LocaleProvider>
    );
  }
  
  export default RouterConfig;