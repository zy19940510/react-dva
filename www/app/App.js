import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Sider } = Layout;
import { Router, Route , NavLink  } from 'dva/router';

 
//样式表
import "./styles/less_carpicker.less";
import "./styles/less_carshow.less";
import "./styles/less.less";

export default class App extends Component {
    constructor({children , match}){
        super();
    }

    render() {
        if (/^\#\/.+\/?$/.test(window.location.hash)){
            var hash = window.location.hash.match(/^\#\/(.+)\/?$/)[1];
        }else{
            var hash = "index";
        }
        
        console.log(hash);
        return (
            <div>
                <Layout>
                    <Header className="header">
                        <div className="logo"></div>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={[hash]}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="index"><NavLink to="/">首页</NavLink ></Menu.Item>
                            <Menu.Item key="sale"><NavLink to="/sale">汽车销售</NavLink ></Menu.Item>
                            <Menu.Item key="people"><NavLink to="/people">人员管理</NavLink ></Menu.Item>
                            <Menu.Item key="order"><NavLink to="/order">订单管理</NavLink ></Menu.Item>
                        </Menu>
                    </Header>
                </Layout>
                
                {this.props.children}   
            </div>
        )
    }
}
