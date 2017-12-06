import React, { Component } from 'react';
import App from "../../App";
import SaleLayout from './SaleLayout';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Sider } = Layout;


import CarPicker from "../../components/carpicker";
import CarShow from "../../components/CarShow";
import CloseBtn from "../../ui-components/CloseBtn";


export default class Dabiao extends Component {
  constructor() {
    super();
    this.state = {
      "showXuanfu": false,
      "chexing": "AiRuize"
    }
  }

  changeXuanfu(boolean) {
    this.setState({
      "showXuanfu": boolean
    })
  }

  changeChexing(str) {
    this.setState({
      "chexing": str
    })
  }
  render() {
    return (
      <App>
        <SaleLayout>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>销售</Breadcrumb.Item>
              <Breadcrumb.Item>大表选车</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              {/* 筛选器 */}
              <CarPicker
                changeXuanfu={this.changeXuanfu.bind(this)}
                changeChexing={this.changeChexing.bind(this)}
              ></CarPicker>

              {/* 悬浮层 */}
              <div className="xuanfu" style={{ "display": this.state.showXuanfu ? "block" : "none" }}>
                <div className="cover"></div>
                <div className="inner">
                  <CloseBtn onClick={() => { this.changeXuanfu(false) }}>×</CloseBtn>
                  <CarShow chexing={this.state.chexing}></CarShow>
                </div>
              </div>
            </Content>
          </Layout>
        </SaleLayout>
      </App>
    )
  }
}
