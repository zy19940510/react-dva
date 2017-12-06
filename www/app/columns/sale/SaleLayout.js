import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider  } = Layout;

import { Link } from 'dva/router';

export default class SaleLayout extends Component {
  render() {
      
    var match = window.location.hash.match(/^\#\/sale\/(.+)\/?$/);
      if (match){
          var hash = match[1];
      }else{
          var hash = ""
      }

    return (
      <div>
            <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[hash]}
                        defaultOpenKeys={['sub1','sub2']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <SubMenu key="sub1" title={<span><Icon type="user" />选汽车</span>}>
                            <Menu.Item key="dabiao"><Link to="/sale/dabiao">大表选车</Link></Menu.Item>
                            <Menu.Item key="sousuo"><Link to="/sale/sousuo">搜索选车</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="laptop" />选4S店</span>}>
                            <Menu.Item key="sisdian"><Link to="/sale/sisdian">北京市4s点列表</Link></Menu.Item>
                        </SubMenu>
                      
                    </Menu>
                </Sider>
                {this.props.children}
            </Layout>
      </div>
    )
  }
}
