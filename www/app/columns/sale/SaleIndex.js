import React, { Component } from 'react'

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

import App from "../../App";
import SaleLayout from './SaleLayout';
 
export default class SaleIndex extends Component {
     
    render() {
        return (
            <App>
                <SaleLayout>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>销售</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                            <h1>我是选车频道首页</h1>
                        </Content>
                    </Layout>
                </SaleLayout>
            </App>
        )
    }
}
