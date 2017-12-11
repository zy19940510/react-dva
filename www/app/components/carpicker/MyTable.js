import React from "react";
import classnames from "classnames";
import { connect } from "dva";
import { Table } from "antd";


class App extends React.Component {
  constructor({ }) {
    super();
  }

  //点击页码条、改变每页多少条都会做的事情
  changeHandler(pagination, filters, sorter) {
    this.props.changepage(pagination.current, pagination.pageSize, sorter.field, sorter.order);
  }

  clickHandler(directory, colorEnglish){
    this.props.changeXuanfu(true);
    this.props.changeChexing(directory);
    this.props.changeColor(colorEnglish);
  }

  render() {
    
    //定义列名
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        "sorter": true,
        "sortOrder": 'ascend'
      },
      {
        "title": "图片",
        dataIndex: 'image',
        key: 'image',
        "render":  (a, record, c) => {
			console.log(record.colorEnglish)
			console.log(`/carimages/${record.directory}/${record.colorEnglish}
			/view/${record.image}`)
          return <span onClick={() => { this.clickHandler(record.directory , record.colorEnglish)}}>
		  {
			  record.colorEnglish ?
			   <img src={`/carimages/${record.directory}/${record.colorEnglish}/view/${record.image}`} width="70"/>
			   : 
			   null
		  }
             
            </span>
        }
      },
      {
        title: '品牌',
        dataIndex: 'brand',
        key: 'brand'
      },
      {
        title: '车系',
        dataIndex: 'series_name',
        key: 'series_name'
      },
      {
        title: '颜色',
        dataIndex: 'color',
        key: 'color'
      },
      {
        title: '发动机',
        dataIndex: 'engine',
        key: 'engine',
        "sorter": true
      },
      {
        title: '购买日期',
        dataIndex: 'goumaidate',
        key: 'goumaidate',
        "sorter": true
      },
      {
        title: '已经行驶（万公里）',
        dataIndex: 'km',
        key: 'km',
        "sorter": true
      },
      {
        title: '排放标准',
        dataIndex: 'paifang',
        key: 'paifang'
      },
      {
        title: '价格（万元）',
        dataIndex: 'price',
        key: 'price',
        "sorter": true
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type'
      },
      {
        title: '变速箱',
        dataIndex: 'biansuxiang',
        key: 'biansuxiang'
      },
      {
        title: '车主',
        dataIndex: 'saler',
        key: 'saler'
      }
    ];
    return <div>
      <h3><b>共{this.props.amount}个车符合要求</b></h3>
      <Table
        rowKey="id"
        dataSource={this.props.results}
        columns={columns}
        pagination={{
          "current": this.props.page,
          "pageSize": this.props.pagesize,
          "total": this.props.amount,
          "pageSizeOptions": ["10", "20", "30", "40", "100"],
          "showSizeChanger": true,
          "loading": true
        }}
        onChange={(pagination, filters, sorter) => { this.changeHandler(pagination, filters, sorter) }}
      />

    </div>
  }
}

export default connect(
  ({ carpicker }) => ({
    "results": carpicker.results,
    "amount": carpicker.amount,
    "page": carpicker.page,
    "pagesize": carpicker.pagesize
  }),
  (dispatch) => ({
    changepage(page, pagesize, field, order) {
      
      dispatch({ "type": "carpicker/changepage", page, pagesize, field, order });
    },
    changeColor(color){
      dispatch({"type" : "carshow/changeColor" , color})
    }
  })
)(App);